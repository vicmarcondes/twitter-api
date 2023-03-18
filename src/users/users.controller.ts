import { Body, Get, Controller, Post, Param } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
  

  @Post("login")
  async login(@Body() userPayload: any) {
    return await this.usersService.login(userPayload);
  }

  @Get(":username")
  async profile(@Param('username') username: string) {
    return await this.usersService.getUserData(username);
  }

}
