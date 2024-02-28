import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ConsultService from './consult.service';
import CreateConsultDto from './dtos/create-consult.dto';

@Controller('Consults')
@ApiTags('Consults')
export class ConsultController {
  constructor(private readonly consultService: ConsultService) {}

  @Post()
  async create(@Body() createConsultDto: CreateConsultDto) {
    return this.consultService.create(createConsultDto);
  }

  @Get()
  async findAll() {
    return this.consultService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.consultService.findOne(id);
  }
}
