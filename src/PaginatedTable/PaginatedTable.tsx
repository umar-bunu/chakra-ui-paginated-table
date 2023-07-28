import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import Pagination from "./Pagination";
import { PaginatedTableProps } from "./definitions";

function PaginatedTable({
  dataSource,
  columns,
  rowKey,
  pagination,
  containerProps = {},
  tBodyProps = {},
  tHeadProps = {},
  tableProps = {},
  trProps = {},
}: PaginatedTableProps) {
  const [dataToShow, setDataToShow] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    if (pagination) {
      const { page, pageSize } = pagination;
      const upperBoundary = page * pageSize;
      const lowerBoundary = page * pageSize - pageSize;
      setDataToShow(
        pagination
          ? dataSource.filter(
              (_, dataIndex) =>
                dataIndex < upperBoundary && dataIndex >= lowerBoundary
            )
          : dataSource
      );
    } else {
      setDataToShow(dataSource);
    }
  }, [pagination]);

  return (
    <>
      {pagination && <Pagination paginationData={pagination} />}
      <TableContainer {...containerProps}>
        <Table {...tableProps}>
          <Thead {...tHeadProps}>
            <Tr>
              {columns.map((eachCol) => (
                <Th key={eachCol.key}>{eachCol.title}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody {...tBodyProps}>
            {dataToShow.map((eachRecord, recordIndex) => {
              return (
                <Tr
                  key={rowKey(eachRecord)}
                  {...(typeof trProps === "function"
                    ? trProps(eachRecord, recordIndex)
                    : trProps)}
                >
                  {columns.map((eachCol, colIndex) => {
                    const tdValue =
                      eachCol.dataIndex && eachRecord[eachCol.dataIndex];

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

export default memo(PaginatedTable);
