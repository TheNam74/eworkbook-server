import { RatingsModule } from './rating/ratings.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ExercisesModule } from './exercises/exercises.module';
import { ExerciseContentsModule } from './exercise-contents/exercise-contents.module';
import { MaterialsModule } from './materials/materials.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { RecordsModule } from './records/records.module';
import { AssignmentsModule } from './assignment/assignments.module';
import { PairsModule } from './pairs/pairs.module';
import { LoggerMiddleware } from './utils/logger.middleware';
import { ConsultModule } from './consults/consult.module';
// import { AtGuard } from './common/guards/at.guard';
// import { APP_GUARD } from '@nestjs/core/constants';
// import { DragAndDropModule } from './exercise-contents/drag-and-drop/drag-and-drop.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    AuthModule,
    ExercisesModule,
    ExerciseContentsModule,
    MaterialsModule,
    RecordsModule,
    AssignmentsModule,
    RatingsModule,
    PairsModule,
    ConsultModule,
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AtGuard,
    // },
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
