"use strict";
exports.__esModule = true;
var Server_1 = require("./Server");
var Launcher = /** @class */ (function () {
    //constructor
    function Launcher() {
        this.server = new Server_1.Server();
    }
    //methods
    Launcher.prototype.launchApp = function () {
        console.log('started app');
        this.server.createServer();
    };
    return Launcher;
}());
new Launcher().launchApp();
