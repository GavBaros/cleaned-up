import axios from 'axios';
import { DXRegions } from './DXReferenceRegions';
import { ValidPostcodeResponse, RegionWithSurcharge, DXRegion } from './types';
import { Response } from 'express-serve-static-core';

const BASE_URL: string = 'https://api.postcodes.io/postcodes';

export const validatePostcode = async (
  postcode: string
): Promise<ValidPostcodeResponse> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${postcode}/validate`);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchOutcode = async (postcode: string): Promise<any> => {
  try {
    const res = await axios.get(`${BASE_URL}/${postcode}`);

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const processOutcode = async (postcode: string): Promise<string> => {
  const outcodeResponse = await fetchOutcode(postcode);
  const outcode: string = outcodeResponse.data.result.outcode;

  //1. extract first occuring number's index from outcode
  const indexOfFirstNumber = outcode.search(/\d/);

  //2. get outcode in pure alphabet form
  const outcodeAlphabetOnly = await outcode.substring(0, indexOfFirstNumber);

  return outcodeAlphabetOnly;
};

export const handleValidationErrors = (
  validation: ValidPostcodeResponse,
  res: Response
) => {
  if (!validation) {
    const message = 'Could not validate postcode due to internal error';
    console.error(message);
    return res.status(500).send({
      message
    });
  }

  if (validation && !validation.result) {
    const message = 'Invalid postcode.';
    console.log(message);

    return res.status(400).send({
      message
    });
  }
};

//todo add ts
export const handleRegionError = (res: Response) => {
  const message = 'Postcode is valid, but is not covered by DX.';

  console.error(message);
  return res.status(400).send({
    message
  });
};

export const findDXRegion = async (
  alphabetOutcode: string
): Promise<DXRegion> => {
  //search new form of outcode
  const matchedRegion: DXRegion = await DXRegions.find((region: DXRegion) => {
    return region.outcodes.includes(alphabetOutcode);
  });

  return matchedRegion;
};

export const fetchRegionWithSurcharge = async (
  postcode: string,
  res: Response
): Promise<RegionWithSurcharge> => {
  const postcodeIsValid = await validatePostcode(postcode);

  if (postcodeIsValid && postcodeIsValid.result) {
    const alphabetOutcode: string = await processOutcode(postcode);

    const foundRegion: DXRegion = await findDXRegion(alphabetOutcode);

    if (foundRegion) {
      const regionWithSurcharge = {
        region: foundRegion.region,
        surcharge: foundRegion.surcharge
      };

      return regionWithSurcharge;
    } else {
      handleRegionError(res);
    }
  } else {
    handleValidationErrors(postcodeIsValid, res);
  }
};
