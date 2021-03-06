import { createServer, IncomingMessage, ServerResponse} from 'http';
import { Authorizer } from '../Authorization/Authorizer';
import { Monitor } from '../Shared/ObjectCounter';
import { LoginHandler } from './LoginHandler'; 
import { UserHandler } from './UserHandler';
import { Utils } from './Utils';

export class Server{
    private authorizer : Authorizer = new Authorizer();
    private loginHandle: LoginHandler = new LoginHandler(this.authorizer); 
    private userHandle: UserHandler = new UserHandler(this.authorizer); 
 
    public createServer(){
        createServer(
            async (req: IncomingMessage, res: ServerResponse) => {
                console.log('got request from: ' + req.url);
                const basePath = Utils.getUrlBasePath(req.url,`http://${req.headers.host}`)
                this.addCorsHeader(res);
                switch(basePath){
                    case 'systeminfo':
                        res.write(Monitor.printInstances())
                        break;
                    case 'login':
                        this.loginHandle.setRequest(req);
                        this.loginHandle.setResponse(res)
                        await this.loginHandle.handlerRequest()
                        break;
                    case 'users':
                        this.userHandle.setRequest(req);
                        this.userHandle.setResponse(res)
                        await this.userHandle.handlerRequest()
                        break;
                    default:
                        break
                }
                res.end();
            }
         ).listen(8080)
         console.log('server started')
    }

    private addCorsHeader(res:ServerResponse){
        res.setHeader('Access-Control-Allow-Origin','*');
        res.setHeader('Access-Control-Allow-Methods','*');
        res.setHeader('Access-Control-Allow-Headers','*');
    }
}

