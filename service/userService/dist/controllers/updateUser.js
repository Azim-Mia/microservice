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
const zod_1 = require("zod");
const userData = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email().optional(),
    address: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional()
});
const updateUser = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = userData.safeParse(Object.assign({}, req.body));
    if (!users.success) {
        res.status(404).json({ error: users.error.errors });
    }
    ;
    res.status(201).json({
        success: true,
        message: "user create successfull",
        result: users === null || users === void 0 ? void 0 : users.data,
    });
});
exports.default = updateUser;
