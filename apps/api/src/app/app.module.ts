import { ApiCoreModule } from '@forprosjekt/api/core/feature';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ApiCoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
