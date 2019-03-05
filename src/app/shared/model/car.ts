import {User} from './user';

export interface Car {
  carId: number;
  carName?: CarName;
  createdDate?: Date;
  liveUrl?: string;
  users?: User[];
}

export enum CarName {
  DIGGER = 'DIGGER',
  PUSHDOZER = 'PUSHDOZER'
}
