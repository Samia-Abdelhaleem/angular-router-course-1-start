import { Component, OnInit } from "@angular/core";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { Observable } from "rxjs";
import { CoursesService } from "../services/courses.service";
import { map } from "rxjs/operators";
import { LoadingService } from "../../shared/loading/loading.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private courses: CoursesService,
    private loading: LoadingService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.reloadCourses();
    this.loadAllCourses();
  }
  loadAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>("/api/courses").pipe(
      map((res) => {
        return res;
      })
    );
  }

  reloadCourses() {
    const courses$ = this.courses.loadAllCourses();

    this.beginnerCourses$ = this.filterByCategory(courses$, "BEGINNER");

    this.advancedCourses$ = this.filterByCategory(courses$, "ADVANCED");
  }

  filterByCategory(courses$: Observable<Course[]>, category: string) {
    return this.loading
      .showLoaderUntilCompleted(courses$)
      .pipe(
        map((courses) =>
          courses
            .filter((course) => course.category == category)
            .sort(sortCoursesBySeqNo)
        )
      );
  }
}
