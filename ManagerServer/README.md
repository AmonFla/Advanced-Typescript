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

# Compiler Options

## Init file
create the compiler options files tsconfig.json with  tsc --init  or manually

## Options

{
    "compilerOptions": {
        "lib": [                        /* Specify library files to be included in the compilation. */
            "DOM",              
            "ES2015"
        ],
        "outDir": "dist",               /* Redirect output structure to the directory. */
        "rootDir": "src"                /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    }
}

# Debug