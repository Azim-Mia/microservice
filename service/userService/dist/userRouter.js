"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("./controllers");
const userRouter = express_1.default.Router();
userRouter.post('/create', controllers_1.usercreate);
userRouter.post('/update', controllers_1.updateUser);
userRouter.get('/all', controllers_1.findAllUser);
userRouter.get('/:id', controllers_1.findSingleUser);
exports.default = userRouter;
