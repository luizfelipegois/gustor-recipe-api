"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordRegex = exports.emailRegex = exports.fullNameRegex = void 0;
exports.fullNameRegex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
exports.emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
exports.passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?;/&])[A-Za-z\d@$!%*?;/&]{8,}$/;
