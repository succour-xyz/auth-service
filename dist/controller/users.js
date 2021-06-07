"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;

var _secure = require("uid/secure");

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var users = [];

var Users = function Users() {
  _classCallCheck(this, Users);
};

exports["default"] = Users;

_defineProperty(Users, "getAllUsers", function (_req, res) {
  res.sendStatus(200).json({
    users: users,
  });
});

_defineProperty(Users, "addUser", function (req, res) {
  var body = req.body;
  var newUser = {
    name: body.name,
    id: (0, _secure.uid)(),
  };
  users.push(newUser);
  return res.sendStatus(201).json({
    message: "Added user",
    users: users,
    newUser: newUser,
  });
});

_defineProperty(Users, "editUser", function (req, res) {
  var params = req.params;
  var uid = params.userId;
  var body = req.body;
  var userIndex = users.findIndex(function (userItem) {
    return userItem.id === uid;
  });

  if (userIndex >= 0) {
    users[userIndex] = {
      id: users[userIndex].id,
      name: body.name,
    };
    return res.sendStatus(200).json({
      message: "Updated user",
      users: users,
    });
  }

  return res.sendStatus(404).json({
    message: "Could not find user",
  });
});

_defineProperty(Users, "deleteUser", function (req, res) {
  var params = req.params;
  users = users.filter(function (userItem) {
    return userItem.id !== params.userId;
  });
  res.sendStatus(200).json({
    message: "Deleted User",
    users: users,
  });
});
