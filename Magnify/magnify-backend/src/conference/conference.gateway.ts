import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@WebSocketGateway()
export class ConferenceGateway {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('ConferenceGateway');

  afterInit(server: any) {
    this.logger.log('Initialized!');
  }

  @SubscribeMessage('join-room')
  handleRoomJoin(
    @ConnectedSocket() client, 
    @MessageBody('roomId') roomId: string, 
    @MessageBody('peerId') peerId: string) {
      client.join(roomId);
      client.broadcast.emit('user-connected', peerId);
      this.logger.log(`${peerId} joined ${roomId}`);

      client.on('disconnect', () => {
        client.broadcast.emit('user-disconnected', peerId);
        client.leave(roomId);
      })
  }

  @SubscribeMessage('leave-room')
  handleRoomLeave(
    @ConnectedSocket() client, 
    @MessageBody('roomId') roomId: string, 
    @MessageBody('peerId') peerId: string) {
      client.broadcast.emit('user-disconnected', peerId);
      client.leave(roomId);
      this.logger.log(`${peerId} left ${roomId}`);
  }

  @SubscribeMessage('send-message')
  handleSendMessage(
    @ConnectedSocket() client, 
    @MessageBody('roomId') roomId: string,
    @MessageBody('peerId') peerId: string, 
    @MessageBody('content') content: string) {
      client.broadcast.emit('recieve-message', content);
      this.logger.log(`${peerId} sent a message to room ${roomId} with the following content ${content}`);
  }
}
