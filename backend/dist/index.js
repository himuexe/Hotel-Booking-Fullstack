"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import statements
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING); //coonect to mongodb database [mongoose.connect]
const app = (0, express_1.default)(); //start the express server
//[app.use]
app.use((0, cookie_parser_1.default)()); // use cookieparser
app.use(express_1.default.json()); // convert to json file for post or put requests
app.use(express_1.default.urlencoded({ extended: true })); //method inbuilt in express to recognize the incoming Request Object as strings or arrays. 
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
// directing routes
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist")));
app.use("/api/auth", auth_1.default);
app.use("/api/users", users_1.default);
// starting the server at 7000 port
//[app.listen]
app.listen(7000, () => {
    console.log("Server is started at localhost:7000");
});
