import { AccessRight, SessionToken } from '../models/AuthenticationModel';
import { User } from '../models/DataModel';
import { DataService } from '../services/DataService';
import { BaseController } from './BaseController';

export class DashboardController extends BaseController {

  private dataService:DataService = new DataService();

  private sessionToken:SessionToken | undefined;

  private searchArea:HTMLInputElement | undefined;

  private searchResultArea:HTMLDivElement | undefined;

  private selectedUser: User | undefined;

  private selectedLabel: HTMLLabelElement | undefined;

  public setSessionToken(sessionToken: SessionToken) {
    this.sessionToken = sessionToken;
  }

  public createView(): HTMLDivElement {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const title = this.createElement('h2', 'Dashboard Controller');
    if (this.sessionToken) {
      this.createElement('label', 
        `welcome ${this.sessionToken.username}`);
      this.insertBreak();
      this.generateButtons();
    } else {
      this.createElement('label',
        'you don\'t have access rights');
    }
    return this.container;  
  }

  private generateButtons() {
    if (this.sessionToken) {
      for (const access of this.sessionToken.accessRight) {
        this.createElement('button', AccessRight[access], async ()=>{ 
          this.triggerAction(access);
        });
      }
    }

    if (this.sessionToken?.accessRight.includes(AccessRight.READ)) {
      this.insertBreak();
      this.createElement('label', 'Search');
      this.searchArea = this.createElement('input');
      this.searchResultArea = this.createElement('div');
    }
  }

  private async triggerAction(access: AccessRight) {
    switch (access) {
      case AccessRight.READ:
        // eslint-disable-next-line no-case-declarations
        const users = await this.dataService.getUsers(
          this.sessionToken!.tokenId,
          this.searchArea!.value);
        for (const user of users) {
          const label = this.createElement('label', JSON.stringify(user));
          label.onclick = ()=>{
            label.classList.toggle('selectedLabel');
            this.selectedUser = user;
            this.selectedLabel = label;
          };
          this.searchResultArea!.append(label);
          this.searchResultArea!.append(
            document.createElement('br'),
          );
        }
        break;
      case AccessRight.DELETE:{
        if (this.selectedUser) {
          await this.dataService.deleteUsers(
            this.sessionToken!.tokenId,
            this.selectedUser,
          );
          this.selectedLabel!.innerHTML = '';
        }
        break;
      }
      default:
        break;
    }

  }
}