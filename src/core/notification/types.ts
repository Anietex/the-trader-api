export type EmailData = {
  subject: string,
  recipient: string,
  template?:string,
  plainText?: string,
  data: any
}
