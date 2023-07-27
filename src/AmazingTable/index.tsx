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
import AmazingPagination from "./Components/Pagination";
import { IAmazingProps } from "./definitions";

function AmazingTable({
  dataSource,
  columns,
  rowKey,
  colorScheme,
  pagination,
}: IAmazingProps) {
  const [dataToShow, setdataToShow] = useState<any[]>([]);

  useEffect(() => {
    if (pagination) {
      const { page, pageSize } = pagination;
      const upperBoundary = page * pageSize;
      const lowerBoundary = page * pageSize - pageSize;
      setdataToShow(
        pagination
          ? dataSource.filter(
              (_, dataIndex) =>
                dataIndex < upperBoundary && dataIndex >= lowerBoundary
            )
          : dataSource
      );
    } else {
      setdataToShow(dataSource);
    }
  }, [pagination]);

  return (
    <>
      {pagination && <AmazingPagination paginationData={pagination} />}
      <TableContainer>
        <Table colorScheme={colorScheme}>
          <Thead>
            <Tr>
              {columns.map((eachCol) => (
                <Th key={eachCol.key}>{eachCol.title}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {dataToShow.map((eachRecord, recordIndex) => {
              return (
                <Tr key={rowKey(eachRecord)}>
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
          <AmazingPagination paginationData={pagination} />
        )}
    </>
  );
}

export default memo(AmazingTable);
