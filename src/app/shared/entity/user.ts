import {Role} from './role';
import {File} from './file';

export interface User {
  employeeId: number;
  username: string;
  password: string;
  name: string;
  gender: Gender;
  age: number;
  createdDate?: Date;
  roles?: Role[];
  avatar?: File;
}

export enum Gender {
  Woman = 'WOMAN',
  Man = 'MAN'
}
