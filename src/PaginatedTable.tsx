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
  tHeadProps = {},
  tableProps = {},
  trProps = {},
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
      {pagination &&
        pagination.position &&
        !["bottomLeft", "bottomRight"].includes(pagination.position) && (
          <Pagination paginationData={pagination} />
        )}

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
                  <Th key={eachCol.key}>{eachCol.title}</Th>
                )
              )}
            </Tr>
          </Thead>
          <Tbody {...tBodyProps}>
            {dataToShow.map((eachRecord: any, recordIndex) => {
              return (
                <Tr
                  key={rowKey(eachRecord as any, recordIndex) as any}
                  {...(typeof trProps === "function"
                    ? trProps(eachRecord as any, recordIndex)
                    : trProps)}
                >
                  {columns.map((eachCol, colIndex: number) => {
                    const tdValue =
                      eachCol.dataKey && eachRecord[eachCol.dataKey];

                    return (
                      <Td
                        key={colIndex}
                        onClick={() =>
                          eachCol.onClick?.(eachRecord, recordIndex)
                        }
                      >
                        {eachCol.render?.(tdValue, eachRecord, recordIndex) ??
                          tdValue}
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
