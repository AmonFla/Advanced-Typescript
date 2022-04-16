import { createServer, IncomingMessage, ServerResponse} from 'http';
import { Authorizer } from '../Authorization/Authorizer';
import { LoginHandler } from './LoginHandler'; 
import { UserHandler } from './UserHandler';
import { Utils } from './Utils';

export class Server{
    private authorizer : Authorizer = new Authorizer();
 
    public createServer(){
        createServer(
            async (req: IncomingMessage, res: ServerResponse) => {
                console.log('got request from: ' + req.url);
                const basePath = Utils.getUrlBasePath(req.url,`http://${req.headers.host}`)
                this.addCorsHeader(res);
                switch(basePath){
                    case 'login':
                        await new LoginHandler(req, res, this.authorizer).handlerRequest()
                        break;
                    case 'users':
                        await new UserHandler(req,res,this.authorizer).handlerRequest();
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
        res.setHeader('Access-Control-Allow-Headers','*');
    }
}

