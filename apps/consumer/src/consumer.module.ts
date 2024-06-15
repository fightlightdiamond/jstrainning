import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { SocketModule } from '../../socket/src/socket.module';
import { SocketService } from '../../socket/src/socket.service';

@Module({
  imports: [SocketModule],
  controllers: [],
  providers: [ConsumerService, SocketService],
})
export class ConsumerModule {}
