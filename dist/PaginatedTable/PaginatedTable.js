"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const react_2 = require("react");
const Pagination_1 = __importDefault(require("./Pagination"));
function PaginatedTable({ dataSource, columns, rowKey, pagination, containerProps = {}, tBodyProps = {}, tHeadProps = {}, tableProps = {}, trProps = {}, }) {
    const [dataToShow, setDataToShow] = (0, react_2.useState)([]);
    (0, react_2.useEffect)(() => {
        if (pagination) {
            const { page, pageSize } = pagination;
            const upperBoundary = page * pageSize;
            const lowerBoundary = page * pageSize - pageSize;
            setDataToShow(pagination
                ? dataSource.filter((_, dataIndex) => dataIndex < upperBoundary && dataIndex >= lowerBoundary)
                : dataSource);
        }
        else {
            setDataToShow(dataSource);
        }
    }, [pagination]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [pagination && (0, jsx_runtime_1.jsx)(Pagination_1.default, { paginationData: pagination }), (0, jsx_runtime_1.jsx)(react_1.TableContainer, { ...containerProps, children: (0, jsx_runtime_1.jsxs)(react_1.Table, { ...tableProps, children: [(0, jsx_runtime_1.jsx)(react_1.Thead, { ...tHeadProps, children: (0, jsx_runtime_1.jsx)(react_1.Tr, { children: columns.map((eachCol) => ((0, jsx_runtime_1.jsx)(react_1.Th, { children: eachCol.title }, eachCol.key))) }) }), (0, jsx_runtime_1.jsx)(react_1.Tbody, { ...tBodyProps, children: dataToShow.map((eachRecord, recordIndex) => {
                                return ((0, jsx_runtime_1.jsx)(react_1.Tr, { ...(typeof trProps === "function"
                                        ? trProps(eachRecord, recordIndex)
                                        : trProps), children: columns.map((eachCol, colIndex) => {
                                        const tdValue = eachCol.dataIndex && eachRecord[eachCol.dataIndex];
                                        return ((0, jsx_runtime_1.jsx)(react_1.Td, { onClick: () => eachCol.onClick?.(eachRecord, recordIndex), children: eachCol.render?.(tdValue, eachRecord, recordIndex) ??
                                                tdValue }, colIndex));
                                    }) }, rowKey(eachRecord)));
                            }) })] }) }), pagination &&
                pagination.position &&
                ["bottomRight", "bottomLeft"].includes(pagination.position) && ((0, jsx_runtime_1.jsx)(Pagination_1.default, { paginationData: pagination }))] }));
}
exports.default = (0, react_2.memo)(PaginatedTable);
