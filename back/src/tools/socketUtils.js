import _ from 'lodash';

export default class SocketUtils {
  static leaveRooms(socket) {
    for(const r of _.keys(socket.rooms)) {
      if(r.length > 20) {
        socket.leave(r);
      }
    }
  }
}
