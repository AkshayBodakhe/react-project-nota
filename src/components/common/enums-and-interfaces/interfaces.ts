export interface ErrorResponseEntity {
  url: string;
  status: number;
  statusText: string;
  body: {
    date: string;
    code: string;
    message: string;
    data: null;
    path: string;
    requestId: string;
    version: string;
  };
  request: {
    method: string;
    url: string;
    body: {
      email: string;
    };
    mediaType: string;
  };
  name: string;
};
export interface Row {
  [key: string]: string | JSX.Element | number | any;
}
export interface Column {
  id: string;
  label: string | JSX.Element;
  minWidth?: number;
  width?: string;
  displaySort?: boolean;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  render?: (value: any, row: Row, args?: any) => JSX.Element;
  callbackFun?: (data: any) => void;

}

export interface TableProps {
  columns: Column[];
  tableData: any[];
  isLoading: boolean;
  handleStatusChange?: any;
  handleActionClick?: Function;
  maxHeight?: string;
  navigateToChildren?: any;
  isAdmin?: boolean;
  options?: Array<string>;
  // setEditTaskData?:any;
}

export interface PaginationState {
  page: number;
  size: number;
  sortBy: string;
  sortDirection: string;
  searchString: string;
  status?: boolean;
  state?: string;
  totalPages: number,
  totalElements: number
}
export interface FormPayload {
  endPoint: string;
  payload: Object;
  method: 'POST' | 'PUT';
}

export interface FetchResponseBody {
  content: Array<any>;
  size: number;
  totalPages: number;
  totalElements: number;
  pageable?: {
    pageNumber: number;
    pageSize: number;
  };
}

export interface Pagination {
  page: number,
  size: number,
  sortBy?: string;
  sortDirection?: string;
  searchString?: string;
  status?: boolean;
  totalPages: number,
  totalElements: number,
}