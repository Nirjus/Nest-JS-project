import { Injectable } from '@nestjs/common';
import { HelloService } from 'src/hello/hello.service';

@Injectable()
export class BookService {
  // constructor call to get service from hello service
  constructor(private readonly helloService: HelloService) {}
  getAllBooks() {
    return [
      { name: 'Pushpa 1', id: 1, weight: 280.56 },
      { name: 'Pushpa 2', id: 2, weight: 156.18 },
      { name: 'Pushpa 3', id: 3, weight: 240.98 },
      { name: 'Pushpa 4', id: 4, weight: 189.37 },
    ];
  }

  getBookById(id: number) {
    return this.getAllBooks().find((book) => book.id === id);
  }
  getBookName(id: number): string {
    const book = this.getAllBooks().find((book) => book.id === id);
    if (!book) {
      return 'No book found';
    }
    return this.helloService.getHelloWithName(book?.name);
  }
}
