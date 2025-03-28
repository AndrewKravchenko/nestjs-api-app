import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EndpointController } from './endpoint.controller';
import { EndpointService } from './endpoint.service';
import { Endpoint } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Endpoint])],
  controllers: [EndpointController],
  providers: [EndpointService],
})
export class EndpointModule {}
