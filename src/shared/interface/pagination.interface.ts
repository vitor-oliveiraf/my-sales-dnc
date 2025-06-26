export interface IPagination<DataType> {
  per_page: number;
  current_page: number;
  total: number;
  total_pages: number;
  next_page: number | null;
  previous_page: number | null;
  data: DataType[];
}
