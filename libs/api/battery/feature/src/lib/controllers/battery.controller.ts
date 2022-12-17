import { ApiBatteryService } from '@forprosjekt/api/battery/data-access';
import { CreateBatterySnapshotDto } from '@forprosjekt/api/battery/utils';
import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext, Payload, Transport } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

@Controller()
export class ApiBatteryController {
  constructor(private battery: ApiBatteryService) {}

  @MessagePattern('+/snapshot', Transport.MQTT)
  public handleBatterySnapshot(@Payload() data: Record<string, any>, @Ctx() context: MqttContext) {
    const id = context.getTopic().split('/')[0];

    const dto = plainToClass(CreateBatterySnapshotDto, { id, data });

    if (!validateSync(dto)) {
      console.error(`Received wrong MQTT snapshot.`);
      return;
    }

    return this.battery.createSnapshot(dto);
  }
}
