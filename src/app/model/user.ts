import {Role} from './role';

export interface User {
  employeeId: number;
  username: string;
  password: string;
  name: string;
  gender: Gender;
  age: number;
  createdDate?: Date;
  roles?: Role[];
}

export enum Gender {
  Woman = 'WOMAN',
  Man = 'MAN'
}
