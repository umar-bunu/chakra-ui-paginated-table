"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const react_2 = require("react");
/**pagination component. By passing the props, you have access to pagination
 * And can control pagination.
 * @usage - If you desire to use table, consider using table pagination from this package.
 */
function Pagination({ paginationData }) {
    const { page, pageSize, total, onchange, position, btnProps = {
        height: "2rem",
        minW: "2rem",
        borderLeft: "1px solid white",
        borderRight: "1px solid white",
        color: "white",
        borderRadius: 0,
    }, __selectedBtnProps = {}, } = paginationData;
    /**Styles For the main flex */
    const paginationStyle = {
        display: "flex",
        justifyContent: position && ["topLeft", "bottomLeft"].includes(position)
            ? "flex-start"
            : "flex-end",
        bg: "blue",
    };
    /**All the pages to display */
    const pages = Math.ceil(total / pageSize);
    const assignNewPage = (newPage) => onchange?.(newPage, pageSize);
    return ((0, jsx_runtime_1.jsx)(react_1.Flex, { ...paginationStyle, children: new Array(pages).fill("*").map((_, fieldIndex) => {
            const isSelected = fieldIndex + 1 === page;
            return ((0, jsx_runtime_1.jsx)(react_1.Button, { onClick: () => assignNewPage(fieldIndex + 1), color: "white", ...btnProps, ...(isSelected
                    ? { bgColor: "rgba(255, 255, 255, 0.2)", ...__selectedBtnProps }
                    : {}), children: fieldIndex + 1 }, fieldIndex));
        }) }));
}
exports.default = (0, react_2.memo)(Pagination);
