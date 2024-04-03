import { Module } from '@nestjs/common';
import { ChallengesModule } from './challenges/challenges.module';
import { MatchesModule } from './matches/matches.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/sr-challenges?authSource=sr-challenges',
    ),
    ChallengesModule,
    MatchesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
