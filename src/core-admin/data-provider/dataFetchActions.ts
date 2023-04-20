export const GET_LIST = "GET_LIST";
export const GET_ONE = "GET_ONE";

export const fetchActionsWithRecordResponse = ["getOne"];
export const fetchActionsWithArrayOfIdentifiedRecordsResponse = ["getList"];
export const fetchActionsWithArrayOfRecordsResponse = [
  ...fetchActionsWithArrayOfIdentifiedRecordsResponse,
];
export const fetchActionsWithTotalResponse = ["getList"];

export const coreAdminFetchActions = [
  ...fetchActionsWithTotalResponse,
  ...fetchActionsWithArrayOfRecordsResponse,
];

export const sanitizeFetchType = (fetchType: string) => {
  switch (fetchType) {
    case GET_LIST:
      return "getList";
    case GET_ONE:
      return "getOne";
    default:
      return fetchType;
  }
};
