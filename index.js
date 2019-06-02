/*!
 * express-bakery
 * Copyright(c) 2019 William Bert
 * ISC Licensed
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */
const debug = require('debug')('express-bakery');

/**
 * Module exports.
 * @public
 */

module.exports = bakery;

/**
 * Make cookies from query parameters.
 *
 * See README for options.
 *
 * @param {Object} opts Options.
 * @param {Array} opts.whitelist Whitelist of query param/cookie names to accept.
 * @return {Function} middleware
 * @public
 */

function bakery(opts) {
  opts = opts || {};
  const queryParamName = opts.queryParam || 'bake';
  const whitelist = opts.whitelist || [];
  debug(`opts: ${JSON.stringify(opts)}`);

  return function(req, res, next) {
    debug(`req.query[queryParamName]: ${req.query[queryParamName]}`);
    if (!req.query[queryParamName]) return next();

    const recipes = req.query.bake.split(',');
    debug(`recipes: ${recipes} ${recipes.length}`);
    if (recipes.length > 0) {
      const bake = bakeCookie.bind(null, req, res);
      debug(`bake: ${bake}`);

      recipes
        .map(recipe => recipe.split(':'))
        .filter(([name, _]) => whitelist.includes(name))
        .map(bake);
    }
    next();
  };
}

function bakeCookie(req, res, [name, value]) {
  debug(`bakeCookie: ${name}=${value}`);
  if (value && value.trim().length > 0) {
    value = value.trim();
    if (req && req.cookies) req.cookies[name] = value;
    if (res) res.cookie(name, value);
  } else {
    if (res) res.clearCookie(name);
  }
}
