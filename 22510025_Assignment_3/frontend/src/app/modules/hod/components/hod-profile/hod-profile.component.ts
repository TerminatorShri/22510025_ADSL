import { Component, OnInit } from '@angular/core';
import { User } from '../../../../store/types/auth.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../store/selectors/auth.selectors';
import { CommonModule } from '@angular/common';
import { HodActionService } from '../../services/hod-action.service';
import { Department, HodProfileResponse } from './hod-profile.model';

@Component({
  selector: 'app-hod-profile',
  imports: [CommonModule],
  templateUrl: './hod-profile.component.html',
  styleUrl: './hod-profile.component.css',
})
export class HodProfileComponent implements OnInit {
  user$: Observable<User | null>;
  departmentInfo: Department | null = null;

  constructor(
    private store: Store,
    private hodActionServices: HodActionService
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {
    this.user$.subscribe((user) => {
      if (user?.dept_name) {
        this.fetchHodProfile(user.dept_name);
      }
    });
  }

  fetchHodProfile(dept_name: string) {
    this.hodActionServices.getHodProfile(dept_name).subscribe({
      next: (response: HodProfileResponse) => {
        console.log(
          '🚀 ~ HodProfileComponent ~ this.hodActionServices.getHodProfile ~ response:',
          response
        );
        this.departmentInfo = response.data;
      },
      error: (err) => {
        console.error('Error fetching HOD info:', err);
      },
    });
  }
}
