import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { LessonDetail } from "../../model/lesson-detail";
import { Observable } from "rxjs";
import { CoursesService } from "../../services/courses.service";

@Injectable({
  providedIn: "root",
})
export class LessonDetailsResolver implements Resolve<LessonDetail> {
  constructor(private coursesService: CoursesService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<LessonDetail> {
    // const CourseUrl = route.parent.paramMap.get("courseUrl"),
    const CourseUrl = route.paramMap.get("courseUrl"),
      lessonSeqNo = route.paramMap.get("lessonSeqNo");

    return this.coursesService.loadLessonDetail(CourseUrl, lessonSeqNo);
  }
}
