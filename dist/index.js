"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const swagger_1 = __importDefault(require("./routes/swagger"));
const app = (0, express_1.default)();
const port = 3000;
// default landing page
app.get("/", (req, res) => {
    res.send("Hello, I am Ibrohim Isroilov. Nice to meet you!");
});
// api routes
app.use("/", index_1.default);
// for documentation
app.use("/docs", swagger_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map