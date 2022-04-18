export class Monitor{
    public static printInstances(): string{
        let response = '';
        Counter.objectCount.forEach((value: number, key:string) =>{
            response += `${key}: ${value} \n`;
        })
        return response;
    }
}

class Counter{
    static objectCount: Map<string, number> = new Map();
    
    static increment(className: string){
        if(!this.objectCount.get(className)){
            this.objectCount.set(className, 1);
        }else{
            const currentCount = this.objectCount.get(className)
            this.objectCount.set(className, currentCount!+1)
        }
    }
}

/**
 * solo afecta a la clase
 */
/*export function countInstances(constructor: Function){
    Counter.increment(constructor.name)
}*/

/**
 * Para que afecte a la instancia debe retornarse un contructor
 */

 export function countInstances<T extends {new(...args:any[]):{}}>(constructor: T){
    return class extends constructor{
        abc = Counter.increment(constructor.name)
    }
    
}