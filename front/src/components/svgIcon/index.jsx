import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './svgIcon.css';

class SvgIcon extends Component {
  render() {
    const { src, height, width } = this.props;
    const heightSvg = height ? height : '50px';
    const widthSvg = width ? width : '50px';
    return (
      <div style={{ textAlign: 'center' }}>
        <img src={src} height={heightSvg} width={widthSvg} />
      </div>
    );
  }
}

SvgIcon.propTypes = {
  src: PropTypes.string.isRequired,
  height: PropTypes.string,
  width: PropTypes.string
};

export default SvgIcon;
