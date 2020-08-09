import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './contracts/player.interface';
import * as uuid from 'uuid/dist/v1';

@Injectable()
export class PlayerService {
  private players: Player[] = [];
  private readonly logger = new Logger(PlayerService.name);

  async insertPlayer(playerDto: CreatePlayerDTO): Promise<Player> {
    this.logger.log(`[STORE] PlayerDTO ${JSON.stringify(playerDto)}`);
    
    await this.create(playerDto);
    return new Promise();
  }

  private create(playerDto: CreatePlayerDTO): Player {
    const { name, email, phoneNumber } = playerDto;

    const player: Player = {
      __id: uuid(),
      name,
      email,
      phoneNumber,
      ranking: 'A',
      posRanking: 1,
      urlPhoto: ''
    };

    this.players.push(player);

    return player;
  }
}