import { ApiDatabaseModule } from '@forprosjekt/api/database/feature';
import { Module } from '@nestjs/common';

@Module({
  imports: [ApiDatabaseModule],
})
export class ApiCoreModule {}
