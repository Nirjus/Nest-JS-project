import { Injectable } from '@nestjs/common';
import { HelloService } from 'src/hello/hello.service';

@Injectable()
export class UserService {
  // injecting services from other module
  // hello module must export helloService and userModule must import helloModule
  constructor(private readonly helloService: HelloService) {}

  getAllUsers() {
    return [
      { id: 1, name: 'Gopal' },
      { id: 2, name: 'Prosanto' },
      { id: 3, name: 'Dinash' },
    ];
  }

  getUserById(id: number) {
    const user = this.getAllUsers().find((user) => user.id === id);
    // if (!user) {
    //   throw Error('No user found');
    // }
    return user;
  }

  getWelcomeMessage(userId: number): string {
    const user = this.getUserById(userId);
    if (!user) {
      return 'User not found!';
    }
    return this.helloService.getHelloWithName(user?.name);
  }
}
