var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* eslint react/prop-types: 0 */
import React from 'react';
import Request from './Request';

var RequestWrapper = function RequestWrapper(method) {
  return function (props) {
    return React.createElement(
      Request,
      _extends({}, props, { method: method }),
      props.children
    );
  };
};

export default RequestWrapper;