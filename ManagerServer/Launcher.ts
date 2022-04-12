import { Server } from './Server'

class Launcher{
    //instance variables
    name: string;
    server: Server;

    //constructor
    constructor(){
        this.server = new Server();
    }

    //methods
    launchApp(){
        console.log('started app');
        this.server.createServer();
    }
}

new Launcher().launchApp();