import { NgModule } from "@angular/core";
import {
  Routes,
  RouterModule,
  PreloadAllModules,
  UrlSerializer,
  NoPreloading,
} from "@angular/router";
import { AboutComponent } from "./about/about.component";

import { LoginComponent } from "./login/login.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CanLoadGuard } from "./guards/can-load.guard";
import { CustomPreloadStrategy } from "./services/custom-preload-strategy";
import { ChatComponent } from "./chat/chat.component";

const routes: Routes = [
  // root route
  { path: "", redirectTo: "/courses", pathMatch: "full" },
  {
    path: "courses",
    // canLoad: [CanLoadGuard],
    loadChildren: () =>
      import("../app/courses/courses.module").then((m) => m.CoursesModule),
    data: {
      preload: true,
    },
  },
  { path: "about", component: AboutComponent },
  { path: "login", component: LoginComponent },
  { path: "help-chat", component: ChatComponent },
  // { path: "help-chat", component: ChatComponent, outlet: "chat" },
  // wild cart
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadStrategy,
      enableTracing: false,
      useHash: true,
      scrollPositionRestoration: "enabled",
      paramsInheritanceStrategy: "always",
      relativeLinkResolution: "corrected",
      malformedUriErrorHandler: (
        error: URIError,
        urlSerializer: UrlSerializer,
        url: string
      ) => urlSerializer.parse("/page-not-found"),
    }),
  ],
  exports: [RouterModule],
  providers: [CanLoadGuard, CustomPreloadStrategy],
})
export class AppRoutingModule {}
