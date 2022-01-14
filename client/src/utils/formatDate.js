"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatDate(date) {
    return new Intl.DateTimeFormat().format(new Date(date));
}
exports.default = formatDate;
//# sourceMappingURL=formatDate.js.map