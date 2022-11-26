import { ApiCoreConfigModule, ApiCoreConfigService } from '@forprosjekt/api/core/config';
import { ApiDatabaseConfigModule, ApiDatabaseConfigService } from '@forprosjekt/api/database/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

export * from 'pg';

@Module({
  imports: [
    ApiDatabaseConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ApiDatabaseConfigModule, ApiCoreConfigModule],
      inject: [ApiDatabaseConfigService, ApiCoreConfigService],
      useFactory: (dbconf: ApiDatabaseConfigService, apiconf: ApiCoreConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,

        synchronize: dbconf.SYNC,
        migrationsTableName: 'migrations',
        entities: [apiconf.ENV == 'cli' ? 'libs/**/*.entity.ts' : ''],
        migrationsRun: apiconf.ENV === 'production',

        migrations: [
          apiconf.ENV == 'cli'
            ? 'libs/api/database/cli/src/lib/migrations/*.ts'
            : join(__dirname, '**/migrations/*.js'),
        ],
        username: dbconf.USERNAME,
        password: dbconf.PASSWORD,
        database: dbconf.DATABASE,
        host: dbconf.HOST,
        port: dbconf.PORT,
      }),
    }),
  ],
})
export class ApiDatabaseModule {}
