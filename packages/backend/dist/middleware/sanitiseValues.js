"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitiseValues = void 0;
//a quick sanitiser middleware
exports.sanitiseValues = (req, res, next) => {
    if (req.body &&
        req.body.postCode.length &&
        req.body.bottlesQuantity > 0 &&
        req.body.subscriptionType.length) {
        next();
    }
    else {
        return res.send({
            status: 400,
            message: 'Invalid values sent.'
        });
    }
};
