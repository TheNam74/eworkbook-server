/// <reference types="multer" />
import { CreateMaterialDto } from './dtos/create-material.dto';
import { MaterialsService } from './materials.service';
import { Material } from './schemas/material.schema';
import { GetNextMaterialDto } from './dtos/get-next-material.dto';
export declare class MaterialsController {
    private materialsService;
    constructor(materialsService: MaterialsService);
    getMaterials(filter: any): Promise<Material[]>;
    getDemoMaterialId(): Promise<Material[]>;
    getPagingMaterials(filter: any): Promise<Material[]>;
    getPagingMaterialsWithExs(filter: any): Promise<Material[]>;
    getFieldValues(): Promise<{
        levels: any[];
        types: any[];
    }>;
    getHighlyRatedMaterials(): Promise<Material[]>;
    getTopStudentsMaterials(): Promise<Material[]>;
    getMaterial(id: string): Promise<Material>;
    getMaterialRoot(id: string): Promise<Material>;
    updateMaterial(id: string, createMaterialDto: CreateMaterialDto): Promise<any>;
    deleteMaterial(id: string): Promise<any>;
    createMaterial(createMaterialDto: CreateMaterialDto): Promise<Material>;
    handleUpload(file: Express.Multer.File): {
        url: string;
    };
    getImage(filename: string, res: any): import("rxjs").Observable<any>;
    getParentMaterial(id: string): Promise<Material>;
    setAuthor(materialId: string, authorId: string): Promise<Material>;
    getNextMaterial(infor: GetNextMaterialDto): Promise<Material>;
}
