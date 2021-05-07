// ./src/containers/NewsListContainer.js

import { connect } from 'react-redux';
import NewsList from '../components/index';

const mapStateToProps = state => {
  console.log('state ', state);
  return {
    newsList: state.newsList
  };
};

const NewsListContainer = connect(mapStateToProps)(NewsList);

export default NewsListContainer;