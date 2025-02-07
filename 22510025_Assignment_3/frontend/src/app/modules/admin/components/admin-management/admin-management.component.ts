import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../store/selectors/auth.selectors';
import { AdminActionService } from '../../services/admin-action.service';
import Swal from 'sweetalert2';
import {
  AdminActionResponse,
  NewBuildingRoom,
  NewDepartment,
} from './admin-management.model';

@Component({
  selector: 'app-admin-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-management.component.html',
  styleUrl: './admin-management.component.css',
})
export class AdminManagementComponent implements OnInit {
  user$: Observable<any>;
  addDepartmentForm!: FormGroup;
  addBuildingRoomForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private adminActionService: AdminActionService
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit(): void {
    this.addDepartmentForm = this.formBuilder.group({
      deptName: ['', Validators.required],
      building: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(0)]],
    });

    this.addBuildingRoomForm = this.formBuilder.group({
      building: ['', Validators.required],
      roomNumber: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onAddDepartment(): void {
    if (this.addDepartmentForm.valid) {
      const newDepartment: NewDepartment = this.addDepartmentForm.value;

      this.adminActionService.addDepartment(newDepartment).subscribe({
        next: (response: AdminActionResponse) => {
          Swal.fire('Success', response.message, 'success');
          this.addDepartmentForm.reset();
        },
        error: (error) => {
          Swal.fire('Error', 'Failed to add department', 'error');
        },
      });
    }
  }

  onAddBuildingRoom(): void {
    if (this.addBuildingRoomForm.valid) {
      const newBuildingRoom: NewBuildingRoom = this.addBuildingRoomForm.value;

      this.adminActionService.addBuildingAndRoom(newBuildingRoom).subscribe({
        next: (response: AdminActionResponse) => {
          Swal.fire('Success', response.message, 'success');
          this.addBuildingRoomForm.reset();
        },
        error: (error) => {
          Swal.fire('Error', 'Failed to add building and room', 'error');
        },
      });
    }
  }
}
