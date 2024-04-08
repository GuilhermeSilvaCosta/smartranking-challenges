import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class ProxyService {
  private clientRanking: ClientProxy;

  constructor() {
    this.clientRanking = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost/smartranking'],
        queue: 'ranking',
      },
    });
  }

  getClientRanking(): ClientProxy {
    return this.clientRanking;
  }
}
