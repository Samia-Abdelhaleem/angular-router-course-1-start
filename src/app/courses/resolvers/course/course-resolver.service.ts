import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { Course } from "../../model/course";
import { CoursesService } from "../../services/courses.service";

@Injectable({
  providedIn: "root",
})
export class CourseResolverService implements Resolve<Course> {
  constructor(private courses: CoursesService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Course> {
    const courseUrl = route.paramMap.get("courseUrl");
    return this.courses.loadCourseByUrl(courseUrl);
  }
}
