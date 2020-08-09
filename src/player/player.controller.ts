import { Controller, Post, Body, Get } from '@nestjs/common';
import { Player } from './contracts/player.interface';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { PlayerService } from './player.service';

@Controller('api/v1/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) { }

  @Get()
  async index(): Promise<Player[]> {

    return this.playerService.index();
  }

  @Post()
  async store(@Body() playerDto: CreatePlayerDTO) {
    const { name, email } = playerDto;

    return await this.playerService.insertPlayer(playerDto);
  }
}
