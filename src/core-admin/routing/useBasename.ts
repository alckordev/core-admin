import { useContext } from "react";
import { BasenameContext } from "./BasenameContext";

/**
 * Get the string to append to all links to the admin app
 *
 * @example
 * import { useBasename } from "core-admin"
 *
 * const ArticleLink = ({ id, title }) => {
 *  const basename = useBasename();
 *  return <a href={`${basename}/article/${id}`}>{title}</a>
 * }
 */
export const useBasename = () => useContext(BasenameContext);
