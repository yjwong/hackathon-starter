'use strict';
const User = require('../models/User');

/**
 * GET /onboarding
 * Onboarding page.
 */
exports.getOnboarding = async function (req, res) {
    if (!req.user.emailTypes) {
        req.user.emailTypes = [];
    }

    res.render('onboarding', {
        title: 'Onboarding',
        types: req.user.emailTypes.map(type => type.name)
    });
};

/**
 * POST /onboarding
 * Onboarding page.
 */
exports.postOnboarding = async function (req, res) {
  req.assert('types', 'Type cannot be empty').notEmpty();
  req.body.types = req.body.types.filter(type => type);
  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/onboarding');
  }

  const emailTypes = req.user.emailTypes;
  for (const type of req.body.types) {
    req.user.addEmailType(type);
  }

  await req.user.save();
  res.redirect('/types');
};

/**
 * GET /onboarding/samples
 * Onboarding page.
 */
exports.getOnboardingSamples = (req, res) => {
  res.render('onboarding-samples', {
    title: 'Onboarding Samples'
  });
}