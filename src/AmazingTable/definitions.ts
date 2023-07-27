import { TableContainerProps, ThemingProps } from "@chakra-ui/react";

export interface TAmazingCol<TRecord> {
  title: React.ReactNode;
  dataIndex?: keyof TRecord | undefined;
  key: string | number;
  render?: (
    value: NonNullable<this["dataIndex"]>,
    record: TRecord,
    index?: number
  ) => React.ReactNode;
  align?: "left" | "right" | "center";
  onClick?: (record: TRecord, index: number) => any;
}

type InferArrayElementType<T> = T extends Array<infer U> ? U : never;

export interface ITablePagination {
  /**The current page to show records for */
  page: number;
  /**The total number of el */
  total: number;
  /**Number of records to show on each page */
  pageSize: number;
  /**
   *Callback for when the page is changed... exposes the currentPage and no_of_rows in that page
   * @type {(currentPage: number, pageSize: number) => void}
   */
  onchange?: (newPage: number, pageSize: number) => any;
  /**Where to position the pagination
   * @default- topRight
   */
  position?: "topLeft" | "topRight" | "bottomRight" | "bottomLeft";
}
export interface IAmazingProps {
  /**The columns to show on the table */
  columns: TAmazingCol<InferArrayElementType<IAmazingProps["dataSource"]>>[];
  /**The data to show in the table records */
  dataSource: any[];
  rowKey: (record: any) => string;
  colorScheme?: ThemingProps<"Table">["colorScheme"];
  /**Styles to apply to the table container */
  tableStyles?: TableContainerProps;
  /**The table pagination. If false, does not pagination and hence, shows all the data in one page*/
  pagination?: ITablePagination | false;
}
