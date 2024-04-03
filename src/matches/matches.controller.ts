import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MatchesService } from './matches.service';

@Controller('matches')
export class MatchesController {
  private readonly logger = new Logger(MatchesController.name);

  constructor(private readonly matchesService: MatchesService) {}

  @EventPattern('assign-match')
  createMatch(@Payload() { id, match }) {
    this.logger.log(`_id: ${id}, match: ${JSON.stringify(match)}`);
    return this.matchesService.createMatch(id, match);
  }
}
