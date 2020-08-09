import { Controller, Post, Body } from '@nestjs/common';
import { Player } from './contracts/player.interface';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { PlayerService } from './player.service';

@Controller('api/v1/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) { }

  @Post()
  async store(@Body() playerDto: CreatePlayerDTO) {
    const { name, email } = playerDto;

    return await this.playerService.insertPlayer(playerDto);
  }
}
