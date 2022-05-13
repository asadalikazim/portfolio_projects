import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConferenceModule } from './conference/conference.module';
import configuration from './config/configuration';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    ConferenceModule,
    UsersModule,
    ConfigModule.forRoot(
      { load: [configuration], isGlobal: true, }
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      cors: {
        origin:
        'http://localhost:3000',
        credentials: true,
      },
      driver: ApolloDriver,
      playground: true,
      introspection: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => {
        return { req, res }
      }
    }),
    MongooseModule.forRoot(`mongodb://${configuration().mongo.host}:27017/nest`),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
