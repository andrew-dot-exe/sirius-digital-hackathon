import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UsersService } from '../services/UsersService';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/AuthService';
import { LoginDto } from '../dto/Login.dto';
import { Roles } from '../jwt/roles.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Login to the system' })
  @ApiResponse({ status: 200, description: 'Successfully logged in.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.login, body.password);
    return this.authService.login(user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get profile of the logged-in user' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(AuthGuard('jwt'))
  @Roles('hr', 'manager', 'default')
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
