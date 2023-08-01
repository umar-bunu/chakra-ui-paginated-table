import {
  ButtonProps,
  FlexProps,
  TableBodyProps,
  TableColumnHeaderProps,
  TableContainerProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
} from "@chakra-ui/react";
import React from "react";

export type ColType<TRecord> = {
  /**@required -  The title of the column. Rendered as a THead */
  title: React.ReactNode;

  /**@required - The column key */
  key: string | number;

  /**@optional - how to render the data.
   * Please do pass it when the value of Record[dataKey] is an object or array
   */

  /**@optional - How to align the data in the table cell throughtout the column */
  align?: "left" | "right" | "center";
  onClick?: (record: TRecord, index: number) => any;
} & (IHadDataKey<TRecord> | INoDataKey<TRecord>);

interface IHadDataKey<TRecord> {
  /**@optional which key of the record to get the data from*/
  dataKey: keyof TRecord;
  /**
   * @optional - What should be rendered in each Table cell
   * @warning - When Record[dataKey] is an object or array, do pass the render
   * Method else it [Object shall be rendered]
   */
  render?: (
    value: TRecord[keyof TRecord],
    record: TRecord,
    index?: number
  ) => React.ReactNode;
}

interface INoDataKey<TRecord> {
  /**@required - which key of the record to get the data from*/
  dataKey?: undefined;
  /**
   * @optional - What should be rendered in each Table cell
   * @warning - When Record[dataKey] is an object or array,
   *
   * do pass the render Method else your app will crash
   */
  render?: (record: TRecord, index?: number) => React.ReactNode;
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

  /**
   * @optional - The table pagination. If false, does not pagination and hence, shows all the data in one page
   * @warning - It only manages what to show at which page,
   * the pagination state must be managed from the parent component calling this.
   * @example const [pageNumber, setPageNumber] = useState(1)
   *  const pagination = {
   *  page: pageNumber,
        pageSize: 1,
        total: dataSource.length,
        onchange: newPage => setPageNumber(newPage)
      }
   *  <PaginatedTable<Record<string,string>> pagination={pagination}  dataSource={[dataSource]} columns={[]}/>
   */
  pagination?: ITablePagination | false;

  /**@optional - props that could be passed to the table container */
  containerProps?: TableContainerProps;

  /**@optional - props that could be passed to the Table */
  TableProps?: TableProps;

  /**@optional - props that could be passed to the TableHead */
  THeadProps?: TableHeadProps;

  /**@optional - props that could be passed to the TableBody */
  TBodyProps?: TableBodyProps;

  /**
   * @optional  props that could be passed to each Tr
   * If used as a function, exposes the record and its index as a param
   */
  TrProps?: TableRowProps | IRecordProps<TableRowProps, T>;
  /**ThProps */
  /**
   * @optional  props that could be passed to each Tr
   * If used as a function, exposes the record and its index as a param
   */
  ThProps?: TableColumnHeaderProps;
  /**ThProps */
}

type IRecordProps<TWhichProp, TRecord> = (
  record: TRecord,
  recordIndex: number
) => TWhichProp;
