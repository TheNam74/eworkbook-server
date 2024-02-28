import { CreateAssignmentDto } from './dtos/create-assignment.dto';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AssignmentsService } from './assignments.service';
import { Assignment } from './schemas/assignments.schema';

@Controller('assignments')
@ApiTags('Assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) { }

  @Get()
  async getAllAssignments(): Promise<Assignment[]> {
    return await this.assignmentsService.getAllAssignment();
  }

  @Get('/user/:id')
  async getAssignmentsByUserId(@Param('id') id: string): Promise<Assignment[]> {
    return await this.assignmentsService.getAssignmentsByUserId(id);
  }
  @Get('/user/:id/teacher/:teacherId')
  async getAssignmentsByUserIdByTeacher(
    @Param('id') id: string,
    @Param('teacherId') teacherId: string): Promise<Assignment[]> {
    return await this.assignmentsService.getAssignmentsByUserIdByTeacher(id, teacherId);
  }
  @Get('/paging')
  getPagingAssignment(@Query() filter: any): Promise<Assignment[]> {
    return this.assignmentsService.getPagingAssignments(filter);
  }
  @Get('/one')
  getOneAssgnemnt(@Query() filter: any): Promise<Assignment[]> {
    return this.assignmentsService.getOneAssignment(filter);
  }
  @Get('/book/:id/:userId')
  async getAssignmentsOfBook(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ): Promise<Assignment[]> {
    return await this.assignmentsService.getAssignmentsOfBook(id, userId);
  }
  @Post()
  @ApiBody({ type: CreateAssignmentDto })
  async createMaterial(
    @Body() createAssignmentDto: CreateAssignmentDto,
  ): Promise<Assignment> {
    // console.log('createMaterialDto', createMaterialDto);
    await this.assignmentsService.deleteAssignment(createAssignmentDto.material, createAssignmentDto.student);
    return this.assignmentsService.createAssignment(createAssignmentDto);
  }
  @Get('/:bookId')
  async getAssignmentByBookId(@Param('bookId') bookId: string): Promise<Assignment[]> {
    return await this.assignmentsService.getAssignmentByBookId(bookId);
  }

  @Post('/delete/:bookid/:userid')
  async deleteAssignment(@Param('bookid') bookid: string, @Param('userid') userid: string): Promise<Assignment> {
    return await this.assignmentsService.deleteAssignment(bookid, userid);
  }
  @Post('/update/:id')
  async updateAssignment(@Param('id') id: string, @Body() createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    return await this.assignmentsService.updateAssignment(id, createAssignmentDto);
  }

}
