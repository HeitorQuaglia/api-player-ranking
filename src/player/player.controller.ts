import { Controller, Post } from '@nestjs/common';
import { Player } from './contracts/player.interface';

@Controller('api/v1/player')
export class PlayerController {

    @Post()
    async store(player : Player) {
        return JSON.stringify({
            __id: 'x1',
            name: 'Jhon'
        });
    }
}
