import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Portal extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    shoudDisplayChildren: PropTypes.bool,
    delay: PropTypes.number,
  };

  static defaultProps = {
    shoudDisplayChildren: false,
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
        this.menuRoot.removeChild(this.el);
      }
    } else {
      this.menuRoot.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    if (!this.el) return null;
    this.menuRoot.removeChild(this.el);
    clearTimeout(this.timer);
  }

  delayAnimation = delay => {
    this.timer = setTimeout(() => {
      this.menuRoot.removeChild(this.el);
    }, delay);
  };

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.el);
  }
}

export default Portal;
