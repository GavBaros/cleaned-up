export type ValidPostcodeResponse = { status: number; result: boolean };
export type RegionWithSurcharge = { region: string; surcharge: number };

export type DXRegion = {
  region: string;
  surcharge: number;
  outcodes: string[];
};
