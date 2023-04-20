import queryString from "query-string";
import { fetchJson, flattenObject } from "../data-provider";
import { DataProvider } from "../types";

/**
 * Maps core-admin queries to a json-server powered REST
 *
 * @see https://github.com/typicode/json-server
 *
 * @param apiUrl: The Api URL
 * @param httpClient: The Fetching api
 *
 * @returns {Object}
 *
 * getList          => GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24
 * getOne           => GET http://my.api.url/posts/123
 */
export const jsonServerProvider = (
  apiUrl: string,
  httpClient = fetchJson
): DataProvider => ({
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ...flattenObject(params.filter),
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage,
    };
    const url = `${apiUrl}/${resource}?${queryString.stringify(query)}`;

    const { headers, json } = await httpClient(url);

    if (!headers?.has("x-total-count")) {
      throw new Error(
        "The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?"
      );
    }

    return {
      data: json,
      total: parseInt(
        headers.get("x-total-count")?.split("/")?.pop() ?? "0",
        10
      ),
    };
  },
  getOne: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;

    const { json } = await httpClient(url);

    return {
      data: json,
    };
  },
});
