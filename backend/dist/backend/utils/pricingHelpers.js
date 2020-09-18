"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateGrandTotal = void 0;
//should be in shared
const contractSavingsGBP = {
    'One Off': 40,
    Rolling: 30,
    '6 months': 20,
    '12 months': 18,
    '18 months': 15
};
//add ts + return value ts
exports.calculateGrandTotal = (fetchedRegion, req, res) => {
    const regionSurcharge = fetchedRegion.surcharge;
    const contractCostPerMonth = contractSavingsGBP[req.body.subscriptionType];
    const preVATMonthly = contractCostPerMonth * req.body.bottlesQuantity;
    const VAT = 0.2 * preVATMonthly;
    const preTotal = preVATMonthly + VAT + regionSurcharge;
    const shippingFeeGBP = 7.24;
    const withinShippingFee = 30;
    //check if monthly price < £30, if yes add £7.24 shipment
    const grandTotal = preVATMonthly <= withinShippingFee ? preTotal + shippingFeeGBP : preTotal;
    console.log('VAT: ', VAT);
    console.log('contractCostPerMonth: ', contractCostPerMonth);
    console.log('grandTotal: ', grandTotal);
    res.send({
        status: 200,
        grandTotal
    });
};
