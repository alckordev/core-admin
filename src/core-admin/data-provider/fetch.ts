import queryString from "query-string";
import { HttpError } from "./HttpError";

export interface Options extends RequestInit {
  user?: {
    authenticated?: boolean;
    token?: string;
  };
}

export const createHeadersFromOptions = (options: Options): Headers => {
  const requestHeaders = (options.headers ||
    new Headers({ Accept: "application/json" })) as Headers;

  if (
    !requestHeaders.has("Content-Type") &&
    !(options && (!options.method || options.method === "GET")) &&
    !(options && options.body && options.body instanceof FormData)
  ) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (options.user && options.user.authenticated && options.user.token) {
    requestHeaders.set("Authorization", options.user.token);
  }

  return requestHeaders;
};

/**
 * Utility function to make HTTP calls. It's similar to the HTML5 `fetch()`,
 * except it handles JSON decoding and HTTP error codes automatically.
 *
 * @param url: The URL to call
 * @param options: The Options to pass to the HTTP call
 * @param options.user: The user object, used for the Authorization header
 * @param options.token: The token to pass as the Authorization header
 * @param options.user.authenticated: Whether the user is authenticated or not
 * @param options.headers: The headers to pass the HTTP call
 *
 * @returns {Promise} the Promise for a response object containing the following properties:
 * - status: the HTTP status code
 * - headers: the HTTP headers
 * - body: the response body
 * - json: the response body parsed as JSON
 */
export const fetchJson = async (url: string, options: Options = {}) => {
  const requestHeaders = createHeadersFromOptions(options);

  const response = await fetch(url, { ...options, headers: requestHeaders });
  const text = await response.text();
  const responseBody = {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    body: text,
  };

  let json;
  try {
    json = JSON.parse(responseBody.body);
  } catch (ex) {
    // not json, no big deal
    // console.warn(ex)
  }

  if (responseBody.status < 200 || responseBody.status >= 300) {
    return Promise.reject(
      new HttpError(
        (json && json.message) || responseBody.statusText,
        responseBody.status,
        json
      )
    );
  }

  return {
    status: responseBody.status,
    headers: responseBody.headers,
    body: responseBody.body,
    json,
  };
};

export const queryParameters = queryString.stringify;

const isValidObject = (value: any) => {
  if (!value) {
    return false;
  }

  const isArray = Array.isArray(value);
  const isBuffer = typeof Buffer !== "undefined" && Buffer.isBuffer(value);
  const isObject = Object.prototype.toString.call(value) === "[object Object]";
  const hasKeys = !!Object.keys(value).length;

  return !isArray && !isBuffer && isObject && hasKeys;
};

export const flattenObject = (
  value: any,
  path: string[] = []
): { [key: string]: any } => {
  if (isValidObject(value)) {
    return Object.assign(
      {},
      ...Object.keys(value).map((key: string) =>
        flattenObject(value[key], path.concat([key]))
      )
    );
  } else {
    return path.length ? { [path.join(".")]: value } : value;
  }
};
