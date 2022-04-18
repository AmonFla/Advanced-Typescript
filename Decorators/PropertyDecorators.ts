

const someObject = {
    someProperty: 'inicial'
}


class Manager{

    //@watchChange
    @linkValue(someObject)
    someProperty: string
}

// watchChange(Manager.prototype, 'someProperty')

const manager: Manager = new Manager();
manager.someProperty = '123';
console.log(someObject.someProperty)
manager.someProperty = '456'
console.log(someObject.someProperty);


function linkValue(otherObject:any){
    return function(target: any, key:string){
        let property = target[key];

        const getter = () => {
            return property
        }

        const setter = (newVal: any) => { 
            property = newVal;
            otherObject[key] = newVal;
        };

        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            configurable: true,
            enumerable: true
        })
    }
}

function  watchChange(target: Object | any, key:string){

    let property = target[key];

    const getter = () => {
        return property
    }

    const setter = (newVal: any) => {
        console.log(`${key} changed from ${property} to ${newVal}`)
        property = newVal;
    };

    Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        configurable: true,
        enumerable: true
    })
}