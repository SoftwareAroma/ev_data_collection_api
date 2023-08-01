import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MainService } from './main.service';
import { CreateMainDto } from './dto/create.dto';
import { Location as LocationModel } from '@prisma/client';
import { CustomApiResponse } from '../common';

@Controller('main')
export class MainController {
  constructor(private readonly mainService: MainService) {}

  // create location
  @Post('create')
  async createLocation(
    @Body() createMainDto: CreateMainDto,
  ): Promise<CustomApiResponse<LocationModel>> {
    const _location: LocationModel = await this.mainService.createLocation(
      createMainDto,
    );
    return new CustomApiResponse<LocationModel>(_location, true);
  }

  // get all locations
  @Get('all')
  async getLocations(): Promise<CustomApiResponse<LocationModel[]>> {
    const _locations: LocationModel[] = await this.mainService.getLocations();
    return new CustomApiResponse<LocationModel[]>(_locations, true);
  }

  // get location
  @Get(':id')
  async getLocation(
    @Param('id') id: string,
  ): Promise<CustomApiResponse<LocationModel | string>> {
    const _location: LocationModel | string =
      await this.mainService.getLocation(id);
    return new CustomApiResponse<LocationModel | string>(_location, true);
  }

  // update location
  @Patch(':id')
  async updateLocation(
    @Param('id') id: string,
    @Body() updateMainDto: CreateMainDto,
  ): Promise<CustomApiResponse<LocationModel | string>> {
    const _location: LocationModel | string =
      await this.mainService.updateLocation(id, updateMainDto);
    return new CustomApiResponse<LocationModel | string>(_location, true);
  }

  // delete location
  @Delete(':id')
  async deleteLocation(
    @Param('id') id: string,
  ): Promise<CustomApiResponse<boolean | string>> {
    const _location: boolean | string = await this.mainService.deleteLocation(
      id,
    );
    return new CustomApiResponse<boolean | string>(_location, true);
  }
}
