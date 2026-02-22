import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/guestbook')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMessages() {
    return this.appService.getMessages();
  }

  @Post()
  addMessage(@Body() body: { name: string; message: string }) {
    return this.appService.addMessage(body.name, body.message);
  }

  @Get('health')
  healthCheck() {
    return { 
      status: 'OK', 
      message: 'Personal Website API is running',
      timestamp: new Date().toISOString()
    };
  }
}