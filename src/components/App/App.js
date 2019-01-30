import React, { Fragment } from 'react';
import { Switch } from 'react-router-dom';
import PageCreator from 'services/PageCreator';
import { Portal } from 'components/Portal';
import { Modal } from 'components/Modal';
import { Animate } from 'components/Animate';
import fakePages from 'data/pages';

class App extends PageCreator {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      pages: null,
    };
  }

  componentDidMount() {
    const { fetchPages } = this.props;
    fetchPages();
  }

  renderMenu(showMenu) {
    return (
      <Portal shoudDisplayChildren={showMenu} delay={300}>
        <Modal shoudDisplayChildren={showMenu} delay={300}>
          <h1>Add New Page</h1>
          <button
            type="button"
            onClick={() =>
              this.setState(prevState => ({ showMenu: !prevState.showMenu }))
            }
          >
            Close
          </button>
        </Modal>
      </Portal>
    );
  }

  handleCreatePage = () => {
    const { createPage } = this.props;
    // createPage(fakePages.homePage);
  };

  renderMainContent(pagesRequest, showMenu) {
    const { pages, isFetching, error } = pagesRequest;
    if (isFetching) return <span>Loader</span>;
    if (!pages && !isFetching && !error) return <span>No data</span>;
    if (error) return <span>{error.message}</span>;
    return (
      <Fragment>
        {this.renderNavbar(pages)}

        <Switch>{this.renderRoute(pages)}</Switch>

        {this.renderMenu(showMenu)}
      </Fragment>
    );
  }

  render() {
    const { pagesRequest } = this.props;
    const { showMenu } = this.state;
    return (
      <Fragment>
        <main>
          <button
            type="button"
            onClick={() => this.setState(() => ({ showMenu: true }))}
          >
            ShowMenu
          </button>
          <button type="button" onClick={this.handleCreatePage}>
            Create Page
          </button>
          {this.renderMainContent(pagesRequest, showMenu)}
        </main>
      </Fragment>
    );
  }
}

export default App;
