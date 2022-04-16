export abstract class BaseController{

    protected container = document.createElement("div");
    public abstract createView():HTMLDivElement;

    protected createElement<k extends keyof HTMLElementTagNameMap>(
        elementType:k, innerText?:string
        ):HTMLElementTagNameMap[k]{
            const element = document.createElement(elementType);
            if(innerText){
                element.innerText = innerText;
            }
            return element;

    }
}