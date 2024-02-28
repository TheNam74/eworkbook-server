import { RecordsService } from './../records/records.service';

import {
  Request,
  Body,
  Controller,
  Get,
  Query,
  Post,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
  All,
  UseGuards,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { MaterialsService } from '../materials/materials.service';
import { Exercise } from './schemas/exercise.schema';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateExerciseDto } from './dtos/create-exercise.dto';
import { CreateMaterialExercisesDto } from './dtos/create-material-exercises.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { of } from 'rxjs';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards/at.guard';
import { UpdateExerciseDto } from './dtos/update-exercise.dto';
@Controller('exercises')
@ApiTags('Exercise')
@UseGuards(AtGuard)
export class ExercisesController {
  constructor(
    private exercisesService: ExercisesService,
    private recordService: RecordsService,
    private materialService: MaterialsService,
  ) { }
  @Public()
  @Get()
  getExercises(@Query() filter: any): Promise<Exercise[]> {
    return this.exercisesService.getExercises(filter);
  }

  @Post('update')
  @ApiBody({ type: UpdateExerciseDto })
  updateExercise(@Body() body: UpdateExerciseDto) {
    return this.exercisesService.updateExercise(body);
  }
  @Post()
  @ApiBody({ type: CreateExerciseDto })
  createExercise(
    @Body() createExerciseDto: CreateExerciseDto,
  ): Promise<Exercise> {
    return this.exercisesService.createExercise(createExerciseDto);
  }
  @Public()
  @Post('images')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/images/exercises',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  handleUpload(@UploadedFile() file: Express.Multer.File) {
    return { url: file.filename };
  }

  @Public()
  @Post('audios')
  @UseInterceptors(
    FileInterceptor('audio', {
      storage: diskStorage({
        destination: './uploads/audios/exercises',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  handleUploadAudio(@UploadedFile() file: Express.Multer.File) {
    return { url: file.filename };
  }

  @Public()
  @Get('images/:filename')
  getImage(@Param('filename') filename: string, @Res() res) {
    return of(
      res.sendFile(join(process.cwd(), `uploads/images/exercises/${filename}`)),
    );
  }
  @Public()
  @Get('audios/:filename')
  getAudio(@Param('filename') filename: string, @Res() res) {
    return of(
      res.sendFile(join(process.cwd(), `uploads/audios/exercises/${filename}`)),
    );
  }

  // @Public()
  // @Post('audio')
  // @UseInterceptors(
  //   FileInterceptor('audio', {
  //     storage: diskStorage({
  //       destination: './uploads/audio',
  //       filename: (req, file, callback) => {
  //         const uniqueSuffix =
  //           Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         const ext = extname(file.originalname);
  //         const filename = `${uniqueSuffix}${ext}`;
  //         callback(null, filename);
  //       },
  //     }),
  //   }),
  // )
  // handleUploadAudio(@UploadedFile() file: Express.Multer.File) {
  //   return { url: file.filename };
  // }
  // @Public()
  // @Get('audio/:filename')
  // getAudio(@Param('filename') filename: string, @Res() res) {
  //   console.log("audio nekkk")
  //   return of(
  //     res.sendFile(join(process.cwd(), `uploads/audio/${filename}`)),
  //   );
  // }

  @Post('material')
  @ApiBody({ type: CreateMaterialExercisesDto })
  createMaterialExercises(@Body() body: CreateMaterialExercisesDto) {
    return this.exercisesService.createMaterialExercises(body);
  }

  @Delete(':id')
  deleteExercise(@Request() req, @Param('id') id: string): Promise<void> {
    return this.exercisesService.deleteExercise(id);
  }

  @Post('status')
  @UseGuards(AtGuard)
  @ApiBody({ type: All })
  async receiveStatus(@GetCurrentUserId() userId, @Body() body: any) {
    try {
      const status = await this.exercisesService.getStatusLesson(
        body.data.data,
      );
      const getNumberCorrect = (status) =>
        status?.reduce((acc, curr) => {
          return acc + curr.correct;
        }, 0);
      const getAllNumberCorrect = (status) =>
        status.reduce((acc, curr) => {
          return acc + getNumberCorrect(curr?.content?.status);
        }, 0);
      const getTotal = (status) =>
        status?.reduce((acc, curr) => {
          return acc + curr.content?.status?.length;
        }, 0);
      const material = await this.materialService.getMaterialById(
        body.data.materialId,
      );
      const root = await this.materialService.getRootOfThisMaterial(
        body.data.materialId,
      );
      const record = await this.recordService.createRecord(this.materialService, {
        userId: userId,
        time: new Date(),
        name: material.name,
        parent: material._id,
        root: root._id,
        numberCorrect: getAllNumberCorrect(status),
        totalQuestion: getTotal(status),
        children: [
          {
            userAnswer: status,
            exerciseId: body.data.materialId,
          },
        ],
      });
      return {
        status,
        recordId: record._id,
      }
    } catch (error) {
      return error;
    }
  }
}
