
export function logInvocation(target: Object, propertyKey:string, descriptor: PropertyDescriptor){
    
    const className = target.constructor.name;

    let originalMethod = descriptor.value;
    descriptor.value = async function(...args: any[]){
        console.log(`${className}#${propertyKey} called with ${JSON.stringify(args)}`);
        const result = await originalMethod.apply(this,args);
        console.log(`${className}#${propertyKey} return ${JSON.stringify(result)}`); 
        return result;
    }

    return descriptor;
}

export function delayResponse(delayMS: number){
    return function(target: Object, propertyKey:string, descriptor: PropertyDescriptor){
        let originalMethod = descriptor.value;
        descriptor.value = async function(...args: any[]){ 
            const result = await originalMethod.apply(this,args); 
            /*
            new functionality added
            We can do all kinds of stuff, because at this point we have access to our arguments.
            We can either cancel the method execution based on some parameters we get later from our program.
            We can do all kinds of stuff with this method.
            Decorator's there are very powerful.
            But you need to keep in mind that you need to be careful when you use them.
            */
            await delay(delayMS)
            return result;
        }
    }
}

async function delay(timeout: number){
    return new Promise<void>((resolve)=>setTimeout(() =>{
        resolve();
    }, timeout))
}

/*
 sample decorator

    export function decoName(target: Object, propertyKey:string, descriptor: PropertyDescriptor){ 

        let originalMethod = descriptor.value;
        descriptor.value = async function(...args: any[]){ 
            const result = await originalMethod.apply(this,args); 
            return result;
        }

        return descriptor;
    }

*/

