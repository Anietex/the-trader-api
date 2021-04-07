import { Company } from './Company';

export type App = {
  name: string,
  company: Company,
  created_by: any
}

export type CreateApp = {
  name: string,
  company: string,
  created_by: string,
}
