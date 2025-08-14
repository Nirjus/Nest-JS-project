import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { BookService } from './book.service';

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
}
