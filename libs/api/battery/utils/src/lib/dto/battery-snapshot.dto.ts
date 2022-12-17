import { IsJSON, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBatterySnapshotDto {
  @IsNotEmpty()
  @IsUUID('4')
  id: string;

  @IsNotEmpty()
  @IsJSON()
  data: JSON;
}
