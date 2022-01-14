"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const profileRoutes_1 = __importDefault(require("./routes/profileRoutes"));
const keys_1 = require("./config/keys");
const handleErrors_1 = require("./middlewares/handleErrors");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// CONNECT TO DB
mongoose_1.default
    .connect(keys_1.MONGO_URI)
    .then(() => console.log('Connected to database'))
    .catch((err) => {
    console.log(err);
    process.exit(1);
});
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
// MIDDLEWARES
// app.use(express.static(`${__dirname}/public`));
app.use(express_1.default.static(path_1.default.join(__dirname, 'client', 'build')));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use((0, helmet_1.default)());
app.use((0, express_fileupload_1.default)());
// ROUTES
app.use('/api/v1/users', userRoutes_1.default);
app.use('/api/v1/auth', authRoutes_1.default);
app.use('/api/v1/posts', postRoutes_1.default);
app.use('/api/v1/profile', profileRoutes_1.default);
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'client', 'build', 'index.html'));
});
// app.use('/:file', (req, res) => {
//   res.sendFile(`${__dirname}/public/uploads/${req.params.file}`);
// });
//ERROR HANDLING
app.use(handleErrors_1.handleErrors);
// START SERVER
app.listen(keys_1.PORT, () => {
    return console.log(`Server is up and running on PORT ${keys_1.PORT}`);
});
//# sourceMappingURL=index.js.map