import { Request, Response, NextFunction } from 'express-serve-static-core';

//a quick sanitiser middleware
export const sanitiseValues = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.body &&
    req.body.postCode.length &&
    req.body.bottlesQuantity > 0 &&
    req.body.subscriptionType.length
  ) {
    next();
  } else {
    return res.send({
      status: 400,
      message: 'Invalid values sent.'
    });
  }
};
