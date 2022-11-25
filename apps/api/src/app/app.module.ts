import { ApiDatabaseModule } from '@forprosjekt/api/database/feature';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ApiDatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
