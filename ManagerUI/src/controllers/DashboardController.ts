import { AccessRight, SessionToken } from "../models/AuthenticationModel";
import { DataService } from "../services/DataService";
import { BaseController } from "./BaseController";

export class DashboardController extends BaseController{

    private sessionToken:SessionToken | undefined;
    private searchArea:HTMLInputElement | undefined;
    private searchResultArea:HTMLDivElement | undefined;
    private dataService:DataService = new DataService();

    public setSessionToken(sessionToken: SessionToken){
        this.sessionToken = sessionToken;
    }

    public createView(): HTMLDivElement {
        const title = this.createElement("h2", "Dashboard Controller")
        if(this.sessionToken){
            this.createElement('label', 
            `welcome ${this.sessionToken.username}`)
            this.insertBreak();
            this.generateButtons();
        }else{
            this.createElement('label',
            'you don\'t have access rights')
        }
        return this.container;  
    }

    private generateButtons(){
        if(this.sessionToken){
            for (const access of this.sessionToken.accessRight){
                this.createElement("button",AccessRight[access], async ()=>{ 
                    this.triggerAction(access);
                });
            }
        }

        if(this.sessionToken?.accessRight.includes(AccessRight.READ)){
            this,this.insertBreak();
            this.createElement("label", "Search");
            this.searchArea = this.createElement("input")
            this.searchResultArea = this.createElement("div")
        }
    }

    private async triggerAction(access: AccessRight){
        switch (access) {
            case AccessRight.READ:
                const users = await this.dataService.getUsers(
                    this.sessionToken!.tokenId,
                    this.searchArea!.value)
                for(const user of users){
                    this.searchResultArea!.append(
                        this.createElement("label", JSON.stringify(user))
                    )
                    this.searchResultArea!.append(
                        document.createElement("br")
                    )
                }
                break;
        
            default:
                break;
        }

    }
}