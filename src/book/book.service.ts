import { Injectable, NotFoundException } from '@nestjs/common';
import { HelloService } from 'src/hello/hello.service';
import { Book } from './interfaces/Book.interface';

@Injectable()
export class BookService {
  // constructor call to get service from hello service
  constructor(private readonly helloService: HelloService) {}
  private books: Book[] = [
    { name: 'Pushpa 1', id: 1, weight: 280.56 },
    { name: 'Pushpa 2', id: 2, weight: 156.18 },
    { name: 'Pushpa 3', id: 3, weight: 240.98 },
    { name: 'Pushpa 4', id: 4, weight: 189.37 },
  ];
  getAllBooks() {
    return this.books;
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

  create(bookData: Omit<Book, 'id'>) {
    this.books.push({
      id: this.increaseIndexing(),
      ...bookData,
    });
  }

  updateBook(id: number, bookData: Partial<Omit<Book, 'id'>>) {
    const currentBookIndex = this.books.findIndex((book) => book.id === id);
    if (currentBookIndex === -1) {
      throw new NotFoundException(`This Book is not gound with id ${id}`);
    }
    this.books[currentBookIndex] = {
      ...this.books[currentBookIndex],
      ...bookData,
    };
  }

  remove(id: number) {
    const currentBookIndex = this.books.findIndex((book) => book.id === id);
    if (currentBookIndex === -1) {
      throw new NotFoundException(`This Book is not gound with id ${id}`);
    }
    this.books.splice(currentBookIndex, 1);
  }

  increaseIndexing(): number {
    const currentItem = this.books[this.books.length - 1];
    const index = this.books.length > 0 ? currentItem?.id + 1 : 1;
    return index;
  }
}
