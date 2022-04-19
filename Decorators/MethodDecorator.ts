import { logInvocation } from "./MethodDecorators";

class Test{

    private name: string;

    public constructor(name:string = ''){
        this.name = name
    }

    @logInvocation
    public getName(): string{
        return this.name
    }

    @logInvocation
    public setName(name:string){
        this.name = name;
    }
}

const obj:Test = new Test('Flavio');

obj.getName();




