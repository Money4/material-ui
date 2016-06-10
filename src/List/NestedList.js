import React, {Component, PropTypes} from 'react';
import {fade} from '../utils/colorManipulator';
import List from './List';

function getStyles(props, context, state) {
  const {
    open
  } = props;

  const {muiTheme} = context
  const {nestedList} = muiTheme

  const textColor = muiTheme.baseTheme.palette.textColor
  const backgroundColor = fade(textColor, 0.1)
  // const singleAvatar = !secondaryText && (leftAvatar || rightAvatar);
  // const singleNoAvatar = !secondaryText && !(leftAvatar || rightAvatar);
  // const twoLine = secondaryText && secondaryTextLines === 1;
  // const threeLine = secondaryText && secondaryTextLines > 1;

  const styles = {
    root: {
      // backgroundColor: (state.isKeyboardFocused || state.hovered) &&
      // !state.rightIconButtonHovered &&
      // !state.rightIconButtonKeyboardFocused ? hoverColor : null,
      // color: textColor,

      backgroundColor,
      padding: nestedList.padding,
      display: open ? null : 'none',
      // fontSize: 16,
      // marginLeft: '16px',
      // position: 'relative',
    },

  };

  return styles;
}

class NestedList extends Component {
  static propTypes = {
    children: PropTypes.node,
    nestedLevel: PropTypes.number,
    open: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object
  };

  static defaultProps = {
    nestedLevel: 1,
    open: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      children,
      // open,
      nestedLevel,
      style,
    } = this.props;

    // const styles = {
      // root: {
        // display: open ? null : 'none',
      // },
    // };
    //
    const styles = getStyles(this.props, this.context, this.state)

    return (
      <List style={Object.assign({}, styles.root, style)}>
        {
          React.Children.map(children, (child) => {
            return React.isValidElement(child) ? (
              React.cloneElement(child, {
                nestedLevel: nestedLevel + 1
              })
            ) : child;
          })
        }
      </List>
    );
  }
}

export default NestedList;
