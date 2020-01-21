const express = require('express');
const router = express.Router();
const Log = require('../models/log.model');
const { GetAll, Insert, DeleteById } = require('../util/genericMethods');

router.route('/:id?')
  .get(async (req, res) => await GetAll(Log, req, res))
  .post(async (req, res) => {
    res.socket.emit('bcts-event', req.body);
    await Insert(Log, req, res);
  })
  .delete(async (req, res) => await DeleteById(Log, req, res));

module.exports = router;
