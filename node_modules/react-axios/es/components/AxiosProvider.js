import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export var AxiosContext = React.createContext(axios);

var AxiosProvider = function AxiosProvider(_ref) {
  var instance = _ref.instance,
      children = _ref.children;
  return React.createElement(
    AxiosContext.Provider,
    { value: instance },
    children
  );
};

AxiosProvider.defaultProps = {};

AxiosProvider.propTypes = {
  instance: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired
};

export default AxiosProvider;