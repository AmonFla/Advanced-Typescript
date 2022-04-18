import { countInstances, Monitor } from "./ObjectCounter";

@countInstances
class Example{
    public constructor(){
        console.log('created')
    }
}

const test = new Example();
console.log(Monitor.printInstances());
const test2 = new Example();
console.log(Monitor.printInstances());
