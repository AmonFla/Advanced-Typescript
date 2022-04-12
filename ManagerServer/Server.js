"use strict";
exports.__esModule = true;
var Server = /** @class */ (function () {
    function Server() {
    }
    Server.prototype.somePrivateLogi = function () {
        console.log('doing private logic');
    };
    Server.prototype.createServer = function () {
        console.log('created server');
    };
    return Server;
}());
exports.Server = Server;
