export interface ApiResponse<T> {
  statuscode: number;
  data: T;
  message: string;
  success: boolean;
}

export type CollectionListResponse = ApiResponse<string[]>;

export interface SampleDocument {
  sample: Record<string, any>;
  predefinedFields: string[];
  customFields: string[];
}

export type SampleDocumentResponse = ApiResponse<SampleDocument>;

export type CollectionDocumentsResponse = ApiResponse<any[]>;
