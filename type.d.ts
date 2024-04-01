

export type Role = 'ADMIN' | 'MODERATOR' | 'WRITER' | 'USER' | 'NONE';

export type User = {
  id: string;
  name: string;
  email?: string;
  image?: string;
  createdAt?: Date;
  threads?: Thread[];
  comments?: Comment[];
  commentVotes?: CommentVote[];
  threadVotes?: ThreadVote[];
  notifications?: Notification[];
  role: Role
};

export type AllUser = User & {
  _count: {
    threads: number;
    comments: number;
    threadVotes: number;
    commentVotes: number;
  };
};

export type Category = {
  id: string;
  slug: string;
  title: string;
  color: string;
  createdAt?: Date;
  threads?: Thread[];
};

export interface Thread {
  id: string;
  slug: string;
  title: string;
  desc?: string;
  content: string;
  thumbnail?: string;
  views: Number;
  createdAt: string;
  catSlug: string;
  userEmail: string;
  cat: Category;
  user: User;
  comments?: Comment[];
  votes: ThreadVote[];
}

export interface SingleThread extends Thread {
  user: User;
  _count: { comments: number };
}

export type Comment = {
  id: string;
  content: string;
  threadSlug: string;
  userEmail: string;
  user: User;
  votes: CommentVote[];
  createdAt?: Date;
};

export type CommentVote = {
  id: string;
  type: "UPVOTE" | "DOWNVOTE";
  userEmail: string;
  user: User;
  commentId: string;
  comment: Comment;
};

export type ThreadVote = {
  id: string;
  type: "UPVOTE" | "DOWNVOTE";
  userEmail: string;
  user: User;
  threadSlug: string;
  thread: Thread;
};

export type Notification = {
  id: string;
  title: string;
  content: string;
  startFrom: Date;
  endTo?: Date;
  isExpired: boolean;
  isStarted: boolean;
  userEmail: string;
  user: User;
  createdAt?: Date;
  isModified: boolean;
};
