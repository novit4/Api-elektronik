import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ping')
  ping(): { message: string; timestamp: string } {
    return {
      message: 'pong',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('about')
  about(): { app: string; version: string; description: string } {
    return {
      app: 'Elektronik API',
      version: '1.0.0',
      description: 'API untuk manajemen produk elektronik - Tugas 7 Pemrograman Web',
    };
  }
}
