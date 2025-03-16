import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role, RoleEnum } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(role);
  }

  async getRole(name: RoleEnum) {
    const role = await this.roleRepository.findOne({
      where: { name, isActive: true },
      relations: { users: true },
    });

    if (!role) throw new NotFoundException(`No role ${name} found`);

    return role;
  }

  async findAll() {
    return await this.roleRepository.find({ where: { isActive: true } });
  }

  async update(name: RoleEnum, updateRoleDto: UpdateRoleDto) {
    const role = await this.getRole(name);

    role.description = updateRoleDto.description;
    return this.roleRepository.save(role);
  }

  async remove(name: RoleEnum) {
    const role = await this.getRole(name);

    if (role.users?.length > 0) {
      throw new BadRequestException(`Cannot remove role ${name}`);
    }

    await this.roleRepository.update({ name }, { isActive: false });
  }
}
