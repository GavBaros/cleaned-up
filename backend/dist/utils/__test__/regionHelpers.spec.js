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
const regionHelpers_1 = require("../regionHelpers");
const DXReferenceRegions_1 = require("../DXReferenceRegions");
describe('REGION HELPERS:', () => {
    it('processOutcode returns trimmed alphabet only outcode', () => __awaiter(void 0, void 0, void 0, function* () {
        const trimmedOutcode = yield regionHelpers_1.processOutcode('SW1A 2BB');
        expect(trimmedOutcode).toBe('SW');
    }));
    it('A DXRegion object can be found from trimmed alphabet outcode', () => __awaiter(void 0, void 0, void 0, function* () {
        const foundRegion = yield regionHelpers_1.findDXRegion('E');
        //expect a London region
        expect(foundRegion).toBe(DXReferenceRegions_1.DXRegions[0]);
    }));
});
