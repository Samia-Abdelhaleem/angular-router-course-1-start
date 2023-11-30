import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { LessonSummary } from "../../model/lesson-summary";
import { CoursesService } from "../../services/courses.service";

@Injectable({
  providedIn: "root",
})
export class LessonsResolver implements Resolve<LessonSummary[]> {
  constructor(private coursesService: CoursesService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const courseUrl = route.paramMap.get("courseUrl");
    return this.coursesService.loadAllCourseLessonsSummary(courseUrl);
  }
}
