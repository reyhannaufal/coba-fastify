import { Post } from "./post";

export interface User {
  name: string | null;
  email: string;
  posts: Post[];
}
