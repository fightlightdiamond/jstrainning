import { Injectable } from '@nestjs/common';
import { Process } from '@nestjs/bull';
import { SocketService } from '../../socket/src/socket.service';
import { Job } from 'bull';
import { NameQueueConstant } from '@app/shared/common/constants/name-queue.constant';
import ISocketQueueContract from '@app/shared/common/contracts/socket-queue.contract';

@Injectable()
export class ConsumerService {
  constructor(private readonly socketService: SocketService) {}

  @Process()
  handleMessageEmitClient(job: Job): void {
    const data = job.data;
    console.log('sendDataToRoom....', data);
    this.socketService.server.to(data.room).emit(data.sender, {
      message: data,
    });
  }

  @Process(NameQueueConstant.ROOM_QUEUE)
  betRom(job: Job): void {
    const data: ISocketQueueContract = job.data;
    console.log('ROOM_QUEUE....', data);
    this.socketService.server.to(data.room).emit(data.event, data.data);
  }
}
