export interface PostType {
  userId: number,
  id: number,
  title: string,
  body: string
}

export interface CommentType {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string
}

export interface ResultTopComment {
 post_id : number
 post_title : string
 post_body : string
 total_number_of_comments: number
}

export interface ToSearchParameter {
  name: "postId" | "id" | "name" | "email" | "body",
  value: string | number
}