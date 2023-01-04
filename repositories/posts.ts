interface SQLMethods {
  readonly [method: string]: string
}

const sql: SQLMethods = {
  INSERT_NEW_POST: `
    INSERT INTO posts (user_id, text, title, tag) 
    VALUES ($1, $2, $3, $4);
  `,
  SELECT_POSTS: `
    SELECT * FROM posts 
    ORDER BY created_at DESC OFFSET $1 LIMIT 12;
  `,
  INSERT_NEW_COMMENT: `
    INSERT INTO comments (user_id, post_id, text) 
    VALUES ($1, $2, $3);
  `,
  INSERT_COMMENT_ON_THREAD: `
    INSERT INTO comments (user_id, post_id, comment_id, text)
    VALUES ($1, $2, $3, $4)
  `,
  SELECT_COMMENTS_OF_POST: `
    SELECT * FROM comments WHERE post_id = $1;
  `,
  INSERT_POST_UPVOTE: `
    INSERT INTO posts_upvotes (post_id, user_id) 
    VALUES ($1, $2);
  `,
  INCREMENT_POST_UPVOTE: `
    UPDATE posts SET upvotes = upvotes + 1 WHERE id = $1;
  `,
  INSERT_POST_DOWNVOTE: `
    INSERT INTO posts_downvotes (post_id, user_id) 
    VALUES ($1, $2);
  `,
  INCREMENT_POST_DOWNVOTE: `
    UPDATE posts SET downvotes = downvotes + 1 WHERE id = $1;
  `,
  SELECT_USER_POSTS_UPVOTES: `
    SELECT 1 FROM posts_upvotes WHERE user_id = $1 AND post_id = $2;
  `,
  SELECT_USER_POSTS_DOWNVOTES: `
    SELECT 1 FROM posts_downvotes WHERE user_id = $1 AND post_id = $2;
  `,
  DECREMENT_POST_UPVOTES: `
    UPDATE posts SET upvotes = upvotes - 1 WHERE id = $1;
  `,
  DELETE_FROM_POST_UPVOTES: `
    DELETE FROM posts_upvotes WHERE user_id = $1 AND post_id = $2;
  `,
}


export class PostRepository {
  public constructor(private readonly db: any, private readonly secret: number) {}

  public async createPost(userId: number, text: string, title: string, tag: string) {
    try {
      const { rowCount } = await this.db.result(sql.INSERT_NEW_POST, [userId, text, title, tag]);
      return rowCount === 1;
    } catch (error) {
      console.log(error)
    }
  }

  public async getPosts(offset?: number) {
    try {
      const posts = await this.db.many(sql.SELECT_POSTS, [offset]);
      return posts;
    } catch (error) {
      console.log(error)
    }
  }

  public async getCommentsOnPost(postId: number) {
    try {
      const comments = await this.db.many(sql.SELECT_COMMENTS_OF_POST, [postId]);
      return comments;
    } catch (error) {
      console.log(error);
    }
  }

  public async createCommentOnPost(userId: number, postId: number, text: string) {
    try {
      const { rowCount } = await this.db.result(sql.INSERT_NEW_COMMENT, [userId, postId, text]);
      return rowCount === 1;
    } catch (error) {
      console.log(error);
    }
  }

  public async createCommentOnThread(userId: number, postId: number, commentId: number, text: string) {
    try {
      const { rowCount } = await this.db.result(sql.INSERT_COMMENT_ON_THREAD, [userId, postId, commentId, text]);
      return rowCount === 1;
    } catch (error) {
      console.log(error);
    }
  }

  public async incrementPostUpvote(userId: number, postId: number) {
    try {
      const { rowCount } = await this.db.result(sql.SELECT_USER_POSTS_UPVOTES, [userId, postId]);

      if (rowCount === 1) {
        return rowCount !== 1;
      }

      const response = await this.db.tx(async (t: any) => {
        const { rowCount } = await t.result(sql.INSERT_POST_UPVOTE, [postId, userId]);
        if (rowCount === 1) {
          const { rowCount } = await t.result(sql.INCREMENT_POST_UPVOTE, [postId]);
          return rowCount === 1;
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  public async decrementPostUpvote(userId: number, postId: number) {
    try {
      const response = await this.db.tx(async (t: any) => {
        const { rowCount } = await t.result(sql.DELETE_FROM_POST_UPVOTES, [userId, postId]);
        if (rowCount === 1) {
          const { rowCount } = await t.result(sql.DECREMENT_POST_UPVOTES, [postId]);
          return rowCount === 1;
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
