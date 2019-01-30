import React, { Component, Fragment } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
// import pages from 'data/pages';
import { Loader } from 'components/Loader';
import componentsLibrary from 'components/ComponentsLoader';
import { Page } from 'components/Page';
import { Modal } from 'components/Modal';
import { Portal } from 'components/Portal';

const functions = {
  DISPLAY_LOG: params => {
    console.log(params);
  },
};

class App extends Component {
  state = {
    showMenu: false,
    pages: null,
  };

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:3050/api/pages', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const { data } = await response.json();
        this.setState(() => ({
          pages: [...data],
        }));
      }
    } catch (error) {
      console.error('LogError', error.message);
    }
  }

  createPage = (page, options) => {
    if (!page) return null;
    if (typeof page !== 'object') throw new Error('Page is not an object');
    try {
      const MainComponent = componentsLibrary[page.component];
      return (
        <React.Suspense fallback={<Loader />}>
          <Page {...this.renderProps(page.props)} {...options}>
            <MainComponent {...this.renderProps(page.props)}>
              {page.children && [...this.renderComponent(page.children)]}
            </MainComponent>
          </Page>
        </React.Suspense>
      );
    } catch (error) {
      console.warn(error.message);
    }
  };

  renderComponent = children => {
    if (!children) return null;
    if (Array.isArray(children)) {
      return children.map((child, index) => {
        if (this._isString(child)) return child;
        const ChildComponent = componentsLibrary[child.component];
        const reactElement = (
          <ChildComponent key={index} {...this.renderProps(child.props)}>
            {child.children && [...this.renderComponent(child.children)]}
          </ChildComponent>
        );
        if (!React.isValidElement(reactElement))
          throw new Error('The return element is not a valid react element');
        return reactElement;
      });
    }
    return null;
  };

  renderProps = props => {
    if (!props) return null;
    if (props.function) {
      const propFunc = this.renderFunction(props);
      return { ...props, ...propFunc };
    }
    return props;
  };

  renderFunction = funcObject => {
    if (!funcObject) return null;
    if (funcObject.function) {
      const { params } = funcObject.function;
      const newFunction = functions[funcObject.function.action];
      return {
        [funcObject.function.name]: () => {
          try {
            if (typeof newFunction !== 'function') {
              throw new Error('Not a function');
            }
            return newFunction(params);
          } catch (error) {
            console.warn(error.message);
          }
        },
      };
    }
    return null;
  };

  _isString = value => typeof value === 'string';

  renderNavbar = pages => {
    return pages.map(page => (
      <NavLink key={page._id} to={page.menuEntry.location}>
        {page.menuEntry.name}
      </NavLink>
    ));
  };

  renderRoute = pages => {
    return pages.map(page => {
      return (
        <Route
          key={page._id}
          exact={page.menuEntry.exact}
          path={page.menuEntry.location}
          render={route =>
            this.createPage(page.reactComponent, {
              route,
              pageName: page.pageName,
            })
          }
        />
      );
    });
  };

  renderMenu = showMenu => {
    return (
      <Portal shoudDisplayChildren={showMenu} delay={300} animateClosing>
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
  };

  handleCreatePage = () => {
    this.setState(prevState => ({ showMenu: !prevState.showMenu }));
    // fetch('http://localhost:3050/api/pages', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ ...pages.contactPage, pageName: 'yala' }),
    // });
  };

  render() {
    const { showMenu, pages } = this.state;
    if (!pages) return <span>Loader</span>;
    return (
      <Fragment>
        <main>
          <button type="button" onClick={this.handleCreatePage}>
            Create Page
          </button>
          {this.renderNavbar(pages)}
          <Switch>{this.renderRoute(pages)}</Switch>
          {this.renderMenu(showMenu)}
        </main>
      </Fragment>
    );
  }
}

export default App;
