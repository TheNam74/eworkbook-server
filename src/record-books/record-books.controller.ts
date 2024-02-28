import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RecordBooksService } from './record-books.service';
import { RecordBook } from './schemas/record-books.schema';

@Controller('recordBooks')
@ApiTags('recordBooks')
export class RecordBooksController {
  constructor(private readonly recordBooksService: RecordBooksService) {}

  @Get()
  async getAllRecordBooks(): Promise<RecordBook[]> {
    return await this.recordBooksService.getAllRecordBook();
  }

  @Get('/user/:id')
  async getRecordBooksByUserId(@Param('id') id: string): Promise<RecordBook[]> {
    return await this.recordBooksService.getRecordBooksByUserId(id);
  }
  @Get('/paging')
  getPagingMaterials(@Query() filter: any): Promise<RecordBook[]> {
    return this.recordBooksService.getPagingMaterials(filter);
  }
  @Get('/alsoLearn/:id/:userId')
  async alsoLearn(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ): Promise<any> {
    return await this.recordBooksService.getUsersLearningThisBook(id, userId);
  }
  @Get('/learningStudent/:id')
  async getMaterialRootLearningSudent(@Param('id') id: string): Promise<any> {
    const students = await this.recordBooksService.getTotalStudents(id);
    return students;
  }
  @Get('/:userId/:bookId')
  async getRecordBook(
    @Param('userId') userId: string,
    @Param('bookId') bookId: string,
  ): Promise<RecordBook> {
    return await this.recordBooksService.getRecordBook(userId, bookId);
  }
}
