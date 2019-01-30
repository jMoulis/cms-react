import React, { Component, Fragment } from 'react';
import { Loader } from 'components/Loader';
import componentsLibrary from 'components/componentsLoader';
import { Page } from 'components/Page';
import { Route, NavLink } from 'react-router-dom';
import { Animate } from 'components/Animate';

const functions = {
  DISPLAY_LOG: params => {
    console.log(params);
  },
};

class PageCreator extends Component {
  createPage = (page, options) => {
    if (!page) return null;
    if (typeof page !== 'object') throw new Error('Page is not an object');
    try {
      const MainComponent = componentsLibrary[page.component];
      return (
        <React.Suspense fallback={<Loader />}>
          <Animate animate={options.animate}>
            <MainComponent {...this.renderProps(page.props)}>
              {page.children && [...this.renderComponent(page.children)]}
            </MainComponent>
          </Animate>
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
              animate: page.menuEntry.animate,
            })
          }
        />
      );
    });
  };

  render() {
    const { children } = this.props;
    return <Fragment>{children}</Fragment>;
  }
}

export default PageCreator;
