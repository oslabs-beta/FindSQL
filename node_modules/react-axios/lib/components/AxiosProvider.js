'use strict';

exports.__esModule = true;
exports.AxiosContext = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AxiosContext = exports.AxiosContext = _react2.default.createContext(_axios2.default);

var AxiosProvider = function AxiosProvider(_ref) {
  var instance = _ref.instance,
      children = _ref.children;
  return _react2.default.createElement(
    AxiosContext.Provider,
    { value: instance },
    children
  );
};

AxiosProvider.defaultProps = {};

AxiosProvider.propTypes = {
  instance: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.any.isRequired
};

exports.default = AxiosProvider;