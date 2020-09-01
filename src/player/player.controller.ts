import { Controller, Post, Body, Get, Put, Param, Delete, Query } from '@nestjs/common';
import { Player } from './contracts/player.interface';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { PlayerService } from './player.service';

@Controller('api/v1/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) { }

  //#region REST
  @Get()
  async index(): Promise<Player[]> {

    return this.playerService.index();
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<Player> {
    return await this.playerService.find(id);
  }

  @Post()
  async store(@Body() playerDto: CreatePlayerDTO) {
    const { name, email } = playerDto;

    return await this.playerService.insert(playerDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() player: Player): Promise<Player> {
    return await this.playerService.update(id, player);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string): Promise<void> {
    this.playerService.destroy(id);
  }
  //#endregion
  @Post('/validate-email')
  async validateEmail(@Query('email') email: string) {
    return this.playerService.validateEmail(email);
  }
}
