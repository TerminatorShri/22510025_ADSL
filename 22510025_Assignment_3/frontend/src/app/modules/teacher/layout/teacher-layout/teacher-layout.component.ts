import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher-layout',
  imports: [RouterModule],
  templateUrl: './teacher-layout.component.html',
  styleUrl: './teacher-layout.component.css',
})
export class TeacherLayoutComponent {
  constructor(private router: Router) {}

  navigateTeacher(route: string | undefined) {
    this.router.navigate([`/teacher/${route}`]);
  }
}
