import _ from 'lodash';
import Scene from '../models/scene';
import SocketUtils from '../tools/socketUtils';

module.exports = (io) => {
  io.on('connection', function(socket) {
    socket.on('joinRoom', room => {
      SocketUtils.leaveRooms(socket);
      // Room: _id scene + name instruments
      socket.join(_.kebabCase(room));
    });

    socket.on('actionTurnVolume', async action => {
      const scene = await Scene.findById(action._id);

      Reflect.deleteProperty(action, '_id');
      scene.actions.push(action);
      await scene.save();
      io.to(_.kebabCase(`${scene._id}`)).emit('actionTodo', action);
    });

    socket.on('actionDone', async data => {
      const scene = await Scene.findById(data._id);

      scene.actions = _.filter(scene.actions, a => {
        return !_.isEqual(a, data.action);
      });

      scene.updatedAt = new Date();

      await scene.save();
      const room = _.kebabCase(`${scene._id}${data.action.from.name}`);

      io.to(room).emit('actionDone', scene.actions);
    });

    socket.on('disconnect', () => {
      // console.log('user disconnected');
    });
  });
};
