import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Listening, ListeningSchema } from './schemas/listening.schema';
import { ListeningService } from './listening.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Listening.name,
        schema: ListeningSchema,
      },
    ]),
  ],
  providers: [ListeningService],
  exports: [
    MongooseModule.forFeature([
      {
        name: Listening.name,
        schema: ListeningSchema,
      },
    ]),
    ListeningService,
  ],
})
export class ListeningModule {}
