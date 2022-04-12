# Access priavte method

export class Server{

    private somePrivateLogi(){
        console.log('doing private logic')
    }
    public createServer(){
        console.log('created server')
    }
}

class Launcher{

    //instance variables
    private name: string;
    private server: Server;

    //constructor
    constructor(){
        this.server = new Server();
    }

    //methods
    public launchApp(){
        console.log('started app');
        this.server.createServer();
        (this.server as any).somePrivateLogi() //cast to any use as less as posible
    }
}
