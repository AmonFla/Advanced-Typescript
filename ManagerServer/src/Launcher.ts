import { Server } from './Server/Server'

class Launcher{

    //instance variables
    private server: Server;

    //constructor
    constructor(){
        this.server = new Server();
    }

    //methods
    public launchApp(){
        console.log('started app');
        this.server.createServer(); 
    }
}

new Launcher().launchApp();