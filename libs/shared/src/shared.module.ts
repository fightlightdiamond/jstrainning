import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { PrismaModule, PrismaService } from '@app/prisma';

@Module({
  providers: [SharedService, PrismaModule],
  exports: [SharedService, PrismaService],
})
export class SharedModule {}
