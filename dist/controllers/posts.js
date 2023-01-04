"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var postsHandler;
(function (postsHandler) {
    function createPost(postRepository) {
        return function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const { userId, text, title, tag } = req.body;
                try {
                    const response = yield postRepository.createPost(userId, text, title, tag);
                    if (response) {
                        res.sendStatus(204);
                    }
                    else {
                        res.sendStatus(400);
                    }
                }
                catch (error) {
                    console.log(error);
                    res.sendStatus(500);
                }
            });
        };
    }
    postsHandler.createPost = createPost;
    function getPosts(postRepository) {
        return function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const offset = req.query.offset;
                try {
                    if (typeof offset === 'undefined') {
                        var posts = yield postRepository.getPosts(0);
                    }
                    else {
                        var posts = yield postRepository.getPosts(parseInt(offset));
                    }
                    if (posts) {
                        res.json({ posts }).status(200);
                    }
                    else {
                        res.sendStatus(400);
                    }
                }
                catch (error) {
                    console.log(error);
                    res.sendStatus(500);
                }
            });
        };
    }
    postsHandler.getPosts = getPosts;
    function createCommentOnPost(postRepository) {
        return function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const { userId, text } = req.body;
                const postId = parseInt(req.params.postId);
                try {
                    const response = yield postRepository.createCommentOnPost(userId, postId, text);
                    if (response) {
                        res.sendStatus(204);
                    }
                    else {
                        res.sendStatus(400);
                    }
                }
                catch (error) {
                    console.log(error);
                    res.sendStatus(500);
                }
            });
        };
    }
    postsHandler.createCommentOnPost = createCommentOnPost;
    function createCommentOnThread(postRepository) {
        return function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const { userId, text } = req.body;
                const postId = parseInt(req.params.postId);
                const commentId = parseInt(req.params.commentId);
                try {
                    const response = yield postRepository.createCommentOnThread(userId, postId, commentId, text);
                    if (response) {
                        res.sendStatus(204);
                    }
                    else {
                        res.sendStatus(400);
                    }
                }
                catch (error) {
                    console.log(error);
                    res.sendStatus(500);
                }
            });
        };
    }
    postsHandler.createCommentOnThread = createCommentOnThread;
})(postsHandler || (postsHandler = {}));
module.exports = postsHandler;
