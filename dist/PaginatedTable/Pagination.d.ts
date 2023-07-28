/// <reference types="react" />
import { ITablePagination } from "./definitions";
interface IProps {
    paginationData: ITablePagination;
}
/**pagination component. By passing the props, you have access to pagination
 * And can control pagination.
 * @usage - If you desire to use table, consider using table pagination from this package.
 */
declare function Pagination({ paginationData }: IProps): JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof Pagination>;
export default _default;
