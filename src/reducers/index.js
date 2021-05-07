// ./src/reducers/index.js

// ... other imports ...

import { RENDER_NEWS_LIST, LOAD_NEWS_LIST } from '../actions';

// ... initialState ...

const initialState = {
    newsList: []
};

export default function newsApp(state = initialState, action) {
  switch (action.type) {
    case RENDER_NEWS_LIST:
      return {
        ...state,
        newsList: action.newsList
      };
    case LOAD_NEWS_LIST: 
    return {
        ...state
    }
  }
}