import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { getPostgresConfig } from '@configs/postgres.config';
import { UserModule, AuthModule } from './features';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `src/envs/.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync(getPostgresConfig()),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
