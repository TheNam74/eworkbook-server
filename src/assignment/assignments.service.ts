import { AssignmentDocument, Assignment } from './schemas/assignments.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAssignmentDto } from './dtos/create-assignment.dto';
@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignment.name)
    private readonly assignmentModel: Model<AssignmentDocument>,
  ) { }
  async getPagingAssignments(filter: any): Promise<any> {
    const skip = filter.pageSize * filter.current - filter.pageSize;
    const limit = filter.pageSize;

    if (filter.name) filter.name = new RegExp(filter.name, 'i');

    //console.log('filter:', filter);

    const data = await this.assignmentModel
      .find(filter)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate('material')
      .populate('student')
      .populate('teacher')
      .populate('record')
      .exec();
    const total = await this.assignmentModel.countDocuments(filter);
    return { data, total };
  } async getOneAssignment(filter: any): Promise<any> {


    if (filter.name) filter.name = new RegExp(filter.name, 'i');

    //console.log('filter:', filter);

    const data = await this.assignmentModel
      .findOne(filter)
      .populate('material')
      .populate('student')
      .populate('teacher')
      .exec();
    return { data };
  }
  async getAllAssignment(): Promise<AssignmentDocument[]> {
    return await this.assignmentModel.find().exec();
  }
  async getAssignmentsByUserId(userId: string): Promise<AssignmentDocument[]> {
    try {
      const assignments = await this.assignmentModel
        .find({ student: userId })
        .populate('material')
        .exec();
      return assignments;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAssignmentsByUserIdByTeacher(userId: string, teacherId: string): Promise<AssignmentDocument[]> {
    try {
      const assignments = await this.assignmentModel
        .find({ student: userId, teacher: teacherId })
        .populate('material')
        .exec();
      return assignments;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createAssignment(
    ass: CreateAssignmentDto,
  ): Promise<AssignmentDocument> {
    const assignment = new this.assignmentModel(ass);
    await assignment.save();
    return assignment;
  }
  async getAssignmentsOfBook(
    bookId: string,
    userId: string,
  ): Promise<AssignmentDocument[]> {
    return await this.assignmentModel.find({ student: userId, material: bookId }).exec();
  }
  async getAssignmentByBookId(
    bookId: string,
  ): Promise<any[]> {
    return await this.assignmentModel.find({ material: bookId }).populate('material')
      .populate('student')
      .exec();
  }
  async deleteAssignment(bookid: string, userid: string): Promise<any> {
    return await this.assignmentModel.deleteOne({ material: bookid, student: userid }).exec();
  }
  async updateAssignment(id: string, createAssignmentDto: CreateAssignmentDto): Promise<any> {
    return await this.assignmentModel.updateOne({ _id: id }, createAssignmentDto).exec();
  }
  async checkUpdateHighestRecord(record: any, userId: string): Promise<any> {
    const materialId = record.parent._id;
    const assignment = await this.assignmentModel.findOne({ material: materialId, student: userId }).exec();
    const oldRecord = assignment?.record;
    if (oldRecord === undefined || oldRecord === null || oldRecord.numberCorrect < record.numberCorrect) {
      return await this.assignmentModel.updateOne({ material: record.parent._id, student: userId }, { record: record }).exec();
    }
  }
}
