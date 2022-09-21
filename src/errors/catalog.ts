export enum ErrorTypes {
  ObjectNotFound = 'ObjectNotFound',
  HexadecimalLength = 'HexadecimalLength',
  EmptyObject = 'EmptyObject',
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
  EmptyObject: {
    error: 'Object must not have empty',
    httpStatus: 400,
  },
};