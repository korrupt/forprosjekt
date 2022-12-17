import { ApiBatteryService } from '@forprosjekt/api/battery/data-access';
import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext, Payload, Transport } from '@nestjs/microservices';

@Controller()
export class ApiBatteryController {
  constructor(private battery: ApiBatteryService) {}

  @MessagePattern('+/snapshot', Transport.MQTT)
  public handleBatterySnapshot(@Payload() data: Record<string, any>, @Ctx() context: MqttContext) {
    const id = context.getTopic().split('/')[0];
    console.log(data);
  }
}
