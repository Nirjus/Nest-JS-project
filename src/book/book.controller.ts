import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './interfaces/Book.interface';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAllbooks() {
    return this.bookService.getAllBooks();
  }

  @Get('info')
  getBookById(@Query('id', ParseIntPipe) id: number) {
    return this.bookService.getBookById(id);
  }

  @Get('name/:id')
  getBookName(@Param('id', ParseIntPipe) id: number): string {
    return this.bookService.getBookName(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createBook(
    @Body()
    bookData: Omit<Book, 'id'>,
  ) {
    this.bookService.create(bookData);
  }

  @Put(':id')
  updateBook(
    @Param('id', ParseIntPipe)
    id: number,
    @Body()
    updatedBook: Partial<Omit<Book, 'id'>>,
  ) {
    this.bookService.updateBook(id, updatedBook);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NOT_FOUND)
  removeBook(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    this.bookService.remove(id);
  }
}
