import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { AppGateway } from './app/app.gateway';

@Module({
  imports: [],
  providers: [SocketService, AppGateway],
  exports: [SocketService],
})
export class SocketModule {}
