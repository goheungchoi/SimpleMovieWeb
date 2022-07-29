import { LOAD_API, UNLOAD_API } from "./actionTypes.js";

export const load_api = (api) => ({
  type: LOAD_API,
  payload: { api },
})

export const unload_api = () => ({
  type: UNLOAD_API,
  payload: {},
})