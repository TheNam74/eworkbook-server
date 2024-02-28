import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { ConsultController } from './consult.controller';
import ConsultService from './consult.service';
import { Consult, ConsultSchema } from './schemas/consult.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Consult.name,
        schema: ConsultSchema,
      },
    ]),
    UsersModule,
  ],
  providers: [ConsultService],
  exports: [ConsultService],
  controllers: [ConsultController],
})
export class ConsultModule {}
