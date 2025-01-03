import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
              type: 'postgres',
              host: configService.getOrThrow<string>('app.dbHost'),
              port: configService.getOrThrow<number>('app.dbPort'),
              database: configService.getOrThrow<string>('app.dbName'),
              username: configService.getOrThrow<string>('app.dbUser'),
              password: configService.getOrThrow<string>('app.dbPassword'),
              autoLoadEntities: true,
              entities: [__dirname + '/**/*.entity{.ts,.js}'],
              synchronize: true,
            }),
            inject: [ConfigService],
          }),
    ]
})
export class DatabaseModule {}
