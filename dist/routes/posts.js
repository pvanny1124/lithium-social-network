"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouting = void 0;
const repositories_1 = require("../repositories");
const { postsHandler } = require('../controllers');
const express = require('express');
const router = express.Router();
function postsRouting(db, secret) {
    const postsRepository = new repositories_1.PostRepository(db, secret);
    router.post("/posts", postsHandler.createPost(postsRepository));
    router.get("/posts", postsHandler.getPosts(postsRepository));
    router.post("/posts/:postId/comments", postsHandler.createCommentOnPost(postsRepository));
    router.post("/posts/:postId/comment/:commentId", postsHandler.createCommentOnThread(postsRepository));
    return router;
}
exports.postsRouting = postsRouting;
