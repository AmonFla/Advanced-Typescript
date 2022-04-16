export class LoginController{
    public createView():HTMLDivElement{
        const container = document.createElement("div");

        const title = document.createElement('h2')
        title.innerText = "Login Page!"

        const labelUsername = document.createElement("label");
        labelUsername.innerText = "Username"

        const inputUsername = document.createElement("input");

        const labelPassword = document.createElement("label");
        labelPassword.innerText = "Password"

        const inputPassword = document.createElement("input");
        inputPassword.type = 'Password';

        const button = document.createElement("button");
        button.innerText = "login";
        
        const breakElement1 = document.createElement("br");
        const breakElement2 = document.createElement("br");

        container.append(
            title,
            labelUsername,
            inputUsername,
            breakElement1,
            labelPassword,
            inputPassword, 
            breakElement2,
            button)

        return container;
    }
}