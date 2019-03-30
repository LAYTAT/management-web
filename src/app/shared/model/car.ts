import {User} from './user';
import {Snapshot} from './snapshot';

export interface Car {
  carId: number;
  carName?: CarName;
  createdDate?: Date;
  liveUrl?: string;
  users?: User[];
  current?: User;
  startDate?: number;
  totalTime?: number;
  snapshot?: Snapshot;
}

export enum CarName {
  DIGGER = 'DIGGER',
  PUSHDOZER = 'PUSHDOZER'
}
