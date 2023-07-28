import {
  ButtonProps,
  FlexProps,
  TableBodyProps,
  TableContainerProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
} from "@chakra-ui/react";

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
  /**Props to pass to the container of the pagination counts */
  containerProps?: FlexProps;
  /**The props to pass to the individual buttons */
  btnProps?: ButtonProps;
  /**the props to pass to the button determining the current page */
  __selectedBtnProps?: ButtonProps;
}
export interface PaginatedTableProps {
  /**The columns to show on the table */
  columns: TAmazingCol<
    InferArrayElementType<PaginatedTableProps["dataSource"]>
  >[];
  /**The data to show in the table records */
  dataSource: Record<string, any>[];
  rowKey: (record: Record<string, any>) => string;
  /**The table pagination. If false, does not pagination and hence, shows all the data in one page*/
  pagination?: ITablePagination | false;
  /**@optional - props that could be passed to the table container */
  containerProps?: TableContainerProps;
  /**@optional - props that could be passed to the Table */
  tableProps?: TableProps;
  /**@optional - props that could be passed to the TableHead */
  tHeadProps?: TableHeadProps;
  /**@optional - props that could be passed to the TableBody */
  tBodyProps?: TableBodyProps;
  /**@optional - props that could be passed to each Tr */
  trProps?: TableRowProps | IRecordProps<TableRowProps>;
}

type IRecordProps<TWhichProp, TRecord = Record<string, any>> = (
  record: TRecord,
  recordIndex: number
) => TWhichProp;
