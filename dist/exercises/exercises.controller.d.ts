/// <reference types="multer" />
import { RecordsService } from './../records/records.service';
import { ExercisesService } from './exercises.service';
import { MaterialsService } from '../materials/materials.service';
import { Exercise } from './schemas/exercise.schema';
import { CreateExerciseDto } from './dtos/create-exercise.dto';
import { CreateMaterialExercisesDto } from './dtos/create-material-exercises.dto';
import { UpdateExerciseDto } from './dtos/update-exercise.dto';
export declare class ExercisesController {
    private exercisesService;
    private recordService;
    private materialService;
    constructor(exercisesService: ExercisesService, recordService: RecordsService, materialService: MaterialsService);
    getExercises(filter: any): Promise<Exercise[]>;
    updateExercise(body: UpdateExerciseDto): Promise<Exercise>;
    createExercise(createExerciseDto: CreateExerciseDto): Promise<Exercise>;
    handleUpload(file: Express.Multer.File): {
        url: string;
    };
    handleUploadAudio(file: Express.Multer.File): {
        url: string;
    };
    getImage(filename: string, res: any): import("rxjs").Observable<any>;
    getAudio(filename: string, res: any): import("rxjs").Observable<any>;
    createMaterialExercises(body: CreateMaterialExercisesDto): void;
    deleteExercise(req: any, id: string): Promise<void>;
    receiveStatus(userId: any, body: any): Promise<any>;
}
