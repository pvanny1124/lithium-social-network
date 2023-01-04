import { PostRepository } from "../repositories";
const { postsHandler } = require('../controllers')
const express = require('express');
const router = express.Router();
import { Router } from 'express';

export function postsRouting(db: string, secret: number): Router {
  const postsRepository = new PostRepository(db, secret);

  router.post("/posts",  
    postsHandler.createPost(postsRepository)
  );

  router.get("/posts",
    postsHandler.getPosts(postsRepository)
  );

  router.post("/posts/:postId/comments",
    postsHandler.createCommentOnPost(postsRepository)
  );

  router.get("/posts/:postId/comments",
    postsHandler.getCommentsOnPost(postsRepository)
  );

  router.post("/posts/:postId/comment/:commentId",
    postsHandler.createCommentOnThread(postsRepository)
  );

  router.post("/posts/:postId/upvote", 
    postsHandler.incrementPostUpvote(postsRepository)
  );

  router.post("/posts/:postId/downvote", 
    postsHandler.decrementPostUpvote(postsRepository)
  );

  return router;
}
