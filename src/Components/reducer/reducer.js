import { SAVE_FORM_DATA, UPDATE_FORM_DATA } from '../action/action';

const initialState = {
  formData: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_FORM_DATA:
      return {
        ...state,
        formData: action.payload,
      };
    case UPDATE_FORM_DATA:
      return {
        ...state,
        formData: action.payload,
      };
    default:
      return state;
  }
};
