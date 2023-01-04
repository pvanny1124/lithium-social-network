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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepository = void 0;
const sql = {
    INSERT_NEW_POST: "INSERT INTO posts (user_id, text, title, tag) VALUES ($1, $2, $3, $4);",
    SELECT_POSTS: `SELECT * FROM posts ORDER BY created_at DESC OFFSET $1 LIMIT 12;`,
    INSERT_NEW_COMMENT: "INSERT INTO comments (user_id, post_id, text) VALUES ($1, $2, $3);",
    INSERT_COMMENT_ON_THREAD: `INSERT INTO comments (user_id, post_id, comment_id, text) VALUES ($1, $2, $3, $4)`
};
class PostRepository {
    constructor(db, secret) {
        this.db = db;
        this.secret = secret;
    }
    createPost(userId, text, title, tag) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rowCount } = yield this.db.result(sql.INSERT_NEW_POST, [userId, text, title, tag]);
                return rowCount === 1;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getPosts(offset) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.db.many(sql.SELECT_POSTS, [offset]);
                return posts;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    createCommentOnPost(userId, postId, text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rowCount } = yield this.db.result(sql.INSERT_NEW_COMMENT, [userId, postId, text]);
                return rowCount === 1;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    createCommentOnThread(userId, postId, commentId, text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rowCount } = yield this.db.result(sql.INSERT_COMMENT_ON_THREAD, [userId, postId, commentId, text]);
                return rowCount === 1;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.PostRepository = PostRepository;
