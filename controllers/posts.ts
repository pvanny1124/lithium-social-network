import { PostRepository } from '../repositories';
import { Request, Response } from 'express';

export = postsHandler;

namespace postsHandler {
  export function createPost(postRepository: PostRepository) : Function {
    return async function (req: Request, res: Response) : Promise<void> {
      const { userId, text, title, tag } = req.body;
      try {
        const response = await postRepository.createPost(userId, text, title, tag);
        if (response) {
          res.sendStatus(204);
        } else {
          res.sendStatus(400);
        }
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    }
  }

  export function getPosts(postRepository: PostRepository) : Function {
    return async function (req: Request, res: Response) : Promise<void> {
      const offset = req.query.offset as string;
      try {
        if (typeof offset === 'undefined') {
          var posts = await postRepository.getPosts(0);
        } else {
          var posts = await postRepository.getPosts(parseInt(offset));
        }
        if (posts) {
          res.json({ posts }).status(200)
        } else {
          res.sendStatus(400);
        }
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    }
  }

  export function createCommentOnPost(postRepository: PostRepository) : Function {
    return async function (req: Request, res: Response) : Promise<void> {
      const { userId, text } = req.body;
      const postId = parseInt(req.params.postId);
      try {
        const response = await postRepository.createCommentOnPost(userId, postId, text);
        if (response) {
          res.sendStatus(204)
        } else {
          res.sendStatus(400);
        }
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    }
  }

  export function getCommentsOnPost(postRepository: PostRepository) : Function {
    return async function (req: Request, res: Response) : Promise<void> {
      const postId = parseInt(req.params.postId);
      try {
        const response = await postRepository.createCommentOnThread(postId);
        if (response) {
          res.sendStatus(204)
        } else {
          res.sendStatus(400);
        }
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    }
  }

  export function createCommentOnThread(postRepository: PostRepository) : Function {
    return async function (req: Request, res: Response) : Promise<void> {
      const { userId, text } = req.body;
      const postId = parseInt(req.params.postId);
      const commentId = parseInt(req.params.commentId);
      try {
        const response = await postRepository.createCommentOnThread(userId, postId, commentId, text);
        if (response) {
          res.sendStatus(204)
        } else {
          res.sendStatus(400);
        }
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    }
  }
}
