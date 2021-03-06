import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './player/player.module';

require('dotenv').config()

@Module({
  imports: [

    PlayerModule,

    MongooseModule.forRoot(process.env.MONGO_CONNECTION, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
