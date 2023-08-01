import { Module } from '@nestjs/common';
import { MainService } from './main.service';
import { MainController } from './main.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [MainService, PrismaService],
  controllers: [MainController],
  exports: [MainService],
})
export class MainModule {}
