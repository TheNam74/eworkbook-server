import { GetNextMaterialDto } from './dtos/get-next-material.dto';
import { ExercisesService } from './../exercises/exercises.service';
import { CreateMaterialDto } from './dtos/create-material.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RecordBookDocument,
  RecordBook,
} from '../record-books/schemas/record-books.schema';
import { Material, MaterialDocument } from './schemas/material.schema';
import { RecordBooksService } from 'src/record-books/record-books.service';
//schemas/record-books.schema
@Injectable()
export class MaterialsService {
  constructor(
    @InjectModel(Material.name)
    private readonly materialModel: Model<MaterialDocument>,
    private readonly exercisesService: ExercisesService,
    private readonly recordBooksService: RecordBooksService,
  ) { }

  async fakeData(materials: any): Promise<any> {
    materials.forEach(async (material) => {
      return await this.materialModel.create(material);
    });
  }

  async getDemoMaterialId(): Promise<any> {
    const material = await this.materialModel.findOne({
      name: 'eWorkbook Demo',
    });
    return material._id;
  }

  async createMaterial(material: CreateMaterialDto): Promise<any> {
    console.log('createMaterialDto from service', material);
    const newMaterial = new this.materialModel(material);
    await newMaterial.save();
    // console.log('new material', newMaterial);
    return newMaterial;
  }
  async updateMaterial(id, material): Promise<any> {
    const updatedMaterial = await this.materialModel.findByIdAndUpdate(
      id,
      material,
    );
    return updatedMaterial;
  }

  async deleteMaterial(id): Promise<any> {
    const child = await this.materialModel.findOne({ parent: id });
    if (child) {
      return {
        error: 'hasChild',
      };
    }
    await this.exercisesService.deleteMaterialExercises(id);
    await this.materialModel.deleteOne({ _id: id });
    return { success: 'success' };
  }

  async getPagingMaterials(filter): Promise<any> {
    if (filter.isPublicForOtherTeacher === 'true') {
      const skip = filter.pageSize * filter.current - filter.pageSize;
      const limit = filter.pageSize;
      if (filter.ratingStarAverage) {
        filter.ratingStarAverage = {
          $gte: +filter.ratingStarAverage,
          $lt: +filter.ratingStarAverage + 1,
        };
      }
      if (filter.name) filter.name = new RegExp(filter.name, 'i');

      filter.$or = [
        { isPublicForOtherTeacher: true },
        { author: filter.author },
      ];
      delete filter.isPublicForOtherTeacher;
      delete filter.author;

      const data = await this.materialModel
        .find(filter)
        .sort(filter.sortBy || 'timeCreate')
        .skip(skip)
        .limit(limit)
        .populate('author');
      const total = await this.materialModel.countDocuments(filter);
      return { data, total };
    } else {
      const skip = filter.pageSize * filter.current - filter.pageSize;
      const limit = filter.pageSize;
      if (filter.ratingStarAverage) {
        filter.ratingStarAverage = {
          $gte: +filter.ratingStarAverage,
          $lt: +filter.ratingStarAverage + 1,
        };
      }
      if (filter.name) filter.name = new RegExp(filter.name, 'i');

      const data = await this.materialModel
        .find(filter)
        .sort(filter.sortBy || 'timeCreate')
        .skip(skip)
        .limit(limit)
        .populate('author');

      for (const material of data) {
        const totalStudent = await this.recordBooksService.getTotalStudents(
          material._id,
        );
        material.totalStudents = totalStudent;
      }

      const total = await this.materialModel.countDocuments(filter);
      return { data, total };
    }
  }
  async getPagingMaterialsWithExercises(filter): Promise<any> {
    const skip = filter.pageSize * filter.current - filter.pageSize;
    const limit = filter.pageSize;
    if (filter.ratingStarAverage) {
      filter.ratingStarAverage = {
        $gte: +filter.ratingStarAverage,
        $lt: +filter.ratingStarAverage + 1,
      };
    }
    if (filter.name) filter.name = new RegExp(filter.name, 'i');

    const data = await this.materialModel
      .find(filter)
      .sort(filter.sortBy || 'name')
      .skip(skip)
      .limit(limit)
      .populate('exercises');
    const total = await this.materialModel.countDocuments(filter);
    return { data, total };
  }

  async getFieldValues() {
    let levels = await this.materialModel.aggregate([
      { $match: { depthLevel: 1, status: 'public' } },
      {
        $group: {
          _id: '$CEFR',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
    levels = levels.map((value) => value._id);

    let types = await this.materialModel.aggregate([
      { $match: { depthLevel: 1, status: 'public' } },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
    types = types.map((value) => value._id);

    return { levels, types };
  }

  async getMaterials(filter): Promise<any> {
    // eslint-disable-next-line prefer-const
    let { name, ...criteria } = filter;
    if (name == undefined) name = '';
    filter = { ...criteria, name: { $regex: name, $options: 'i' } };
    const materials = await this.materialModel.find(filter);
    // console.log(materials)
    return materials;
  }

  async getMaterialById(id): Promise<any> {
    try {
      return await this.materialModel.findOne({ _id: id });
    } catch (error) {
      throw new NotFoundException('Material not found');
    }
  }
  // async getTotalStudents(materialId: string): Promise<any> {
  //   const result = await this.RecordBookModel.countDocuments({
  //     material: materialId,
  //   });
  //   return result;
  // }
  async getMaterial(id): Promise<any> {
    try {
      const Allmaterials = await this.materialModel.find();
      const Allexercises = await this.exercisesService.getExerciseNoPopulate(
        {},
      );
      const material = await this.materialModel.findOne({ _id: id });
      material.children = [];
      if (Allmaterials === null) {
        // console.log('no materials');
        throw new NotFoundException('Material not found');
      }

      material.children = await this.getAllChildOfThis(
        Allexercises,
        Allmaterials,
        material,
      );
      material.exercises = this.getAllExerciseOfThis(Allexercises, material);
      // const students = await this.recordBooksService.getTotalStudents(id);
      return material;
    } catch (error) {
      throw new NotFoundException('Material not found');
    }
  }
  async getRootOfThisMaterial(id): Promise<any> {
    let material = await this.materialModel.findOne({ _id: id });
    while (material.parent) {
      material = await this.materialModel.findOne({ _id: material.parent });
    }
    return material;
  }
  getAllChildOfThis(Allexercises, Allmaterials, material) {
    material.exercises = this.getAllExerciseOfThis(Allexercises, material);

    const children = new Array<Material>();
    Allmaterials.forEach((mat) => {
      if (mat.parent?.toString() === material._id.toString()) {
        mat.children = this.getAllChildOfThis(Allexercises, Allmaterials, mat);
        mat.exercises = this.getAllExerciseOfThis(Allexercises, mat);
        children.push(mat);
      }
    });
    return children;
  }
  getAllExerciseOfThis(Allexercises, material) {
    const exercises = new Array<any>();
    Allexercises.forEach((ex) => {
      if (ex.parentMaterial?.toString() === material._id.toString()) {
        exercises.push(ex);
      }
    });
    return exercises;
  }
  async increaseRatingCount(id): Promise<any> {
    return await this.materialModel.findOneAndUpdate(
      { _id: id },
      { $inc: { ratingCount: 1 } },
    );
  }
  async updateRatingStartAverage(id, averageStar): Promise<any> {
    return await this.materialModel.findOneAndUpdate(
      { _id: id },
      { ratingStarAverage: averageStar },
    );
  }
  async getRatingCount(id): Promise<any> {
    const returnMaterial = await this.materialModel.findById(id);
    return returnMaterial.ratingCount;
  }
  async getRatingStarAverage(id): Promise<any> {
    const returnMaterial = await this.materialModel.findById(id);
    return returnMaterial.ratingStarAverage;
  }

  async setAuthor(materialId, authorId): Promise<any> {
    const material = await this.getMaterial(materialId);

    await this.materialModel.findOneAndUpdate(
      { _id: materialId },
      {
        author: authorId,
        status: 'public',
      },
    );

    material.children.forEach((material) => {
      this.setAuthor(material._id, authorId);
    });

    return material;
  }
  countLeafsOfThis(material) {
    //count all child material that has no child
    let count = 0;
    material.children.forEach((child) => {
      if (child.children.length === 0) {
        count++;
      } else {
        count += this.countLeafsOfThis(child);
      }
    });
    return count;
  }

  async getNextMaterial(infor: GetNextMaterialDto): Promise<any> {
    try {
      const { current } = infor;
      let currentMaterial = await this.materialModel.findOne({ _id: current });
      let result = null;
      do {
        const materialWithSameParent = await this.getMaterial(
          currentMaterial.parent,
        );
        const index = materialWithSameParent.children.findIndex(
          (material) =>
            material._id.toString() === currentMaterial._id.toString(),
        );
        if (index < materialWithSameParent.children.length - 1) {
          result = materialWithSameParent.children[index + 1];
          currentMaterial = result;
          if (result.exercises.length !== 0) break;
          else {
            result = result.children[0];
          }
        } else {
          currentMaterial = materialWithSameParent;
          result = currentMaterial;
        }
      } while (result.exercises.length === 0);
      return result;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('No next material');
    }
  }

  async getHighlyRatedMaterials(): Promise<any> {
    const materials = await this.materialModel
      .find({ status: 'public', depthLevel: 1 })
      .sort({ ratingStarAverage: -1 })
      .limit(10)
      .populate('author', ['firstName', 'lastName']);
    return materials;
  }

  async getTopStudentsMaterials(): Promise<any> {
    const materialsId =
      await this.recordBooksService.getTopStudentsMaterialId();
    const materials = await this.materialModel
      .find({
        _id: { $in: materialsId },
      })
      .populate('author', ['firstName', 'lastName']);
    return materials;
  }
}
