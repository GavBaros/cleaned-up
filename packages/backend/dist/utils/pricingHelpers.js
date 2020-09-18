"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateGrandTotal = void 0;
const constants_1 = require("./constants");
exports.calculateGrandTotal = (fetchedRegion, req) => {
    const regionSurcharge = fetchedRegion.surcharge;
    const contractCostPerMonth = constants_1.contractSavingsGBP[req.body.subscriptionType];
    const preVATMonthly = contractCostPerMonth * req.body.bottlesQuantity;
    const VAT = 0.2 * preVATMonthly;
    const preTotal = preVATMonthly + VAT + regionSurcharge;
    //check if monthly price < £30, if yes add £7.24 shipment
    const grandTotal = preVATMonthly <= constants_1.withinShippingFee ? preTotal + constants_1.shippingFeeGBP : preTotal;
    return grandTotal;
};
