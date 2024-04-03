import { Document } from 'mongoose';

export enum ChallengeStatus {
  REALIZED = 'REALIZED',
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DENIED = 'DENIED',
  CANCELETED = 'CANCELETED',
}

export interface Challenge extends Document {
  date: Date;
  status: ChallengeStatus;
  createdAt: Date;
  responseDate: Date;
  requester: string;
  category: string;
  match?: string;
  players: string[];
}
