import { CreateMaterialDto } from './dtos/create-material.dto';
import {
  Body,
  Controller,
  Get,
  Query,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
  Put,
} from '@nestjs/common';

import { MaterialsService } from './materials.service';
import { Material } from './schemas/material.schema';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { of } from 'rxjs';
import { Delete, UseGuards } from '@nestjs/common/decorators';
import { AtGuard } from 'src/common/guards';
import { Public } from 'src/common/decorators';
import { GetNextMaterialDto } from './dtos/get-next-material.dto';
@Controller('materials')
@ApiTags('Material')
@UseGuards(AtGuard)
export class MaterialsController {
  constructor(private materialsService: MaterialsService) {}
  // @UseGuards(JwtAuthGuard)
  @Get()
  getMaterials(@Query() filter: any): Promise<Material[]> {
    return this.materialsService.getMaterials(filter);
  }

  @Public()
  @Get('/demoId')
  getDemoMaterialId(): Promise<Material[]> {
    return this.materialsService.getDemoMaterialId();
  }

  @Get('/paging')
  getPagingMaterials(@Query() filter: any): Promise<Material[]> {
    return this.materialsService.getPagingMaterials(filter);
  }

  @Get('/pagingwithexs')
  getPagingMaterialsWithExs(@Query() filter: any): Promise<Material[]> {
    return this.materialsService.getPagingMaterialsWithExercises(filter);
  }

  @Get('/fields')
  getFieldValues() {
    return this.materialsService.getFieldValues();
  }
  @Get('highlyRated')
  getHighlyRatedMaterials(): Promise<Material[]> {
    return this.materialsService.getHighlyRatedMaterials();
  }

  @Get('topStudents')
  getTopStudentsMaterials(): Promise<Material[]> {
    return this.materialsService.getTopStudentsMaterials();
  }

  @Get('/:id')
  getMaterial(@Param('id') id: string): Promise<Material> {
    return this.materialsService.getMaterialById(id);
  }
  @Get('/root/:id')
  getMaterialRoot(@Param('id') id: string): Promise<Material> {
    return this.materialsService.getMaterial(id);
  }

  @Put('/update/:id')
  @ApiBody({ type: CreateMaterialDto })
  updateMaterial(
    @Param('id') id: string,
    @Body() createMaterialDto: CreateMaterialDto,
  ) {
    return this.materialsService.updateMaterial(id, createMaterialDto);
  }

  @Delete('/:id')
  deleteMaterial(@Param('id') id: string) {
    return this.materialsService.deleteMaterial(id);
  }

  @Post()
  @ApiBody({ type: CreateMaterialDto })
  createMaterial(
    @Body() createMaterialDto: CreateMaterialDto,
  ): Promise<Material> {
    // console.log('createMaterialDto', createMaterialDto);
    return this.materialsService.createMaterial(createMaterialDto);
  }
  @Public()
  @Post('images')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/images/materials',
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
  @Get('images/:filename')
  getImage(@Param('filename') filename: string, @Res() res) {
    return of(
      res.sendFile(join(process.cwd(), `uploads/images/materials/${filename}`)),
    );
  }

  @Public()
  @Get('parentMaterial/:id')
  getParentMaterial(@Param('id') id: string): Promise<Material> {
    return this.materialsService.getRootOfThisMaterial(id);
  }

  @Public()
  @Get('setAuthor/:materialId/:authorId')
  setAuthor(
    @Param('materialId') materialId: string,
    @Param('authorId') authorId: string,
  ): Promise<Material> {
    return this.materialsService.setAuthor(materialId, authorId);
  }
  @Public()
  @Post('getNextMaterial')
  getNextMaterial(@Body() infor: GetNextMaterialDto): Promise<Material> {
    return this.materialsService.getNextMaterial(infor);
  }
}
