import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "./login/login.service";

@Injectable()
export class LoggedinGuard implements CanLoad, CanActivate {

constructor(private loginService: LoginService){}

  checkAuthentication(path: string):boolean{
    const loggedin = this.loginService.isLoogedIn();

      if(!loggedin){
        this.loginService.handleLogin(`/${path}`);
      }

    return loggedin;
  }

  canLoad(route: Route): boolean {
    return this.checkAuthentication(route.path);
  }

  canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot):boolean{
    return this.checkAuthentication(activatedRoute.routeConfig.path)
  }

}
