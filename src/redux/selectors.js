export const get_api_state = (store) => store.api;

export const get_api = (store) =>
  get_api_state(store) ? get_api_state(store).api : {};
