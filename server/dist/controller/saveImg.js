'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var form, src;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            form = new formidable.IncomingForm();
            src = _path2.default.join(__dirname, '../../resource/');

            form.uploadDir = src;
            form.parse(req, function (err, fields, files) {
              console.log(files);
              for (item in files) {
                (function () {
                  var oldname = files[item].path;
                  var newname = src + Date.parse(new Date()) / 1000 + '.' + files[item].name.split('.')[1];
                  _fs2.default.rename(oldname, newname, function (err) {});
                })(item);
              }
              res.writeHead(200, { 'content-type': 'text/plain' });
              res.end('');
            });

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=saveImg.js.map