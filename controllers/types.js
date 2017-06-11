'use strict';
const User = require('../models/User');

/**
 * GET /types
 */
exports.getTypes = (req, res) => {
  res.render('types', {
    title: 'Email Types',
    types: req.user.emailTypes
  });
};

/**
 * GET /types/:id
 */
exports.getType = (req, res) => {
  const type = req.user.emailTypes
    .find(type => type.id === req.params.id);
  return res.render('type', {
    title: 'Email Type',
    type
  });
};

/**
 * POST /types/:id/samples/:sampleId/keywords
 */
exports.postTypeSampleSaveKeywords = async function (req, res) {
  req.assert('selectedKeywords', 'There should be 1 or more selected keywords or phrases').notEmpty();
  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('back');
  }

  const user = await User.findOne({ 'emailTypes._id': req.params.id });
  const type = user.emailTypes.id(req.params.id);
  const sample = type.samples.id(req.params.sampleId);
  Array.prototype.push.apply(sample.keywords, req.body.selectedKeywords.split(','));
  await user.save();

  req.flash('success', { msg: 'Keywords successfully saved' });
  return res.redirect('back');
};

/**
 * GET /types/:id/responses
 */
exports.getTypeResponses = async function (req, res) {
  const type = req.user.emailTypes
    .find(type => type.id === req.params.id);
  return res.render('type-responses', {
    title: 'Type Responses',
    type
  });
};