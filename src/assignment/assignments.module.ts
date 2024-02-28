
import { Assignment, AssignmentSchema } from './schemas/assignments.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Assignment.name,
        schema: AssignmentSchema,
      },
    ]),
  ],
  // controllers: [AssignmentsController],
  providers: [AssignmentsService],
  exports: [AssignmentsService],
  controllers: [AssignmentsController],
})
export class AssignmentsModule { }
