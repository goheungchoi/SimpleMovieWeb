import { LOAD_API, UNLOAD_API } from "../actionTypes";

const initState = { 
  api: {
    ready: false,
    loading: true,
    screen_hidden: false,
    movies: [],
    genre_map: new Map(),
    config: [],
    popup_hidden: true,
    popup_index: -1
  }
};

export default function(state = initState, action) {
  switch (action.type) {
    case LOAD_API: {
      return { 
        api: action.payload.api,
      };
    }
    case UNLOAD_API: {
      return {
        api: initState,
      };
    }
    default: {
      return state;
    }
  }
}