
export class MainController{
    public createView():HTMLDivElement{
        const container = document.createElement("div");

        const title = document.createElement('h2')
        title.innerText = "Welcome our Main Page!"

        const article = document.createElement("div");
        article.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ullamcorper porttitor arcu, nec viverra nisi ullamcorper sed. Ut ut ipsum sed turpis scelerisque ornare vel vitae velit. Nulla pharetra ligula eu urna facilisis auctor. Duis semper velit turpis, ac tempor eros lobortis a. Nunc tincidunt et turpis ornare pulvinar. Nunc ut sodales risus, a molestie eros. Ut vehicula lectus eu pretium convallis. ";

        const button = document.createElement("button");
        button.innerText = "login";

        container.append(title, article, button);

        return container;
    }
}