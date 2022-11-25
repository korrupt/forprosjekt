import { Module } from '@nestjs/common';
import { ApiAuthConfigModule, ApiAuthConfigService } from '@forprosjekt/api/auth/config';
import { JwtStrategy } from '@forprosjekt/api/auth/utils';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ApiAuthConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ApiAuthConfigModule],
      inject: [ApiAuthConfigService],
      useFactory: (config: ApiAuthConfigService) => ({
        secret: config.SECRET,
        signOptions: {
          expiresIn: config.EXPIRY,
        },
      }),
    }),
  ],
  providers: [JwtStrategy],
  exports: [JwtModule],
})
export class ApiAuthModule {}
