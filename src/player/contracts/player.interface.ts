import { Document } from 'mongoose';

export interface Player extends Document {
  readonly __id: string;
  phoneNumber: string;
  email: string;
  name: string;
  ranking: string;
  posRanking: number;
  urlPhoto: string;
};
