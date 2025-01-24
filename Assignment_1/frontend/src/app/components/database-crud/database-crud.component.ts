import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { TableService } from '../../services/table.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-database-crud',
  templateUrl: './database-crud.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class DatabaseCrudComponent implements OnInit {
  availableTables: string[] = [];
  selectedTable: string | null = null;
  tableColumns: string[] = [];
  tableData: any[] = [];
  crudForm!: FormGroup;
  tableControl = new FormControl('');
  primaryKey: string | null = null;
  selectedRowForUpdate: any = null;
  operationMessage: string = '';
  isUpdateAction: boolean = false;

  constructor(
    private tableService: TableService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loadTables();
  }

  loadTables() {
    this.tableService.getTables().subscribe({
      next: (tables) => {
        this.availableTables = tables;
        this.operationMessage = '';
      },
      error: (err) => {
        console.error('Error loading tables', err);
        this.operationMessage = 'Failed to load tables';
      },
    });
  }

  onTableSelect() {
    this.selectedTable = this.tableControl.value;
    this.loadPrimaryKey(); // Fetch primary key for the selected table
    this.loadTableColumns();
    this.loadTableData();
  }

  loadPrimaryKey() {
    if (this.selectedTable) {
      this.tableService.getPrimaryKey(this.selectedTable).subscribe({
        next: (response) => {
          console.log(response);
          this.primaryKey = response.primaryKey;
          console.log(this.primaryKey);
          this.operationMessage = '';
        },
        error: (err) => {
          console.error('Error fetching primary key', err);
          this.operationMessage = 'Failed to fetch primary key';
        },
      });
    }
  }

  loadTableColumns() {
    if (this.selectedTable) {
      this.tableService.getTableColumns(this.selectedTable).subscribe({
        next: (columns) => {
          this.tableColumns = columns;
          this.initForm(columns);
          this.operationMessage = '';
        },
        error: (err) => {
          console.error('Error loading columns', err);
          this.operationMessage = 'Failed to load table columns';
        },
      });
    }
  }

  initForm(columns: string[]) {
    const formConfig: { [key: string]: any[] } = {};
    columns.forEach((col) => {
      formConfig[col] = ['', Validators.required];
    });
    this.crudForm = this.formBuilder.group(formConfig);
  }

  loadTableData() {
    if (this.selectedTable) {
      this.tableService.getData(this.selectedTable).subscribe({
        next: (data) => {
          this.tableData = data;
          this.operationMessage = '';
        },
        error: (err) => {
          console.error('Error loading table data', err);
          this.operationMessage = 'Failed to load table data';
        },
      });
    }
  }

  onSubmit() {
    if (this.crudForm.valid && this.selectedTable) {
      this.tableService
        .createRecord(this.selectedTable, this.crudForm.value)
        .subscribe({
          next: () => {
            this.loadTableData();
            this.crudForm.reset();
            Swal.fire({
              title: 'Create Operation',
              text: `New Record Added Successfully to ${this.selectedTable} Table`,
              icon: 'success',
            });
          },
          error: (err) => {
            console.error('Error creating record', err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something Went Wrong While Creating Record!',
            });
          },
        });
    }
  }

  setUpdateAction() {
    this.isUpdateAction = true;
  }

  updateRecord() {
    if (this.crudForm.valid && this.selectedTable && this.primaryKey) {
      const primaryKeyValue = this.crudForm.get(this.primaryKey)?.value;
      if (!primaryKeyValue) {
        this.operationMessage = `${this.primaryKey} is required for update`;
        return;
      }

      this.tableService
        .updateRecord(
          this.selectedTable,
          this.primaryKey,
          primaryKeyValue,
          this.crudForm.value
        )
        .subscribe({
          next: () => {
            this.loadTableData();
            this.crudForm.reset();
            Swal.fire({
              title: 'Update Operation',
              text: `Record Updated Successfully from ${this.selectedTable} Table`,
              icon: 'success',
            });
          },
          error: (err) => {
            console.error('Error updating record', err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something Went Wrong While Updating Record!',
            });
          },
        });
    }
    this.isUpdateAction = false;
  }

  deleteRecord(row: any) {
    if (this.selectedTable && this.primaryKey) {
      const primaryKeyValue = row[this.primaryKey];

      if (!primaryKeyValue) {
        this.operationMessage = 'ID is required for deletion';
        return;
      }

      this.tableService
        .deleteRecord(this.selectedTable, this.primaryKey, primaryKeyValue)
        .subscribe({
          next: () => {
            this.loadTableData();
            Swal.fire({
              title: 'Create Operation',
              text: `Record Deletef Successfully from ${this.selectedTable} Table`,
              icon: 'success',
            });
          },
          error: (err) => {
            console.error('Error deleting record', err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something Went Wrong While Deleting Record!',
            });
          },
        });
    }
  }

  populateFormWithRow(row: any) {
    if (this.crudForm) {
      Object.keys(row).forEach((key) => {
        this.crudForm.get(key)?.setValue(row[key]);
      });
      this.selectedRowForUpdate = row;
    }
  }

  getInputType(column: string): string {
    return 'text';
  }
}
