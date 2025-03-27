import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { User } from '@features/user/entities';
import { Role } from '@features/role/entities';
import { Endpoint } from '@features/endpoint/entities';

export const getPostgresConfig = (): TypeOrmModuleAsyncOptions => {
  return {
    inject: [ConfigService],
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('SQL_HOST'),
      port: +configService.get('SQL_PORT'),
      username: configService.get('SQL_USER_NAME'),
      password: configService.get('SQL_PASSWORD'),
      database: configService.get('SQL_NAME'),
      entities: [User, Role, Endpoint],
      synchronize: true,
    }),
  };
};
