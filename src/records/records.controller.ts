import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RecordsService } from './records.service';
import { Record } from './schemas/records.schema';
import { GetCurrentUserId, Public } from 'src/common/decorators';


@Controller('records')
@ApiTags('Records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) { }

  @Get()
  async getAllRecords(): Promise<Record[]> {
    return await this.recordsService.getAllRecord();
  }

  @Get('/user/:id')
  async getRecordsByUserId(@Param('id') id: string): Promise<Record[]> {
    return await this.recordsService.getRecordsByUserId(id);
  }
  @Get('/paging')
  getPagingRecords(@Query() filter: any): Promise<Record[]> {
    return this.recordsService.getPagingRecords(filter);
  }
  @Get('/paginghighest')
  getPagingHighestRecords(@Query() filter: any): Promise<Record[]> {
    return this.recordsService.getPagingHighestRecords(filter);
  }
  @Get('/book/:id/:userId')
  async getRecordsOfBook(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ): Promise<Record[]> {
    return await this.recordsService.getRecordsOfBook(id, userId);
  }
  @Get('/:id')
  async getRecordById(@Param('id') id: string): Promise<Record> {
    return await this.recordsService.getRecordById(id);
  }
  @Get('/doTimes/:id/:userId')
  async getDoTimes(@Param('userId') userId, @Param('id') id: string): Promise<any> {
    return await this.recordsService.getDoTimes(id,userId);
  }
  @Get('/check/:materialId/:email')
  async checkRecord(
    @Param('materialId') materialId: string,
    @Param('email') email: string,
  ): Promise<any> {
    return await this.recordsService.checkRecord(materialId, email);
  }
}
