import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { DatabaseService } from '../../services/database-service.service';
import { CollectionDocumentsResponse } from '../../types/database.response';
import { CollectionListResponse } from '../../types/database.response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-collection-crud',
  templateUrl: './database-crud.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class DatabaseCrudComponent implements OnInit {
  availableCollections: string[] = [];
  selectedCollection: string | null = null;
  collectionData: any[] = [];
  jsonInput: string = '';
  isUpdateAction: boolean = false;
  selectedRowForUpdate: any = null;

  collectionControl = new FormControl('');

  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
    this.loadCollections();
  }

  loadCollections() {
    this.databaseService.getCollections().subscribe({
      next: (response: CollectionListResponse) => {
        this.availableCollections = response.data;
      },
      error: () => Swal.fire('Error', 'Failed to load collections', 'error'),
    });
  }

  onCollectionSelect() {
    this.selectedCollection = this.collectionControl.value;
    if (this.selectedCollection) {
      this.loadCollectionData();
    }
  }

  loadCollectionData() {
    if (this.selectedCollection) {
      this.databaseService.getDocuments(this.selectedCollection).subscribe({
        next: (response: CollectionDocumentsResponse) => {
          this.collectionData = response.data;
        },
        error: () =>
          Swal.fire('Error', 'Failed to load collection data', 'error'),
      });
    }
  }

  onSubmit() {
    if (this.isValidJson(this.jsonInput) && this.selectedCollection) {
      const data = JSON.parse(this.jsonInput);

      if (this.isUpdateAction && this.selectedRowForUpdate) {
        this.databaseService
          .updateDocument(
            this.selectedCollection,
            this.selectedRowForUpdate._id,
            data
          )
          .subscribe({
            next: () => {
              this.loadCollectionData();
              this.jsonInput = '';
              this.isUpdateAction = false;
              Swal.fire('Success', 'Document updated successfully!', 'success');
            },
            error: () =>
              Swal.fire('Error', 'Failed to update document', 'error'),
          });
      } else {
        this.databaseService
          .createDocument(this.selectedCollection, data)
          .subscribe({
            next: () => {
              this.loadCollectionData();
              this.jsonInput = '';
              Swal.fire('Success', 'Document added successfully!', 'success');
            },
            error: () => Swal.fire('Error', 'Failed to add document', 'error'),
          });
      }
    }
  }

  deleteDocument(doc: any) {
    if (this.selectedCollection) {
      this.databaseService
        .deleteDocument(this.selectedCollection, doc._id)
        .subscribe({
          next: () => {
            this.loadCollectionData();
            Swal.fire('Success', 'Document deleted successfully!', 'success');
          },
          error: () => Swal.fire('Error', 'Failed to delete document', 'error'),
        });
    }
  }

  populateFormWithRow(doc: any) {
    this.jsonInput = JSON.stringify(doc, null, 2);
    this.selectedRowForUpdate = doc;
    this.isUpdateAction = true;
  }

  isValidJson(json: string): boolean {
    try {
      JSON.parse(json);
      return true;
    } catch {
      return false;
    }
  }

  removeIdField(doc: any) {
    const { _id, __v, ...rest } = doc;
    return rest;
  }
}
