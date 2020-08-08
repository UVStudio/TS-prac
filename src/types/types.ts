import { Request } from 'express';

export interface ReqBody extends Request {
  body: {
    id: number;
    name: string;
    password: string;
    //   email: string;
    //   address: {
    //     street: string;
    //     suite: string;
    //     city: string;
    //     zipcode: string;
    //     geo: {
    //       lat: string;
    //       lng: string;
    //     };
    //   };
    //   phone: string;
    //   website: string;
    //   company: {
    //     name: string;
    //     catchPhrase: string;
    //     bs: string;
    //   };
  };
}

export interface ExistingData {
  id: number;
  name: string;
  password: string;
}

// export interface Error {
//   status?: number;
//   message?: string;
// }
