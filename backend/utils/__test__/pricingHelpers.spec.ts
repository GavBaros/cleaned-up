import { calculateGrandTotal } from '../pricingHelpers';
import { req, req2, LondonRegion } from './testConstants';

describe('PRICING HELPERS:', () => {
  it('returns correct pricing for specified subscription, region and bottle quantity', async () => {
    const price = await calculateGrandTotal(LondonRegion, req);

    expect(price).toBe(217.33);
  });

  it('returns correct pricing if pricing is less than £30', async () => {
    const price = await calculateGrandTotal(LondonRegion, req2);

    expect(price).toBe(44.57);
  });
});
