import { Component } from '@angular/core';
import { User } from '../../../../store/types/auth.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../store/selectors/auth.selectors';
import { CommonModule } from '@angular/common';
import { HodActionService } from '../../services/hod-action.service';
import { Course, HodRecordsResponse } from './hod-records.model';

@Component({
  selector: 'app-hod-records',
  imports: [CommonModule],
  templateUrl: './hod-records.component.html',
  styleUrl: './hod-records.component.css',
})
export class HodRecordsComponent {
  user$: Observable<User | null>;
  courses: Course[] | null = [];

  constructor(
    private store: Store,
    private hodActionService: HodActionService
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {
    this.user$.subscribe((user) => {
      if (user?.dept_name) {
        this.fetchHodRecords(user.dept_name);
      }
    });
  }

  fetchHodRecords(dept_name: string) {
    this.hodActionService.getHodRecords(dept_name).subscribe({
      next: (response: HodRecordsResponse) => {
        console.log(
          '🚀 ~ HodRecordsComponent ~ this.hodActionService.getHodRecords ~ response:',
          response
        );
        this.courses = response.data;
      },
      error: (err) => {
        console.error('Error fetching hod courses:', err);
      },
    });
  }
}
