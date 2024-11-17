import { User } from './user.types';

export interface Post {
  id: string;
  authorId: string;
  title: string;
  content: string;
  fundsToBeRaised: number;
  deadline: Date | null;
  image: string | null;
  isDraft: boolean;
  createdAt: Date;
  updatedAt: Date;
  removedAt: Date | null;
  currentlyRaisedFunds: number;
  author: User;
}

export interface CreatePostDto {
  authorId: string;
  title: string;
  content: string;
  fundsToBeRaised: number;
  deadline?: Date | null;
  isDraft?: boolean;
  image?: string | null;
}
