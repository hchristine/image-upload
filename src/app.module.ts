import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './project/project.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/images',
      rootPath: join(process.cwd(), 'assets'),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      sortSchema: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'test',
      autoLoadEntities: true,
    }),
    UserModule,
    AuthModule,
    ProjectModule,
    ImageModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
