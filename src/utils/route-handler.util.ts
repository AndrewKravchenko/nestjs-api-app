import type { HttpMethod } from '@features/endpoint/entities';
import { Endpoint } from '@features/endpoint/entities';
import type { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import type { Router } from 'express';
import { DataSource } from 'typeorm';

export const handleRoutesAndSaveToDb = async (app: INestApplication) => {
  const server = app.getHttpAdapter().getInstance();
  const router = server.router;

  const availableRoutes = getAvailableRoutes(router);

  const dataSource = app.get(DataSource);
  const queryRunner = dataSource.createQueryRunner();

  try {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    await queryRunner.query('TRUNCATE endpoint RESTART IDENTITY CASCADE');
    console.log('truncate successfully!');

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Endpoint)
      .values(availableRoutes)
      .execute();

    await queryRunner.commitTransaction();
    console.log('Insert all routes into DB successfully!');
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error('Failed to insert routes', error);
  } finally {
    await queryRunner.release();
  }
};

const getAvailableRoutes = (router: Router) =>
  router.stack
    .filter((layer) => layer.route)
    .map(({ route }) => {
      const path = route!.path;
      const method = route!.stack[0].method.toUpperCase() as HttpMethod;
      return { method, url: path };
    });
