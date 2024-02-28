import { AssignmentsService } from './../assignment/assignments.service';
import { RecordBooksService } from './../record-books/record-books.service';
import { RecordDocument, Record } from './schemas/records.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecordDto } from './dtos/create-record.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RecordsService {

  constructor(
    @InjectModel(Record.name)
    private readonly recordModel: Model<RecordDocument>,
    private readonly recordBookService: RecordBooksService,
    private readonly assignmentService: AssignmentsService,
    private readonly usersService: UsersService
  ) { }
  async getPagingRecords(filter: any): Promise<any> {
    if (filter.pageSize === 0) filter.pageSize = 1;
    const skip = filter.pageSize * filter.current - filter.pageSize;
    const limit = filter.pageSize;

    if (filter.name) filter.name = new RegExp(filter.name, 'i');

    //console.log('filter:', filter);

    const data = await this.recordModel
      .find(filter)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate('parent')
      .populate('root')
      .exec();
    const total = await this.recordModel.countDocuments(filter);
    return { data, total };
  }
  async getPagingHighestRecords(filter: any): Promise<any> {
    if (filter.pageSize === 0) filter.pageSize = 1;
    const skip = filter.pageSize * filter.current - filter.pageSize;
    const limit = filter.pageSize;

    if (filter.name) filter.name = new RegExp(filter.name, 'i');

    let data = await this.recordModel
      .find(filter)
      .sort({ _id: -1 })
      .populate('parent')
      .populate('root')
      .exec();

    for (let i = 0; i < data.length; i++) {
      for (let j = i + 1; j < data.length; j++) {
        if (data[i].parent === data[j].parent) {
          if (data[i].numberCorrect < data[j].numberCorrect) {
            data.splice(i, 1);
            i--;
            break;
          } else {
            data.splice(j, 1);
            j--;
          }
        }
      }
    }




    //then just keep the most recent one
    for (let i = 0; i < data.length; i++) {
      for (let j = i + 1; j < data.length; j++) {
        if (data[i].parent == data[j].parent) {
          const date1 = new Date(data[i].time);
          const date2 = new Date(data[j].time);
          if (date1 < date2) {
            data.splice(i, 1);
            i--;
            break;
          } else {
            data.splice(j, 1);
            j--;
          }
        }
      }
    }


    const total = data.length;
    data = data.slice(skip, skip + limit);

    return { data, total };
  }
  async getAllRecord(): Promise<RecordDocument[]> {
    return await this.recordModel.find().exec();
  }
  async getRecordsByUserId(userId: string): Promise<RecordDocument[]> {
    try {
      const records = await this.recordModel
        .find({ userId })
        .populate('parent')
        .populate('root')
        .exec();
      return records;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createRecord(
    materialService,
    exercise: CreateRecordDto,
  ): Promise<RecordDocument> {
    const record = new this.recordModel(exercise);
    await record.save();
    this.recordBookService.checkUpdateRecordBookFromRecord(
      materialService,
      record,
      exercise.userId,
    );
    this.assignmentService.checkUpdateHighestRecord(record,
      exercise.userId);
    return record;
  }
  async getRecordsOfBook(
    bookId: string,
    userId: string,
  ): Promise<RecordDocument[]> {
    const recordBook = await this.recordBookService.getOneRecordBook(
      bookId,
      userId,
    );
    if (recordBook) {
      const idsObj = recordBook.children;
      const ids = [];
      //convert array objectId to array string
      for (const key in idsObj) {
        ids.push(idsObj[key].toString());
      }
      console.log('ids:', ids);
      const records = await this.recordModel.find({ _id: { $in: ids } });
      return records;
    } else return [];
  }
  async getRecordById(id: string): Promise<RecordDocument> {
    return await this.recordModel.findById(id).exec();
  }
  async getDoTimes(id: string,userId:string): Promise<any> {
    console.log('id:', id);
    console.log('user   id:', userId);
    const record = await this.recordModel.findOne({ parent: id, userId: userId }); //get the first record, if it exists then count, elese return 0
    if (record) {
      const records = await this.recordModel.find({
        parent: id,
        userId: userId
      }).exec();
      return {
        data: records.length,
        userId: userId,
        material: record.parent,
        id: id,
      };
    } else return { data: 0 };
  }
  async checkRecord(materialId: string, email: string): Promise<any> {
    try {
      const user = await this.usersService.getUserByEmail(email);
      const userId = user._id;
      const records = await this.recordModel
        .find({ parent: materialId, userId })
        .exec();
      if (records && records.length > 0) {
        //get the highest score record, if there are more than one record with the same score, get the most recent one
        let highestRecord = records[0];
        for (let i = 1; i < records.length; i++) {
          if (records[i].numberCorrect > highestRecord.numberCorrect) {
            highestRecord = records[i];
          } else if (
            records[i].numberCorrect === highestRecord.numberCorrect
          ) {
            const date1 = new Date(records[i].time);
            const date2 = new Date(highestRecord.time);
            if (date1 > date2) {
              highestRecord = records[i];
            }
          }
        }
        return {
          achivedPoint: highestRecord.numberCorrect,
          total: highestRecord.totalQuestion,
          status: true
        };
      }
      else return {
        status: false
      };

    }
    catch (error) {
      console.log(error);
      return {
        status: false
      };
    }
  }
}
