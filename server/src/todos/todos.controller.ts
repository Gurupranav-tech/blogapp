import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('/api/todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get('')
  async getTodos(@Headers('user') user: unknown) {
    return await this.todoService.getTodos(user);
  }

  @Get('/:id')
  async getTodo(@Headers('user') user: unknown, @Param('id') id: string) {
    const todo = await this.todoService.getTodo(user, id);
    if (!todo)
      throw new HttpException('Invalid todo id', HttpStatus.BAD_REQUEST);
    return todo;
  }

  @Post('')
  async createTodo(@Headers('user') user: unknown, @Body() body: unknown) {
    const todo = await this.todoService.createTodo(user, body);
    if (!todo)
      throw new HttpException(
        'Unable to create todo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return todo;
  }

  @Delete('/:id')
  async deleteTodo(@Headers('user') user: unknown, @Param('id') id: string) {
    try {
      const todo = await this.todoService.deleteTodo(user, id);
    } catch {
      throw new HttpException('Invalid todo id', HttpStatus.BAD_REQUEST);
    }

    return { status: 'done' };
  }

  @Put('/:id')
  async updateTodo(
    @Headers('user') user: unknown,
    @Param('id') id: string,
    @Body() body: unknown,
  ) {
    const todo = await this.todoService.updateTodo(user, id, body);
    return todo;
  }
}
