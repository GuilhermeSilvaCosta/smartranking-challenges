import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Challenge, ChallengeStatus } from './interfaces/challenge.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
  ) {}

  createChallenge(challenge: Challenge) {
    return this.challengeModel.create({
      ...challenge,
      status: ChallengeStatus.PENDING,
    });
  }

  updateChallenge(_id: string, challenge: Challenge) {
    return this.challengeModel.findByIdAndUpdate(_id, challenge, { new: true });
  }

  deleteChallenge(_id: string) {
    return this.challengeModel.findByIdAndDelete(_id);
  }

  getChallenge(_id: string): Promise<Challenge> {
    return this.challengeModel.findById(_id);
  }

  getChallenges({ requester }): Promise<Challenge[]> {
    const query = requester ? { requester } : null;
    return this.challengeModel.find(query);
  }

  addMatch(_id: string, match: string): Promise<Challenge> {
    return this.challengeModel.findByIdAndUpdate(
      _id,
      { $push: { matches: match } },
      { new: true, populate: 'matches' },
    );
  }
}
