declare namespace NodeJS{
 interface Global {
     __base: string,
     __util: string,
     __module: string,
     __services: string
    }
}

declare namespace Express{
  interface Request{
    user?: any
  }
}
