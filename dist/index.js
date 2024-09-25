"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
var bcrypt = require('bcryptjs');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var app = express();
var port = 3000;
app.use(express.json({
  limit: '50mb'
}));
app.use(cors());
var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'scan'
});
db.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Register endpoint
app.post('/register', function (req, res) {
  var _req$body = req.body,
    firstname = _req$body.firstname,
    lastname = _req$body.lastname,
    email = _req$body.email,
    password = _req$body.password;

  // Check if email already exists
  var checkEmailSql = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailSql, [email], function (err, results) {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).send('Server error');
    }
    if (results.length > 0) {
      return res.status(400).send('Email already in use');
    }

    // Hash the password before storing it in the database
    var hashedPassword = bcrypt.hashSync(password, 8);
    var insertSql = 'INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)';
    db.query(insertSql, [firstname, lastname, email, hashedPassword], function (err, result) {
      if (err) {
        console.error('SQL error:', err);
        return res.status(500).send('Server error');
      }
      console.log('User registered:', result);
      res.status(201).send('User registered');
    });
  });
});

// Login endpoint
app.post('/login', function (req, res) {
  var _req$body2 = req.body,
    email = _req$body2.email,
    password = _req$body2.password;
  var sql = 'SELECT * FROM users WHERE BINARY email = ?'; // Case-sensitive email comparison
  db.query(sql, [email], function (err, results) {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).send('Server error');
    }
    if (results.length === 0) {
      return res.status(401).json({
        message: 'Wrong username or password'
      });
    }
    var user = results[0];
    var isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Wrong username or password'
      });
    }
    res.status(200).json({
      message: 'Login successful',
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      id: user.id
    });
  });
});

// Update profile endpoint

var teacherImageStorage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    var dir = path.join(__dirname, '../scan/teacherimages');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true
      });
    }
    cb(null, dir);
  },
  filename: function filename(req, file, cb) {
    var id = req.params.id;
    var filename = "".concat(id, ".jpg");
    cb(null, filename);
  }
});

// Function to handle base64 image data
var handleBase64Image = function handleBase64Image(imageBase64) {
  return new Promise(function (resolve, reject) {
    if (!imageBase64) {
      return resolve(null); // No image to process
    }
    var base64Data = imageBase64.split(',')[1]; // Extract base64 part only
    var imageBuffer = Buffer.from(base64Data, 'base64');
    resolve(imageBuffer);
  });
};
var uploadTeacherImage = multer({
  storage: teacherImageStorage
}).single('profilePic');
app.put('/update-profile/:id', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var id, _req$body3, firstname, lastname, email, imageBase64, profilePicBuffer, sql, params;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          id = req.params.id;
          _req$body3 = req.body, firstname = _req$body3.firstname, lastname = _req$body3.lastname, email = _req$body3.email, imageBase64 = _req$body3.imageBase64; // Ensure all required fields are provided
          if (!(!firstname || !lastname || !email)) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: 'All fields are required'
          }));
        case 4:
          _context.prev = 4;
          _context.next = 7;
          return handleBase64Image(imageBase64);
        case 7:
          profilePicBuffer = _context.sent;
          // Update profile in the database
          sql = 'UPDATE users SET firstname = ?, lastname = ?, email = ?, profile_pic = ? WHERE id = ?';
          params = [firstname, lastname, email, profilePicBuffer ? profilePicBuffer : null,
          // Handle null case for no image
          id];
          db.query(sql, params, function (err, result) {
            if (err) {
              console.error('SQL error:', err);
              return res.status(500).json({
                error: 'Database error'
              });
            }
            res.status(200).json({
              message: 'Profile updated successfully',
              data: {
                id: id,
                firstname: firstname,
                lastname: lastname,
                email: email,
                profilePic: profilePicBuffer ? 'Image updated' : 'No image'
              }
            });
          });
          _context.next = 17;
          break;
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](4);
          console.error('Error processing image:', _context.t0);
          res.status(400).json({
            error: 'Invalid image data'
          });
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 13]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

//updat student
app.put('/update-student-data/:studentID', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var studentID, _req$body4, name, gmail, profile_pic, p_name, parent_contact, parentContactInt, profilePicBuffer, sql, params;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          studentID = req.params.studentID;
          _req$body4 = req.body, name = _req$body4.name, gmail = _req$body4.gmail, profile_pic = _req$body4.profile_pic, p_name = _req$body4.p_name, parent_contact = _req$body4.parent_contact; // Log request headers, params, and body for debugging
          console.log('Request headers:', req.headers);
          console.log('Request params:', req.params);
          console.log('Request body:', req.body);

          // Ensure required fields are provided
          if (!(!name || !gmail || !p_name)) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            error: 'All fields are required'
          }));
        case 7:
          // Parse parent contact number and validate
          parentContactInt = null; // Default to null
          if (!parent_contact) {
            _context2.next = 12;
            break;
          }
          parentContactInt = parseInt(parent_contact, 10);
          if (!(isNaN(parentContactInt) || parentContactInt <= 0)) {
            _context2.next = 12;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            error: 'Invalid contact number format'
          }));
        case 12:
          _context2.prev = 12;
          // Handle image if provided
          profilePicBuffer = null;
          if (!profile_pic) {
            _context2.next = 20;
            break;
          }
          console.log('Profile Pic before decoding:', profile_pic); // Log base64 image
          _context2.next = 18;
          return handleBase64Image(profile_pic);
        case 18:
          profilePicBuffer = _context2.sent;
          console.log('Decoded Profile Pic Buffer:', profilePicBuffer); // Log buffer
        case 20:
          sql = "UPDATE student SET \n      name = COALESCE(?, name), \n      gmail = COALESCE(?, gmail), \n      profile_pic = COALESCE(?, profile_pic), \n      p_name = COALESCE(?, p_name), \n      parent_contact = COALESCE(?, parent_contact) \n      WHERE studentID = ?";
          params = [name, gmail, profilePicBuffer,
          // This can still be null if no image is provided
          p_name, parentContactInt,
          // This will be null if invalid
          studentID]; // Execute SQL query
          db.query(sql, params, function (err, result) {
            if (err) {
              console.error('SQL error:', err);
              return res.status(500).json({
                error: 'Database error'
              });
            }

            // Check if any rows were affected (student found)
            if (result.affectedRows === 0) {
              return res.status(404).json({
                error: 'Student not found'
              });
            }
            res.status(200).json({
              message: 'Student updated successfully',
              data: {
                studentID: studentID,
                name: name,
                gmail: gmail,
                profilePic: profilePicBuffer ? 'Image updated' : 'No image',
                p_name: p_name,
                parent_contact: parentContactInt
              }
            });
          });
          _context2.next = 29;
          break;
        case 25:
          _context2.prev = 25;
          _context2.t0 = _context2["catch"](12);
          console.error('Error processing image:', _context2.t0);
          res.status(400).json({
            error: 'Invalid image data'
          });
        case 29:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[12, 25]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

//check email
app.get('/check-email', function (req, res) {
  var email = req.query.email;
  if (!email) {
    return res.status(400).json({
      message: 'Email is required'
    });
  }
  var sql = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
  db.query(sql, [email], function (err, results) {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).send('Server error');
    }
    if (results[0].count > 0) {
      return res.status(409).json({
        message: 'Email already exists'
      });
    }
    res.status(200).json({
      message: 'Email is available'
    });
  });
});

//Add student

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    var dir = '../scan/studentimages';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(req.body.name, ".jpg"));
  }
});
var upload = multer({
  storage: storage
});
app.post('/add-student', upload.single('profilePic'), function (req, res) {
  var _req$body5 = req.body,
    name = _req$body5.name,
    gmail = _req$body5.gmail,
    gender = _req$body5.gender,
    id = _req$body5.id;
  var profilePic = req.file ? req.file.filename : null;

  // Insert student data into database
  var sql = 'INSERT INTO student (name, gmail, gender, profile_pic, teacher_id) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, gmail, gender, profilePic, id], function (err, result) {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to register student'
      });
    }
    res.status(201).json({
      status: 'success',
      message: 'Student registered successfully',
      data: {
        name: name,
        gmail: gmail,
        gender: gender,
        profilePic: profilePic
      }
    });
  });
});

//get student
// Fetch students with attendance status for today
app.get('/students/:id', function (req, res) {
  var teacherId = req.params.id;
  var sql = "\nSELECT s.*, a.status AS attendanceStatus\nFROM student s\nLEFT JOIN (\n  SELECT studentID, status\n  FROM attendance\n  WHERE date = CURDATE()\n) a ON s.studentID = a.studentID\nWHERE s.teacher_id = ?\n";
  db.query(sql, [teacherId], function (err, results) {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to fetch students'
      });
    }
    res.status(200).json({
      status: 'success',
      data: results
    });
  });
});

// // update student
// app.put('/update-student/:studentID', (req, res) => {
//   const studentID = req.params.studentID;
//   const { name, gmail, profilePic, gender } = req.body;

//   // Build SQL query dynamically based on which fields are provided
//   let sql = 'UPDATE student SET ';
//   const params = [];
//   const fields = [];

//   if (name) {
//     fields.push('name = ?');
//     params.push(name);
//   }
//   if (gmail) {
//     fields.push('gmail = ?');
//     params.push(gmail);
//   }
//   if (profilePic) {
//     fields.push('profile_pic = ?');
//     params.push(profilePic);
//   }
//   if (gender) {
//     fields.push('gender = ?');
//     params.push(gender);
//   }

//   if (fields.length === 0) {
//     return res.status(400).json({ status: 'error', message: 'No fields to update' });
//   }

//   sql += fields.join(', ') + ' WHERE studentID = ?';
//   params.push(studentID);

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       console.error('SQL error:', err);
//       return res.status(500).json({ status: 'error', message: 'Failed to update student' });
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ status: 'error', message: 'Student not found or no changes made' });
//     }

//     res.status(200).json({
//       status: 'success',
//       message: 'Student information updated successfully',
//       data: { id: studentID, name, gmail, profilePic, gender }
//     });
//   });
// });

// Fetch students and their attendance by teacherId
app.get('/students/:teacherId', function (req, res) {
  var teacherId = req.params.teacherId;
  console.log('Fetching students for teacher ID:', teacherId); // Log teacher ID

  var sql = "\n    SELECT s.*, a.status AS attendance_status\n    FROM student s\n    LEFT JOIN attendance a ON s.id = a.student_id\n    WHERE s.teacher_id = ?\n  ";
  db.query(sql, [teacherId], function (err, results) {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to fetch students'
      });
    }

    // Process the results to ensure profile_pic is returned as Base64
    var formattedResults = results.map(function (student) {
      return _objectSpread(_objectSpread({}, student), {}, {
        profile_pic: student.profile_pic ? "data:image/jpeg;base64,".concat(student.profile_pic.toString('base64')) // Convert Buffer to Base64 string
        : null // Handle case where there's no profile pic
      });
    });
    console.log('Formatted query results:', formattedResults); // Log formatted results

    res.status(200).json({
      status: 'success',
      data: formattedResults
    });
  });
});

// Delete student endpoint
// Verify password and delete student endpoint
app.post('/verify-password-and-delete', function (req, res) {
  var _req$body6 = req.body,
    userId = _req$body6.userId,
    password = _req$body6.password,
    studentID = _req$body6.studentID;

  // Fetch the user's hashed password from the database
  var sql = 'SELECT password FROM users WHERE id = ?';
  db.query(sql, [userId], function (err, results) {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({
        status: 'error',
        message: 'Server error'
      });
    }
    if (results.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }
    var user = results[0];
    var isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Incorrect password'
      });
    }

    // Delete the student if the password is correct
    var deleteSql = 'DELETE FROM student WHERE studentID = ?';
    db.query(deleteSql, [studentID], function (err, result) {
      if (err) {
        console.error('SQL error:', err);
        return res.status(500).json({
          status: 'error',
          message: 'Failed to delete student'
        });
      }
      res.status(200).json({
        status: 'success',
        message: 'Student deleted successfully'
      });
    });
  });
});

// Endpoint to check and update attendance
app.post('/update-attendance', function (req, res) {
  var teacherId = req.body.teacherId;
  var currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  // Query to fetch students and their attendance for the current date
  var fetchSql = "\n    SELECT s.studentID AS studentId, \n      s.name, \n      s.gmail, \n      s.gender, \n      s.profile_pic, \n      s.parent_contact, \n      s.p_name,\n      a.status\n    FROM student s\n    LEFT JOIN attendance a ON s.studentID = a.studentID AND a.date = CURDATE()\n    WHERE s.teacher_id = ?;\n  ";
  db.query(fetchSql, [teacherId], function (err, results) {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to fetch students'
      });
    }

    // Iterate through results and update attendance if necessary
    var updates = results.map(function (student) {
      if (!student.status) {
        // Mark as absent if no attendance record exists for the current date
        return new Promise(function (resolve, reject) {
          var insertSql = 'INSERT INTO attendance (studentID, date, status) VALUES (?, ?, ?)';
          db.query(insertSql, [student.studentID, currentDate, 'Absent'], function (err, result) {
            if (err) {
              console.error('SQL error:', err);
              return reject(err);
            }
            resolve();
          });
        });
      }
      return Promise.resolve();
    });
    Promise.all(updates).then(function () {
      res.status(200).json({
        status: 'success',
        data: results.map(function (student) {
          return _objectSpread(_objectSpread({}, student), {}, {
            status: student.status || 'Absent'
          });
        })
      });
    })["catch"](function (err) {
      console.error('Error updating attendance:', err);
      res.status(500).json({
        status: 'error',
        message: 'Failed to update attendance'
      });
    });
  });
});

//update attendance status
app.post('/update-student-status', function (req, res) {
  console.log('Received request to update status:', req.body);
  var _req$body7 = req.body,
    studentId = _req$body7.studentId,
    newStatus = _req$body7.newStatus;
  var currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  console.log("Updating studentID: ".concat(studentId, ", newStatus: ").concat(newStatus, ", date: ").concat(currentDate));
  var updateSql = "\n    UPDATE attendance\n    SET status = ?\n    WHERE studentID = ? AND date = CURDATE();\n  ";
  db.query(updateSql, [newStatus, studentId], function (err, result) {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to update attendance status'
      });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No record found to update'
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Attendance status updated'
    });
  });
});

// Change password endpoint
app.put('/change-password/:id', function (req, res) {
  var id = req.params.id;
  var _req$body8 = req.body,
    currentPassword = _req$body8.currentPassword,
    newPassword = _req$body8.newPassword;

  // Fetch the user's current password from the database
  var sql = 'SELECT password FROM users WHERE id = ?';
  db.query(sql, [id], function (err, results) {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).send('Server error');
    }
    if (results.length === 0) {
      return res.status(404).send('User not found');
    }
    var user = results[0];
    var isPasswordValid = bcrypt.compareSync(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Current password is incorrect');
    }

    // Hash the new password before storing it in the database
    var hashedNewPassword = bcrypt.hashSync(newPassword, 8);
    var updateSql = 'UPDATE users SET password = ? WHERE id = ?';
    db.query(updateSql, [hashedNewPassword, id], function (err, result) {
      if (err) {
        console.error('SQL error:', err);
        return res.status(500).send('Server error');
      }
      res.status(200).send('Password changed successfully');
    });
  });
});

//dashboard
app.get('/attendance/today', function (req, res) {
  var teacherId = req.query.teacherId;
  var presentQuery = "\n    SELECT COUNT(*) AS present\n    FROM attendance\n    WHERE status = 'Present' AND date = CURDATE() AND studentID IN (\n      SELECT studentID\n      FROM student\n      WHERE teacher_Id = ?\n    );\n  ";
  var lateQuery = "\n    SELECT COUNT(*) AS late\n    FROM attendance\n    WHERE status = 'Late' AND date = CURDATE() AND studentID IN (\n      SELECT studentID\n      FROM student\n      WHERE teacher_Id = ?\n    );\n  ";
  var absentQuery = "\n    SELECT COUNT(*) AS absent\n    FROM attendance\n    WHERE status = 'Absent' AND date = CURDATE() AND studentID IN (\n      SELECT studentID\n      FROM student\n      WHERE teacher_Id = ?\n    );\n  ";
  var totalQuery = "\n    SELECT COUNT(*) AS total\n    FROM student\n    WHERE teacher_Id = ?;\n  ";
  var genderQuery = "\n    SELECT gender, COUNT(*) AS count\n    FROM student\n    WHERE teacher_Id = ?\n    GROUP BY gender;\n  ";
  db.query(presentQuery, [teacherId], function (err, presentResult) {
    if (err) {
      return res.status(500).send(err);
    }
    db.query(lateQuery, [teacherId], function (err, lateResult) {
      if (err) {
        return res.status(500).send(err);
      }
      db.query(absentQuery, [teacherId], function (err, absentResult) {
        if (err) {
          return res.status(500).send(err);
        }
        db.query(totalQuery, [teacherId], function (err, totalResult) {
          if (err) {
            return res.status(500).send(err);
          }
          db.query(genderQuery, [teacherId], function (err, genderResult) {
            if (err) {
              return res.status(500).send(err);
            }
            res.json({
              present: presentResult[0].present,
              late: lateResult[0].late,
              absent: absentResult[0].absent,
              total: totalResult[0].total,
              gender: genderResult
            });
          });
        });
      });
    });
  });
});
app.get('/attendance/daily', function (req, res) {
  var teacherId = req.query.teacherId;
  var dailyAttendanceQuery = "\n    SELECT DATE_FORMAT(date, '%a') AS day, COUNT(*) AS presentCount\n    FROM attendance\n    WHERE status = 'Present' AND WEEK(date) = WEEK(CURDATE()) AND studentID IN (\n      SELECT studentID\n      FROM student\n      WHERE teacher_Id = ?\n    )\n    GROUP BY day;\n  ";
  db.query(dailyAttendanceQuery, [teacherId], function (err, results) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});
app.get('/attendance/weekly', function (req, res) {
  var teacherId = req.query.teacherId;
  var weeklyQuery = "\n    SELECT CONCAT('Week ', WEEK(date)) AS week, COUNT(*) AS presentCount\n    FROM attendance\n    WHERE status = 'present' AND MONTH(date) = MONTH(CURDATE()) AND studentID IN (SELECT studentID FROM student WHERE teacher_Id = ?)\n    GROUP BY week;\n  ";
  db.query(weeklyQuery, [teacherId], function (err, weeklyResult) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(weeklyResult);
  });
});
app.get('/attendance/monthly', function (req, res) {
  var teacherId = req.query.teacherId;
  var weeklyQuery = "\n     SELECT DATE_FORMAT(date, '%b') AS month, COUNT(*) AS presentCount\n      FROM attendance\n      WHERE status = 'present' AND YEAR(date) = YEAR(CURDATE()) AND studentID IN (SELECT studentID FROM student WHERE teacher_Id = ?)\n      GROUP BY month\n  ";
  db.query(weeklyQuery, [teacherId], function (err, weeklyResult) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(weeklyResult);
  });
});

// Endpoint for fetching filtered students
app.get('/students/:id/filter', function (req, res) {
  var teacherId = req.params.id;
  var _req$query = req.query,
    startDate = _req$query.startDate,
    endDate = _req$query.endDate;

  // Adjust SQL query to use startDate and endDate
  var sql = "\nSELECT s.*, a.date AS attendanceDate, a.status AS attendanceStatus\nFROM student s\nLEFT JOIN (\n  SELECT studentID, date, status\n  FROM attendance\n  WHERE date BETWEEN ? AND ?\n) a ON s.studentID = a.studentID\nWHERE s.teacher_id = ?\n\n  ";
  db.query(sql, [startDate, endDate, teacherId], function (err, results) {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to fetch filtered students'
      });
    }
    res.status(200).json({
      status: 'success',
      data: results
    });
  });
});

//Dasboard top late,absent,present
var getStudentAttendance = function getStudentAttendance(status) {
  return function (req, res) {
    var teacherId = req.query.teacher_Id;
    var statusColumn = "".concat(status, "_count");
    var statusCondition = status.charAt(0).toUpperCase() + status.slice(1);
    var sql = "\n    SELECT s.studentID, s.name AS student_name, \n           COUNT(a.status) AS ".concat(statusColumn, "\n    FROM attendance a\n    JOIN student s ON a.studentID = s.studentID\n    WHERE a.status = ? AND s.teacher_Id = ?\n    GROUP BY s.studentID, s.name\n    ORDER BY ").concat(statusColumn, " DESC\n    LIMIT 5;\n  ");
    db.query(sql, [statusCondition, teacherId], function (err, results) {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: "Failed to fetch most ".concat(status, " students")
        });
      }
      res.status(200).json({
        status: 'success',
        data: results
      });
    });
  };
};
app.get('/attendance/most-late-student', getStudentAttendance('late'));
app.get('/attendance/most-present-student', getStudentAttendance('present'));
app.get('/attendance/most-absent-student', getStudentAttendance('absent'));

//filter
var getDateRange = function getDateRange(filter) {
  var today = new Date();
  var startDate = new Date();
  var endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // End of the current month

  if (filter === 'week') {
    startDate.setDate(today.getDate() - today.getDay()); // Start of the week
    endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6); // End of the week
  } else if (filter === 'month') {
    startDate.setDate(1); // Start of the month
  }
  return [startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]];
};
var createStudentFilterRoute = function createStudentFilterRoute(status) {
  return function (req, res) {
    var teacherId = req.query.teacher_Id;
    var filter = req.query.filter; // 'week' or 'month'
    var _getDateRange = getDateRange(filter),
      _getDateRange2 = _slicedToArray(_getDateRange, 2),
      startDate = _getDateRange2[0],
      endDate = _getDateRange2[1];
    var sql = "\n    SELECT s.studentID, s.name AS student_name, \n           COUNT(a.status) AS ".concat(status, "_count\n    FROM attendance a\n    JOIN student s ON a.studentID = s.studentID\n    WHERE a.status = ? AND s.teacher_Id = ?\n    AND a.date BETWEEN ? AND ?\n    GROUP BY s.studentID, s.name\n    ORDER BY ").concat(status, "_count DESC;\n  ");
    db.query(sql, [status.charAt(0).toUpperCase() + status.slice(1), teacherId, startDate, endDate], function (err, results) {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: "Failed to fetch most ".concat(status, " students")
        });
      }
      res.status(200).json({
        status: 'success',
        data: results
      });
    });
  };
};
app.get('/attendance/most-late-student-filter', createStudentFilterRoute('late'));
app.get('/attendance/most-present-student-filter', createStudentFilterRoute('present'));
app.get('/attendance/most-absent-student-filter', createStudentFilterRoute('absent'));

// Route to handle student addition
app.post('/add-students', function (req, res) {
  var _req$body9 = req.body,
    name = _req$body9.name,
    imageBase64 = _req$body9.imageBase64;
  if (!name || !imageBase64) {
    return res.status(400).json({
      error: 'Name and image are required'
    });
  }
  try {
    // Ensure imageBase64 is in proper format
    var base64Data = imageBase64.split(',')[1]; // Extract base64 part only

    // Decode Base64 image
    var imageBuffer = Buffer.from(base64Data, 'base64');

    // Insert data into MySQL database
    var query = 'INSERT INTO student (name, profile_pic) VALUES (?, ?)';
    db.query(query, [name, imageBuffer], function (err, results) {
      if (err) {
        console.error('Error inserting student into database:', err);
        return res.status(500).json({
          error: 'Database error'
        });
      }
      res.status(200).json({
        success: true,
        studentId: results.insertId
      });
    });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(400).json({
      error: 'Invalid image data'
    });
  }
});
app.get('/profile/:id', function (req, res) {
  var userId = req.params.id;

  // SQL query to fetch user profile
  var sql = 'SELECT id, firstname, lastname, email, profile_pic FROM users WHERE id = ?';
  db.query(sql, [userId], function (err, results) {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({
        error: 'Database error'
      });
    }
    if (results.length === 0) {
      return res.status(404).json({
        error: 'User not found'
      });
    }
    var user = results[0];

    // Assuming `profile_pic` is stored as a Base64 string
    res.json({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      profilePic: user.profile_pic // Include the Base64 image here
    });
  });
});

// notifications
app.get('/notifications', function (req, res) {
  var teacherId = req.query.teacherId;
  if (!teacherId) {
    return res.status(400).json({
      error: 'teacherId is required'
    });
  }

  // Query for students who are absent for more than 1 day and have no notification sent
  var query = "\n    SELECT student.studentID, student.name, COUNT(attendance.status) AS absence_count \n    FROM attendance \n    JOIN student ON attendance.studentID = student.studentID \n    WHERE student.teacher_Id = ? \n      AND attendance.status = 'Absent' \n      AND student.notif IS NULL\n    GROUP BY attendance.studentID\n    HAVING absence_count > 1;\n  ";
  db.query(query, [teacherId], function (err, results) {
    if (err) throw err;

    // Create notification messages and include studentId
    var notifications = results.map(function (row) {
      return {
        studentId: row.studentID,
        // Include studentID in the response
        message: "".concat(row.name, " has been absent for ").concat(row.absence_count, " days.")
      };
    });

    // Respond with the notification array
    res.json(notifications);
  });
});

//update notif status
app.put('/students/:studentId/notif', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var studentId, notif;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          studentId = req.params.studentId;
          notif = req.body.notif;
          _context3.prev = 2;
          _context3.next = 5;
          return db.query('UPDATE student SET notif = ? WHERE studentID = ?', [notif, studentId]);
        case 5:
          res.status(200).send('Notification updated successfully');
          _context3.next = 11;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](2);
          res.status(500).send('Error updating notification');
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[2, 8]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
app.listen(port, function () {
  console.log("Server running on port ".concat(port));
});