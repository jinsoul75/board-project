export interface Post {
  author: string;
  category: string;
  commentCount: number;
  content: string;
  date: string;
  email: string;
  likeCount: number;
  title: string;
  _id: string;
}

export interface UserInfo {
  user: {
    name: string;
    email: string;
    image: string;
    id: string;
  };
}

export interface DataType {
  content: string;
  author: string;
  date: string;
  _id: string;
  email: string;
}
