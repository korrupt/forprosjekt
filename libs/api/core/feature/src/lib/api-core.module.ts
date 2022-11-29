import { ApiApolloModule } from '@forprosjekt/api/apollo/feature';
import { ApiAuthModule } from '@forprosjekt/api/auth/feature';
import { ApiDatabaseModule } from '@forprosjekt/api/database/feature';
import { ApiUserModule } from '@forprosjekt/api/user/feature';
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [ApiDatabaseModule, ApiAuthModule, ApiUserModule, ApiApolloModule],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true, whitelist: true }),
    },
  ],
})
export class ApiCoreModule {}
