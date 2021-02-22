/**
 * Initialize a compiler.
 *
 * @param {Type} name
 * @return {Type}
 * @api public
 */

export default class Compiler {
  constructor(opts) {
    this.options = opts || {};
  }

  /**
   * Emit `str`
   */

  emit(str) {
    return str;
  }

  /**
   * Visit `node`.
   */
  visit(node) {
    return this[node.type](node);
  }

  /**
   * Map visit over array of `nodes`, optionally using a `delim`
   */

  mapVisit(nodes, delim) {
    var buf = "";
    delim = delim || "";

    for (var i = 0, length = nodes.length; i < length; i++) {
      buf += this.visit(nodes[i]);
      if (delim && i < length - 1) buf += this.emit(delim);
    }

    return buf;
  }
}
