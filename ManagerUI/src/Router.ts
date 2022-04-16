export class Router{

    public handleRequest(){
        console.log("handling request for"+this.getRoute())
    }

    private getRoute():string{
        return window.location.pathname;
    }
}