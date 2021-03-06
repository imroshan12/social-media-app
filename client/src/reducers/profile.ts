import {
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  GET_QUERY_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from '../action-types/profile';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
};

const profile = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
    case GET_QUERY_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default profile;
