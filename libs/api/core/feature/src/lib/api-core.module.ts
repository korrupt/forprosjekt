import { ApiAuthService } from '@forprosjekt/api/auth/data-access';
import { ApiAuthModule } from '@forprosjekt/api/auth/feature';
import { ApiDatabaseModule } from '@forprosjekt/api/database/feature';
import { Module } from '@nestjs/common';

@Module({
  imports: [ApiDatabaseModule, ApiAuthModule],
  providers: [ApiAuthService]
})
export class ApiCoreModule {}