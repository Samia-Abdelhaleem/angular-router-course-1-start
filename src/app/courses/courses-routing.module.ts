import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CourseComponent } from "./course/course.component";
import { HomeComponent } from "./home/home.component";
import { CourseResolverService } from "./resolvers/course/course-resolver.service";
import { LessonsListComponent } from "./lessons-list/lessons-list.component";
import { LessonsResolver } from "./resolvers/lesson/lessons.resolver";
import { LessonDetailsResolver } from "./resolvers/lesson-details/lessonDetails.resolver";
import { LessonDetailComponent } from "./lesson/lesson-detail.component";
import { AuthGuard } from "../guards/auth.guard";
import { ExitGuard } from "../guards/exit.guard";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: ":courseUrl",
    component: CourseComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canDeactivate: [ExitGuard],
    children: [
      {
        path: "",
        component: LessonsListComponent,
        resolve: {
          lessons: LessonsResolver,
        },
      },
      {
        path: "lessons/:lessonSeqNo",
        component: LessonDetailComponent,
        resolve: {
          lesson: LessonDetailsResolver,
        },
      },
    ],

    resolve: {
      course: CourseResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CourseResolverService,
    LessonsResolver,
    LessonDetailsResolver,
    AuthGuard,
    ExitGuard,
  ],
})
export class CoursesRoutingModule {}
