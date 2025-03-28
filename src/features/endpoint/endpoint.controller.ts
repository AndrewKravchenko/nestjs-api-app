import { getAllRoutes } from '@features/endpoint/endpoint.utils';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request as ExpressRequest } from 'express';

import { CreateEndpointDto } from './dto/create-endpoint.dto';
import { UpdateEndpointDto } from './dto/update-endpoint.dto';
import { EndpointService } from './endpoint.service';

@Controller('api/v1/endpoints')
export class EndpointController {
  constructor(
    private adapterHost: HttpAdapterHost,
    private readonly endpointService: EndpointService,
  ) {}

  @Post()
  create(@Body() createEndpointDto: CreateEndpointDto) {
    return this.endpointService.create(createEndpointDto);
  }

  @Get('/all')
  root(@Request() req: ExpressRequest) {
    const router = req.app.router;
    return getAllRoutes(router);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.endpointService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEndpointDto: UpdateEndpointDto,
  ) {
    return this.endpointService.update(+id, updateEndpointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.endpointService.remove(+id);
  }
}
