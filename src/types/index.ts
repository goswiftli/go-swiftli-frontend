export interface GenericResponse {
  code: number;
  message: string;
  dateTime: string;
  status: number;
}
export interface ApiResponse<TData> extends GenericResponse {
  data: TData;
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
  data: {
    content: T[];
  };
}
