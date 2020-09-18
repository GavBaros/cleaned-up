import { Request } from 'express-serve-static-core';
import {
  contractSavingsGBP,
  withinShippingFee,
  shippingFeeGBP
} from './constants';
import { RegionWithSurcharge } from './types';

export const calculateGrandTotal = (
  fetchedRegion: RegionWithSurcharge,
  req: Request | any
): number => {
  const regionSurcharge: number = fetchedRegion.surcharge;
  const contractCostPerMonth: number =
    contractSavingsGBP[req.body.subscriptionType];
  const preVATMonthly: number = contractCostPerMonth * req.body.bottlesQuantity;
  const VAT: number = 0.2 * preVATMonthly;

  const preTotal: number = preVATMonthly + VAT + regionSurcharge;

  //check if monthly price < £30, if yes add £7.24 shipment
  const grandTotal: number =
    preVATMonthly <= withinShippingFee ? preTotal + shippingFeeGBP : preTotal;

  return grandTotal;
};
