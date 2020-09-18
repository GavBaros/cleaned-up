import { Request, Response } from 'express-serve-static-core';
import { fetchRegionWithSurcharge } from '../utils/regionHelpers';

export const calculatePrice = async (req: Request, res: Response) => {
  const fetchedRegion = await fetchRegionWithSurcharge(req.body.postCode, res);

  console.log(fetchedRegion);
};
