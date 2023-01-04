interface SQLMethods {
  readonly [method: string]: string
}

const sql: SQLMethods = {
  INSERT_NEW_POST: "INSERT INTO posts (user_id, text, title, tag) VALUES ($1, $2, $3, $4);",
  SELECT_POSTS: `SELECT * FROM posts ORDER BY created_at DESC OFFSET $1 LIMIT 12;`,
  INSERT_NEW_COMMENT: "INSERT INTO comments (user_id, post_id, text) VALUES ($1, $2, $3);",
  INSERT_COMMENT_ON_THREAD: `INSERT INTO comments (user_id, post_id, comment_id, text) VALUES ($1, $2, $3, $4)`,
  SELECT_COMMENTS_OF_POST: `SELECT * FROM comments WHERE post_id = $1;`
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

    } catch (error) {

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
}
