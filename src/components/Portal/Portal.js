import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Portal extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    shoudDisplayChildren: PropTypes.bool,
    animateClosing: PropTypes.bool,
    delay: PropTypes.number,
  };

  static defaultProps = {
    shoudDisplayChildren: false,
    animateClosing: false,
    delay: 0,
  };

  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.menuRoot = document.querySelector('#portal-root');
    this.timer = null;
  }

  componentDidMount() {
    const { shoudDisplayChildren } = this.props;
    if (shoudDisplayChildren) {
      this.menuRoot.appendChild(this.el);
    }
  }

  componentDidUpdate() {
    const { shoudDisplayChildren, delay, animateClosing } = this.props;

    if (!shoudDisplayChildren) {
      if (animateClosing) {
        this.delayAnimation(delay);
      } else {
        this._removeChild(this.el, this.menuRoot);
      }
    } else {
      this.menuRoot.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    this._removeChild(this.el, this.menuRoot);
    clearTimeout(this.timer);
  }

  _removeChild = (element, parent) => {
    if (!this._isDescendant(element, parent)) return null;
    parent.removeChild(element);
  };

  _isDescendant = (node, parent) => {
    return parent === node.parentNode;
  };

  delayAnimation = delay => {
    this.timer = setTimeout(() => {
      this._removeChild(this.el, this.menuRoot);
    }, delay);
  };

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.el);
  }
}

export default Portal;
