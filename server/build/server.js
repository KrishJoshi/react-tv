'use strict';

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
// add the path module


app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

var router = _express2.default.Router();
app.use(router);
app.use('/api', _index2.default);

var staticFiles = _express2.default.static(_path2.default.join(__dirname, '../../client/build'));
app.use(staticFiles);
app.use('/*', staticFiles);

app.set('port', process.env.PORT || 80);
app.listen(app.get('port'), function () {
  console.log('Listening on ' + app.get('port'));
});