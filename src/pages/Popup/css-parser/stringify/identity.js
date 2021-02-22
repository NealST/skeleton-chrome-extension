/**
 * Module dependencies.
 */

import Base from "./compiler";

class Compiler extends Base {
  constructor(options) {
    options = options || {};
    super(options);
    this.indentation = options.indent;
  }
  /**
   * Compile `node`.
   */
  compile(node) {
    return this.stylesheet(node);
  }

  /**
   * Visit stylesheet node.
   */

  stylesheet(node) {
    return this.mapVisit(node.stylesheet.rules, "\n\n");
  }

  /**
   * Visit comment node.
   */
  comment(node) {
    return this.emit(this.indent() + "/*" + node.comment + "*/", node.position);
  }

  /**
   * Visit import node.
   */

  import(node) {
    return this.emit("@import " + node.import + ";", node.position);
  }

  /**
   * Visit media node.
   */

  media(node) {
    return (
      this.emit("@media " + node.media, node.position) +
      this.emit(" {\n" + this.indent(1)) +
      this.mapVisit(node.rules, "\n\n") +
      this.emit(this.indent(-1) + "\n}")
    );
  }

  /**
   * Visit document node.
   */
  document(node) {
    var doc = "@" + (node.vendor || "") + "document " + node.document;

    return (
      this.emit(doc, node.position) +
      this.emit(" " + " {\n" + this.indent(1)) +
      this.mapVisit(node.rules, "\n\n") +
      this.emit(this.indent(-1) + "\n}")
    );
  }

  /**
   * Visit charset node.
   */

  charset(node) {
    return this.emit("@charset " + node.charset + ";", node.position);
  }

  /**
   * Visit namespace node.
   */

  namespace(node) {
    return this.emit("@namespace " + node.namespace + ";", node.position);
  }

  /**
   * Visit supports node.
   */

  supports(node) {
    return (
      this.emit("@supports " + node.supports, node.position) +
      this.emit(" {\n" + this.indent(1)) +
      this.mapVisit(node.rules, "\n\n") +
      this.emit(this.indent(-1) + "\n}")
    );
  }

  /**
   * Visit keyframes node.
   */

  keyframes(node) {
    return (
      this.emit(
        "@" + (node.vendor || "") + "keyframes " + node.name,
        node.position
      ) +
      this.emit(" {\n" + this.indent(1)) +
      this.mapVisit(node.keyframes, "\n") +
      this.emit(this.indent(-1) + "}")
    );
  }

  /**
   * Visit keyframe node.
   */

  keyframe(node) {
    var decls = node.declarations;

    return (
      this.emit(this.indent()) +
      this.emit(node.values.join(", "), node.position) +
      this.emit(" {\n" + this.indent(1)) +
      this.mapVisit(decls, "\n") +
      this.emit(this.indent(-1) + "\n" + this.indent() + "}\n")
    );
  }

  /**
   * Visit page node.
   */

  page(node) {
    var sel = node.selectors.length ? node.selectors.join(", ") + " " : "";

    return (
      this.emit("@page " + sel, node.position) +
      this.emit("{\n") +
      this.emit(this.indent(1)) +
      this.mapVisit(node.declarations, "\n") +
      this.emit(this.indent(-1)) +
      this.emit("\n}")
    );
  }

  /**
   * Visit host node.
   */

  host(node) {
    return (
      this.emit("@host", node.position) +
      this.emit(" {\n" + this.indent(1)) +
      this.mapVisit(node.rules, "\n\n") +
      this.emit(this.indent(-1) + "\n}")
    );
  }

  /**
   * Visit rule node.
   */

  rule(node) {
    var indent = this.indent();
    var decls = node.declarations;
    if (!decls.length) return "";

    return (
      this.emit(
        node.selectors
          .map(function (s) {
            return indent + s;
          })
          .join(",\n"),
        node.position
      ) +
      this.emit(" {\n") +
      this.emit(this.indent(1)) +
      this.mapVisit(decls, "\n") +
      this.emit(this.indent(-1)) +
      this.emit("\n" + this.indent() + "}")
    );
  }

  /**
   * Visit declaration node.
   */

  declaration(node) {
    return (
      this.emit(this.indent()) +
      this.emit(node.property + ": " + node.value, node.position) +
      this.emit(";")
    );
  }

  /**
   * Increase, decrease or return current indentation.
   */

  indent(level) {
    this.level = this.level || 1;

    if (null != level) {
      this.level += level;
      return "";
    }

    return Array(this.level).join(this.indentation || "  ");
  }
}

/**
 * Visit custom-media node.
 */

Compiler.prototype["custom-media"] = function (node) {
  return this.emit(
    "@custom-media " + node.name + " " + node.media + ";",
    node.position
  );
};

/**
 * Visit font-face node.
 */

Compiler.prototype["font-face"] = function (node) {
  return (
    this.emit("@font-face ", node.position) +
    this.emit("{\n") +
    this.emit(this.indent(1)) +
    this.mapVisit(node.declarations, "\n") +
    this.emit(this.indent(-1)) +
    this.emit("\n}")
  );
};

export default Compiler;
