import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { LessonDetail } from "../model/lesson-detail";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { CoursesService } from "../services/courses.service";

@Component({
  selector: "lesson",
  templateUrl: "./lesson-detail.component.html",
  styleUrls: ["./lesson-detail.component.css"],
})
export class LessonDetailComponent implements OnInit {
  lesson$: Observable<LessonDetail>;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.lesson$ = this.route.data.pipe(map((data) => data["lesson"]));
    // this.lesson$ = of(this.route.snapshot.data["lesson"]);
  }

  prevLesson(lesson: LessonDetail) {
    // http://localhost:4200/courses/angular-router-course/lessons/1
    this.router.navigate(["lessons", lesson.seqNo - 1], {
      relativeTo: this.route.parent,
    });
  }
  nextLesson(lesson: LessonDetail) {
    // http://localhost:4200/courses/angular-router-course/lessons/1
    this.router.navigate(["lessons", lesson.seqNo + 1], {
      relativeTo: this.route.parent,
    });
  }
}
