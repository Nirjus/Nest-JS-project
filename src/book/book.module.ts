import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { HelloModule } from 'src/hello/hello.module';

@Module({
  providers: [BookService],
  controllers: [BookController],
  imports: [HelloModule],
})
export class BookModule {}
