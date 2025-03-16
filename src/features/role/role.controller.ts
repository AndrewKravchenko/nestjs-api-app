import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ResponseRoleDTO } from '@features/role/dto/response-role.dto';
import { TransformDTO } from '@common/interceptors/transform-dto.interceptor';
import { RoleEnum } from '@features/role/entities';

@Controller('api/v1/roles')
@TransformDTO(ResponseRoleDTO)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: RoleEnum) {
    return this.roleService.getRole(name);
  }

  @Patch(':name')
  update(@Param('name') name: RoleEnum, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(name, updateRoleDto);
  }

  @Delete(':name')
  remove(@Param('name') name: RoleEnum) {
    return this.roleService.remove(name);
  }
}
