"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routing = void 0;
/**
 * @fileOverview index file packaging all routers
 * @author Patrick Vanegas
 * @version 1.0.0
 */
const posts_1 = require("./posts");
function routing(db, secret) {
    const routing = {
        postsRouting: (0, posts_1.postsRouting)(db, secret),
    };
    return routing;
}
exports.routing = routing;
;
