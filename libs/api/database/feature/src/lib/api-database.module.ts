import { ApiDatabaseConfigModule, ApiDatabaseConfigService } from '@forprosjekt/api/database/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ApiDatabaseConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ApiDatabaseConfigModule],
      inject: [ApiDatabaseConfigService],
      useFactory: (dbconf: ApiDatabaseConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        // entities: ['libs/**/*.entity.ts'],
        // entities: [apiconf.ENV == 'CLI' ? 'libs/**/*.entity.ts' : ''],
        synchronize: dbconf.SYNC,
        migrationsTableName: 'migrations',
        // migrationsRun: apiconf.ENV === 'production',
        // migrations: ['libs/api/database/cli/src/lib/migrations/*.ts'],
        // migrations: [
        //   apiconf.ENV == 'CLI'
        //     ? 'libs/api/database/cli/src/lib/migrations/*.ts'
        //     : join(__dirname, '**/migrations/*.js'),
        // ],
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
