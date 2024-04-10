"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const auth_routes_1 = require("./routes/auth.routes");
const user_routes_1 = require("./routes/user.routes");
const recipe_routes_1 = require("./routes/recipe.routes");
const server = express();
server.use(express.json());
server.use(cors());
server.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.get("/v1/swagger", (req, res) => {
    return res.sendFile(process.cwd() + "/swagger.json");
});
server.get("/v1/docs", (req, res) => {
    return res.sendFile(process.cwd() + "/index.html");
});
server.get("/v1", (req, res) => res.status(200).json({ status: "OK" }));
server.use("/v1/auth", auth_routes_1.default);
server.use("/v1/user", user_routes_1.default);
server.use("/v1/recipe", recipe_routes_1.default);
exports.default = server;
