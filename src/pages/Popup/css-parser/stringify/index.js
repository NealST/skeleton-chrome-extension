import Identity from './identity';

/**
 * Stringfy the given AST `node`.
 *
 * Options:
 *
 *  - `compress` space-optimized output
 *  - `sourcemap` return an object with `.code` and `.map`
 *
 * @param {Object} node
 * @param {Object} [options]
 * @return {String}
 * @api public
 */

export default function(node, options){
  options = options || {};

  const compiler = new Identity(options);

  var code = compiler.compile(node);
  return code;
};