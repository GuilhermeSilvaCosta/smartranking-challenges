import { Module } from '@nestjs/common';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { MatchSchema } from './interfaces/match.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengesModule } from 'src/challenges/challenges.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Match', schema: MatchSchema }]),
    ChallengesModule,
  ],
  controllers: [MatchesController],
  providers: [MatchesService],
})
export class MatchesModule {}
