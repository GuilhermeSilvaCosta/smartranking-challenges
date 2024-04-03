import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ChallengesService } from './challenges.service';
import { Challenge } from './interfaces/challenge.interface';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  private readonly logger = new Logger(ChallengesController.name);

  @EventPattern('create-challenge')
  async createChallenge(@Payload() challenge: Challenge) {
    this.logger.log(`Challenge: ${JSON.stringify(challenge)}`);
    return this.challengesService.createChallenge(challenge);
  }

  @EventPattern('update-challenge')
  async updateChallenge(@Payload() { id, challenge }) {
    this.logger.log(`id: ${id}, challenge: ${JSON.stringify(challenge)}`);
    return this.challengesService.updateChallenge(id, challenge);
  }

  @EventPattern('delete-challenge')
  async deleteChallenge(@Payload() id: string) {
    this.logger.log(`id: ${id}`);
    return this.challengesService.deleteChallenge(id);
  }

  @MessagePattern('get-challenge')
  getChallenge(@Payload() id: string) {
    return this.challengesService.getChallenge(id);
  }

  @MessagePattern('search-challenges')
  getChallenges(@Payload() query) {
    return this.challengesService.getChallenges(query);
  }
}
