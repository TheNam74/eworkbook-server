import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PairsService } from './Pairs.service';
import { Pair } from './schemas/pairs.schema';

@Controller('Pairs')
@ApiTags('Pairs')
export class PairsController {
  constructor(private readonly PairsService: PairsService) { }

  @Get()
  async getAllPairs(): Promise<Pair[]> {
    return await this.PairsService.getAllPair();
  }

  @Get('/teacher/:id')
  async getPairsByUserId(@Param('id') id: string): Promise<Pair[]> {
    return await this.PairsService.getPairsByUserId(id);
  }
  @Get('/paging')
  getPagingPairs(@Query() filter: any): Promise<Pair[]> {
    return this.PairsService.getPagingPairs(filter);
  }

  @Get('/:id')
  async getPairById(@Param('id') id: string): Promise<Pair> {
    return await this.PairsService.getPairById(id);
  }

  @Get('/:teacherId/:studentId')
  async createPair(
    @Param('teacherId') teacherId: string,
    @Param('studentId') studentId: string,
  ): Promise<Pair> {
    const pairDto = {
      teacher: teacherId,
      student: studentId,
    };
    return await this.PairsService.createPair(pairDto);
  }


}
