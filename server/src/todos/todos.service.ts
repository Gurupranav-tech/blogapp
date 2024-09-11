import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/Prisma.service';
import { z } from 'zod';

const TodoCreateSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const TodoUpdateSchema = z.object({
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
});

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async getTodos(user: any) {
    const id = user.id;
    return this.prisma.todo.findMany({
      where: {
        userid: id,
      },
    });
  }

  async getTodo(user: any, id: string) {
    const userid = user.id;
    return this.prisma.todo.findFirst({
      where: {
        userid,
        id,
      },
    });
  }

  async createTodo(user: any, body: unknown) {
    const userid = user.id;
    try {
      const todoData = await TodoCreateSchema.parseAsync(body);
      const todo = this.prisma.todo.create({
        data: {
          title: todoData.title,
          descript: todoData.description,
          completed: false,
          userid,
        },
      });
      return todo;
    } catch {
      throw new HttpException('Invalid data for Todo', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteTodo(user: any, id: string) {
    const userid = user.id;
    return await this.prisma.todo.delete({
      where: {
        userid,
        id: id,
      },
    });
  }

  async updateTodo(user: any, id: string, body: unknown) {
    try {
      const userid = user.id;
      const todoDate = await TodoUpdateSchema.parseAsync(body);
      return this.prisma.todo.update({
        where: {
          id,
          userid,
        },
        data: {
          title: todoDate.title,
          descript: todoDate.description,
          completed: todoDate.completed,
        },
      });
    } catch {
      throw new HttpException(
        'Invalid data for updating todo',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
