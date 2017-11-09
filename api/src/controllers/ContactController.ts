import { Request, Response } from 'express';
import { catchErrors } from '../utils';

const sendMessage = catchErrors(async (req: Request, res: Response) => {

 
  res.status(200);
});

export { sendMessage }