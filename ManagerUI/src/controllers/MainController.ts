import { BaseController } from "./BaseController";

export class MainController extends BaseController{
    public createView():HTMLDivElement{
        

        const title = this.createElement("h2","Welcome our Main Page!");
        const article = this.createElement("div", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ullamcorper porttitor arcu, nec viverra nisi ullamcorper sed. Ut ut ipsum sed turpis scelerisque ornare vel vitae velit. Nulla pharetra ligula eu urna facilisis auctor. Duis semper velit turpis, ac tempor eros lobortis a. Nunc tincidunt et turpis ornare pulvinar. Nunc ut sodales risus, a molestie eros. Ut vehicula lectus eu pretium convallis. ");
        const button = this.createElement("button","login");

        this.container.append(title, article, button);

        return this.container;
    }
}