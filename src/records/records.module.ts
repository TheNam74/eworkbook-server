import { AssignmentsModule } from './../assignment/assignments.module';
import { RecordBooksModule } from 'src/record-books/record-books.module';
import { Record, RecordSchema } from './schemas/records.schema';
import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
// import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Record.name,
        schema: RecordSchema,
      },
    ]),
    RecordBooksModule,
    AssignmentsModule,
    UsersModule
  ],
  // controllers: [RecordsController],
  providers: [RecordsService],
  exports: [RecordsService],
  controllers: [RecordsController],
})
export class RecordsModule { }
