import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { App } from 'components/App';
import { fetchPages, createPage } from 'store/reducers/pageReducer';

const mapStateToProps = ({ pageReducer }) => ({
  pagesRequest: pageReducer.pagesRequest,
});

const mapDispatchToProps = dispatch => ({
  fetchPages: () => {
    dispatch(fetchPages());
  },
  createPage: values => {
    dispatch(createPage(values));
  },
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default withRouter(AppContainer);
