"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRegionWithSurcharge = exports.findDXRegion = exports.handleRegionError = exports.handleValidationErrors = exports.processOutcode = exports.fetchOutcode = exports.validatePostcode = void 0;
const axios_1 = __importDefault(require("axios"));
const DXReferenceRegions_1 = require("./DXReferenceRegions");
const BASE_URL = 'https://api.postcodes.io/postcodes';
exports.validatePostcode = (postcode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.get(`${BASE_URL}/${postcode}/validate`);
        return data;
    }
    catch (error) {
        console.log(error);
    }
});
exports.fetchOutcode = (postcode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios_1.default.get(`${BASE_URL}/${postcode}`);
        return res;
    }
    catch (error) {
        console.log(error);
    }
});
exports.processOutcode = (postcode) => __awaiter(void 0, void 0, void 0, function* () {
    const outcodeResponse = yield exports.fetchOutcode(postcode);
    const outcode = outcodeResponse.data.result.outcode;
    //1. extract first occuring number's index from outcode
    const indexOfFirstNumber = outcode.search(/\d/);
    //2. get outcode in pure alphabet form
    const outcodeAlphabetOnly = yield outcode.substring(0, indexOfFirstNumber);
    return outcodeAlphabetOnly;
});
exports.handleValidationErrors = (validation, res) => {
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
exports.handleRegionError = (res) => {
    const message = 'Postcode is valid, but is not covered by DX.';
    console.error(message);
    return res.status(400).send({
        message
    });
};
exports.findDXRegion = (alphabetOutcode) => __awaiter(void 0, void 0, void 0, function* () {
    //search new form of outcode
    const matchedRegion = yield DXReferenceRegions_1.DXRegions.find((region) => {
        return region.outcodes.includes(alphabetOutcode);
    });
    return matchedRegion;
});
exports.fetchRegionWithSurcharge = (postcode, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postcodeIsValid = yield exports.validatePostcode(postcode);
    if (postcodeIsValid && postcodeIsValid.result) {
        const alphabetOutcode = yield exports.processOutcode(postcode);
        const foundRegion = yield exports.findDXRegion(alphabetOutcode);
        if (foundRegion) {
            const regionWithSurcharge = {
                region: foundRegion.region,
                surcharge: foundRegion.surcharge
            };
            return regionWithSurcharge;
        }
        else {
            exports.handleRegionError(res);
        }
    }
    else {
        exports.handleValidationErrors(postcodeIsValid, res);
    }
});
