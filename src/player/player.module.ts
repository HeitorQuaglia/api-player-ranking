import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { playerSchema } from './contracts/player.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'player', schema: playerSchema }])],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule { }
