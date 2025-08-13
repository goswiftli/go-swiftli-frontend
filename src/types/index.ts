export interface GenericResponse {
  code: number;
  message: string;
  dateTime: string;
  status: number;
}
export interface ApiResponse<TData> extends GenericResponse {
  data: TData;
}
export interface PaginatedResponse<T> extends GenericResponse {
  data: T;
}
type Sort = {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
};
type PageAble = {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};
export interface Paginate<T> {
  pageAble: PageAble;
  totalPages: number;
  totalElements: number;
  last: boolean;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
  empty: boolean;
  content: T[];
}

export type PaymentRequestDTO = {
  amount: number;
  currencyCode: string;
  narration: string;
  email: string;
};

export type PaymentResponseDTO = {
  authorizationUrl: string;
  accessCode: string;
  reference: string;
  status: string;
};
