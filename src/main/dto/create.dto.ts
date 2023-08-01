import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMainDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  name?: string;

  @IsNotEmpty()
  @ApiProperty()
  position: [
    {
      latitude: string;
      longitude: string;
      placeId?: string;
      placeName?: string;
    },
  ];

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  distance?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  duration?: string;
}
