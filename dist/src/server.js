"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const _1 = require(".");
const database_1 = require("./database/database");
(0, dotenv_1.config)();
const PORT = process.env.PORT || 3001;
_1.default.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
(0, database_1.connectDatabase)();
