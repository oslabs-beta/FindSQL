var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';
import Request from './Request';
import { AxiosContext } from './AxiosProvider';

export var withAxios = function withAxios() {
  var mixed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (typeof mixed === 'function') {
    // basic axios provider HoC
    var WrappedComponent = mixed;
    return function (props) {
      var axiosInstance = React.useContext(AxiosContext);
      return React.createElement(WrappedComponent, _extends({ axios: axiosInstance }, props));
    };
  }
  // advanced Request provider HoC
  var options = _extends({}, Request.defaultProps, mixed);
  return function (WrappedComponent) {
    // validate the options passed in are valid request propTypes.
    PropTypes.checkPropTypes(_extends({}, Request.propTypes, {
      method: PropTypes.string // not required if the user just wants access to the axios instance
    }), options, 'option', 'withAxios()(' + WrappedComponent.name + ')');
    var ReactAxiosExtracter = function ReactAxiosExtracter(props) {
      // allow overriding the config initial options
      var newOptions = _extends({}, options, props.options);
      return React.createElement(
        Request,
        newOptions,
        function (error, response, isLoading, makeRequest, axios) {
          return React.createElement(WrappedComponent, _extends({}, props, {
            error: error,
            response: response,
            isLoading: isLoading,
            makeRequest: makeRequest,
            axios: axios,
            options: newOptions
          }));
        }
      );
    };
    ReactAxiosExtracter.propTypes = {
      options: PropTypes.object
    };
    return ReactAxiosExtracter;
  };
};

export default withAxios;