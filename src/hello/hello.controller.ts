import { Controller, Get, Param } from '@nestjs/common';
import { HelloService } from './hello.service';

// express ->
// server.js -> routes, controller, services
// route A -> controller A -> service A
// incommming requests and returning response
// get post, put, delete

@Controller('hello')
export class HelloController {
  // dependency injection
  constructor(private readonly helloService: HelloService) {}

  @Get()
  getHellos(): string {
    return this.helloService.getHello();
  }

  @Get('user/:name')
  getHelloWithName(@Param('name') name: string): string {
    return this.helloService.getHelloWithName(name);
  }
}
