import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { getPostgresConfig } from "@configs/postgres.config";
import { UserModule } from '@features/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `src/envs/.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync(getPostgresConfig()),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
