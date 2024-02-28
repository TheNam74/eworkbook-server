import { RecordBookDocument, RecordBook } from './schemas/record-books.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecordBookDto } from './dtos/create-record-books.dto';
@Injectable()
export class RecordBooksService {
  constructor(
    @InjectModel(RecordBook.name)
    private readonly RecordBookModel: Model<RecordBookDocument>,
  ) {}
  async getPagingMaterials(filter: any): Promise<any> {
    const skip = filter.pageSize * filter.current - filter.pageSize;
    const limit = filter.pageSize;

    if (filter.name) filter.name = new RegExp(filter.name, 'i');

    //console.log('filter:', filter);

    const data = await this.RecordBookModel.find(filter)
      .sort('time')
      .skip(skip)
      .limit(limit)
      .populate('material')
      .populate('userId');
    const total = await this.RecordBookModel.countDocuments(filter);
    return { data, total };
  }
  async getRecordBook(
    userId: string,
    bookId: string,
  ): Promise<RecordBookDocument> {
    return await this.RecordBookModel.findOne({ userId, material: bookId });
  }
  async getAllRecordBook(): Promise<RecordBookDocument[]> {
    return await this.RecordBookModel.find().populate('userId');
  }
  async getRecordBooksByUserId(userId: string): Promise<RecordBookDocument[]> {
    try {
      const RecordBooks = await this.RecordBookModel.find({ userId })
        .populate('material')
        .exec();
      return RecordBooks;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createRecordBook(
    exercise: CreateRecordBookDto,
  ): Promise<RecordBookDocument> {
    const RecordBook = new this.RecordBookModel(exercise);
    await RecordBook.save();
    return RecordBook;
  }
  async checkUpdateRecordBookFromRecord(
    materialService,
    record: any,
    userId: string,
  ) {
    await record.populate('parent');

    const bookId = record.root._id;
    const recordbook = await this.RecordBookModel.findOne({
      userId: userId,
      material: bookId,
    });
    //console.log(record);
    if (recordbook) {
      if (
        this.checkArrayContains(recordbook.LeafDone, record.parent._id) ===
        false
      ) {
        //console.log("user has recordbook but not this leaf");
        const temp = [...recordbook.LeafDone];
        temp.push(record.parent._id);
        recordbook.LeafDone = temp; //recordbook.LeafDone.push(record.parent._id);
      }
      //else //console.log("user has recordbook and this leaf");

      const tempChildren = [...recordbook.children];
      tempChildren.push(record._id);
      recordbook.children = tempChildren;
      recordbook.time = new Date();
      await recordbook.save();
    } else {
      //console.log("user has no recordbook");
      const rootWithChilds = await materialService.getMaterial(record.root._id);
      const countLeaf = this.countLeafsOfThis(rootWithChilds);

      const children = [];
      children.push(record._id);

      const leafDones = [];
      leafDones.push(record.parent._id);

      await this.createRecordBook({
        material: bookId,
        LeafDone: leafDones,
        numberOfLeafTotal: countLeaf,
        time: new Date(),
        userId: userId,
        children: children,
        name: rootWithChilds.name,
      });
    }
  }
  async getOneRecordBook(
    bookId: string,
    userId: string,
  ): Promise<RecordBookDocument> {
    const recordbook = await this.RecordBookModel.findOne({
      userId: userId,
      material: bookId,
    });
    return recordbook;
  }
  async getUsersLearningThisBook(bookId: string, userId: string): Promise<any> {
    const myrecordbook = await this.RecordBookModel.findOne({
      material: bookId,
      userId: userId,
    }).populate('userId');
    let recordBooks = await this.RecordBookModel.find({ material: bookId })
      .populate('userId')
      .limit(4);
    recordBooks = recordBooks.filter(function (value, index, arr) {
      return value._id !== userId;
    });
    const total = await this.RecordBookModel.countDocuments({
      material: bookId,
    });
    return { recordBooks, total };
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
  checkArrayContains(array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].toString() === value.toString()) {
        return true;
      }
    }
    return false;
  }

  async getTopStudentsMaterialId(): Promise<any> {
    const result = await this.RecordBookModel.aggregate([
      {
        $group: {
          _id: '$material',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);
    return result;
  }

  async getTotalStudents(materialId: string): Promise<any> {
    const result = await this.RecordBookModel.countDocuments({
      material: materialId,
    });
    return result;
  }
}
