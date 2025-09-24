"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const UserRouter_1 = require("./routes/UserRouter");
app_1.app.use('/users', UserRouter_1.userRouter);
app_1.app.use('/posts', UserRouter_1.userRouter);
