import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthStore } from "../services/auth.store";
import { first, map } from "rxjs/operators";

@Injectable()
export class CanLoadGuard implements CanLoad {
  constructor(private auth: AuthStore, private router: Router) {}
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
    return this.auth.isLoggedIn$.pipe(
      first(),
      map((loggedIn) => (loggedIn ? true : this.router.parseUrl("/login")))
    );
  }
}
