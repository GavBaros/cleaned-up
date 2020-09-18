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
const DXReferenceRegions_1 = require("../utils/DXReferenceRegions");
const BASE_URL = 'https://api.postcodes.io/postcodes';
//todo TS + tests
exports.validatePostcode = (postcode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.get(`${BASE_URL}/${postcode}/validate`);
        return data;
    }
    catch (error) {
        console.log(error);
    }
});
//todo fix any return type
exports.fetchOutcode = (postcode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios_1.default.get(`${BASE_URL}/${postcode}`);
        return res;
    }
    catch (error) {
        console.log(error);
    }
});
//todo TS
exports.processOutcode = (postcode) => __awaiter(void 0, void 0, void 0, function* () {
    const outcodeResponse = yield exports.fetchOutcode(postcode);
    const outcode = outcodeResponse.data.result.outcode;
    //1. extract first occuring number index of outcode
    const indexOfFirstNumber = outcode.search(/\d/);
    //2. get outcode in pure alphabet form
    const outcodeAlphabetOnly = yield outcode.substring(0, indexOfFirstNumber);
    return outcodeAlphabetOnly;
});
//add ts for res
exports.handleValidationErrors = (validation, res) => {
    if (!validation) {
        const message = 'Could not validate postcode due to internal error';
        console.error(message);
        res.send({
            status: 500,
            message
        });
    }
    if (validation && !validation.result) {
        const message = 'Invalid postcode.';
        console.log(message);
        res.send({ status: 400, message });
    }
};
//todo add ts
exports.handleRegionError = res => {
    const message = 'Postcode not covered. Could not find region.';
    console.error(message);
    res.send({
        status: 400,
        message
    });
};
exports.findDXRegion = (alphabetOutcode) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('alphabetOutcode: ', alphabetOutcode);
    //search new form of outcode
    const matchedRegion = yield DXReferenceRegions_1.DXRegions.find((region) => {
        return region.outcodes.includes(alphabetOutcode);
    });
    return matchedRegion;
});
//todo add TS for return type + returned obj
exports.fetchRegionWithSurcharge = (postcode, res) => __awaiter(void 0, void 0, void 0, function* () {
    //VALIDATE POSTCODE
    const postcodeIsValid = yield exports.validatePostcode(postcode);
    if (postcodeIsValid && postcodeIsValid.result) {
        const alphabetOutcode = yield exports.processOutcode(postcode);
        const foundRegion = yield exports.findDXRegion(alphabetOutcode);
        if (foundRegion) {
            const regionWithSurcharge = {
                region: foundRegion.region,
                surcharge: foundRegion.surcharge
            };
            console.log('foundRegion: ', foundRegion);
            console.log('regionWithSurcharge: ', regionWithSurcharge);
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
