import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Loader.css';

class Loader extends Component {
  render() {
    const { loading } = this.props;
    return (
      <div>
        {loading && <div className="loader">Chargement...</div>}
      </div>
    );
  }
}

Loader.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Loader;
