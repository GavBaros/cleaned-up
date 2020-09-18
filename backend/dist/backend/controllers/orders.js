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
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePrice = void 0;
const regionHelpers_1 = require("../utils/regionHelpers");
const pricingHelpers_1 = require("../utils/pricingHelpers");
exports.calculatePrice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //add middleware to sanitise values for postCode + 2 inputs
    const fetchedRegion = yield regionHelpers_1.fetchRegionWithSurcharge(req.body.postCode, res);
    if (fetchedRegion) {
        pricingHelpers_1.calculateGrandTotal(fetchedRegion, req, res);
    }
});
