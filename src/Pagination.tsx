import { Button, Flex, FlexProps } from "@chakra-ui/react";
import { memo } from "react";
import { ITablePagination } from "./definitions";

interface IProps {
  paginationData: ITablePagination;
}
/**pagination component. By passing the props, you have access to pagination
 * And can control pagination.
 * @usage - If you desire to use chakra table, consider using table pagination from this package.
 */
function Pagination({ paginationData }: IProps) {
  const {
    page,
    pageSize,
    total,
    onchange,
    position,
    btnProps = {
      height: "2rem",
      minW: "2rem",
      borderLeft: "1px solid white",
      borderRight: "1px solid white",
      color: "white",
      borderRadius: 0,
    },
    containerProps = {},
    __selectedBtnProps = {},
  } = paginationData;

  /**Styles For the main flex */
  const paginationStyle: FlexProps = {
    display: "flex",
    justifyContent:
      position && ["topLeft", "bottomLeft"].includes(position)
        ? "flex-start"
        : "flex-end",
    bg: "inherit",
  };

  /**All the pages to display */
  const pages = Math.ceil(total / pageSize);

  const assignNewPage = (newPage: ITablePagination["page"]) =>
    onchange?.(newPage, pageSize);

  return (
    <Flex {...paginationStyle} {...containerProps}>
      {new Array(pages).fill("*").map((_, fieldIndex) => {
        const isSelected = fieldIndex + 1 === page;
        return (
          <Button
            onClick={() => assignNewPage(fieldIndex + 1)}
            key={fieldIndex}
            color="white"
            {...btnProps}
            {...(isSelected
              ? { bgColor: "rgba(255, 255, 255, 0.2)", ...__selectedBtnProps }
              : {})}
          >
            {fieldIndex + 1}
          </Button>
        );
      })}
    </Flex>
  );
}

export default memo(Pagination);
