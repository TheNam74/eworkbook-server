import { GetNextMaterialDto } from './dtos/get-next-material.dto';
import { ExercisesService } from './../exercises/exercises.service';
import { CreateMaterialDto } from './dtos/create-material.dto';
import { Model } from 'mongoose';
import { Material, MaterialDocument } from './schemas/material.schema';
import { RecordBooksService } from 'src/record-books/record-books.service';
export declare class MaterialsService {
    private readonly materialModel;
    private readonly exercisesService;
    private readonly recordBooksService;
    constructor(materialModel: Model<MaterialDocument>, exercisesService: ExercisesService, recordBooksService: RecordBooksService);
    fakeData(materials: any): Promise<any>;
    getDemoMaterialId(): Promise<any>;
    createMaterial(material: CreateMaterialDto): Promise<any>;
    updateMaterial(id: any, material: any): Promise<any>;
    deleteMaterial(id: any): Promise<any>;
    getPagingMaterials(filter: any): Promise<any>;
    getPagingMaterialsWithExercises(filter: any): Promise<any>;
    getFieldValues(): Promise<{
        levels: any[];
        types: any[];
    }>;
    getMaterials(filter: any): Promise<any>;
    getMaterialById(id: any): Promise<any>;
    getMaterial(id: any): Promise<any>;
    getRootOfThisMaterial(id: any): Promise<any>;
    getAllChildOfThis(Allexercises: any, Allmaterials: any, material: any): Material[];
    getAllExerciseOfThis(Allexercises: any, material: any): any[];
    increaseRatingCount(id: any): Promise<any>;
    updateRatingStartAverage(id: any, averageStar: any): Promise<any>;
    getRatingCount(id: any): Promise<any>;
    getRatingStarAverage(id: any): Promise<any>;
    setAuthor(materialId: any, authorId: any): Promise<any>;
    countLeafsOfThis(material: any): number;
    getNextMaterial(infor: GetNextMaterialDto): Promise<any>;
    getHighlyRatedMaterials(): Promise<any>;
    getTopStudentsMaterials(): Promise<any>;
}
