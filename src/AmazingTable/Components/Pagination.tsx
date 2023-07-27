import { Button, ButtonProps, Flex, FlexProps } from "@chakra-ui/react";
import React, { memo } from "react";
import { ITablePagination } from "../definitions";

interface IProps {
  paginationData: ITablePagination;
}
function AmazingPagination({ paginationData }: IProps) {
  const { page, pageSize, total, onchange, position } = paginationData;

  /**Styles For the main flex */
  const paginationStyle: FlexProps = {
    display: "flex",
    justifyContent:
      position && ["topLeft", "bottomLeft"].includes(position)
        ? "flex-start"
        : "flex-end",
    bg: "primary.main",
  };

  /**Styles for the item */
  const itemstyle: ButtonProps = {
    height: "2rem",
    minW: "2rem",
    borderLeft: "1px solid white",
    borderRight: "1px solid white",
    color: "white",
    borderRadius: 0,
  };
  /**All the pages to display */
  const pages = Math.ceil(total / pageSize);

  const assignNewPage = (newPage: ITablePagination["page"]) =>
    onchange?.(newPage, pageSize);

  return (
    <Flex {...paginationStyle}>
      {new Array(pages).fill("*").map((_, fieldIndex) => {
        return (
          <Button
            onClick={() => assignNewPage(fieldIndex + 1)}
            key={fieldIndex}
            color="white"
            {...itemstyle}
            bgColor={
              fieldIndex + 1 === page ? "rgba(255, 255, 255, 0.2)" : "initial"
            }
          >
            {fieldIndex + 1}
          </Button>
        );
      })}
    </Flex>
  );
}

export default memo(AmazingPagination);
