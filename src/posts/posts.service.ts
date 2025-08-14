import { Injectable, NotFoundException } from '@nestjs/common';
import type { Post } from './interfaces/post.interface';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 1,
      title: 'First Post',
      content: 'This is my First Post',
      authorName: 'Sangam',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  findAll(): Post[] {
    return this.posts;
  }
  findOne(id: number): Post {
    const singlePost = this.findAll().find((post) => post.id === id);
    if (!singlePost) {
      throw new NotFoundException(`Post with ID ${id} is not found`);
    }
    return singlePost;
  }

  createPost(postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Post {
    const newPost: Post = {
      id: this.getNextId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...postData,
    };
    this.posts.push(newPost);
    return newPost;
  }

  updatePost(
    id: number,
    updatedPostData: Partial<Omit<Post, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Post {
    // const currentPost = this.findOne(id)
    const currentPostIndex = this.posts.findIndex((post) => post.id === id);
    if (currentPostIndex === -1) {
      throw new NotFoundException(`Post with ${id} is not found`);
    }
    this.posts[currentPostIndex] = {
      ...this.posts[currentPostIndex],
      ...updatedPostData,
      updatedAt: new Date(),
    };
    return this.posts[currentPostIndex];
  }

  remove(id: number): string {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new NotFoundException(`Post with ${id} is not present`);
    }
    this.posts.splice(postIndex, 1);
    return `Post with ${id} is removed`;
  }

  private getNextId(): number {
    return this.posts.length > 0
      ? Math.max(...this.posts.map((post) => post.id)) + 1
      : 1;
  }
}
