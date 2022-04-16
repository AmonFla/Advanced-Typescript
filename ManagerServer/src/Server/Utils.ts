import {URL} from 'url';

export class Utils{
    
    public static getUrlBasePath(url: string | undefined, base:string ):string{
        if(url){
            const parseUrl = new URL(url,base); 
            const algo = parseUrl.pathname!.split('/');
            return parseUrl.pathname!.split('/')[1];
        }
        return ''
        
    }

    public static getUrlParameters(url: string | undefined, base:string ): URL | undefined{
        if(url){
            return new URL(url,base);            
        }
        return undefined
        
    }
}