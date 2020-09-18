import { Request, Response } from 'express-serve-static-core';
import { fetchRegionWithSurcharge } from '../utils/regionHelpers';
import { calculateGrandTotal } from '../utils/pricingHelpers';

export const calculatePrice = async (req: Request, res: Response) => {
  const fetchedRegion = await fetchRegionWithSurcharge(req.body.postCode, res);

  if (fetchedRegion) {
    const grandTotal = await calculateGrandTotal(fetchedRegion, req);

    return res.status(200).send({
      grandTotal
    });
  }
};
