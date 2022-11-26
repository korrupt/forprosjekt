import { NestFactory } from '@nestjs/core';
import { ApiDatabaseModule } from '@forprosjekt/api/database/feature';
import { DataSource, EntityManager } from 'typeorm';

export async function createDatasource() {
  const module = await NestFactory.create(ApiDatabaseModule);

  const manager = module.get(EntityManager);
  const options = manager.connection.options;

  return new DataSource(options);
}

export default (async () => {
  return createDatasource();
})();
