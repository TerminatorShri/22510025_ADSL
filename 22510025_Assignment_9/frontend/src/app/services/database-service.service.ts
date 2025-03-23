import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  CollectionDocumentsResponse,
  SampleDocumentResponse,
} from '../types/database.response';
import { CollectionListResponse } from '../types/database.response';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private apiUrl = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) {}

  // 🔍 Fetch all collection names
  getCollections(): Observable<CollectionListResponse> {
    return this.http.get<CollectionListResponse>(`${this.apiUrl}/collections`);
  }

  // 🔍 Fetch all documents from a collection
  getDocuments(
    collectionName: string
  ): Observable<CollectionDocumentsResponse> {
    return this.http.get<CollectionDocumentsResponse>(
      `${this.apiUrl}/collections/${collectionName}`
    );
  }

  // 🔍 Fetch a sample document to determine schema
  getSampleDocument(
    collectionName: string
  ): Observable<SampleDocumentResponse> {
    return this.http.get<SampleDocumentResponse>(
      `${this.apiUrl}/collections/${collectionName}/sample`
    );
  }

  // ➕ Create a new document in a collection
  createDocument(collectionName: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/collections/${collectionName}`, data);
  }

  // 🔄 Update a document dynamically using `_id`
  updateDocument(
    collectionName: string,
    id: string,
    data: any
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/collections/${collectionName}/${id}`,
      data
    );
  }

  // ❌ Delete a document using `_id`
  deleteDocument(collectionName: string, id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/collections/${collectionName}/${id}`
    );
  }
}
