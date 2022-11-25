import { ApiDatabaseConfigModule, ApiDatabaseConfigService } from '@forprosjekt/api/database/config';
import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

@Module({
  imports: [
    ApiDatabaseConfigModule,
    MongooseModule.forRootAsync({
      imports: [ApiDatabaseConfigModule],
      inject: [ApiDatabaseConfigService],
      useFactory: (conf: ApiDatabaseConfigService) =>
        ({
          uri: conf.URI,
          dbName: 'forprosjekt',
        } as MongooseModuleOptions),
    }),
  ],
})
export class ApiDatabaseModule {}
