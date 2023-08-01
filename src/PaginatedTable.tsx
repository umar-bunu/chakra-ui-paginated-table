import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  Key,
  ReactChild,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { TableType } from "./definitions";
import Pagination from "./Pagination";

/**@description - Renders a chakra table with features such as pagination
 * and dynamic data input.
 * @example <PaginatedTable<Record<string,string> dataSource={[]} columns={[]} rowKey={(record)=>record.id} />
 */
function PaginatedTable<T>({
  dataSource,
  columns,
  rowKey,
  pagination,
  containerProps = {},
  TBodyProps: tBodyProps = {},
  THeadProps: tHeadProps = {},
  TableProps: tableProps = {},
  TrProps: TrProps = {},
  ThProps = {},
}: TableType<T extends Record<string, any> ? T : never>) {
  const [dataToShow, setDataToShow] = useState<T[]>([]);

  useEffect(() => {
    if (pagination) {
      const { page, pageSize } = pagination;
      const upperBoundary = page * pageSize;
      const lowerBoundary = page * pageSize - pageSize;
      setDataToShow(
        pagination
          ? dataSource.filter(
              (_: any, dataKey: number) =>
                dataKey < upperBoundary && dataKey >= lowerBoundary
            )
          : dataSource
      );
    } else {
      setDataToShow(dataSource);
    }
  }, [pagination, dataSource]);

  return (
    <>
      {/* if pagination is defined and the position is set to top, render at top */}
      {pagination &&
        pagination.position &&
        !["bottomLeft", "bottomRight"].includes(pagination.position) && (
          <Pagination paginationData={pagination} />
        )}
      {/* if pagination is defined but position not defined, render at top  */}
      {pagination && !pagination.position && (
        <Pagination paginationData={pagination} />
      )}
      <TableContainer {...containerProps}>
        <Table {...tableProps}>
          <Thead {...tHeadProps}>
            <Tr>
              {columns.map(
                (eachCol: {
                  key: Key | null | undefined;
                  title:
                    | boolean
                    | ReactChild
                    | ReactFragment
                    | ReactPortal
                    | null
                    | undefined;
                }) => (
                  <Th {...ThProps} key={eachCol.key}>
                    {eachCol.title}
                  </Th>
                )
              )}
            </Tr>
          </Thead>
          <Tbody {...tBodyProps}>
            {dataToShow.map((eachRecord: any, recordIndex) => {
              return (
                <Tr
                  key={rowKey(eachRecord as any, recordIndex) as any}
                  {...(typeof TrProps === "function"
                    ? TrProps(eachRecord as any, recordIndex)
                    : TrProps)}
                >
                  {columns.map((eachCol, colIndex: number) => {
                    const tdValue =
                      eachCol.dataKey && eachRecord[eachCol.dataKey];
                    const cellRender =
                      typeof eachCol["dataKey"] != "undefined"
                        ? eachCol.render?.(tdValue, eachRecord, recordIndex)
                        : eachCol.render?.(eachRecord, recordIndex as any);
                    return (
                      <Td
                        key={colIndex}
                        onClick={() =>
                          eachCol.onClick?.(eachRecord, recordIndex)
                        }
                      >
                        {cellRender ??
                          (typeof tdValue === "object" ? "[Object]" : tdValue)}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      {pagination &&
        pagination.position &&
        ["bottomRight", "bottomLeft"].includes(pagination.position) && (
          <Pagination paginationData={pagination} />
        )}
    </>
  );
}

export default PaginatedTable;
