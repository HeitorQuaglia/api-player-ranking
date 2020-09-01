import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './contracts/player.interface';
import * as _ from 'lodash';
import { v1 as uuid } from 'uuid';

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

  /*async findByEmail(email: string) : Promise<Player> {
    const player = this.players.find(it => it.email === email);

    if (!player)
      throw NotFoundException;
    return player;
  }*/

  async insert(playerDto: CreatePlayerDTO): Promise<Player> {

    const { name, email, phoneNumber } = playerDto;

    if (this.validateEmail(email)) {

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
      this.logger.log(`[STORE] PlayerDTO ${JSON.stringify(playerDto)}`);
      return player;
    } else {
      throw new BadRequestException("email ja cadastrado");
    }
  }

  async update(id: string, player: Player): Promise<Player> {
    const index = this.players.findIndex(it => it.__id === id);
    this.logger.log(`[UPDATE] Player ${JSON.stringify(player)}`);
    if (index !== -1) {
      this.players[index] = player;
      return player;
    } else {
      throw new NotFoundException("Player not found");
    }
  }

  async destroy(id: string): Promise<void> {
    this.logger.log(`[DROP] Player ID = ${id}`);
    _.remove(this.players, (it: Player) => it.__id === id);
  }

  async validateEmail(email: string): Promise<boolean> {
    return !this.players.some(it => it.email === email);
  }
}
