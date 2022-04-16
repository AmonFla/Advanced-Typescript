import { Router } from "../Router";

export abstract class BaseController{

    protected container = document.createElement("div");
    protected router:Router;

    public constructor(router: Router){
        this.router = router;
    }

    public abstract createView():HTMLDivElement;

    protected createElement<k extends keyof HTMLElementTagNameMap>(
        elementType:k, innerText?:string, action?:any
        ):HTMLElementTagNameMap[k]{
            const element = document.createElement(elementType);
            if(innerText){
                element.innerText = innerText;
            }
            if(action){
                element.onclick = action
            }
            this.container.append(element)
            return element;
    }
}