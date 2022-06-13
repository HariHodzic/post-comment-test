import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/dto/posts/create-post.dto';
import { SearchPostDto } from 'src/dto/posts/search-post.dto';
import { UpdatePostDto } from 'src/dto/posts/update-post.dto';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {

  constructor(
      @InjectRepository(Post)
      private postRepository: Repository<Post>,
  ){}

  async getPostById(id: string): Promise<Post> {
      const result = await this.postRepository.findOne({ where: { id: id } });
      if (!result) {
        throw new NotFoundException(`Post with ID "${id}" not found`);
      }
      return result;
  }

  getPosts(searchPostDto: SearchPostDto , user: User): Promise<Post[]> {
    const { author, search } = searchPostDto;

    const query = this.postRepository.createQueryBuilder('posts');
    query.where({where:{ user:user}});
    query.where({user});

    if (author) {
      query.andWhere('task.author = :author', { author });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    } 

    try {
      const tasks = query.getMany();
      return tasks;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  createQueryBuilder(arg0: string) {
    throw new Error('Method not implemented.');
  }
  

  async createPost(createPostDto: CreatePostDto, author: User): Promise<Post>{
      const { title, description, dateTime}  = createPostDto;
      const post = this.postRepository.create({
          title,
          description,
          dateTime,
          author
      });
      await this.postRepository.save(post);
      return post;
  }

  async deletePost(id: string): Promise<void> {
      const result = await this.postRepository.delete(id);

      if (result.affected === 0) {
        throw new NotFoundException(`Post with ID "${id}" not found`);
      }
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<Post>{
      const result = await this.postRepository.findOne({ where: { id: id } });

      if (!result) {
        throw new NotFoundException(`Post with ID "${id}" not found`);
      }

      result.title = updatePostDto.title;
      result.description = updatePostDto.description;
      result.edited = updatePostDto.edited;
      await this.postRepository.save(result);
      return result;
  }
}
