import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '@app/prisma';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserInput: CreateUserInput) {
    return this.prismaService.user.create({
      data: createUserInput,
    });
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.user.findFirst({
      where: { id: id },
    });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return this.prismaService.user.update({
      where: { id: id },
      data: updateUserInput,
    });
  }

  remove(id: number) {
    return this.prismaService.user.delete({
      where: { id: id },
    });
  }
}
