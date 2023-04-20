import { DataProvider, LegacyDataProvider } from "../types";
import { GET_LIST, GET_ONE } from "./dataFetchActions";

const defaultDataProvider = () => Promise.resolve();
defaultDataProvider.getList = () => Promise.resolve({ data: [], total: 0 });
defaultDataProvider.getOne = () => Promise.resolve({ data: null });

const fetchMap: Record<string, string> = {
  getList: GET_LIST,
  getOne: GET_ONE,
};

interface ConvertDataProvider extends DataProvider {
  (type: string, resource: string, params: any): Promise<any>;
}

/**
 * Turn a function-based dataProvider to an object-based one
 * Allows using legacy dataProviders transparently.
 *
 * @param {Function} legacyDataProvider: A legacy dataProvider (type, resource, params) => Promise<any>
 *
 * @returns {Object}: A dataProvider that core-admin can use
 */
export const convertLegacyDataProvider = (
  legacyDataProvider: LegacyDataProvider
): ConvertDataProvider => {
  const proxy: ConvertDataProvider = new Proxy(defaultDataProvider, {
    get(_, name) {
      return (resource: string, params: any) => {
        if (Object.keys(fetchMap).includes(name.toString())) {
          const fetchType = fetchMap[name.toString()];
          return legacyDataProvider(fetchType, resource, params);
        }

        return legacyDataProvider(name.toString(), resource, params);
      };
    },
    apply(_, __, args: [string, string, any]) {
      return legacyDataProvider.apply(legacyDataProvider, args);
    },
  }) as ConvertDataProvider;

  return proxy;
};
