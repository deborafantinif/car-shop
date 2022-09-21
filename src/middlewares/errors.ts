import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { errorCatalog, ErrorTypes } from '../errors/catalog';

// const errorMiddlewares: ErrorRequestHandler = (
//   err: Error | ZodError,
//   _req: Request,
//   res: Response,
//   _next: NextFunction,
// ) => {
//   if (err instanceof ZodError) { 
//     console.log('caiu');
//     return res.status(400).json({ message: err.issues });
//   }
//   console.log(err);
//   return res.status(500).json({ message: 'internal error' });
// };

// export default errorMiddlewares;

const errorHandler: ErrorRequestHandler = ( 
  err: Error | ZodError, 
  _req,
  res,
  _next,
) => {
  if (err instanceof ZodError) { 
    return res.status(400).json({ message: err.issues });
  }

  const messageAsErrorType = err.message as ErrorTypes;

  const mappedError = errorCatalog[messageAsErrorType];
  if (mappedError) {
    const { httpStatus, error } = mappedError;
    return res.status(httpStatus).json({ error });
  }

  console.error(err);
  return res.status(500).json({ message: 'internal error' });
};

export default errorHandler;