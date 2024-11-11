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
const uuidv4_1 = require("uuidv4");
const schemas_1 = __importDefault(require("../schemas"));
const zod_1 = require("zod");
const userData = zod_1.z.object({
    authUserId: zod_1.z.string(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    address: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional()
});
const usercreate = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const users = userData.safeParse(Object.assign({ authUserId: (0, uuidv4_1.uuid)() }, req.body));
    if (!users.success) {
        res.status(404).json({ error: users.error.errors });
    }
    ;
    const email = (_a = users === null || users === void 0 ? void 0 : users.data) === null || _a === void 0 ? void 0 : _a.email;
    const exits = yield schemas_1.default.find({ email: email });
    if (exits) {
        return res.status(400).json({ success: false, message: "user email is exits" });
    }
    ;
    const userAdd = new schemas_1.default(users.data);
    if (!userAdd) {
        return res.status(400).json({ success: false, message: "user userAdd data problem" });
    }
    ;
    const result = yield userAdd.save();
    if (!result) {
        return res.status(400).json({ success: false, message: "user create problem" });
    }
    ;
    res.status(201).json({
        success: true,
        message: "user create successfull",
        result: result,
    });
});
exports.default = usercreate;
