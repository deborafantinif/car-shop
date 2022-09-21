export enum ErrorTypes {
  ObjectNotFound = 'ObjectNotFound',
  HexadecimalLength = 'HexadecimalLength',
}

type ErrorResponseObject = { 
  error: string;
  httpStatus: number
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
};

export const errorCatalog: ErrorCatalog = {
  ObjectNotFound: {
    error: 'Object not found',
    httpStatus: 404,
  },
  HexadecimalLength: {
    error: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
};