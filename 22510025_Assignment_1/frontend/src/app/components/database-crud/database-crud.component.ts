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
  isAutoIncrement: boolean = false;

  constructor(
    private tableService: TableService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loadTables();
  }

  loadTables() {
    this.tableService.getTables().subscribe({
      next: (tables) => (this.availableTables = tables),
      error: () => (this.operationMessage = 'Failed to load tables'),
    });
  }

  onTableSelect() {
    this.selectedTable = this.tableControl.value;
    if (this.selectedTable) {
      this.loadPrimaryKey();
      this.loadTableColumns();
      this.loadTableData();
    }
  }

  loadPrimaryKey() {
    if (this.selectedTable) {
      this.tableService.getPrimaryKey(this.selectedTable).subscribe({
        next: (response) => {
          if (response.primaryKeyInfo?.length) {
            const keyInfo = response.primaryKeyInfo[0];
            this.primaryKey = keyInfo.columnName;
            this.isAutoIncrement = keyInfo.isAutoIncrement;
          } else {
            this.operationMessage =
              'No primary key found for the selected table';
          }
        },
        error: () => (this.operationMessage = 'Failed to fetch primary key'),
      });
    }
  }

  loadTableColumns() {
    if (this.selectedTable) {
      this.tableService.getTableColumns(this.selectedTable).subscribe({
        next: (columns) => {
          this.tableColumns = columns;
          this.initForm(columns);
        },
        error: () => (this.operationMessage = 'Failed to load table columns'),
      });
    }
  }

  initForm(columns: string[]) {
    const formConfig: { [key: string]: any[] } = {};
    columns.forEach((col) => {
      formConfig[col] = [
        {
          value: '',
          disabled: col === this.primaryKey && this.isAutoIncrement,
        },
        Validators.required,
      ];
    });
    this.crudForm = this.formBuilder.group(formConfig);
  }

  loadTableData() {
    if (this.selectedTable) {
      this.tableService.getData(this.selectedTable).subscribe({
        next: (data) => (this.tableData = data),
        error: () => (this.operationMessage = 'Failed to load table data'),
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
            Swal.fire('Success', 'Record added successfully!', 'success');
          },
          error: () => Swal.fire('Error', 'Failed to add record', 'error'),
        });
    }
  }

  setUpdateAction() {
    this.isUpdateAction = true;
    if (this.primaryKey) {
      this.crudForm.get(this.primaryKey)?.disable();
    }
  }

  updateRecord() {
    if (this.crudForm.valid && this.selectedTable && this.primaryKey) {
      const primaryKeyValue = this.selectedRowForUpdate[this.primaryKey];
      this.tableService
        .updateRecord(
          this.selectedTable,
          this.primaryKey,
          primaryKeyValue,
          this.crudForm.getRawValue()
        )
        .subscribe({
          next: () => {
            this.loadTableData();
            this.crudForm.reset();
            this.isUpdateAction = false;
            Swal.fire('Success', 'Record updated successfully!', 'success');
          },
          error: () => Swal.fire('Error', 'Failed to update record', 'error'),
        });
    }
  }

  deleteRecord(row: any) {
    if (this.selectedTable && this.primaryKey) {
      const primaryKeyValue = row[this.primaryKey];
      this.tableService
        .deleteRecord(this.selectedTable, this.primaryKey, primaryKeyValue)
        .subscribe({
          next: () => {
            this.loadTableData();
            Swal.fire('Success', 'Record deleted successfully!', 'success');
          },
          error: () => Swal.fire('Error', 'Failed to delete record', 'error'),
        });
    }
  }

  populateFormWithRow(row: any) {
    if (this.crudForm) {
      Object.keys(row).forEach((key) => {
        this.crudForm.get(key)?.setValue(row[key]);
      });
      this.selectedRowForUpdate = row;
      this.setUpdateAction();
    }
  }

  getInputType(column: string): string {
    // Example: Customize input types based on column name
    if (column.toLowerCase().includes('date')) return 'date';
    if (column.toLowerCase().includes('email')) return 'email';
    if (column.toLowerCase().includes('password')) return 'password';
    return 'text';
  }
}
