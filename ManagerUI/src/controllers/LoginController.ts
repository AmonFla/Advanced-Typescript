import { BaseController } from "./BaseController";

export class LoginController extends BaseController{
    public createView():HTMLDivElement{ 

        const title = this.createElement('h2',"Login Page!")

        const labelUsername = this.createElement("label","Username");
        const inputUsername = this.createElement("input");

        const labelPassword = this.createElement("label", "Password");
        const inputPassword = this.createElement("input");
        inputPassword.type = 'Password';

        const button = this.createElement("button","login");
        
        const breakElement1 = this.createElement("br");
        const breakElement2 = this.createElement("br");

        this.container.append(
            title,
            labelUsername,
            inputUsername,
            breakElement1,
            labelPassword,
            inputPassword, 
            breakElement2,
            button)

        return this.container;
    }
}