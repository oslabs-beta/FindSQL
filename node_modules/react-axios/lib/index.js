'use strict';

var _AxiosProvider = require('./components/AxiosProvider');

var _AxiosProvider2 = _interopRequireDefault(_AxiosProvider);

var _withAxios = require('./components/withAxios');

var _withAxios2 = _interopRequireDefault(_withAxios);

var _Request = require('./components/Request');

var _Request2 = _interopRequireDefault(_Request);

var _RequestWrapper = require('./components/RequestWrapper');

var _RequestWrapper2 = _interopRequireDefault(_RequestWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  AxiosProvider: _AxiosProvider2.default,
  Request: _Request2.default,
  Get: (0, _RequestWrapper2.default)('get'),
  Delete: (0, _RequestWrapper2.default)('delete'),
  Head: (0, _RequestWrapper2.default)('head'),
  Post: (0, _RequestWrapper2.default)('post'),
  Put: (0, _RequestWrapper2.default)('put'),
  Patch: (0, _RequestWrapper2.default)('patch'),
  withAxios: _withAxios2.default
};