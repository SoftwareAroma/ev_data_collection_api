import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMainDto } from './dto/create.dto';
import { Location as LocationDataModel } from '@prisma/client';

@Injectable()
export class MainService {
  constructor(private readonly prismaService: PrismaService) {}

  async createLocation(
    createMainDto: CreateMainDto,
  ): Promise<LocationDataModel> {
    // console.log('data from createLocation >>>> .>>>', createMainDto);
    return this.prismaService.location.create({
      data: createMainDto,
    });
  }

  async getLocation(id: string): Promise<LocationDataModel | string> {
    const _location: LocationDataModel =
      await this.prismaService.location.findUnique({
        where: { id: id },
      });
    if (!_location) {
      return `No record found for location with id ${id}`;
    }
    return _location;
  }

  async getLocations(): Promise<LocationDataModel[]> {
    return this.prismaService.location.findMany();
  }

  async updateLocation(
    id: string,
    updateMainDto: CreateMainDto,
  ): Promise<LocationDataModel | string> {
    const _location: LocationDataModel =
      await this.prismaService.location.findUnique({
        where: { id: id },
      });
    if (!_location) {
      return `No record found for location with id ${id}`;
    }
    // if the date field is the then add the position
    return this.prismaService.location.update({
      where: { id: id },
      data: updateMainDto,
    });
  }

  async deleteLocation(id: string): Promise<boolean | string> {
    // delete location
    const _location: LocationDataModel =
      await this.prismaService.location.findUnique({
        where: { id: id },
      });
    if (!_location) {
      return `No record found for location with id ${id}`;
    }
    const del: LocationDataModel = await this.prismaService.location.delete({
      where: { id: id },
    });
    if (del) {
      return true;
    } else {
      return `Unable to delete location with id ${id}`;
    }
  }
}
