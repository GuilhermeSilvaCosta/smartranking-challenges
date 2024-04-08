import { Injectable } from '@nestjs/common';
import { Match } from './interfaces/match.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Challenge } from 'src/challenges/interfaces/challenge.interface';
import { ChallengesService } from 'src/challenges/challenges.service';
import { ProxyService } from 'src/common/proxy/proxy.service';

@Injectable()
export class MatchesService {
  private proxyService: ClientProxy;

  constructor(
    @InjectModel('Match') private readonly matchModel: Model<Match>,
    private readonly challengesService: ChallengesService,
    proxyService: ProxyService,
  ) {
    this.proxyService = proxyService.getClientRanking();
  }

  async createMatch(idChallenge: string, match: Match): Promise<Challenge> {
    const challenge = await this.challengesService.getChallenge(idChallenge);

    const { players } = challenge;
    if (!players.includes(match.winner))
      throw new RpcException('Winner is not a player in this challenge');

    const matchResult = await this.matchModel.create({
      category: challenge.category,
      players,
      ...match,
    });

    this.proxyService.emit('process-match', matchResult);

    return this.challengesService.addMatch(idChallenge, matchResult._id);
  }
}
