import { Router } from './Router';

export class Main {

  private router:Router = new Router();

  public constructor() {
    console.log('Constructor new Instance of the program');
  }

  public launchApp() {
    this.router.handleRequest();
  }   
}

new Main().launchApp();