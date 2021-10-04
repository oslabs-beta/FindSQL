'use strict';

exports.__esModule = true;
exports.withAxios = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Request = require('./Request');

var _Request2 = _interopRequireDefault(_Request);

var _AxiosProvider = require('./AxiosProvider');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withAxios = exports.withAxios = function withAxios() {
  var mixed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (typeof mixed === 'function') {
    // basic axios provider HoC
    var WrappedComponent = mixed;
    return function (props) {
      var axiosInstance = _react2.default.useContext(_AxiosProvider.AxiosContext);
      return _react2.default.createElement(WrappedComponent, _extends({ axios: axiosInstance }, props));
    };
  }
  // advanced Request provider HoC
  var options = _extends({}, _Request2.default.defaultProps, mixed);
  return function (WrappedComponent) {
    // validate the options passed in are valid request propTypes.
    _propTypes2.default.checkPropTypes(_extends({}, _Request2.default.propTypes, {
      method: _propTypes2.default.string // not required if the user just wants access to the axios instance
    }), options, 'option', 'withAxios()(' + WrappedComponent.name + ')');
    var ReactAxiosExtracter = function ReactAxiosExtracter(props) {
      // allow overriding the config initial options
      var newOptions = _extends({}, options, props.options);
      return _react2.default.createElement(
        _Request2.default,
        newOptions,
        function (error, response, isLoading, makeRequest, axios) {
          return _react2.default.createElement(WrappedComponent, _extends({}, props, {
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
      options: _propTypes2.default.object
    };
    return ReactAxiosExtracter;
  };
};

exports.default = withAxios;