import { PartialType } from '@nestjs/swagger';
import { CreateMainDto } from './create.dto';

export class UpdateMainDto extends PartialType(CreateMainDto) {}
