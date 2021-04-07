import { Status } from './index';

export type Company = {
  id: string
  name: string;
  status: Status

}

export type CreateCompany = {
  name: string;
};
