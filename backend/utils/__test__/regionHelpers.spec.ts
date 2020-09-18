import { processOutcode, findDXRegion } from '../regionHelpers';
import { DXRegions } from '../DXReferenceRegions';

describe('REGION HELPERS:', () => {
  it('processOutcode returns trimmed alphabet only outcode', async () => {
    const trimmedOutcode = await processOutcode('SW1A 2BB');

    expect(trimmedOutcode).toBe('SW');
  });

  it('A DXRegion object can be found from trimmed alphabet outcode', async () => {
    const foundRegion = await findDXRegion('E');
    //expect a London region
    expect(foundRegion).toBe(DXRegions[0]);
  });
});
