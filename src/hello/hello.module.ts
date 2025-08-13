import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

// root module -> use all the

@Module({
  controllers: [HelloController],
  providers: [HelloService],
  imports: [], // import other module if needed
  exports: [HelloService], // exports services if needed
})
export class HelloModule {}
