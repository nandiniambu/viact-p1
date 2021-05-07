// ./src/actions/index.js

export const LOAD_NEWS_LIST = 'LOAD_NEWS_LIST';
export const RENDER_NEWS_LIST = 'RENDER_NEWS_LIST';

export function loadNewsList() {
  return {
    type: LOAD_NEWS_LIST
  };
}