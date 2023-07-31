import {
  ButtonProps,
  FlexProps,
  TableBodyProps,
  TableContainerProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
} from "@chakra-ui/react";

export interface ColType<TRecord> {
  /**@required -  The title of the column. Rendered as a THead */
  title: React.ReactNode;

  /**@required - which key of the record to get the data from*/
  dataKey: keyof TRecord;

  /**@required - The column key */
  key: string | number;

  /**@optional - how to render the data.
   * Please do pass it when the value of Record[dataKey] is an object or array
   */
  render?: (
    value: NonNullable<this["dataKey"]>,
    record: TRecord,
    index?: number
  ) => React.ReactNode;

  /**@optional - How to align the data in the table cell throughtout the column */
  align?: "left" | "right" | "center";

  onClick?: (record: TRecord, index: number) => any;
}

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
export interface TableType<T> {
  /**@required - The columns to show on the table */
  columns: ColType<T>[];

  /**@required - The data to show in the table records */
  dataSource: T[];

  /**
   * @required - The key to pass for each record.
   * @param rowIndex- the current index of the row
   * @type {(record: T, rowIndex: number) => NonNullable<keyof T>}
   */
  rowKey: (record: T, rowIndex: number) => NonNullable<T[keyof T]> | number;

  /**@optional - The table pagination. If false, does not pagination and hence, shows all the data in one page*/
  pagination?: ITablePagination | false;

  /**@optional - props that could be passed to the table container */
  containerProps?: TableContainerProps;

  /**@optional - props that could be passed to the Table */
  tableProps?: TableProps;

  /**@optional - props that could be passed to the TableHead */
  tHeadProps?: TableHeadProps;

  /**@optional - props that could be passed to the TableBody */
  TBodyProps?: TableBodyProps;

  /**@optional - props that could be passed to each Tr
   * If used as a function, exposes the record and its index as a param
   */
  trProps?: TableRowProps | IRecordProps<TableRowProps, T>;
}

type IRecordProps<TWhichProp, TRecord> = (
  record: TRecord,
  recordIndex: number
) => TWhichProp;
