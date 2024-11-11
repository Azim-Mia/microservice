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
const schemas_1 = __importDefault(require("../schemas"));
const findSingleUser = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const filed = req.query.filed;
    let user;
    if (id) {
        user = yield schemas_1.default.findOne({ authUserId: id });
    }
    else {
        user = yield schemas_1.default.findOne({ _id: filed });
    }
    if (!user) {
        return res.status(404).json({ success: false, message: "Not Found User id" });
    }
    res.status(200).json({ success: true, message: "user return successfull", user });
});
exports.default = findSingleUser;
