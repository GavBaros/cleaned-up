import { RegionWithSurcharge } from '../types';

export const req = {
  body: {
    bottlesQuantity: 10,
    subscriptionType: '12 months'
  }
};

export const req2 = {
  body: {
    bottlesQuantity: 1,
    subscriptionType: 'Rolling'
  }
};

export const LondonRegion: RegionWithSurcharge = {
  region: 'London',
  surcharge: 1.33
};
