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

  selectedRowForUpdate: any = null;
  operationMessage: string = '';

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
    this.loadTableColumns();
    this.loadTableData();
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
            this.operationMessage = 'Record created successfully';
          },
          error: (err) => {
            console.error('Error creating record', err);
            this.operationMessage = 'Failed to create record';
          },
        });
    }
  }

  updateRecord() {
    if (this.crudForm.valid && this.selectedTable) {
      const primaryKey = this.crudForm.get('id')?.value;
      if (!primaryKey) {
        this.operationMessage = 'ID is required for update';
        return;
      }

      console.log('Updating record', this.crudForm.value);

      this.tableService
        .updateRecord(this.selectedTable, primaryKey, this.crudForm.value)
        .subscribe({
          next: () => {
            this.loadTableData();
            this.crudForm.reset();
            this.operationMessage = 'Record updated successfully';
          },
          error: (err) => {
            console.error('Error updating record', err);
            this.operationMessage = 'Failed to update record';
          },
        });
    }
  }

  deleteRecord() {
    if (this.selectedTable) {
      const primaryKey = this.crudForm.get('id')?.value;
      if (!primaryKey) {
        this.operationMessage = 'ID is required for deletion';
        return;
      }

      this.tableService.deleteRecord(this.selectedTable, primaryKey).subscribe({
        next: () => {
          this.loadTableData();
          this.crudForm.reset();
          this.operationMessage = 'Record deleted successfully';
        },
        error: (err) => {
          console.error('Error deleting record', err);
          this.operationMessage = 'Failed to delete record';
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
