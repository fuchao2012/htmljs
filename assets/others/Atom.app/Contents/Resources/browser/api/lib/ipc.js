// Generated by CoffeeScript 1.6.3
(function() {
  var EventEmitter, Ipc, send, sendWrap,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  EventEmitter = require('events').EventEmitter;

  send = process.atomBinding('ipc').send;

  sendWrap = function() {
    var BrowserWindow, args, channel, processId, routingId, window;
    channel = arguments[0], processId = arguments[1], routingId = arguments[2], args = 4 <= arguments.length ? __slice.call(arguments, 3) : [];
    BrowserWindow = require('browser-window');
    if ((processId != null ? processId.constructor : void 0) === BrowserWindow) {
      window = processId;
      args = [routingId].concat(__slice.call(args));
      processId = window.getProcessId();
      routingId = window.getRoutingId();
    }
    return send(channel, processId, routingId, __slice.call(args));
  };

  Ipc = (function(_super) {
    __extends(Ipc, _super);

    function Ipc() {
      var _this = this;
      process.on('ATOM_INTERNAL_MESSAGE', function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return _this.emit.apply(_this, args);
      });
      process.on('ATOM_INTERNAL_MESSAGE_SYNC', function() {
        var args, channel, event, set;
        channel = arguments[0], event = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
        set = function(value) {
          return event.sendReply(JSON.stringify(value));
        };
        Object.defineProperty(event, 'returnValue', {
          set: set
        });
        Object.defineProperty(event, 'result', {
          set: set
        });
        return _this.emit.apply(_this, [channel, event].concat(__slice.call(args)));
      });
    }

    Ipc.prototype.send = function() {
      var args, processId, routingId;
      processId = arguments[0], routingId = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      return this.sendChannel.apply(this, [processId, routingId, 'message'].concat(__slice.call(args)));
    };

    Ipc.prototype.sendChannel = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return sendWrap.apply(null, ['ATOM_INTERNAL_MESSAGE'].concat(__slice.call(args)));
    };

    return Ipc;

  })(EventEmitter);

  module.exports = new Ipc;

}).call(this);