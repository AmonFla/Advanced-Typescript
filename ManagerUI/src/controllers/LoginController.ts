import { LoginService } from "../services/LoginService";
import { BaseController } from "./BaseController";

export class LoginController extends BaseController{

    private loginService = new LoginService();

    private title = this.createElement('h2',"Login Page!")
    private labelUsername = this.createElement("label","Username");
    private inputUsername = this.createElement("input");
    private br = this.createElement("br")
    private labelPassword = this.createElement("label", "Password");
    private inputPassword = this.createElement("input");
    private br2 = this.createElement("br")
    private loginButton = this.createElement("button","login", async ()=>{
        if(this.inputUsername.value && this.inputPassword.value){
            this.resetErrorLabel()
            const result = await this.loginService.login(
                this.inputUsername.value, 
                this.inputPassword.value
            );
            if(result){
                this.router.switchToDashboardView(result);
            }else{
                this.shoeErrorLabel("Wrong credentials")
            }
        }else{
            this.shoeErrorLabel("Please fill both fields!");
        }
    });
    private br3 = this.createElement("br")
    private labelError = this.createElement("label");

    private resetErrorLabel(){
        this.labelError.style.color = 'red';
        this.labelError.style.visibility = 'hidden'; 
    }

    private shoeErrorLabel(message: string){
        this.labelError.innerText = message;
        this.labelError.style.visibility = 'visible';
    }

    public createView():HTMLDivElement{ 

        this.resetErrorLabel();
        this.inputPassword.type = 'Password';

        return this.container;
    }
 
}