import { LoginService } from '../services/LoginService';
import { BaseController } from './BaseController';
import { LinkTextValue } from './Decorators';

export class LoginController extends BaseController {

  private loginService = new LoginService();

  private title = this.createElement('h2', 'Login Page!');

  private labelUsername = this.createElement('label', 'Username');

  private inputUsername = this.createElement('input');

  private br = this.createElement('br');

  private labelPassword = this.createElement('label', 'Password');

  private inputPassword = this.createElement('input');

  private br2 = this.createElement('br');
    
  @LinkTextValue('errorLabel')
  private errorLabelText = '';

  private loginButton = this.createElement('button', 'login', async ()=>{
    if (this.inputUsername.value && this.inputPassword.value) {
      this.errorLabelText = '';
      const result = await this.loginService.login(
        this.inputUsername.value, 
        this.inputPassword.value,
      );
      if (result) {
        this.router.switchToDashboardView(result);
      } else {
        this.errorLabelText = 'Wrong credentials';
      }
    } else {
      this.errorLabelText = 'Please fill both fields!';
    }
  });

  private labelError = this.createElement('label');

  public createView():HTMLDivElement { 

    this.labelError.id = 'errorLabel';
    this.labelError.style.color = 'red';
    this.inputPassword.type = 'Password';

    return this.container;
  }
 
}