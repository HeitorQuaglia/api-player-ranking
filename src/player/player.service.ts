import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './contracts/player.interface';
import * as _ from 'lodash';
import * as uuid from 'uuid/dist/v1';

@Injectable()
export class PlayerService {
  private players: Player[] = [];
  private readonly logger = new Logger(PlayerService.name);

  async index(): Promise<Player[]> {
    return await this.players;
  }

  async find(id: string): Promise<Player> {
    const player = this.players.find(it => it.__id === id);

    if (!player)
      throw NotFoundException;
    return player;
  }

  async insert(playerDto: CreatePlayerDTO): Promise<Player> {
    this.logger.log(`[STORE] PlayerDTO ${JSON.stringify(playerDto)}`);

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

  async update(id: string, player: Player): Promise<Player> {
    const index = this.players.findIndex(it => it.__id === id);

    if (index !== -1) {
      this.players[index] = player;
      return player;
    } else {
      throw new NotFoundException("Player not found");
    }
  }

  async destroy(id:string) : Promise<void>{
    _.remove(this.players, (it:Player) => it.__id === id);
  }
}
