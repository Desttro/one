import { i as getTokenValue, k as isServer, e as useIsomorphicLayoutEffect, l as createEmitter } from "./authClient-DTdP_buj.js";
import { a as requireReactDom, r as reactExports, j as jsxRuntimeExports, R as React } from "../_virtual_one-entry.js";
var reactDomExports = requireReactDom();
function storeError() {
  return new Error("Store is closed");
}
function transactionError() {
  return new Error("Transaction is closed");
}
function throwIfStoreClosed(store) {
  if (store.closed) {
    throw storeError();
  }
}
function transactionIsClosedRejection() {
  return Promise.reject(transactionError());
}
function maybeTransactionIsClosedRejection(transaction) {
  return transaction.closed ? transactionIsClosedRejection() : void 0;
}
function storeIsClosedRejection() {
  return Promise.reject(storeError());
}
function assert(b, msg = "Assertion failed") {
  if (!b) {
    throw new Error(typeof msg === "string" ? msg : msg());
  }
}
function assertString(v) {
  assertType(v, "string");
}
function assertNumber(v) {
  assertType(v, "number");
}
function assertBoolean(v) {
  assertType(v, "boolean");
}
function assertType(v, t2) {
  if (typeof v !== t2) {
    throwInvalidType(v, t2);
  }
}
function assertObject(v) {
  if (v === null) {
    throwInvalidType(v, "object");
  }
  assertType(v, "object");
}
function assertArray(v) {
  if (!Array.isArray(v)) {
    throwInvalidType(v, "array");
  }
}
function invalidType(v, t2) {
  let s = "Invalid type: ";
  if (v === null || v === void 0) {
    s += v;
  } else {
    s += `${typeof v} \`${v}\``;
  }
  return s + `, expected ${t2}`;
}
function throwInvalidType(v, t2) {
  throw new Error(invalidType(v, t2));
}
function assertNotNull(v) {
  if (v === null) {
    throw new Error("Expected non-null value");
  }
}
function unreachable(_) {
  throw new Error("Unreachable");
}
var { hasOwn } = Object;
function deepFreeze(v) {
  {
    return v;
  }
}
function deepFreezeAllowUndefined(v) {
  if (v === void 0) {
    return void 0;
  }
  return deepFreeze(v);
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, {
    get: all[name],
    enumerable: true
  });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget);
function joinIssues(left, right) {
  return left ? {
    ok: false,
    code: "join",
    left,
    right
  } : right;
}
function prependPath(key, tree) {
  return {
    ok: false,
    code: "prepend",
    key,
    tree
  };
}
function cloneIssueWithPath(tree, path) {
  const code = tree.code;
  switch (code) {
    case "invalid_type":
      return {
        code,
        path,
        expected: tree.expected
      };
    case "invalid_literal":
      return {
        code,
        path,
        expected: tree.expected
      };
    case "missing_value":
      return {
        code,
        path
      };
    case "invalid_length":
      return {
        code,
        path,
        minLength: tree.minLength,
        maxLength: tree.maxLength
      };
    case "unrecognized_keys":
      return {
        code,
        path,
        keys: tree.keys
      };
    case "invalid_union":
      return {
        code,
        path,
        tree: tree.tree
      };
    default:
      return {
        code,
        path,
        error: tree.error
      };
  }
}
function collectIssues(tree, path = [], issues = []) {
  for (; ; ) {
    if (tree.code === "join") {
      collectIssues(tree.left, path.slice(), issues);
      tree = tree.right;
    } else if (tree.code === "prepend") {
      path.push(tree.key);
      tree = tree.tree;
    } else {
      if (tree.code === "custom_error" && typeof tree.error === "object" && tree.error.path !== void 0) {
        path.push(...tree.error.path);
      }
      issues.push(cloneIssueWithPath(tree, path));
      return issues;
    }
  }
}
function separatedList(list, sep) {
  if (list.length === 0) {
    return "nothing";
  } else if (list.length === 1) {
    return list[0];
  } else {
    return `${list.slice(0, -1).join(", ")} ${sep} ${list[list.length - 1]}`;
  }
}
function formatLiteral(value) {
  return typeof value === "bigint" ? `${value}n` : JSON.stringify(value);
}
function countIssues(tree) {
  let count = 0;
  for (; ; ) {
    if (tree.code === "join") {
      count += countIssues(tree.left);
      tree = tree.right;
    } else if (tree.code === "prepend") {
      tree = tree.tree;
    } else {
      return count + 1;
    }
  }
}
function formatIssueTree(tree) {
  let path = "";
  let count = 0;
  for (; ; ) {
    if (tree.code === "join") {
      count += countIssues(tree.right);
      tree = tree.left;
    } else if (tree.code === "prepend") {
      path += "." + tree.key;
      tree = tree.tree;
    } else {
      break;
    }
  }
  let message2 = "validation failed";
  if (tree.code === "invalid_type") {
    message2 = `expected ${separatedList(tree.expected, "or")}`;
  } else if (tree.code === "invalid_literal") {
    message2 = `expected ${separatedList(tree.expected.map(formatLiteral), "or")}`;
  } else if (tree.code === "missing_value") {
    message2 = `missing value`;
  } else if (tree.code === "unrecognized_keys") {
    const keys = tree.keys;
    message2 = `unrecognized ${keys.length === 1 ? "key" : "keys"} ${separatedList(keys.map(formatLiteral), "and")}`;
  } else if (tree.code === "invalid_length") {
    const min = tree.minLength;
    const max = tree.maxLength;
    message2 = `expected an array with `;
    if (min > 0) {
      if (max === min) {
        message2 += `${min}`;
      } else if (max !== void 0) {
        message2 += `between ${min} and ${max}`;
      } else {
        message2 += `at least ${min}`;
      }
    } else {
      message2 += `at most ${max}`;
    }
    message2 += ` item(s)`;
  } else if (tree.code === "custom_error") {
    const error = tree.error;
    if (typeof error === "string") {
      message2 = error;
    } else if (error !== void 0) {
      if (error.message !== void 0) {
        message2 = error.message;
      }
      if (error.path !== void 0) {
        path += "." + error.path.join(".");
      }
    }
  }
  let msg = `${tree.code} at .${path.slice(1)} (${message2})`;
  if (count === 1) {
    msg += ` (+ 1 other issue)`;
  } else if (count > 1) {
    msg += ` (+ ${count} other issues)`;
  }
  return msg;
}
class ValitaError extends Error {
  get issues() {
    if (this._issues === void 0) {
      this._issues = collectIssues(this.issueTree);
    }
    return this._issues;
  }
  constructor(issueTree) {
    super(formatIssueTree(issueTree));
    this.issueTree = issueTree;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = new.target.name;
    this._issues = void 0;
  }
}
class ErrImpl {
  get issues() {
    if (this._issues === void 0) {
      this._issues = collectIssues(this.issueTree);
    }
    return this._issues;
  }
  get message() {
    if (this._message === void 0) {
      this._message = formatIssueTree(this.issueTree);
    }
    return this._message;
  }
  throw() {
    throw new ValitaError(this.issueTree);
  }
  constructor(issueTree) {
    this.issueTree = issueTree;
    this.ok = false;
    this._issues = void 0;
    this._message = void 0;
  }
}
function ok(value) {
  return {
    ok: true,
    value
  };
}
function err(error) {
  return new ErrImpl({
    ok: false,
    code: "custom_error",
    error
  });
}
function isObject(v) {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}
const FLAG_FORBID_EXTRA_KEYS = 1;
const FLAG_STRIP_EXTRA_KEYS = 2;
const FLAG_MISSING_VALUE = 4;
let AbstractType$1 = class AbstractType {
  optional(defaultFn) {
    const optional = new Optional(this);
    if (!defaultFn) {
      return optional;
    }
    return new TransformType(optional, (v) => {
      return v === void 0 ? {
        ok: true,
        value: defaultFn()
      } : void 0;
    });
  }
  default(defaultValue) {
    const defaultResult = ok(defaultValue);
    return new TransformType(this.optional(), (v) => {
      return v === void 0 ? defaultResult : void 0;
    });
  }
  assert(func, error) {
    const err2 = {
      ok: false,
      code: "custom_error",
      error
    };
    return new TransformType(this, (v, options) => func(v, options) ? void 0 : err2);
  }
  map(func) {
    return new TransformType(this, (v, options) => ({
      ok: true,
      value: func(v, options)
    }));
  }
  chain(func) {
    return new TransformType(this, (v, options) => {
      const r = func(v, options);
      return r.ok ? r : r.issueTree;
    });
  }
};
class Type extends AbstractType$1 {
  /**
   * Return new validator that accepts both the original type and `null`.
   */
  nullable() {
    return new Nullable(this);
  }
  toTerminals(func) {
    func(this);
  }
  /**
   * Parse a value without throwing.
   */
  try(v, options) {
    let flags = FLAG_FORBID_EXTRA_KEYS;
    if ((options === null || options === void 0 ? void 0 : options.mode) === "passthrough") {
      flags = 0;
    } else if ((options === null || options === void 0 ? void 0 : options.mode) === "strip") {
      flags = FLAG_STRIP_EXTRA_KEYS;
    }
    const r = this.func(v, flags);
    if (r === void 0) {
      return {
        ok: true,
        value: v
      };
    } else if (r.ok) {
      return {
        ok: true,
        value: r.value
      };
    } else {
      return new ErrImpl(r);
    }
  }
  /**
   * Parse a value. Throw a ValitaError on failure.
   */
  parse(v, options) {
    let flags = FLAG_FORBID_EXTRA_KEYS;
    if ((options === null || options === void 0 ? void 0 : options.mode) === "passthrough") {
      flags = 0;
    } else if ((options === null || options === void 0 ? void 0 : options.mode) === "strip") {
      flags = FLAG_STRIP_EXTRA_KEYS;
    }
    const r = this.func(v, flags);
    if (r === void 0) {
      return v;
    } else if (r.ok) {
      return r.value;
    } else {
      throw new ValitaError(r);
    }
  }
}
class Nullable extends Type {
  func(v, flags) {
    return v === null ? void 0 : this.type.func(v, flags);
  }
  toTerminals(func) {
    func(nullSingleton);
    this.type.toTerminals(func);
  }
  nullable() {
    return this;
  }
  constructor(type) {
    super();
    this.type = type;
    this.name = "nullable";
  }
}
class Optional extends AbstractType$1 {
  func(v, flags) {
    return v === void 0 || flags & FLAG_MISSING_VALUE ? void 0 : this.type.func(v, flags);
  }
  toTerminals(func) {
    func(this);
    func(undefinedSingleton);
    this.type.toTerminals(func);
  }
  optional(defaultFn) {
    if (!defaultFn) {
      return this;
    }
    return new TransformType(this, (v) => {
      return v === void 0 ? {
        ok: true,
        value: defaultFn()
      } : void 0;
    });
  }
  constructor(type) {
    super();
    this.type = type;
    this.name = "optional";
  }
}
function setBit(bits, index) {
  if (typeof bits !== "number") {
    const idx = index >> 5;
    for (let i = bits.length; i <= idx; i++) {
      bits.push(0);
    }
    bits[idx] |= 1 << index % 32;
    return bits;
  } else if (index < 32) {
    return bits | 1 << index;
  } else {
    return setBit([
      bits,
      0
    ], index);
  }
}
function getBit(bits, index) {
  if (typeof bits === "number") {
    return index < 32 ? bits >>> index & 1 : 0;
  } else {
    return bits[index >> 5] >>> index % 32 & 1;
  }
}
class ObjectType extends Type {
  check(func, error) {
    var _a;
    const issue = {
      ok: false,
      code: "custom_error",
      error
    };
    return new ObjectType(this.shape, this.restType, [
      ...(_a = this.checks) !== null && _a !== void 0 ? _a : [],
      {
        func,
        issue
      }
    ]);
  }
  func(v, flags) {
    if (!isObject(v)) {
      return this._invalidType;
    }
    let func = this._func;
    if (func === void 0) {
      func = createObjectMatcher(this.shape, this.restType, this.checks);
      this._func = func;
    }
    return func(v, flags);
  }
  rest(restType) {
    return new ObjectType(this.shape, restType);
  }
  extend(shape) {
    return new ObjectType(Object.assign(Object.assign({}, this.shape), shape), this.restType);
  }
  pick(...keys) {
    const shape = {};
    keys.forEach((key) => {
      shape[key] = this.shape[key];
    });
    return new ObjectType(shape, void 0);
  }
  omit(...keys) {
    const shape = Object.assign({}, this.shape);
    keys.forEach((key) => {
      delete shape[key];
    });
    return new ObjectType(shape, this.restType);
  }
  partial() {
    var _a;
    const shape = {};
    Object.keys(this.shape).forEach((key) => {
      shape[key] = this.shape[key].optional();
    });
    const rest = (_a = this.restType) === null || _a === void 0 ? void 0 : _a.optional();
    return new ObjectType(shape, rest);
  }
  constructor(shape, restType, checks) {
    super();
    this.shape = shape;
    this.restType = restType;
    this.checks = checks;
    this.name = "object";
    this._invalidType = {
      ok: false,
      code: "invalid_type",
      expected: [
        "object"
      ]
    };
  }
}
function createObjectMatcher(shape, rest, checks) {
  const requiredKeys = [];
  const optionalKeys = [];
  for (const key in shape) {
    let hasOptional = false;
    shape[key].toTerminals((t2) => {
      hasOptional || (hasOptional = t2.name === "optional");
    });
    if (hasOptional) {
      optionalKeys.push(key);
    } else {
      requiredKeys.push(key);
    }
  }
  const keys = [
    ...requiredKeys,
    ...optionalKeys
  ];
  const totalCount = keys.length;
  if (totalCount === 0 && (rest === null || rest === void 0 ? void 0 : rest.name) === "unknown") {
    return function(obj, _) {
      if (checks !== void 0) {
        for (let i = 0; i < checks.length; i++) {
          if (!checks[i].func(obj)) {
            return checks[i].issue;
          }
        }
      }
      return void 0;
    };
  }
  const types = keys.map((key) => shape[key]);
  const requiredCount = requiredKeys.length;
  const invertedIndexes = /* @__PURE__ */ Object.create(null);
  keys.forEach((key, index) => {
    invertedIndexes[key] = ~index;
  });
  const missingValues = requiredKeys.map((key) => prependPath(key, {
    ok: false,
    code: "missing_value"
  }));
  function set(obj, key, value) {
    if (key === "__proto__") {
      Object.defineProperty(obj, key, {
        value,
        writable: true,
        enumerable: true,
        configurable: true
      });
    } else {
      obj[key] = value;
    }
  }
  return function(obj, flags) {
    let copied = false;
    let output = obj;
    let issues;
    let unrecognized = void 0;
    let seenBits = 0;
    let seenCount = 0;
    if (flags & FLAG_FORBID_EXTRA_KEYS || flags & FLAG_STRIP_EXTRA_KEYS || rest !== void 0) {
      for (const key in obj) {
        const value = obj[key];
        const index = ~invertedIndexes[key];
        let r;
        if (index >= 0) {
          seenCount++;
          seenBits = setBit(seenBits, index);
          r = types[index].func(value, flags);
        } else if (rest !== void 0) {
          r = rest.func(value, flags);
        } else {
          if (flags & FLAG_FORBID_EXTRA_KEYS) {
            if (unrecognized === void 0) {
              unrecognized = [
                key
              ];
            } else {
              unrecognized.push(key);
            }
          } else if (flags & FLAG_STRIP_EXTRA_KEYS && issues === void 0 && !copied) {
            output = {};
            copied = true;
            for (let m = 0; m < totalCount; m++) {
              if (getBit(seenBits, m)) {
                const k = keys[m];
                set(output, k, obj[k]);
              }
            }
          }
          continue;
        }
        if (r === void 0) {
          if (copied && issues === void 0) {
            set(output, key, value);
          }
        } else if (!r.ok) {
          issues = joinIssues(issues, prependPath(key, r));
        } else if (issues === void 0) {
          if (!copied) {
            output = {};
            copied = true;
            if (rest === void 0) {
              for (let m = 0; m < totalCount; m++) {
                if (m !== index && getBit(seenBits, m)) {
                  const k = keys[m];
                  set(output, k, obj[k]);
                }
              }
            } else {
              for (const k in obj) {
                set(output, k, obj[k]);
              }
            }
          }
          set(output, key, r.value);
        }
      }
    }
    if (seenCount < totalCount) {
      for (let i = 0; i < totalCount; i++) {
        if (getBit(seenBits, i)) {
          continue;
        }
        const key = keys[i];
        const value = obj[key];
        let keyFlags = flags & ~FLAG_MISSING_VALUE;
        if (value === void 0 && !(key in obj)) {
          if (i < requiredCount) {
            issues = joinIssues(issues, missingValues[i]);
            continue;
          }
          keyFlags |= FLAG_MISSING_VALUE;
        }
        const r = types[i].func(value, keyFlags);
        if (r === void 0) {
          if (copied && issues === void 0 && !(keyFlags & FLAG_MISSING_VALUE)) {
            set(output, key, value);
          }
        } else if (!r.ok) {
          issues = joinIssues(issues, prependPath(key, r));
        } else if (issues === void 0) {
          if (!copied) {
            output = {};
            copied = true;
            if (rest === void 0) {
              for (let m = 0; m < totalCount; m++) {
                if (m < i || getBit(seenBits, m)) {
                  const k = keys[m];
                  set(output, k, obj[k]);
                }
              }
            } else {
              for (const k in obj) {
                set(output, k, obj[k]);
              }
              for (let m = 0; m < i; m++) {
                if (!getBit(seenBits, m)) {
                  const k = keys[m];
                  set(output, k, obj[k]);
                }
              }
            }
          }
          set(output, key, r.value);
        }
      }
    }
    if (unrecognized !== void 0) {
      issues = joinIssues(issues, {
        ok: false,
        code: "unrecognized_keys",
        keys: unrecognized
      });
    }
    if (issues === void 0 && checks !== void 0) {
      for (let i = 0; i < checks.length; i++) {
        if (!checks[i].func(output)) {
          return checks[i].issue;
        }
      }
    }
    if (issues === void 0 && copied) {
      return {
        ok: true,
        value: output
      };
    } else {
      return issues;
    }
  };
}
class ArrayOrTupleType extends Type {
  func(arr2, flags) {
    var _a;
    if (!Array.isArray(arr2)) {
      return this.invalidType;
    }
    const length = arr2.length;
    const minLength = this.minLength;
    const maxLength = (_a = this.maxLength) !== null && _a !== void 0 ? _a : Infinity;
    if (length < minLength || length > maxLength) {
      return this.invalidLength;
    }
    const headEnd = this.prefix.length;
    const tailStart = arr2.length - this.suffix.length;
    let issueTree = void 0;
    let output = arr2;
    for (let i = 0; i < arr2.length; i++) {
      const type = i < headEnd ? this.prefix[i] : i >= tailStart ? this.suffix[i - tailStart] : this.restType;
      const r = type.func(arr2[i], flags);
      if (r !== void 0) {
        if (r.ok) {
          if (output === arr2) {
            output = arr2.slice();
          }
          output[i] = r.value;
        } else {
          issueTree = joinIssues(issueTree, prependPath(i, r));
        }
      }
    }
    if (issueTree) {
      return issueTree;
    } else if (arr2 === output) {
      return void 0;
    } else {
      return {
        ok: true,
        value: output
      };
    }
  }
  concat(type) {
    if (this.rest) {
      if (type.rest) {
        throw new TypeError("can not concatenate two variadic types");
      }
      return new ArrayOrTupleType(this.prefix, this.rest, [
        ...this.suffix,
        ...type.prefix,
        ...type.suffix
      ]);
    } else if (type.rest) {
      return new ArrayOrTupleType([
        ...this.prefix,
        ...this.suffix,
        ...type.prefix
      ], type.rest, type.suffix);
    } else {
      return new ArrayOrTupleType([
        ...this.prefix,
        ...this.suffix,
        ...type.prefix,
        ...type.suffix
      ], type.rest, type.suffix);
    }
  }
  constructor(prefix, rest, suffix) {
    super();
    this.prefix = prefix;
    this.rest = rest;
    this.suffix = suffix;
    this.name = "array";
    this.restType = rest !== null && rest !== void 0 ? rest : never();
    this.minLength = this.prefix.length + this.suffix.length;
    this.maxLength = rest ? void 0 : this.minLength;
    this.invalidType = {
      ok: false,
      code: "invalid_type",
      expected: [
        "array"
      ]
    };
    this.invalidLength = {
      ok: false,
      code: "invalid_length",
      minLength: this.minLength,
      maxLength: this.maxLength
    };
  }
}
function toInputType(v) {
  const type = typeof v;
  if (type !== "object") {
    return type;
  } else if (v === null) {
    return "null";
  } else if (Array.isArray(v)) {
    return "array";
  } else {
    return type;
  }
}
function dedup(arr2) {
  return Array.from(new Set(arr2));
}
function findCommonKeys(rs) {
  const map = /* @__PURE__ */ new Map();
  rs.forEach((r) => {
    for (const key in r) {
      map.set(key, (map.get(key) || 0) + 1);
    }
  });
  const result = [];
  map.forEach((count, key) => {
    if (count === rs.length) {
      result.push(key);
    }
  });
  return result;
}
function groupTerminals(terminals) {
  const order = /* @__PURE__ */ new Map();
  const literals = /* @__PURE__ */ new Map();
  const types = /* @__PURE__ */ new Map();
  const unknowns = [];
  const optionals = [];
  const expectedTypes = [];
  terminals.forEach(({ root, terminal }) => {
    var _a;
    order.set(root, (_a = order.get(root)) !== null && _a !== void 0 ? _a : order.size);
    if (terminal.name === "never") ;
    else if (terminal.name === "optional") {
      optionals.push(root);
    } else if (terminal.name === "unknown") {
      unknowns.push(root);
    } else if (terminal.name === "literal") {
      const roots = literals.get(terminal.value) || [];
      roots.push(root);
      literals.set(terminal.value, roots);
      expectedTypes.push(toInputType(terminal.value));
    } else {
      const roots = types.get(terminal.name) || [];
      roots.push(root);
      types.set(terminal.name, roots);
      expectedTypes.push(terminal.name);
    }
  });
  literals.forEach((roots, value) => {
    const options = types.get(toInputType(value));
    if (options) {
      options.push(...roots);
      literals.delete(value);
    }
  });
  const byOrder = (a, b) => {
    var _a, _b;
    return ((_a = order.get(a)) !== null && _a !== void 0 ? _a : 0) - ((_b = order.get(b)) !== null && _b !== void 0 ? _b : 0);
  };
  types.forEach((roots, type) => types.set(type, dedup(roots.concat(unknowns).sort(byOrder))));
  literals.forEach((roots, value) => literals.set(value, dedup(roots.concat(unknowns)).sort(byOrder)));
  return {
    types,
    literals,
    unknowns: dedup(unknowns).sort(byOrder),
    optionals: dedup(optionals).sort(byOrder),
    expectedTypes: dedup(expectedTypes)
  };
}
function createObjectKeyMatcher(objects, key) {
  const list = [];
  for (const { root, terminal } of objects) {
    terminal.shape[key].toTerminals((t2) => list.push({
      root,
      terminal: t2
    }));
  }
  const { types, literals, optionals, unknowns, expectedTypes } = groupTerminals(list);
  if (unknowns.length > 0 || optionals.length > 1) {
    return void 0;
  }
  for (const roots of literals.values()) {
    if (roots.length > 1) {
      return void 0;
    }
  }
  for (const roots of types.values()) {
    if (roots.length > 1) {
      return void 0;
    }
  }
  const missingValue = prependPath(key, {
    ok: false,
    code: "missing_value"
  });
  const issue = prependPath(key, types.size === 0 ? {
    ok: false,
    code: "invalid_literal",
    expected: Array.from(literals.keys())
  } : {
    ok: false,
    code: "invalid_type",
    expected: expectedTypes
  });
  const litMap = literals.size > 0 ? /* @__PURE__ */ new Map() : void 0;
  for (const [literal2, options] of literals) {
    litMap.set(literal2, options[0]);
  }
  const byType = types.size > 0 ? {} : void 0;
  for (const [type, options] of types) {
    byType[type] = options[0];
  }
  return function(_obj, flags) {
    var _a;
    const obj = _obj;
    const value = obj[key];
    if (value === void 0 && !(key in obj)) {
      return optionals.length > 0 ? optionals[0].func(obj, flags) : missingValue;
    }
    const option = (_a = byType === null || byType === void 0 ? void 0 : byType[toInputType(value)]) !== null && _a !== void 0 ? _a : litMap === null || litMap === void 0 ? void 0 : litMap.get(value);
    return option ? option.func(obj, flags) : issue;
  };
}
function createUnionObjectMatcher(terminals) {
  if (terminals.some(({ terminal: t2 }) => t2.name === "unknown")) {
    return void 0;
  }
  const objects = terminals.filter((item) => {
    return item.terminal.name === "object";
  });
  if (objects.length < 2) {
    return void 0;
  }
  const shapes = objects.map(({ terminal }) => terminal.shape);
  for (const key of findCommonKeys(shapes)) {
    const matcher = createObjectKeyMatcher(objects, key);
    if (matcher) {
      return matcher;
    }
  }
  return void 0;
}
function createUnionBaseMatcher(terminals) {
  const { expectedTypes, literals, types, unknowns, optionals } = groupTerminals(terminals);
  const issue = types.size === 0 && unknowns.length === 0 ? {
    ok: false,
    code: "invalid_literal",
    expected: Array.from(literals.keys())
  } : {
    ok: false,
    code: "invalid_type",
    expected: expectedTypes
  };
  const litMap = literals.size > 0 ? literals : void 0;
  const byType = types.size > 0 ? {} : void 0;
  for (const [type, options] of types) {
    byType[type] = options;
  }
  return function(value, flags) {
    var _a, _b;
    let options;
    if (flags & FLAG_MISSING_VALUE) {
      options = optionals;
    } else {
      options = (_b = (_a = byType === null || byType === void 0 ? void 0 : byType[toInputType(value)]) !== null && _a !== void 0 ? _a : litMap === null || litMap === void 0 ? void 0 : litMap.get(value)) !== null && _b !== void 0 ? _b : unknowns;
    }
    if (!options) {
      return issue;
    }
    let count = 0;
    let issueTree = issue;
    for (let i = 0; i < options.length; i++) {
      const r = options[i].func(value, flags);
      if (r === void 0 || r.ok) {
        return r;
      }
      issueTree = count > 0 ? joinIssues(issueTree, r) : r;
      count++;
    }
    if (count > 1) {
      return {
        ok: false,
        code: "invalid_union",
        tree: issueTree
      };
    }
    return issueTree;
  };
}
class UnionType extends Type {
  toTerminals(func) {
    this.options.forEach((o) => o.toTerminals(func));
  }
  func(v, flags) {
    let func = this._func;
    if (func === void 0) {
      const flattened2 = [];
      this.options.forEach((option) => option.toTerminals((terminal) => {
        flattened2.push({
          root: option,
          terminal
        });
      }));
      const base = createUnionBaseMatcher(flattened2);
      const object2 = createUnionObjectMatcher(flattened2);
      if (!object2) {
        func = base;
      } else {
        func = function(v2, f) {
          if (isObject(v2)) {
            return object2(v2, f);
          }
          return base(v2, f);
        };
      }
      this._func = func;
    }
    return func(v, flags);
  }
  constructor(options) {
    super();
    this.options = options;
    this.name = "union";
  }
}
const STRICT = Object.freeze({
  mode: "strict"
});
const STRIP = Object.freeze({
  mode: "strip"
});
const PASSTHROUGH = Object.freeze({
  mode: "passthrough"
});
class TransformType extends Type {
  func(v, flags) {
    let chain = this.transformChain;
    if (!chain) {
      chain = [];
      let next = this;
      while (next instanceof TransformType) {
        chain.push(next.transform);
        next = next.transformed;
      }
      chain.reverse();
      this.transformChain = chain;
      this.transformRoot = next;
    }
    let result = this.transformRoot.func(v, flags);
    if (result !== void 0 && !result.ok) {
      return result;
    }
    let current;
    if (result !== void 0) {
      current = result.value;
    } else if (flags & FLAG_MISSING_VALUE) {
      current = void 0;
      result = this.undef;
    } else {
      current = v;
    }
    const options = flags & FLAG_FORBID_EXTRA_KEYS ? STRICT : flags & FLAG_STRIP_EXTRA_KEYS ? STRIP : PASSTHROUGH;
    for (let i = 0; i < chain.length; i++) {
      const r = chain[i](current, options);
      if (r !== void 0) {
        if (!r.ok) {
          return r;
        }
        current = r.value;
        result = r;
      }
    }
    return result;
  }
  toTerminals(func) {
    this.transformed.toTerminals(func);
  }
  constructor(transformed, transform) {
    super();
    this.transformed = transformed;
    this.transform = transform;
    this.name = "transform";
    this.undef = ok(void 0);
    this.transformChain = void 0;
    this.transformRoot = void 0;
  }
}
class LazyType extends Type {
  func(v, flags) {
    if (!this.type) {
      this.type = this.definer();
    }
    return this.type.func(v, flags);
  }
  toTerminals(func) {
    if (this.recursing) {
      return;
    }
    try {
      this.recursing = true;
      if (!this.type) {
        this.type = this.definer();
      }
      this.type.toTerminals(func);
    } finally {
      this.recursing = false;
    }
  }
  constructor(definer) {
    super();
    this.definer = definer;
    this.name = "lazy";
    this.recursing = false;
  }
}
class NeverType extends Type {
  func(_, __) {
    return this.issue;
  }
  constructor() {
    super(...arguments);
    this.name = "never";
    this.issue = {
      ok: false,
      code: "invalid_type",
      expected: []
    };
  }
}
const neverSingleton = new NeverType();
function never() {
  return neverSingleton;
}
class UnknownType extends Type {
  func(_, __) {
    return void 0;
  }
  constructor() {
    super(...arguments);
    this.name = "unknown";
  }
}
const unknownSingleton = new UnknownType();
function unknown() {
  return unknownSingleton;
}
class UndefinedType extends Type {
  func(v, _) {
    return v === void 0 ? void 0 : this.issue;
  }
  constructor() {
    super(...arguments);
    this.name = "undefined";
    this.issue = {
      ok: false,
      code: "invalid_type",
      expected: [
        "undefined"
      ]
    };
  }
}
const undefinedSingleton = new UndefinedType();
function undefined_() {
  return undefinedSingleton;
}
class NullType extends Type {
  func(v, _) {
    return v === null ? void 0 : this.issue;
  }
  constructor() {
    super(...arguments);
    this.name = "null";
    this.issue = {
      ok: false,
      code: "invalid_type",
      expected: [
        "null"
      ]
    };
  }
}
const nullSingleton = new NullType();
function null_() {
  return nullSingleton;
}
class NumberType extends Type {
  func(v, _) {
    return typeof v === "number" ? void 0 : this.issue;
  }
  constructor() {
    super(...arguments);
    this.name = "number";
    this.issue = {
      ok: false,
      code: "invalid_type",
      expected: [
        "number"
      ]
    };
  }
}
const numberSingleton = new NumberType();
function number() {
  return numberSingleton;
}
class BigIntType extends Type {
  func(v, _) {
    return typeof v === "bigint" ? void 0 : this.issue;
  }
  constructor() {
    super(...arguments);
    this.name = "bigint";
    this.issue = {
      ok: false,
      code: "invalid_type",
      expected: [
        "bigint"
      ]
    };
  }
}
const bigintSingleton = new BigIntType();
function bigint() {
  return bigintSingleton;
}
class StringType extends Type {
  func(v, _) {
    return typeof v === "string" ? void 0 : this.issue;
  }
  constructor() {
    super(...arguments);
    this.name = "string";
    this.issue = {
      ok: false,
      code: "invalid_type",
      expected: [
        "string"
      ]
    };
  }
}
const stringSingleton = new StringType();
function string() {
  return stringSingleton;
}
class BooleanType extends Type {
  func(v, _) {
    return typeof v === "boolean" ? void 0 : this.issue;
  }
  constructor() {
    super(...arguments);
    this.name = "boolean";
    this.issue = {
      ok: false,
      code: "invalid_type",
      expected: [
        "boolean"
      ]
    };
  }
}
const booleanSingleton = new BooleanType();
function boolean() {
  return booleanSingleton;
}
class LiteralType extends Type {
  func(v, _) {
    return v === this.value ? void 0 : this.issue;
  }
  constructor(value) {
    super();
    this.value = value;
    this.name = "literal";
    this.issue = {
      ok: false,
      code: "invalid_literal",
      expected: [
        value
      ]
    };
  }
}
function literal(value) {
  return new LiteralType(value);
}
function object(obj) {
  return new ObjectType(obj, void 0);
}
function record(valueType) {
  return new ObjectType({}, valueType !== null && valueType !== void 0 ? valueType : unknown());
}
function array(item) {
  return new ArrayOrTupleType([], item !== null && item !== void 0 ? item : unknown(), []);
}
function tuple(items) {
  return new ArrayOrTupleType(items, void 0, []);
}
function union(...options) {
  return new UnionType(options);
}
function lazy$1(definer) {
  return new LazyType(definer);
}
const valita_star = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ValitaError,
  array,
  bigint,
  boolean,
  err,
  lazy: lazy$1,
  literal,
  never,
  null: null_,
  number,
  object,
  ok,
  record,
  string,
  tuple,
  undefined: undefined_,
  union,
  unknown
}, Symbol.toStringTag, { value: "Module" }));
function compareUTF8(a, b) {
  const aLength = a.length;
  const bLength = b.length;
  const length = Math.min(aLength, bLength);
  for (let i = 0; i < length; ) {
    const aCodePoint = (
      /** @type {number} */
      a.codePointAt(i)
    );
    const bCodePoint = (
      /** @type {number} */
      b.codePointAt(i)
    );
    if (aCodePoint !== bCodePoint) {
      if (aCodePoint < 128 && bCodePoint < 128) {
        return aCodePoint - bCodePoint;
      }
      const aLength2 = utf8Bytes(aCodePoint, aBytes);
      const bLength2 = utf8Bytes(bCodePoint, bBytes);
      return compareArrays(aBytes, aLength2, bBytes, bLength2);
    }
    i += utf16LengthForCodePoint(aCodePoint);
  }
  return aLength - bLength;
}
function compareArrays(a, aLength, b, bLength) {
  const length = Math.min(aLength, bLength);
  for (let i = 0; i < length; i++) {
    const aValue = a[i];
    const bValue = b[i];
    if (aValue !== bValue) {
      return aValue - bValue;
    }
  }
  return aLength - bLength;
}
function utf16LengthForCodePoint(aCodePoint) {
  return aCodePoint > 65535 ? 2 : 1;
}
const arr = () => Array.from({
  length: 4
}, () => 0);
const aBytes = arr();
const bBytes = arr();
function utf8Bytes(codePoint, bytes) {
  if (codePoint < 128) {
    bytes[0] = codePoint;
    return 1;
  }
  let count;
  let offset;
  if (codePoint <= 2047) {
    count = 1;
    offset = 192;
  } else if (codePoint <= 65535) {
    count = 2;
    offset = 224;
  } else if (codePoint <= 1114111) {
    count = 3;
    offset = 240;
  } else {
    throw new Error("Invalid code point");
  }
  bytes[0] = (codePoint >> 6 * count) + offset;
  let i = 1;
  for (; count > 0; count--) {
    const temp = codePoint >> 6 * (count - 1);
    bytes[i++] = 128 | temp & 63;
  }
  return i;
}
function greaterThan(a, b) {
  return compareUTF8(a, b) > 0;
}
function lessThan(a, b) {
  return compareUTF8(a, b) < 0;
}
function lessThanEq(a, b) {
  return compareUTF8(a, b) <= 0;
}
function resolver() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return {
    promise,
    resolve,
    reject
  };
}
function _define_property$4(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
class Lock {
  async lock() {
    const previous = this._lockP;
    const { promise, resolve } = resolver();
    this._lockP = promise;
    await previous;
    return resolve;
  }
  withLock(f) {
    return run(this.lock(), f);
  }
  constructor() {
    _define_property$4(this, "_lockP", null);
  }
}
class RWLock {
  read() {
    return this._lock.withLock(async () => {
      await this._writeP;
      const { promise, resolve } = resolver();
      this._readP.push(promise);
      return resolve;
    });
  }
  withRead(f) {
    return run(this.read(), f);
  }
  async write() {
    return await this._lock.withLock(async () => {
      await this._writeP;
      await Promise.all(this._readP);
      const { promise, resolve } = resolver();
      this._writeP = promise;
      this._readP = [];
      return resolve;
    });
  }
  withWrite(f) {
    return run(this.write(), f);
  }
  constructor() {
    _define_property$4(this, "_lock", new Lock());
    _define_property$4(this, "_writeP", null);
    _define_property$4(this, "_readP", []);
  }
}
async function run(p, f) {
  const release = await p;
  try {
    return await f();
  } finally {
    release();
  }
}
const PRIME32_1 = 2654435761;
const PRIME32_2 = 2246822519;
const PRIME32_3 = 3266489917;
const PRIME32_4 = 668265263;
const PRIME32_5 = 374761393;
let encoder;
function xxHash32(input, seed = 0) {
  const buffer = typeof input === "string" ? (encoder ?? (encoder = new TextEncoder())).encode(input) : input;
  const b = buffer;
  let acc = seed + PRIME32_5 & 4294967295;
  let offset = 0;
  if (b.length >= 16) {
    const accN = [
      seed + PRIME32_1 + PRIME32_2 & 4294967295,
      seed + PRIME32_2 & 4294967295,
      seed + 0 & 4294967295,
      seed - PRIME32_1 & 4294967295
    ];
    const b2 = buffer;
    const limit2 = b2.length - 16;
    let lane = 0;
    for (offset = 0; (offset & 4294967280) <= limit2; offset += 4) {
      const i = offset;
      const laneN0 = b2[i + 0] + (b2[i + 1] << 8);
      const laneN1 = b2[i + 2] + (b2[i + 3] << 8);
      const laneNP = laneN0 * PRIME32_2 + (laneN1 * PRIME32_2 << 16);
      let acc2 = accN[lane] + laneNP & 4294967295;
      acc2 = acc2 << 13 | acc2 >>> 19;
      const acc0 = acc2 & 65535;
      const acc1 = acc2 >>> 16;
      accN[lane] = acc0 * PRIME32_1 + (acc1 * PRIME32_1 << 16) & 4294967295;
      lane = lane + 1 & 3;
    }
    acc = (accN[0] << 1 | accN[0] >>> 31) + (accN[1] << 7 | accN[1] >>> 25) + (accN[2] << 12 | accN[2] >>> 20) + (accN[3] << 18 | accN[3] >>> 14) & 4294967295;
  }
  acc = acc + buffer.length & 4294967295;
  const limit = buffer.length - 4;
  for (; offset <= limit; offset += 4) {
    const i = offset;
    const laneN0 = b[i + 0] + (b[i + 1] << 8);
    const laneN1 = b[i + 2] + (b[i + 3] << 8);
    const laneP = laneN0 * PRIME32_3 + (laneN1 * PRIME32_3 << 16);
    acc = acc + laneP & 4294967295;
    acc = acc << 17 | acc >>> 15;
    acc = (acc & 65535) * PRIME32_4 + ((acc >>> 16) * PRIME32_4 << 16) & 4294967295;
  }
  for (; offset < b.length; ++offset) {
    const lane = b[offset];
    acc = acc + lane * PRIME32_5;
    acc = acc << 11 | acc >>> 21;
    acc = (acc & 65535) * PRIME32_1 + ((acc >>> 16) * PRIME32_1 << 16) & 4294967295;
  }
  acc = acc ^ acc >>> 15;
  acc = ((acc & 65535) * PRIME32_2 & 4294967295) + ((acc >>> 16) * PRIME32_2 << 16);
  acc = acc ^ acc >>> 13;
  acc = ((acc & 65535) * PRIME32_3 & 4294967295) + ((acc >>> 16) * PRIME32_3 << 16);
  acc = acc ^ acc >>> 16;
  return acc < 0 ? acc + 4294967296 : acc;
}
function _check_private_redeclaration$4(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}
function _class_apply_descriptor_get$4(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}
function _class_apply_descriptor_set$4(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }
    descriptor.value = value;
  }
}
function _class_extract_field_descriptor$4(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }
  return privateMap.get(receiver);
}
function _class_private_field_get$4(receiver, privateMap) {
  var descriptor = _class_extract_field_descriptor$4(receiver, privateMap, "get");
  return _class_apply_descriptor_get$4(receiver, descriptor);
}
function _class_private_field_init$4(obj, privateMap, value) {
  _check_private_redeclaration$4(obj, privateMap);
  privateMap.set(obj, value);
}
function _class_private_field_set$4(receiver, privateMap, value) {
  var descriptor = _class_extract_field_descriptor$4(receiver, privateMap, "set");
  _class_apply_descriptor_set$4(receiver, descriptor, value);
  return value;
}
function _class_private_method_get$1(receiver, privateSet, fn) {
  if (!privateSet.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return fn;
}
function _class_private_method_init$1(obj, privateSet) {
  _check_private_redeclaration$4(obj, privateSet);
  privateSet.add(obj);
}
function _define_property$3(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
let _Symbol_iterator$1, _Symbol_asyncIterator$1;
var _childNodeSize, _splice, _class$1, _mergeAndPartition, _replaceChild, __InternalNodeImpl, _dagRead$1, _lock, _modified, _addToModified, _class1$1, _dagWrite, _basis, _meta, _clientID$1, _formatVersion, _generateDiffs, _class2$1, _delegate$1, _delegate1$1, _maxProcessed, _maxUnprocessed, _processed, _unprocessed, _cumulative, _processedWeight, _unprocessedWeight, _min, _max, _process$1, _updateCumulative, _integratedQ, _integratedLocation, __TDigest, _delegate2;
var DD31 = 5;
var V6 = 6;
var V7 = 7;
var Latest = V7;
var valita_exports = {};
__export(valita_exports, {
  assert: () => assert2,
  deepPartial: () => deepPartial,
  instanceOfAbstractType: () => instanceOfAbstractType,
  is: () => is,
  literalUnion: () => literalUnion,
  parse: () => parse,
  readonly: () => readonly,
  readonlyArray: () => readonlyArray,
  readonlyObject: () => readonlyObject,
  readonlyRecord: () => readonlyRecord,
  test: () => test,
  testOptional: () => testOptional
});
__reExport(valita_exports, valita_star);
function toDisplay(value) {
  switch (typeof value) {
    case "string":
    case "number":
    case "boolean":
      return JSON.stringify(value);
    case "undefined":
      return "undefined";
    case "bigint":
      return value.toString() + "n";
    default:
      if (value === null) {
        return "null";
      }
      if (Array.isArray(value)) {
        return "array";
      }
      return typeof value;
  }
}
function toDisplayAtPath(v2, path2) {
  if (!path2?.length) {
    return toDisplay(v2);
  }
  let cur = v2;
  for (const p of path2) {
    cur = cur[p];
  }
  return toDisplay(cur);
}
function displayList(word, expected, toDisplay2 = (x) => String(x)) {
  if (expected.length === 1) {
    return toDisplay2(expected[0]);
  }
  const suffix = `${toDisplay2(expected[expected.length - 2])} ${word} ${toDisplay2(expected[expected.length - 1])}`;
  if (expected.length === 2) {
    return suffix;
  }
  return `${expected.slice(0, -2).map(toDisplay2).join(", ")}, ${suffix}`;
}
function getMessage(err2, v2, schema2, mode) {
  const firstIssue = err2.issues[0];
  const { path: path2 } = firstIssue;
  const atPath = path2?.length ? ` at ${path2.join(".")}` : "";
  switch (firstIssue.code) {
    case "invalid_type":
      return `Expected ${displayList("or", firstIssue.expected)}${atPath}. Got ${toDisplayAtPath(v2, path2)}`;
    case "missing_value": {
      const atPath2 = path2 && path2.length > 1 ? ` at ${path2.slice(0, -1).join(".")}` : "";
      if (firstIssue.path?.length) {
        return `Missing property ${firstIssue.path.at(-1)}${atPath2}`;
      }
      return `TODO Unknown missing property${atPath2}`;
    }
    case "invalid_literal":
      return `Expected literal value ${displayList("or", firstIssue.expected, toDisplay)}${atPath} Got ${toDisplayAtPath(v2, path2)}`;
    case "invalid_length": {
      return `Expected array with length ${firstIssue.minLength === firstIssue.maxLength ? firstIssue.minLength : `between ${firstIssue.minLength} and ${firstIssue.maxLength}`}${atPath}. Got array with length ${v2.length}`;
    }
    case "unrecognized_keys":
      if (firstIssue.keys.length === 1) {
        return `Unexpected property ${firstIssue.keys[0]}${atPath}`;
      }
      return `Unexpected properties ${displayList("and", firstIssue.keys)}${atPath}`;
    case "invalid_union":
      return schema2.name === "union" ? getDeepestUnionParseError(v2, schema2, mode ?? "strict") : `Invalid union value${atPath}`;
    case "custom_error": {
      const { error } = firstIssue;
      const message2 = !error ? "unknown" : typeof error === "string" ? error : error.message ?? "unknown";
      return `${message2}${atPath}. Got ${toDisplayAtPath(v2, path2)}`;
    }
  }
}
function getDeepestUnionParseError(value, schema2, mode) {
  const failures = [];
  for (const type of schema2.options) {
    const r = type.try(value, {
      mode
    });
    if (!r.ok) {
      failures.push({
        type,
        err: r
      });
    }
  }
  if (failures.length) {
    failures.sort(pathCmp);
    if (failures.length === 1 || pathCmp(failures[0], failures[1]) < 0) {
      return getMessage(failures[0].err, value, failures[0].type, mode);
    }
  }
  try {
    const str = JSON.stringify(value);
    return `Invalid union value: ${str}`;
  } catch {
    return `Invalid union value`;
  }
}
function pathCmp(a, b) {
  const aPath = a.err.issues[0].path;
  const bPath = b.err.issues[0].path;
  if (aPath.length !== bPath.length) {
    return bPath.length - aPath.length;
  }
  for (let i = 0; i < aPath.length; i++) {
    if (bPath[i] > aPath[i]) {
      return -1;
    }
    if (bPath[i] < aPath[i]) {
      return 1;
    }
  }
  return 0;
}
function parse(value, schema2, mode) {
  const res = test(value, schema2, mode);
  if (!res.ok) {
    throw new TypeError(res.error);
  }
  return res.value;
}
function is(value, schema2, mode) {
  return test(value, schema2, mode).ok;
}
function assert2(value, schema2, mode) {
  parse(value, schema2, mode);
}
function test(value, schema2, mode) {
  const res = schema2.try(value, mode ? {
    mode
  } : void 0);
  if (!res.ok) {
    return {
      ok: false,
      error: getMessage(res, value, schema2, mode)
    };
  }
  return res;
}
function testOptional(value, schema2, mode) {
  let flags = 1;
  if (mode === "passthrough") {
    flags = 0;
  } else if (mode === "strip") {
    flags = 2;
  }
  const res = schema2.func(value, flags);
  if (res === void 0) {
    return {
      ok: true,
      value
    };
  } else if (res.ok) {
    return res;
  }
  const err2 = new ValitaError(res);
  return {
    ok: false,
    error: getMessage(err2, value, schema2, mode)
  };
}
function readonly(t2) {
  return t2;
}
function readonlyObject(t2) {
  return object(t2);
}
function readonlyArray(t2) {
  return array(t2);
}
function readonlyRecord(t2) {
  return record(t2);
}
var AbstractType2 = Object.getPrototypeOf(Object.getPrototypeOf(string().optional())).constructor;
function instanceOfAbstractType(obj) {
  return obj instanceof AbstractType2;
}
function deepPartial(s) {
  const shape = {};
  for (const [key, type] of Object.entries(s.shape)) {
    if (type.name === "object") {
      shape[key] = deepPartial(type).optional();
    } else {
      shape[key] = type.optional();
    }
  }
  return object(shape);
}
function literalUnion(...literals) {
  return union(...literals.map(literal));
}
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  switch (typeof a) {
    case "boolean":
    case "number":
    case "string":
      return false;
  }
  a = a;
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
  if (a === null || b === null) {
    return false;
  }
  if (Array.isArray(b)) {
    return false;
  }
  a = a;
  b = b;
  let aSize = 0;
  for (const key in a) {
    if (hasOwn(a, key)) {
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
      aSize++;
    }
  }
  let bSize = 0;
  for (const key in b) {
    if (hasOwn(b, key)) {
      bSize++;
    }
  }
  return aSize === bSize;
}
function assertJSONValue(v2) {
  {
    return;
  }
}
function assertJSONObject(v2) {
  assertObject(v2);
  assertObjectIsJSONObject(v2);
}
function assertObjectIsJSONObject(v2) {
  for (const k in v2) {
    if (hasOwn(v2, k)) {
      v2[k];
    }
  }
}
var SIZE_TAG = 1;
var SIZE_INT32 = 4;
var SIZE_SMI = 5;
var SIZE_DOUBLE = 8;
function getSizeOfValue(value) {
  switch (typeof value) {
    case "string":
      return SIZE_TAG + SIZE_INT32 + value.length;
    case "number":
      if (isSmi(value)) {
        if (value <= -1073741824 || value >= 2 ** 30 - 1) {
          return SIZE_TAG + SIZE_SMI;
        }
        return SIZE_TAG + SIZE_INT32;
      }
      return SIZE_TAG + SIZE_DOUBLE;
    case "boolean":
      return SIZE_TAG;
    case "object":
      if (value === null) {
        return SIZE_TAG;
      }
      if (Array.isArray(value)) {
        let sum = 2 * SIZE_TAG + SIZE_INT32;
        for (const element of value) {
          sum += getSizeOfValue(element);
        }
        return sum;
      }
      {
        const val = value;
        let sum = 2 * SIZE_TAG + SIZE_INT32;
        for (const k in val) {
          if (hasOwn(val, k)) {
            const propertyValue = val[k];
            if (propertyValue !== void 0) {
              sum += getSizeOfValue(k) + getSizeOfValue(propertyValue);
            }
          }
        }
        return sum;
      }
  }
  throw new Error(`Invalid value. type: ${typeof value}, value: ${value}`);
}
function isSmi(value) {
  return value === (value | 0);
}
var entryFixed = 2 * SIZE_TAG + SIZE_INT32 + SIZE_TAG + SIZE_INT32;
function getSizeOfEntry(key, value) {
  return entryFixed + getSizeOfValue(key) + getSizeOfValue(value);
}
function randomUint64() {
  const high = Math.floor(Math.random() * 4294967295);
  const low = Math.floor(Math.random() * 4294967295);
  return BigInt(high) << 32n | BigInt(low);
}
var STRING_LENGTH = 22;
var hashRe = /^[0-9a-v-]+$/;
var emptyUUID = "0".repeat(STRING_LENGTH);
var emptyHash = emptyUUID;
var newRandomHash = makeNewRandomHashFunctionInternal();
function toStringAndSlice(n, len) {
  return n.toString(32).slice(-len).padStart(len, "0");
}
function makeNewRandomHashFunctionInternal() {
  let base = "";
  let i = 0;
  return () => {
    if (!base) {
      base = toStringAndSlice(randomUint64(), 12);
    }
    const tail = toStringAndSlice(i++, 10);
    return base + tail;
  };
}
function isHash(value) {
  return typeof value === "string" && hashRe.test(value);
}
function assertHash(value) {
  assert2(value, hashSchema);
}
var hashSchema = valita_exports.string().assert(isHash, "Invalid hash");
function binarySearch(high, compare2) {
  let low = 0;
  while (low < high) {
    const mid = low + (high - low >> 1);
    const i = compare2(mid);
    if (i === 0) {
      return mid;
    }
    if (i > 0) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}
function* joinIterables(...iters) {
  for (const iter of iters) {
    yield* iter;
  }
}
function* filterIter(iter, p) {
  let index = 0;
  for (const t2 of iter) {
    if (p(t2, index++)) {
      yield t2;
    }
  }
}
function* mapIter(iter, f) {
  let index = 0;
  for (const t2 of iter) {
    yield f(t2, index++);
  }
}
function* once(stream) {
  const it = stream[Symbol.iterator]();
  const { value } = it.next();
  if (value !== void 0) {
    yield value;
  }
  it.return?.();
}
var IterWrapper = (_Symbol_iterator$1 = Symbol.iterator, class _IterWrapper {
  [_Symbol_iterator$1]() {
    return this.iter[Symbol.iterator]();
  }
  map(f) {
    return new _IterWrapper(mapIter(this.iter, f));
  }
  filter(p) {
    return new _IterWrapper(filterIter(this.iter, p));
  }
  constructor(iter) {
    _define_property$3(this, "iter", void 0);
    this.iter = iter;
  }
});
function wrapIterable(iter) {
  return new IterWrapper(iter);
}
function* mergeIterables(iterables, comparator2, distinct = false) {
  const iterators = iterables.map((i) => i[Symbol.iterator]());
  try {
    const current = iterators.map((i) => i.next());
    let lastYielded;
    while (current.some((c) => !c.done)) {
      const min = current.reduce((acc, c, i) => {
        if (c.done) {
          return acc;
        }
        if (acc === void 0 || comparator2(c.value, acc[0]) < 0) {
          return [
            c.value,
            i
          ];
        }
        return acc;
      }, void 0);
      assert(min !== void 0, "min is undefined");
      current[min[1]] = iterators[min[1]].next();
      if (lastYielded !== void 0 && distinct && comparator2(lastYielded, min[0]) === 0) {
        continue;
      }
      lastYielded = min[0];
      yield min[0];
    }
  } finally {
    for (const it of iterators) {
      it.return?.();
    }
  }
}
var NODE_LEVEL = 0;
var NODE_ENTRIES = 1;
function makeNodeChunkData(level, entries, formatVersion) {
  return deepFreeze([
    level,
    formatVersion >= V7 ? entries : entries.map((e) => e.slice(0, 2))
  ]);
}
async function findLeaf(key, hash2, source, expectedRootHash) {
  const node = await source.getNode(hash2);
  if (expectedRootHash !== source.rootHash) {
    return findLeaf(key, source.rootHash, source, source.rootHash);
  }
  if (isDataNodeImpl(node)) {
    return node;
  }
  const { entries } = node;
  let i = binarySearch2$1(key, entries);
  if (i === entries.length) {
    i--;
  }
  const entry = entries[i];
  return findLeaf(key, entry[1], source, expectedRootHash);
}
function binarySearch2$1(key, entries) {
  return binarySearch(entries.length, (i) => compareUTF8(key, entries[i][0]));
}
function binarySearchFound(i, entries, key) {
  return i !== entries.length && entries[i][0] === key;
}
function parseBTreeNode(v2, formatVersion, getSizeOfEntry2) {
  if (formatVersion >= V7) {
    return v2;
  }
  assertArray(v2);
  assert(v2.length >= 2);
  const [level, entries] = v2;
  assertNumber(level);
  assertArray(entries);
  const f = level > 0 ? assertString : assertJSONValue;
  if (formatVersion >= V7) {
    for (const e of entries) {
      assertEntry(e, f);
    }
    return v2;
  }
  const newEntries = entries.map((e) => convertNonV7Entry(e, f, getSizeOfEntry2));
  return [
    level,
    newEntries
  ];
}
function assertEntry(entry, f) {
  assertArray(entry);
  assert(entry.length >= 3);
  assertString(entry[0]);
  f(entry[1]);
  assertNumber(entry[2]);
}
function convertNonV7Entry(entry, f, getSizeOfEntry2) {
  assertArray(entry);
  assert(entry.length >= 2);
  assertString(entry[0]);
  f(entry[1]);
  const entrySize = getSizeOfEntry2(entry[0], entry[1]);
  return [
    entry[0],
    entry[1],
    entrySize
  ];
}
var NodeImpl = (_childNodeSize = /* @__PURE__ */ new WeakMap(), class {
  maxKey() {
    return this.entries[this.entries.length - 1][0];
  }
  getChildNodeSize(tree) {
    if (_class_private_field_get$4(this, _childNodeSize) !== -1) {
      return _class_private_field_get$4(this, _childNodeSize);
    }
    let sum = tree.chunkHeaderSize;
    for (const entry of this.entries) {
      sum += entry[2];
    }
    return _class_private_field_set$4(this, _childNodeSize, sum);
  }
  _updateNode(tree) {
    _class_private_field_set$4(this, _childNodeSize, -1);
    tree.updateNode(this);
  }
  constructor(entries, hash2, isMutable) {
    _define_property$3(this, "entries", void 0);
    _define_property$3(this, "hash", void 0);
    _define_property$3(this, "isMutable", void 0);
    _class_private_field_init$4(this, _childNodeSize, {
      writable: true,
      value: -1
    });
    this.entries = entries;
    this.hash = hash2;
    this.isMutable = isMutable;
  }
});
function toChunkData(node, formatVersion) {
  return makeNodeChunkData(node.level, node.entries, formatVersion);
}
var DataNodeImpl = (_splice = /* @__PURE__ */ new WeakSet(), _class$1 = class extends NodeImpl {
  set(key, value, entrySize, tree) {
    let deleteCount;
    const i = binarySearch2$1(key, this.entries);
    if (!binarySearchFound(i, this.entries, key)) {
      deleteCount = 0;
    } else {
      deleteCount = 1;
    }
    return Promise.resolve(_class_private_method_get$1(this, _splice, splice).call(this, tree, i, deleteCount, [
      key,
      value,
      entrySize
    ]));
  }
  del(key, tree) {
    const i = binarySearch2$1(key, this.entries);
    if (!binarySearchFound(i, this.entries, key)) {
      return Promise.resolve(this);
    }
    return Promise.resolve(_class_private_method_get$1(this, _splice, splice).call(this, tree, i, 1));
  }
  async *keys(_tree) {
    for (const entry of this.entries) {
      yield entry[0];
    }
  }
  async *entriesIter(_tree) {
    for (const entry of this.entries) {
      yield entry;
    }
  }
  constructor(...args) {
    super(...args), _class_private_method_init$1(this, _splice), _define_property$3(this, "level", 0);
  }
}, _class$1);
function readonlySplice(array7, start, deleteCount, ...items) {
  const arr2 = array7.slice(0, start);
  for (let i = 0; i < items.length; i++) {
    arr2.push(items[i]);
  }
  for (let i = start + deleteCount; i < array7.length; i++) {
    arr2.push(array7[i]);
  }
  return arr2;
}
var InternalNodeImpl = (_mergeAndPartition = /* @__PURE__ */ new WeakSet(), _replaceChild = /* @__PURE__ */ new WeakSet(), __InternalNodeImpl = class _InternalNodeImpl extends NodeImpl {
  async set(key, value, entrySize, tree) {
    let i = binarySearch2$1(key, this.entries);
    if (i === this.entries.length) {
      i--;
    }
    const childHash = this.entries[i][1];
    const oldChildNode = await tree.getNode(childHash);
    const childNode = await oldChildNode.set(key, value, entrySize, tree);
    const childNodeSize = childNode.getChildNodeSize(tree);
    if (childNodeSize > tree.maxSize || childNodeSize < tree.minSize) {
      return _class_private_method_get$1(this, _mergeAndPartition, mergeAndPartition).call(this, tree, i, childNode);
    }
    const newEntry = createNewInternalEntryForNode(childNode, tree.getEntrySize);
    return _class_private_method_get$1(this, _replaceChild, replaceChild).call(this, tree, i, newEntry);
  }
  async del(key, tree) {
    const i = binarySearch2$1(key, this.entries);
    if (i === this.entries.length) {
      return this;
    }
    const childHash = this.entries[i][1];
    const oldChildNode = await tree.getNode(childHash);
    const oldHash = oldChildNode.hash;
    const childNode = await oldChildNode.del(key, tree);
    if (childNode.hash === oldHash) {
      return this;
    }
    if (childNode.entries.length === 0) {
      const entries = readonlySplice(this.entries, i, 1);
      return tree.newInternalNodeImpl(entries, this.level);
    }
    if (i === 0 && this.entries.length === 1) {
      return childNode;
    }
    if (childNode.getChildNodeSize(tree) > tree.minSize) {
      const entry = createNewInternalEntryForNode(childNode, tree.getEntrySize);
      return _class_private_method_get$1(this, _replaceChild, replaceChild).call(this, tree, i, entry);
    }
    return _class_private_method_get$1(this, _mergeAndPartition, mergeAndPartition).call(this, tree, i, childNode);
  }
  async *keys(tree) {
    for (const entry of this.entries) {
      const childNode = await tree.getNode(entry[1]);
      yield* childNode.keys(tree);
    }
  }
  async *entriesIter(tree) {
    for (const entry of this.entries) {
      const childNode = await tree.getNode(entry[1]);
      yield* childNode.entriesIter(tree);
    }
  }
  getChildren(start, length, tree) {
    const ps = [];
    for (let i = start; i < length && i < this.entries.length; i++) {
      ps.push(tree.getNode(this.entries[i][1]));
    }
    return Promise.all(ps);
  }
  async getCompositeChildren(start, length, tree) {
    const { level } = this;
    if (length === 0) {
      return new _InternalNodeImpl([], newRandomHash(), level - 1, true);
    }
    const output = await this.getChildren(start, start + length, tree);
    if (level > 1) {
      const entries2 = [];
      for (const child of output) {
        entries2.push(...child.entries);
      }
      return new _InternalNodeImpl(entries2, newRandomHash(), level - 1, true);
    }
    assert(level === 1);
    const entries = [];
    for (const child of output) {
      entries.push(...child.entries);
    }
    return new DataNodeImpl(entries, newRandomHash(), true);
  }
  constructor(entries, hash2, level, isMutable) {
    super(entries, hash2, isMutable), /**
    * This merges the child node entries with previous or next sibling and then
    * partitions the merged entries.
    */
    _class_private_method_init$1(this, _mergeAndPartition), _class_private_method_init$1(this, _replaceChild), _define_property$3(this, "level", void 0);
    this.level = level;
  }
}, __InternalNodeImpl);
function newNodeImpl(entries, hash2, level, isMutable) {
  if (level === 0) {
    return new DataNodeImpl(entries, hash2, isMutable);
  }
  return new InternalNodeImpl(entries, hash2, level, isMutable);
}
function isDataNodeImpl(node) {
  return node.level === 0;
}
function partition(values, getSizeOfEntry2, min, max) {
  const partitions = [];
  const sizes = [];
  let sum = 0;
  let accum = [];
  for (const value of values) {
    const size = getSizeOfEntry2(value);
    if (size >= max) {
      if (accum.length > 0) {
        partitions.push(accum);
        sizes.push(sum);
      }
      partitions.push([
        value
      ]);
      sizes.push(size);
      sum = 0;
      accum = [];
    } else if (sum + size >= min) {
      accum.push(value);
      partitions.push(accum);
      sizes.push(sum + size);
      sum = 0;
      accum = [];
    } else {
      sum += size;
      accum.push(value);
    }
  }
  if (sum > 0) {
    if (sizes.length > 0 && sum + sizes[sizes.length - 1] <= max) {
      partitions[partitions.length - 1].push(...accum);
    } else {
      partitions.push(accum);
    }
  }
  return partitions;
}
var emptyDataNode = makeNodeChunkData(0, [], Latest);
var emptyDataNodeImpl = new DataNodeImpl([], emptyHash, false);
function createNewInternalEntryForNode(node, getSizeOfEntry2) {
  const key = node.maxKey();
  const value = node.hash;
  const size = getSizeOfEntry2(key, value);
  return [
    key,
    value,
    size
  ];
}
var SPLICE_UNASSIGNED = -1;
var SPLICE_AT = 0;
var SPLICE_REMOVED = 1;
var SPLICE_ADDED = 2;
var SPLICE_FROM = 3;
var KEY = 0;
var VALUE = 1;
function* computeSplices(previous, current) {
  let previousIndex = 0;
  let currentIndex = 0;
  let splice2;
  function ensureAssigned(splice22, index) {
    if (splice22[SPLICE_FROM] === SPLICE_UNASSIGNED) {
      splice22[SPLICE_FROM] = index;
    }
  }
  function newSplice() {
    return [
      previousIndex,
      0,
      0,
      SPLICE_UNASSIGNED
    ];
  }
  while (previousIndex < previous.length && currentIndex < current.length) {
    if (previous[previousIndex][KEY] === current[currentIndex][KEY]) {
      if (deepEqual(
        // These are really Hash | InternalValue
        previous[previousIndex][VALUE],
        current[currentIndex][VALUE]
      )) {
        if (splice2) {
          ensureAssigned(splice2, 0);
          yield splice2;
          splice2 = void 0;
        }
      } else {
        if (!splice2) {
          splice2 = newSplice();
        }
        splice2[SPLICE_ADDED]++;
        splice2[SPLICE_REMOVED]++;
        ensureAssigned(splice2, currentIndex);
      }
      previousIndex++;
      currentIndex++;
    } else if (previous[previousIndex][KEY] < current[currentIndex][KEY]) {
      if (!splice2) {
        splice2 = newSplice();
      }
      splice2[SPLICE_REMOVED]++;
      previousIndex++;
    } else {
      if (!splice2) {
        splice2 = newSplice();
      }
      splice2[SPLICE_ADDED]++;
      ensureAssigned(splice2, currentIndex);
      currentIndex++;
    }
  }
  if (currentIndex < current.length) {
    if (!splice2) {
      splice2 = newSplice();
    }
    splice2[SPLICE_ADDED] += current.length - currentIndex;
    ensureAssigned(splice2, currentIndex);
  }
  if (previousIndex < previous.length) {
    if (!splice2) {
      splice2 = newSplice();
    }
    splice2[SPLICE_REMOVED] += previous.length - previousIndex;
  }
  if (splice2) {
    ensureAssigned(splice2, 0);
    yield splice2;
  }
}
var NODE_HEADER_SIZE = 11;
var BTreeRead = (_Symbol_asyncIterator$1 = Symbol.asyncIterator, class {
  async getNode(hash2) {
    if (hash2 === emptyHash) {
      return emptyDataNodeImpl;
    }
    const cached = this._cache.get(hash2);
    if (cached) {
      return cached;
    }
    const chunk = await this._dagRead.mustGetChunk(hash2);
    const data = parseBTreeNode(chunk.data, this._formatVersion, this.getEntrySize);
    const impl = newNodeImpl(data[NODE_ENTRIES], hash2, data[NODE_LEVEL], false);
    this._cache.set(hash2, impl);
    return impl;
  }
  async get(key) {
    const leaf = await findLeaf(key, this.rootHash, this, this.rootHash);
    const index = binarySearch2$1(key, leaf.entries);
    if (!binarySearchFound(index, leaf.entries, key)) {
      return void 0;
    }
    return leaf.entries[index][1];
  }
  async has(key) {
    const leaf = await findLeaf(key, this.rootHash, this, this.rootHash);
    const index = binarySearch2$1(key, leaf.entries);
    return binarySearchFound(index, leaf.entries, key);
  }
  async isEmpty() {
    const { rootHash } = this;
    const node = await this.getNode(this.rootHash);
    if (this.rootHash !== rootHash) {
      return this.isEmpty();
    }
    return node.entries.length === 0;
  }
  // We don't do any encoding of the key in the map, so we have no way of
  // determining from an entry.key alone whether it is a regular key or an
  // encoded IndexKey in an index map. Without encoding regular map keys the
  // caller has to deal with encoding and decoding the keys for the index map.
  scan(fromKey) {
    return scanForHash(this.rootHash, () => this.rootHash, this.rootHash, fromKey, async (hash2) => {
      const cached = await this.getNode(hash2);
      if (cached) {
        return [
          cached.level,
          cached.isMutable ? cached.entries.slice() : cached.entries
        ];
      }
      const chunk = await this._dagRead.mustGetChunk(hash2);
      return parseBTreeNode(chunk.data, this._formatVersion, this.getEntrySize);
    });
  }
  async *keys() {
    const node = await this.getNode(this.rootHash);
    yield* node.keys(this);
  }
  async *entries() {
    const node = await this.getNode(this.rootHash);
    yield* node.entriesIter(this);
  }
  [_Symbol_asyncIterator$1]() {
    return this.entries();
  }
  async *diff(last) {
    const [currentNode, lastNode] = await Promise.all([
      this.getNode(this.rootHash),
      last.getNode(last.rootHash)
    ]);
    yield* diffNodes(lastNode, currentNode, last, this);
  }
  constructor(dagRead, formatVersion, root = emptyHash, getEntrySize = getSizeOfEntry, chunkHeaderSize = NODE_HEADER_SIZE) {
    _define_property$3(this, "_cache", /* @__PURE__ */ new Map());
    _define_property$3(this, "_dagRead", void 0);
    _define_property$3(this, "_formatVersion", void 0);
    _define_property$3(this, "rootHash", void 0);
    _define_property$3(this, "getEntrySize", void 0);
    _define_property$3(this, "chunkHeaderSize", void 0);
    this._dagRead = dagRead;
    this._formatVersion = formatVersion;
    this.rootHash = root;
    this.getEntrySize = getEntrySize;
    this.chunkHeaderSize = chunkHeaderSize;
  }
});
async function* diffNodes(last, current, lastTree, currentTree) {
  if (last.level > current.level) {
    const lastChild = await last.getCompositeChildren(0, last.entries.length, lastTree);
    yield* diffNodes(lastChild, current, lastTree, currentTree);
    return;
  }
  if (current.level > last.level) {
    const currentChild = await current.getCompositeChildren(0, current.entries.length, currentTree);
    yield* diffNodes(last, currentChild, lastTree, currentTree);
    return;
  }
  if (isDataNodeImpl(last) && isDataNodeImpl(current)) {
    yield* diffEntries(last.entries, current.entries);
    return;
  }
  const initialSplices = computeSplices(last.entries, current.entries);
  for (const splice2 of initialSplices) {
    const [lastChild, currentChild] = await Promise.all([
      last.getCompositeChildren(splice2[SPLICE_AT], splice2[SPLICE_REMOVED], lastTree),
      current.getCompositeChildren(splice2[SPLICE_FROM], splice2[SPLICE_ADDED], currentTree)
    ]);
    yield* diffNodes(lastChild, currentChild, lastTree, currentTree);
  }
}
function* diffEntries(lastEntries, currentEntries) {
  const lastLength = lastEntries.length;
  const currentLength = currentEntries.length;
  let i = 0;
  let j = 0;
  while (i < lastLength && j < currentLength) {
    const lastKey = lastEntries[i][0];
    const currentKey = currentEntries[j][0];
    if (lastKey === currentKey) {
      if (!deepEqual(lastEntries[i][1], currentEntries[j][1])) {
        yield {
          op: "change",
          key: lastKey,
          oldValue: lastEntries[i][1],
          newValue: currentEntries[j][1]
        };
      }
      i++;
      j++;
    } else if (lastKey < currentKey) {
      yield {
        op: "del",
        key: lastKey,
        oldValue: lastEntries[i][1]
      };
      i++;
    } else {
      yield {
        op: "add",
        key: currentKey,
        newValue: currentEntries[j][1]
      };
      j++;
    }
  }
  for (; i < lastLength; i++) {
    yield {
      op: "del",
      key: lastEntries[i][0],
      oldValue: lastEntries[i][1]
    };
  }
  for (; j < currentLength; j++) {
    yield {
      op: "add",
      key: currentEntries[j][0],
      newValue: currentEntries[j][1]
    };
  }
}
async function* scanForHash(expectedRootHash, getRootHash, hash2, fromKey, readNode) {
  if (hash2 === emptyHash) {
    return;
  }
  const data = await readNode(hash2);
  const entries = data[NODE_ENTRIES];
  let i = 0;
  if (fromKey) {
    i = binarySearch2$1(fromKey, entries);
  }
  if (data[NODE_LEVEL] > 0) {
    for (; i < entries.length; i++) {
      yield* scanForHash(expectedRootHash, getRootHash, entries[i][1], fromKey, readNode);
      fromKey = "";
    }
  } else {
    for (; i < entries.length; i++) {
      const rootHash = getRootHash();
      if (expectedRootHash !== rootHash) {
        yield* scanForHash(rootHash, getRootHash, rootHash, entries[i][0], readNode);
        return;
      }
      yield entries[i];
    }
  }
}
async function allEntriesAsDiff(map, op) {
  const diff3 = [];
  const make = op === "add" ? (entry) => ({
    op: "add",
    key: entry[0],
    newValue: entry[1]
  }) : (entry) => ({
    op: "del",
    key: entry[0],
    oldValue: entry[1]
  });
  for await (const entry of map.entries()) {
    diff3.push(make(entry));
  }
  return diff3;
}
function stringCompare(a, b) {
  if (a === b) {
    return 0;
  }
  if (a < b) {
    return -1;
  }
  return 1;
}
function compareCookies(a, b) {
  if (a === b) {
    return 0;
  }
  if (a === null) {
    return -1;
  }
  if (b === null) {
    return 1;
  }
  const cva = getCompareValue(a);
  const cvb = getCompareValue(b);
  if (typeof cva === "string" || typeof cvb === "string") {
    return stringCompare(String(cva), String(cvb));
  }
  return cva - cvb;
}
function getCompareValue(cookie) {
  if (typeof cookie === "string" || typeof cookie === "number") {
    return cookie;
  }
  return cookie.order;
}
function assertCookie(v2) {
  if (v2 === null || typeof v2 === "string" || typeof v2 === "number") {
    return;
  }
  assertJSONObject(v2);
  if (typeof v2.order === "string" || typeof v2.order === "number") {
    return;
  }
  throw new Error("Invalid cookie");
}
function asRefs(sortedRefs) {
  return sortedRefs;
}
function toRefs(refs) {
  if (Array.isArray(refs)) {
    refs.sort();
    for (let i = 1; i < refs.length; i++) {
      assert(refs[i - 1] !== refs[i], "Refs must not have duplicates");
    }
    return asRefs(refs);
  }
  const refsArray = [
    ...refs
  ];
  refsArray.sort();
  return asRefs(refsArray);
}
var Chunk = class {
  constructor(hash2, data, refs) {
    _define_property$3(this, "hash", void 0);
    _define_property$3(this, "data", void 0);
    _define_property$3(this, "meta", void 0);
    assert(!refs.includes(hash2), "Chunk cannot reference itself");
    this.hash = hash2;
    this.data = data;
    this.meta = refs;
  }
};
function assertRefs(v2) {
  if (!Array.isArray(v2)) {
    throw new Error("Refs must be an array");
  }
  if (v2.length > 0) {
    assertString(v2[0]);
    for (let i = 1; i < v2.length; i++) {
      assertString(v2[i]);
    }
  }
}
function createChunk(data, refs, chunkHasher) {
  const hash2 = chunkHasher();
  return new Chunk(hash2, data, refs);
}
var ChunkNotFoundError = class extends Error {
  constructor(hash2) {
    super(`Chunk not found ${hash2}`), _define_property$3(this, "name", "ChunkNotFoundError"), _define_property$3(this, "hash", void 0);
    this.hash = hash2;
  }
};
async function mustGetChunk(store, hash2) {
  const chunk = await store.getChunk(hash2);
  if (chunk) {
    return chunk;
  }
  throw new ChunkNotFoundError(hash2);
}
async function mustGetHeadHash(name, store) {
  const hash2 = await store.getHead(name);
  assert(hash2, `Missing head ${name}`);
  return hash2;
}
var LocalDD31 = 4;
var SnapshotDD31 = 5;
var DEFAULT_HEAD_NAME = "main";
function commitIsLocalDD31(commit) {
  return isLocalMetaDD31(commit.meta);
}
function commitIsLocal(commit) {
  return commitIsLocalDD31(commit);
}
function commitIsSnapshot(commit) {
  return isSnapshotMetaDD31(commit.meta);
}
var Commit = class {
  get meta() {
    return this.chunk.data.meta;
  }
  get valueHash() {
    return this.chunk.data.valueHash;
  }
  getMutationID(clientID, dagRead) {
    return getMutationID(clientID, dagRead, this.meta);
  }
  async getNextMutationID(clientID, dagRead) {
    return await this.getMutationID(clientID, dagRead) + 1;
  }
  get indexes() {
    return this.chunk.data.indexes;
  }
  constructor(chunk) {
    _define_property$3(this, "chunk", void 0);
    this.chunk = chunk;
  }
};
async function getMutationID(clientID, dagRead, meta) {
  switch (meta.type) {
    case SnapshotDD31:
      return meta.lastMutationIDs[clientID] ?? 0;
    case LocalDD31: {
      if (meta.clientID === clientID) {
        return meta.mutationID;
      }
      const { basisHash } = meta;
      const basisCommit = await commitFromHash(basisHash, dagRead);
      return getMutationID(clientID, dagRead, basisCommit.meta);
    }
    default:
      unreachable();
  }
}
async function localMutations(fromCommitHash, dagRead) {
  const commits = await commitChain(fromCommitHash, dagRead);
  return commits.filter((c) => commitIsLocal(c));
}
async function localMutationsDD31(fromCommitHash, dagRead) {
  const commits = await commitChain(fromCommitHash, dagRead);
  return commits.filter((c) => commitIsLocalDD31(c));
}
async function localMutationsGreaterThan(commit, mutationIDLimits, dagRead) {
  const commits = [];
  const remainingMutationIDLimits = new Map(Object.entries(mutationIDLimits));
  while (!commitIsSnapshot(commit) && remainingMutationIDLimits.size > 0) {
    if (commitIsLocalDD31(commit)) {
      const { meta } = commit;
      const mutationIDLowerLimit = remainingMutationIDLimits.get(meta.clientID);
      if (mutationIDLowerLimit !== void 0) {
        if (meta.mutationID <= mutationIDLowerLimit) {
          remainingMutationIDLimits.delete(meta.clientID);
        } else {
          commits.push(commit);
        }
      }
    }
    const { basisHash } = commit.meta;
    if (basisHash === null) {
      throw new Error(`Commit ${commit.chunk.hash} has no basis`);
    }
    commit = await commitFromHash(basisHash, dagRead);
  }
  return commits;
}
async function baseSnapshotFromHead(name, dagRead) {
  const hash2 = await dagRead.getHead(name);
  assert(hash2, `Missing head ${name}`);
  return baseSnapshotFromHash(hash2, dagRead);
}
async function baseSnapshotHashFromHash(hash2, dagRead) {
  return (await baseSnapshotFromHash(hash2, dagRead)).chunk.hash;
}
async function baseSnapshotFromHash(hash2, dagRead) {
  const commit = await commitFromHash(hash2, dagRead);
  return baseSnapshotFromCommit(commit, dagRead);
}
async function baseSnapshotFromCommit(commit, dagRead) {
  while (!commitIsSnapshot(commit)) {
    const { meta } = commit;
    if (isLocalMetaDD31(meta)) {
      commit = await commitFromHash(meta.baseSnapshotHash, dagRead);
    } else {
      const { basisHash } = meta;
      if (basisHash === null) {
        throw new Error(`Commit ${commit.chunk.hash} has no basis`);
      }
      commit = await commitFromHash(basisHash, dagRead);
    }
  }
  return commit;
}
function snapshotMetaParts(c, clientID) {
  const m = c.meta;
  const lmid = m.lastMutationIDs[clientID] ?? 0;
  return [
    lmid,
    m.cookieJSON
  ];
}
function compareCookiesForSnapshots(a, b) {
  return compareCookies(a.meta.cookieJSON, b.meta.cookieJSON);
}
async function commitChain(fromCommitHash, dagRead) {
  let commit = await commitFromHash(fromCommitHash, dagRead);
  const commits = [];
  while (!commitIsSnapshot(commit)) {
    const { meta } = commit;
    const { basisHash } = meta;
    if (basisHash === null) {
      throw new Error(`Commit ${commit.chunk.hash} has no basis`);
    }
    commits.push(commit);
    commit = await commitFromHash(basisHash, dagRead);
  }
  commits.push(commit);
  return commits;
}
async function commitFromHash(hash2, dagRead) {
  const chunk = await dagRead.mustGetChunk(hash2);
  return fromChunk(chunk);
}
async function commitFromHead(name, dagRead) {
  const hash2 = await mustGetHeadHash(name, dagRead);
  return commitFromHash(hash2, dagRead);
}
function assertLocalMetaDD31(v2) {
  assertString(v2.clientID);
  assertNumber(v2.mutationID);
  assertString(v2.mutatorName);
  if (!v2.mutatorName) {
    throw new Error("Missing mutator name");
  }
  assertJSONValue(v2.mutatorArgsJSON);
  if (v2.originalHash !== null) {
    assertHash(v2.originalHash);
  }
  assertNumber(v2.timestamp);
}
function isLocalMetaDD31(meta) {
  return meta.type === LocalDD31;
}
function assertSnapshotMetaDD31(v2) {
  if (v2.basisHash !== null) {
    assertHash(v2.basisHash);
  }
  assertJSONValue(v2.cookieJSON);
  assertLastMutationIDs(v2.lastMutationIDs);
}
function assertLastMutationIDs(v2) {
  assertObject(v2);
  for (const e of Object.values(v2)) {
    assertNumber(e);
  }
}
function assertSnapshotCommitDD31(c) {
  assertSnapshotMetaDD31(c.meta);
}
function isSnapshotMetaDD31(meta) {
  return meta.type === SnapshotDD31;
}
function chunkIndexDefinitionEqualIgnoreName(a, b) {
  return a.jsonPointer === b.jsonPointer && (a.allowEmpty ?? false) === (b.allowEmpty ?? false) && a.keyPrefix === b.keyPrefix;
}
function toChunkIndexDefinition(name, indexDefinition) {
  return {
    name,
    keyPrefix: indexDefinition.prefix ?? "",
    jsonPointer: indexDefinition.jsonPointer,
    allowEmpty: indexDefinition.allowEmpty ?? false
  };
}
function newLocalDD31(createChunk2, basisHash, baseSnapshotHash, mutationID, mutatorName, mutatorArgsJSON, originalHash, valueHash, indexes, timestamp, clientID) {
  const meta = {
    type: LocalDD31,
    basisHash,
    baseSnapshotHash,
    mutationID,
    mutatorName,
    mutatorArgsJSON,
    originalHash,
    timestamp,
    clientID
  };
  return commitFromCommitData(createChunk2, makeCommitData(meta, valueHash, indexes));
}
function newSnapshotDD31(createChunk2, basisHash, lastMutationIDs, cookieJSON, valueHash, indexes) {
  return commitFromCommitData(createChunk2, newSnapshotCommitDataDD31(basisHash, lastMutationIDs, cookieJSON, valueHash, indexes));
}
function newSnapshotCommitDataDD31(basisHash, lastMutationIDs, cookieJSON, valueHash, indexes) {
  const meta = {
    type: SnapshotDD31,
    basisHash,
    lastMutationIDs,
    cookieJSON
  };
  return makeCommitData(meta, valueHash, indexes);
}
function fromChunk(chunk) {
  validateChunk(chunk);
  return new Commit(chunk);
}
function commitFromCommitData(createChunk2, data) {
  return new Commit(createChunk2(data, getRefs(data)));
}
function getRefs(data) {
  const refs = /* @__PURE__ */ new Set();
  refs.add(data.valueHash);
  const { meta } = data;
  switch (meta.type) {
    case LocalDD31:
      meta.basisHash && refs.add(meta.basisHash);
      break;
    case SnapshotDD31:
      break;
    default:
      unreachable();
  }
  for (const index of data.indexes) {
    refs.add(index.valueHash);
  }
  return toRefs(refs);
}
function makeCommitData(meta, valueHash, indexes) {
  return deepFreeze({
    meta,
    valueHash,
    indexes
  });
}
function validateChunk(chunk) {
  const { data } = chunk;
  const seen = /* @__PURE__ */ new Set();
  for (const index of data.indexes) {
    const { name } = index.definition;
    if (seen.has(name)) {
      throw new Error(`Duplicate index ${name}`);
    }
    seen.add(name);
  }
}
var Add = 0;
var Remove = 1;
var IndexRead = class {
  constructor(meta, map) {
    _define_property$3(this, "meta", void 0);
    _define_property$3(this, "map", void 0);
    this.meta = meta;
    this.map = map;
  }
};
var IndexWrite = class extends IndexRead {
  // Note: does not update self.meta.valueHash (doesn't need to at this point as flush
  // is only called during commit.)
  flush() {
    return this.map.flush();
  }
  clear() {
    return this.map.clear();
  }
};
async function indexValue(lc, index, op, key, val, jsonPointer, allowEmpty) {
  try {
    for (const entry of getIndexKeys(key, val, jsonPointer, allowEmpty)) {
      switch (op) {
        case Add:
          await index.put(entry, val);
          break;
        case Remove:
          await index.del(entry);
          break;
      }
    }
  } catch (e) {
    lc.info?.("Not indexing value", val, ":", e);
  }
}
function getIndexKeys(primary, value, jsonPointer, allowEmpty) {
  const target = evaluateJSONPointer(value, jsonPointer);
  if (target === void 0) {
    if (allowEmpty) {
      return [];
    }
    throw new Error(`No value at path: ${jsonPointer}`);
  }
  const values = Array.isArray(target) ? target : [
    target
  ];
  const indexKeys = [];
  for (const value2 of values) {
    if (typeof value2 === "string") {
      indexKeys.push(encodeIndexKey([
        value2,
        primary
      ]));
    } else {
      throw new Error("Unsupported target type");
    }
  }
  return indexKeys;
}
var KEY_VERSION_0 = "\0";
var KEY_SEPARATOR = "\0";
function encodeIndexKey(indexKey) {
  const secondary = indexKey[0];
  const primary = indexKey[1];
  if (secondary.includes("\0")) {
    throw new Error("Secondary key cannot contain null byte");
  }
  return KEY_VERSION_0 + secondary + KEY_SEPARATOR + primary;
}
function encodeIndexScanKey(secondary, primary) {
  const k = encodeIndexKey([
    secondary,
    primary || ""
  ]);
  if (primary === void 0) {
    return k.slice(0, k.length - 1);
  }
  return k;
}
function decodeIndexKey(encodedIndexKey) {
  if (encodedIndexKey[0] !== KEY_VERSION_0) {
    throw new Error("Invalid version");
  }
  const versionLen = KEY_VERSION_0.length;
  const separatorLen = KEY_SEPARATOR.length;
  const separatorOffset = encodedIndexKey.indexOf(KEY_SEPARATOR, versionLen);
  if (separatorOffset === -1) {
    throw new Error("Invalid formatting");
  }
  const secondary = encodedIndexKey.slice(versionLen, separatorOffset);
  const primary = encodedIndexKey.slice(separatorOffset + separatorLen);
  return [
    secondary,
    primary
  ];
}
function evaluateJSONPointer(value, pointer) {
  function parseIndex(s) {
    if (s.startsWith("+") || s.startsWith("0") && s.length !== 1) {
      return void 0;
    }
    return parseInt(s, 10);
  }
  if (pointer === "") {
    return value;
  }
  if (!pointer.startsWith("/")) {
    throw new Error(`Invalid JSON pointer: ${pointer}`);
  }
  const tokens = pointer.split("/").slice(1).map((x) => x.replace(/~1/g, "/").replace(/~0/g, "~"));
  let target = value;
  for (const token of tokens) {
    let targetOpt;
    if (Array.isArray(target)) {
      const i = parseIndex(token);
      if (i === void 0) {
        return void 0;
      }
      targetOpt = target[i];
    } else if (target === null) {
      return void 0;
    } else if (typeof target === "object") {
      target = target;
      targetOpt = target[token];
    }
    if (targetOpt === void 0) {
      return void 0;
    }
    target = targetOpt;
  }
  return target;
}
var Read = (_dagRead$1 = /* @__PURE__ */ new WeakMap(), class {
  has(key) {
    return this.map.has(key);
  }
  get(key) {
    return this.map.get(key);
  }
  isEmpty() {
    return this.map.isEmpty();
  }
  getMapForIndex(indexName) {
    const idx = this.indexes.get(indexName);
    if (idx === void 0) {
      throw new Error(`Unknown index name: ${indexName}`);
    }
    return idx.map;
  }
  get closed() {
    return _class_private_field_get$4(this, _dagRead$1).closed;
  }
  close() {
    _class_private_field_get$4(this, _dagRead$1).release();
  }
  constructor(dagRead, map, indexes) {
    _class_private_field_init$4(this, _dagRead$1, {
      writable: true,
      value: void 0
    });
    _define_property$3(this, "map", void 0);
    _define_property$3(this, "indexes", void 0);
    _class_private_field_set$4(this, _dagRead$1, dagRead);
    this.map = map;
    this.indexes = indexes;
  }
});
function readFromDefaultHead(dagRead, formatVersion) {
  return readFromHead(DEFAULT_HEAD_NAME, dagRead, formatVersion);
}
async function readFromHead(name, dagRead, formatVersion) {
  const commit = await commitFromHead(name, dagRead);
  return readFromCommit(commit, dagRead, formatVersion);
}
async function readFromHash(hash2, dagRead, formatVersion) {
  const commit = await commitFromHash(hash2, dagRead);
  return readFromCommit(commit, dagRead, formatVersion);
}
function readFromCommit(commit, dagRead, formatVersion) {
  const indexes = readIndexesForRead(commit, dagRead, formatVersion);
  const map = new BTreeRead(dagRead, formatVersion, commit.valueHash);
  return new Read(dagRead, map, indexes);
}
function readIndexesForRead(commit, dagRead, formatVersion) {
  const m = /* @__PURE__ */ new Map();
  for (const index of commit.indexes) {
    m.set(index.definition.name, new IndexRead(index, new BTreeRead(dagRead, formatVersion, index.valueHash)));
  }
  return m;
}
function withRead(store, fn) {
  return using(store.read(), fn);
}
function withWriteNoImplicitCommit(store, fn) {
  return using(store.write(), fn);
}
function withWrite(store, fn) {
  return using(store.write(), async (write) => {
    const result = await fn(write);
    await write.commit();
    return result;
  });
}
async function using(x, fn) {
  const write = await x;
  try {
    return await fn(write);
  } finally {
    write.release();
  }
}
var indexDefinitionSchema = readonlyObject({
  prefix: valita_exports.string().optional(),
  jsonPointer: valita_exports.string(),
  allowEmpty: valita_exports.boolean().optional()
});
var indexDefinitionsSchema = readonlyRecord(indexDefinitionSchema);
function indexDefinitionEqual(a, b) {
  return a.jsonPointer === b.jsonPointer && (a.allowEmpty ?? false) === (b.allowEmpty ?? false) && (a.prefix ?? "") === (b.prefix ?? "");
}
function indexDefinitionsEqual(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }
  for (const [aKey, aValue] of Object.entries(a)) {
    const bValue = b[aKey];
    if (!bValue || !indexDefinitionEqual(aValue, bValue)) {
      return false;
    }
  }
  return true;
}
var clientGroupSchema = readonlyObject({
  /**
  * The hash of the commit in the perdag last persisted to this client group.
  * Should only be updated by clients assigned to this client group.
  */
  headHash: hashSchema,
  /**
  * Set of mutator names common to all clients assigned to this client group.
  */
  mutatorNames: readonlyArray(valita_exports.string()),
  /**
  * Index definitions common to all clients assigned to this client group.
  */
  indexes: indexDefinitionsSchema,
  /**
  * The highest mutation ID of every client assigned to this client group.
  * Should only be updated by clients assigned to this client group. Read by
  * other clients to determine if there are unacknowledged pending mutations
  * for them to try to recover. This is redundant with information in the
  * commit graph at `headHash`, but allows other clients to determine if there
  * are unacknowledged pending mutations without having to load the commit
  * graph.
  */
  mutationIDs: readonlyRecord(valita_exports.number()),
  /**
  * The highest lastMutationID received from the server for every client
  * assigned to this client group.
  *
  * Should be updated by the clients assigned to this client group whenever
  * they persist to this client group. Read by other clients to determine if
  * there are unacknowledged pending mutations for them to recover and
  * *updated* by other clients upon successfully recovering pending mutations
  * to avoid redundant pushes of pending mutations.
  *
  * Note: This will be the same as the `lastMutationIDs` of the base snapshot
  * of the client group's commit graph when written by clients assigned to this
  * client group.  However, when written by another client recovering mutations
  * it may be different because the other client does not update the commit
  * graph.
  */
  lastServerAckdMutationIDs: valita_exports.record(valita_exports.number()),
  /**
  * If the server deletes this client group it can signal that the client group
  * was deleted. If that happens we mark this client group as disabled so that
  * we do not use it again when creating new clients.
  */
  disabled: valita_exports.boolean()
});
var CLIENT_GROUPS_HEAD_NAME = "client-groups";
function assertClientGroup(value) {
  assert2(value, clientGroupSchema);
}
function chunkDataToClientGroupMap(chunkData) {
  assertObject(chunkData);
  const clientGroups = /* @__PURE__ */ new Map();
  for (const [key, value] of Object.entries(chunkData)) {
    if (value !== void 0) {
      assertClientGroup(value);
      clientGroups.set(key, value);
    }
  }
  return clientGroups;
}
function clientGroupMapToChunkData(clientGroups, dagWrite) {
  const chunkData = {};
  for (const [clientGroupID, clientGroup] of clientGroups.entries()) {
    dagWrite.assertValidHash(clientGroup.headHash);
    chunkData[clientGroupID] = {
      ...clientGroup,
      mutatorNames: [
        ...clientGroup.mutatorNames.values()
      ]
    };
  }
  return deepFreeze(chunkData);
}
async function getClientGroupsAtHash(hash2, dagRead) {
  const chunk = await dagRead.getChunk(hash2);
  return chunkDataToClientGroupMap(chunk?.data);
}
async function getClientGroups(dagRead) {
  const hash2 = await dagRead.getHead(CLIENT_GROUPS_HEAD_NAME);
  if (!hash2) {
    return /* @__PURE__ */ new Map();
  }
  return getClientGroupsAtHash(hash2, dagRead);
}
async function setClientGroups(clientGroups, dagWrite) {
  const currClientGroups = await getClientGroups(dagWrite);
  for (const [clientGroupID, clientGroup] of clientGroups) {
    const currClientGroup = currClientGroups.get(clientGroupID);
    validateClientGroupUpdate(clientGroup, currClientGroup);
  }
  return setValidatedClientGroups(clientGroups, dagWrite);
}
async function setClientGroup(clientGroupID, clientGroup, dagWrite) {
  const currClientGroups = await getClientGroups(dagWrite);
  const currClientGroup = currClientGroups.get(clientGroupID);
  validateClientGroupUpdate(clientGroup, currClientGroup);
  const newClientGroups = new Map(currClientGroups);
  newClientGroups.set(clientGroupID, clientGroup);
  return setValidatedClientGroups(newClientGroups, dagWrite);
}
function validateClientGroupUpdate(clientGroup, currClientGroup) {
  const mutatorNamesSet = new Set(clientGroup.mutatorNames);
  assert(mutatorNamesSet.size === clientGroup.mutatorNames.length, "A client group's mutatorNames must be a set.");
  if (currClientGroup !== void 0) {
    assert(indexDefinitionsEqual(currClientGroup.indexes, clientGroup.indexes), "A client group's index definitions must never change.");
    assert(mutatorNamesEqual(mutatorNamesSet, currClientGroup.mutatorNames), "A client group's mutatorNames must never change.");
  }
}
async function setValidatedClientGroups(clientGroups, dagWrite) {
  const chunkData = clientGroupMapToChunkData(clientGroups, dagWrite);
  const refs = /* @__PURE__ */ new Set();
  for (const clientGroup of clientGroups.values()) {
    refs.add(clientGroup.headHash);
  }
  const chunk = dagWrite.createChunk(chunkData, toRefs(refs));
  await dagWrite.putChunk(chunk);
  await dagWrite.setHead(CLIENT_GROUPS_HEAD_NAME, chunk.hash);
  return clientGroups;
}
function mutatorNamesEqual(mutatorNamesSet, mutatorNames) {
  if (mutatorNames.length !== mutatorNamesSet.size) {
    return false;
  }
  for (const mutatorName of mutatorNames) {
    if (!mutatorNamesSet.has(mutatorName)) {
      return false;
    }
  }
  return true;
}
async function getClientGroup(id, dagRead) {
  const clientGroups = await getClientGroups(dagRead);
  return clientGroups.get(id);
}
function clientGroupHasPendingMutations(clientGroup) {
  for (const [clientID, mutationID] of Object.entries(clientGroup.mutationIDs)) {
    const lastServerAckdMutationID = clientGroup.lastServerAckdMutationIDs[clientID];
    if (lastServerAckdMutationID === void 0 && mutationID !== 0 || lastServerAckdMutationID < mutationID) {
      return true;
    }
  }
  return false;
}
async function disableClientGroup(clientGroupID, dagWrite) {
  const clientGroup = await getClientGroup(clientGroupID, dagWrite);
  if (!clientGroup) {
    return;
  }
  const disabledClientGroup = {
    ...clientGroup,
    disabled: true
  };
  await setClientGroup(clientGroupID, disabledClientGroup, dagWrite);
}
async function asyncIterableToArray(it) {
  const arr2 = [];
  for await (const v2 of it) {
    arr2.push(v2);
  }
  return arr2;
}
function diff(oldMap, newMap) {
  return asyncIterableToArray(newMap.diff(oldMap));
}
var BTreeWrite = (_lock = /* @__PURE__ */ new WeakMap(), _modified = /* @__PURE__ */ new WeakMap(), _addToModified = /* @__PURE__ */ new WeakSet(), _class1$1 = class extends BTreeRead {
  updateNode(node) {
    assert(node.isMutable);
    _class_private_field_get$4(this, _modified).delete(node.hash);
    node.hash = newRandomHash();
    _class_private_method_get$1(this, _addToModified, addToModified).call(this, node);
  }
  newInternalNodeImpl(entries, level) {
    const n = new InternalNodeImpl(entries, newRandomHash(), level, true);
    _class_private_method_get$1(this, _addToModified, addToModified).call(this, n);
    return n;
  }
  newDataNodeImpl(entries) {
    const n = new DataNodeImpl(entries, newRandomHash(), true);
    _class_private_method_get$1(this, _addToModified, addToModified).call(this, n);
    return n;
  }
  newNodeImpl(entries, level) {
    const n = newNodeImpl(entries, newRandomHash(), level, true);
    _class_private_method_get$1(this, _addToModified, addToModified).call(this, n);
    return n;
  }
  put(key, value) {
    return _class_private_field_get$4(this, _lock).withLock(async () => {
      const oldRootNode = await this.getNode(this.rootHash);
      const entrySize = this.getEntrySize(key, value);
      const rootNode = await oldRootNode.set(key, value, entrySize, this);
      if (rootNode.getChildNodeSize(this) > this.maxSize) {
        const headerSize = this.chunkHeaderSize;
        const partitions = partition(rootNode.entries, (value2) => value2[2], this.minSize - headerSize, this.maxSize - headerSize);
        const { level } = rootNode;
        const entries = partitions.map((entries2) => {
          const node = this.newNodeImpl(entries2, level);
          return createNewInternalEntryForNode(node, this.getEntrySize);
        });
        const newRoot = this.newInternalNodeImpl(entries, level + 1);
        this.rootHash = newRoot.hash;
        return;
      }
      this.rootHash = rootNode.hash;
    });
  }
  del(key) {
    return _class_private_field_get$4(this, _lock).withLock(async () => {
      const oldRootNode = await this.getNode(this.rootHash);
      const newRootNode = await oldRootNode.del(key, this);
      const found = this.rootHash !== newRootNode.hash;
      if (found) {
        if (newRootNode.level > 0 && newRootNode.entries.length === 1) {
          this.rootHash = newRootNode.entries[0][1];
        } else {
          this.rootHash = newRootNode.hash;
        }
      }
      return found;
    });
  }
  clear() {
    return _class_private_field_get$4(this, _lock).withLock(() => {
      _class_private_field_get$4(this, _modified).clear();
      this.rootHash = emptyHash;
    });
  }
  flush() {
    return _class_private_field_get$4(this, _lock).withLock(async () => {
      const dagWrite = this._dagRead;
      if (this.rootHash === emptyHash) {
        const chunk = dagWrite.createChunk(emptyDataNode, []);
        await dagWrite.putChunk(chunk);
        return chunk.hash;
      }
      const newChunks = [];
      const newRoot = gatherNewChunks(this.rootHash, newChunks, dagWrite.createChunk, _class_private_field_get$4(this, _modified), this._formatVersion);
      await Promise.all(newChunks.map((chunk) => dagWrite.putChunk(chunk)));
      _class_private_field_get$4(this, _modified).clear();
      this.rootHash = newRoot;
      return newRoot;
    });
  }
  constructor(dagWrite, formatVersion, root = emptyHash, minSize = 8 * 1024, maxSize = 16 * 1024, getEntrySize = getSizeOfEntry, chunkHeaderSize) {
    super(dagWrite, formatVersion, root, getEntrySize, chunkHeaderSize), _class_private_method_init$1(this, _addToModified), _class_private_field_init$4(this, _lock, {
      writable: true,
      value: new Lock()
    }), _class_private_field_init$4(this, _modified, {
      writable: true,
      value: /* @__PURE__ */ new Map()
    }), _define_property$3(this, "minSize", void 0), _define_property$3(this, "maxSize", void 0);
    this.minSize = minSize;
    this.maxSize = maxSize;
  }
}, _class1$1);
function gatherNewChunks(hash2, newChunks, createChunk2, modified, formatVersion) {
  const node = modified.get(hash2);
  if (node === void 0) {
    return hash2;
  }
  if (isDataNodeImpl(node)) {
    const chunk2 = createChunk2(toChunkData(node, formatVersion), []);
    newChunks.push(chunk2);
    return chunk2.hash;
  }
  const refs = [];
  const { entries } = node;
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const childHash = entry[1];
    const newChildHash = gatherNewChunks(childHash, newChunks, createChunk2, modified, formatVersion);
    if (newChildHash !== childHash) {
      entries[i] = [
        entry[0],
        newChildHash,
        entry[2]
      ];
    }
    refs.push(newChildHash);
  }
  const chunk = createChunk2(toChunkData(node, formatVersion), toRefs(refs));
  newChunks.push(chunk);
  return chunk.hash;
}
function lazy(factory) {
  let value;
  return () => {
    if (value === void 0) {
      value = factory();
    }
    return value;
  };
}
var DiffsMap = class extends Map {
  set(key, value) {
    if (value.length === 0) {
      return this;
    }
    return super.set(key, value);
  }
};
async function diff2(oldHash, newHash, read, diffConfig, formatVersion) {
  const [oldCommit, newCommit] = await Promise.all([
    commitFromHash(oldHash, read),
    commitFromHash(newHash, read)
  ]);
  return diffCommits(oldCommit, newCommit, read, diffConfig, formatVersion);
}
async function diffCommits(oldCommit, newCommit, read, diffConfig, formatVersion) {
  const diffsMap = new DiffsMap();
  if (!diffConfig.shouldComputeDiffs()) {
    return diffsMap;
  }
  const oldMap = new BTreeRead(read, formatVersion, oldCommit.valueHash);
  const newMap = new BTreeRead(read, formatVersion, newCommit.valueHash);
  const valueDiff = await diff(oldMap, newMap);
  diffsMap.set("", valueDiff);
  await addDiffsForIndexes(oldCommit, newCommit, read, diffsMap, diffConfig, formatVersion);
  return diffsMap;
}
async function addDiffsForIndexes(mainCommit, syncCommit, read, diffsMap, diffConfig, formatVersion) {
  const oldIndexes = readIndexesForRead(mainCommit, read, formatVersion);
  const newIndexes = readIndexesForRead(syncCommit, read, formatVersion);
  for (const [oldIndexName, oldIndex] of oldIndexes) {
    if (!diffConfig.shouldComputeDiffsForIndex(oldIndexName)) {
      continue;
    }
    const newIndex = newIndexes.get(oldIndexName);
    if (newIndex !== void 0) {
      assert(newIndex !== oldIndex);
      const diffs = await diff(oldIndex.map, newIndex.map);
      newIndexes.delete(oldIndexName);
      diffsMap.set(oldIndexName, diffs);
    } else {
      const diffs = await allEntriesAsDiff(oldIndex.map, "del");
      diffsMap.set(oldIndexName, diffs);
    }
  }
  for (const [newIndexName, newIndex] of newIndexes) {
    if (!diffConfig.shouldComputeDiffsForIndex(newIndexName)) {
      continue;
    }
    const diffs = await allEntriesAsDiff(newIndex.map, "add");
    diffsMap.set(newIndexName, diffs);
  }
}
var Write = (_dagWrite = /* @__PURE__ */ new WeakMap(), _basis = /* @__PURE__ */ new WeakMap(), _meta = /* @__PURE__ */ new WeakMap(), _clientID$1 = /* @__PURE__ */ new WeakMap(), _formatVersion = /* @__PURE__ */ new WeakMap(), _generateDiffs = /* @__PURE__ */ new WeakSet(), _class2$1 = class extends Read {
  /**
  * The value needs to be frozen since it is kept in memory and used later for
  * comparison as well as returned in `get`.
  */
  async put(lc, key, value) {
    const oldVal = lazy(() => this.map.get(key));
    await updateIndexes(lc, this.indexes, key, oldVal, value);
    await this.map.put(key, value);
  }
  getMutationID() {
    return getMutationID(_class_private_field_get$4(this, _clientID$1), _class_private_field_get$4(this, _dagWrite), _class_private_field_get$4(this, _meta));
  }
  async del(lc, key) {
    const oldVal = lazy(() => this.map.get(key));
    if (oldVal !== void 0) {
      await updateIndexes(lc, this.indexes, key, oldVal, void 0);
    }
    return this.map.del(key);
  }
  async clear() {
    await this.map.clear();
    const ps = [];
    for (const idx of this.indexes.values()) {
      ps.push(idx.clear());
    }
    await Promise.all(ps);
  }
  async putCommit() {
    const valueHash = await this.map.flush();
    const indexRecords = [];
    for (const index of this.indexes.values()) {
      const valueHash2 = await index.flush();
      const indexRecord = {
        definition: index.meta.definition,
        valueHash: valueHash2
      };
      indexRecords.push(indexRecord);
    }
    let commit;
    const meta = _class_private_field_get$4(this, _meta);
    switch (meta.type) {
      case LocalDD31: {
        assert(_class_private_field_get$4(this, _formatVersion) >= DD31);
        const { basisHash, mutationID, mutatorName, mutatorArgsJSON, originalHash, timestamp } = meta;
        commit = newLocalDD31(_class_private_field_get$4(this, _dagWrite).createChunk, basisHash, await baseSnapshotHashFromHash(basisHash, _class_private_field_get$4(this, _dagWrite)), mutationID, mutatorName, mutatorArgsJSON, originalHash, valueHash, indexRecords, timestamp, _class_private_field_get$4(this, _clientID$1));
        break;
      }
      case SnapshotDD31: {
        assert(_class_private_field_get$4(this, _formatVersion) > DD31);
        const { basisHash, lastMutationIDs, cookieJSON } = meta;
        commit = newSnapshotDD31(_class_private_field_get$4(this, _dagWrite).createChunk, basisHash, lastMutationIDs, cookieJSON, valueHash, indexRecords);
        break;
      }
    }
    await _class_private_field_get$4(this, _dagWrite).putChunk(commit.chunk);
    return commit;
  }
  // Return value is the hash of the new commit.
  async commit(headName) {
    const commit = await this.putCommit();
    const commitHash = commit.chunk.hash;
    await _class_private_field_get$4(this, _dagWrite).setHead(headName, commitHash);
    await _class_private_field_get$4(this, _dagWrite).commit();
    return commitHash;
  }
  async commitWithDiffs(headName, diffConfig) {
    const commit = this.putCommit();
    const diffMap = await _class_private_method_get$1(this, _generateDiffs, generateDiffs).call(this, diffConfig);
    const commitHash = (await commit).chunk.hash;
    await _class_private_field_get$4(this, _dagWrite).setHead(headName, commitHash);
    await _class_private_field_get$4(this, _dagWrite).commit();
    return [
      commitHash,
      diffMap
    ];
  }
  close() {
    _class_private_field_get$4(this, _dagWrite).release();
  }
  constructor(dagWrite, map, basis, meta, indexes, clientID, formatVersion) {
    super(dagWrite, map, indexes), _class_private_method_init$1(this, _generateDiffs), _class_private_field_init$4(this, _dagWrite, {
      writable: true,
      value: void 0
    }), _class_private_field_init$4(this, _basis, {
      writable: true,
      value: void 0
    }), _class_private_field_init$4(this, _meta, {
      writable: true,
      value: void 0
    }), _class_private_field_init$4(this, _clientID$1, {
      writable: true,
      value: void 0
    }), _class_private_field_init$4(this, _formatVersion, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$4(this, _dagWrite, dagWrite);
    _class_private_field_set$4(this, _basis, basis);
    _class_private_field_set$4(this, _meta, meta);
    _class_private_field_set$4(this, _clientID$1, clientID);
    _class_private_field_set$4(this, _formatVersion, formatVersion);
    if (basis === void 0) {
      assert(meta.basisHash === emptyHash);
    } else {
      assert(meta.basisHash === basis.chunk.hash);
    }
  }
}, _class2$1);
async function newWriteLocal(basisHash, mutatorName, mutatorArgsJSON, originalHash, dagWrite, timestamp, clientID, formatVersion) {
  const basis = await commitFromHash(basisHash, dagWrite);
  const bTreeWrite = new BTreeWrite(dagWrite, formatVersion, basis.valueHash);
  const mutationID = await basis.getNextMutationID(clientID, dagWrite);
  const indexes = readIndexesForWrite(basis, dagWrite, formatVersion);
  assert(formatVersion >= DD31);
  return new Write(dagWrite, bTreeWrite, basis, {
    type: LocalDD31,
    basisHash,
    baseSnapshotHash: await baseSnapshotHashFromHash(basisHash, dagWrite),
    mutatorName,
    mutatorArgsJSON,
    mutationID,
    originalHash,
    timestamp,
    clientID
  }, indexes, clientID, formatVersion);
}
async function newWriteSnapshotDD31(basisHash, lastMutationIDs, cookieJSON, dagWrite, clientID, formatVersion) {
  const basis = await commitFromHash(basisHash, dagWrite);
  const bTreeWrite = new BTreeWrite(dagWrite, formatVersion, basis.valueHash);
  return new Write(dagWrite, bTreeWrite, basis, {
    basisHash,
    type: SnapshotDD31,
    lastMutationIDs,
    cookieJSON
  }, readIndexesForWrite(basis, dagWrite, formatVersion), clientID, formatVersion);
}
async function updateIndexes(lc, indexes, key, oldValGetter, newVal) {
  const ps = [];
  for (const idx of indexes.values()) {
    const { keyPrefix: keyPrefix2 } = idx.meta.definition;
    if (!keyPrefix2 || key.startsWith(keyPrefix2)) {
      const oldVal = await oldValGetter();
      if (oldVal !== void 0) {
        ps.push(indexValue(lc, idx.map, Remove, key, oldVal, idx.meta.definition.jsonPointer, idx.meta.definition.allowEmpty ?? false));
      }
      if (newVal !== void 0) {
        ps.push(indexValue(lc, idx.map, Add, key, newVal, idx.meta.definition.jsonPointer, idx.meta.definition.allowEmpty ?? false));
      }
    }
  }
  await Promise.all(ps);
}
function readIndexesForWrite(commit, dagWrite, formatVersion) {
  const m = /* @__PURE__ */ new Map();
  for (const index of commit.indexes) {
    m.set(index.definition.name, new IndexWrite(index, new BTreeWrite(dagWrite, formatVersion, index.valueHash)));
  }
  return m;
}
async function createIndexBTree(lc, dagWrite, valueMap, prefix, jsonPointer, allowEmpty, formatVersion) {
  const indexMap = new BTreeWrite(dagWrite, formatVersion);
  for await (const entry of valueMap.scan(prefix)) {
    const key = entry[0];
    if (!key.startsWith(prefix)) {
      break;
    }
    await indexValue(lc, indexMap, Add, key, entry[1], jsonPointer, allowEmpty);
  }
  return indexMap;
}
var clientGroupIDSchema = valita_exports.string();
var clientIDSchema = valita_exports.string();
function makeClientID() {
  const length = 18;
  const high = randomUint64();
  const low = randomUint64();
  const combined = high << 64n | low;
  return combined.toString(32).slice(-length).padStart(length, "0");
}
var clientV5Schema = readonlyObject({
  heartbeatTimestampMs: valita_exports.number(),
  headHash: hashSchema,
  /**
  * The hash of a commit we are in the middle of refreshing into this client's
  * memdag.
  */
  tempRefreshHash: hashSchema.nullable(),
  /**
  * ID of this client's perdag client group. This needs to be sent in pull
  * request (to enable syncing all last mutation ids in the client group).
  */
  clientGroupID: clientGroupIDSchema
});
var clientV6Schema = readonlyObject({
  heartbeatTimestampMs: valita_exports.number(),
  /**
  * A set of hashes, which contains:
  * 1. The hash of the last commit this client refreshed from its client group
  *    (this is the commit it bootstrapped from until it completes its first
  *    refresh).
  * 2. One or more hashes that were added to retain chunks of a commit while it
  *    was being refreshed into this client's memdag. (This can be one or more
  *    because refresh's cleanup step is a separate transaction and can fail).
  * Upon refresh completing and successfully running its clean up step, this
  * set will contain a single hash: the hash of the last commit this client
  * refreshed.
  */
  refreshHashes: readonlyArray(hashSchema),
  /**
  * The hash of the last snapshot commit persisted by this client to this
  * client's client group, or null if has never persisted a snapshot.
  */
  persistHash: hashSchema.nullable(),
  /**
  * ID of this client's perdag client group. This needs to be sent in pull
  * request (to enable syncing all last mutation ids in the client group).
  */
  clientGroupID: clientGroupIDSchema
});
function isClientV6(client) {
  return client.refreshHashes !== void 0;
}
var CLIENTS_HEAD_NAME = "clients";
var clientSchema = valita_exports.union(clientV5Schema, clientV6Schema);
function assertClient(value) {
  assert2(value, clientSchema);
}
function assertClientV6(value) {
  assert2(value, clientV6Schema);
}
function chunkDataToClientMap(chunkData) {
  assertObject(chunkData);
  const clients = /* @__PURE__ */ new Map();
  for (const key in chunkData) {
    if (hasOwn(chunkData, key)) {
      const value = chunkData[key];
      if (value !== void 0) {
        assertClient(value);
        clients.set(key, value);
      }
    }
  }
  return clients;
}
function clientMapToChunkData(clients, dagWrite) {
  for (const client of clients.values()) {
    if (isClientV6(client)) {
      client.refreshHashes.forEach(dagWrite.assertValidHash);
      if (client.persistHash) {
        dagWrite.assertValidHash(client.persistHash);
      }
    } else {
      dagWrite.assertValidHash(client.headHash);
      if (client.tempRefreshHash) {
        dagWrite.assertValidHash(client.tempRefreshHash);
      }
    }
  }
  return deepFreeze(Object.fromEntries(clients));
}
async function getClients(dagRead) {
  const hash2 = await dagRead.getHead(CLIENTS_HEAD_NAME);
  return getClientsAtHash(hash2, dagRead);
}
async function getClientsAtHash(hash2, dagRead) {
  if (!hash2) {
    return /* @__PURE__ */ new Map();
  }
  const chunk = await dagRead.getChunk(hash2);
  return chunkDataToClientMap(chunk?.data);
}
var ClientStateNotFoundError = class extends Error {
  constructor(id) {
    super(`Client state not found, id: ${id}`), _define_property$3(this, "name", "ClientStateNotFoundError"), _define_property$3(this, "id", void 0);
    this.id = id;
  }
};
async function assertHasClientState(id, dagRead) {
  if (!await hasClientState(id, dagRead)) {
    throw new ClientStateNotFoundError(id);
  }
}
async function hasClientState(id, dagRead) {
  return !!await getClient(id, dagRead);
}
async function getClient(id, dagRead) {
  const clients = await getClients(dagRead);
  return clients.get(id);
}
async function mustGetClient(id, dagRead) {
  const client = await getClient(id, dagRead);
  if (!client) {
    throw new ClientStateNotFoundError(id);
  }
  return client;
}
function initClientV6(newClientID, lc, perdag, mutatorNames, indexes, formatVersion, enableClientGroupForking) {
  return withWrite(perdag, async (dagWrite) => {
    async function setClientsAndClientGroupAndCommit(basisHash, cookieJSON, valueHash2, indexRecords2) {
      const newSnapshotData = newSnapshotCommitDataDD31(basisHash, {}, cookieJSON, valueHash2, indexRecords2);
      const chunk = dagWrite.createChunk(newSnapshotData, getRefs(newSnapshotData));
      const newClientGroupID = makeClientID();
      const newClient = {
        heartbeatTimestampMs: Date.now(),
        refreshHashes: [
          chunk.hash
        ],
        persistHash: null,
        clientGroupID: newClientGroupID
      };
      const newClients = new Map(clients).set(newClientID, newClient);
      const clientGroup = {
        headHash: chunk.hash,
        mutatorNames,
        indexes,
        mutationIDs: {},
        lastServerAckdMutationIDs: {},
        disabled: false
      };
      await Promise.all([
        dagWrite.putChunk(chunk),
        setClients(newClients, dagWrite),
        setClientGroup(newClientGroupID, clientGroup, dagWrite)
      ]);
      return [
        newClient,
        chunk.hash,
        newClients,
        true
      ];
    }
    const clients = await getClients(dagWrite);
    const res = await findMatchingClient(dagWrite, mutatorNames, indexes);
    if (res.type === FIND_MATCHING_CLIENT_TYPE_HEAD) {
      const { clientGroupID, headHash } = res;
      const newClient = {
        clientGroupID,
        refreshHashes: [
          headHash
        ],
        heartbeatTimestampMs: Date.now(),
        persistHash: null
      };
      const newClients = new Map(clients).set(newClientID, newClient);
      await setClients(newClients, dagWrite);
      return [
        newClient,
        headHash,
        newClients,
        false
      ];
    }
    if (!enableClientGroupForking || res.type === FIND_MATCHING_CLIENT_TYPE_NEW) {
      const emptyBTreeChunk = dagWrite.createChunk(emptyDataNode, []);
      await dagWrite.putChunk(emptyBTreeChunk);
      const indexRecords2 = [];
      for (const [name, indexDefinition] of Object.entries(indexes)) {
        const chunkIndexDefinition = toChunkIndexDefinition(name, indexDefinition);
        indexRecords2.push({
          definition: chunkIndexDefinition,
          valueHash: emptyBTreeChunk.hash
        });
      }
      return setClientsAndClientGroupAndCommit(null, null, emptyBTreeChunk.hash, indexRecords2);
    }
    assert(res.type === FIND_MATCHING_CLIENT_TYPE_FORK);
    const { snapshot } = res;
    const indexRecords = [];
    const { valueHash, indexes: oldIndexes } = snapshot;
    const map = new BTreeRead(dagWrite, formatVersion, valueHash);
    for (const [name, indexDefinition] of Object.entries(indexes)) {
      const { prefix = "", jsonPointer, allowEmpty = false } = indexDefinition;
      const chunkIndexDefinition = {
        name,
        keyPrefix: prefix,
        jsonPointer,
        allowEmpty
      };
      const oldIndex = findMatchingOldIndex(oldIndexes, chunkIndexDefinition);
      if (oldIndex) {
        indexRecords.push({
          definition: chunkIndexDefinition,
          valueHash: oldIndex.valueHash
        });
      } else {
        const indexBTree = await createIndexBTree(lc, dagWrite, map, prefix, jsonPointer, allowEmpty, formatVersion);
        indexRecords.push({
          definition: chunkIndexDefinition,
          valueHash: await indexBTree.flush()
        });
      }
    }
    return setClientsAndClientGroupAndCommit(snapshot.meta.basisHash, snapshot.meta.cookieJSON, snapshot.valueHash, indexRecords);
  });
}
function findMatchingOldIndex(oldIndexes, chunkIndexDefinition) {
  return oldIndexes.find((index) => chunkIndexDefinitionEqualIgnoreName(index.definition, chunkIndexDefinition));
}
var FIND_MATCHING_CLIENT_TYPE_NEW = 0;
var FIND_MATCHING_CLIENT_TYPE_FORK = 1;
var FIND_MATCHING_CLIENT_TYPE_HEAD = 2;
async function findMatchingClient(dagRead, mutatorNames, indexes) {
  let newestCookie;
  let bestSnapshot;
  const mutatorNamesSet = new Set(mutatorNames);
  const clientGroups = await getClientGroups(dagRead);
  for (const [clientGroupID, clientGroup] of clientGroups) {
    if (!clientGroup.disabled && mutatorNamesEqual(mutatorNamesSet, clientGroup.mutatorNames) && indexDefinitionsEqual(indexes, clientGroup.indexes)) {
      return {
        type: FIND_MATCHING_CLIENT_TYPE_HEAD,
        clientGroupID,
        headHash: clientGroup.headHash
      };
    }
    const clientGroupSnapshotCommit = await baseSnapshotFromHash(clientGroup.headHash, dagRead);
    assertSnapshotCommitDD31(clientGroupSnapshotCommit);
    const { cookieJSON } = clientGroupSnapshotCommit.meta;
    if (newestCookie === void 0 || compareCookies(cookieJSON, newestCookie) > 0) {
      newestCookie = cookieJSON;
      bestSnapshot = clientGroupSnapshotCommit;
    }
  }
  if (bestSnapshot) {
    return {
      type: FIND_MATCHING_CLIENT_TYPE_FORK,
      snapshot: bestSnapshot
    };
  }
  return {
    type: FIND_MATCHING_CLIENT_TYPE_NEW
  };
}
function getRefsForClients(clients) {
  const refs = /* @__PURE__ */ new Set();
  for (const client of clients.values()) {
    if (isClientV6(client)) {
      for (const hash2 of client.refreshHashes) {
        refs.add(hash2);
      }
      if (client.persistHash) {
        refs.add(client.persistHash);
      }
    } else {
      refs.add(client.headHash);
      if (client.tempRefreshHash) {
        refs.add(client.tempRefreshHash);
      }
    }
  }
  return toRefs(refs);
}
async function getClientGroupForClient(clientID, read) {
  const clientGroupID = await getClientGroupIDForClient(clientID, read);
  if (!clientGroupID) {
    return void 0;
  }
  return getClientGroup(clientGroupID, read);
}
async function getClientGroupIDForClient(clientID, read) {
  const client = await getClient(clientID, read);
  return client?.clientGroupID;
}
async function setClient(clientID, client, dagWrite) {
  const clients = await getClients(dagWrite);
  const newClients = new Map(clients).set(clientID, client);
  return setClients(newClients, dagWrite);
}
async function setClients(clients, dagWrite) {
  const chunkData = clientMapToChunkData(clients, dagWrite);
  const chunk = dagWrite.createChunk(chunkData, getRefsForClients(clients));
  await dagWrite.putChunk(chunk);
  await dagWrite.setHead(CLIENTS_HEAD_NAME, chunk.hash);
  return chunk.hash;
}
function mapValues(input, mapper) {
  return mapEntries(input, (k, v2) => [
    k,
    mapper(v2)
  ]);
}
function mapEntries(input, mapper) {
  const output = {};
  for (const entry of Object.entries(input)) {
    const mapped = mapper(entry[0], entry[1]);
    output[mapped[0]] = mapped[1];
  }
  return output;
}
function mapAllEntries(input, mapper) {
  const output = {};
  for (const mapped of mapper(Object.entries(input))) {
    output[mapped[0]] = mapped[1];
  }
  return output;
}
var jsonSchema = valita_exports.unknown().chain((v2) => {
  {
    return ok(v2);
  }
});
var jsonObjectSchema = valita_exports.unknown().chain((v2) => {
  {
    return ok(v2);
  }
});
var tdigestSchema = valita_exports.tuple([
  valita_exports.number()
]).concat(valita_exports.array(valita_exports.number()));
var valueSchema = valita_exports.union(jsonSchema, valita_exports.undefined());
var rowSchema = readonlyRecord(valueSchema);
var rowCountsByQuerySchema = valita_exports.record(valita_exports.number());
var rowCountsBySourceSchema = valita_exports.record(rowCountsByQuerySchema);
var rowsByQuerySchema = valita_exports.record(valita_exports.array(rowSchema));
var rowsBySourceSchema = valita_exports.record(rowsByQuerySchema);
var analyzeQueryResultSchema = valita_exports.object({
  warnings: valita_exports.array(valita_exports.string()),
  syncedRows: valita_exports.record(valita_exports.array(rowSchema)).optional(),
  syncedRowCount: valita_exports.number(),
  start: valita_exports.number(),
  /** @deprecated Use start + elapsed instead */
  end: valita_exports.number(),
  elapsed: valita_exports.number().optional(),
  afterPermissions: valita_exports.string().optional(),
  /** @deprecated Use readRowCountsByQuery */
  vendedRowCounts: rowCountsBySourceSchema.optional(),
  /** @deprecated Use readRows */
  vendedRows: rowsBySourceSchema.optional(),
  plans: valita_exports.record(valita_exports.array(valita_exports.string())).optional(),
  readRows: rowsBySourceSchema.optional(),
  readRowCountsByQuery: rowCountsBySourceSchema.optional(),
  readRowCount: valita_exports.number().optional()
});
function defined(arr2) {
  let i = arr2.findIndex((x) => x === void 0);
  if (i < 0) {
    return arr2;
  }
  const defined2 = arr2.slice(0, i);
  for (i++; i < arr2.length; i++) {
    const x = arr2[i];
    if (x !== void 0) {
      defined2.push(x);
    }
  }
  return defined2;
}
function areEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((e, i) => e === arr2[i]);
}
function must(v2, msg) {
  if (v2 == null) {
    throw new Error(msg ?? `Unexpected ${v2} value`);
  }
  return v2;
}
var SUBQ_PREFIX = "zsubq_";
var selectorSchema = valita_exports.string();
var toStaticParam = Symbol();
var orderingElementSchema = readonly(valita_exports.tuple([
  selectorSchema,
  literalUnion("asc", "desc")
]));
var orderingSchema = readonlyArray(orderingElementSchema);
valita_exports.union(valita_exports.string(), valita_exports.number(), valita_exports.boolean(), valita_exports.null());
var equalityOpsSchema = literalUnion("=", "!=", "IS", "IS NOT");
var orderOpsSchema = literalUnion("<", ">", "<=", ">=");
var likeOpsSchema = literalUnion("LIKE", "NOT LIKE", "ILIKE", "NOT ILIKE");
var inOpsSchema = literalUnion("IN", "NOT IN");
var simpleOperatorSchema = valita_exports.union(equalityOpsSchema, orderOpsSchema, likeOpsSchema, inOpsSchema);
var literalReferenceSchema = readonlyObject({
  type: valita_exports.literal("literal"),
  value: valita_exports.union(valita_exports.string(), valita_exports.number(), valita_exports.boolean(), valita_exports.null(), readonlyArray(valita_exports.union(valita_exports.string(), valita_exports.number(), valita_exports.boolean())))
});
var columnReferenceSchema = readonlyObject({
  type: valita_exports.literal("column"),
  name: valita_exports.string()
});
var parameterReferenceSchema = readonlyObject({
  type: valita_exports.literal("static"),
  // The "namespace" of the injected parameter.
  // Write authorization will send the value of a row
  // prior to the mutation being run (preMutationRow).
  // Read and write authorization will both send the
  // current authentication data (authData).
  anchor: literalUnion("authData", "preMutationRow"),
  field: valita_exports.union(valita_exports.string(), valita_exports.array(valita_exports.string()))
});
var conditionValueSchema = valita_exports.union(literalReferenceSchema, columnReferenceSchema, parameterReferenceSchema);
var simpleConditionSchema = readonlyObject({
  type: valita_exports.literal("simple"),
  op: simpleOperatorSchema,
  left: conditionValueSchema,
  right: valita_exports.union(parameterReferenceSchema, literalReferenceSchema)
});
var correlatedSubqueryConditionOperatorSchema = literalUnion("EXISTS", "NOT EXISTS");
var correlatedSubqueryConditionSchema = readonlyObject({
  type: valita_exports.literal("correlatedSubquery"),
  related: valita_exports.lazy(() => correlatedSubquerySchema),
  op: correlatedSubqueryConditionOperatorSchema,
  flip: valita_exports.boolean().optional()
});
var conditionSchema = valita_exports.union(simpleConditionSchema, valita_exports.lazy(() => conjunctionSchema), valita_exports.lazy(() => disjunctionSchema), correlatedSubqueryConditionSchema);
var conjunctionSchema = readonlyObject({
  type: valita_exports.literal("and"),
  conditions: readonlyArray(conditionSchema)
});
var disjunctionSchema = readonlyObject({
  type: valita_exports.literal("or"),
  conditions: readonlyArray(conditionSchema)
});
function mustCompoundKey(field) {
  assert(Array.isArray(field) && field.length >= 1);
  return field;
}
var compoundKeySchema = readonly(valita_exports.tuple([
  valita_exports.string()
]).concat(valita_exports.array(valita_exports.string())));
var correlationSchema = readonlyObject({
  parentField: compoundKeySchema,
  childField: compoundKeySchema
});
var correlatedSubquerySchemaOmitSubquery = readonlyObject({
  correlation: correlationSchema,
  hidden: valita_exports.boolean().optional(),
  system: literalUnion("permissions", "client", "test").optional()
});
var correlatedSubquerySchema = correlatedSubquerySchemaOmitSubquery.extend({
  subquery: valita_exports.lazy(() => astSchema)
});
var astSchema = readonlyObject({
  schema: valita_exports.string().optional(),
  table: valita_exports.string(),
  alias: valita_exports.string().optional(),
  where: conditionSchema.optional(),
  related: readonlyArray(correlatedSubquerySchema).optional(),
  limit: valita_exports.number().optional(),
  orderBy: orderingSchema.optional(),
  start: valita_exports.object({
    row: rowSchema,
    exclusive: valita_exports.boolean()
  }).optional()
});
function transformAST(ast, transform) {
  const { tableName, columnName } = transform;
  const colName = (c) => columnName(ast.table, c);
  const key = (table2, k) => {
    const serverKey = k.map((col) => columnName(table2, col));
    return mustCompoundKey(serverKey);
  };
  const where = ast.where ? transform.where(ast.where) : void 0;
  const transformed = {
    schema: ast.schema,
    table: tableName(ast.table),
    alias: ast.alias,
    where: where ? transformWhere(where, ast.table, transform) : void 0,
    related: ast.related ? transform.related(ast.related.map((r) => ({
      correlation: {
        parentField: key(ast.table, r.correlation.parentField),
        childField: key(r.subquery.table, r.correlation.childField)
      },
      hidden: r.hidden,
      subquery: transformAST(r.subquery, transform),
      system: r.system
    }))) : void 0,
    start: ast.start ? {
      ...ast.start,
      row: Object.fromEntries(Object.entries(ast.start.row).map(([col, val]) => [
        colName(col),
        val
      ]))
    } : void 0,
    limit: ast.limit,
    orderBy: ast.orderBy?.map(([col, dir]) => [
      colName(col),
      dir
    ])
  };
  return transformed;
}
function transformWhere(where, table2, transform) {
  const { columnName } = transform;
  const condValue = (c) => c.type !== "column" ? c : {
    ...c,
    name: columnName(table2, c.name)
  };
  const key = (table22, k) => {
    const serverKey = k.map((col) => columnName(table22, col));
    return mustCompoundKey(serverKey);
  };
  if (where.type === "simple") {
    return {
      ...where,
      left: condValue(where.left)
    };
  } else if (where.type === "correlatedSubquery") {
    const { correlation, subquery } = where.related;
    return {
      ...where,
      related: {
        ...where.related,
        correlation: {
          parentField: key(table2, correlation.parentField),
          childField: key(subquery.table, correlation.childField)
        },
        subquery: transformAST(subquery, transform)
      }
    };
  }
  return {
    type: where.type,
    conditions: transform.conditions(where.conditions.map((c) => transformWhere(c, table2, transform)))
  };
}
var normalizeCache = /* @__PURE__ */ new WeakMap();
var NORMALIZE_TRANSFORM = {
  tableName: (t2) => t2,
  columnName: (_, c) => c,
  related: sortedRelated,
  where: flattened,
  conditions: (c) => c.sort(cmpCondition)
};
function normalizeAST(ast) {
  let normalized = normalizeCache.get(ast);
  if (!normalized) {
    normalized = transformAST(ast, NORMALIZE_TRANSFORM);
    normalizeCache.set(ast, normalized);
  }
  return normalized;
}
function mapAST(ast, mapper) {
  return transformAST(ast, {
    tableName: (table2) => mapper.tableName(table2),
    columnName: (table2, col) => mapper.columnName(table2, col),
    related: (r) => r,
    where: (w) => w,
    conditions: (c) => c
  });
}
function mapCondition(cond, table2, mapper) {
  return transformWhere(cond, table2, {
    tableName: (table22) => mapper.tableName(table22),
    columnName: (table22, col) => mapper.columnName(table22, col),
    related: (r) => r,
    where: (w) => w,
    conditions: (c) => c
  });
}
function sortedRelated(related) {
  return related.sort(cmpRelated);
}
function cmpCondition(a, b) {
  if (a.type === "simple") {
    if (b.type !== "simple") {
      return -1;
    }
    return compareValuePosition(a.left, b.left) || compareUTF8MaybeNull(a.op, b.op) || compareValuePosition(a.right, b.right);
  }
  if (b.type === "simple") {
    return 1;
  }
  if (a.type === "correlatedSubquery") {
    if (b.type !== "correlatedSubquery") {
      return -1;
    }
    return cmpRelated(a.related, b.related) || compareUTF8MaybeNull(a.op, b.op);
  }
  if (b.type === "correlatedSubquery") {
    return -1;
  }
  const val = compareUTF8MaybeNull(a.type, b.type);
  if (val !== 0) {
    return val;
  }
  for (let l = 0, r = 0; l < a.conditions.length && r < b.conditions.length; l++, r++) {
    const val2 = cmpCondition(a.conditions[l], b.conditions[r]);
    if (val2 !== 0) {
      return val2;
    }
  }
  return a.conditions.length - b.conditions.length;
}
function compareValuePosition(a, b) {
  if (a.type !== b.type) {
    return compareUTF8(a.type, b.type);
  }
  switch (a.type) {
    case "literal":
      assert(b.type === "literal");
      return compareUTF8(String(a.value), String(b.value));
    case "column":
      assert(b.type === "column");
      return compareUTF8(a.name, b.name);
    case "static":
      throw new Error("Static parameters should be resolved before normalization");
  }
}
function cmpRelated(a, b) {
  return compareUTF8(must(a.subquery.alias), must(b.subquery.alias));
}
function flattened(cond) {
  if (cond.type === "simple" || cond.type === "correlatedSubquery") {
    return cond;
  }
  const conditions = defined(cond.conditions.flatMap((c) => c.type === cond.type ? c.conditions.map((c2) => flattened(c2)) : flattened(c)));
  switch (conditions.length) {
    case 0:
      return void 0;
    case 1:
      return conditions[0];
    default:
      return {
        type: cond.type,
        conditions
      };
  }
}
function compareUTF8MaybeNull(a, b) {
  if (a !== null && b !== null) {
    return compareUTF8(a, b);
  }
  if (b !== null) {
    return -1;
  }
  if (a !== null) {
    return 1;
  }
  return 0;
}
var serverMetricsSchema = valita_exports.object({
  "query-materialization-server": tdigestSchema,
  "query-update-server": tdigestSchema
});
var inspectQueryRowSchema = valita_exports.object({
  clientID: valita_exports.string(),
  queryID: valita_exports.string(),
  // This is the server return AST for custom queries
  // TODO: Return server generated AST
  ast: astSchema.nullable(),
  // not null for custom queries
  name: valita_exports.string().nullable(),
  // not null for custom queries
  args: readonlyArray(jsonSchema).nullable(),
  got: valita_exports.boolean(),
  deleted: valita_exports.boolean(),
  ttl: valita_exports.number(),
  inactivatedAt: valita_exports.number().nullable(),
  rowCount: valita_exports.number(),
  metrics: serverMetricsSchema.nullable().optional()
});
var inspectBaseDownSchema = valita_exports.object({
  id: valita_exports.string()
});
var inspectQueriesDownSchema = inspectBaseDownSchema.extend({
  op: valita_exports.literal("queries"),
  value: valita_exports.array(inspectQueryRowSchema)
});
var inspectMetricsDownSchema = inspectBaseDownSchema.extend({
  op: valita_exports.literal("metrics"),
  value: serverMetricsSchema
});
var inspectVersionDownSchema = inspectBaseDownSchema.extend({
  op: valita_exports.literal("version"),
  value: valita_exports.string()
});
var inspectAuthenticatedDownSchema = inspectBaseDownSchema.extend({
  op: valita_exports.literal("authenticated"),
  value: valita_exports.boolean()
});
var inspectAnalyzeQueryDownSchema = inspectBaseDownSchema.extend({
  op: valita_exports.literal("analyze-query"),
  value: analyzeQueryResultSchema
});
var inspectErrorDownSchema = inspectBaseDownSchema.extend({
  op: valita_exports.literal("error"),
  value: valita_exports.string()
});
var inspectDownBodySchema = valita_exports.union(inspectQueriesDownSchema, inspectMetricsDownSchema, inspectVersionDownSchema, inspectAuthenticatedDownSchema, inspectAnalyzeQueryDownSchema, inspectErrorDownSchema);
var inspectDownMessageSchema = valita_exports.tuple([
  valita_exports.literal("inspect"),
  inspectDownBodySchema
]);
function getNonCryptoRandomValues(array7) {
  if (array7 === null) {
    throw new TypeError("array cannot be null");
  }
  for (let i = 0; i < array7.length; i++) {
    array7[i] = Math.floor(Math.random() * 256);
  }
  return array7;
}
function nanoid(size = 21) {
  const randomBytes = getNonCryptoRandomValues(new Uint8Array(size));
  return randomBytes.reduce((id, byte) => {
    byte &= 63;
    if (byte < 36) {
      id += byte.toString(36);
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase();
    } else if (byte > 62) {
      id += "-";
    } else {
      id += "_";
    }
    return id;
  }, "");
}
var h64 = (s) => hash(s, 2);
var h128 = (s) => hash(s, 4);
function hash(str, words) {
  let hash2 = 0n;
  for (let i = 0; i < words; i++) {
    hash2 = (hash2 << 32n) + BigInt(xxHash32(str, i));
  }
  return hash2;
}
var primaryKeySchema = readonly(valita_exports.tuple([
  valita_exports.string()
]).concat(valita_exports.array(valita_exports.string())));
var primaryKeyValueSchema = valita_exports.union(valita_exports.string(), valita_exports.number(), valita_exports.boolean());
var primaryKeyValueRecordSchema = readonlyRecord(primaryKeyValueSchema);
var DESIRED_QUERIES_KEY_PREFIX = "d/";
var GOT_QUERIES_KEY_PREFIX = "g/";
var ENTITIES_KEY_PREFIX = "e/";
var MUTATIONS_KEY_PREFIX = "m/";
function toDesiredQueriesKey(clientID, hash2) {
  return DESIRED_QUERIES_KEY_PREFIX + clientID + "/" + hash2;
}
function desiredQueriesPrefixForClient(clientID) {
  return DESIRED_QUERIES_KEY_PREFIX + clientID + "/";
}
function toGotQueriesKey(hash2) {
  return GOT_QUERIES_KEY_PREFIX + hash2;
}
function toMutationResponseKey(mid) {
  return MUTATIONS_KEY_PREFIX + mid.clientID + "/" + mid.id;
}
function toPrimaryKeyString(tableName, primaryKey, value) {
  if (primaryKey.length === 1) {
    return ENTITIES_KEY_PREFIX + tableName + "/" + parse(value[primaryKey[0]], primaryKeyValueSchema);
  }
  const values = primaryKey.map((k) => parse(value[k], primaryKeyValueSchema));
  const str = JSON.stringify(values);
  const idSegment = h128(str);
  return ENTITIES_KEY_PREFIX + tableName + "/" + idSegment;
}
function sourceNameFromKey(key) {
  const slash = key.indexOf("/", ENTITIES_KEY_PREFIX.length);
  return key.slice(ENTITIES_KEY_PREFIX.length, slash);
}
var ClientGroup = (_delegate$1 = /* @__PURE__ */ new WeakMap(), class {
  async clients() {
    return (await _class_private_field_get$4(this, _delegate$1).lazy).clientGroupClients(_class_private_field_get$4(this, _delegate$1), this.id);
  }
  async clientsWithQueries() {
    return (await _class_private_field_get$4(this, _delegate$1).lazy).clientGroupClientsWithQueries(_class_private_field_get$4(this, _delegate$1), this.id);
  }
  async queries() {
    return (await _class_private_field_get$4(this, _delegate$1).lazy).clientGroupQueries(_class_private_field_get$4(this, _delegate$1));
  }
  constructor(delegate, clientGroupID) {
    _class_private_field_init$4(this, _delegate$1, {
      writable: true,
      value: void 0
    });
    _define_property$3(this, "id", void 0);
    _class_private_field_set$4(this, _delegate$1, delegate);
    this.id = clientGroupID;
  }
});
var Client = (_delegate1$1 = /* @__PURE__ */ new WeakMap(), class {
  async queries() {
    return (await _class_private_field_get$4(this, _delegate1$1).lazy).clientQueries(_class_private_field_get$4(this, _delegate1$1), this.id);
  }
  async map() {
    return (await _class_private_field_get$4(this, _delegate1$1).lazy).clientMap(_class_private_field_get$4(this, _delegate1$1), this.id);
  }
  async rows(tableName) {
    return (await _class_private_field_get$4(this, _delegate1$1).lazy).clientRows(_class_private_field_get$4(this, _delegate1$1), this.id, tableName);
  }
  constructor(delegate, clientID, clientGroupID) {
    _class_private_field_init$4(this, _delegate1$1, {
      writable: true,
      value: void 0
    });
    _define_property$3(this, "id", void 0);
    _define_property$3(this, "clientGroup", void 0);
    _class_private_field_set$4(this, _delegate1$1, delegate);
    this.id = clientID;
    this.clientGroup = new ClientGroup(_class_private_field_get$4(this, _delegate1$1), clientGroupID);
  }
});
var Centroid = class {
  add(r) {
    if (r.weight < 0) {
      throw new Error("centroid weight cannot be less than zero");
    }
    if (this.weight !== 0) {
      this.weight += r.weight;
      this.mean += r.weight * (r.mean - this.mean) / this.weight;
    } else {
      this.weight = r.weight;
      this.mean = r.mean;
    }
  }
  constructor(mean, weight) {
    _define_property$3(this, "mean", void 0);
    _define_property$3(this, "weight", void 0);
    this.mean = mean;
    this.weight = weight;
  }
};
function sortCentroidList(centroids) {
  centroids.sort((a, b) => a.mean - b.mean);
}
var TDigest = (_maxProcessed = /* @__PURE__ */ new WeakMap(), _maxUnprocessed = /* @__PURE__ */ new WeakMap(), _processed = /* @__PURE__ */ new WeakMap(), _unprocessed = /* @__PURE__ */ new WeakMap(), _cumulative = /* @__PURE__ */ new WeakMap(), _processedWeight = /* @__PURE__ */ new WeakMap(), _unprocessedWeight = /* @__PURE__ */ new WeakMap(), _min = /* @__PURE__ */ new WeakMap(), _max = /* @__PURE__ */ new WeakMap(), _process$1 = /* @__PURE__ */ new WeakSet(), _updateCumulative = /* @__PURE__ */ new WeakSet(), _integratedQ = /* @__PURE__ */ new WeakSet(), _integratedLocation = /* @__PURE__ */ new WeakSet(), __TDigest = class _TDigest {
  /**
  * fromJSON creates a TDigest from a JSON-serializable representation.
  * The data should be an object with compression and centroids array.
  */
  static fromJSON(data) {
    const digest = new _TDigest(data[0]);
    if (data.length % 2 !== 1) {
      throw new Error("Invalid centroids array");
    }
    for (let i = 1; i < data.length; i += 2) {
      digest.add(data[i], data[i + 1]);
    }
    return digest;
  }
  reset() {
    _class_private_field_set$4(this, _processed, []);
    _class_private_field_set$4(this, _unprocessed, []);
    _class_private_field_set$4(this, _cumulative, []);
    _class_private_field_set$4(this, _processedWeight, 0);
    _class_private_field_set$4(this, _unprocessedWeight, 0);
    _class_private_field_set$4(this, _min, Number.MAX_VALUE);
    _class_private_field_set$4(this, _max, -Number.MAX_VALUE);
  }
  add(mean, weight = 1) {
    this.addCentroid(new Centroid(mean, weight));
  }
  /** AddCentroidList can quickly add multiple centroids. */
  addCentroidList(centroidList) {
    for (const c of centroidList) {
      this.addCentroid(c);
    }
  }
  /**
  * AddCentroid adds a single centroid.
  * Weights which are not a number or are <= 0 are ignored, as are NaN means.
  */
  addCentroid(c) {
    if (Number.isNaN(c.mean) || c.weight <= 0 || Number.isNaN(c.weight) || !Number.isFinite(c.weight)) {
      return;
    }
    _class_private_field_get$4(this, _unprocessed).push(new Centroid(c.mean, c.weight));
    _class_private_field_set$4(this, _unprocessedWeight, _class_private_field_get$4(this, _unprocessedWeight) + c.weight);
    if (_class_private_field_get$4(this, _processed).length > _class_private_field_get$4(this, _maxProcessed) || _class_private_field_get$4(this, _unprocessed).length > _class_private_field_get$4(this, _maxUnprocessed)) {
      _class_private_method_get$1(this, _process$1, process$1).call(this);
    }
  }
  /**
  *  Merges the supplied digest into this digest. Functionally equivalent to
  * calling t.AddCentroidList(t2.Centroids(nil)), but avoids making an extra
  * copy of the CentroidList.
  **/
  merge(t2) {
    _class_private_method_get$1(t2, _process$1, process$1).call(t2);
    this.addCentroidList(_class_private_field_get$4(t2, _processed));
  }
  /**
  * Centroids returns a copy of processed centroids.
  * Useful when aggregating multiple t-digests.
  *
  * Centroids are appended to the passed CentroidList; if you're re-using a
  * buffer, be sure to pass cl[:0].
  */
  centroids(cl = []) {
    _class_private_method_get$1(this, _process$1, process$1).call(this);
    return cl.concat(_class_private_field_get$4(this, _processed));
  }
  count() {
    _class_private_method_get$1(this, _process$1, process$1).call(this);
    return _class_private_field_get$4(this, _processedWeight);
  }
  /**
  * toJSON returns a JSON-serializable representation of the digest.
  * This processes the digest and returns an object with compression and centroid data.
  */
  toJSON() {
    _class_private_method_get$1(this, _process$1, process$1).call(this);
    const data = [
      this.compression
    ];
    for (const centroid of _class_private_field_get$4(this, _processed)) {
      data.push(centroid.mean, centroid.weight);
    }
    return data;
  }
  // Quantile returns the (approximate) quantile of
  // the distribution. Accepted values for q are between 0 and 1.
  // Returns NaN if Count is zero or bad inputs.
  quantile(q) {
    _class_private_method_get$1(this, _process$1, process$1).call(this);
    _class_private_method_get$1(this, _updateCumulative, updateCumulative).call(this);
    if (q < 0 || q > 1 || _class_private_field_get$4(this, _processed).length === 0) {
      return NaN;
    }
    if (_class_private_field_get$4(this, _processed).length === 1) {
      return _class_private_field_get$4(this, _processed)[0].mean;
    }
    const index = q * _class_private_field_get$4(this, _processedWeight);
    if (index <= _class_private_field_get$4(this, _processed)[0].weight / 2) {
      return _class_private_field_get$4(this, _min) + 2 * index / _class_private_field_get$4(this, _processed)[0].weight * (_class_private_field_get$4(this, _processed)[0].mean - _class_private_field_get$4(this, _min));
    }
    const lower = binarySearch(_class_private_field_get$4(this, _cumulative).length, (i) => -_class_private_field_get$4(this, _cumulative)[i] + index);
    if (lower + 1 !== _class_private_field_get$4(this, _cumulative).length) {
      const z12 = index - _class_private_field_get$4(this, _cumulative)[lower - 1];
      const z22 = _class_private_field_get$4(this, _cumulative)[lower] - index;
      return weightedAverage(_class_private_field_get$4(this, _processed)[lower - 1].mean, z22, _class_private_field_get$4(this, _processed)[lower].mean, z12);
    }
    const z1 = index - _class_private_field_get$4(this, _processedWeight) - _class_private_field_get$4(this, _processed)[lower - 1].weight / 2;
    const z2 = _class_private_field_get$4(this, _processed)[lower - 1].weight / 2 - z1;
    return weightedAverage(_class_private_field_get$4(this, _processed)[_class_private_field_get$4(this, _processed).length - 1].mean, z1, _class_private_field_get$4(this, _max), z2);
  }
  /**
  * CDF returns the cumulative distribution function for a given value x.
  */
  cdf(x) {
    _class_private_method_get$1(this, _process$1, process$1).call(this);
    _class_private_method_get$1(this, _updateCumulative, updateCumulative).call(this);
    switch (_class_private_field_get$4(this, _processed).length) {
      case 0:
        return 0;
      case 1: {
        const width = _class_private_field_get$4(this, _max) - _class_private_field_get$4(this, _min);
        if (x <= _class_private_field_get$4(this, _min)) {
          return 0;
        }
        if (x >= _class_private_field_get$4(this, _max)) {
          return 1;
        }
        if (x - _class_private_field_get$4(this, _min) <= width) {
          return 0.5;
        }
        return (x - _class_private_field_get$4(this, _min)) / width;
      }
    }
    if (x <= _class_private_field_get$4(this, _min)) {
      return 0;
    }
    if (x >= _class_private_field_get$4(this, _max)) {
      return 1;
    }
    const m0 = _class_private_field_get$4(this, _processed)[0].mean;
    if (x <= m0) {
      if (m0 - _class_private_field_get$4(this, _min) > 0) {
        return (x - _class_private_field_get$4(this, _min)) / (m0 - _class_private_field_get$4(this, _min)) * _class_private_field_get$4(this, _processed)[0].weight / _class_private_field_get$4(this, _processedWeight) / 2;
      }
      return 0;
    }
    const mn = _class_private_field_get$4(this, _processed)[_class_private_field_get$4(this, _processed).length - 1].mean;
    if (x >= mn) {
      if (_class_private_field_get$4(this, _max) - mn > 0) {
        return 1 - (_class_private_field_get$4(this, _max) - x) / (_class_private_field_get$4(this, _max) - mn) * _class_private_field_get$4(this, _processed)[_class_private_field_get$4(this, _processed).length - 1].weight / _class_private_field_get$4(this, _processedWeight) / 2;
      }
      return 1;
    }
    const upper = binarySearch(
      _class_private_field_get$4(this, _processed).length,
      // Treat equals as greater than, so we can use the upper index
      // This is equivalent to:
      //   i => this.#processed[i].mean > x ? -1 : 1,
      (i) => x - _class_private_field_get$4(this, _processed)[i].mean || 1
    );
    const z1 = x - _class_private_field_get$4(this, _processed)[upper - 1].mean;
    const z2 = _class_private_field_get$4(this, _processed)[upper].mean - x;
    return weightedAverage(_class_private_field_get$4(this, _cumulative)[upper - 1], z2, _class_private_field_get$4(this, _cumulative)[upper], z1) / _class_private_field_get$4(this, _processedWeight);
  }
  constructor(compression = 1e3) {
    _class_private_method_init$1(this, _process$1);
    _class_private_method_init$1(this, _updateCumulative);
    _class_private_method_init$1(this, _integratedQ);
    _class_private_method_init$1(this, _integratedLocation);
    _define_property$3(this, "compression", void 0);
    _class_private_field_init$4(this, _maxProcessed, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$4(this, _maxUnprocessed, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$4(this, _processed, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$4(this, _unprocessed, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$4(this, _cumulative, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$4(this, _processedWeight, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$4(this, _unprocessedWeight, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$4(this, _min, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$4(this, _max, {
      writable: true,
      value: void 0
    });
    this.compression = compression;
    _class_private_field_set$4(this, _maxProcessed, processedSize(0, this.compression));
    _class_private_field_set$4(this, _maxUnprocessed, unprocessedSize(0, this.compression));
    this.reset();
  }
}, __TDigest);
function weightedAverage(x1, w1, x2, w2) {
  if (x1 <= x2) {
    return weightedAverageSorted(x1, w1, x2, w2);
  }
  return weightedAverageSorted(x2, w2, x1, w1);
}
function weightedAverageSorted(x1, w1, x2, w2) {
  const x = (x1 * w1 + x2 * w2) / (w1 + w2);
  return Math.max(x1, Math.min(x, x2));
}
function processedSize(size, compression) {
  {
    return Math.ceil(compression) * 2;
  }
}
function unprocessedSize(size, compression) {
  {
    return Math.ceil(compression) * 8;
  }
}
var Inspector = (_delegate2 = /* @__PURE__ */ new WeakMap(), class {
  async metrics() {
    return (await _class_private_field_get$4(this, _delegate2).lazy).inspectorMetrics(_class_private_field_get$4(this, _delegate2));
  }
  async clients() {
    return (await _class_private_field_get$4(this, _delegate2).lazy).inspectorClients(_class_private_field_get$4(this, _delegate2));
  }
  async clientsWithQueries() {
    return (await _class_private_field_get$4(this, _delegate2).lazy).inspectorClientsWithQueries(_class_private_field_get$4(this, _delegate2));
  }
  async serverVersion() {
    return (await _class_private_field_get$4(this, _delegate2).lazy).serverVersion(_class_private_field_get$4(this, _delegate2));
  }
  async analyzeQuery(query, options) {
    return (await _class_private_field_get$4(this, _delegate2).lazy).analyzeQuery(_class_private_field_get$4(this, _delegate2), query, options);
  }
  constructor(rep, delegate, getSocket) {
    _class_private_field_init$4(this, _delegate2, {
      writable: true,
      value: void 0
    });
    _define_property$3(this, "client", void 0);
    _define_property$3(this, "clientGroup", void 0);
    _class_private_field_set$4(this, _delegate2, {
      getQueryMetrics: delegate.getQueryMetrics.bind(delegate),
      getAST: delegate.getAST.bind(delegate),
      get metrics() {
        return delegate.metrics;
      },
      rep,
      getSocket,
      lazy: import("./lazy-inspector-NCBESZMS-BO9vqU6x.js")
    });
    this.client = new Client(_class_private_field_get$4(this, _delegate2), rep.clientID, rep.clientGroupID);
    this.clientGroup = this.client.clientGroup;
  }
});
var DEFAULT_TTL_MS = 1e3 * 60 * 5;
var DEFAULT_PRELOAD_TTL_MS = 0;
var MAX_TTL = "10m";
var multiplier = {
  s: 1e3,
  m: 60 * 1e3,
  h: 60 * 60 * 1e3,
  d: 24 * 60 * 60 * 1e3,
  y: 365 * 24 * 60 * 60 * 1e3
};
function parseTTL(ttl) {
  if (typeof ttl === "number") {
    return Number.isNaN(ttl) ? 0 : !Number.isFinite(ttl) || ttl < 0 ? -1 : ttl;
  }
  if (ttl === "none") {
    return 0;
  }
  if (ttl === "forever") {
    return -1;
  }
  const multi = multiplier[ttl[ttl.length - 1]];
  return Number(ttl.slice(0, -1)) * multi;
}
function compareTTL(a, b) {
  const ap = parseTTL(a);
  const bp = parseTTL(b);
  if (ap === -1 && bp !== -1) {
    return 1;
  }
  if (ap !== -1 && bp === -1) {
    return -1;
  }
  return ap - bp;
}
function normalizeTTL(ttl) {
  if (typeof ttl === "string") {
    return ttl;
  }
  if (ttl < 0) {
    return "forever";
  }
  if (ttl === 0) {
    return "none";
  }
  let shortest = ttl.toString();
  const lengthOfNumber = shortest.length;
  for (const unit of [
    "y",
    "d",
    "h",
    "m",
    "s"
  ]) {
    const multi = multiplier[unit];
    const value = ttl / multi;
    const candidate = `${value}${unit}`;
    if (candidate.length < shortest.length) {
      shortest = candidate;
    }
  }
  return shortest.length < lengthOfNumber ? shortest : ttl;
}
function clampTTL(ttl, lc) {
  const parsedTTL = parseTTL(ttl);
  if (parsedTTL === -1 || parsedTTL > 10 * 60 * 1e3) {
    lc?.warn?.(`TTL (${ttl}) is too high, clamping to ${MAX_TTL}`);
    return parseTTL(MAX_TTL);
  }
  return parsedTTL;
}
function splice(tree, start, deleteCount, ...items) {
  if (this.isMutable) {
    this.entries.splice(start, deleteCount, ...items);
    this._updateNode(tree);
    return this;
  }
  const entries = readonlySplice(this.entries, start, deleteCount, ...items);
  return tree.newDataNodeImpl(entries);
}
async function mergeAndPartition(tree, i, childNode) {
  const level = this.level - 1;
  const thisEntries = this.entries;
  let values;
  let startIndex;
  let removeCount;
  if (i > 0) {
    const hash2 = thisEntries[i - 1][1];
    const previousSibling = await tree.getNode(hash2);
    values = joinIterables(previousSibling.entries, childNode.entries);
    startIndex = i - 1;
    removeCount = 2;
  } else if (i < thisEntries.length - 1) {
    const hash2 = thisEntries[i + 1][1];
    const nextSibling = await tree.getNode(hash2);
    values = joinIterables(childNode.entries, nextSibling.entries);
    startIndex = i;
    removeCount = 2;
  } else {
    values = childNode.entries;
    startIndex = i;
    removeCount = 1;
  }
  const partitions = partition(values, (value) => value[2], tree.minSize - tree.chunkHeaderSize, tree.maxSize - tree.chunkHeaderSize);
  const newEntries = [];
  for (const entries2 of partitions) {
    const node = tree.newNodeImpl(entries2, level);
    const newHashEntry = createNewInternalEntryForNode(node, tree.getEntrySize);
    newEntries.push(newHashEntry);
  }
  if (this.isMutable) {
    this.entries.splice(startIndex, removeCount, ...newEntries);
    this._updateNode(tree);
    return this;
  }
  const entries = readonlySplice(thisEntries, startIndex, removeCount, ...newEntries);
  return tree.newInternalNodeImpl(entries, this.level);
}
function replaceChild(tree, index, newEntry) {
  if (this.isMutable) {
    this.entries.splice(index, 1, newEntry);
    this._updateNode(tree);
    return this;
  }
  const entries = readonlySplice(this.entries, index, 1, newEntry);
  return tree.newInternalNodeImpl(entries, this.level);
}
function addToModified(node) {
  assert(node.isMutable);
  _class_private_field_get$4(this, _modified).set(node.hash, node);
  this._cache.set(node.hash, node);
}
async function generateDiffs(diffConfig) {
  const diffsMap = new DiffsMap();
  if (!diffConfig.shouldComputeDiffs()) {
    return diffsMap;
  }
  let valueDiff = [];
  if (_class_private_field_get$4(this, _basis)) {
    const basisMap = new BTreeRead(_class_private_field_get$4(this, _dagWrite), _class_private_field_get$4(this, _formatVersion), _class_private_field_get$4(this, _basis).valueHash);
    valueDiff = await diff(basisMap, this.map);
  }
  diffsMap.set("", valueDiff);
  let basisIndexes;
  if (_class_private_field_get$4(this, _basis)) {
    basisIndexes = readIndexesForRead(_class_private_field_get$4(this, _basis), _class_private_field_get$4(this, _dagWrite), _class_private_field_get$4(this, _formatVersion));
  } else {
    basisIndexes = /* @__PURE__ */ new Map();
  }
  for (const [name, index] of this.indexes) {
    if (!diffConfig.shouldComputeDiffsForIndex(name)) {
      continue;
    }
    const basisIndex = basisIndexes.get(name);
    assert(index !== basisIndex);
    const indexDiffResult = await (basisIndex ? diff(basisIndex.map, index.map) : (
      // No basis. All keys are new.
      allEntriesAsDiff(index.map, "add")
    ));
    diffsMap.set(name, indexDiffResult);
  }
  for (const [name, basisIndex] of basisIndexes) {
    if (!this.indexes.has(name) && diffConfig.shouldComputeDiffsForIndex(name)) {
      const indexDiffResult = await allEntriesAsDiff(basisIndex.map, "del");
      diffsMap.set(name, indexDiffResult);
    }
  }
  return diffsMap;
}
function process$1() {
  if (_class_private_field_get$4(this, _unprocessed).length > 0 || _class_private_field_get$4(this, _processed).length > _class_private_field_get$4(this, _maxProcessed)) {
    _class_private_field_get$4(this, _unprocessed).push(..._class_private_field_get$4(this, _processed));
    sortCentroidList(_class_private_field_get$4(this, _unprocessed));
    _class_private_field_get$4(this, _processed).length = 0;
    _class_private_field_get$4(this, _processed).push(_class_private_field_get$4(this, _unprocessed)[0]);
    _class_private_field_set$4(this, _processedWeight, _class_private_field_get$4(this, _processedWeight) + _class_private_field_get$4(this, _unprocessedWeight));
    _class_private_field_set$4(this, _unprocessedWeight, 0);
    let soFar = _class_private_field_get$4(this, _unprocessed)[0].weight;
    let limit = _class_private_field_get$4(this, _processedWeight) * _class_private_method_get$1(this, _integratedQ, integratedQ).call(this, 1);
    for (let i = 1; i < _class_private_field_get$4(this, _unprocessed).length; i++) {
      const centroid = _class_private_field_get$4(this, _unprocessed)[i];
      const projected = soFar + centroid.weight;
      if (projected <= limit) {
        soFar = projected;
        _class_private_field_get$4(this, _processed)[_class_private_field_get$4(this, _processed).length - 1].add(centroid);
      } else {
        const k1 = _class_private_method_get$1(this, _integratedLocation, integratedLocation).call(this, soFar / _class_private_field_get$4(this, _processedWeight));
        limit = _class_private_field_get$4(this, _processedWeight) * _class_private_method_get$1(this, _integratedQ, integratedQ).call(this, k1 + 1);
        soFar += centroid.weight;
        _class_private_field_get$4(this, _processed).push(centroid);
      }
    }
    _class_private_field_set$4(this, _min, Math.min(_class_private_field_get$4(this, _min), _class_private_field_get$4(this, _processed)[0].mean));
    _class_private_field_set$4(this, _max, Math.max(_class_private_field_get$4(this, _max), _class_private_field_get$4(this, _processed)[_class_private_field_get$4(this, _processed).length - 1].mean));
    _class_private_field_get$4(this, _unprocessed).length = 0;
  }
}
function updateCumulative() {
  if (_class_private_field_get$4(this, _cumulative).length > 0 && _class_private_field_get$4(this, _cumulative)[_class_private_field_get$4(this, _cumulative).length - 1] === _class_private_field_get$4(this, _processedWeight)) {
    return;
  }
  const n = _class_private_field_get$4(this, _processed).length + 1;
  if (_class_private_field_get$4(this, _cumulative).length > n) {
    _class_private_field_get$4(this, _cumulative).length = n;
  }
  let prev = 0;
  for (let i = 0; i < _class_private_field_get$4(this, _processed).length; i++) {
    const centroid = _class_private_field_get$4(this, _processed)[i];
    const cur = centroid.weight;
    _class_private_field_get$4(this, _cumulative)[i] = prev + cur / 2;
    prev += cur;
  }
  _class_private_field_get$4(this, _cumulative)[_class_private_field_get$4(this, _processed).length] = prev;
}
function integratedQ(k) {
  return (Math.sin(Math.min(k, this.compression) * Math.PI / this.compression - Math.PI / 2) + 1) / 2;
}
function integratedLocation(q) {
  return this.compression * (Math.asin(2 * q - 1) + Math.PI / 2) / Math.PI;
}
function _check_private_redeclaration$3(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}
function _class_apply_descriptor_get$3(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}
function _class_apply_descriptor_set$3(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }
    descriptor.value = value;
  }
}
function _class_extract_field_descriptor$3(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }
  return privateMap.get(receiver);
}
function _class_private_field_get$3(receiver, privateMap) {
  var descriptor = _class_extract_field_descriptor$3(receiver, privateMap, "get");
  return _class_apply_descriptor_get$3(receiver, descriptor);
}
function _class_private_field_init$3(obj, privateMap, value) {
  _check_private_redeclaration$3(obj, privateMap);
  privateMap.set(obj, value);
}
function _class_private_field_set$3(receiver, privateMap, value) {
  var descriptor = _class_extract_field_descriptor$3(receiver, privateMap, "set");
  _class_apply_descriptor_set$3(receiver, descriptor, value);
  return value;
}
function _define_property$2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var _sinks = /* @__PURE__ */ new WeakMap();
class TeeLogSink {
  log(level, context, ...args) {
    for (const logger of _class_private_field_get$3(this, _sinks)) {
      logger.log(level, context, ...args);
    }
  }
  async flush() {
    await Promise.all(_class_private_field_get$3(this, _sinks).map((logger) => logger.flush?.()));
  }
  constructor(sinks) {
    _class_private_field_init$3(this, _sinks, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$3(this, _sinks, sinks);
  }
}
class OptionalLoggerImpl {
  constructor(logSink, level = "info", context) {
    _define_property$2(this, "debug", void 0);
    _define_property$2(this, "info", void 0);
    _define_property$2(this, "warn", void 0);
    _define_property$2(this, "error", void 0);
    _define_property$2(this, "flush", void 0);
    const impl = (level2) => (...args) => logSink.log(level2, context, ...args);
    switch (level) {
      // @ts-ignore
      case "debug":
        this.debug = impl("debug");
      // @ts-ignore
      case "info":
        this.info = impl("info");
      // @ts-ignore
      case "warn":
        this.warn = impl("warn");
      // @ts-ignore
      case "error":
        this.error = impl("error");
    }
    this.flush = () => logSink.flush?.() ?? Promise.resolve();
  }
}
const consoleLogSink = {
  log(level, context, ...args) {
    console[level](...stringified(context), ...args.map(normalizeArgument));
  }
};
var _logSink = /* @__PURE__ */ new WeakMap(), _level$1 = /* @__PURE__ */ new WeakMap(), _context$1 = /* @__PURE__ */ new WeakMap();
class LogContext extends OptionalLoggerImpl {
  /**
   * Creates a new Logger that with the given key and value
   * added to the logged Context.
   */
  withContext(key, value) {
    const ctx = {
      ..._class_private_field_get$3(this, _context$1),
      [key]: value
    };
    return new LogContext(_class_private_field_get$3(this, _level$1), ctx, _class_private_field_get$3(this, _logSink));
  }
  constructor(level = "info", context, logSink = consoleLogSink) {
    super(logSink, level, context), _class_private_field_init$3(this, _logSink, {
      writable: true,
      value: void 0
    }), _class_private_field_init$3(this, _level$1, {
      writable: true,
      value: void 0
    }), _class_private_field_init$3(this, _context$1, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$3(this, _level$1, level);
    _class_private_field_set$3(this, _logSink, logSink);
    _class_private_field_set$3(this, _context$1, context);
  }
}
function stringified(context) {
  const args = [];
  for (const [k, v] of Object.entries(context ?? {})) {
    const arg = v === void 0 ? k : `${k}=${v}`;
    args.push(arg);
  }
  return args;
}
function normalizeArgument(v) {
  switch (typeof v) {
    case "string":
    case "number":
    case "boolean":
    case "undefined":
    case "symbol":
    case "bigint":
      return v;
    case "object":
      if (v === null) {
        return null;
      }
      break;
  }
  return JSON.stringify(v, errorReplacer);
}
function errorReplacer(_key, v) {
  if (v instanceof Error) {
    return {
      name: v.name,
      message: v.message,
      stack: v.stack,
      ..."cause" in v ? {
        cause: v.cause
      } : null
    };
  }
  return v;
}
function _check_private_redeclaration$2(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}
function _class_apply_descriptor_get$2(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}
function _class_apply_descriptor_set$2(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }
    descriptor.value = value;
  }
}
function _class_apply_descriptor_update(receiver, descriptor) {
  if (descriptor.set) {
    if (!descriptor.get) {
      throw new TypeError("attempted to read set only private field");
    }
    if (!("__destrWrapper" in descriptor)) {
      descriptor.__destrWrapper = {
        set value(v) {
          descriptor.set.call(receiver, v);
        },
        get value() {
          return descriptor.get.call(receiver);
        }
      };
    }
    return descriptor.__destrWrapper;
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }
    return descriptor;
  }
}
function _class_extract_field_descriptor$2(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }
  return privateMap.get(receiver);
}
function _class_private_field_get$2(receiver, privateMap) {
  var descriptor = _class_extract_field_descriptor$2(receiver, privateMap, "get");
  return _class_apply_descriptor_get$2(receiver, descriptor);
}
function _class_private_field_init$2(obj, privateMap, value) {
  _check_private_redeclaration$2(obj, privateMap);
  privateMap.set(obj, value);
}
function _class_private_field_set$2(receiver, privateMap, value) {
  var descriptor = _class_extract_field_descriptor$2(receiver, privateMap, "set");
  _class_apply_descriptor_set$2(receiver, descriptor, value);
  return value;
}
function _class_private_field_update(receiver, privateMap) {
  var descriptor = _class_extract_field_descriptor$2(receiver, privateMap, "update");
  return _class_apply_descriptor_update(receiver, descriptor);
}
function _class_private_method_get(receiver, privateSet, fn) {
  if (!privateSet.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return fn;
}
function _class_private_method_init(obj, privateSet) {
  _check_private_redeclaration$2(obj, privateSet);
  privateSet.add(obj);
}
function _define_property$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
let _Symbol_asyncIterator, _Symbol_asyncIterator1, _zeroData, _delegateSymbol, _astSymbol, _completedAstSymbol, _newQuerySymbol, _Symbol_iterator;
var _read, _db, _closed, _idbDeleted, _withReopen, _class, _tx, _closed1, _tx1, _closed2, _newHeads, _oldHeads, _putChunks, _delegate, _refsCounted, _refCountUpdates, _loadedRefCountPromises, _isLazyDelegate, _changeRefCount, _updateRefsCounts, _ensureRefCountLoaded, _updateRefCount, _class1, _kv, _chunkHasher, _assertValidHash, _chunkHasher1, _putChunks1, _changedHeads, _setHead, _applyRefCountUpdates, _removeAllRelatedKeys, _class2, _map, _release, _closed3, _map1, _map2, _rwLock, _closed4, _lc, _name, _store, _withBrainTransplant, _class3, _kvStore, _putDatabase, _class4, _schema, _schema1, _schema2, _doc, _hiddenIntervalMS, _timeoutID, _promises, _onVisibilityChange, _setVisibilityState, _waitFor, _class5, _pendingResolver, _skipSleepsResolver, _sendResolver, _delegate1, _closed5, _abortSignal, _sendCounter, _lc1, _visibilityWatcher, _waitingConnectionResolve, _connectionAvailable, _waitUntilAvailableConnection, _class6, _rwLock1, _heads, _sourceStore, _chunkHasher2, _assertValidHash1, _sourceRead, _release1, _closed6, _sourceReadOwnedByCaller, _refCounts, _refs, _chunkHasher3, _createdChunks, _setHead1, _class7, _cacheSizeLimit, _getSizeOfChunk, _refCounts1, _refs1, _size, _evictsAndDeletesSuspended, _suspendedDeletes, _ensureCacheSizeLimit, _cacheChunk, _evict, _deleteEntryByHash, _class8, _iter, _options, _dbDelegateOptions, _onLimitKey, _newIterator, _class9, _it, _keys, _scans, _tx2, _seen, _dagRead, _gatheredChunks, _lazyRead, _gatheredChunks1, _gatheredChunksTotalSize, _lazyStore, _gatherSizeLimit, _getSizeOfChunk1, _process, _idleTimeoutMs, _throttleMs, _abortSignal1, _requestIdle, _scheduledResolver, _runResolver, _runPromise, _throttlePromise, _scheduleInternal, _class10, _body, _onData$1, _lastValue, _keys1, _scans1, _isEqual, _callback, _prefix, _indexName, _initialValuesInFirstDiff, _subscriptions, _pendingSubscriptions, _queryInternal, _lc2, _signal, _fireSubscriptions, _scheduleInitialSubscriptionRun, _class11, _auth, _subscriptions1, _mutationRecovery, _kvStoreProvider, _idbDatabase, _closed7, _online, _clientID, _ready, _profileIDPromise, _clientGroupIDPromise, _mutatorRegistry, _pushCounter, _pullCounter, _pullConnectionLoop, _pushConnectionLoop, _requestOptions, _idbDatabases, _lc3, _zero$1, _closeAbortController, _persistLock, _enableScheduledPersist, _enableScheduledRefresh, _enablePullAndPushInOpen, _persistScheduler, _onPersist, _refreshScheduler, _open, _onVisibilityChange1, _checkForClientStateNotFoundAndCallHandler, _invokePull, _isPullDisabled, _wrapInOnlineCheck, _wrapInReauthRetries, _isPushDisabled, _invokePush, _handleVersionNotSupportedResponse, _fireOnClientStateNotFound, _clientStateNotFoundOnClient, _clientStateNotFoundOnServer, _fireOnUpdateNeeded, _schedulePersist, _handlePersist, _scheduleRefresh, _schedule, _changeSyncCounters, _queryInternal1, _register, _registerMutators, _mutate, _convertToClientStateNotFoundError, _class12, _tables, _getTable, _class13, _input, _output, _start, _input1, _output1, _input2, _relationshipName, _storage, _not, _parentJoinKey, _noSizeReuse, _output2, _inPush, _filter, _pushWithFilter, _getSize, _setSize, _delSize, _getOrFetchSize, _fetchSize, _makeSizeStorageKeyPrefix, _makeSizeStorageKey, _getKeyValues, _class14, _inputs, _schema3, _output3, _accumulatedPushes, _input3, _outputs, _fanIn, _destroyCount, _input4, _predicate, _output4, _parent, _child, _parentKey, _childKey, _relationshipName1, _schema4, _output5, _inprogressChildChange, _pushChild, _pushParent, _class15, _parent1, _child1, _storage1, _parentKey1, _childKey1, _relationshipName2, _schema5, _output6, _inprogressChildChange1, _pushParent1, _pushChild1, _processParentNode, _class16, _input5, _bound, _comparator, _output7, _fetchOrCleanup, _shouldBePresent, _getStart, _class17, _input6, _storage2, _limit, _partitionKey, _partitionKeyComparator, _rowHiddenFromFetch, _output8, _initialFetch, _getStateAndConstraint, _pushEditChange, _withRowHiddenFromFetch, _setTakeState, _class18, _inputs1, _schema6, _fanOutPushStarted, _output9, _accumulatedPushes1, _pushInternalChange, _class19, _destroyCount1, _unionFanIn, _input7, _outputs1, _exists, _input8, _listeners, _schema7, _format$1, _root, _dirty, _resultType, _error, _updateTTL, _fireListeners, _fireListener, _hydrate, _class20, _schema8, _tableName, _hash, _system, _currentJunction, _completedAST, _system1, _resolver, _lockManager, _activeClients, _init, _getActiveClients, _addSharedLockForOtherClient, _addClient, _removeClient, __ActiveClientsManager, _locks, _signal1, _listeners1, _root1, _delete, _maxKey, __BTreeSet, _data, _input9, _queryID, _metricsDelegate, _output10, _metricName, _tableName1, _columns, _primaryKey, _primaryIndexSort, _indexes, _connections, _overlay, _getSchema, _disconnect, _getPrimaryIndex, _getOrCreateIndex, _fetch, _cleanup, _writeChange, __MemorySource, _sources, _tables1, _mainSources, _batchViewUpdates, _commitListeners, _lc4, _endTransaction, _class21, _send, _lc5, _dagStore, _clientGroupID, _messages, _apiKey, _source, _service, _host, _version, _interval, _baseURL, _timerID, _flushLock, _startTimer, _class22, _wrappedLogSink, _level, _reportIntervalMs, _host1, _reporter, _lc6, _timerID1, _metrics, _notConnected, _timeToConnectMsV2, _lastConnectErrorV2, _totalTimeToConnectMs, _setNotConnectedReason, _register1, _class23, _name1, _value, _prefix1, _clearOnFlush, _current, _outstandingMutations, _ephemeralIDsByMutationID, _allMutationsAppliedListeners, _lc7, _ackMutations, _clientID1, _largestOutstandingMutationID, _currentMutationID, _processMutationResponses, _resolveMutations, _processPushOk, _processMutationError, _processMutationOk, _settleMutation, _notifyAllMutationsAppliedListeners, _class24, _clientID2, _clientToServer, _serverToClient, _send1, _queries, _recentQueriesMaxSize, _recentQueries, _gotQueries, _mutationTracker, _pendingQueryChanges, _queryChangeThrottleMs, _pendingRemovals, _batchTimer, _lc8, _metrics1, _queryMetrics, _slowMaterializeThreshold, _fireGotCallbacks, _add, _updateEntry, _queueQueryChange, _scheduleBatch, _remove, _class25, _replicachePoke, _onPokeError, _clientID3, _lc9, _receivingPoke, _pokeBuffer, _pokePlaybackLoopRunning, _lastRafPerfTimestamp, _pokeLock, _schema9, _serverToClient1, _mutationTracker1, _raf, _startPlaybackLoop, _rafCallback, _processPokesForFrame, _handlePokeError, _clear, _class26, _context, _ivmMain, _customMutatorsEnabled, _mutationTracker2, _store1, _auth1, _rep, _server, _lc10, _logOptions, _enableAnalytics, _clientSchema, _pokeHandler, _queryManager, _ivmMain1, _clientToServer1, _deleteClientsManager, _mutationTracker3, _initConnectionQueries, _deletedClients, _lastMutationIDSent, _onPong, _onlineManager, _onUpdateNeeded, _onClientStateNotFound, _connectCookie, _connectedCount, _messageCount, _connectedAt, _connectErrorCount, _abortPingTimeout, _zeroContext, _connectResolver, _pendingPullsByRequestID, _lastMutationIDReceived, _socket, _socketResolver, _connectionStateChangeResolver, _rejectMessageError, _closeAbortController1, _visibilityWatcher1, _connectionState, _activeClientsManager, _inspector, _setConnectionState, _connectStart, _totalToConnectStart, _options1, _metrics2, _reload, _expose, _unexpose, _send2, _createLogOptions, _onMessage, _onOpen, _onClose, _handleErrorMessage, _handleConnectedMessage, _connect, _disconnect1, _handlePokeStart, _handlePokePart, _handlePokeEnd, _onPokeError1, _handlePullResponse, _pusher, _updateAuthToken, _runLoop, _puller, _setOnline, _ping, _reportMetrics, _checkConnectivity, _checkConnectivityAsync, _registerQueries, _addMetric, __Zero, _online1;
async function callDefaultFetch(url, auth, requestID, requestBody) {
  const init2 = {
    headers: {
      "Content-type": "application/json",
      "Authorization": auth,
      "X-Replicache-RequestID": requestID
    },
    body: JSON.stringify(requestBody),
    method: "POST"
  };
  const request = new Request(url, init2);
  const response = await fetch(request);
  const httpStatusCode = response.status;
  if (httpStatusCode !== 200) {
    return [
      void 0,
      {
        httpStatusCode,
        errorMessage: await response.text()
      }
    ];
  }
  return [
    response,
    {
      httpStatusCode,
      errorMessage: ""
    }
  ];
}
function isError(obj, type) {
  return typeof obj === "object" && obj !== null && obj.error === type;
}
function isErrorResponse(obj) {
  return typeof obj.error === "string";
}
function isClientStateNotFoundResponse(v1) {
  return isError(v1, "ClientStateNotFound");
}
function isVersionNotSupportedResponse(v1) {
  if (!isError(v1, "VersionNotSupported")) {
    return false;
  }
  const { versionType } = v1;
  switch (versionType) {
    case void 0:
    case "pull":
    case "push":
    case "schema":
      return true;
  }
  return false;
}
function assertVersionNotSupportedResponse(v1) {
  assert(isVersionNotSupportedResponse(v1));
}
function assertHTTPRequestInfo(v1) {
  assertObject(v1);
  assertNumber(v1.httpStatusCode);
  assertString(v1.errorMessage);
}
function assertPatchOperations(p) {
  assertArray(p);
  for (const item of p) {
    assertPatchOperation(item);
  }
}
function assertPatchOperation(p) {
  assertObject(p);
  switch (p.op) {
    case "put":
      assertString(p.key);
      assertJSONValue(p.value);
      break;
    case "update":
      assertString(p.key);
      if (p.merge !== void 0) {
        assertJSONObject(p.merge);
      }
      if (p.constrain !== void 0) {
        assertArray(p.constrain);
        for (const key of p.constrain) {
          assertString(key);
        }
      }
      break;
    case "del":
      assertString(p.key);
      break;
    case "clear":
      break;
    default:
      throw new Error(`unknown patch op \`${p.op}\`, expected one of \`put\`, \`del\`, \`clear\``);
  }
}
function getDefaultPuller(rep) {
  async function puller2(requestBody, requestID) {
    const [response, httpRequestInfo] = await callDefaultFetch(rep.pullURL, rep.auth, requestID, requestBody);
    if (!response) {
      return {
        httpRequestInfo
      };
    }
    return {
      response: await response.json(),
      httpRequestInfo
    };
  }
  defaultPullers.add(puller2);
  return puller2;
}
var defaultPullers = /* @__PURE__ */ new WeakSet();
function isDefaultPuller(puller2) {
  return defaultPullers.has(puller2);
}
function assertPullResponseV1(v1) {
  assertObject(v1);
  if (isClientStateNotFoundResponse(v1) || isVersionNotSupportedResponse(v1)) {
    return;
  }
  if (v1.cookie !== void 0) {
    assertCookie(v1.cookie);
  }
  assertLastMutationIDChanges(v1.lastMutationIDChanges);
  assertPatchOperations(v1.patch);
}
function assertLastMutationIDChanges(lastMutationIDChanges) {
  assertObject(lastMutationIDChanges);
  for (const [key, value] of Object.entries(lastMutationIDChanges)) {
    assertString(key);
    assertNumber(value);
  }
}
function assertPullerResultV1(v1) {
  assertObject(v1);
  assertHTTPRequestInfo(v1.httpRequestInfo);
  if (v1.response !== void 0) {
    assertPullResponseV1(v1.response);
  }
}
var overrides = /* @__PURE__ */ new Map();
function getBrowserGlobal(name) {
  if (overrides.has(name)) {
    return overrides.get(name);
  }
  return globalThis[name];
}
function getBrowserGlobalMethod(name) {
  return getBrowserGlobal(name)?.bind(globalThis);
}
function mustGetBrowserGlobal(name) {
  const r = getBrowserGlobal(name);
  if (r === void 0) {
    throw new Error(`Unsupported JavaScript environment: Could not find ${name}.`);
  }
  return r;
}
var promiseTrue = Promise.resolve(true);
var promiseFalse = Promise.resolve(false);
Promise.resolve(void 0);
var promiseVoid = Promise.resolve();
new Promise(() => {
});
var deleteSentinel = Symbol();
var WriteImplBase = (_read = /* @__PURE__ */ new WeakMap(), class {
  has(key) {
    if (_class_private_field_get$2(this, _read).closed) {
      return transactionIsClosedRejection();
    }
    switch (this._pending.get(key)) {
      case void 0:
        return _class_private_field_get$2(this, _read).has(key);
      case deleteSentinel:
        return promiseFalse;
      default:
        return promiseTrue;
    }
  }
  async get(key) {
    if (_class_private_field_get$2(this, _read).closed) {
      return transactionIsClosedRejection();
    }
    const v1 = this._pending.get(key);
    switch (v1) {
      case deleteSentinel:
        return void 0;
      case void 0: {
        const v2 = await _class_private_field_get$2(this, _read).get(key);
        return deepFreezeAllowUndefined(v2);
      }
      default:
        return v1;
    }
  }
  put(key, value) {
    return maybeTransactionIsClosedRejection(_class_private_field_get$2(this, _read)) ?? (this._pending.set(key, deepFreeze(value)), promiseVoid);
  }
  del(key) {
    return maybeTransactionIsClosedRejection(_class_private_field_get$2(this, _read)) ?? (this._pending.set(key, deleteSentinel), promiseVoid);
  }
  release() {
    _class_private_field_get$2(this, _read).release();
  }
  get closed() {
    return _class_private_field_get$2(this, _read).closed;
  }
  constructor(read) {
    _define_property$1(this, "_pending", /* @__PURE__ */ new Map());
    _class_private_field_init$2(this, _read, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _read, read);
  }
});
var RELAXED = {
  durability: "relaxed"
};
var OBJECT_STORE = "chunks";
var IDBStore = (_db = /* @__PURE__ */ new WeakMap(), _closed = /* @__PURE__ */ new WeakMap(), _idbDeleted = /* @__PURE__ */ new WeakMap(), _withReopen = /* @__PURE__ */ new WeakSet(), _class = class {
  read() {
    if (_class_private_field_get$2(this, _closed)) {
      return storeIsClosedRejection();
    }
    return _class_private_method_get(this, _withReopen, withReopen).call(this, readImpl);
  }
  write() {
    if (_class_private_field_get$2(this, _closed)) {
      return storeIsClosedRejection();
    }
    return _class_private_method_get(this, _withReopen, withReopen).call(this, writeImpl);
  }
  async close() {
    if (!_class_private_field_get$2(this, _idbDeleted)) {
      const db = await _class_private_field_get$2(this, _db);
      db.close();
    }
    _class_private_field_set$2(this, _closed, true);
  }
  get closed() {
    return _class_private_field_get$2(this, _closed);
  }
  constructor(name) {
    _class_private_method_init(this, _withReopen);
    _class_private_field_init$2(this, _db, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _closed, {
      writable: true,
      value: false
    });
    _class_private_field_init$2(this, _idbDeleted, {
      writable: true,
      value: false
    });
    _class_private_field_set$2(this, _db, openDatabase(name));
  }
}, _class);
var ReadImpl = (_tx = /* @__PURE__ */ new WeakMap(), _closed1 = /* @__PURE__ */ new WeakMap(), class {
  has(key) {
    if (_class_private_field_get$2(this, _closed1)) {
      return transactionIsClosedRejection();
    }
    return new Promise((resolve, reject) => {
      const req = objectStore(_class_private_field_get$2(this, _tx)).count(key);
      req.onsuccess = () => resolve(req.result > 0);
      req.onerror = () => reject(req.error);
    });
  }
  get(key) {
    if (_class_private_field_get$2(this, _closed1)) {
      return transactionIsClosedRejection();
    }
    return new Promise((resolve, reject) => {
      const req = objectStore(_class_private_field_get$2(this, _tx)).get(key);
      req.onsuccess = () => resolve(deepFreezeAllowUndefined(req.result));
      req.onerror = () => reject(req.error);
    });
  }
  release() {
    _class_private_field_set$2(this, _closed1, true);
  }
  get closed() {
    return _class_private_field_get$2(this, _closed1);
  }
  constructor(tx) {
    _class_private_field_init$2(this, _tx, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _closed1, {
      writable: true,
      value: false
    });
    _class_private_field_set$2(this, _tx, tx);
  }
});
var WriteImpl = (_tx1 = /* @__PURE__ */ new WeakMap(), _closed2 = /* @__PURE__ */ new WeakMap(), class extends WriteImplBase {
  commit() {
    if (_class_private_field_get$2(this, _closed2)) {
      return transactionIsClosedRejection();
    }
    if (this._pending.size === 0) {
      return promiseVoid;
    }
    return new Promise((resolve, reject) => {
      const tx = _class_private_field_get$2(this, _tx1);
      const store = objectStore(tx);
      for (const [key, val] of this._pending) {
        if (val === deleteSentinel) {
          store.delete(key);
        } else {
          store.put(val, key);
        }
      }
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }
  release() {
    _class_private_field_set$2(this, _closed2, true);
    super.release();
  }
  get closed() {
    return _class_private_field_get$2(this, _closed2);
  }
  constructor(tx) {
    super(new ReadImpl(tx)), _class_private_field_init$2(this, _tx1, {
      writable: true,
      value: void 0
    }), _class_private_field_init$2(this, _closed2, {
      writable: true,
      value: false
    });
    _class_private_field_set$2(this, _tx1, tx);
  }
});
function writeImpl(db) {
  const tx = db.transaction(OBJECT_STORE, "readwrite", RELAXED);
  return new WriteImpl(tx);
}
function readImpl(db) {
  const tx = db.transaction(OBJECT_STORE, "readonly");
  return new ReadImpl(tx);
}
function objectStore(tx) {
  return tx.objectStore(OBJECT_STORE);
}
function openDatabase(name) {
  const idb = mustGetBrowserGlobal("indexedDB");
  return new Promise((resolve, reject) => {
    const req = idb.open(name);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(OBJECT_STORE);
    };
    req.onsuccess = () => {
      const db = req.result;
      db.onversionchange = () => db.close();
      resolve(db);
    };
    req.onerror = () => reject(req.error);
  });
}
var IDBNotFoundError = class extends Error {
  constructor(...args) {
    super(...args), _define_property$1(this, "name", "IDBNotFoundError");
  }
};
function makeIDBName(name, schemaVersion) {
  return makeIDBNameInternal(name, schemaVersion, Latest);
}
function makeIDBNameInternal(name, schemaVersion, formatVersion) {
  const n = `rep:${name}:${formatVersion}`;
  return schemaVersion ? `${n}:${schemaVersion}` : n;
}
var AbortError = class extends Error {
  constructor(...args) {
    super(...args), _define_property$1(this, "name", "AbortError");
  }
};
var promiseVoid2 = Promise.resolve();
new Promise(() => void 0);
function sleep(ms, signal) {
  const newAbortError = () => new AbortError("Aborted");
  if (signal?.aborted) {
    return Promise.reject(newAbortError());
  }
  if (ms === 0) {
    return promiseVoid2;
  }
  return new Promise((resolve, reject) => {
    let handleAbort;
    if (signal) {
      handleAbort = () => {
        clearTimeout(id);
        reject(newAbortError());
      };
      signal.addEventListener("abort", handleAbort, {
        once: true
      });
    }
    const id = setTimeout(() => {
      resolve();
      signal?.removeEventListener("abort", handleAbort);
    }, ms);
  });
}
function sleepWithAbort(ms, signal) {
  const { promise: abortedPromise, resolve: abortedResolve } = resolver();
  const sleepPromise = new Promise((resolve) => {
    const handleAbort = () => {
      clearTimeout(id);
      abortedResolve();
    };
    const id = setTimeout(() => {
      resolve();
      signal.removeEventListener("abort", handleAbort);
    }, ms);
    signal.addEventListener("abort", handleAbort, {
      once: true
    });
  });
  return [
    sleepPromise,
    abortedPromise
  ];
}
function initBgIntervalProcess(processName, process2, delayMs, lc, signal) {
  void runBgIntervalProcess(processName, process2, delayMs, lc, signal);
}
async function runBgIntervalProcess(processName, process2, delayMs, lc, signal) {
  if (signal.aborted) {
    return;
  }
  lc = lc.withContext("bgIntervalProcess", processName);
  lc.debug?.("Starting");
  while (!signal.aborted) {
    try {
      await sleep(delayMs(), signal);
    } catch (e) {
      if (!(e instanceof AbortError)) {
        throw e;
      }
    }
    if (!signal.aborted) {
      lc.debug?.("Running");
      try {
        await process2();
      } catch (e) {
        if (signal.aborted) {
          lc.debug?.("Error running most likely due to close.", e);
        } else {
          lc.error?.("Error running.", e);
        }
      }
    }
  }
  lc.debug?.("Stopping");
}
function computeRefCountUpdates(headChanges, putChunks, delegate) {
  return new RefCountUpdates(headChanges, putChunks, delegate).compute();
}
var RefCountUpdates = (_newHeads = /* @__PURE__ */ new WeakMap(), _oldHeads = /* @__PURE__ */ new WeakMap(), _putChunks = /* @__PURE__ */ new WeakMap(), _delegate = /* @__PURE__ */ new WeakMap(), _refsCounted = /* @__PURE__ */ new WeakMap(), _refCountUpdates = /* @__PURE__ */ new WeakMap(), _loadedRefCountPromises = /* @__PURE__ */ new WeakMap(), _isLazyDelegate = /* @__PURE__ */ new WeakMap(), _changeRefCount = /* @__PURE__ */ new WeakSet(), _updateRefsCounts = /* @__PURE__ */ new WeakSet(), _ensureRefCountLoaded = /* @__PURE__ */ new WeakSet(), _updateRefCount = /* @__PURE__ */ new WeakSet(), _class1 = class {
  async compute() {
    for (const n of _class_private_field_get$2(this, _newHeads)) {
      await _class_private_method_get(this, _changeRefCount, changeRefCount).call(this, n, 1);
    }
    await Promise.all(Array.from(_class_private_field_get$2(this, _putChunks).values(), (hash2) => _class_private_method_get(this, _ensureRefCountLoaded, ensureRefCountLoaded).call(this, hash2)));
    if (_class_private_field_get$2(this, _isLazyDelegate)) {
      assert(_class_private_field_get$2(this, _delegate).areRefsCounted);
      assert(_class_private_field_get$2(this, _refsCounted));
      let refCountsUpdated;
      do {
        refCountsUpdated = false;
        for (const hash2 of _class_private_field_get$2(this, _putChunks).values()) {
          if (!_class_private_field_get$2(this, _delegate).areRefsCounted(hash2) && !_class_private_field_get$2(this, _refsCounted).has(hash2) && _class_private_field_get$2(this, _refCountUpdates).get(hash2) !== 0) {
            await _class_private_method_get(this, _updateRefsCounts, updateRefsCounts).call(this, hash2, 1);
            refCountsUpdated = true;
            break;
          }
        }
      } while (refCountsUpdated);
    }
    for (const o of _class_private_field_get$2(this, _oldHeads)) {
      await _class_private_method_get(this, _changeRefCount, changeRefCount).call(this, o, -1);
    }
    return _class_private_field_get$2(this, _refCountUpdates);
  }
  constructor(headChanges, putChunks, delegate) {
    _class_private_method_init(this, _changeRefCount);
    _class_private_method_init(this, _updateRefsCounts);
    _class_private_method_init(this, _ensureRefCountLoaded);
    _class_private_method_init(this, _updateRefCount);
    _class_private_field_init$2(this, _newHeads, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _oldHeads, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _putChunks, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _delegate, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _refsCounted, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _refCountUpdates, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _loadedRefCountPromises, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _isLazyDelegate, {
      writable: true,
      value: void 0
    });
    const newHeads = [];
    const oldHeads = [];
    for (const changedHead of headChanges) {
      if (changedHead.old !== changedHead.new) {
        changedHead.old && oldHeads.push(changedHead.old);
        changedHead.new && newHeads.push(changedHead.new);
      }
    }
    _class_private_field_set$2(this, _newHeads, newHeads);
    _class_private_field_set$2(this, _oldHeads, oldHeads);
    _class_private_field_set$2(this, _putChunks, putChunks);
    _class_private_field_set$2(this, _delegate, delegate);
    _class_private_field_set$2(this, _refCountUpdates, /* @__PURE__ */ new Map());
    _class_private_field_set$2(this, _loadedRefCountPromises, /* @__PURE__ */ new Map());
    _class_private_field_set$2(this, _isLazyDelegate, delegate.areRefsCounted !== void 0);
    _class_private_field_set$2(this, _refsCounted, _class_private_field_get$2(this, _isLazyDelegate) ? /* @__PURE__ */ new Set() : null);
  }
}, _class1);
function chunkDataKey(hash2) {
  return `c/${hash2}/d`;
}
function chunkMetaKey(hash2) {
  return `c/${hash2}/m`;
}
function chunkRefCountKey(hash2) {
  return `c/${hash2}/r`;
}
function headKey(name) {
  return `h/${name}`;
}
var StoreImpl = (_kv = /* @__PURE__ */ new WeakMap(), _chunkHasher = /* @__PURE__ */ new WeakMap(), _assertValidHash = /* @__PURE__ */ new WeakMap(), class {
  async read() {
    return new ReadImpl2(await _class_private_field_get$2(this, _kv).read(), _class_private_field_get$2(this, _assertValidHash));
  }
  async write() {
    return new WriteImpl2(await _class_private_field_get$2(this, _kv).write(), _class_private_field_get$2(this, _chunkHasher), _class_private_field_get$2(this, _assertValidHash));
  }
  close() {
    return _class_private_field_get$2(this, _kv).close();
  }
  constructor(kv, chunkHasher, assertValidHash) {
    _class_private_field_init$2(this, _kv, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _chunkHasher, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _assertValidHash, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _kv, kv);
    _class_private_field_set$2(this, _chunkHasher, chunkHasher);
    _class_private_field_set$2(this, _assertValidHash, assertValidHash);
  }
});
var ReadImpl2 = class {
  hasChunk(hash2) {
    return this._tx.has(chunkDataKey(hash2));
  }
  async getChunk(hash2) {
    const data = await this._tx.get(chunkDataKey(hash2));
    if (data === void 0) {
      return void 0;
    }
    const refsVal = await this._tx.get(chunkMetaKey(hash2));
    let refs;
    if (refsVal !== void 0) {
      assertRefs(refsVal);
      refs = refsVal;
    } else {
      refs = [];
    }
    return new Chunk(hash2, data, refs);
  }
  mustGetChunk(hash2) {
    return mustGetChunk(this, hash2);
  }
  async getHead(name) {
    const data = await this._tx.get(headKey(name));
    if (data === void 0) {
      return void 0;
    }
    assertHash(data);
    return data;
  }
  release() {
    this._tx.release();
  }
  get closed() {
    return this._tx.closed;
  }
  constructor(kv, assertValidHash) {
    _define_property$1(this, "_tx", void 0);
    _define_property$1(this, "assertValidHash", void 0);
    this._tx = kv;
    this.assertValidHash = assertValidHash;
  }
};
var WriteImpl2 = (_chunkHasher1 = /* @__PURE__ */ new WeakMap(), _putChunks1 = /* @__PURE__ */ new WeakMap(), _changedHeads = /* @__PURE__ */ new WeakMap(), _setHead = /* @__PURE__ */ new WeakSet(), _applyRefCountUpdates = /* @__PURE__ */ new WeakSet(), _removeAllRelatedKeys = /* @__PURE__ */ new WeakSet(), _class2 = class extends ReadImpl2 {
  get kvWrite() {
    return this._tx;
  }
  async putChunk(c) {
    const { hash: hash2, data, meta } = c;
    this.assertValidHash(hash2);
    const key = chunkDataKey(hash2);
    const p1 = this._tx.put(key, data);
    let p2;
    if (meta.length > 0) {
      for (const h of meta) {
        this.assertValidHash(h);
      }
      p2 = this._tx.put(chunkMetaKey(hash2), meta);
    }
    _class_private_field_get$2(this, _putChunks1).add(hash2);
    await p1;
    await p2;
  }
  setHead(name, hash2) {
    return _class_private_method_get(this, _setHead, setHead).call(this, name, hash2);
  }
  removeHead(name) {
    return _class_private_method_get(this, _setHead, setHead).call(this, name, void 0);
  }
  async commit() {
    const refCountUpdates = await computeRefCountUpdates(_class_private_field_get$2(this, _changedHeads).values(), _class_private_field_get$2(this, _putChunks1), this);
    await _class_private_method_get(this, _applyRefCountUpdates, applyRefCountUpdates).call(this, refCountUpdates);
    await this._tx.commit();
  }
  async getRefCount(hash2) {
    const value = await this._tx.get(chunkRefCountKey(hash2));
    if (value === void 0) {
      return void 0;
    }
    assertNumber(value);
    if (value < 0 || value > 65535 || value !== (value | 0)) {
      throw new Error(`Invalid ref count ${value}. We expect the value to be a Uint16`);
    }
    return value;
  }
  async getRefs(hash2) {
    const meta = await this._tx.get(chunkMetaKey(hash2));
    if (meta === void 0) {
      return [];
    }
    assertRefs(meta);
    return meta;
  }
  release() {
    this._tx.release();
  }
  constructor(kvw, chunkHasher, assertValidHash) {
    super(kvw, assertValidHash), _class_private_method_init(this, _setHead), _class_private_method_init(this, _applyRefCountUpdates), _class_private_method_init(this, _removeAllRelatedKeys), _class_private_field_init$2(this, _chunkHasher1, {
      writable: true,
      value: void 0
    }), _class_private_field_init$2(this, _putChunks1, {
      writable: true,
      value: /* @__PURE__ */ new Set()
    }), _class_private_field_init$2(this, _changedHeads, {
      writable: true,
      value: /* @__PURE__ */ new Map()
    }), _define_property$1(this, "createChunk", (data, refs) => createChunk(data, refs, _class_private_field_get$2(this, _chunkHasher1)));
    _class_private_field_set$2(this, _chunkHasher1, chunkHasher);
  }
}, _class2);
var DELETED_CLIENTS_HEAD_NAME = "deleted-clients-v2";
var deletedClientsSchema = readonlyArray(readonlyObject({
  clientGroupID: clientGroupIDSchema,
  clientID: clientIDSchema
}));
function compare(a, b) {
  const cg = stringCompare(a.clientGroupID, b.clientGroupID);
  if (cg !== 0) {
    return cg;
  }
  return stringCompare(a.clientID, b.clientID);
}
function normalizeDeletedClients(deletedClients) {
  return [
    ...deletedClients
  ].sort(compare).filter((item, index) => index === 0 || compare(item, [
    ...deletedClients
  ].sort(compare)[index - 1]) !== 0);
}
function mergeDeletedClients(a, b) {
  const merged = [];
  a = normalizeDeletedClients(a);
  b = normalizeDeletedClients(b);
  for (let i = 0, j = 0; i < a.length || j < b.length; ) {
    if (i < a.length && (j >= b.length || compare(a[i], b[j]) < 0)) {
      merged.push(a[i]);
      i++;
    } else if (j < b.length && (i >= a.length || compare(b[j], a[i]) < 0)) {
      merged.push(b[j]);
      j++;
    } else {
      merged.push(a[i]);
      i++;
      j++;
    }
  }
  return merged;
}
async function setDeletedClients(dagWrite, deletedClients) {
  const data = normalizeDeletedClients(deletedClients);
  const chunkData = deepFreeze(data);
  const chunk = dagWrite.createChunk(chunkData, []);
  await dagWrite.putChunk(chunk);
  await dagWrite.setHead(DELETED_CLIENTS_HEAD_NAME, chunk.hash);
  return data;
}
async function getDeletedClients(dagRead) {
  const hash2 = await dagRead.getHead(DELETED_CLIENTS_HEAD_NAME);
  if (hash2 === void 0) {
    return [];
  }
  const chunk = await dagRead.mustGetChunk(hash2);
  const res = test(chunk.data, deletedClientsSchema);
  if (!res.ok) {
    return [];
  }
  return res.value;
}
async function addDeletedClients(dagWrite, deletedClientsToAdd) {
  const oldDeletedClients = await getDeletedClients(dagWrite);
  return setDeletedClients(dagWrite, mergeDeletedClients(oldDeletedClients, deletedClientsToAdd));
}
async function confirmDeletedClients(dagWrite, deletedClientIds, deletedClientGroupIds) {
  const deletedClientIDSet = new Set(deletedClientIds);
  const deletedClientGroupIDSet = new Set(deletedClientGroupIds);
  const oldDeletedClients = await getDeletedClients(dagWrite);
  const clients = new Map(await getClients(dagWrite));
  for (const clientID of deletedClientIds) {
    clients.delete(clientID);
  }
  for (const clientGroupID of deletedClientGroupIds) {
    for (const [clientID, client] of clients) {
      if (client.clientGroupID === clientGroupID) {
        clients.delete(clientID);
      }
    }
  }
  await setClients(clients, dagWrite);
  return setDeletedClients(dagWrite, oldDeletedClients.filter(({ clientGroupID, clientID }) => !deletedClientGroupIDSet.has(clientGroupID) && !deletedClientIDSet.has(clientID)));
}
var localNavigator = typeof navigator !== "undefined" ? navigator : void 0;
var ReadImpl3 = (_map = /* @__PURE__ */ new WeakMap(), _release = /* @__PURE__ */ new WeakMap(), _closed3 = /* @__PURE__ */ new WeakMap(), class {
  release() {
    _class_private_field_get$2(this, _release).call(this);
    _class_private_field_set$2(this, _closed3, true);
  }
  get closed() {
    return _class_private_field_get$2(this, _closed3);
  }
  has(key) {
    return maybeTransactionIsClosedRejection(this) ?? Promise.resolve(_class_private_field_get$2(this, _map).has(key));
  }
  get(key) {
    return maybeTransactionIsClosedRejection(this) ?? Promise.resolve(_class_private_field_get$2(this, _map).get(key));
  }
  constructor(map, release) {
    _class_private_field_init$2(this, _map, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _release, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _closed3, {
      writable: true,
      value: false
    });
    _class_private_field_set$2(this, _map, map);
    _class_private_field_set$2(this, _release, release);
  }
});
var WriteImpl3 = (_map1 = /* @__PURE__ */ new WeakMap(), class extends WriteImplBase {
  commit() {
    if (this.closed) {
      return transactionIsClosedRejection();
    }
    this._pending.forEach((value, key) => {
      if (value === deleteSentinel) {
        _class_private_field_get$2(this, _map1).delete(key);
      } else {
        _class_private_field_get$2(this, _map1).set(key, value);
      }
    });
    this._pending.clear();
    this.release();
    return promiseVoid;
  }
  constructor(map, release) {
    super(new ReadImpl3(map, release)), _class_private_field_init$2(this, _map1, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _map1, map);
  }
});
var stores = /* @__PURE__ */ new Map();
function dropMemStore(name) {
  stores.delete(name);
  return promiseVoid;
}
var MemStore = (_map2 = /* @__PURE__ */ new WeakMap(), _rwLock = /* @__PURE__ */ new WeakMap(), _closed4 = /* @__PURE__ */ new WeakMap(), class {
  async read() {
    throwIfStoreClosed(this);
    const release = await _class_private_field_get$2(this, _rwLock).read();
    return new ReadImpl3(_class_private_field_get$2(this, _map2), release);
  }
  async write() {
    throwIfStoreClosed(this);
    const release = await _class_private_field_get$2(this, _rwLock).write();
    return new WriteImpl3(_class_private_field_get$2(this, _map2), release);
  }
  close() {
    _class_private_field_set$2(this, _closed4, true);
    return promiseVoid;
  }
  get closed() {
    return _class_private_field_get$2(this, _closed4);
  }
  constructor(name) {
    _class_private_field_init$2(this, _map2, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _rwLock, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _closed4, {
      writable: true,
      value: false
    });
    const entry = stores.get(name);
    let lock;
    let map;
    if (entry) {
      ({ lock, map } = entry);
    } else {
      lock = new RWLock();
      map = /* @__PURE__ */ new Map();
      stores.set(name, {
        lock,
        map
      });
    }
    _class_private_field_set$2(this, _rwLock, lock);
    _class_private_field_set$2(this, _map2, map);
  }
});
var IDBStoreWithMemFallback = (_lc = /* @__PURE__ */ new WeakMap(), _name = /* @__PURE__ */ new WeakMap(), _store = /* @__PURE__ */ new WeakMap(), _withBrainTransplant = /* @__PURE__ */ new WeakSet(), _class3 = class {
  read() {
    return _class_private_method_get(this, _withBrainTransplant, withBrainTransplant).call(this, (s) => s.read());
  }
  write() {
    return _class_private_method_get(this, _withBrainTransplant, withBrainTransplant).call(this, (s) => s.write());
  }
  close() {
    return _class_private_field_get$2(this, _store).close();
  }
  get closed() {
    return _class_private_field_get$2(this, _store).closed;
  }
  constructor(lc, name) {
    _class_private_method_init(this, _withBrainTransplant);
    _class_private_field_init$2(this, _lc, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _name, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _store, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _lc, lc);
    _class_private_field_set$2(this, _name, name);
    _class_private_field_set$2(this, _store, new IDBStore(name));
  }
}, _class3);
function isFirefoxPrivateBrowsingError(e) {
  return isFirefox() && e instanceof DOMException && e.name === "InvalidStateError" && e.message === "A mutation operation was attempted on a database that did not allow mutations.";
}
function isFirefox() {
  return localNavigator?.userAgent?.includes("Firefox") ?? false;
}
function newIDBStoreWithMemFallback(lc, name) {
  if (isFirefox()) {
    return new IDBStoreWithMemFallback(lc, name);
  }
  return new IDBStore(name);
}
function dropIDBStoreWithMemFallback(name) {
  if (!isFirefox()) {
    return dropIDBStore(name);
  }
  try {
    return dropIDBStore(name);
  } catch (e) {
    if (isFirefoxPrivateBrowsingError(e)) {
      return dropMemStore(name);
    }
  }
  return promiseVoid;
}
function dropIDBStore(name) {
  return new Promise((resolve, reject) => {
    const req = indexedDB.deleteDatabase(name);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}
function getKVStoreProvider(lc, kvStore) {
  switch (kvStore) {
    case "idb":
    case void 0:
      return {
        create: (name) => newIDBStoreWithMemFallback(lc, name),
        drop: dropIDBStoreWithMemFallback
      };
    case "mem":
      return {
        create: (name) => new MemStore(name),
        drop: (name) => dropMemStore(name)
      };
    default:
      return kvStore;
  }
}
function createLogContext(logLevel = "info", logSinks = [
  consoleLogSink
], context) {
  const logSink = logSinks.length === 1 ? logSinks[0] : new TeeLogSink(logSinks);
  return new LogContext(logLevel, context, logSink);
}
var IDB_DATABASES_VERSION = 0;
var IDB_DATABASES_DB_NAME = "replicache-dbs-v" + IDB_DATABASES_VERSION;
var testNamespace = "";
function getIDBDatabasesDBName() {
  return testNamespace + IDB_DATABASES_DB_NAME;
}
var DBS_KEY = "dbs";
var PROFILE_ID_KEY = "profileId";
function assertIndexedDBDatabaseRecord(value) {
  assertObject(value);
  for (const [name, db] of Object.entries(value)) {
    assertString(name);
    assertIndexedDBDatabase(db);
    assert(name === db.name);
  }
}
function assertIndexedDBDatabase(value) {
  assertObject(value);
  assertString(value.name);
  assertString(value.replicacheName);
  assertNumber(value.replicacheFormatVersion);
  assertString(value.schemaVersion);
  if (value.lastOpenedTimestampMS !== void 0) {
    assertNumber(value.lastOpenedTimestampMS);
  }
}
var IDBDatabasesStore = (_kvStore = /* @__PURE__ */ new WeakMap(), _putDatabase = /* @__PURE__ */ new WeakSet(), _class4 = class {
  putDatabase(db) {
    return _class_private_method_get(this, _putDatabase, putDatabase).call(this, {
      ...db,
      lastOpenedTimestampMS: Date.now()
    });
  }
  putDatabaseForTesting(db) {
    return _class_private_method_get(this, _putDatabase, putDatabase).call(this, db);
  }
  clearDatabases() {
    return withWrite(_class_private_field_get$2(this, _kvStore), (write) => write.del(DBS_KEY));
  }
  deleteDatabases(names) {
    return withWrite(_class_private_field_get$2(this, _kvStore), async (write) => {
      const oldDbRecord = await getDatabases(write);
      const dbRecord = {
        ...oldDbRecord
      };
      for (const name of names) {
        delete dbRecord[name];
      }
      await write.put(DBS_KEY, dbRecord);
    });
  }
  getDatabases() {
    return withRead(_class_private_field_get$2(this, _kvStore), getDatabases);
  }
  close() {
    return _class_private_field_get$2(this, _kvStore).close();
  }
  getProfileID() {
    return withWrite(_class_private_field_get$2(this, _kvStore), async (write) => {
      let profileId = await write.get(PROFILE_ID_KEY);
      if (profileId === void 0) {
        profileId = `p${makeClientID()}`;
        await write.put(PROFILE_ID_KEY, profileId);
      }
      assertString(profileId);
      return profileId;
    });
  }
  constructor(createKVStore) {
    _class_private_method_init(this, _putDatabase);
    _class_private_field_init$2(this, _kvStore, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _kvStore, createKVStore(getIDBDatabasesDBName()));
  }
}, _class4);
async function getDatabases(read) {
  let dbRecord = await read.get(DBS_KEY);
  if (!dbRecord) {
    dbRecord = deepFreeze({});
  }
  assertIndexedDBDatabaseRecord(dbRecord);
  return dbRecord;
}
var COLLECT_IDB_INTERVAL = 12 * 60 * 60 * 1e3;
var INITIAL_COLLECT_IDB_DELAY = 5 * 60 * 1e3;
function initCollectIDBDatabases(idbDatabasesStore, kvDropStore, collectInterval, initialCollectDelay, maxAge, enableMutationRecovery, onClientsDeleted, lc, signal) {
  let initial = true;
  initBgIntervalProcess("CollectIDBDatabases", async () => {
    await collectIDBDatabases(idbDatabasesStore, Date.now(), maxAge, kvDropStore, enableMutationRecovery, onClientsDeleted);
  }, () => {
    if (initial) {
      initial = false;
      return initialCollectDelay;
    }
    return collectInterval;
  }, lc, signal);
}
async function collectIDBDatabases(idbDatabasesStore, now, maxAge, kvDropStore, enableMutationRecovery, onClientsDeleted, newDagStore = defaultNewDagStore) {
  const databases = await idbDatabasesStore.getDatabases();
  const dbs = Object.values(databases);
  const collectResults = await Promise.all(dbs.map(async (db) => [
    db.name,
    await gatherDatabaseInfoForCollect(db, now, maxAge, enableMutationRecovery, newDagStore)
  ]));
  const dbNamesToRemove = [];
  const dbNamesToKeep = [];
  const deletedClientsToRemove = [];
  for (const [dbName, [canCollect, deletedClients]] of collectResults) {
    if (canCollect) {
      dbNamesToRemove.push(dbName);
      deletedClientsToRemove.push(...deletedClients);
    } else {
      dbNamesToKeep.push(dbName);
    }
  }
  const { errors } = await dropDatabases(idbDatabasesStore, dbNamesToRemove, kvDropStore);
  if (errors.length) {
    throw errors[0];
  }
  if (deletedClientsToRemove.length > 0) {
    let allDeletedClients = deletedClientsToRemove;
    for (const name of dbNamesToKeep) {
      await withWrite(newDagStore(name), async (dagWrite) => {
        const newDeletedClients = await addDeletedClients(dagWrite, deletedClientsToRemove);
        allDeletedClients = mergeDeletedClients(allDeletedClients, newDeletedClients);
      });
    }
    const normalizedDeletedClients = normalizeDeletedClients(allDeletedClients);
    await onClientsDeleted(normalizedDeletedClients);
  }
}
async function dropDatabaseInternal(name, idbDatabasesStore, kvDropStore) {
  await kvDropStore(name);
  await idbDatabasesStore.deleteDatabases([
    name
  ]);
}
async function dropDatabases(idbDatabasesStore, namesToRemove, kvDropStore) {
  const dropStoreResults = await Promise.allSettled(namesToRemove.map(async (name) => {
    await dropDatabaseInternal(name, idbDatabasesStore, kvDropStore);
    return name;
  }));
  const dropped = [];
  const errors = [];
  for (const result of dropStoreResults) {
    if (result.status === "fulfilled") {
      dropped.push(result.value);
    } else {
      errors.push(result.reason);
    }
  }
  return {
    dropped,
    errors
  };
}
function defaultNewDagStore(name) {
  const perKvStore = new IDBStore(name);
  return new StoreImpl(perKvStore, newRandomHash, assertHash);
}
function gatherDatabaseInfoForCollect(db, now, maxAge, enableMutationRecovery, newDagStore) {
  if (db.replicacheFormatVersion > Latest) {
    return [
      false
    ];
  }
  assert(db.lastOpenedTimestampMS !== void 0);
  if (now - db.lastOpenedTimestampMS < maxAge) {
    return [
      false
    ];
  }
  assert(db.replicacheFormatVersion === DD31 || db.replicacheFormatVersion === V6 || db.replicacheFormatVersion === V7);
  return canDatabaseBeCollectedAndGetDeletedClientIDs(enableMutationRecovery, newDagStore(db.name));
}
async function dropDatabase(dbName, opts) {
  const logContext = createLogContext(opts?.logLevel, opts?.logSinks, {
    dropDatabase: void 0
  });
  const kvStoreProvider = getKVStoreProvider(logContext, opts?.kvStore);
  await dropDatabaseInternal(dbName, new IDBDatabasesStore(kvStoreProvider.create), kvStoreProvider.drop);
}
function canDatabaseBeCollectedAndGetDeletedClientIDs(enableMutationRecovery, perdag) {
  return withRead(perdag, async (read) => {
    if (enableMutationRecovery) {
      const clientGroups = await getClientGroups(read);
      for (const clientGroup of clientGroups.values()) {
        if (clientGroupHasPendingMutations(clientGroup)) {
          return [
            false
          ];
        }
      }
    }
    const clients = await getClients(read);
    const existingDeletedClients = await getDeletedClients(read);
    const deletedClients = [
      ...existingDeletedClients
    ];
    for (const [clientID, client] of clients) {
      deletedClients.push({
        clientID,
        clientGroupID: client.clientGroupID
      });
    }
    return [
      true,
      deletedClients
    ];
  });
}
var TransactionClosedError = class extends Error {
  constructor() {
    super("Transaction is closed");
  }
};
function throwIfClosed(tx) {
  if (tx.closed) {
    throw new TransactionClosedError();
  }
}
function rejectIfClosed(tx) {
  return tx.closed ? Promise.reject(new TransactionClosedError()) : void 0;
}
var transformRequestBodySchema = valita_exports.array(valita_exports.object({
  id: valita_exports.string(),
  name: valita_exports.string(),
  args: readonly(valita_exports.array(jsonSchema))
}));
var transformedQuerySchema = valita_exports.object({
  id: valita_exports.string(),
  name: valita_exports.string(),
  ast: astSchema
});
var appQueryErrorSchema = valita_exports.object({
  error: valita_exports.literal("app"),
  id: valita_exports.string(),
  name: valita_exports.string(),
  details: jsonSchema
});
var zeroErrorSchema = valita_exports.object({
  error: valita_exports.literal("zero"),
  id: valita_exports.string(),
  name: valita_exports.string(),
  details: jsonSchema
});
var httpQueryErrorSchema = valita_exports.object({
  error: valita_exports.literal("http"),
  id: valita_exports.string(),
  name: valita_exports.string(),
  status: valita_exports.number(),
  details: jsonSchema
});
var erroredQuerySchema = valita_exports.union(appQueryErrorSchema, httpQueryErrorSchema, zeroErrorSchema);
var transformResponseBodySchema = valita_exports.array(valita_exports.union(transformedQuerySchema, erroredQuerySchema));
valita_exports.tuple([
  valita_exports.literal("transform"),
  transformRequestBodySchema
]);
var transformErrorMessageSchema = valita_exports.tuple([
  valita_exports.literal("transformError"),
  valita_exports.array(erroredQuerySchema)
]);
valita_exports.tuple([
  valita_exports.literal("transformed"),
  transformResponseBodySchema
]);
var error_kind_enum_exports = {};
__export(error_kind_enum_exports, {
  AuthInvalidated: () => AuthInvalidated,
  ClientNotFound: () => ClientNotFound,
  Internal: () => Internal,
  InvalidConnectionRequest: () => InvalidConnectionRequest,
  InvalidConnectionRequestBaseCookie: () => InvalidConnectionRequestBaseCookie,
  InvalidConnectionRequestClientDeleted: () => InvalidConnectionRequestClientDeleted,
  InvalidConnectionRequestLastMutationID: () => InvalidConnectionRequestLastMutationID,
  InvalidMessage: () => InvalidMessage,
  InvalidPush: () => InvalidPush,
  MutationFailed: () => MutationFailed,
  MutationRateLimited: () => MutationRateLimited,
  Rebalance: () => Rebalance,
  Rehome: () => Rehome,
  SchemaVersionNotSupported: () => SchemaVersionNotSupported,
  ServerOverloaded: () => ServerOverloaded,
  Unauthorized: () => Unauthorized,
  VersionNotSupported: () => VersionNotSupported
});
var AuthInvalidated = "AuthInvalidated";
var ClientNotFound = "ClientNotFound";
var InvalidConnectionRequest = "InvalidConnectionRequest";
var InvalidConnectionRequestBaseCookie = "InvalidConnectionRequestBaseCookie";
var InvalidConnectionRequestLastMutationID = "InvalidConnectionRequestLastMutationID";
var InvalidConnectionRequestClientDeleted = "InvalidConnectionRequestClientDeleted";
var InvalidMessage = "InvalidMessage";
var InvalidPush = "InvalidPush";
var MutationFailed = "MutationFailed";
var MutationRateLimited = "MutationRateLimited";
var Rebalance = "Rebalance";
var Rehome = "Rehome";
var Unauthorized = "Unauthorized";
var VersionNotSupported = "VersionNotSupported";
var SchemaVersionNotSupported = "SchemaVersionNotSupported";
var ServerOverloaded = "ServerOverloaded";
var Internal = "Internal";
function table(name) {
  return new TableBuilder({
    name,
    columns: {},
    primaryKey: []
  });
}
function string2() {
  return new ColumnBuilder({
    type: "string",
    optional: false,
    customType: null
  });
}
function number2() {
  return new ColumnBuilder({
    type: "number",
    optional: false,
    customType: null
  });
}
function json() {
  return new ColumnBuilder({
    type: "json",
    optional: false,
    customType: null
  });
}
var TableBuilder = (_schema = /* @__PURE__ */ new WeakMap(), class _TableBuilder {
  from(serverName) {
    return new _TableBuilder({
      ..._class_private_field_get$2(this, _schema),
      // Strip the "public." schema if specified, as tables in the upstream
      // "public" schema are created without the schema prefix on the replica.
      // See liteTableName() in zero-cache/src/types/names.ts
      serverName: serverName.startsWith("public.") ? serverName.substring("public.".length) : serverName
    });
  }
  columns(columns) {
    const columnSchemas = Object.fromEntries(Object.entries(columns).map(([k, v1]) => [
      k,
      v1.schema
    ]));
    return new TableBuilderWithColumns({
      ..._class_private_field_get$2(this, _schema),
      columns: columnSchemas
    });
  }
  constructor(schema2) {
    _class_private_field_init$2(this, _schema, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _schema, schema2);
  }
});
var TableBuilderWithColumns = (_schema1 = /* @__PURE__ */ new WeakMap(), class _TableBuilderWithColumns {
  primaryKey(...pkColumnNames) {
    return new _TableBuilderWithColumns({
      ..._class_private_field_get$2(this, _schema1),
      primaryKey: pkColumnNames
    });
  }
  get schema() {
    return _class_private_field_get$2(this, _schema1);
  }
  build() {
    if (_class_private_field_get$2(this, _schema1).primaryKey.length === 0) {
      throw new Error(`Table "${_class_private_field_get$2(this, _schema1).name}" is missing a primary key`);
    }
    const names = /* @__PURE__ */ new Set();
    for (const [col, { serverName }] of Object.entries(_class_private_field_get$2(this, _schema1).columns)) {
      const name = serverName ?? col;
      if (names.has(name)) {
        throw new Error(`Table "${_class_private_field_get$2(this, _schema1).name}" has multiple columns referencing "${name}"`);
      }
      names.add(name);
    }
    return _class_private_field_get$2(this, _schema1);
  }
  constructor(schema2) {
    _class_private_field_init$2(this, _schema1, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _schema1, schema2);
  }
});
var ColumnBuilder = (_schema2 = /* @__PURE__ */ new WeakMap(), class _ColumnBuilder {
  from(serverName) {
    return new _ColumnBuilder({
      ..._class_private_field_get$2(this, _schema2),
      serverName
    });
  }
  optional() {
    return new _ColumnBuilder({
      ..._class_private_field_get$2(this, _schema2),
      optional: true
    });
  }
  get schema() {
    return _class_private_field_get$2(this, _schema2);
  }
  constructor(schema2) {
    _class_private_field_init$2(this, _schema2, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _schema2, schema2);
  }
});
var valueTypeSchema = literalUnion("string", "number", "boolean", "null", "json");
var columnSchemaSchema = valita_exports.object({
  type: valueTypeSchema
});
var tableSchemaSchema = valita_exports.object({
  columns: valita_exports.record(columnSchemaSchema),
  // TODO: Make this non-optional when bumping the
  //       MIN_SERVER_SUPPORTED_SYNC_PROTOCOL to 30+.
  primaryKey: valita_exports.array(valita_exports.string()).optional()
});
var clientSchemaSchema = valita_exports.object({
  tables: valita_exports.record(tableSchemaSchema)
});
var keyCmp = ([a], [b]) => a < b ? -1 : a > b ? 1 : 0;
function normalizeClientSchema(schema2) {
  return {
    tables: mapAllEntries(schema2.tables, (tables) => tables.sort(keyCmp).map(([name, table2]) => [
      name,
      {
        columns: mapAllEntries(table2.columns, (e) => e.sort(keyCmp)),
        primaryKey: must(table2.primaryKey, `new clients always specify a primaryKey`).sort()
      }
    ]))
  };
}
function createSchema(options) {
  const retTables = {};
  const retRelationships = {};
  const serverNames = /* @__PURE__ */ new Set();
  options.tables.forEach((table2) => {
    const { serverName = table2.schema.name } = table2.schema;
    if (serverNames.has(serverName)) {
      throw new Error(`Multiple tables reference the name "${serverName}"`);
    }
    serverNames.add(serverName);
    if (retTables[table2.schema.name]) {
      throw new Error(`Table "${table2.schema.name}" is defined more than once in the schema`);
    }
    retTables[table2.schema.name] = table2.build();
  });
  options.relationships?.forEach((relationships2) => {
    if (retRelationships[relationships2.name]) {
      throw new Error(`Relationships for table "${relationships2.name}" are defined more than once in the schema`);
    }
    retRelationships[relationships2.name] = relationships2.relationships;
    checkRelationship(relationships2.relationships, relationships2.name, retTables);
  });
  return {
    tables: retTables,
    relationships: retRelationships,
    enableLegacyQueries: options.enableLegacyQueries,
    enableLegacyMutators: options.enableLegacyMutators
  };
}
function checkRelationship(relationships2, tableName, tables) {
  Object.entries(relationships2).forEach(([name, rel]) => {
    let source = tables[tableName];
    if (source.columns[name] !== void 0) {
      throw new Error(`Relationship "${tableName}"."${name}" cannot have the same name as the column "${name}" on the the table "${source.name}"`);
    }
    rel.forEach((connection) => {
      if (!tables[connection.destSchema]) {
        throw new Error(`For relationship "${tableName}"."${name}", destination table "${connection.destSchema}" is missing in the schema`);
      }
      if (!source.columns[connection.sourceField[0]]) {
        throw new Error(`For relationship "${tableName}"."${name}", the source field "${connection.sourceField[0]}" is missing in the table schema "${source.name}"`);
      }
      source = tables[connection.destSchema];
    });
  });
}
function clientSchemaFrom(schema2) {
  const client = {
    tables: mapEntries(schema2.tables, (name, { serverName, columns, primaryKey }) => [
      serverName ?? name,
      {
        columns: mapEntries(columns, (name2, { serverName: serverName2, type }) => [
          serverName2 ?? name2,
          {
            type
          }
        ]),
        primaryKey: primaryKey.map((k) => columns[k].serverName ?? k)
      }
    ])
  };
  const clientSchema2 = normalizeClientSchema(client);
  const hash2 = h64(JSON.stringify(clientSchema2)).toString(36);
  return {
    clientSchema: clientSchema2,
    hash: hash2
  };
}
function compareValues(a, b) {
  a = normalizeUndefined(a);
  b = normalizeUndefined(b);
  if (a === b) {
    return 0;
  }
  if (a === null) {
    return -1;
  }
  if (b === null) {
    return 1;
  }
  if (typeof a === "boolean") {
    assertBoolean(b);
    return a ? 1 : -1;
  }
  if (typeof a === "number") {
    assertNumber(b);
    return a - b;
  }
  if (typeof a === "string") {
    assertString(b);
    return compareUTF8(a, b);
  }
  throw new Error(`Unsupported type: ${a}`);
}
function normalizeUndefined(v1) {
  return v1 ?? null;
}
function makeComparator(order, reverse) {
  return (a, b) => {
    for (const ord of order) {
      const field = ord[0];
      const comp = compareValues(a[field], b[field]);
      if (comp !== 0) {
        const result = ord[1] === "asc" ? comp : -comp;
        return result;
      }
    }
    return 0;
  };
}
function valuesEqual(a, b) {
  if (a == null || b == null) {
    return false;
  }
  return a === b;
}
function drainStreams(node) {
  for (const stream of Object.values(node.relationships)) {
    for (const node2 of stream()) {
      drainStreams(node2);
    }
  }
}
var refCountSymbol = Symbol("rc");
var idSymbol = Symbol("id");
function applyChange(parentEntry, change, schema2, relationship, format, withIDs = false) {
  if (schema2.isHidden) {
    switch (change.type) {
      case "add":
      case "remove":
        for (const [relationship2, children] of Object.entries(change.node.relationships)) {
          const childSchema = must(schema2.relationships[relationship2]);
          for (const node of children()) {
            applyChange(parentEntry, {
              type: change.type,
              node
            }, childSchema, relationship2, format, withIDs);
          }
        }
        return;
      case "edit":
        return;
      case "child": {
        const childSchema = must(schema2.relationships[change.child.relationshipName]);
        applyChange(parentEntry, change.child.change, childSchema, relationship, format, withIDs);
        return;
      }
      default:
        unreachable();
    }
  }
  const { singular, relationships: childFormats } = format;
  switch (change.type) {
    case "add": {
      let newEntry;
      if (singular) {
        const oldEntry = parentEntry[relationship];
        if (oldEntry !== void 0) {
          assert(schema2.compareRows(oldEntry, change.node.row) === 0, `Singular relationship '${relationship}' should not have multiple rows. You may need to declare this relationship with the \`many\` helper instead of the \`one\` helper in your schema.`);
          oldEntry[refCountSymbol]++;
        } else {
          newEntry = makeNewMetaEntry(change.node.row, schema2, withIDs, 1);
          parentEntry[relationship] = newEntry;
        }
      } else {
        newEntry = add(change.node.row, getChildEntryList(parentEntry, relationship), schema2, withIDs);
      }
      if (newEntry) {
        for (const [relationship2, children] of Object.entries(change.node.relationships)) {
          const childSchema = must(schema2.relationships[relationship2]);
          const childFormat = childFormats[relationship2];
          if (childFormat === void 0) {
            continue;
          }
          const newView = childFormat.singular ? void 0 : [];
          newEntry[relationship2] = newView;
          for (const node of children()) {
            applyChange(newEntry, {
              type: "add",
              node
            }, childSchema, relationship2, childFormat, withIDs);
          }
        }
      }
      break;
    }
    case "remove": {
      if (singular) {
        const oldEntry = parentEntry[relationship];
        assert(oldEntry !== void 0, "node does not exist");
        const rc = oldEntry[refCountSymbol];
        if (rc === 1) {
          parentEntry[relationship] = void 0;
        }
        oldEntry[refCountSymbol]--;
      } else {
        removeAndUpdateRefCount(getChildEntryList(parentEntry, relationship), change.node.row, schema2.compareRows);
      }
      drainStreams(change.node);
      break;
    }
    case "child": {
      let existing;
      if (singular) {
        existing = getSingularEntry(parentEntry, relationship);
      } else {
        const view = getChildEntryList(parentEntry, relationship);
        const { pos, found } = binarySearch2(view, change.node.row, schema2.compareRows);
        assert(found, "node does not exist");
        existing = view[pos];
      }
      const childSchema = must(schema2.relationships[change.child.relationshipName]);
      const childFormat = format.relationships[change.child.relationshipName];
      if (childFormat !== void 0) {
        applyChange(existing, change.child.change, childSchema, change.child.relationshipName, childFormat, withIDs);
      }
      break;
    }
    case "edit": {
      if (singular) {
        const existing = parentEntry[relationship];
        assertMetaEntry(existing);
        applyEdit(existing, change, schema2, withIDs);
      } else {
        const view = getChildEntryList(parentEntry, relationship);
        if (schema2.compareRows(change.oldNode.row, change.node.row) !== 0) {
          const { pos: oldPos, found: oldFound } = binarySearch2(view, change.oldNode.row, schema2.compareRows);
          assert(oldFound, "old node does not exist");
          const oldEntry = view[oldPos];
          const { pos, found } = binarySearch2(view, change.node.row, schema2.compareRows);
          if (oldEntry[refCountSymbol] === 1 && (pos === oldPos || pos - 1 === oldPos)) {
            applyEdit(oldEntry, change, schema2, withIDs);
          } else {
            oldEntry[refCountSymbol]--;
            let adjustedPos = pos;
            if (oldEntry[refCountSymbol] === 0) {
              view.splice(oldPos, 1);
              adjustedPos = oldPos < pos ? pos - 1 : pos;
            }
            let entryToEdit;
            if (found) {
              entryToEdit = view[adjustedPos];
            } else {
              view.splice(adjustedPos, 0, oldEntry);
              entryToEdit = oldEntry;
              if (oldEntry[refCountSymbol] > 0) {
                const oldEntryCopy = {
                  ...oldEntry
                };
                view[oldPos] = oldEntryCopy;
              }
            }
            entryToEdit[refCountSymbol]++;
            applyEdit(entryToEdit, change, schema2, withIDs);
          }
        } else {
          const { pos, found } = binarySearch2(view, change.oldNode.row, schema2.compareRows);
          assert(found, "node does not exist");
          applyEdit(view[pos], change, schema2, withIDs);
        }
      }
      break;
    }
    default:
      unreachable();
  }
}
function applyEdit(existing, change, schema2, withIDs) {
  Object.assign(existing, change.node.row);
  if (withIDs) {
    existing[idSymbol] = makeID(change.node.row, schema2);
  }
}
function add(row, view, schema2, withIDs) {
  const { pos, found } = binarySearch2(view, row, schema2.compareRows);
  if (found) {
    view[pos][refCountSymbol]++;
    return void 0;
  }
  const newEntry = makeNewMetaEntry(row, schema2, withIDs, 1);
  view.splice(pos, 0, newEntry);
  return newEntry;
}
function removeAndUpdateRefCount(view, row, compareRows) {
  const { pos, found } = binarySearch2(view, row, compareRows);
  assert(found, "node does not exist");
  const oldEntry = view[pos];
  const rc = oldEntry[refCountSymbol];
  if (rc === 1) {
    view.splice(pos, 1);
  }
  oldEntry[refCountSymbol]--;
  return oldEntry;
}
function binarySearch2(view, target, comparator2) {
  let low = 0;
  let high = view.length - 1;
  while (low <= high) {
    const mid = low + high >>> 1;
    const comparison = comparator2(view[mid], target);
    if (comparison < 0) {
      low = mid + 1;
    } else if (comparison > 0) {
      high = mid - 1;
    } else {
      return {
        pos: mid,
        found: true
      };
    }
  }
  return {
    pos: low,
    found: false
  };
}
function getChildEntryList(parentEntry, relationship) {
  const view = parentEntry[relationship];
  assertArray(view);
  return view;
}
function assertMetaEntry(v1) {
  assertNumber(v1[refCountSymbol]);
}
function getSingularEntry(parentEntry, relationship) {
  const e = parentEntry[relationship];
  assertNumber(e[refCountSymbol]);
  return e;
}
function makeNewMetaEntry(row, schema2, withIDs, rc) {
  if (withIDs) {
    return {
      ...row,
      [refCountSymbol]: rc,
      [idSymbol]: makeID(row, schema2)
    };
  }
  return {
    ...row,
    [refCountSymbol]: rc
  };
}
function makeID(row, schema2) {
  if (schema2.primaryKey.length === 1) {
    return JSON.stringify(row[schema2.primaryKey[0]]);
  }
  return JSON.stringify(schema2.primaryKey.map((k) => row[k]));
}
var update_needed_reason_type_enum_exports = {};
__export(update_needed_reason_type_enum_exports, {
  NewClientGroup: () => NewClientGroup,
  SchemaVersionNotSupported: () => SchemaVersionNotSupported2,
  VersionNotSupported: () => VersionNotSupported2
});
var NewClientGroup = "NewClientGroup";
var VersionNotSupported2 = "VersionNotSupported";
var SchemaVersionNotSupported2 = "SchemaVersionNotSupported";
function getDocumentVisibilityWatcher(doc, hiddenIntervalMS, signal) {
  return doc ? new DocumentVisibilityWatcherImpl(doc, hiddenIntervalMS, signal) : new DocumentVisibilityWatcherNoDoc();
}
var DocumentVisibilityWatcherImpl = (_doc = /* @__PURE__ */ new WeakMap(), _hiddenIntervalMS = /* @__PURE__ */ new WeakMap(), _timeoutID = /* @__PURE__ */ new WeakMap(), _promises = /* @__PURE__ */ new WeakMap(), _onVisibilityChange = /* @__PURE__ */ new WeakMap(), _setVisibilityState = /* @__PURE__ */ new WeakSet(), _waitFor = /* @__PURE__ */ new WeakSet(), _class5 = class {
  waitForVisible() {
    return _class_private_method_get(this, _waitFor, waitFor).call(this, "visible");
  }
  waitForHidden() {
    return _class_private_method_get(this, _waitFor, waitFor).call(this, "hidden");
  }
  constructor(doc, hiddenIntervalMS, signal) {
    _class_private_method_init(this, _setVisibilityState);
    _class_private_method_init(this, _waitFor);
    _class_private_field_init$2(this, _doc, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _hiddenIntervalMS, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _timeoutID, {
      writable: true,
      value: 0
    });
    _define_property$1(this, "visibilityState", void 0);
    _class_private_field_init$2(this, _promises, {
      writable: true,
      value: /* @__PURE__ */ new Set()
    });
    _class_private_field_init$2(this, _onVisibilityChange, {
      writable: true,
      value: () => {
        if (_class_private_field_get$2(this, _doc).visibilityState === "visible") {
          clearTimeout(_class_private_field_get$2(this, _timeoutID));
          _class_private_method_get(this, _setVisibilityState, setVisibilityState).call(this, "visible");
        } else {
          _class_private_field_set$2(this, _timeoutID, setTimeout(() => {
            _class_private_method_get(this, _setVisibilityState, setVisibilityState).call(this, "hidden");
          }, _class_private_field_get$2(this, _hiddenIntervalMS)));
        }
      }
    });
    _class_private_field_set$2(this, _doc, doc);
    _class_private_field_set$2(this, _hiddenIntervalMS, hiddenIntervalMS);
    this.visibilityState = doc.visibilityState;
    _class_private_field_get$2(this, _doc).addEventListener("visibilitychange", _class_private_field_get$2(this, _onVisibilityChange), {
      signal
    });
  }
}, _class5);
var resolvedPromise = Promise.resolve();
var promiseThatNeverResolves = new Promise(() => void 0);
var DocumentVisibilityWatcherNoDoc = class {
  waitForVisible() {
    return resolvedPromise;
  }
  waitForHidden() {
    return promiseThatNeverResolves;
  }
  constructor() {
    _define_property$1(this, "visibilityState", "visible");
  }
};
var ConnectionLoopDelegateImpl = class {
  get maxDelayMs() {
    return this.rep.requestOptions.maxDelayMs;
  }
  get minDelayMs() {
    return this.rep.requestOptions.minDelayMs;
  }
  constructor(rep, invokeSend) {
    _define_property$1(this, "rep", void 0);
    _define_property$1(this, "invokeSend", void 0);
    _define_property$1(this, "maxConnections", 1);
    this.rep = rep;
    this.invokeSend = invokeSend;
  }
};
var PullDelegate = class extends ConnectionLoopDelegateImpl {
  get watchdogTimer() {
    return this.rep.pullInterval;
  }
  constructor(...args) {
    super(...args), _define_property$1(this, "debounceDelay", 0);
  }
};
var PushDelegate = class extends ConnectionLoopDelegateImpl {
  get debounceDelay() {
    return this.rep.pushDelay;
  }
  constructor(...args) {
    super(...args), _define_property$1(this, "watchdogTimer", null);
  }
};
var MIN_DELAY_MS = 30;
var MAX_DELAY_MS = 6e4;
var ConnectionLoop = (_pendingResolver = /* @__PURE__ */ new WeakMap(), _skipSleepsResolver = /* @__PURE__ */ new WeakMap(), _sendResolver = /* @__PURE__ */ new WeakMap(), _delegate1 = /* @__PURE__ */ new WeakMap(), _closed5 = /* @__PURE__ */ new WeakMap(), _abortSignal = /* @__PURE__ */ new WeakMap(), _sendCounter = /* @__PURE__ */ new WeakMap(), _lc1 = /* @__PURE__ */ new WeakMap(), _visibilityWatcher = /* @__PURE__ */ new WeakMap(), _waitingConnectionResolve = /* @__PURE__ */ new WeakMap(), _connectionAvailable = /* @__PURE__ */ new WeakSet(), _waitUntilAvailableConnection = /* @__PURE__ */ new WeakSet(), _class6 = class {
  close() {
    _class_private_field_set$2(this, _closed5, true);
    _class_private_field_get$2(this, _abortSignal).abort();
    if (_class_private_field_get$2(this, _sendCounter) > 0) {
      _class_private_field_get$2(this, _sendResolver).resolve({
        error: closeError()
      });
    }
  }
  /**
  *
  * @returns Returns undefined if ok, otherwise it return the error that caused
  * the send to fail.
  */
  async send(now) {
    if (_class_private_field_get$2(this, _closed5)) {
      return {
        error: closeError()
      };
    }
    _class_private_field_update(this, _sendCounter).value++;
    _class_private_field_get$2(this, _lc1).debug?.("send", now);
    if (now) {
      _class_private_field_get$2(this, _skipSleepsResolver).resolve();
    } else {
      await _class_private_field_get$2(this, _visibilityWatcher)?.waitForVisible();
    }
    _class_private_field_get$2(this, _pendingResolver).resolve();
    const result = await _class_private_field_get$2(this, _sendResolver).promise;
    _class_private_field_update(this, _sendCounter).value--;
    return result;
  }
  async run() {
    const sendRecords = [];
    let recoverResolver = resolver();
    let lastSendTime;
    let counter = 0;
    const delegate = _class_private_field_get$2(this, _delegate1);
    const { debug } = _class_private_field_get$2(this, _lc1);
    let delay = 0;
    debug?.("Starting connection loop");
    const sleepMaybeSkip = (ms) => Promise.race([
      _class_private_field_get$2(this, _skipSleepsResolver).promise,
      sleep(ms)
    ]);
    while (!_class_private_field_get$2(this, _closed5)) {
      debug?.(didLastSendRequestFail(sendRecords) ? "Last request failed. Trying again" : "Waiting for a send");
      const races = [
        _class_private_field_get$2(this, _pendingResolver).promise
      ];
      const t2 = delegate.watchdogTimer;
      if (t2 !== null) {
        races.push(sleep(t2, _class_private_field_get$2(this, _abortSignal).signal).catch(() => {
        }));
      }
      await Promise.race(races);
      if (_class_private_field_get$2(this, _closed5)) break;
      debug?.("Waiting for debounce");
      await sleepMaybeSkip(delegate.debounceDelay);
      if (_class_private_field_get$2(this, _closed5)) break;
      debug?.("debounced");
      _class_private_field_set$2(this, _pendingResolver, resolver());
      if (counter >= delegate.maxConnections) {
        debug?.("Too many request in flight. Waiting until one finishes...");
        await _class_private_method_get(this, _waitUntilAvailableConnection, waitUntilAvailableConnection).call(this);
        if (_class_private_field_get$2(this, _closed5)) break;
        debug?.("...finished");
      }
      if (counter > 0 || didLastSendRequestFail(sendRecords)) {
        delay = computeDelayAndUpdateDurations(delay, delegate, sendRecords);
        debug?.(didLastSendRequestFail(sendRecords) ? "Last connection errored. Sleeping for" : "More than one outstanding connection (" + counter + "). Sleeping for", delay, "ms");
      } else {
        delay = 0;
      }
      const clampedDelay = Math.min(delegate.maxDelayMs, Math.max(delegate.minDelayMs, delay));
      if (lastSendTime !== void 0) {
        const timeSinceLastSend = Date.now() - lastSendTime;
        if (clampedDelay > timeSinceLastSend) {
          await Promise.race([
            sleepMaybeSkip(clampedDelay - timeSinceLastSend),
            recoverResolver.promise
          ]);
          if (_class_private_field_get$2(this, _closed5)) break;
        }
      }
      counter++;
      void (async () => {
        const start = Date.now();
        let ok2;
        let error;
        try {
          lastSendTime = start;
          debug?.("Sending request");
          _class_private_field_set$2(this, _skipSleepsResolver, resolver());
          ok2 = await delegate.invokeSend();
          debug?.("Send returned", ok2);
        } catch (e) {
          debug?.("Send failed", e);
          error = e;
          ok2 = false;
        }
        if (_class_private_field_get$2(this, _closed5)) {
          debug?.("Closed after invokeSend");
          return;
        }
        debug?.("Request done", {
          duration: Date.now() - start,
          ok: ok2
        });
        sendRecords.push({
          duration: Date.now() - start,
          ok: ok2
        });
        if (recovered(sendRecords)) {
          recoverResolver.resolve();
          recoverResolver = resolver();
        }
        counter--;
        _class_private_method_get(this, _connectionAvailable, connectionAvailable).call(this);
        const sendResolver = _class_private_field_get$2(this, _sendResolver);
        _class_private_field_set$2(this, _sendResolver, resolver());
        if (error) {
          sendResolver.resolve({
            error
          });
        } else {
          sendResolver.resolve(void 0);
        }
        if (!ok2) {
          _class_private_field_get$2(this, _pendingResolver).resolve();
        }
      })();
    }
  }
  constructor(lc, delegate, visibilityWatcher) {
    _class_private_method_init(this, _connectionAvailable);
    _class_private_method_init(this, _waitUntilAvailableConnection);
    _class_private_field_init$2(this, _pendingResolver, {
      writable: true,
      value: resolver()
    });
    _class_private_field_init$2(this, _skipSleepsResolver, {
      writable: true,
      value: resolver()
    });
    _class_private_field_init$2(this, _sendResolver, {
      writable: true,
      value: resolver()
    });
    _class_private_field_init$2(this, _delegate1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _closed5, {
      writable: true,
      value: false
    });
    _class_private_field_init$2(this, _abortSignal, {
      writable: true,
      value: new AbortController()
    });
    _class_private_field_init$2(this, _sendCounter, {
      writable: true,
      value: 0
    });
    _class_private_field_init$2(this, _lc1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _visibilityWatcher, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _waitingConnectionResolve, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _lc1, lc);
    _class_private_field_set$2(this, _delegate1, delegate);
    _class_private_field_set$2(this, _visibilityWatcher, visibilityWatcher);
    void this.run();
  }
}, _class6);
var CONNECTION_MEMORY_COUNT = 9;
function closeError() {
  return new Error("Closed");
}
function computeDelayAndUpdateDurations(delay, delegate, sendRecords) {
  const { length } = sendRecords;
  if (length === 0) {
    return delay;
  }
  const { ok: ok2 } = sendRecords[sendRecords.length - 1];
  const { maxConnections, minDelayMs } = delegate;
  if (!ok2) {
    return delay === 0 ? minDelayMs : delay * 2;
  }
  if (length > 1) {
    const previous = sendRecords[sendRecords.length - 2];
    while (sendRecords.length > CONNECTION_MEMORY_COUNT) {
      sendRecords.shift();
    }
    if (ok2 && !previous.ok) {
      return minDelayMs;
    }
  }
  const med = median(sendRecords.filter(({ ok: ok22 }) => ok22).map(({ duration }) => duration));
  return med / maxConnections | 0;
}
function median(values) {
  values.sort();
  const { length } = values;
  const half = length >> 1;
  if (length % 2 === 1) {
    return values[half];
  }
  return (values[half - 1] + values[half]) / 2;
}
function didLastSendRequestFail(sendRecords) {
  return sendRecords.length > 0 && !sendRecords[sendRecords.length - 1].ok;
}
function recovered(sendRecords) {
  return sendRecords.length > 1 && !sendRecords[sendRecords.length - 2].ok && sendRecords[sendRecords.length - 1].ok;
}
var LazyStore = (_rwLock1 = /* @__PURE__ */ new WeakMap(), _heads = /* @__PURE__ */ new WeakMap(), _sourceStore = /* @__PURE__ */ new WeakMap(), _chunkHasher2 = /* @__PURE__ */ new WeakMap(), _assertValidHash1 = /* @__PURE__ */ new WeakMap(), class {
  async read(sourceRead) {
    const release = await _class_private_field_get$2(this, _rwLock1).read();
    return new LazyRead(_class_private_field_get$2(this, _heads), this._memOnlyChunks, this._sourceChunksCache, _class_private_field_get$2(this, _sourceStore), release, _class_private_field_get$2(this, _assertValidHash1), sourceRead);
  }
  async write() {
    const release = await _class_private_field_get$2(this, _rwLock1).write();
    return new LazyWrite(_class_private_field_get$2(this, _heads), this._memOnlyChunks, this._sourceChunksCache, _class_private_field_get$2(this, _sourceStore), this._refCounts, this._refs, release, _class_private_field_get$2(this, _chunkHasher2), _class_private_field_get$2(this, _assertValidHash1));
  }
  close() {
    return promiseVoid;
  }
  /**
  * Does not acquire any lock on the store.
  */
  isCached(chunkHash) {
    return this._sourceChunksCache.getWithoutUpdatingLRU(chunkHash) !== void 0;
  }
  withSuspendedSourceCacheEvictsAndDeletes(fn) {
    return this._sourceChunksCache.withSuspendedEvictsAndDeletes(fn);
  }
  constructor(sourceStore, sourceCacheSizeLimit, chunkHasher, assertValidHash, getSizeOfChunk = getSizeOfValue) {
    _class_private_field_init$2(this, _rwLock1, {
      writable: true,
      value: new RWLock()
    });
    _class_private_field_init$2(this, _heads, {
      writable: true,
      value: /* @__PURE__ */ new Map()
    });
    _class_private_field_init$2(this, _sourceStore, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _chunkHasher2, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _assertValidHash1, {
      writable: true,
      value: void 0
    });
    _define_property$1(this, "_memOnlyChunks", /* @__PURE__ */ new Map());
    _define_property$1(this, "_sourceChunksCache", void 0);
    _define_property$1(this, "_refCounts", /* @__PURE__ */ new Map());
    _define_property$1(this, "_refs", /* @__PURE__ */ new Map());
    this._sourceChunksCache = new ChunksCache(sourceCacheSizeLimit, getSizeOfChunk, this._refCounts, this._refs);
    _class_private_field_set$2(this, _sourceStore, sourceStore);
    _class_private_field_set$2(this, _chunkHasher2, chunkHasher);
    _class_private_field_set$2(this, _assertValidHash1, assertValidHash);
  }
});
var LazyRead = (_sourceRead = /* @__PURE__ */ new WeakMap(), _release1 = /* @__PURE__ */ new WeakMap(), _closed6 = /* @__PURE__ */ new WeakMap(), _sourceReadOwnedByCaller = /* @__PURE__ */ new WeakMap(), class {
  isMemOnlyChunkHash(hash2) {
    return this._memOnlyChunks.has(hash2);
  }
  async hasChunk(hash2) {
    return await this.getChunk(hash2) !== void 0;
  }
  async getChunk(hash2) {
    const memOnlyChunk = this._memOnlyChunks.get(hash2);
    if (memOnlyChunk !== void 0) {
      return memOnlyChunk;
    }
    let chunk = this._sourceChunksCache.get(hash2);
    if (chunk === void 0) {
      chunk = await (await this._getSourceRead()).getChunk(hash2);
      if (chunk !== void 0) {
        this._sourceChunksCache.put(chunk);
      }
    }
    return chunk;
  }
  mustGetChunk(hash2) {
    return mustGetChunk(this, hash2);
  }
  getHead(name) {
    return Promise.resolve(this._heads.get(name));
  }
  release() {
    if (!_class_private_field_get$2(this, _closed6)) {
      _class_private_field_get$2(this, _release1).call(this);
      if (!_class_private_field_get$2(this, _sourceReadOwnedByCaller)) {
        _class_private_field_get$2(this, _sourceRead)?.then((read) => read.release()).catch((_) => {
        });
      }
      _class_private_field_set$2(this, _closed6, true);
    }
  }
  get closed() {
    return _class_private_field_get$2(this, _closed6);
  }
  _getSourceRead() {
    if (!_class_private_field_get$2(this, _sourceRead)) {
      _class_private_field_set$2(this, _sourceRead, this._sourceStore.read());
    }
    return _class_private_field_get$2(this, _sourceRead);
  }
  constructor(heads, memOnlyChunks, sourceChunksCache, sourceStore, release, assertValidHash, sourceRead) {
    _define_property$1(this, "_heads", void 0);
    _define_property$1(this, "_memOnlyChunks", void 0);
    _define_property$1(this, "_sourceChunksCache", void 0);
    _define_property$1(this, "_sourceStore", void 0);
    _class_private_field_init$2(this, _sourceRead, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _release1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _closed6, {
      writable: true,
      value: false
    });
    _define_property$1(this, "assertValidHash", void 0);
    _class_private_field_init$2(this, _sourceReadOwnedByCaller, {
      writable: true,
      value: void 0
    });
    this._heads = heads;
    this._memOnlyChunks = memOnlyChunks;
    this._sourceChunksCache = sourceChunksCache;
    this._sourceStore = sourceStore;
    _class_private_field_set$2(this, _release1, release);
    this.assertValidHash = assertValidHash;
    _class_private_field_set$2(this, _sourceRead, sourceRead !== void 0 ? Promise.resolve(sourceRead) : void 0);
    _class_private_field_set$2(this, _sourceReadOwnedByCaller, sourceRead !== void 0);
  }
});
var LazyWrite = (_refCounts = /* @__PURE__ */ new WeakMap(), _refs = /* @__PURE__ */ new WeakMap(), _chunkHasher3 = /* @__PURE__ */ new WeakMap(), _createdChunks = /* @__PURE__ */ new WeakMap(), _setHead1 = /* @__PURE__ */ new WeakSet(), _class7 = class extends LazyRead {
  putChunk(c, size) {
    const { hash: hash2, meta } = c;
    this.assertValidHash(hash2);
    if (meta.length > 0) {
      for (const h of meta) {
        this.assertValidHash(h);
      }
    }
    if (_class_private_field_get$2(this, _createdChunks).has(hash2) || this.isMemOnlyChunkHash(hash2)) {
      this._pendingMemOnlyChunks.set(hash2, c);
    } else {
      this._pendingCachedChunks.set(hash2, {
        chunk: c,
        size: size ?? -1
      });
    }
    return promiseVoid;
  }
  async setHead(name, hash2) {
    await _class_private_method_get(this, _setHead1, setHead1).call(this, name, hash2);
  }
  async removeHead(name) {
    await _class_private_method_get(this, _setHead1, setHead1).call(this, name, void 0);
  }
  isMemOnlyChunkHash(hash2) {
    return this._pendingMemOnlyChunks.has(hash2) || super.isMemOnlyChunkHash(hash2);
  }
  async getChunk(hash2) {
    const pendingMemOnlyChunk = this._pendingMemOnlyChunks.get(hash2);
    if (pendingMemOnlyChunk !== void 0) {
      return pendingMemOnlyChunk;
    }
    const memOnlyChunk = this._memOnlyChunks.get(hash2);
    if (memOnlyChunk !== void 0) {
      return memOnlyChunk;
    }
    const pendingCachedChunk = this._pendingCachedChunks.get(hash2);
    if (pendingCachedChunk !== void 0) {
      return pendingCachedChunk.chunk;
    }
    let chunk = this._sourceChunksCache.get(hash2);
    if (chunk === void 0) {
      chunk = await (await this._getSourceRead()).getChunk(hash2);
      if (chunk !== void 0) {
        this._pendingCachedChunks.set(chunk.hash, {
          chunk,
          size: -1
        });
      }
    }
    return chunk;
  }
  getHead(name) {
    const headChange = this._pendingHeadChanges.get(name);
    if (headChange) {
      return Promise.resolve(headChange.new);
    }
    return super.getHead(name);
  }
  async commit() {
    const pendingChunks = new Set(joinIterables(this._pendingMemOnlyChunks.keys(), this._pendingCachedChunks.keys()));
    const refCountUpdates = await computeRefCountUpdates(this._pendingHeadChanges.values(), pendingChunks, this);
    for (const [hash2, count] of refCountUpdates) {
      if (this.isMemOnlyChunkHash(hash2)) {
        if (count === 0) {
          _class_private_field_get$2(this, _refCounts).delete(hash2);
          this._memOnlyChunks.delete(hash2);
          _class_private_field_get$2(this, _refs).delete(hash2);
        } else {
          _class_private_field_get$2(this, _refCounts).set(hash2, count);
          const chunk = this._pendingMemOnlyChunks.get(hash2);
          if (chunk) {
            _class_private_field_get$2(this, _refs).set(hash2, chunk.meta);
            this._memOnlyChunks.set(hash2, chunk);
          }
        }
        refCountUpdates.delete(hash2);
      }
    }
    this._sourceChunksCache.updateForCommit(this._pendingCachedChunks, refCountUpdates);
    for (const [name, headChange] of this._pendingHeadChanges) {
      if (headChange.new) {
        this._heads.set(name, headChange.new);
      } else {
        this._heads.delete(name);
      }
    }
    this._pendingMemOnlyChunks.clear();
    this._pendingCachedChunks.clear();
    this._pendingHeadChanges.clear();
    this.release();
  }
  getRefCount(hash2) {
    return _class_private_field_get$2(this, _refCounts).get(hash2);
  }
  getRefs(hash2) {
    const pendingMemOnlyChunk = this._pendingMemOnlyChunks.get(hash2);
    if (pendingMemOnlyChunk) {
      return pendingMemOnlyChunk.meta;
    }
    const memOnlyChunk = this._memOnlyChunks.get(hash2);
    if (memOnlyChunk) {
      return memOnlyChunk.meta;
    }
    const pendingCachedChunk = this._pendingCachedChunks.get(hash2);
    if (pendingCachedChunk !== void 0) {
      return pendingCachedChunk.chunk.meta;
    }
    return _class_private_field_get$2(this, _refs).get(hash2);
  }
  areRefsCounted(hash2) {
    return _class_private_field_get$2(this, _refs).has(hash2);
  }
  chunksPersisted(chunkHashes) {
    const chunksToCache = [];
    for (const chunkHash of chunkHashes) {
      const chunk = this._memOnlyChunks.get(chunkHash);
      if (chunk) {
        this._memOnlyChunks.delete(chunkHash);
        chunksToCache.push(chunk);
      }
    }
    this._sourceChunksCache.persisted(chunksToCache);
  }
  constructor(heads, memOnlyChunks, sourceChunksCache, sourceStore, refCounts, refs, release, chunkHasher, assertValidHash) {
    super(heads, memOnlyChunks, sourceChunksCache, sourceStore, release, assertValidHash), _class_private_method_init(this, _setHead1), _class_private_field_init$2(this, _refCounts, {
      writable: true,
      value: void 0
    }), _class_private_field_init$2(this, _refs, {
      writable: true,
      value: void 0
    }), _class_private_field_init$2(this, _chunkHasher3, {
      writable: true,
      value: void 0
    }), _define_property$1(this, "_pendingHeadChanges", /* @__PURE__ */ new Map()), _define_property$1(this, "_pendingMemOnlyChunks", /* @__PURE__ */ new Map()), _define_property$1(this, "_pendingCachedChunks", /* @__PURE__ */ new Map()), _class_private_field_init$2(this, _createdChunks, {
      writable: true,
      value: /* @__PURE__ */ new Set()
    }), _define_property$1(this, "createChunk", (data, refs2) => {
      const chunk = createChunk(data, refs2, _class_private_field_get$2(this, _chunkHasher3));
      _class_private_field_get$2(this, _createdChunks).add(chunk.hash);
      return chunk;
    });
    _class_private_field_set$2(this, _refCounts, refCounts);
    _class_private_field_set$2(this, _refs, refs);
    _class_private_field_set$2(this, _chunkHasher3, chunkHasher);
  }
}, _class7);
var ChunksCache = (_cacheSizeLimit = /* @__PURE__ */ new WeakMap(), _getSizeOfChunk = /* @__PURE__ */ new WeakMap(), _refCounts1 = /* @__PURE__ */ new WeakMap(), _refs1 = /* @__PURE__ */ new WeakMap(), _size = /* @__PURE__ */ new WeakMap(), _evictsAndDeletesSuspended = /* @__PURE__ */ new WeakMap(), _suspendedDeletes = /* @__PURE__ */ new WeakMap(), _ensureCacheSizeLimit = /* @__PURE__ */ new WeakSet(), _cacheChunk = /* @__PURE__ */ new WeakSet(), _evict = /* @__PURE__ */ new WeakSet(), _deleteEntryByHash = /* @__PURE__ */ new WeakSet(), _class8 = class {
  get(hash2) {
    const cacheEntry = this.cacheEntries.get(hash2);
    if (cacheEntry) {
      this.cacheEntries.delete(hash2);
      this.cacheEntries.set(hash2, cacheEntry);
    }
    return cacheEntry?.chunk;
  }
  getWithoutUpdatingLRU(hash2) {
    return this.cacheEntries.get(hash2)?.chunk;
  }
  put(chunk) {
    const { hash: hash2 } = chunk;
    const oldCacheEntry = this.cacheEntries.get(hash2);
    if (oldCacheEntry) {
      this.cacheEntries.delete(hash2);
      this.cacheEntries.set(hash2, oldCacheEntry);
      return;
    }
    const refCount = _class_private_field_get$2(this, _refCounts1).get(hash2);
    if (refCount === void 0 || refCount < 1) {
      return;
    }
    if (!_class_private_method_get(this, _cacheChunk, cacheChunk).call(this, chunk)) {
      return;
    }
    if (!_class_private_field_get$2(this, _refs1).has(hash2)) {
      for (const refHash of chunk.meta) {
        _class_private_field_get$2(this, _refCounts1).set(refHash, (_class_private_field_get$2(this, _refCounts1).get(refHash) || 0) + 1);
      }
      _class_private_field_get$2(this, _refs1).set(hash2, chunk.meta);
    }
    _class_private_method_get(this, _ensureCacheSizeLimit, ensureCacheSizeLimit).call(this);
  }
  updateForCommit(chunksToPut, refCountUpdates) {
    for (const [hash2, count] of refCountUpdates) {
      if (count === 0) {
        if (!_class_private_field_get$2(this, _evictsAndDeletesSuspended)) {
          _class_private_method_get(this, _deleteEntryByHash, deleteEntryByHash).call(this, hash2);
        } else {
          _class_private_field_get$2(this, _refCounts1).set(hash2, 0);
          _class_private_field_get$2(this, _suspendedDeletes).push(hash2);
        }
      } else {
        _class_private_field_get$2(this, _refCounts1).set(hash2, count);
        const chunkAndSize = chunksToPut.get(hash2);
        if (chunkAndSize) {
          const { chunk, size } = chunkAndSize;
          const oldCacheEntry = this.cacheEntries.get(hash2);
          if (oldCacheEntry) {
            this.cacheEntries.delete(hash2);
            this.cacheEntries.set(hash2, oldCacheEntry);
          } else {
            _class_private_method_get(this, _cacheChunk, cacheChunk).call(this, chunk, size !== -1 ? size : void 0);
            _class_private_field_get$2(this, _refs1).set(hash2, chunk.meta);
          }
        }
      }
    }
    _class_private_method_get(this, _ensureCacheSizeLimit, ensureCacheSizeLimit).call(this);
  }
  persisted(chunks) {
    for (const chunk of chunks) {
      _class_private_method_get(this, _cacheChunk, cacheChunk).call(this, chunk);
    }
    _class_private_method_get(this, _ensureCacheSizeLimit, ensureCacheSizeLimit).call(this);
  }
  async withSuspendedEvictsAndDeletes(fn) {
    _class_private_field_set$2(this, _evictsAndDeletesSuspended, true);
    try {
      return await fn();
    } finally {
      _class_private_field_set$2(this, _evictsAndDeletesSuspended, false);
      for (const hash2 of _class_private_field_get$2(this, _suspendedDeletes)) {
        if (_class_private_field_get$2(this, _refCounts1).get(hash2) === 0) {
          _class_private_method_get(this, _deleteEntryByHash, deleteEntryByHash).call(this, hash2);
        }
      }
      _class_private_method_get(this, _ensureCacheSizeLimit, ensureCacheSizeLimit).call(this);
    }
  }
  constructor(cacheSizeLimit, getSizeOfChunk, refCounts, refs) {
    _class_private_method_init(this, _ensureCacheSizeLimit);
    _class_private_method_init(this, _cacheChunk);
    _class_private_method_init(this, _evict);
    _class_private_method_init(this, _deleteEntryByHash);
    _class_private_field_init$2(this, _cacheSizeLimit, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _getSizeOfChunk, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _refCounts1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _refs1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _size, {
      writable: true,
      value: 0
    });
    _class_private_field_init$2(this, _evictsAndDeletesSuspended, {
      writable: true,
      value: false
    });
    _class_private_field_init$2(this, _suspendedDeletes, {
      writable: true,
      value: []
    });
    _define_property$1(this, "cacheEntries", /* @__PURE__ */ new Map());
    _class_private_field_set$2(this, _cacheSizeLimit, cacheSizeLimit);
    _class_private_field_set$2(this, _getSizeOfChunk, getSizeOfChunk);
    _class_private_field_set$2(this, _refCounts1, refCounts);
    _class_private_field_set$2(this, _refs1, refs);
  }
}, _class8);
function isScanIndexOptions(options) {
  return options.indexName !== void 0;
}
function normalizeScanOptionIndexedStartKey(startKey) {
  if (typeof startKey === "string") {
    return [
      startKey
    ];
  }
  return startKey;
}
function toDbScanOptions(options) {
  if (!options) {
    return {};
  }
  let key;
  let exclusive;
  let primary;
  let secondary;
  if (options.start) {
    ({ key, exclusive } = options.start);
    if (options.indexName) {
      if (typeof key === "string") {
        secondary = key;
      } else {
        secondary = key[0];
        primary = key[1];
      }
    } else {
      primary = key;
    }
  }
  return {
    prefix: options.prefix,
    startSecondaryKey: secondary,
    startKey: primary,
    startExclusive: exclusive,
    limit: options.limit,
    indexName: options.indexName
  };
}
var ScanResultImpl = (_iter = /* @__PURE__ */ new WeakMap(), _options = /* @__PURE__ */ new WeakMap(), _dbDelegateOptions = /* @__PURE__ */ new WeakMap(), _onLimitKey = /* @__PURE__ */ new WeakMap(), _newIterator = /* @__PURE__ */ new WeakSet(), _Symbol_asyncIterator = Symbol.asyncIterator, _class9 = class {
  /** The default AsyncIterable. This is the same as {@link values}. */
  [_Symbol_asyncIterator]() {
    return this.values();
  }
  /** Async iterator over the values of the {@link ReadTransaction.scan | scan} call. */
  values() {
    return new AsyncIterableIteratorToArrayWrapperImpl(_class_private_method_get(this, _newIterator, newIterator).call(this, (e) => e[1]));
  }
  /**
  * Async iterator over the keys of the {@link ReadTransaction.scan | scan}
  * call. If the {@link ReadTransaction.scan | scan} is over an index the key
  * is a tuple of `[secondaryKey: string, primaryKey]`
  */
  keys() {
    return new AsyncIterableIteratorToArrayWrapperImpl(_class_private_method_get(this, _newIterator, newIterator).call(this, (e) => e[0]));
  }
  /**
  * Async iterator over the entries of the {@link ReadTransaction.scan | scan}
  * call. An entry is a tuple of key values. If the
  * {@link ReadTransaction.scan | scan} is over an index the key is a tuple of
  * `[secondaryKey: string, primaryKey]`
  */
  entries() {
    return new AsyncIterableIteratorToArrayWrapperImpl(_class_private_method_get(this, _newIterator, newIterator).call(this, (e) => [
      e[0],
      e[1]
    ]));
  }
  /** Returns all the values as an array. Same as `values().toArray()` */
  toArray() {
    return this.values().toArray();
  }
  constructor(iter, options, dbDelegateOptions, onLimitKey) {
    _class_private_method_init(this, _newIterator);
    _class_private_field_init$2(this, _iter, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _options, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _dbDelegateOptions, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _onLimitKey, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _iter, iter);
    _class_private_field_set$2(this, _options, options);
    _class_private_field_set$2(this, _dbDelegateOptions, dbDelegateOptions);
    _class_private_field_set$2(this, _onLimitKey, onLimitKey);
  }
}, _class9);
var AsyncIterableIteratorToArrayWrapperImpl = (_it = /* @__PURE__ */ new WeakMap(), _Symbol_asyncIterator1 = Symbol.asyncIterator, class {
  next() {
    return _class_private_field_get$2(this, _it).next();
  }
  [_Symbol_asyncIterator1]() {
    return _class_private_field_get$2(this, _it)[Symbol.asyncIterator]();
  }
  toArray() {
    return asyncIterableToArray(_class_private_field_get$2(this, _it));
  }
  constructor(it) {
    _class_private_field_init$2(this, _it, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _it, it);
  }
});
async function* scanIterator(toValue, iter, options, closed, onLimitKey) {
  throwIfClosed(closed);
  let { limit = Infinity } = options;
  const { prefix = "" } = options;
  let exclusive = options.start?.exclusive;
  const isIndexScan = isScanIndexOptions(options);
  for await (const entry of iter) {
    const key = entry[0];
    const keyToMatch = isIndexScan ? key[0] : key;
    if (!keyToMatch.startsWith(prefix)) {
      return;
    }
    if (exclusive) {
      exclusive = true;
      if (isIndexScan) {
        if (shouldSkipIndexScan(key, options.start.key)) {
          continue;
        }
      } else {
        if (shouldSkipNonIndexScan(key, options.start.key)) {
          continue;
        }
      }
    }
    yield toValue(entry);
    if (--limit === 0) {
      if (!isIndexScan) {
        onLimitKey(key);
      }
      return;
    }
  }
}
function shouldSkipIndexScan(key, startKey) {
  const [secondaryStartKey, primaryStartKey] = normalizeScanOptionIndexedStartKey(startKey);
  const [secondaryKey, primaryKey] = normalizeScanOptionIndexedStartKey(key);
  if (secondaryKey !== secondaryStartKey) {
    return false;
  }
  if (primaryStartKey === void 0) {
    return true;
  }
  return primaryKey === primaryStartKey;
}
function shouldSkipNonIndexScan(key, startKey) {
  return key === startKey;
}
function fromKeyForIndexScanInternal(options) {
  const { prefix, start } = options;
  let prefix2 = "";
  if (prefix !== void 0) {
    prefix2 = encodeIndexScanKey(prefix, void 0);
  }
  if (!start) {
    return prefix2;
  }
  const { key } = start;
  const [secondary, primary] = normalizeScanOptionIndexedStartKey(key);
  const startKey = encodeIndexScanKey(secondary, primary);
  if (greaterThan(startKey, prefix2)) {
    return startKey;
  }
  return prefix2;
}
var transactionIDCounter = 0;
var ReadTransactionImpl = class {
  get(key) {
    return rejectIfClosed(this.dbtx) || this.dbtx.get(key);
  }
  // oxlint-disable-next-line require-await
  async has(key) {
    throwIfClosed(this.dbtx);
    return this.dbtx.has(key);
  }
  // oxlint-disable-next-line require-await
  async isEmpty() {
    throwIfClosed(this.dbtx);
    return this.dbtx.isEmpty();
  }
  scan(options) {
    return scan(options, this.dbtx, noop);
  }
  constructor(clientID, dbRead, lc, rpcName = "openReadTransaction") {
    _define_property$1(this, "clientID", void 0);
    _define_property$1(this, "dbtx", void 0);
    _define_property$1(this, "_lc", void 0);
    _define_property$1(this, "location", void 0);
    _define_property$1(this, "environment", void 0);
    this.clientID = clientID;
    this.dbtx = dbRead;
    this._lc = lc.withContext(rpcName).withContext("txid", transactionIDCounter++);
    this.environment = "client";
    this.location = "client";
  }
};
function noop(_) {
}
function scan(options, dbRead, onLimitKey) {
  const iter = getScanIterator(dbRead, options);
  return makeScanResultFromScanIteratorInternal(iter, options ?? {}, dbRead, onLimitKey);
}
var SubscriptionTransactionWrapper = (_keys = /* @__PURE__ */ new WeakMap(), _scans = /* @__PURE__ */ new WeakMap(), _tx2 = /* @__PURE__ */ new WeakMap(), class {
  get environment() {
    return _class_private_field_get$2(this, _tx2).location;
  }
  get location() {
    return _class_private_field_get$2(this, _tx2).location;
  }
  get clientID() {
    return _class_private_field_get$2(this, _tx2).clientID;
  }
  isEmpty() {
    _class_private_field_get$2(this, _scans).push({
      options: {}
    });
    return _class_private_field_get$2(this, _tx2).isEmpty();
  }
  get(key) {
    _class_private_field_get$2(this, _keys).add(key);
    return _class_private_field_get$2(this, _tx2).get(key);
  }
  has(key) {
    _class_private_field_get$2(this, _keys).add(key);
    return _class_private_field_get$2(this, _tx2).has(key);
  }
  scan(options) {
    const scanInfo = {
      options: toDbScanOptions(options),
      inclusiveLimitKey: void 0
    };
    _class_private_field_get$2(this, _scans).push(scanInfo);
    return scan(options, _class_private_field_get$2(this, _tx2).dbtx, (inclusiveLimitKey) => {
      scanInfo.inclusiveLimitKey = inclusiveLimitKey;
    });
  }
  get keys() {
    return _class_private_field_get$2(this, _keys);
  }
  get scans() {
    return _class_private_field_get$2(this, _scans);
  }
  constructor(tx) {
    _class_private_field_init$2(this, _keys, {
      writable: true,
      value: /* @__PURE__ */ new Set()
    });
    _class_private_field_init$2(this, _scans, {
      writable: true,
      value: []
    });
    _class_private_field_init$2(this, _tx2, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _tx2, tx);
  }
});
var zeroData = Symbol();
var WriteTransactionImpl = (_zeroData = zeroData, class extends ReadTransactionImpl {
  put(key, value) {
    return this.set(key, value);
  }
  async set(key, value) {
    throwIfClosed(this.dbtx);
    await this.dbtx.put(this._lc, key, deepFreeze(value));
  }
  del(key) {
    return rejectIfClosed(this.dbtx) ?? this.dbtx.del(this._lc, key);
  }
  constructor(clientID, mutationID, reason, zData, dbWrite, lc, rpcName = "openWriteTransaction") {
    super(clientID, dbWrite, lc, rpcName), _define_property$1(this, "reason", void 0), _define_property$1(this, "mutationID", void 0), _define_property$1(this, _zeroData, void 0);
    this.mutationID = mutationID;
    this.reason = reason;
    this[zeroData] = zData;
  }
});
function getScanIterator(dbRead, options) {
  if (options && isScanIndexOptions(options)) {
    return getScanIteratorForIndexMap(dbRead, options);
  }
  return dbRead.map.scan(fromKeyForNonIndexScan(options));
}
function fromKeyForNonIndexScan(options) {
  if (!options) {
    return "";
  }
  const { prefix = "", start } = options;
  if (start && greaterThan(start.key, prefix)) {
    return start.key;
  }
  return prefix;
}
function makeScanResultFromScanIteratorInternal(iter, options, dbRead, onLimitKey) {
  return new ScanResultImpl(iter, options, dbRead, onLimitKey);
}
async function* getScanIteratorForIndexMap(dbRead, options) {
  const map = dbRead.getMapForIndex(options.indexName);
  for await (const entry of map.scan(fromKeyForIndexScanInternal(options))) {
    yield [
      decodeIndexKey(entry[0]),
      entry[1]
    ];
  }
}
async function rebaseMutation(mutation, dagWrite, basisHash, mutators, lc, mutationClientID, formatVersion, zeroData2) {
  const localMeta = mutation.meta;
  const name = localMeta.mutatorName;
  if (isLocalMetaDD31(localMeta)) {
    assert(localMeta.clientID === mutationClientID, "mutationClientID must match clientID of LocalMeta");
  }
  const maybeMutatorImpl = mutators[name];
  if (!maybeMutatorImpl) {
    lc.error?.(`Cannot rebase unknown mutator ${name}`);
  }
  const mutatorImpl = maybeMutatorImpl || (async () => {
  });
  const args = localMeta.mutatorArgsJSON;
  const basisCommit = await commitFromHash(basisHash, dagWrite);
  const nextMutationID = await basisCommit.getNextMutationID(mutationClientID, dagWrite);
  if (nextMutationID !== localMeta.mutationID) {
    throw new Error(`Inconsistent mutation ID: original: ${localMeta.mutationID}, next: ${nextMutationID} - mutationClientID: ${mutationClientID} mutatorName: ${name}`);
  }
  {
    assertLocalMetaDD31(localMeta);
  }
  const dbWrite = await newWriteLocal(basisHash, name, args, mutation.chunk.hash, dagWrite, localMeta.timestamp, mutationClientID, formatVersion);
  const tx = new WriteTransactionImpl(mutationClientID, await dbWrite.getMutationID(), "rebase", zeroData2, dbWrite, lc);
  await mutatorImpl(tx, args);
  return dbWrite;
}
async function rebaseMutationAndPutCommit(mutation, dagWrite, basis, mutators, lc, mutationClientID, formatVersion, zeroData2) {
  const tx = await rebaseMutation(mutation, dagWrite, basis, mutators, lc, mutationClientID, formatVersion, zeroData2);
  return tx.putCommit();
}
async function rebaseMutationAndCommit(mutation, dagWrite, basis, headName, mutators, lc, mutationClientID, formatVersion, zeroData2) {
  const dbWrite = await rebaseMutation(mutation, dagWrite, basis, mutators, lc, mutationClientID, formatVersion, zeroData2);
  return dbWrite.commit(headName);
}
function getDefaultPusher(rep) {
  async function pusher2(requestBody, requestID) {
    const [response, httpRequestInfo] = await callDefaultFetch(rep.pushURL, rep.auth, requestID, requestBody);
    if (!response) {
      return {
        httpRequestInfo
      };
    }
    const rv = {
      httpRequestInfo
    };
    let result;
    try {
      result = await response.json();
    } catch {
      return rv;
    }
    if (isClientStateNotFoundResponse(result) || isVersionNotSupportedResponse(result)) {
      rv.response = result;
    }
    return rv;
  }
  defaultPushers.add(pusher2);
  return pusher2;
}
var defaultPushers = /* @__PURE__ */ new WeakSet();
function isDefaultPusher(pusher2) {
  return defaultPushers.has(pusher2);
}
var httpStatusUnauthorized = 401;
var ReportError = class extends Error {
};
function toError(e) {
  if (e instanceof Error) {
    return e;
  }
  return new Error(String(e));
}
var Applied = 0;
var NoOp = 1;
var CookieMismatch = 2;
async function apply(lc, dbWrite, patch) {
  for (const p of patch) {
    switch (p.op) {
      case "put": {
        const frozen = deepFreeze(p.value);
        await dbWrite.put(lc, p.key, frozen);
        break;
      }
      case "update": {
        const existing = await dbWrite.get(p.key);
        const entries = [];
        const addToEntries = (toAdd) => {
          for (const [key, value] of Object.entries(toAdd)) {
            if (!p.constrain || p.constrain.length === 0 || p.constrain.indexOf(key) > -1) {
              entries.push([
                key,
                value
              ]);
            }
          }
        };
        if (existing !== void 0) {
          assertObject(existing);
          addToEntries(existing);
        }
        if (p.merge) {
          addToEntries(p.merge);
        }
        const frozen = deepFreeze(Object.fromEntries(entries));
        await dbWrite.put(lc, p.key, frozen);
        break;
      }
      case "del": {
        const existing = await dbWrite.get(p.key);
        if (existing === void 0) {
          continue;
        }
        await dbWrite.del(lc, p.key);
        break;
      }
      case "clear":
        await dbWrite.clear();
        break;
    }
  }
}
var PullError = class extends Error {
  constructor(causedBy) {
    super("Failed to pull"), _define_property$1(this, "name", "PullError"), // causedBy is used instead of cause, because while cause has been proposed as a
    // JavaScript language standard for this purpose (see
    // https://github.com/tc39/proposal-error-cause) current browser behavior is
    // inconsistent.
    _define_property$1(this, "causedBy", void 0);
    this.causedBy = causedBy;
  }
};
var SYNC_HEAD_NAME = "sync";
var PULL_VERSION_DD31 = 1;
async function beginPullV1(profileID, clientID, clientGroupID, schemaVersion, puller2, requestID, store, formatVersion, lc, createSyncBranch = true) {
  const baseCookie = await withRead(store, async (dagRead) => {
    const mainHeadHash = await dagRead.getHead(DEFAULT_HEAD_NAME);
    if (!mainHeadHash) {
      throw new Error("Internal no main head found");
    }
    const baseSnapshot = await baseSnapshotFromHash(mainHeadHash, dagRead);
    const baseSnapshotMeta = baseSnapshot.meta;
    assertSnapshotMetaDD31(baseSnapshotMeta);
    return baseSnapshotMeta.cookieJSON;
  });
  const pullReq = {
    profileID,
    clientGroupID,
    cookie: baseCookie,
    pullVersion: PULL_VERSION_DD31,
    schemaVersion
  };
  const { response, httpRequestInfo } = await callPuller(lc, puller2, pullReq, requestID);
  if (!response) {
    return {
      httpRequestInfo,
      syncHead: emptyHash
    };
  }
  if (!createSyncBranch || isErrorResponse(response)) {
    return {
      httpRequestInfo,
      pullResponse: response,
      syncHead: emptyHash
    };
  }
  const result = await handlePullResponseV1(lc, store, baseCookie, response, clientID, formatVersion);
  return {
    httpRequestInfo,
    pullResponse: response,
    syncHead: result.type === Applied ? result.syncHead : emptyHash
  };
}
async function callPuller(lc, puller2, pullReq, requestID) {
  lc.debug?.("Starting pull...");
  const pullStart = Date.now();
  let pullerResult;
  try {
    pullerResult = await puller2(pullReq, requestID);
    lc.debug?.(`...Pull ${pullerResult.response ? "complete" : "failed"} in `, Date.now() - pullStart, "ms");
  } catch (e) {
    throw new PullError(toError(e));
  }
  try {
    assertPullerResultV1(pullerResult);
    return pullerResult;
  } catch (e) {
    throw new ReportError("Invalid puller result", toError(e));
  }
}
function badOrderMessage(name, receivedValue, lastSnapshotValue) {
  return `Received ${name} ${receivedValue} is < than last snapshot ${name} ${lastSnapshotValue}; ignoring client view`;
}
function handlePullResponseV1(lc, store, expectedBaseCookie, response, clientID, formatVersion) {
  return withWriteNoImplicitCommit(store, async (dagWrite) => {
    const dagRead = dagWrite;
    const mainHead = await dagRead.getHead(DEFAULT_HEAD_NAME);
    if (mainHead === void 0) {
      throw new Error("Main head disappeared");
    }
    const baseSnapshot = await baseSnapshotFromHash(mainHead, dagRead);
    const baseSnapshotMeta = baseSnapshot.meta;
    assertSnapshotMetaDD31(baseSnapshotMeta);
    const baseCookie = baseSnapshotMeta.cookieJSON;
    if (!deepEqual(expectedBaseCookie, baseCookie)) {
      lc.debug?.("handlePullResponse: cookie mismatch, response is not applicable");
      return {
        type: CookieMismatch
      };
    }
    for (const [clientID2, lmidChange] of Object.entries(response.lastMutationIDChanges)) {
      const lastMutationID = baseSnapshotMeta.lastMutationIDs[clientID2];
      if (lastMutationID !== void 0 && lmidChange < lastMutationID) {
        throw new Error(badOrderMessage(`${clientID2} lastMutationID`, String(lmidChange), String(lastMutationID)));
      }
    }
    const frozenResponseCookie = deepFreeze(response.cookie);
    if (compareCookies(frozenResponseCookie, baseCookie) < 0) {
      throw new Error(badOrderMessage("cookie", JSON.stringify(frozenResponseCookie), JSON.stringify(baseCookie)));
    }
    if (deepEqual(frozenResponseCookie, baseCookie)) {
      if (response.patch.length > 0) {
        lc.error?.(`handlePullResponse: cookie ${JSON.stringify(baseCookie)} did not change, but patch is not empty`);
      }
      if (Object.keys(response.lastMutationIDChanges).length > 0) {
        lc.error?.(`handlePullResponse: cookie ${JSON.stringify(baseCookie)} did not change, but lastMutationIDChanges is not empty`);
      }
      return {
        type: NoOp
      };
    }
    const dbWrite = await newWriteSnapshotDD31(baseSnapshot.chunk.hash, {
      ...baseSnapshotMeta.lastMutationIDs,
      ...response.lastMutationIDChanges
    }, frozenResponseCookie, dagWrite, clientID, formatVersion);
    await apply(lc, dbWrite, response.patch);
    return {
      type: Applied,
      syncHead: await dbWrite.commit(SYNC_HEAD_NAME)
    };
  });
}
function maybeEndPull(store, lc, expectedSyncHead, clientID, diffConfig, formatVersion) {
  return withWriteNoImplicitCommit(store, async (dagWrite) => {
    const dagRead = dagWrite;
    const syncHeadHash = await dagRead.getHead(SYNC_HEAD_NAME);
    if (syncHeadHash === void 0) {
      throw new Error("Missing sync head");
    }
    if (syncHeadHash !== expectedSyncHead) {
      lc.error?.("maybeEndPull, Wrong sync head. Expecting:", expectedSyncHead, "got:", syncHeadHash);
      throw new Error("Wrong sync head");
    }
    const syncSnapshot = await baseSnapshotFromHash(syncHeadHash, dagRead);
    const mainHeadHash = await dagRead.getHead(DEFAULT_HEAD_NAME);
    if (mainHeadHash === void 0) {
      throw new Error("Missing main head");
    }
    const mainSnapshot = await baseSnapshotFromHash(mainHeadHash, dagRead);
    const { meta } = syncSnapshot;
    const syncSnapshotBasis = meta.basisHash;
    if (syncSnapshot === null) {
      throw new Error("Sync snapshot with no basis");
    }
    if (syncSnapshotBasis !== mainSnapshot.chunk.hash) {
      throw new Error("Overlapping syncs");
    }
    const syncHead = await commitFromHash(syncHeadHash, dagRead);
    const pending = [];
    const localMutations2 = await localMutations(mainHeadHash, dagRead);
    for (const commit of localMutations2) {
      let cid = clientID;
      assert(commitIsLocalDD31(commit));
      cid = commit.meta.clientID;
      if (await commit.getMutationID(cid, dagRead) > await syncHead.getMutationID(cid, dagRead)) {
        pending.push(commit);
      }
    }
    pending.reverse();
    const diffsMap = new DiffsMap();
    if (pending.length > 0) {
      return {
        syncHead: syncHeadHash,
        oldMainHead: mainHeadHash,
        mainHead: mainHeadHash,
        replayMutations: pending,
        // The changed keys are not reported when further replays are
        // needed. The diffs will be reported at the end when there
        // are no more mutations to be replay and then it will be reported
        // relative to DEFAULT_HEAD_NAME.
        diffs: diffsMap
      };
    }
    const mainHead = await commitFromHash(mainHeadHash, dagRead);
    if (diffConfig.shouldComputeDiffs()) {
      const mainHeadMap = new BTreeRead(dagRead, formatVersion, mainHead.valueHash);
      const syncHeadMap = new BTreeRead(dagRead, formatVersion, syncHead.valueHash);
      const valueDiff = await diff(mainHeadMap, syncHeadMap);
      diffsMap.set("", valueDiff);
      await addDiffsForIndexes(mainHead, syncHead, dagRead, diffsMap, diffConfig, formatVersion);
    }
    await Promise.all([
      dagWrite.setHead(DEFAULT_HEAD_NAME, syncHeadHash),
      dagWrite.removeHead(SYNC_HEAD_NAME)
    ]);
    await dagWrite.commit();
    const newMainHeadHash = syncHeadHash;
    if (lc.debug) {
      const [oldLastMutationID, oldCookie] = snapshotMetaParts(mainSnapshot, clientID);
      const [newLastMutationID, newCookie] = snapshotMetaParts(syncSnapshot, clientID);
      lc.debug(`Successfully pulled new snapshot with lastMutationID:`, newLastMutationID, `(prev:`, oldLastMutationID, `), cookie: `, newCookie, `(prev:`, oldCookie, `), sync head hash:`, syncHeadHash, ", main head hash:", mainHeadHash, `, valueHash:`, syncHead.valueHash, `(prev:`, mainSnapshot.valueHash);
    }
    return {
      syncHead: syncHeadHash,
      oldMainHead: mainHeadHash,
      mainHead: newMainHeadHash,
      replayMutations: [],
      diffs: diffsMap
    };
  });
}
function assertPusherResult(v1) {
  assertObject(v1);
  assertHTTPRequestInfo(v1.httpRequestInfo);
  if (v1.response !== void 0) {
    assertPushResponse(v1.response);
  }
}
function assertPushResponse(v1) {
  if (isClientStateNotFoundResponse(v1)) {
    return;
  }
  assertVersionNotSupportedResponse(v1);
}
var PushError = class extends Error {
  constructor(causedBy) {
    super("Failed to push"), _define_property$1(this, "name", "PushError"), // causedBy is used instead of cause, because while cause has been proposed as a
    // JavaScript language standard for this purpose (see
    // https://github.com/tc39/proposal-error-cause) current browser behavior is
    // inconsistent.
    _define_property$1(this, "causedBy", void 0);
    this.causedBy = causedBy;
  }
};
var PUSH_VERSION_DD31 = 1;
var mutationV1Schema = readonlyObject({
  id: valita_exports.number(),
  name: valita_exports.string(),
  args: jsonSchema,
  timestamp: valita_exports.number(),
  clientID: clientIDSchema
});
valita_exports.object({
  pushVersion: valita_exports.literal(1),
  schemaVersion: valita_exports.string(),
  profileID: valita_exports.string(),
  clientGroupID: clientGroupIDSchema,
  mutations: valita_exports.array(mutationV1Schema)
});
function convertDD31(lm) {
  return {
    id: lm.mutationID,
    name: lm.mutatorName,
    args: lm.mutatorArgsJSON,
    timestamp: lm.timestamp,
    clientID: lm.clientID
  };
}
async function push(requestID, store, lc, profileID, clientGroupID, _clientID4, pusher2, schemaVersion, pushVersion) {
  const pending = await withRead(store, async (dagRead) => {
    const mainHeadHash = await dagRead.getHead(DEFAULT_HEAD_NAME);
    if (!mainHeadHash) {
      throw new Error("Internal no main head");
    }
    return localMutations(mainHeadHash, dagRead);
  });
  if (pending.length === 0) {
    return void 0;
  }
  pending.reverse();
  assert(pushVersion === PUSH_VERSION_DD31);
  const pushMutations = [];
  for (const commit of pending) {
    if (commitIsLocalDD31(commit)) {
      pushMutations.push(convertDD31(commit.meta));
    } else {
      throw new Error("Internal non local pending commit");
    }
  }
  assert(clientGroupID);
  const pushReq = {
    profileID,
    clientGroupID,
    mutations: pushMutations,
    pushVersion: PUSH_VERSION_DD31,
    schemaVersion
  };
  lc.debug?.("Starting push...");
  const pushStart = Date.now();
  const pusherResult = await callPusher(pusher2, pushReq, requestID);
  lc.debug?.("...Push complete in ", Date.now() - pushStart, "ms");
  return pusherResult;
}
async function callPusher(pusher2, body, requestID) {
  let pusherResult;
  try {
    pusherResult = await pusher2(body, requestID);
  } catch (e) {
    throw new PushError(toError(e));
  }
  try {
    assertPusherResult(pusherResult);
    return pusherResult;
  } catch (e) {
    throw new ReportError("Invalid pusher result", toError(e));
  }
}
var NoopBroadcastChannel = class {
  addEventListener() {
  }
  removeEventListener() {
  }
  dispatchEvent() {
    return false;
  }
  close() {
  }
  postMessage() {
  }
  constructor(name) {
    _define_property$1(this, "name", void 0);
    _define_property$1(this, "onmessage", null);
    _define_property$1(this, "onmessageerror", null);
    this.name = name;
  }
};
var bc = typeof BroadcastChannel === "undefined" ? NoopBroadcastChannel : BroadcastChannel;
function makeChannelNameV0(replicacheName) {
  return `replicache-new-client-group:${replicacheName}`;
}
function makeChannelNameV1(replicacheName) {
  return `replicache-new-client-group-v1:${replicacheName}`;
}
function isNewClientChannelMessageV1(message2) {
  return typeof message2 === "object" && typeof message2.clientGroupID === "string" && typeof message2.idbName === "string";
}
function initNewClientChannel(replicacheName, idbName, signal, clientGroupID, isNewClientGroup, onUpdateNeeded, perdag) {
  if (signal.aborted) {
    return;
  }
  const channelV1 = new bc(makeChannelNameV1(replicacheName));
  if (isNewClientGroup) {
    channelV1.postMessage({
      clientGroupID,
      idbName
    });
    const channelV0 = new bc(makeChannelNameV0(replicacheName));
    channelV0.postMessage([
      clientGroupID
    ]);
    channelV0.close();
  }
  channelV1.onmessage = async (e) => {
    const { data } = e;
    if (isNewClientChannelMessageV1(data)) {
      const { clientGroupID: newClientGroupID, idbName: newClientIDBName } = data;
      if (newClientGroupID !== clientGroupID) {
        if (newClientIDBName === idbName) {
          const updateNeeded = await withRead(perdag, async (perdagRead) => await getClientGroup(newClientGroupID, perdagRead) !== void 0);
          if (updateNeeded) {
            onUpdateNeeded();
          }
        } else {
          onUpdateNeeded();
          return;
        }
      }
    }
  };
  signal.addEventListener("abort", () => channelV1.close(), {
    once: true
  });
}
function makeChannelName(replicacheName) {
  return `replicache-on-persist:${replicacheName}`;
}
function assertPersistInfo(value) {
  assertObject(value);
  assertString(value.clientGroupID);
  assertString(value.clientID);
}
function initOnPersistChannel(replicacheName, signal, handlePersist2) {
  if (signal.aborted) {
    return () => void 0;
  }
  const channel = new bc(makeChannelName(replicacheName));
  channel.onmessage = (e) => {
    const { data } = e;
    assertPersistInfo(data);
    handlePersist2({
      clientGroupID: data.clientGroupID,
      clientID: data.clientID
    });
  };
  signal.addEventListener("abort", () => channel.close(), {
    once: true
  });
  return (persistInfo) => {
    if (signal.aborted) {
      return;
    }
    channel.postMessage(persistInfo);
    handlePersist2(persistInfo);
  };
}
async function pendingMutationsForAPI(dagRead) {
  const mainHeadHash = await mustGetHeadHash(DEFAULT_HEAD_NAME, dagRead);
  const pending = await localMutationsDD31(mainHeadHash, dagRead);
  return pending.map((p) => ({
    id: p.meta.mutationID,
    name: p.meta.mutatorName,
    args: p.meta.mutatorArgsJSON,
    clientID: p.meta.clientID
  })).reverse();
}
var CLIENT_MAX_INACTIVE_TIME = 24 * 60 * 60 * 1e3;
var GC_INTERVAL = 5 * 60 * 1e3;
var latestGCUpdate;
function initClientGC(clientID, dagStore, clientMaxInactiveTime, gcInterval, onClientsDeleted, lc, signal) {
  initBgIntervalProcess("ClientGC", () => {
    latestGCUpdate = gcClients(clientID, dagStore, clientMaxInactiveTime, onClientsDeleted);
    return latestGCUpdate;
  }, () => gcInterval, lc, signal);
}
function gcClients(clientID, dagStore, clientMaxInactiveTime, onClientsDeleted) {
  return withWrite(dagStore, async (dagWrite) => {
    const now = Date.now();
    const clients = await getClients(dagWrite);
    const deletedClients = [];
    const newClients = /* @__PURE__ */ new Map();
    for (const [id, client] of clients) {
      if (id === clientID || now - client.heartbeatTimestampMs <= clientMaxInactiveTime) {
        newClients.set(id, client);
      } else {
        deletedClients.push({
          clientGroupID: client.clientGroupID,
          clientID: id
        });
      }
    }
    if (newClients.size === clients.size) {
      return clients;
    }
    await setClients(newClients, dagWrite);
    const normalizedDeletedClients = await addDeletedClients(dagWrite, deletedClients);
    await onClientsDeleted(normalizedDeletedClients);
    return newClients;
  });
}
var GC_INTERVAL_MS = 5 * 60 * 1e3;
var latestGCUpdate2;
function initClientGroupGC(dagStore, enableMutationRecovery, lc, signal) {
  initBgIntervalProcess("ClientGroupGC", () => {
    latestGCUpdate2 = gcClientGroups(dagStore, enableMutationRecovery);
    return latestGCUpdate2;
  }, () => GC_INTERVAL_MS, lc, signal);
}
function gcClientGroups(dagStore, enableMutationRecovery) {
  return withWrite(dagStore, async (tx) => {
    const clients = await getClients(tx);
    const clientGroupIDs = /* @__PURE__ */ new Set();
    for (const client of clients.values()) {
      clientGroupIDs.add(client.clientGroupID);
    }
    const clientGroups = /* @__PURE__ */ new Map();
    const removeClientGroups = /* @__PURE__ */ new Set();
    for (const [clientGroupID, clientGroup] of await getClientGroups(tx)) {
      if (clientGroupIDs.has(clientGroupID) || enableMutationRecovery && clientGroupHasPendingMutations(clientGroup)) {
        clientGroups.set(clientGroupID, clientGroup);
      } else {
        removeClientGroups.add(clientGroupID);
      }
    }
    await setClientGroups(clientGroups, tx);
    return clientGroups;
  });
}
var HEARTBEAT_INTERVAL = 60 * 1e3;
var latestHeartbeatUpdate;
function startHeartbeats(clientID, dagStore, onClientStateNotFound, heartbeatIntervalMs, lc, signal) {
  initBgIntervalProcess("Heartbeat", async () => {
    latestHeartbeatUpdate = writeHeartbeat(clientID, dagStore);
    try {
      return await latestHeartbeatUpdate;
    } catch (e) {
      if (e instanceof ClientStateNotFoundError) {
        onClientStateNotFound();
        return;
      }
      throw e;
    }
  }, () => heartbeatIntervalMs, lc, signal);
}
function writeHeartbeat(clientID, dagStore) {
  return withWrite(dagStore, async (dagWrite) => {
    const clients = await getClients(dagWrite);
    const client = clients.get(clientID);
    if (!client) {
      throw new ClientStateNotFoundError(clientID);
    }
    const newClient = {
      ...client,
      heartbeatTimestampMs: Date.now()
    };
    const newClients = new Map(clients).set(clientID, newClient);
    await setClients(newClients, dagWrite);
    return newClients;
  });
}
var Visitor = (_seen = /* @__PURE__ */ new WeakMap(), _dagRead = /* @__PURE__ */ new WeakMap(), class {
  async visit(h) {
    if (_class_private_field_get$2(this, _seen).has(h)) {
      return;
    }
    _class_private_field_get$2(this, _seen).add(h);
    const chunk = await _class_private_field_get$2(this, _dagRead).mustGetChunk(h);
    await this.visitChunk(chunk);
  }
  async visitChunk(chunk) {
    await Promise.all(chunk.meta.map((ref) => this.visit(ref)));
  }
  constructor(dagRead) {
    _class_private_field_init$2(this, _seen, {
      writable: true,
      value: /* @__PURE__ */ new Set()
    });
    _class_private_field_init$2(this, _dagRead, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _dagRead, dagRead);
  }
});
var GatherMemoryOnlyVisitor = (_gatheredChunks = /* @__PURE__ */ new WeakMap(), _lazyRead = /* @__PURE__ */ new WeakMap(), class extends Visitor {
  get gatheredChunks() {
    return _class_private_field_get$2(this, _gatheredChunks);
  }
  visit(h) {
    if (!_class_private_field_get$2(this, _lazyRead).isMemOnlyChunkHash(h)) {
      return promiseVoid;
    }
    return super.visit(h);
  }
  visitChunk(chunk) {
    _class_private_field_get$2(this, _gatheredChunks).set(chunk.hash, chunk);
    return super.visitChunk(chunk);
  }
  constructor(dagRead) {
    super(dagRead), _class_private_field_init$2(this, _gatheredChunks, {
      writable: true,
      value: /* @__PURE__ */ new Map()
    }), _class_private_field_init$2(this, _lazyRead, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _lazyRead, dagRead);
  }
});
async function persistDD31(lc, clientID, memdag, perdag, mutators, closed, formatVersion, getZeroData, onGatherMemOnlyChunksForTest = () => Promise.resolve()) {
  if (closed()) {
    return;
  }
  const [perdagLMID, perdagBaseSnapshot, mainClientGroupID] = await withRead(perdag, async (perdagRead) => {
    await assertHasClientState(clientID, perdagRead);
    const mainClientGroupID2 = await getClientGroupIDForClient(clientID, perdagRead);
    assert(mainClientGroupID2, `No main client group for clientID: ${clientID}`);
    const [, perdagMainClientGroupHeadCommit] = await getClientGroupInfo(perdagRead, mainClientGroupID2);
    const perdagLMID2 = await perdagMainClientGroupHeadCommit.getMutationID(clientID, perdagRead);
    const perdagBaseSnapshot2 = await baseSnapshotFromCommit(perdagMainClientGroupHeadCommit, perdagRead);
    assertSnapshotCommitDD31(perdagBaseSnapshot2);
    return [
      perdagLMID2,
      perdagBaseSnapshot2,
      mainClientGroupID2
    ];
  });
  if (closed()) {
    return;
  }
  const [newMemdagMutations, memdagBaseSnapshot, gatheredChunks] = await withRead(memdag, async (memdagRead) => {
    const memdagHeadCommit = await commitFromHead(DEFAULT_HEAD_NAME, memdagRead);
    const newMutations = await localMutationsGreaterThan(memdagHeadCommit, {
      [clientID]: perdagLMID || 0
    }, memdagRead);
    const memdagBaseSnapshot2 = await baseSnapshotFromCommit(memdagHeadCommit, memdagRead);
    assertSnapshotCommitDD31(memdagBaseSnapshot2);
    let gatheredChunks2;
    if (compareCookiesForSnapshots(memdagBaseSnapshot2, perdagBaseSnapshot) > 0) {
      await onGatherMemOnlyChunksForTest();
      const memdagBaseSnapshotHash = memdagBaseSnapshot2.chunk.hash;
      const visitor = new GatherMemoryOnlyVisitor(memdagRead);
      await visitor.visit(memdagBaseSnapshotHash);
      gatheredChunks2 = visitor.gatheredChunks;
    }
    return [
      newMutations,
      memdagBaseSnapshot2,
      gatheredChunks2
    ];
  });
  if (closed()) {
    return;
  }
  let memdagBaseSnapshotPersisted = false;
  const zeroDataForMemdagBaseSnapshot = getZeroData && await getZeroData(memdagBaseSnapshot.chunk.hash);
  await withWrite(perdag, async (perdagWrite) => {
    const [mainClientGroup, latestPerdagMainClientGroupHeadCommit] = await getClientGroupInfo(perdagWrite, mainClientGroupID);
    let newMainClientGroupHeadHash = latestPerdagMainClientGroupHeadCommit.chunk.hash;
    let mutationIDs = {
      ...mainClientGroup.mutationIDs
    };
    let { lastServerAckdMutationIDs } = mainClientGroup;
    if (gatheredChunks) {
      const client = await mustGetClient(clientID, perdagWrite);
      assertClientV6(client);
      const latestPerdagBaseSnapshot = await baseSnapshotFromCommit(latestPerdagMainClientGroupHeadCommit, perdagWrite);
      assertSnapshotCommitDD31(latestPerdagBaseSnapshot);
      if (compareCookiesForSnapshots(memdagBaseSnapshot, latestPerdagBaseSnapshot) > 0) {
        memdagBaseSnapshotPersisted = true;
        await Promise.all(Array.from(gatheredChunks.values(), (c) => perdagWrite.putChunk(c)));
        await setClient(clientID, {
          ...client,
          persistHash: memdagBaseSnapshot.chunk.hash
        }, perdagWrite);
        newMainClientGroupHeadHash = memdagBaseSnapshot.chunk.hash;
        const mainClientGroupLocalMutations = await localMutationsDD31(mainClientGroup.headHash, perdagWrite);
        lastServerAckdMutationIDs = memdagBaseSnapshot.meta.lastMutationIDs;
        mutationIDs = {
          ...lastServerAckdMutationIDs
        };
        newMainClientGroupHeadHash = await rebase(mainClientGroupLocalMutations, newMainClientGroupHeadHash, perdagWrite, mutators, mutationIDs, lc, formatVersion, zeroDataForMemdagBaseSnapshot);
      }
    }
    let zeroDataForPerdagHeadCommit;
    if (!memdagBaseSnapshotPersisted) {
      zeroDataForPerdagHeadCommit = getZeroData && await getZeroData(newMainClientGroupHeadHash, {
        openLazySourceRead: perdagWrite
      });
    }
    newMainClientGroupHeadHash = await rebase(newMemdagMutations, newMainClientGroupHeadHash, perdagWrite, mutators, mutationIDs, lc, formatVersion, zeroDataForPerdagHeadCommit ?? zeroDataForMemdagBaseSnapshot);
    const newMainClientGroup = {
      ...mainClientGroup,
      headHash: newMainClientGroupHeadHash,
      mutationIDs,
      lastServerAckdMutationIDs
    };
    await setClientGroup(mainClientGroupID, newMainClientGroup, perdagWrite);
  });
  if (gatheredChunks && memdagBaseSnapshotPersisted) {
    await withWrite(memdag, (memdagWrite) => memdagWrite.chunksPersisted([
      ...gatheredChunks.keys()
    ]));
  }
}
async function getClientGroupInfo(perdagRead, clientGroupID) {
  const clientGroup = await getClientGroup(clientGroupID, perdagRead);
  assert(clientGroup, `No client group for clientGroupID: ${clientGroupID}`);
  return [
    clientGroup,
    await commitFromHash(clientGroup.headHash, perdagRead)
  ];
}
async function rebase(mutations, basis, write, mutators, mutationIDs, lc, formatVersion, zeroData2) {
  for (let i = mutations.length - 1; i >= 0; i--) {
    const mutationCommit = mutations[i];
    const { meta } = mutationCommit;
    const newMainHead = await commitFromHash(basis, write);
    if (await mutationCommit.getMutationID(meta.clientID, write) > await newMainHead.getMutationID(meta.clientID, write)) {
      mutationIDs[meta.clientID] = meta.mutationID;
      basis = (await rebaseMutationAndPutCommit(mutationCommit, write, basis, mutators, lc, meta.clientID, formatVersion, zeroData2)).chunk.hash;
    }
  }
  return basis;
}
var GatherNotCachedVisitor = (_gatheredChunks1 = /* @__PURE__ */ new WeakMap(), _gatheredChunksTotalSize = /* @__PURE__ */ new WeakMap(), _lazyStore = /* @__PURE__ */ new WeakMap(), _gatherSizeLimit = /* @__PURE__ */ new WeakMap(), _getSizeOfChunk1 = /* @__PURE__ */ new WeakMap(), class extends Visitor {
  get gatheredChunks() {
    return _class_private_field_get$2(this, _gatheredChunks1);
  }
  visit(h) {
    if (_class_private_field_get$2(this, _gatheredChunksTotalSize) >= _class_private_field_get$2(this, _gatherSizeLimit) || _class_private_field_get$2(this, _lazyStore).isCached(h)) {
      return promiseVoid;
    }
    return super.visit(h);
  }
  visitChunk(chunk) {
    if (_class_private_field_get$2(this, _gatheredChunksTotalSize) < _class_private_field_get$2(this, _gatherSizeLimit)) {
      const size = _class_private_field_get$2(this, _getSizeOfChunk1).call(this, chunk);
      _class_private_field_get$2(this, _gatheredChunks1).set(chunk.hash, {
        chunk,
        size
      });
      _class_private_field_set$2(this, _gatheredChunksTotalSize, _class_private_field_get$2(this, _gatheredChunksTotalSize) + size);
    }
    return super.visitChunk(chunk);
  }
  constructor(dagRead, lazyStore, gatherSizeLimit, getSizeOfChunk = getSizeOfValue) {
    super(dagRead), _class_private_field_init$2(this, _gatheredChunks1, {
      writable: true,
      value: /* @__PURE__ */ new Map()
    }), _class_private_field_init$2(this, _gatheredChunksTotalSize, {
      writable: true,
      value: 0
    }), _class_private_field_init$2(this, _lazyStore, {
      writable: true,
      value: void 0
    }), _class_private_field_init$2(this, _gatherSizeLimit, {
      writable: true,
      value: void 0
    }), _class_private_field_init$2(this, _getSizeOfChunk1, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _lazyStore, lazyStore);
    _class_private_field_set$2(this, _gatherSizeLimit, gatherSizeLimit);
    _class_private_field_set$2(this, _getSizeOfChunk1, getSizeOfChunk);
  }
});
var GATHER_SIZE_LIMIT = 5 * 2 ** 20;
var DELAY_MS = 300;
async function refresh(lc, memdag, perdag, clientID, mutators, diffConfig, closed, formatVersion, zero2) {
  if (closed()) {
    return;
  }
  const memdagBaseSnapshot = await withRead(memdag, (memdagRead) => baseSnapshotFromHead(DEFAULT_HEAD_NAME, memdagRead));
  assertSnapshotCommitDD31(memdagBaseSnapshot);
  const result = await memdag.withSuspendedSourceCacheEvictsAndDeletes(async () => {
    const perdagWriteResult = await withWrite(perdag, async (perdagWrite) => {
      const clientGroup = await getClientGroupForClient(clientID, perdagWrite);
      if (!clientGroup) {
        throw new ClientStateNotFoundError(clientID);
      }
      const perdagClientGroupHeadHash2 = clientGroup.headHash;
      const perdagClientGroupHeadCommit = await commitFromHash(perdagClientGroupHeadHash2, perdagWrite);
      const perdagLmid2 = await perdagClientGroupHeadCommit.getMutationID(clientID, perdagWrite);
      const client = await mustGetClient(clientID, perdagWrite);
      assertClientV6(client);
      const perdagClientGroupBaseSnapshot2 = await baseSnapshotFromHash(perdagClientGroupHeadHash2, perdagWrite);
      assertSnapshotCommitDD31(perdagClientGroupBaseSnapshot2);
      if (shouldAbortRefresh(memdagBaseSnapshot, perdagClientGroupBaseSnapshot2, perdagClientGroupHeadHash2)) {
        return void 0;
      }
      const visitor = new GatherNotCachedVisitor(perdagWrite, memdag, GATHER_SIZE_LIMIT);
      await visitor.visit(perdagClientGroupHeadHash2);
      const { gatheredChunks: gatheredChunks2 } = visitor;
      const refreshHashesSet = new Set(client.refreshHashes);
      refreshHashesSet.add(perdagClientGroupHeadHash2);
      const newClient = {
        ...client,
        refreshHashes: [
          ...refreshHashesSet
        ]
      };
      await setClient(clientID, newClient, perdagWrite);
      return [
        perdagClientGroupHeadHash2,
        perdagClientGroupBaseSnapshot2,
        perdagLmid2,
        gatheredChunks2,
        client.refreshHashes
      ];
    });
    if (closed() || !perdagWriteResult) {
      return {
        type: "aborted"
      };
    }
    await sleep(DELAY_MS);
    if (closed()) {
      return {
        type: "aborted"
      };
    }
    const [perdagClientGroupHeadHash, perdagClientGroupBaseSnapshot, perdagLmid, gatheredChunks, refreshHashesForRevert] = perdagWriteResult;
    return withWrite(memdag, async (memdagWrite) => {
      const memdagHeadCommit = await commitFromHead(DEFAULT_HEAD_NAME, memdagWrite);
      const memdagBaseSnapshot2 = await baseSnapshotFromCommit(memdagHeadCommit, memdagWrite);
      assertSnapshotCommitDD31(memdagBaseSnapshot2);
      if (shouldAbortRefresh(memdagBaseSnapshot2, perdagClientGroupBaseSnapshot, perdagClientGroupHeadHash)) {
        return {
          type: "aborted",
          refreshHashesForRevert
        };
      }
      const newMemdagMutations = await localMutationsGreaterThan(memdagHeadCommit, {
        [clientID]: perdagLmid
      }, memdagWrite);
      const ps = [];
      for (const { chunk, size } of gatheredChunks.values()) {
        ps.push(memdagWrite.putChunk(chunk, size));
      }
      await Promise.all(ps);
      let newMemdagHeadHash = perdagClientGroupHeadHash;
      if (newMemdagMutations.length > 0) {
        const zeroData2 = await zero2?.getTxData?.(newMemdagHeadHash, {
          openLazyRead: memdagWrite
        });
        for (let i = newMemdagMutations.length - 1; i >= 0; i--) {
          newMemdagHeadHash = (await rebaseMutationAndPutCommit(newMemdagMutations[i], memdagWrite, newMemdagHeadHash, mutators, lc, newMemdagMutations[i].meta.clientID, formatVersion, zeroData2)).chunk.hash;
        }
      }
      const newMemdagHeadCommit = await commitFromHash(newMemdagHeadHash, memdagWrite);
      const diffs = await diffCommits(memdagHeadCommit, newMemdagHeadCommit, memdagWrite, diffConfig, formatVersion);
      await memdagWrite.setHead(DEFAULT_HEAD_NAME, newMemdagHeadHash);
      return {
        type: "complete",
        diffs,
        oldHead: memdagHeadCommit.chunk.hash,
        newHead: newMemdagHeadHash,
        newPerdagClientHeadHash: perdagClientGroupHeadHash
      };
    });
  });
  if (closed()) {
    return;
  }
  const setRefreshHashes = (refreshHashes) => withWrite(perdag, async (perdagWrite) => {
    const client = await mustGetClient(clientID, perdagWrite);
    const newClient = {
      ...client,
      refreshHashes
    };
    await setClient(clientID, newClient, perdagWrite);
  });
  if (result.type === "aborted") {
    if (result.refreshHashesForRevert) {
      await setRefreshHashes(result.refreshHashesForRevert);
    }
    return void 0;
  }
  zero2?.advance(result.oldHead, result.newHead, result.diffs.get("") ?? []);
  await setRefreshHashes([
    result.newPerdagClientHeadHash
  ]);
  return {
    oldHead: result.oldHead,
    newHead: result.newHead,
    diffs: result.diffs
  };
}
function shouldAbortRefresh(memdagBaseSnapshot, perdagClientGroupBaseSnapshot, perdagClientGroupHeadHash) {
  const baseSnapshotCookieCompareResult = compareCookiesForSnapshots(memdagBaseSnapshot, perdagClientGroupBaseSnapshot);
  return baseSnapshotCookieCompareResult > 0 || baseSnapshotCookieCompareResult === 0 && perdagClientGroupHeadHash === perdagClientGroupBaseSnapshot.chunk.hash;
}
function requestIdle(timeout) {
  return new Promise((resolve) => {
    if (typeof requestIdleCallback === "function") {
      requestIdleCallback(() => resolve(), {
        timeout
      });
    } else {
      setTimeout(() => resolve(), timeout);
    }
  });
}
var ProcessScheduler = (_process = /* @__PURE__ */ new WeakMap(), _idleTimeoutMs = /* @__PURE__ */ new WeakMap(), _throttleMs = /* @__PURE__ */ new WeakMap(), _abortSignal1 = /* @__PURE__ */ new WeakMap(), _requestIdle = /* @__PURE__ */ new WeakMap(), _scheduledResolver = /* @__PURE__ */ new WeakMap(), _runResolver = /* @__PURE__ */ new WeakMap(), _runPromise = /* @__PURE__ */ new WeakMap(), _throttlePromise = /* @__PURE__ */ new WeakMap(), _scheduleInternal = /* @__PURE__ */ new WeakSet(), _class10 = class {
  schedule() {
    if (_class_private_field_get$2(this, _abortSignal1).aborted) {
      return Promise.reject(new AbortError("Aborted"));
    }
    if (_class_private_field_get$2(this, _scheduledResolver)) {
      return _class_private_field_get$2(this, _scheduledResolver).promise;
    }
    _class_private_field_set$2(this, _scheduledResolver, resolver());
    void _class_private_method_get(this, _scheduleInternal, scheduleInternal).call(this);
    return _class_private_field_get$2(this, _scheduledResolver).promise;
  }
  /**
  * Supports scheduling a `process` to be run with certain constraints.
  *  - Process runs are never concurrent.
  *  - Multiple calls to schedule will be fulfilled by a single process
  *    run started after the call to schedule.  A call is never fulfilled by an
  *    already running process run.  This can be thought of as debouncing.
  *  - Process runs are throttled so that the process runs at most once every
  *    `throttleMs`.
  *  - Process runs try to run during an idle period, but will delay at most
  *    `idleTimeoutMs`.
  *  - Scheduled runs which have not completed when `abortSignal` is aborted
  *    will reject with an `AbortError`.
  */
  constructor(process2, idleTimeoutMs, throttleMs, abortSignal, requestIdle2 = requestIdle) {
    _class_private_method_init(this, _scheduleInternal);
    _class_private_field_init$2(this, _process, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _idleTimeoutMs, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _throttleMs, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _abortSignal1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _requestIdle, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _scheduledResolver, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _runResolver, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _runPromise, {
      writable: true,
      value: Promise.resolve()
    });
    _class_private_field_init$2(this, _throttlePromise, {
      writable: true,
      value: Promise.resolve()
    });
    _class_private_field_set$2(this, _process, process2);
    _class_private_field_set$2(this, _idleTimeoutMs, idleTimeoutMs);
    _class_private_field_set$2(this, _throttleMs, throttleMs);
    _class_private_field_set$2(this, _abortSignal1, abortSignal);
    _class_private_field_set$2(this, _requestIdle, requestIdle2);
    _class_private_field_get$2(this, _abortSignal1).addEventListener("abort", () => {
      const abortError = new AbortError("Aborted");
      _class_private_field_get$2(this, _runResolver)?.reject(abortError);
      _class_private_field_get$2(this, _scheduledResolver)?.reject(abortError);
      _class_private_field_set$2(this, _runResolver, void 0);
      _class_private_field_set$2(this, _scheduledResolver, void 0);
    }, {
      once: true
    });
  }
}, _class10);
async function throttle(timeMs, abortSignal) {
  try {
    await sleep(timeMs, abortSignal);
  } catch (e) {
    assert(e instanceof AbortError);
  }
}
function setIntervalWithSignal(fn, ms, signal) {
  if (!signal.aborted) {
    const interval = setInterval(fn, ms);
    signal.addEventListener("abort", () => {
      clearInterval(interval);
    });
  }
}
var InitialRun = 0;
var Regular = 1;
var emptySet = /* @__PURE__ */ new Set();
var unitializedLastValue = Symbol();
var SubscriptionImpl = (_body = /* @__PURE__ */ new WeakMap(), _onData$1 = /* @__PURE__ */ new WeakMap(), _lastValue = /* @__PURE__ */ new WeakMap(), _keys1 = /* @__PURE__ */ new WeakMap(), _scans1 = /* @__PURE__ */ new WeakMap(), _isEqual = /* @__PURE__ */ new WeakMap(), class {
  hasIndexSubscription(indexName) {
    for (const scan2 of _class_private_field_get$2(this, _scans1)) {
      if (scan2.options.indexName === indexName) {
        return true;
      }
    }
    return false;
  }
  invoke(tx, _kind, _diffs) {
    return _class_private_field_get$2(this, _body).call(this, tx);
  }
  matches(diffs) {
    for (const [indexName, diff3] of diffs) {
      if (diffMatchesSubscription(_class_private_field_get$2(this, _keys1), _class_private_field_get$2(this, _scans1), indexName, diff3)) {
        return true;
      }
    }
    return false;
  }
  updateDeps(keys, scans) {
    _class_private_field_set$2(this, _keys1, keys);
    _class_private_field_set$2(this, _scans1, scans);
  }
  onData(result) {
    if (_class_private_field_get$2(this, _lastValue) === unitializedLastValue || !_class_private_field_get$2(this, _isEqual).call(this, _class_private_field_get$2(this, _lastValue), result)) {
      _class_private_field_set$2(this, _lastValue, result);
      _class_private_field_get$2(this, _onData$1).call(this, result);
    }
  }
  constructor(body, onData, onError, onDone, isEqual = deepEqual) {
    _class_private_field_init$2(this, _body, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _onData$1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _lastValue, {
      writable: true,
      value: unitializedLastValue
    });
    _class_private_field_init$2(this, _keys1, {
      writable: true,
      value: emptySet
    });
    _class_private_field_init$2(this, _scans1, {
      writable: true,
      value: []
    });
    _define_property$1(this, "onError", void 0);
    _define_property$1(this, "onDone", void 0);
    _class_private_field_init$2(this, _isEqual, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _body, body);
    _class_private_field_set$2(this, _onData$1, onData);
    this.onError = onError;
    this.onDone = onDone;
    _class_private_field_set$2(this, _isEqual, isEqual);
  }
});
var WatchSubscription = (_callback = /* @__PURE__ */ new WeakMap(), _prefix = /* @__PURE__ */ new WeakMap(), _indexName = /* @__PURE__ */ new WeakMap(), _initialValuesInFirstDiff = /* @__PURE__ */ new WeakMap(), class {
  hasIndexSubscription(indexName) {
    return _class_private_field_get$2(this, _indexName) === indexName;
  }
  onData(result) {
    if (result !== void 0) {
      _class_private_field_get$2(this, _callback).call(this, result);
    }
  }
  invoke(tx, kind, diffs) {
    const invoke = async (indexName, prefix, compareKey, convertInternalDiff) => {
      let diff3;
      if (kind === InitialRun) {
        if (!_class_private_field_get$2(this, _initialValuesInFirstDiff)) {
          return void 0;
        }
        assert(diffs === void 0);
        const newDiff2 = [];
        for await (const entry of tx.scan({
          prefix,
          indexName
        }).entries()) {
          newDiff2.push({
            op: "add",
            key: entry[0],
            newValue: entry[1]
          });
        }
        diff3 = newDiff2;
      } else {
        assert(diffs);
        const maybeDiff = diffs.get(indexName ?? "") ?? [];
        diff3 = convertInternalDiff(maybeDiff);
      }
      const newDiff = [];
      const { length } = diff3;
      for (let i = diffBinarySearch(diff3, prefix, compareKey); i < length; i++) {
        if (compareKey(diff3[i]).startsWith(prefix)) {
          newDiff.push(diff3[i]);
        } else {
          break;
        }
      }
      return kind === InitialRun || newDiff.length > 0 ? newDiff : void 0;
    };
    if (_class_private_field_get$2(this, _indexName)) {
      return invoke(_class_private_field_get$2(this, _indexName), _class_private_field_get$2(this, _prefix), (diff3) => diff3.key[0], (internalDiff) => convertDiffValues(internalDiff, decodeIndexKey));
    }
    return invoke(void 0, _class_private_field_get$2(this, _prefix), (diff3) => diff3.key, (internalDiff) => convertDiffValues(internalDiff, (k) => k));
  }
  matches(diffs) {
    const diff3 = diffs.get(_class_private_field_get$2(this, _indexName) ?? "");
    if (diff3 === void 0) {
      return false;
    }
    return watcherMatchesDiff(diff3, _class_private_field_get$2(this, _prefix), _class_private_field_get$2(this, _indexName));
  }
  updateDeps(_keys2, _scans2) {
  }
  constructor(callback, options) {
    _class_private_field_init$2(this, _callback, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _prefix, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _indexName, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _initialValuesInFirstDiff, {
      writable: true,
      value: void 0
    });
    _define_property$1(this, "onError", void 0);
    _define_property$1(this, "onDone", void 0);
    _class_private_field_set$2(this, _callback, callback);
    _class_private_field_set$2(this, _prefix, options?.prefix ?? "");
    _class_private_field_set$2(this, _indexName, options?.indexName);
    _class_private_field_set$2(this, _initialValuesInFirstDiff, options?.initialValuesInFirstDiff ?? false);
  }
});
function convertDiffValues(diff3, convertKey) {
  return diff3.map((op) => {
    const key = convertKey(op.key);
    switch (op.op) {
      case "add":
        return {
          op: "add",
          key,
          newValue: op.newValue
        };
      case "change":
        return {
          op: "change",
          key,
          oldValue: op.oldValue,
          newValue: op.newValue
        };
      case "del":
        return {
          op: "del",
          key,
          oldValue: op.oldValue
        };
    }
  });
}
var SubscriptionsManagerImpl = (_subscriptions = /* @__PURE__ */ new WeakMap(), _pendingSubscriptions = /* @__PURE__ */ new WeakMap(), _queryInternal = /* @__PURE__ */ new WeakMap(), _lc2 = /* @__PURE__ */ new WeakMap(), _signal = /* @__PURE__ */ new WeakMap(), _fireSubscriptions = /* @__PURE__ */ new WeakSet(), _scheduleInitialSubscriptionRun = /* @__PURE__ */ new WeakSet(), _class11 = class {
  add(subscription) {
    _class_private_field_get$2(this, _subscriptions).add(subscription);
    void _class_private_method_get(this, _scheduleInitialSubscriptionRun, scheduleInitialSubscriptionRun).call(this, subscription);
    return () => _class_private_field_get$2(this, _subscriptions).delete(subscription);
  }
  clear() {
    for (const subscription of _class_private_field_get$2(this, _subscriptions)) {
      subscription.onDone?.();
    }
    _class_private_field_get$2(this, _subscriptions).clear();
  }
  fire(diffs) {
    const subscriptions = subscriptionsForDiffs(_class_private_field_get$2(this, _subscriptions), diffs);
    return _class_private_method_get(this, _fireSubscriptions, fireSubscriptions).call(this, subscriptions, Regular, diffs);
  }
  // Public method so that ZQL can wrap it in a transaction.
  callCallbacks(subs, results) {
    for (let i = 0; i < subs.length; i++) {
      const s = subs[i];
      const result = results[i];
      if (result.status === "fulfilled") {
        s.onData(result.value);
      } else {
        if (s.onError) {
          s.onError(result.reason);
        } else {
          _class_private_field_get$2(this, _lc2).error?.("Error in subscription body:", result.reason);
        }
      }
    }
  }
  shouldComputeDiffs() {
    return _class_private_field_get$2(this, _subscriptions).size > 0;
  }
  shouldComputeDiffsForIndex(indexName) {
    for (const s of _class_private_field_get$2(this, _subscriptions)) {
      if (s.hasIndexSubscription(indexName)) {
        return true;
      }
    }
    return false;
  }
  constructor(queryInternal, lc, signal) {
    _class_private_method_init(this, _fireSubscriptions);
    _class_private_method_init(this, _scheduleInitialSubscriptionRun);
    _class_private_field_init$2(this, _subscriptions, {
      writable: true,
      value: /* @__PURE__ */ new Set()
    });
    _class_private_field_init$2(this, _pendingSubscriptions, {
      writable: true,
      value: /* @__PURE__ */ new Set()
    });
    _class_private_field_init$2(this, _queryInternal, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _lc2, {
      writable: true,
      value: void 0
    });
    _define_property$1(this, "hasPendingSubscriptionRuns", false);
    _class_private_field_init$2(this, _signal, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _queryInternal, queryInternal);
    _class_private_field_set$2(this, _lc2, lc);
    _class_private_field_set$2(this, _signal, signal);
  }
}, _class11);
function diffMatchesSubscription(keys, scans, indexName, diff3) {
  if (indexName === "") {
    for (const diffEntry of diff3) {
      if (keys.has(diffEntry.key)) {
        return true;
      }
    }
  }
  for (const scanInfo of scans) {
    if (scanInfoMatchesDiff(scanInfo, indexName, diff3)) {
      return true;
    }
  }
  return false;
}
function scanInfoMatchesDiff(scanInfo, changeIndexName, diff3) {
  for (const diffEntry of diff3) {
    if (scanInfoMatchesKey(scanInfo, changeIndexName, diffEntry.key)) {
      return true;
    }
  }
  return false;
}
function scanInfoMatchesKey(scanInfo, changeIndexName, changedKey) {
  const { indexName = "", limit, prefix, startKey, startExclusive, startSecondaryKey } = scanInfo.options;
  if (changeIndexName !== indexName) {
    return false;
  }
  if (!indexName) {
    if (limit !== void 0 && limit <= 0) {
      return false;
    }
    if (!prefix && !startKey) {
      return true;
    }
    if (prefix && (!changedKey.startsWith(prefix) || isKeyPastInclusiveLimit(scanInfo, changedKey))) {
      return false;
    }
    if (startKey && (startExclusive && lessThanEq(changedKey, startKey) || lessThan(changedKey, startKey) || isKeyPastInclusiveLimit(scanInfo, changedKey))) {
      return false;
    }
    return true;
  }
  if (!prefix && !startKey && !startSecondaryKey) {
    return true;
  }
  const [changedKeySecondary, changedKeyPrimary] = decodeIndexKey(changedKey);
  if (prefix) {
    if (!changedKeySecondary.startsWith(prefix)) {
      return false;
    }
  }
  if (startSecondaryKey && (startExclusive && lessThanEq(changedKeySecondary, startSecondaryKey) || lessThan(changedKeySecondary, startSecondaryKey))) {
    return false;
  }
  if (startKey && (startExclusive && lessThanEq(changedKeyPrimary, startKey) || lessThan(changedKeyPrimary, startKey))) {
    return false;
  }
  return true;
}
function isKeyPastInclusiveLimit(scanInfo, changedKey) {
  const { inclusiveLimitKey } = scanInfo;
  return scanInfo.options.limit !== void 0 && inclusiveLimitKey !== void 0 && greaterThan(changedKey, inclusiveLimitKey);
}
function* subscriptionsForDiffs(subscriptions, diffs) {
  for (const subscription of subscriptions) {
    if (subscription.matches(diffs)) {
      yield subscription;
    }
  }
}
function watcherMatchesDiff(diff3, prefix, indexName) {
  if (prefix === "") {
    return true;
  }
  const compareKey = indexName ? (diffOp) => decodeIndexKey(diffOp.key)[0] : (diffOp) => diffOp.key;
  const i = diffBinarySearch(diff3, prefix, compareKey);
  return i < diff3.length && compareKey(diff3[i]).startsWith(prefix);
}
function diffBinarySearch(diff3, prefix, compareKey) {
  return binarySearch(diff3.length, (i) => compareUTF8(prefix, compareKey(diff3[i])));
}
var sessionID = "";
function getSessionID() {
  if (sessionID === "") {
    const buf = new Uint8Array(4);
    getNonCryptoRandomValues(buf);
    sessionID = Array.from(buf, (x) => x.toString(16)).join("");
  }
  return sessionID;
}
var REQUEST_COUNTERS = /* @__PURE__ */ new Map();
function newRequestID(clientID) {
  const counter = REQUEST_COUNTERS.get(clientID) ?? 0;
  REQUEST_COUNTERS.set(clientID, counter + 1);
  return `${clientID}-${getSessionID()}-${counter}`;
}
var version = "15.2.1";
var MAX_REAUTH_TRIES = 8;
var PERSIST_IDLE_TIMEOUT_MS = 1e3;
var REFRESH_IDLE_TIMEOUT_MS = 1e3;
var PERSIST_THROTTLE_MS = 500;
var REFRESH_THROTTLE_MS = 500;
var LAZY_STORE_SOURCE_CHUNK_CACHE_SIZE_LIMIT = 100 * 2 ** 20;
var RECOVER_MUTATIONS_INTERVAL_MS = 5 * 60 * 1e3;
var noop2 = () => {
};
var updateNeededReasonNewClientGroup = {
  type: "NewClientGroup"
};
var ReplicacheImpl = (_auth = /* @__PURE__ */ new WeakMap(), _subscriptions1 = /* @__PURE__ */ new WeakMap(), _mutationRecovery = /* @__PURE__ */ new WeakMap(), _kvStoreProvider = /* @__PURE__ */ new WeakMap(), _idbDatabase = /* @__PURE__ */ new WeakMap(), _closed7 = /* @__PURE__ */ new WeakMap(), _online = /* @__PURE__ */ new WeakMap(), _clientID = /* @__PURE__ */ new WeakMap(), _ready = /* @__PURE__ */ new WeakMap(), _profileIDPromise = /* @__PURE__ */ new WeakMap(), _clientGroupIDPromise = /* @__PURE__ */ new WeakMap(), _mutatorRegistry = /* @__PURE__ */ new WeakMap(), _pushCounter = /* @__PURE__ */ new WeakMap(), _pullCounter = /* @__PURE__ */ new WeakMap(), _pullConnectionLoop = /* @__PURE__ */ new WeakMap(), _pushConnectionLoop = /* @__PURE__ */ new WeakMap(), _requestOptions = /* @__PURE__ */ new WeakMap(), _idbDatabases = /* @__PURE__ */ new WeakMap(), _lc3 = /* @__PURE__ */ new WeakMap(), _zero$1 = /* @__PURE__ */ new WeakMap(), _closeAbortController = /* @__PURE__ */ new WeakMap(), _persistLock = /* @__PURE__ */ new WeakMap(), _enableScheduledPersist = /* @__PURE__ */ new WeakMap(), _enableScheduledRefresh = /* @__PURE__ */ new WeakMap(), _enablePullAndPushInOpen = /* @__PURE__ */ new WeakMap(), _persistScheduler = /* @__PURE__ */ new WeakMap(), _onPersist = /* @__PURE__ */ new WeakMap(), _refreshScheduler = /* @__PURE__ */ new WeakMap(), _open = /* @__PURE__ */ new WeakSet(), _onVisibilityChange1 = /* @__PURE__ */ new WeakMap(), _checkForClientStateNotFoundAndCallHandler = /* @__PURE__ */ new WeakSet(), _invokePull = /* @__PURE__ */ new WeakSet(), _isPullDisabled = /* @__PURE__ */ new WeakSet(), _wrapInOnlineCheck = /* @__PURE__ */ new WeakSet(), _wrapInReauthRetries = /* @__PURE__ */ new WeakSet(), _isPushDisabled = /* @__PURE__ */ new WeakSet(), _invokePush = /* @__PURE__ */ new WeakSet(), _handleVersionNotSupportedResponse = /* @__PURE__ */ new WeakSet(), _fireOnClientStateNotFound = /* @__PURE__ */ new WeakSet(), _clientStateNotFoundOnClient = /* @__PURE__ */ new WeakSet(), _clientStateNotFoundOnServer = /* @__PURE__ */ new WeakSet(), _fireOnUpdateNeeded = /* @__PURE__ */ new WeakSet(), _schedulePersist = /* @__PURE__ */ new WeakSet(), _handlePersist = /* @__PURE__ */ new WeakSet(), _scheduleRefresh = /* @__PURE__ */ new WeakSet(), _schedule = /* @__PURE__ */ new WeakSet(), _changeSyncCounters = /* @__PURE__ */ new WeakSet(), _queryInternal1 = /* @__PURE__ */ new WeakMap(), _register = /* @__PURE__ */ new WeakSet(), _registerMutators = /* @__PURE__ */ new WeakSet(), _mutate = /* @__PURE__ */ new WeakSet(), _convertToClientStateNotFoundError = /* @__PURE__ */ new WeakSet(), _class12 = class {
  /**
  * This is the name Replicache uses for the IndexedDB database where data is
  * stored.
  */
  get idbName() {
    return makeIDBName(this.name, this.schemaVersion);
  }
  set auth(auth) {
    if (_class_private_field_get$2(this, _zero$1)) {
      _class_private_field_get$2(this, _zero$1).auth = auth;
    }
    _class_private_field_set$2(this, _auth, auth);
  }
  get auth() {
    return _class_private_field_get$2(this, _auth);
  }
  /**
  * The options used to control the {@link pull} and push request behavior. This
  * object is live so changes to it will affect the next pull or push call.
  */
  get requestOptions() {
    return _class_private_field_get$2(this, _requestOptions);
  }
  /**
  * The browser profile ID for this browser profile. Every instance of Replicache
  * browser-profile-wide shares the same profile ID.
  */
  get profileID() {
    return _class_private_field_get$2(this, _profileIDPromise);
  }
  /**
  * The client ID for this instance of Replicache. Each instance of Replicache
  * gets a unique client ID.
  */
  get clientID() {
    return _class_private_field_get$2(this, _clientID);
  }
  /**
  * The client group ID for this instance of Replicache. Instances of
  * Replicache will have the same client group ID if and only if they have
  * the same name, mutators, indexes, schema version, format version, and
  * browser profile.
  */
  get clientGroupID() {
    return _class_private_field_get$2(this, _clientGroupIDPromise);
  }
  /**
  * A rough heuristic for whether the client is currently online. Note that
  * there is no way to know for certain whether a client is online - the next
  * request can always fail. This property returns true if the last sync attempt succeeded,
  * and false otherwise.
  */
  get online() {
    return _class_private_field_get$2(this, _online);
  }
  /**
  * Whether the Replicache database has been closed. Once Replicache has been
  * closed it no longer syncs and you can no longer read or write data out of
  * it. After it has been closed it is pretty much useless and should not be
  * used any more.
  */
  get closed() {
    return _class_private_field_get$2(this, _closed7);
  }
  /**
  * Closes this Replicache instance.
  *
  * When closed all subscriptions end and no more read or writes are allowed.
  */
  async close() {
    _class_private_field_set$2(this, _closed7, true);
    const { promise, resolve } = resolver();
    closingInstances.set(this.name, promise);
    _class_private_field_get$2(this, _closeAbortController).abort();
    getBrowserGlobal("document")?.removeEventListener("visibilitychange", _class_private_field_get$2(this, _onVisibilityChange1));
    await _class_private_field_get$2(this, _ready);
    const closingPromises = [
      this.memdag.close(),
      this.perdag.close(),
      _class_private_field_get$2(this, _idbDatabases).close()
    ];
    _class_private_field_get$2(this, _pullConnectionLoop).close();
    _class_private_field_get$2(this, _pushConnectionLoop).close();
    _class_private_field_get$2(this, _subscriptions1).clear();
    await Promise.all(closingPromises);
    closingInstances.delete(this.name);
    resolve();
  }
  async maybeEndPull(syncHead, requestID) {
    for (; ; ) {
      if (_class_private_field_get$2(this, _closed7)) {
        return;
      }
      await _class_private_field_get$2(this, _ready);
      const { clientID } = this;
      const lc = _class_private_field_get$2(this, _lc3).withContext("maybeEndPull").withContext("requestID", requestID);
      const { replayMutations, diffs, oldMainHead, mainHead } = await maybeEndPull(this.memdag, lc, syncHead, clientID, _class_private_field_get$2(this, _subscriptions1), Latest);
      if (!replayMutations || replayMutations.length === 0) {
        _class_private_field_get$2(this, _zero$1)?.advance(oldMainHead, mainHead, diffs.get("") ?? []);
        await _class_private_field_get$2(this, _subscriptions1).fire(diffs);
        void _class_private_method_get(this, _schedulePersist, schedulePersist).call(this);
        return;
      }
      const zeroData2 = await _class_private_field_get$2(this, _zero$1)?.getTxData?.(syncHead);
      for (const mutation of replayMutations) {
        if (_class_private_field_get$2(this, _subscriptions1).hasPendingSubscriptionRuns) {
          await Promise.resolve();
        }
        const { meta } = mutation;
        syncHead = await withWriteNoImplicitCommit(this.memdag, (dagWrite) => rebaseMutationAndCommit(mutation, dagWrite, syncHead, SYNC_HEAD_NAME, _class_private_field_get$2(this, _mutatorRegistry), lc, isLocalMetaDD31(meta) ? meta.clientID : clientID, Latest, zeroData2));
      }
    }
  }
  /**
  * Push pushes pending changes to the {@link pushURL}.
  *
  * You do not usually need to manually call push. If {@link pushDelay} is
  * non-zero (which it is by default) pushes happen automatically shortly after
  * mutations.
  *
  * If the server endpoint fails push will be continuously retried with an
  * exponential backoff.
  *
  * @param [now=false] If true, push will happen immediately and ignore
  *   {@link pushDelay}, {@link RequestOptions.minDelayMs} as well as the
  *   exponential backoff in case of errors.
  * @returns A promise that resolves when the next push completes. In case of
  * errors the first error will reject the returned promise. Subsequent errors
  * will not be reflected in the promise.
  */
  push({ now = false } = {}) {
    return throwIfError(_class_private_field_get$2(this, _pushConnectionLoop).send(now));
  }
  /**
  * Pull pulls changes from the {@link pullURL}. If there are any changes local
  * changes will get replayed on top of the new server state.
  *
  * If the server endpoint fails pull will be continuously retried with an
  * exponential backoff.
  *
  * @param [now=false] If true, pull will happen immediately and ignore
  *   {@link RequestOptions.minDelayMs} as well as the exponential backoff in
  *   case of errors.
  * @returns A promise that resolves when the next pull completes. In case of
  * errors the first error will reject the returned promise. Subsequent errors
  * will not be reflected in the promise.
  */
  pull({ now = false } = {}) {
    return throwIfError(_class_private_field_get$2(this, _pullConnectionLoop).send(now));
  }
  /**
  * Applies an update from the server to Replicache.
  * Throws an error if cookie does not match. In that case the server thinks
  * this client has a different cookie than it does; the caller should disconnect
  * from the server and re-register, which transmits the cookie the client actually
  * has.
  *
  * @experimental This method is under development and its semantics will change.
  */
  async poke(poke) {
    await _class_private_field_get$2(this, _ready);
    const { clientID } = this;
    const requestID = newRequestID(clientID);
    const lc = _class_private_field_get$2(this, _lc3).withContext("handlePullResponse").withContext("requestID", requestID);
    const { pullResponse } = poke;
    if (isVersionNotSupportedResponse(pullResponse)) {
      _class_private_method_get(this, _handleVersionNotSupportedResponse, handleVersionNotSupportedResponse).call(this, pullResponse);
      return;
    }
    if (isClientStateNotFoundResponse(pullResponse)) {
      await _class_private_method_get(this, _clientStateNotFoundOnServer, clientStateNotFoundOnServer).call(this);
      return;
    }
    const result = await handlePullResponseV1(lc, this.memdag, deepFreeze(poke.baseCookie), pullResponse, clientID, Latest);
    switch (result.type) {
      case Applied:
        await this.maybeEndPull(result.syncHead, requestID);
        break;
      case CookieMismatch:
        throw new Error("unexpected base cookie for poke: " + JSON.stringify(poke));
    }
  }
  async beginPull() {
    await _class_private_field_get$2(this, _ready);
    const profileID = await this.profileID;
    const { clientID } = this;
    const clientGroupID = await _class_private_field_get$2(this, _clientGroupIDPromise);
    const { result: { beginPullResponse, requestID } } = await _class_private_method_get(this, _wrapInReauthRetries, wrapInReauthRetries).call(this, async (requestID2, requestLc) => {
      const beginPullResponse2 = await beginPullV1(profileID, clientID, clientGroupID, this.schemaVersion, this.puller, requestID2, this.memdag, Latest, requestLc);
      return {
        result: {
          beginPullResponse: beginPullResponse2,
          requestID: requestID2
        },
        httpRequestInfo: beginPullResponse2.httpRequestInfo
      };
    }, "pull", _class_private_field_get$2(this, _lc3), () => _class_private_method_get(this, _changeSyncCounters, changeSyncCounters).call(this, 0, -1), () => _class_private_method_get(this, _changeSyncCounters, changeSyncCounters).call(this, 0, 1));
    const { pullResponse } = beginPullResponse;
    if (isVersionNotSupportedResponse(pullResponse)) {
      _class_private_method_get(this, _handleVersionNotSupportedResponse, handleVersionNotSupportedResponse).call(this, pullResponse);
    } else if (isClientStateNotFoundResponse(beginPullResponse.pullResponse)) {
      await _class_private_method_get(this, _clientStateNotFoundOnServer, clientStateNotFoundOnServer).call(this);
    }
    const { syncHead, httpRequestInfo } = beginPullResponse;
    return {
      requestID,
      syncHead,
      ok: httpRequestInfo.httpStatusCode === 200
    };
  }
  persist() {
    return _class_private_field_get$2(this, _persistLock).withLock(async () => {
      const { clientID } = this;
      await _class_private_field_get$2(this, _ready);
      if (_class_private_field_get$2(this, _closed7)) {
        return;
      }
      try {
        await persistDD31(_class_private_field_get$2(this, _lc3), clientID, this.memdag, this.perdag, _class_private_field_get$2(this, _mutatorRegistry), () => _class_private_field_get$2(this, _closed7), Latest, _class_private_field_get$2(this, _zero$1)?.getTxData);
      } catch (e) {
        if (e instanceof ClientStateNotFoundError) {
          _class_private_method_get(this, _clientStateNotFoundOnClient, clientStateNotFoundOnClient).call(this, clientID);
        } else if (_class_private_field_get$2(this, _closed7)) {
          _class_private_field_get$2(this, _lc3).debug?.("Exception persisting during close", e);
        } else {
          throw e;
        }
      }
      const clientGroupID = await _class_private_field_get$2(this, _clientGroupIDPromise);
      assert(clientGroupID);
      _class_private_field_get$2(this, _onPersist).call(this, {
        clientID,
        clientGroupID
      });
    });
  }
  async refresh() {
    await _class_private_field_get$2(this, _ready);
    const { clientID } = this;
    if (_class_private_field_get$2(this, _closed7)) {
      return;
    }
    let refreshResult;
    try {
      refreshResult = await refresh(_class_private_field_get$2(this, _lc3), this.memdag, this.perdag, clientID, _class_private_field_get$2(this, _mutatorRegistry), _class_private_field_get$2(this, _subscriptions1), () => this.closed, Latest, _class_private_field_get$2(this, _zero$1));
    } catch (e) {
      if (e instanceof ClientStateNotFoundError) {
        _class_private_method_get(this, _clientStateNotFoundOnClient, clientStateNotFoundOnClient).call(this, clientID);
      } else if (_class_private_field_get$2(this, _closed7)) {
        _class_private_field_get$2(this, _lc3).debug?.("Exception refreshing during close", e);
      } else {
        throw e;
      }
    }
    if (refreshResult !== void 0) {
      await _class_private_field_get$2(this, _subscriptions1).fire(refreshResult.diffs);
    }
  }
  async disableClientGroup() {
    const clientGroupID = await _class_private_field_get$2(this, _clientGroupIDPromise);
    assert(clientGroupID);
    this.isClientGroupDisabled = true;
    await withWrite(this.perdag, (dagWrite) => disableClientGroup(clientGroupID, dagWrite));
  }
  /**
  * Subscribe to the result of a {@link query}. The `body` function is
  * evaluated once and its results are returned via `onData`.
  *
  * Thereafter, each time the the result of `body` changes, `onData` is fired
  * again with the new result.
  *
  * `subscribe()` goes to significant effort to avoid extraneous work
  * re-evaluating subscriptions:
  *
  * 1. subscribe tracks the keys that `body` accesses each time it runs. `body`
  *    is only re-evaluated when those keys change.
  * 2. subscribe only re-fires `onData` in the case that a result changes by
  *    way of the `isEqual` option which defaults to doing a deep JSON value
  *    equality check.
  *
  * Because of (1), `body` must be a pure function of the data in Replicache.
  * `body` must not access anything other than the `tx` parameter passed to it.
  *
  * Although subscribe is as efficient as it can be, it is somewhat constrained
  * by the goal of returning an arbitrary computation of the cache. For even
  * better performance (but worse dx), see {@link experimentalWatch}.
  *
  * If an error occurs in the `body` the `onError` function is called if
  * present. Otherwise, the error is logged at log level 'error'.
  *
  * To cancel the subscription, call the returned function.
  *
  * @param body The function to evaluate to get the value to pass into
  *    `onData`.
  * @param options Options is either a function or an object. If it is a
  *    function it is equivalent to passing it as the `onData` property of an
  *    object.
  */
  subscribe(body, options) {
    if (typeof options === "function") {
      options = {
        onData: options
      };
    }
    const { onData, onError, onDone, isEqual } = options;
    return _class_private_field_get$2(this, _subscriptions1).add(new SubscriptionImpl(body, onData, onError, onDone, isEqual));
  }
  experimentalWatch(callback, options) {
    return _class_private_field_get$2(this, _subscriptions1).add(new WatchSubscription(callback, options));
  }
  /**
  * Query is used for read transactions. It is recommended to use transactions
  * to ensure you get a consistent view across multiple calls to `get`, `has`
  * and `scan`.
  */
  query(body) {
    return _class_private_field_get$2(this, _queryInternal1).call(this, body);
  }
  get cookie() {
    return _class_private_field_get$2(this, _ready).then(() => withRead(this.memdag, async (dagRead) => {
      const mainHeadHash = await dagRead.getHead(DEFAULT_HEAD_NAME);
      if (!mainHeadHash) {
        throw new Error("Internal no main head found");
      }
      const baseSnapshot = await baseSnapshotFromHash(mainHeadHash, dagRead);
      const baseSnapshotMeta = baseSnapshot.meta;
      const cookie = baseSnapshotMeta.cookieJSON;
      assertCookie(cookie);
      return cookie;
    }));
  }
  recoverMutations() {
  }
  /**
  * List of pending mutations. The order of this is from oldest to newest.
  *
  * Gives a list of local mutations that have `mutationID` >
  * `syncHead.mutationID` that exists on the main client group.
  *
  * @experimental This method is experimental and may change in the future.
  */
  experimentalPendingMutations() {
    return withRead(this.memdag, pendingMutationsForAPI);
  }
  constructor(options, implOptions = {}) {
    _class_private_field_init$2(this, _idbDatabase, {
      get: get_idbDatabase,
      set: void 0
    });
    _class_private_method_init(this, _open);
    _class_private_method_init(this, _checkForClientStateNotFoundAndCallHandler);
    _class_private_method_init(this, _invokePull);
    _class_private_method_init(this, _isPullDisabled);
    _class_private_method_init(this, _wrapInOnlineCheck);
    _class_private_method_init(this, _wrapInReauthRetries);
    _class_private_method_init(this, _isPushDisabled);
    _class_private_method_init(this, _invokePush);
    _class_private_method_init(this, _handleVersionNotSupportedResponse);
    _class_private_method_init(this, _fireOnClientStateNotFound);
    _class_private_method_init(this, _clientStateNotFoundOnClient);
    _class_private_method_init(this, _clientStateNotFoundOnServer);
    _class_private_method_init(this, _fireOnUpdateNeeded);
    _class_private_method_init(this, _schedulePersist);
    _class_private_method_init(this, _handlePersist);
    _class_private_method_init(this, _scheduleRefresh);
    _class_private_method_init(this, _schedule);
    _class_private_method_init(this, _changeSyncCounters);
    _class_private_method_init(this, _register);
    _class_private_method_init(this, _registerMutators);
    _class_private_method_init(this, _mutate);
    _class_private_method_init(this, _convertToClientStateNotFoundError);
    _define_property$1(this, "pullURL", void 0);
    _define_property$1(this, "pushURL", void 0);
    _class_private_field_init$2(this, _auth, {
      writable: true,
      value: void 0
    });
    _define_property$1(this, "name", void 0);
    _class_private_field_init$2(this, _subscriptions1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _mutationRecovery, {
      writable: true,
      value: void 0
    });
    _define_property$1(this, "isClientGroupDisabled", false);
    _class_private_field_init$2(this, _kvStoreProvider, {
      writable: true,
      value: void 0
    });
    _define_property$1(this, "lastMutationID", 0);
    _define_property$1(this, "schemaVersion", void 0);
    _class_private_field_init$2(this, _closed7, {
      writable: true,
      value: false
    });
    _class_private_field_init$2(this, _online, {
      writable: true,
      value: true
    });
    _class_private_field_init$2(this, _clientID, {
      writable: true,
      value: makeClientID()
    });
    _class_private_field_init$2(this, _ready, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _profileIDPromise, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _clientGroupIDPromise, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _mutatorRegistry, {
      writable: true,
      value: {}
    });
    _define_property$1(this, "mutate", void 0);
    _class_private_field_init$2(this, _pushCounter, {
      writable: true,
      value: 0
    });
    _class_private_field_init$2(this, _pullCounter, {
      writable: true,
      value: 0
    });
    _class_private_field_init$2(this, _pullConnectionLoop, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _pushConnectionLoop, {
      writable: true,
      value: void 0
    });
    _define_property$1(this, "pullInterval", void 0);
    _define_property$1(this, "pushDelay", void 0);
    _class_private_field_init$2(this, _requestOptions, {
      writable: true,
      value: void 0
    });
    _define_property$1(this, "puller", void 0);
    _define_property$1(this, "pusher", void 0);
    _define_property$1(this, "memdag", void 0);
    _define_property$1(this, "perdag", void 0);
    _class_private_field_init$2(this, _idbDatabases, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _lc3, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _zero$1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _closeAbortController, {
      writable: true,
      value: new AbortController()
    });
    _class_private_field_init$2(this, _persistLock, {
      writable: true,
      value: new Lock()
    });
    _class_private_field_init$2(this, _enableScheduledPersist, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _enableScheduledRefresh, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _enablePullAndPushInOpen, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _persistScheduler, {
      writable: true,
      value: new ProcessScheduler(() => this.persist(), PERSIST_IDLE_TIMEOUT_MS, PERSIST_THROTTLE_MS, _class_private_field_get$2(this, _closeAbortController).signal)
    });
    _class_private_field_init$2(this, _onPersist, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _refreshScheduler, {
      writable: true,
      value: new ProcessScheduler(() => this.refresh(), REFRESH_IDLE_TIMEOUT_MS, REFRESH_THROTTLE_MS, _class_private_field_get$2(this, _closeAbortController).signal)
    });
    _define_property$1(this, "onSync", null);
    _define_property$1(this, "onClientStateNotFound", reload);
    _define_property$1(this, "onUpdateNeeded", reload);
    _define_property$1(this, "getAuth", null);
    _define_property$1(this, "onPushInvoked", () => void 0);
    _define_property$1(this, "onBeginPull", () => void 0);
    _define_property$1(this, "onRecoverMutations", (r) => r);
    _class_private_field_init$2(this, _onVisibilityChange1, {
      writable: true,
      value: async () => {
        if (_class_private_field_get$2(this, _closed7)) {
          return;
        }
        if (getBrowserGlobal("document")?.visibilityState !== "visible") {
          return;
        }
        await _class_private_method_get(this, _checkForClientStateNotFoundAndCallHandler, checkForClientStateNotFoundAndCallHandler).call(this);
      }
    });
    _define_property$1(this, "onOnlineChange", null);
    _class_private_field_init$2(this, _queryInternal1, {
      writable: true,
      value: async (body) => {
        await _class_private_field_get$2(this, _ready);
        const { clientID } = this;
        return withRead(this.memdag, async (dagRead) => {
          try {
            const dbRead = await readFromDefaultHead(dagRead, Latest);
            const tx = new ReadTransactionImpl(clientID, dbRead, _class_private_field_get$2(this, _lc3));
            return await body(tx);
          } catch (ex) {
            throw await _class_private_method_get(this, _convertToClientStateNotFoundError, convertToClientStateNotFoundError).call(this, ex);
          }
        });
      }
    });
    validateOptions(options);
    const { name, logLevel = "info", logSinks = [
      consoleLogSink
    ], pullURL = "", auth, pushDelay = 10, pushURL = "", schemaVersion = "", pullInterval = 6e4, mutators = {}, requestOptions = {}, puller: puller2, pusher: pusher2, indexes = {}, clientMaxAgeMs = CLIENT_MAX_INACTIVE_TIME } = options;
    const { enableMutationRecovery = true, enableScheduledPersist = true, enableScheduledRefresh = true, enablePullAndPushInOpen = true, enableClientGroupForking = true, onClientsDeleted = () => promiseVoid } = implOptions;
    _class_private_field_set$2(this, _zero$1, implOptions.zero);
    _class_private_field_set$2(this, _auth, auth ?? "");
    this.pullURL = pullURL;
    this.pushURL = pushURL;
    this.name = name;
    this.schemaVersion = schemaVersion;
    this.pullInterval = pullInterval;
    this.pushDelay = pushDelay;
    this.puller = puller2 ?? getDefaultPuller(this);
    this.pusher = pusher2 ?? getDefaultPusher(this);
    _class_private_field_set$2(this, _enableScheduledPersist, enableScheduledPersist);
    _class_private_field_set$2(this, _enableScheduledRefresh, enableScheduledRefresh);
    _class_private_field_set$2(this, _enablePullAndPushInOpen, enablePullAndPushInOpen);
    _class_private_field_set$2(this, _lc3, createLogContext(logLevel, logSinks, {
      name
    }));
    _class_private_field_get$2(this, _lc3).debug?.("Constructing Replicache", {
      name,
      "replicache version": version
    });
    _class_private_field_set$2(this, _subscriptions1, new SubscriptionsManagerImpl(_class_private_field_get$2(this, _queryInternal1), _class_private_field_get$2(this, _lc3), _class_private_field_get$2(this, _closeAbortController).signal));
    const kvStoreProvider = getKVStoreProvider(_class_private_field_get$2(this, _lc3), options.kvStore);
    _class_private_field_set$2(this, _kvStoreProvider, kvStoreProvider);
    const perKVStore = kvStoreProvider.create(this.idbName);
    _class_private_field_set$2(this, _idbDatabases, new IDBDatabasesStore(kvStoreProvider.create));
    this.perdag = new StoreImpl(perKVStore, newRandomHash, assertHash);
    this.memdag = new LazyStore(this.perdag, LAZY_STORE_SOURCE_CHUNK_CACHE_SIZE_LIMIT, newRandomHash, assertHash);
    const readyResolver = resolver();
    _class_private_field_set$2(this, _ready, readyResolver.promise);
    const { minDelayMs = MIN_DELAY_MS, maxDelayMs = MAX_DELAY_MS } = requestOptions;
    _class_private_field_set$2(this, _requestOptions, {
      maxDelayMs,
      minDelayMs
    });
    const visibilityWatcher = getDocumentVisibilityWatcher(getBrowserGlobal("document"), 0, _class_private_field_get$2(this, _closeAbortController).signal);
    _class_private_field_set$2(this, _pullConnectionLoop, new ConnectionLoop(_class_private_field_get$2(this, _lc3).withContext("PULL"), new PullDelegate(this, () => _class_private_method_get(this, _invokePull, invokePull).call(this)), visibilityWatcher));
    _class_private_field_set$2(this, _pushConnectionLoop, new ConnectionLoop(_class_private_field_get$2(this, _lc3).withContext("PUSH"), new PushDelegate(this, () => _class_private_method_get(this, _invokePush, invokePush).call(this))));
    this.mutate = _class_private_method_get(this, _registerMutators, registerMutators).call(this, mutators);
    const profileIDResolver = resolver();
    _class_private_field_set$2(this, _profileIDPromise, profileIDResolver.promise);
    const clientGroupIDResolver = resolver();
    _class_private_field_set$2(this, _clientGroupIDPromise, clientGroupIDResolver.promise);
    _class_private_field_set$2(this, _onPersist, initOnPersistChannel(this.name, _class_private_field_get$2(this, _closeAbortController).signal, (persistInfo) => {
      void _class_private_method_get(this, _handlePersist, handlePersist).call(this, persistInfo);
    }));
    void _class_private_method_get(this, _open, open).call(this, indexes, enableClientGroupForking, enableMutationRecovery, clientMaxAgeMs, profileIDResolver.resolve, clientGroupIDResolver.resolve, readyResolver.resolve, onClientsDeleted);
  }
}, _class12);
var closingInstances = /* @__PURE__ */ new Map();
async function throwIfError(p) {
  const res = await p;
  if (res) {
    throw res.error;
  }
}
function reload() {
  if (typeof location !== "undefined") {
    location.reload();
  }
}
function validateOptions(options) {
  const { name, clientMaxAgeMs } = options;
  if (typeof name !== "string" || !name) {
    throw new TypeError("name is required and must be non-empty");
  }
  if (clientMaxAgeMs !== void 0) {
    const min = Math.max(GC_INTERVAL, HEARTBEAT_INTERVAL);
    if (typeof clientMaxAgeMs !== "number" || clientMaxAgeMs <= min) {
      throw new TypeError(`clientAgeMaxMs must be a number larger than ${min}ms`);
    }
  }
}
function emptyFunction() {
}
var emptyObject = Object.freeze({});
var emptyArray$1 = Object.freeze([]);
function identity(x) {
  return x;
}
var Subscribable = class {
  constructor() {
    _define_property$1(this, "_listeners", /* @__PURE__ */ new Set());
    _define_property$1(this, "subscribe", (listener) => {
      this._listeners.add(listener);
      return () => {
        this._listeners.delete(listener);
      };
    });
    _define_property$1(this, "notify", (update) => {
      this._listeners.forEach((listener) => listener(update));
    });
    _define_property$1(this, "hasListeners", () => this._listeners.size > 0);
    _define_property$1(this, "cleanup", () => {
      this._listeners.clear();
    });
  }
};
var deleteClientsBodySchema = valita_exports.union(readonlyObject({
  clientIDs: readonlyArray(valita_exports.string()).optional(),
  clientGroupIDs: readonlyArray(valita_exports.string()).optional()
}));
var deleteClientsMessageSchema = valita_exports.tuple([
  valita_exports.literal("deleteClients"),
  deleteClientsBodySchema
]);
var putOpSchema = valita_exports.object({
  op: valita_exports.literal("put"),
  hash: valita_exports.string(),
  ttl: valita_exports.number().optional()
});
var upPutOpSchema = putOpSchema.extend({
  // All fields are optional in this transitional period.
  // - ast is filled in for client queries
  // - name and args are filled in for custom queries
  ast: astSchema.optional(),
  name: valita_exports.string().optional(),
  args: readonly(valita_exports.array(jsonSchema)).optional()
});
var delOpSchema = valita_exports.object({
  op: valita_exports.literal("del"),
  hash: valita_exports.string()
});
var clearOpSchema = valita_exports.object({
  op: valita_exports.literal("clear")
});
var patchOpSchema = valita_exports.union(putOpSchema, delOpSchema, clearOpSchema);
var upPatchOpSchema = valita_exports.union(upPutOpSchema, delOpSchema, clearOpSchema);
var queriesPatchSchema = valita_exports.array(patchOpSchema);
var upQueriesPatchSchema = valita_exports.array(upPatchOpSchema);
var connectedBodySchema = valita_exports.object({
  wsid: valita_exports.string(),
  timestamp: valita_exports.number().optional()
});
var connectedMessageSchema = valita_exports.tuple([
  valita_exports.literal("connected"),
  connectedBodySchema
]);
var initConnectionBodySchema = valita_exports.object({
  desiredQueriesPatch: upQueriesPatchSchema,
  clientSchema: clientSchemaSchema.optional(),
  deleted: deleteClientsBodySchema.optional(),
  // parameters to configure the mutate endpoint
  userPushURL: valita_exports.string().optional(),
  // parameters to configure the query endpoint
  userQueryURL: valita_exports.string().optional(),
  /**
  * `activeClients` is an optional array of client IDs that are currently active
  * in the client group. This is used to inform the server about the clients
  * that are currently active (aka running, aka alive), so it can inactive
  * queries from inactive clients.
  */
  activeClients: valita_exports.array(valita_exports.string()).optional()
});
valita_exports.tuple([
  valita_exports.literal("initConnection"),
  initConnectionBodySchema
]);
function encodeSecProtocols(initConnectionMessage, authToken) {
  const protocols = {
    initConnectionMessage,
    authToken
  };
  const bytes = new TextEncoder().encode(JSON.stringify(protocols));
  const s = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
  return encodeURIComponent(btoa(s));
}
var basicErrorKindSchema = literalUnion(error_kind_enum_exports.AuthInvalidated, error_kind_enum_exports.ClientNotFound, error_kind_enum_exports.InvalidConnectionRequest, error_kind_enum_exports.InvalidConnectionRequestBaseCookie, error_kind_enum_exports.InvalidConnectionRequestLastMutationID, error_kind_enum_exports.InvalidConnectionRequestClientDeleted, error_kind_enum_exports.InvalidMessage, error_kind_enum_exports.InvalidPush, error_kind_enum_exports.MutationRateLimited, error_kind_enum_exports.MutationFailed, error_kind_enum_exports.Unauthorized, error_kind_enum_exports.VersionNotSupported, error_kind_enum_exports.SchemaVersionNotSupported, error_kind_enum_exports.Internal);
var basicErrorBodySchema = valita_exports.object({
  kind: basicErrorKindSchema,
  message: valita_exports.string()
});
var backoffErrorKindSchema = literalUnion(error_kind_enum_exports.Rebalance, error_kind_enum_exports.Rehome, error_kind_enum_exports.ServerOverloaded);
var backoffBodySchema = valita_exports.object({
  kind: backoffErrorKindSchema,
  message: valita_exports.string(),
  minBackoffMs: valita_exports.number().optional(),
  maxBackoffMs: valita_exports.number().optional(),
  // Query parameters to send in the next reconnect. In the event of
  // a conflict, these will be overridden by the parameters used by
  // the client; it is the responsibility of the server to avoid
  // parameter name conflicts.
  //
  // The parameters will only be added to the immediately following
  // reconnect, and not after that.
  reconnectParams: valita_exports.record(valita_exports.string()).optional()
});
var errorKindSchema = valita_exports.union(basicErrorKindSchema, backoffErrorKindSchema);
var errorBodySchema = valita_exports.union(basicErrorBodySchema, backoffBodySchema);
var errorMessageSchema = valita_exports.tuple([
  valita_exports.literal("error"),
  errorBodySchema
]);
var CRUD = "crud";
var Custom = "custom";
var CRUD_MUTATION_NAME = "_zero_crud";
var insertOpSchema = valita_exports.object({
  op: valita_exports.literal("insert"),
  tableName: valita_exports.string(),
  primaryKey: primaryKeySchema,
  value: rowSchema
});
var upsertOpSchema = valita_exports.object({
  op: valita_exports.literal("upsert"),
  tableName: valita_exports.string(),
  primaryKey: primaryKeySchema,
  value: rowSchema
});
var updateOpSchema = valita_exports.object({
  op: valita_exports.literal("update"),
  tableName: valita_exports.string(),
  primaryKey: primaryKeySchema,
  // Partial value with at least the primary key fields
  value: rowSchema
});
var deleteOpSchema = valita_exports.object({
  op: valita_exports.literal("delete"),
  tableName: valita_exports.string(),
  primaryKey: primaryKeySchema,
  // Partial value representing the primary key
  value: primaryKeyValueRecordSchema
});
var crudOpSchema = valita_exports.union(insertOpSchema, upsertOpSchema, updateOpSchema, deleteOpSchema);
var crudArgSchema = valita_exports.object({
  ops: valita_exports.array(crudOpSchema)
});
var crudArgsSchema = valita_exports.tuple([
  crudArgSchema
]);
var crudMutationSchema = valita_exports.object({
  type: valita_exports.literal(CRUD),
  id: valita_exports.number(),
  clientID: valita_exports.string(),
  name: valita_exports.literal(CRUD_MUTATION_NAME),
  args: crudArgsSchema,
  timestamp: valita_exports.number()
});
var customMutationSchema = valita_exports.object({
  type: valita_exports.literal(Custom),
  id: valita_exports.number(),
  clientID: valita_exports.string(),
  name: valita_exports.string(),
  args: valita_exports.array(jsonSchema),
  timestamp: valita_exports.number()
});
var mutationSchema = valita_exports.union(crudMutationSchema, customMutationSchema);
var pushBodySchema = valita_exports.object({
  clientGroupID: valita_exports.string(),
  mutations: valita_exports.array(mutationSchema),
  pushVersion: valita_exports.number(),
  // For legacy (CRUD) mutations, the schema is tied to the client group /
  // sync connection. For custom mutations, schema versioning is delegated
  // to the custom protocol / api-server.
  schemaVersion: valita_exports.number().optional(),
  timestamp: valita_exports.number(),
  requestID: valita_exports.string()
});
valita_exports.tuple([
  valita_exports.literal("push"),
  pushBodySchema
]);
var mutationIDSchema = valita_exports.object({
  id: valita_exports.number(),
  clientID: valita_exports.string()
});
var appErrorSchema = valita_exports.object({
  error: valita_exports.literal("app"),
  // The user can return any additional data here
  details: jsonSchema.optional()
});
var zeroErrorSchema2 = valita_exports.object({
  error: literalUnion("oooMutation", "alreadyProcessed"),
  details: jsonSchema.optional()
});
var mutationOkSchema = valita_exports.object({
  // The user can return any additional data here
  data: jsonSchema.optional()
});
var mutationErrorSchema = valita_exports.union(appErrorSchema, zeroErrorSchema2);
var mutationResultSchema = valita_exports.union(mutationOkSchema, mutationErrorSchema);
var mutationResponseSchema = valita_exports.object({
  id: mutationIDSchema,
  result: mutationResultSchema
});
var pushOkSchema = valita_exports.object({
  mutations: valita_exports.array(mutationResponseSchema)
});
var unsupportedPushVersionSchema = valita_exports.object({
  error: valita_exports.literal("unsupportedPushVersion"),
  // optional for backwards compatibility
  // This field is included so the client knows which mutations
  // were not processed by the server.
  mutationIDs: valita_exports.array(mutationIDSchema).optional()
});
var unsupportedSchemaVersionSchema = valita_exports.object({
  error: valita_exports.literal("unsupportedSchemaVersion"),
  // optional for backwards compatibility
  // This field is included so the client knows which mutations
  // were not processed by the server.
  mutationIDs: valita_exports.array(mutationIDSchema).optional()
});
var httpErrorSchema = valita_exports.object({
  error: valita_exports.literal("http"),
  status: valita_exports.number(),
  details: valita_exports.string(),
  mutationIDs: valita_exports.array(mutationIDSchema).optional()
});
var zeroPusherErrorSchema = valita_exports.object({
  error: valita_exports.literal("zeroPusher"),
  details: valita_exports.string(),
  mutationIDs: valita_exports.array(mutationIDSchema).optional()
});
var pushErrorSchema = valita_exports.union(unsupportedPushVersionSchema, unsupportedSchemaVersionSchema, httpErrorSchema, zeroPusherErrorSchema);
var pushResponseSchema = valita_exports.union(pushOkSchema, pushErrorSchema);
var pushResponseMessageSchema = valita_exports.tuple([
  valita_exports.literal("pushResponse"),
  pushResponseSchema
]);
valita_exports.tuple([
  valita_exports.literal("ackMutationResponses"),
  mutationIDSchema
]);
valita_exports.object({
  schema: valita_exports.string(),
  appID: valita_exports.string()
});
function mapCRUD(arg, map) {
  return {
    ops: arg.ops.map(({ op, tableName, primaryKey, value }) => ({
      op,
      tableName: map.tableName(tableName),
      primaryKey: map.columns(tableName, primaryKey),
      value: map.row(tableName, value)
    }))
  };
}
var putOpSchema2 = valita_exports.object({
  op: valita_exports.literal("put"),
  mutation: mutationResponseSchema
});
var delOpSchema2 = valita_exports.object({
  op: valita_exports.literal("del"),
  id: mutationIDSchema
});
var patchOpSchema2 = valita_exports.union(putOpSchema2, delOpSchema2);
var mutationsPatchSchema = valita_exports.array(patchOpSchema2);
var putOpSchema3 = valita_exports.object({
  op: valita_exports.literal("put"),
  tableName: valita_exports.string(),
  value: rowSchema
});
var updateOpSchema2 = valita_exports.object({
  op: valita_exports.literal("update"),
  tableName: valita_exports.string(),
  id: primaryKeyValueRecordSchema,
  merge: jsonObjectSchema.optional(),
  constrain: valita_exports.array(valita_exports.string()).optional()
});
var delOpSchema3 = valita_exports.object({
  op: valita_exports.literal("del"),
  tableName: valita_exports.string(),
  id: primaryKeyValueRecordSchema
});
var clearOpSchema2 = valita_exports.object({
  op: valita_exports.literal("clear")
});
var rowPatchOpSchema = valita_exports.union(putOpSchema3, updateOpSchema2, delOpSchema3, clearOpSchema2);
var rowsPatchSchema = valita_exports.array(rowPatchOpSchema);
var versionSchema = valita_exports.string();
var nullableVersionSchema = valita_exports.union(versionSchema, valita_exports.null());
var pokeStartBodySchema = valita_exports.object({
  pokeID: valita_exports.string(),
  // We always specify a Version as our cookie, but Replicache starts clients
  // with initial cookie `null`, before the first request. So we have to be
  // able to send a base cookie with value `null` to match that state.
  baseCookie: nullableVersionSchema,
  /**
  * This field is always set if the poke contains a `rowsPatch`.
  * It may be absent for patches that only update clients and queries.
  */
  schemaVersions: valita_exports.object({
    minSupportedVersion: valita_exports.number(),
    maxSupportedVersion: valita_exports.number()
  }).optional(),
  timestamp: valita_exports.number().optional()
});
var pokePartBodySchema = valita_exports.object({
  pokeID: valita_exports.string(),
  // Changes to last mutation id by client id.
  lastMutationIDChanges: valita_exports.record(valita_exports.number()).optional(),
  // Patches to the desired query sets by client id.
  desiredQueriesPatches: valita_exports.record(queriesPatchSchema).optional(),
  // Patches to the set of queries for which entities are sync'd in
  // rowsPatch.
  gotQueriesPatch: queriesPatchSchema.optional(),
  // Patches to the rows set.
  rowsPatch: rowsPatchSchema.optional(),
  // Mutation results patch
  mutationsPatch: mutationsPatchSchema.optional()
});
var pokeEndBodySchema = valita_exports.object({
  pokeID: valita_exports.string(),
  // Note: This should be ignored (and may be empty) if cancel === `true`.
  cookie: versionSchema,
  // If `true`, the poke with id `pokeID` should be discarded without
  // applying it.
  cancel: valita_exports.boolean().optional()
});
var pokeStartMessageSchema = valita_exports.tuple([
  valita_exports.literal("pokeStart"),
  pokeStartBodySchema
]);
var pokePartMessageSchema = valita_exports.tuple([
  valita_exports.literal("pokePart"),
  pokePartBodySchema
]);
var pokeEndMessageSchema = valita_exports.tuple([
  valita_exports.literal("pokeEnd"),
  pokeEndBodySchema
]);
var pongBodySchema = valita_exports.object({});
var pongMessageSchema = valita_exports.tuple([
  valita_exports.literal("pong"),
  pongBodySchema
]);
var pullRequestBodySchema = valita_exports.object({
  clientGroupID: valita_exports.string(),
  cookie: nullableVersionSchema,
  requestID: valita_exports.string()
});
var pullResponseBodySchema = valita_exports.object({
  cookie: versionSchema,
  // Matches pullRequestBodySchema requestID that initiated this response
  requestID: valita_exports.string(),
  lastMutationIDChanges: valita_exports.record(valita_exports.number())
});
valita_exports.tuple([
  valita_exports.literal("pull"),
  pullRequestBodySchema
]);
var pullResponseMessageSchema = valita_exports.tuple([
  valita_exports.literal("pull"),
  pullResponseBodySchema
]);
var downstreamSchema = valita_exports.union(connectedMessageSchema, errorMessageSchema, pongMessageSchema, pokeStartMessageSchema, pokePartMessageSchema, pokeEndMessageSchema, pullResponseMessageSchema, deleteClientsMessageSchema, pushResponseMessageSchema, inspectDownMessageSchema, transformErrorMessageSchema);
var PROTOCOL_VERSION = 37;
var MIN_SERVER_SUPPORTED_SYNC_PROTOCOL = 18;
assert(MIN_SERVER_SUPPORTED_SYNC_PROTOCOL < PROTOCOL_VERSION);
var NameMapper = (_tables = /* @__PURE__ */ new WeakMap(), _getTable = /* @__PURE__ */ new WeakSet(), _class13 = class {
  tableName(src, context) {
    return _class_private_method_get(this, _getTable, getTable).call(this, src, context).tableName;
  }
  columnName(table2, src, ctx) {
    const dst = _class_private_method_get(this, _getTable, getTable).call(this, table2, ctx).columns[src];
    if (!dst) {
      throw new Error(`unknown column "${src}" of "${table2}" table ${!ctx ? "" : `in ${JSON.stringify(ctx)}`}`);
    }
    return dst;
  }
  row(table2, row) {
    const dest = _class_private_method_get(this, _getTable, getTable).call(this, table2);
    const { allColumnsSame, columns } = dest;
    if (allColumnsSame) {
      return row;
    }
    const clientRow = {};
    for (const col in row) {
      clientRow[columns[col] ?? col] = row[col];
    }
    return clientRow;
  }
  columns(table2, cols) {
    const dest = _class_private_method_get(this, _getTable, getTable).call(this, table2);
    const { allColumnsSame, columns } = dest;
    return cols === void 0 || allColumnsSame ? cols : cols.map((col) => columns[col] ?? col);
  }
  constructor(tables) {
    _class_private_method_init(this, _getTable);
    _class_private_field_init$2(this, _tables, {
      writable: true,
      value: /* @__PURE__ */ new Map()
    });
    _class_private_field_set$2(this, _tables, tables);
  }
}, _class13);
function clientToServer(tables) {
  return createMapperFrom("client", tables);
}
function serverToClient(tables) {
  return createMapperFrom("server", tables);
}
function createMapperFrom(src, tables) {
  const mapping = new Map(Object.entries(tables).map(([tableName, { serverName: serverTableName, columns }]) => {
    let allColumnsSame = true;
    const names = {};
    for (const [name, { serverName }] of Object.entries(columns)) {
      if (serverName && serverName !== name) {
        allColumnsSame = false;
      }
      if (src === "client") {
        names[name] = serverName ?? name;
      } else {
        names[serverName ?? name] = name;
      }
    }
    return [
      src === "client" ? tableName : serverTableName ?? tableName,
      {
        tableName: src === "client" ? serverTableName ?? tableName : tableName,
        columns: names,
        allColumnsSame
      }
    ];
  }));
  return new NameMapper(mapping);
}
function customMutatorKey(namespace, name) {
  assert(!namespace.includes("|"), "mutator namespaces must not include a |");
  assert(!name.includes("|"), "mutator names must not include a |");
  return `${namespace}|${name}`;
}
function isClientMetric(metric) {
  return metric.endsWith("-client") || metric.endsWith("-end-to-end");
}
var hashCache = /* @__PURE__ */ new WeakMap();
function hashOfAST(ast) {
  const normalized = normalizeAST(ast);
  const cached = hashCache.get(normalized);
  if (cached) {
    return cached;
  }
  const hash2 = h64(JSON.stringify(normalized)).toString(36);
  hashCache.set(normalized, hash2);
  return hash2;
}
function hashOfNameAndArgs(name, args) {
  const argsString = JSON.stringify(args);
  return h64(`${name}:${argsString}`).toString(36);
}
var throwFilterOutput = {
  push(_change) {
    throw new Error("Output not set");
  },
  filter(_node, _cleanup2) {
    throw new Error("Output not set");
  }
};
var FilterStart = (_input = /* @__PURE__ */ new WeakMap(), _output = /* @__PURE__ */ new WeakMap(), class {
  setFilterOutput(output) {
    _class_private_field_set$2(this, _output, output);
  }
  destroy() {
    _class_private_field_get$2(this, _input).destroy();
  }
  getSchema() {
    return _class_private_field_get$2(this, _input).getSchema();
  }
  push(change) {
    _class_private_field_get$2(this, _output).push(change, this);
  }
  *fetch(req) {
    for (const node of _class_private_field_get$2(this, _input).fetch(req)) {
      if (_class_private_field_get$2(this, _output).filter(node, false)) {
        yield node;
      }
    }
  }
  *cleanup(req) {
    for (const node of _class_private_field_get$2(this, _input).cleanup(req)) {
      if (_class_private_field_get$2(this, _output).filter(node, true)) {
        yield node;
      } else {
        drainStreams(node);
      }
    }
  }
  constructor(input) {
    _class_private_field_init$2(this, _input, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _output, {
      writable: true,
      value: throwFilterOutput
    });
    _class_private_field_set$2(this, _input, input);
    input.setOutput(this);
  }
});
var FilterEnd = (_start = /* @__PURE__ */ new WeakMap(), _input1 = /* @__PURE__ */ new WeakMap(), _output1 = /* @__PURE__ */ new WeakMap(), class {
  *fetch(req) {
    for (const node of _class_private_field_get$2(this, _start).fetch(req)) {
      yield node;
    }
  }
  *cleanup(req) {
    for (const node of _class_private_field_get$2(this, _start).cleanup(req)) {
      yield node;
    }
  }
  filter(_node, _cleanup2) {
    return true;
  }
  setOutput(output) {
    _class_private_field_set$2(this, _output1, output);
  }
  destroy() {
    _class_private_field_get$2(this, _input1).destroy();
  }
  getSchema() {
    return _class_private_field_get$2(this, _input1).getSchema();
  }
  push(change) {
    _class_private_field_get$2(this, _output1).push(change, this);
  }
  constructor(start, input) {
    _class_private_field_init$2(this, _start, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _input1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _output1, {
      writable: true,
      value: throwFilterOutput
    });
    _class_private_field_set$2(this, _start, start);
    _class_private_field_set$2(this, _input1, input);
    input.setFilterOutput(this);
  }
});
function buildFilterPipeline(input, delegate, pipeline) {
  const filterStart = new FilterStart(input);
  delegate.addEdge(input, filterStart);
  const middle = pipeline(filterStart);
  delegate.addEdge(filterStart, middle);
  const filterEnd = new FilterEnd(filterStart, middle);
  delegate.addEdge(middle, filterEnd);
  return filterEnd;
}
var throwOutput = {
  push(_change) {
    throw new Error("Output not set");
  }
};
function* take(stream, limit) {
  if (limit < 1) {
    return;
  }
  let count = 0;
  for (const v1 of stream) {
    yield v1;
    if (++count === limit) {
      break;
    }
  }
}
function first(stream) {
  const it = stream[Symbol.iterator]();
  const { value } = it.next();
  it.return?.();
  return value;
}
var Exists = (_input2 = /* @__PURE__ */ new WeakMap(), _relationshipName = /* @__PURE__ */ new WeakMap(), _storage = /* @__PURE__ */ new WeakMap(), _not = /* @__PURE__ */ new WeakMap(), _parentJoinKey = /* @__PURE__ */ new WeakMap(), _noSizeReuse = /* @__PURE__ */ new WeakMap(), _output2 = /* @__PURE__ */ new WeakMap(), _inPush = /* @__PURE__ */ new WeakMap(), _filter = /* @__PURE__ */ new WeakSet(), _pushWithFilter = /* @__PURE__ */ new WeakSet(), _getSize = /* @__PURE__ */ new WeakSet(), _setSize = /* @__PURE__ */ new WeakSet(), _delSize = /* @__PURE__ */ new WeakSet(), _getOrFetchSize = /* @__PURE__ */ new WeakSet(), _fetchSize = /* @__PURE__ */ new WeakSet(), _makeSizeStorageKeyPrefix = /* @__PURE__ */ new WeakSet(), _makeSizeStorageKey = /* @__PURE__ */ new WeakSet(), _getKeyValues = /* @__PURE__ */ new WeakSet(), _class14 = class {
  setFilterOutput(output) {
    _class_private_field_set$2(this, _output2, output);
  }
  filter(node, cleanup2) {
    const result = _class_private_method_get(this, _filter, filter).call(this, node) && _class_private_field_get$2(this, _output2).filter(node, cleanup2);
    if (cleanup2) {
      _class_private_method_get(this, _delSize, delSize).call(this, node);
    }
    return result;
  }
  destroy() {
    _class_private_field_get$2(this, _input2).destroy();
  }
  getSchema() {
    return _class_private_field_get$2(this, _input2).getSchema();
  }
  push(change) {
    assert(!_class_private_field_get$2(this, _inPush), "Unexpected re-entrancy");
    _class_private_field_set$2(this, _inPush, true);
    try {
      switch (change.type) {
        // add, remove and edit cannot change the size of the
        // this.#relationshipName relationship, so simply #pushWithFilter
        case "add":
        case "edit": {
          _class_private_method_get(this, _pushWithFilter, pushWithFilter).call(this, change);
          return;
        }
        case "remove": {
          const size = _class_private_method_get(this, _getSize, getSize).call(this, change.node);
          if (size === void 0) {
            return;
          }
          _class_private_method_get(this, _pushWithFilter, pushWithFilter).call(this, change, size);
          _class_private_method_get(this, _delSize, delSize).call(this, change.node);
          return;
        }
        case "child":
          if (change.child.relationshipName !== _class_private_field_get$2(this, _relationshipName) || change.child.change.type === "edit" || change.child.change.type === "child") {
            _class_private_method_get(this, _pushWithFilter, pushWithFilter).call(this, change);
            return;
          }
          switch (change.child.change.type) {
            case "add": {
              let size = _class_private_method_get(this, _getSize, getSize).call(this, change.node);
              if (size !== void 0) {
                size++;
                _class_private_method_get(this, _setSize, setSize).call(this, change.node, size);
              } else {
                size = _class_private_method_get(this, _fetchSize, fetchSize).call(this, change.node);
              }
              if (size === 1) {
                if (_class_private_field_get$2(this, _not)) {
                  _class_private_field_get$2(this, _output2).push({
                    type: "remove",
                    node: {
                      row: change.node.row,
                      relationships: {
                        ...change.node.relationships,
                        [_class_private_field_get$2(this, _relationshipName)]: () => []
                      }
                    }
                  }, this);
                } else {
                  _class_private_field_get$2(this, _output2).push({
                    type: "add",
                    node: change.node
                  }, this);
                }
              } else {
                _class_private_method_get(this, _pushWithFilter, pushWithFilter).call(this, change, size);
              }
              return;
            }
            case "remove": {
              let size = _class_private_method_get(this, _getSize, getSize).call(this, change.node);
              if (size !== void 0) {
                assert(size > 0);
                size--;
                _class_private_method_get(this, _setSize, setSize).call(this, change.node, size);
              } else {
                size = _class_private_method_get(this, _fetchSize, fetchSize).call(this, change.node);
              }
              if (size === 0) {
                if (_class_private_field_get$2(this, _not)) {
                  _class_private_field_get$2(this, _output2).push({
                    type: "add",
                    node: change.node
                  }, this);
                } else {
                  _class_private_field_get$2(this, _output2).push({
                    type: "remove",
                    node: {
                      row: change.node.row,
                      relationships: {
                        ...change.node.relationships,
                        [_class_private_field_get$2(this, _relationshipName)]: () => [
                          change.child.change.node
                        ]
                      }
                    }
                  }, this);
                }
              } else {
                _class_private_method_get(this, _pushWithFilter, pushWithFilter).call(this, change, size);
              }
              return;
            }
          }
          return;
        default:
          unreachable(change);
      }
    } finally {
      _class_private_field_set$2(this, _inPush, false);
    }
  }
  constructor(input, storage, relationshipName, parentJoinKey, type) {
    _class_private_method_init(this, _filter);
    _class_private_method_init(this, _pushWithFilter);
    _class_private_method_init(this, _getSize);
    _class_private_method_init(this, _setSize);
    _class_private_method_init(this, _delSize);
    _class_private_method_init(this, _getOrFetchSize);
    _class_private_method_init(this, _fetchSize);
    _class_private_method_init(this, _makeSizeStorageKeyPrefix);
    _class_private_method_init(this, _makeSizeStorageKey);
    _class_private_method_init(this, _getKeyValues);
    _class_private_field_init$2(this, _input2, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _relationshipName, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _storage, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _not, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _parentJoinKey, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _noSizeReuse, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _output2, {
      writable: true,
      value: throwFilterOutput
    });
    _class_private_field_init$2(this, _inPush, {
      writable: true,
      value: false
    });
    _class_private_field_set$2(this, _input2, input);
    _class_private_field_set$2(this, _relationshipName, relationshipName);
    _class_private_field_get$2(this, _input2).setFilterOutput(this);
    _class_private_field_set$2(this, _storage, storage);
    assert(_class_private_field_get$2(this, _input2).getSchema().relationships[relationshipName], `Input schema missing ${relationshipName}`);
    _class_private_field_set$2(this, _not, type === "NOT EXISTS");
    _class_private_field_set$2(this, _parentJoinKey, parentJoinKey);
    _class_private_field_set$2(this, _noSizeReuse, areEqual(parentJoinKey, _class_private_field_get$2(this, _input2).getSchema().primaryKey));
  }
}, _class14);
function pushAccumulatedChanges(accumulatedPushes, output, pusher2, fanOutChangeType, mergeRelationships2, addEmptyRelationships) {
  if (accumulatedPushes.length === 0) {
    return;
  }
  const candidatesToPush = /* @__PURE__ */ new Map();
  for (const change of accumulatedPushes) {
    if (fanOutChangeType === "child" && change.type !== "child") {
      assert(candidatesToPush.has(change.type) === false, () => `Fan-in:child expected at most one ${change.type} when fan-out is of type child`);
    }
    const existing = candidatesToPush.get(change.type);
    let mergedChange = change;
    if (existing) {
      mergedChange = mergeRelationships2(existing, change);
    }
    candidatesToPush.set(change.type, mergedChange);
  }
  accumulatedPushes.length = 0;
  const types = [
    ...candidatesToPush.keys()
  ];
  switch (fanOutChangeType) {
    case "remove":
      assert(types.length === 1 && types[0] === "remove", "Fan-in:remove expected all removes");
      output.push(addEmptyRelationships(must(candidatesToPush.get("remove"))), pusher2);
      return;
    case "add":
      assert(types.length === 1 && types[0] === "add", "Fan-in:add expected all adds");
      output.push(addEmptyRelationships(must(candidatesToPush.get("add"))), pusher2);
      return;
    case "edit": {
      assert(types.every((type) => type === "add" || type === "remove" || type === "edit"), "Fan-in:edit expected all adds, removes, or edits");
      const addChange = candidatesToPush.get("add");
      const removeChange = candidatesToPush.get("remove");
      let editChange = candidatesToPush.get("edit");
      if (editChange) {
        if (addChange) {
          editChange = mergeRelationships2(editChange, addChange);
        }
        if (removeChange) {
          editChange = mergeRelationships2(editChange, removeChange);
        }
        output.push(addEmptyRelationships(editChange), pusher2);
        return;
      }
      if (addChange && removeChange) {
        output.push(addEmptyRelationships({
          type: "edit",
          node: addChange.node,
          oldNode: removeChange.node
        }), pusher2);
        return;
      }
      output.push(addEmptyRelationships(must(addChange ?? removeChange)), pusher2);
      return;
    }
    case "child": {
      assert(types.every((type) => type === "add" || // exists can change child to add or remove
      type === "remove" || // exists can change child to add or remove
      type === "child"), "Fan-in:child expected all adds, removes, or children");
      assert(types.length <= 2, "Fan-in:child expected at most 2 types on a child change from fan-out");
      const childChange = candidatesToPush.get("child");
      if (childChange) {
        output.push(childChange, pusher2);
        return;
      }
      const addChange = candidatesToPush.get("add");
      const removeChange = candidatesToPush.get("remove");
      assert(addChange === void 0 || removeChange === void 0, "Fan-in:child expected either add or remove, not both");
      output.push(addEmptyRelationships(must(addChange ?? removeChange)), pusher2);
      return;
    }
  }
}
function mergeRelationships(left, right) {
  if (left.type === right.type) {
    switch (left.type) {
      case "add": {
        return {
          type: "add",
          node: {
            row: left.node.row,
            relationships: {
              ...right.node.relationships,
              ...left.node.relationships
            }
          }
        };
      }
      case "remove": {
        return {
          type: "remove",
          node: {
            row: left.node.row,
            relationships: {
              ...right.node.relationships,
              ...left.node.relationships
            }
          }
        };
      }
      case "edit": {
        assert(right.type === "edit");
        return {
          type: "edit",
          node: {
            row: left.node.row,
            relationships: {
              ...right.node.relationships,
              ...left.node.relationships
            }
          },
          oldNode: {
            row: left.oldNode.row,
            relationships: {
              ...right.oldNode.relationships,
              ...left.oldNode.relationships
            }
          }
        };
      }
    }
  }
  assert(left.type === "edit");
  switch (right.type) {
    case "add": {
      return {
        type: "edit",
        node: {
          ...left.node,
          relationships: {
            ...right.node.relationships,
            ...left.node.relationships
          }
        },
        oldNode: left.oldNode
      };
    }
    case "remove": {
      return {
        type: "edit",
        node: left.node,
        oldNode: {
          ...left.oldNode,
          relationships: {
            ...right.node.relationships,
            ...left.oldNode.relationships
          }
        }
      };
    }
  }
  unreachable();
}
function makeAddEmptyRelationships(schema2) {
  return (change) => {
    if (Object.keys(schema2.relationships).length === 0) {
      return change;
    }
    switch (change.type) {
      case "add":
      case "remove": {
        const ret = {
          ...change,
          node: {
            ...change.node,
            relationships: {
              ...change.node.relationships
            }
          }
        };
        mergeEmpty(ret.node.relationships, Object.keys(schema2.relationships));
        return ret;
      }
      case "edit": {
        const ret = {
          ...change,
          node: {
            ...change.node,
            relationships: {
              ...change.node.relationships
            }
          },
          oldNode: {
            ...change.oldNode,
            relationships: {
              ...change.oldNode.relationships
            }
          }
        };
        mergeEmpty(ret.node.relationships, Object.keys(schema2.relationships));
        mergeEmpty(ret.oldNode.relationships, Object.keys(schema2.relationships));
        return ret;
      }
      case "child":
        return change;
    }
  };
}
function mergeEmpty(relationships2, relationshipNames) {
  for (const relName of relationshipNames) {
    if (relationships2[relName] === void 0) {
      relationships2[relName] = () => emptyArray$1;
    }
  }
}
var FanIn = (_inputs = /* @__PURE__ */ new WeakMap(), _schema3 = /* @__PURE__ */ new WeakMap(), _output3 = /* @__PURE__ */ new WeakMap(), _accumulatedPushes = /* @__PURE__ */ new WeakMap(), class {
  setFilterOutput(output) {
    _class_private_field_set$2(this, _output3, output);
  }
  destroy() {
    for (const input of _class_private_field_get$2(this, _inputs)) {
      input.destroy();
    }
  }
  getSchema() {
    return _class_private_field_get$2(this, _schema3);
  }
  filter(node, cleanup2) {
    return _class_private_field_get$2(this, _output3).filter(node, cleanup2);
  }
  push(change) {
    _class_private_field_get$2(this, _accumulatedPushes).push(change);
  }
  fanOutDonePushingToAllBranches(fanOutChangeType) {
    if (_class_private_field_get$2(this, _inputs).length === 0) {
      assert(_class_private_field_get$2(this, _accumulatedPushes).length === 0, "If there are no inputs then fan-in should not receive any pushes.");
      return;
    }
    pushAccumulatedChanges(_class_private_field_get$2(this, _accumulatedPushes), _class_private_field_get$2(this, _output3), this, fanOutChangeType, identity, identity);
  }
  constructor(fanOut, inputs) {
    _class_private_field_init$2(this, _inputs, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _schema3, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _output3, {
      writable: true,
      value: throwFilterOutput
    });
    _class_private_field_init$2(this, _accumulatedPushes, {
      writable: true,
      value: []
    });
    _class_private_field_set$2(this, _inputs, inputs);
    _class_private_field_set$2(this, _schema3, fanOut.getSchema());
    for (const input of inputs) {
      input.setFilterOutput(this);
      assert(_class_private_field_get$2(this, _schema3) === input.getSchema(), `Schema mismatch in fan-in`);
    }
  }
});
var FanOut = (_input3 = /* @__PURE__ */ new WeakMap(), _outputs = /* @__PURE__ */ new WeakMap(), _fanIn = /* @__PURE__ */ new WeakMap(), _destroyCount = /* @__PURE__ */ new WeakMap(), class {
  setFanIn(fanIn) {
    _class_private_field_set$2(this, _fanIn, fanIn);
  }
  setFilterOutput(output) {
    _class_private_field_get$2(this, _outputs).push(output);
  }
  destroy() {
    if (_class_private_field_get$2(this, _destroyCount) < _class_private_field_get$2(this, _outputs).length) {
      ++_class_private_field_update(this, _destroyCount).value;
      if (_class_private_field_get$2(this, _destroyCount) === _class_private_field_get$2(this, _outputs).length) {
        _class_private_field_get$2(this, _input3).destroy();
      }
    } else {
      throw new Error("FanOut already destroyed once for each output");
    }
  }
  getSchema() {
    return _class_private_field_get$2(this, _input3).getSchema();
  }
  filter(node, cleanup2) {
    let result = false;
    for (const output of _class_private_field_get$2(this, _outputs)) {
      result = output.filter(node, cleanup2) || result;
      if (!cleanup2 && result) {
        return true;
      }
    }
    return result;
  }
  push(change) {
    for (const out of _class_private_field_get$2(this, _outputs)) {
      out.push(change, this);
    }
    must(_class_private_field_get$2(this, _fanIn), "fan-out must have a corresponding fan-in set!").fanOutDonePushingToAllBranches(change.type);
  }
  constructor(input) {
    _class_private_field_init$2(this, _input3, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _outputs, {
      writable: true,
      value: []
    });
    _class_private_field_init$2(this, _fanIn, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _destroyCount, {
      writable: true,
      value: 0
    });
    _class_private_field_set$2(this, _input3, input);
    input.setFilterOutput(this);
  }
});
function maybeSplitAndPushEditChange(change, predicate, output, pusher2) {
  const oldWasPresent = predicate(change.oldNode.row);
  const newIsPresent = predicate(change.node.row);
  if (oldWasPresent && newIsPresent) {
    output.push(change, pusher2);
  } else if (oldWasPresent && !newIsPresent) {
    output.push({
      type: "remove",
      node: change.oldNode
    }, pusher2);
  } else if (!oldWasPresent && newIsPresent) {
    output.push({
      type: "add",
      node: change.node
    }, pusher2);
  }
}
function filterPush(change, output, pusher2, predicate) {
  if (!predicate) {
    output.push(change, pusher2);
    return;
  }
  switch (change.type) {
    case "add":
    case "remove":
      if (predicate(change.node.row)) {
        output.push(change, pusher2);
      }
      break;
    case "child":
      if (predicate(change.node.row)) {
        output.push(change, pusher2);
      }
      break;
    case "edit":
      maybeSplitAndPushEditChange(change, predicate, output, pusher2);
      break;
    default:
      unreachable();
  }
}
var Filter = (_input4 = /* @__PURE__ */ new WeakMap(), _predicate = /* @__PURE__ */ new WeakMap(), _output4 = /* @__PURE__ */ new WeakMap(), class {
  filter(node, cleanup2) {
    return _class_private_field_get$2(this, _predicate).call(this, node.row) && _class_private_field_get$2(this, _output4).filter(node, cleanup2);
  }
  setFilterOutput(output) {
    _class_private_field_set$2(this, _output4, output);
  }
  destroy() {
    _class_private_field_get$2(this, _input4).destroy();
  }
  getSchema() {
    return _class_private_field_get$2(this, _input4).getSchema();
  }
  push(change) {
    filterPush(change, _class_private_field_get$2(this, _output4), this, _class_private_field_get$2(this, _predicate));
  }
  constructor(input, predicate) {
    _class_private_field_init$2(this, _input4, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _predicate, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _output4, {
      writable: true,
      value: throwFilterOutput
    });
    _class_private_field_set$2(this, _input4, input);
    _class_private_field_set$2(this, _predicate, predicate);
    input.setFilterOutput(this);
  }
});
function constraintMatchesRow(constraint, row) {
  for (const key in constraint) {
    if (!valuesEqual(row[key], constraint[key])) {
      return false;
    }
  }
  return true;
}
function constraintsAreCompatible(left, right) {
  for (const key in left) {
    if (key in right && !valuesEqual(left[key], right[key])) {
      return false;
    }
  }
  return true;
}
function constraintMatchesPrimaryKey(constraint, primary) {
  return keyMatchesPrimaryKey(Object.keys(constraint), primary);
}
function keyMatchesPrimaryKey(key, primary) {
  const constraintKeys = [
    ...key
  ];
  if (constraintKeys.length !== primary.length) {
    return false;
  }
  constraintKeys.sort(stringCompare);
  for (let i = 0; i < constraintKeys.length; i++) {
    if (constraintKeys[i] !== primary[i]) {
      return false;
    }
  }
  return true;
}
function pullSimpleAndComponents(condition) {
  if (condition.type === "and") {
    return condition.conditions.flatMap(pullSimpleAndComponents);
  }
  if (condition.type === "simple") {
    return [
      condition
    ];
  }
  if (condition.type === "or" && condition.conditions.length === 1) {
    return pullSimpleAndComponents(condition.conditions[0]);
  }
  return [];
}
function primaryKeyConstraintFromFilters(condition, primary) {
  if (condition === void 0) {
    return void 0;
  }
  const conditions = pullSimpleAndComponents(condition);
  if (conditions.length === 0) {
    return void 0;
  }
  const ret = {};
  for (const subCondition of conditions) {
    if (subCondition.op === "=") {
      const column = extractColumn(subCondition);
      if (column !== void 0) {
        if (!primary.includes(column.name)) {
          continue;
        }
        ret[column.name] = column.value;
      }
    }
  }
  if (Object.keys(ret).length !== primary.length) {
    return void 0;
  }
  return ret;
}
function extractColumn(condition) {
  if (condition.left.type === "column") {
    assert(condition.right.type === "literal");
    return {
      name: condition.left.name,
      value: condition.right.value
    };
  }
  return void 0;
}
function* generateWithOverlay(stream, overlay, schema2) {
  let applied = false;
  let editOldApplied = false;
  let editNewApplied = false;
  for (const node of stream) {
    let yieldNode = true;
    if (!applied) {
      switch (overlay.type) {
        case "add": {
          if (schema2.compareRows(overlay.node.row, node.row) === 0) {
            applied = true;
            yieldNode = false;
          }
          break;
        }
        case "remove": {
          if (schema2.compareRows(overlay.node.row, node.row) < 0) {
            applied = true;
            yield overlay.node;
          }
          break;
        }
        case "edit": {
          if (!editOldApplied && schema2.compareRows(overlay.oldNode.row, node.row) < 0) {
            editOldApplied = true;
            if (editNewApplied) {
              applied = true;
            }
            yield overlay.oldNode;
          }
          if (!editNewApplied && schema2.compareRows(overlay.node.row, node.row) === 0) {
            editNewApplied = true;
            if (editOldApplied) {
              applied = true;
            }
            yieldNode = false;
          }
          break;
        }
        case "child": {
          if (schema2.compareRows(overlay.node.row, node.row) === 0) {
            applied = true;
            yield {
              row: node.row,
              relationships: {
                ...node.relationships,
                [overlay.child.relationshipName]: () => generateWithOverlay(node.relationships[overlay.child.relationshipName](), overlay.child.change, schema2.relationships[overlay.child.relationshipName])
              }
            };
            yieldNode = false;
          }
          break;
        }
      }
    }
    if (yieldNode) {
      yield node;
    }
  }
  if (!applied) {
    if (overlay.type === "remove") {
      applied = true;
      yield overlay.node;
    } else if (overlay.type === "edit") {
      assert(editNewApplied);
      editOldApplied = true;
      applied = true;
      yield overlay.oldNode;
    }
  }
  assert(applied);
}
function rowEqualsForCompoundKey(a, b, key) {
  for (let i = 0; i < key.length; i++) {
    if (compareValues(a[key[i]], b[key[i]]) !== 0) {
      return false;
    }
  }
  return true;
}
function isJoinMatch(parent, parentKey, child, childKey) {
  for (let i = 0; i < parentKey.length; i++) {
    if (!valuesEqual(parent[parentKey[i]], child[childKey[i]])) {
      return false;
    }
  }
  return true;
}
var FlippedJoin = (_parent = /* @__PURE__ */ new WeakMap(), _child = /* @__PURE__ */ new WeakMap(), _parentKey = /* @__PURE__ */ new WeakMap(), _childKey = /* @__PURE__ */ new WeakMap(), _relationshipName1 = /* @__PURE__ */ new WeakMap(), _schema4 = /* @__PURE__ */ new WeakMap(), _output5 = /* @__PURE__ */ new WeakMap(), _inprogressChildChange = /* @__PURE__ */ new WeakMap(), _pushChild = /* @__PURE__ */ new WeakSet(), _pushParent = /* @__PURE__ */ new WeakSet(), _class15 = class {
  destroy() {
    _class_private_field_get$2(this, _child).destroy();
    _class_private_field_get$2(this, _parent).destroy();
  }
  setOutput(output) {
    _class_private_field_set$2(this, _output5, output);
  }
  getSchema() {
    return _class_private_field_get$2(this, _schema4);
  }
  // TODO: When parentKey is the parent's primary key (or more
  // generally when the parent cardinality is expected to be small) a different
  // algorithm should be used:  For each child node, fetch all parent nodes
  // eagerly and then sort using quicksort.
  *fetch(req) {
    const childConstraint = {};
    let hasChildConstraint = false;
    if (req.constraint) {
      for (const [key, value] of Object.entries(req.constraint)) {
        const index = _class_private_field_get$2(this, _parentKey).indexOf(key);
        if (index !== -1) {
          hasChildConstraint = true;
          childConstraint[_class_private_field_get$2(this, _childKey)[index]] = value;
        }
      }
    }
    const childNodes = [
      ..._class_private_field_get$2(this, _child).fetch(hasChildConstraint ? {
        constraint: childConstraint
      } : {})
    ];
    if (_class_private_field_get$2(this, _inprogressChildChange)?.change.type === "remove") {
      const removedNode = _class_private_field_get$2(this, _inprogressChildChange).change.node;
      const compare2 = _class_private_field_get$2(this, _child).getSchema().compareRows;
      const insertPos = binarySearch(childNodes.length, (i) => compare2(removedNode.row, childNodes[i].row));
      childNodes.splice(insertPos, 0, removedNode);
    }
    const parentIterators = [];
    let threw = false;
    try {
      for (const childNode of childNodes) {
        const constraintFromChild = {};
        for (let i = 0; i < _class_private_field_get$2(this, _parentKey).length; i++) {
          constraintFromChild[_class_private_field_get$2(this, _parentKey)[i]] = childNode.row[_class_private_field_get$2(this, _childKey)[i]];
        }
        if (req.constraint && !constraintsAreCompatible(constraintFromChild, req.constraint)) {
          parentIterators.push(emptyArray$1[Symbol.iterator]());
        } else {
          const stream = _class_private_field_get$2(this, _parent).fetch({
            ...req,
            constraint: {
              ...req.constraint,
              ...constraintFromChild
            }
          });
          const iterator2 = stream[Symbol.iterator]();
          parentIterators.push(iterator2);
        }
      }
      const nextParentNodes = [];
      for (let i = 0; i < parentIterators.length; i++) {
        const iter = parentIterators[i];
        const result = iter.next();
        nextParentNodes[i] = result.done ? null : result.value;
      }
      while (true) {
        let minParentNode = null;
        let minParentNodeChildIndexes = [];
        for (let i = 0; i < nextParentNodes.length; i++) {
          const parentNode = nextParentNodes[i];
          if (parentNode === null) {
            continue;
          }
          if (minParentNode === null) {
            minParentNode = parentNode;
            minParentNodeChildIndexes.push(i);
          } else {
            const compareResult = _class_private_field_get$2(this, _schema4).compareRows(parentNode.row, minParentNode.row) * (req.reverse ? -1 : 1);
            if (compareResult === 0) {
              minParentNodeChildIndexes.push(i);
            } else if (compareResult < 0) {
              minParentNode = parentNode;
              minParentNodeChildIndexes = [
                i
              ];
            }
          }
        }
        if (minParentNode === null) {
          return;
        }
        const relatedChildNodes = [];
        for (const minParentNodeChildIndex of minParentNodeChildIndexes) {
          relatedChildNodes.push(childNodes[minParentNodeChildIndex]);
          const iter = parentIterators[minParentNodeChildIndex];
          const result = iter.next();
          nextParentNodes[minParentNodeChildIndex] = result.done ? null : result.value;
        }
        let overlaidRelatedChildNodes = relatedChildNodes;
        if (_class_private_field_get$2(this, _inprogressChildChange) && _class_private_field_get$2(this, _inprogressChildChange).position && isJoinMatch(_class_private_field_get$2(this, _inprogressChildChange).change.node.row, _class_private_field_get$2(this, _childKey), minParentNode.row, _class_private_field_get$2(this, _parentKey))) {
          const hasInprogressChildChangeBeenPushedForMinParentNode = _class_private_field_get$2(this, _parent).getSchema().compareRows(minParentNode.row, _class_private_field_get$2(this, _inprogressChildChange).position) <= 0;
          if (_class_private_field_get$2(this, _inprogressChildChange).change.type === "remove") {
            if (hasInprogressChildChangeBeenPushedForMinParentNode) {
              overlaidRelatedChildNodes = relatedChildNodes.filter((n) => n !== _class_private_field_get$2(this, _inprogressChildChange)?.change.node);
            }
          } else if (!hasInprogressChildChangeBeenPushedForMinParentNode) {
            overlaidRelatedChildNodes = [
              ...generateWithOverlay(relatedChildNodes, _class_private_field_get$2(this, _inprogressChildChange).change, _class_private_field_get$2(this, _child).getSchema())
            ];
          }
        }
        if (overlaidRelatedChildNodes.length > 0) {
          yield {
            ...minParentNode,
            relationships: {
              ...minParentNode.relationships,
              [_class_private_field_get$2(this, _relationshipName1)]: () => overlaidRelatedChildNodes
            }
          };
        }
      }
    } catch (e) {
      threw = true;
      for (const iter of parentIterators) {
        try {
          iter.throw?.(e);
        } catch (_cleanupError) {
        }
      }
      throw e;
    } finally {
      if (!threw) {
        for (const iter of parentIterators) {
          try {
            iter.return?.();
          } catch (_cleanupError) {
          }
        }
      }
    }
  }
  *cleanup(_req) {
  }
  constructor({ parent, child, parentKey, childKey, relationshipName, hidden, system }) {
    _class_private_method_init(this, _pushChild);
    _class_private_method_init(this, _pushParent);
    _class_private_field_init$2(this, _parent, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _child, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _parentKey, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _childKey, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _relationshipName1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _schema4, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _output5, {
      writable: true,
      value: throwOutput
    });
    _class_private_field_init$2(this, _inprogressChildChange, {
      writable: true,
      value: void 0
    });
    assert(parent !== child, "Parent and child must be different operators");
    assert(parentKey.length === childKey.length, "The parentKey and childKey keys must have same length");
    _class_private_field_set$2(this, _parent, parent);
    _class_private_field_set$2(this, _child, child);
    _class_private_field_set$2(this, _parentKey, parentKey);
    _class_private_field_set$2(this, _childKey, childKey);
    _class_private_field_set$2(this, _relationshipName1, relationshipName);
    const parentSchema = parent.getSchema();
    const childSchema = child.getSchema();
    _class_private_field_set$2(this, _schema4, {
      ...parentSchema,
      relationships: {
        ...parentSchema.relationships,
        [relationshipName]: {
          ...childSchema,
          isHidden: hidden,
          system
        }
      }
    });
    parent.setOutput({
      push: (change) => _class_private_method_get(this, _pushParent, pushParent).call(this, change)
    });
    child.setOutput({
      push: (change) => _class_private_method_get(this, _pushChild, pushChild).call(this, change)
    });
  }
}, _class15);
var Join = (_parent1 = /* @__PURE__ */ new WeakMap(), _child1 = /* @__PURE__ */ new WeakMap(), _storage1 = /* @__PURE__ */ new WeakMap(), _parentKey1 = /* @__PURE__ */ new WeakMap(), _childKey1 = /* @__PURE__ */ new WeakMap(), _relationshipName2 = /* @__PURE__ */ new WeakMap(), _schema5 = /* @__PURE__ */ new WeakMap(), _output6 = /* @__PURE__ */ new WeakMap(), _inprogressChildChange1 = /* @__PURE__ */ new WeakMap(), _pushParent1 = /* @__PURE__ */ new WeakSet(), _pushChild1 = /* @__PURE__ */ new WeakSet(), _processParentNode = /* @__PURE__ */ new WeakSet(), _class16 = class {
  destroy() {
    _class_private_field_get$2(this, _parent1).destroy();
    _class_private_field_get$2(this, _child1).destroy();
  }
  setOutput(output) {
    _class_private_field_set$2(this, _output6, output);
  }
  getSchema() {
    return _class_private_field_get$2(this, _schema5);
  }
  *fetch(req) {
    for (const parentNode of _class_private_field_get$2(this, _parent1).fetch(req)) {
      yield _class_private_method_get(this, _processParentNode, processParentNode).call(this, parentNode.row, parentNode.relationships, "fetch");
    }
  }
  *cleanup(req) {
    for (const parentNode of _class_private_field_get$2(this, _parent1).cleanup(req)) {
      yield _class_private_method_get(this, _processParentNode, processParentNode).call(this, parentNode.row, parentNode.relationships, "cleanup");
    }
  }
  constructor({ parent, child, storage, parentKey, childKey, relationshipName, hidden, system }) {
    _class_private_method_init(this, _pushParent1);
    _class_private_method_init(this, _pushChild1);
    _class_private_method_init(this, _processParentNode);
    _class_private_field_init$2(this, _parent1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _child1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _storage1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _parentKey1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _childKey1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _relationshipName2, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _schema5, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _output6, {
      writable: true,
      value: throwOutput
    });
    _class_private_field_init$2(this, _inprogressChildChange1, {
      writable: true,
      value: void 0
    });
    assert(parent !== child, "Parent and child must be different operators");
    assert(parentKey.length === childKey.length, "The parentKey and childKey keys must have same length");
    _class_private_field_set$2(this, _parent1, parent);
    _class_private_field_set$2(this, _child1, child);
    _class_private_field_set$2(this, _storage1, storage);
    _class_private_field_set$2(this, _parentKey1, parentKey);
    _class_private_field_set$2(this, _childKey1, childKey);
    _class_private_field_set$2(this, _relationshipName2, relationshipName);
    const parentSchema = parent.getSchema();
    const childSchema = child.getSchema();
    _class_private_field_set$2(this, _schema5, {
      ...parentSchema,
      relationships: {
        ...parentSchema.relationships,
        [relationshipName]: {
          ...childSchema,
          isHidden: hidden,
          system
        }
      }
    });
    parent.setOutput({
      push: (change) => _class_private_method_get(this, _pushParent1, pushParent1).call(this, change)
    });
    child.setOutput({
      push: (change) => _class_private_method_get(this, _pushChild1, pushChild1).call(this, change)
    });
  }
}, _class16);
function makeStorageKeyForValues(values) {
  const json2 = JSON.stringify([
    "pKeySet",
    ...values
  ]);
  return json2.substring(1, json2.length - 1) + ",";
}
function makeStorageKeyPrefix(row, key) {
  return makeStorageKeyForValues(key.map((k) => row[k]));
}
function makeStorageKey(key, primaryKey, row) {
  const values = key.map((k) => row[k]);
  for (const key2 of primaryKey) {
    values.push(row[key2]);
  }
  return makeStorageKeyForValues(values);
}
var Skip = (_input5 = /* @__PURE__ */ new WeakMap(), _bound = /* @__PURE__ */ new WeakMap(), _comparator = /* @__PURE__ */ new WeakMap(), _output7 = /* @__PURE__ */ new WeakMap(), _fetchOrCleanup = /* @__PURE__ */ new WeakSet(), _shouldBePresent = /* @__PURE__ */ new WeakSet(), _getStart = /* @__PURE__ */ new WeakSet(), _class17 = class {
  getSchema() {
    return _class_private_field_get$2(this, _input5).getSchema();
  }
  fetch(req) {
    return _class_private_method_get(this, _fetchOrCleanup, fetchOrCleanup).call(this, "fetch", req);
  }
  cleanup(req) {
    return _class_private_method_get(this, _fetchOrCleanup, fetchOrCleanup).call(this, "fetch", req);
  }
  setOutput(output) {
    _class_private_field_set$2(this, _output7, output);
  }
  destroy() {
    _class_private_field_get$2(this, _input5).destroy();
  }
  push(change) {
    const shouldBePresent1 = (row) => _class_private_method_get(this, _shouldBePresent, shouldBePresent).call(this, row);
    if (change.type === "edit") {
      maybeSplitAndPushEditChange(change, shouldBePresent1, _class_private_field_get$2(this, _output7), this);
      return;
    }
    if (shouldBePresent1(change.node.row)) {
      _class_private_field_get$2(this, _output7).push(change, this);
    }
  }
  constructor(input, bound) {
    _class_private_method_init(this, _fetchOrCleanup);
    _class_private_method_init(this, _shouldBePresent);
    _class_private_method_init(this, _getStart);
    _class_private_field_init$2(this, _input5, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _bound, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _comparator, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _output7, {
      writable: true,
      value: throwOutput
    });
    _class_private_field_set$2(this, _input5, input);
    _class_private_field_set$2(this, _bound, bound);
    _class_private_field_set$2(this, _comparator, input.getSchema().compareRows);
    input.setOutput(this);
  }
}, _class17);
var MAX_BOUND_KEY = "maxBound";
var Take = (_input6 = /* @__PURE__ */ new WeakMap(), _storage2 = /* @__PURE__ */ new WeakMap(), _limit = /* @__PURE__ */ new WeakMap(), _partitionKey = /* @__PURE__ */ new WeakMap(), _partitionKeyComparator = /* @__PURE__ */ new WeakMap(), _rowHiddenFromFetch = /* @__PURE__ */ new WeakMap(), _output8 = /* @__PURE__ */ new WeakMap(), _initialFetch = /* @__PURE__ */ new WeakSet(), _getStateAndConstraint = /* @__PURE__ */ new WeakSet(), _pushEditChange = /* @__PURE__ */ new WeakSet(), _withRowHiddenFromFetch = /* @__PURE__ */ new WeakSet(), _setTakeState = /* @__PURE__ */ new WeakSet(), _class18 = class {
  setOutput(output) {
    _class_private_field_set$2(this, _output8, output);
  }
  getSchema() {
    return _class_private_field_get$2(this, _input6).getSchema();
  }
  *fetch(req) {
    if (!_class_private_field_get$2(this, _partitionKey) || req.constraint && constraintMatchesPartitionKey(req.constraint, _class_private_field_get$2(this, _partitionKey))) {
      const takeStateKey = getTakeStateKey(_class_private_field_get$2(this, _partitionKey), req.constraint);
      const takeState = _class_private_field_get$2(this, _storage2).get(takeStateKey);
      if (!takeState) {
        yield* _class_private_method_get(this, _initialFetch, initialFetch).call(this, req);
        return;
      }
      if (takeState.bound === void 0) {
        return;
      }
      for (const inputNode of _class_private_field_get$2(this, _input6).fetch(req)) {
        if (this.getSchema().compareRows(takeState.bound, inputNode.row) < 0) {
          return;
        }
        if (_class_private_field_get$2(this, _rowHiddenFromFetch) && this.getSchema().compareRows(_class_private_field_get$2(this, _rowHiddenFromFetch), inputNode.row) === 0) {
          continue;
        }
        yield inputNode;
      }
      return;
    }
    const maxBound = _class_private_field_get$2(this, _storage2).get(MAX_BOUND_KEY);
    if (maxBound === void 0) {
      return;
    }
    for (const inputNode of _class_private_field_get$2(this, _input6).fetch(req)) {
      if (this.getSchema().compareRows(inputNode.row, maxBound) > 0) {
        return;
      }
      const takeStateKey = getTakeStateKey(_class_private_field_get$2(this, _partitionKey), inputNode.row);
      const takeState = _class_private_field_get$2(this, _storage2).get(takeStateKey);
      if (takeState?.bound !== void 0 && this.getSchema().compareRows(takeState.bound, inputNode.row) >= 0) {
        yield inputNode;
      }
    }
  }
  *cleanup(req) {
    assert(req.start === void 0, "Start should be undefined");
    assert(constraintMatchesPartitionKey(req.constraint, _class_private_field_get$2(this, _partitionKey)), "Constraint should match partition key");
    const takeStateKey = getTakeStateKey(_class_private_field_get$2(this, _partitionKey), req.constraint);
    _class_private_field_get$2(this, _storage2).del(takeStateKey);
    let size = 0;
    for (const inputNode of _class_private_field_get$2(this, _input6).cleanup(req)) {
      if (size === _class_private_field_get$2(this, _limit)) {
        return;
      }
      size++;
      yield inputNode;
    }
  }
  push(change) {
    if (change.type === "edit") {
      _class_private_method_get(this, _pushEditChange, pushEditChange).call(this, change);
      return;
    }
    const { takeState, takeStateKey, maxBound, constraint } = _class_private_method_get(this, _getStateAndConstraint, getStateAndConstraint).call(this, change.node.row);
    if (!takeState) {
      return;
    }
    const { compareRows } = this.getSchema();
    if (change.type === "add") {
      if (takeState.size < _class_private_field_get$2(this, _limit)) {
        _class_private_method_get(this, _setTakeState, setTakeState).call(this, takeStateKey, takeState.size + 1, takeState.bound === void 0 || compareRows(takeState.bound, change.node.row) < 0 ? change.node.row : takeState.bound, maxBound);
        _class_private_field_get$2(this, _output8).push(change, this);
        return;
      }
      if (takeState.bound === void 0 || compareRows(change.node.row, takeState.bound) >= 0) {
        return;
      }
      let beforeBoundNode;
      let boundNode;
      if (_class_private_field_get$2(this, _limit) === 1) {
        boundNode = must(first(_class_private_field_get$2(this, _input6).fetch({
          start: {
            row: takeState.bound,
            basis: "at"
          },
          constraint
        })));
      } else {
        [boundNode, beforeBoundNode] = take(_class_private_field_get$2(this, _input6).fetch({
          start: {
            row: takeState.bound,
            basis: "at"
          },
          constraint,
          reverse: true
        }), 2);
      }
      const removeChange = {
        type: "remove",
        node: boundNode
      };
      _class_private_method_get(this, _setTakeState, setTakeState).call(this, takeStateKey, takeState.size, beforeBoundNode === void 0 || compareRows(change.node.row, beforeBoundNode.row) > 0 ? change.node.row : beforeBoundNode.row, maxBound);
      _class_private_method_get(this, _withRowHiddenFromFetch, withRowHiddenFromFetch).call(this, change.node.row, () => {
        _class_private_field_get$2(this, _output8).push(removeChange, this);
      });
      _class_private_field_get$2(this, _output8).push(change, this);
    } else if (change.type === "remove") {
      if (takeState.bound === void 0) {
        return;
      }
      const compToBound = compareRows(change.node.row, takeState.bound);
      if (compToBound > 0) {
        return;
      }
      const [beforeBoundNode] = take(_class_private_field_get$2(this, _input6).fetch({
        start: {
          row: takeState.bound,
          basis: "after"
        },
        constraint,
        reverse: true
      }), 1);
      let newBound;
      if (beforeBoundNode) {
        const push2 = compareRows(beforeBoundNode.row, takeState.bound) > 0;
        newBound = {
          node: beforeBoundNode,
          push: push2
        };
      }
      if (!newBound?.push) {
        for (const node of _class_private_field_get$2(this, _input6).fetch({
          start: {
            row: takeState.bound,
            basis: "at"
          },
          constraint
        })) {
          const push2 = compareRows(node.row, takeState.bound) > 0;
          newBound = {
            node,
            push: push2
          };
          if (push2) {
            break;
          }
        }
      }
      if (newBound?.push) {
        _class_private_field_get$2(this, _output8).push(change, this);
        _class_private_method_get(this, _setTakeState, setTakeState).call(this, takeStateKey, takeState.size, newBound.node.row, maxBound);
        _class_private_field_get$2(this, _output8).push({
          type: "add",
          node: newBound.node
        }, this);
        return;
      }
      _class_private_method_get(this, _setTakeState, setTakeState).call(this, takeStateKey, takeState.size - 1, newBound?.node.row, maxBound);
      _class_private_field_get$2(this, _output8).push(change, this);
    } else if (change.type === "child") {
      if (takeState.bound && compareRows(change.node.row, takeState.bound) <= 0) {
        _class_private_field_get$2(this, _output8).push(change, this);
      }
    }
  }
  destroy() {
    _class_private_field_get$2(this, _input6).destroy();
  }
  constructor(input, storage, limit, partitionKey) {
    _class_private_method_init(this, _initialFetch);
    _class_private_method_init(this, _getStateAndConstraint);
    _class_private_method_init(this, _pushEditChange);
    _class_private_method_init(this, _withRowHiddenFromFetch);
    _class_private_method_init(this, _setTakeState);
    _class_private_field_init$2(this, _input6, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _storage2, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _limit, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _partitionKey, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _partitionKeyComparator, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _rowHiddenFromFetch, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _output8, {
      writable: true,
      value: throwOutput
    });
    assert(limit >= 0, "Limit must be non-negative");
    assertOrderingIncludesPK(input.getSchema().sort, input.getSchema().primaryKey);
    input.setOutput(this);
    _class_private_field_set$2(this, _input6, input);
    _class_private_field_set$2(this, _storage2, storage);
    _class_private_field_set$2(this, _limit, limit);
    _class_private_field_set$2(this, _partitionKey, partitionKey);
    _class_private_field_set$2(this, _partitionKeyComparator, partitionKey && makePartitionKeyComparator(partitionKey));
  }
}, _class18);
function getTakeStateKey(partitionKey, rowOrConstraint) {
  const partitionValues = [];
  if (partitionKey && rowOrConstraint) {
    for (const key of partitionKey) {
      partitionValues.push(rowOrConstraint[key]);
    }
  }
  return JSON.stringify([
    "take",
    ...partitionValues
  ]);
}
function constraintMatchesPartitionKey(constraint, partitionKey) {
  if (constraint === void 0 || partitionKey === void 0) {
    return constraint === partitionKey;
  }
  if (partitionKey.length !== Object.keys(constraint).length) {
    return false;
  }
  for (const key of partitionKey) {
    if (!hasOwn(constraint, key)) {
      return false;
    }
  }
  return true;
}
function makePartitionKeyComparator(partitionKey) {
  return (a, b) => {
    for (const key of partitionKey) {
      const cmp2 = compareValues(a[key], b[key]);
      if (cmp2 !== 0) {
        return cmp2;
      }
    }
    return 0;
  };
}
var UnionFanIn = (_inputs1 = /* @__PURE__ */ new WeakMap(), _schema6 = /* @__PURE__ */ new WeakMap(), _fanOutPushStarted = /* @__PURE__ */ new WeakMap(), _output9 = /* @__PURE__ */ new WeakMap(), _accumulatedPushes1 = /* @__PURE__ */ new WeakMap(), _pushInternalChange = /* @__PURE__ */ new WeakSet(), _class19 = class {
  cleanup(_req) {
    return [];
  }
  destroy() {
    for (const input of _class_private_field_get$2(this, _inputs1)) {
      input.destroy();
    }
  }
  fetch(req) {
    const iterables = _class_private_field_get$2(this, _inputs1).map((input) => input.fetch(req));
    return mergeIterables(iterables, (l, r) => _class_private_field_get$2(this, _schema6).compareRows(l.row, r.row), true);
  }
  getSchema() {
    return _class_private_field_get$2(this, _schema6);
  }
  push(change, pusher2) {
    if (!_class_private_field_get$2(this, _fanOutPushStarted)) {
      _class_private_method_get(this, _pushInternalChange, pushInternalChange).call(this, change, pusher2);
    } else {
      _class_private_field_get$2(this, _accumulatedPushes1).push(change);
    }
  }
  fanOutStartedPushing() {
    assert(_class_private_field_get$2(this, _fanOutPushStarted) === false);
    _class_private_field_set$2(this, _fanOutPushStarted, true);
  }
  fanOutDonePushing(fanOutChangeType) {
    assert(_class_private_field_get$2(this, _fanOutPushStarted));
    _class_private_field_set$2(this, _fanOutPushStarted, false);
    if (_class_private_field_get$2(this, _inputs1).length === 0) {
      return;
    }
    if (_class_private_field_get$2(this, _accumulatedPushes1).length === 0) {
      return;
    }
    pushAccumulatedChanges(_class_private_field_get$2(this, _accumulatedPushes1), _class_private_field_get$2(this, _output9), this, fanOutChangeType, mergeRelationships, makeAddEmptyRelationships(_class_private_field_get$2(this, _schema6)));
  }
  setOutput(output) {
    _class_private_field_set$2(this, _output9, output);
  }
  constructor(fanOut, inputs) {
    _class_private_method_init(this, _pushInternalChange);
    _class_private_field_init$2(this, _inputs1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _schema6, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _fanOutPushStarted, {
      writable: true,
      value: false
    });
    _class_private_field_init$2(this, _output9, {
      writable: true,
      value: throwOutput
    });
    _class_private_field_init$2(this, _accumulatedPushes1, {
      writable: true,
      value: []
    });
    _class_private_field_set$2(this, _inputs1, inputs);
    const fanOutSchema = fanOut.getSchema();
    fanOut.setFanIn(this);
    const schema2 = {
      tableName: fanOutSchema.tableName,
      columns: fanOutSchema.columns,
      primaryKey: fanOutSchema.primaryKey,
      relationships: {
        ...fanOutSchema.relationships
      },
      isHidden: fanOutSchema.isHidden,
      system: fanOutSchema.system,
      compareRows: fanOutSchema.compareRows,
      sort: fanOutSchema.sort
    };
    const relationshipsFromBranches = /* @__PURE__ */ new Set();
    for (const input of inputs) {
      const inputSchema = input.getSchema();
      assert(schema2.tableName === inputSchema.tableName, `Table name mismatch in union fan-in: ${schema2.tableName} !== ${inputSchema.tableName}`);
      assert(schema2.primaryKey === inputSchema.primaryKey, `Primary key mismatch in union fan-in`);
      assert(schema2.system === inputSchema.system, `System mismatch in union fan-in: ${schema2.system} !== ${inputSchema.system}`);
      assert(schema2.compareRows === inputSchema.compareRows, `compareRows mismatch in union fan-in`);
      assert(schema2.sort === inputSchema.sort, `Sort mismatch in union fan-in`);
      for (const [relName, relSchema] of Object.entries(inputSchema.relationships)) {
        if (relName in fanOutSchema.relationships) {
          continue;
        }
        assert(!relationshipsFromBranches.has(relName), `Relationship ${relName} exists in multiple upstream inputs to union fan-in`);
        schema2.relationships[relName] = relSchema;
        relationshipsFromBranches.add(relName);
      }
      input.setOutput(this);
    }
    _class_private_field_set$2(this, _schema6, schema2);
    _class_private_field_set$2(this, _inputs1, inputs);
  }
}, _class19);
var UnionFanOut = (_destroyCount1 = /* @__PURE__ */ new WeakMap(), _unionFanIn = /* @__PURE__ */ new WeakMap(), _input7 = /* @__PURE__ */ new WeakMap(), _outputs1 = /* @__PURE__ */ new WeakMap(), class {
  setFanIn(fanIn) {
    assert(!_class_private_field_get$2(this, _unionFanIn), "FanIn already set for this FanOut");
    _class_private_field_set$2(this, _unionFanIn, fanIn);
  }
  push(change) {
    must(_class_private_field_get$2(this, _unionFanIn)).fanOutStartedPushing();
    for (const output of _class_private_field_get$2(this, _outputs1)) {
      output.push(change, this);
    }
    must(_class_private_field_get$2(this, _unionFanIn)).fanOutDonePushing(change.type);
  }
  setOutput(output) {
    _class_private_field_get$2(this, _outputs1).push(output);
  }
  getSchema() {
    return _class_private_field_get$2(this, _input7).getSchema();
  }
  fetch(req) {
    return _class_private_field_get$2(this, _input7).fetch(req);
  }
  cleanup(_req) {
    return [];
  }
  destroy() {
    if (_class_private_field_get$2(this, _destroyCount1) < _class_private_field_get$2(this, _outputs1).length) {
      ++_class_private_field_update(this, _destroyCount1).value;
      if (_class_private_field_get$2(this, _destroyCount1) === _class_private_field_get$2(this, _outputs1).length) {
        _class_private_field_get$2(this, _input7).destroy();
      }
    } else {
      throw new Error("FanOut already destroyed once for each output");
    }
  }
  constructor(input) {
    _class_private_field_init$2(this, _destroyCount1, {
      writable: true,
      value: 0
    });
    _class_private_field_init$2(this, _unionFanIn, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _input7, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _outputs1, {
      writable: true,
      value: []
    });
    _class_private_field_set$2(this, _input7, input);
    input.setOutput(this);
  }
});
var ExpressionBuilder = (_exists = /* @__PURE__ */ new WeakMap(), class {
  get eb() {
    return this;
  }
  cmp(field, opOrValue, value) {
    return cmp(field, opOrValue, value);
  }
  cmpLit(left, op, right) {
    return {
      type: "simple",
      left: isParameterReference(left) ? left[toStaticParam]() : {
        type: "literal",
        value: left
      },
      right: isParameterReference(right) ? right[toStaticParam]() : {
        type: "literal",
        value: right
      },
      op
    };
  }
  constructor(exists) {
    _class_private_field_init$2(this, _exists, {
      writable: true,
      value: void 0
    });
    _define_property$1(this, "and", and);
    _define_property$1(this, "or", or);
    _define_property$1(this, "not", not);
    _define_property$1(this, "exists", (relationship, cb, options) => _class_private_field_get$2(this, _exists).call(this, relationship, cb, options));
    _class_private_field_set$2(this, _exists, exists);
    this.exists = this.exists.bind(this);
  }
});
function and(...conditions) {
  const expressions = filterTrue(filterUndefined(conditions));
  if (expressions.length === 1) {
    return expressions[0];
  }
  if (expressions.some(isAlwaysFalse)) {
    return FALSE;
  }
  return {
    type: "and",
    conditions: expressions
  };
}
function or(...conditions) {
  const expressions = filterFalse(filterUndefined(conditions));
  if (expressions.length === 1) {
    return expressions[0];
  }
  if (expressions.some(isAlwaysTrue)) {
    return TRUE;
  }
  return {
    type: "or",
    conditions: expressions
  };
}
function not(expression) {
  switch (expression.type) {
    case "and":
      return {
        type: "or",
        conditions: expression.conditions.map(not)
      };
    case "or":
      return {
        type: "and",
        conditions: expression.conditions.map(not)
      };
    case "correlatedSubquery":
      return {
        type: "correlatedSubquery",
        related: expression.related,
        op: negateOperator(expression.op)
      };
    case "simple":
      return {
        type: "simple",
        op: negateOperator(expression.op),
        left: expression.left,
        right: expression.right
      };
  }
}
function cmp(field, opOrValue, value) {
  let op;
  if (value === void 0) {
    value = opOrValue;
    op = "=";
  } else {
    op = opOrValue;
  }
  return {
    type: "simple",
    left: {
      type: "column",
      name: field
    },
    right: isParameterReference(value) ? value[toStaticParam]() : {
      type: "literal",
      value
    },
    op
  };
}
function isParameterReference(value) {
  return value !== null && typeof value === "object" && value[toStaticParam];
}
var TRUE = {
  type: "and",
  conditions: []
};
var FALSE = {
  type: "or",
  conditions: []
};
function isAlwaysTrue(condition) {
  return condition.type === "and" && condition.conditions.length === 0;
}
function isAlwaysFalse(condition) {
  return condition.type === "or" && condition.conditions.length === 0;
}
function simplifyCondition(c) {
  if (c.type === "simple" || c.type === "correlatedSubquery") {
    return c;
  }
  if (c.conditions.length === 1) {
    return simplifyCondition(c.conditions[0]);
  }
  const conditions = flatten(c.type, c.conditions.map(simplifyCondition));
  if (c.type === "and" && conditions.some(isAlwaysFalse)) {
    return FALSE;
  }
  if (c.type === "or" && conditions.some(isAlwaysTrue)) {
    return TRUE;
  }
  return {
    type: c.type,
    conditions
  };
}
function flatten(type, conditions) {
  const flattened2 = [];
  for (const c of conditions) {
    if (c.type === type) {
      flattened2.push(...c.conditions);
    } else {
      flattened2.push(c);
    }
  }
  return flattened2;
}
var negateSimpleOperatorMap = {
  ["="]: "!=",
  ["!="]: "=",
  ["<"]: ">=",
  [">"]: "<=",
  [">="]: "<",
  ["<="]: ">",
  ["IN"]: "NOT IN",
  ["NOT IN"]: "IN",
  ["LIKE"]: "NOT LIKE",
  ["NOT LIKE"]: "LIKE",
  ["ILIKE"]: "NOT ILIKE",
  ["NOT ILIKE"]: "ILIKE",
  ["IS"]: "IS NOT",
  ["IS NOT"]: "IS"
};
var negateOperatorMap = {
  ...negateSimpleOperatorMap,
  ["EXISTS"]: "NOT EXISTS",
  ["NOT EXISTS"]: "EXISTS"
};
function negateOperator(op) {
  return must(negateOperatorMap[op]);
}
function filterUndefined(array9) {
  return array9.filter((e) => e !== void 0);
}
function filterTrue(conditions) {
  return conditions.filter((c) => !isAlwaysTrue(c));
}
function filterFalse(conditions) {
  return conditions.filter((c) => !isAlwaysFalse(c));
}
function getLikePredicate(pattern, flags) {
  const op = getLikeOp(String(pattern), flags);
  return (lhs) => {
    assertString(lhs);
    return op(String(lhs));
  };
}
function getLikeOp(pattern, flags) {
  if (!/_|%|\\/.test(pattern)) {
    if (flags === "i") {
      const rhsLower = pattern.toLowerCase();
      return (lhs) => lhs.toLowerCase() === rhsLower;
    }
    return (lhs) => lhs === pattern;
  }
  const re = patternToRegExp(pattern, flags);
  return (lhs) => re.test(lhs);
}
var specialCharsRe = /[$()*+.?[\]\\^{|}]/;
function patternToRegExp(source, flags = "") {
  let pattern = "^";
  for (let i = 0; i < source.length; i++) {
    let c = source[i];
    switch (c) {
      case "%":
        pattern += ".*";
        break;
      case "_":
        pattern += ".";
        break;
      // @ts-expect-error fallthrough
      case "\\":
        if (i === source.length - 1) {
          throw new Error("LIKE pattern must not end with escape character");
        }
        i++;
        c = source[i];
      // fall through
      default:
        if (specialCharsRe.test(c)) {
          pattern += "\\";
        }
        pattern += c;
        break;
    }
  }
  return new RegExp(pattern + "$", flags + "m");
}
function createPredicate(condition) {
  if (condition.type !== "simple") {
    const predicates = condition.conditions.map((c) => createPredicate(c));
    return condition.type === "and" ? (row) => {
      for (const predicate of predicates) {
        if (!predicate(row)) {
          return false;
        }
      }
      return true;
    } : (row) => {
      for (const predicate of predicates) {
        if (predicate(row)) {
          return true;
        }
      }
      return false;
    };
  }
  const { left } = condition;
  const { right } = condition;
  assert(right.type !== "static", "static values should be resolved before creating predicates");
  assert(left.type !== "static", "static values should be resolved before creating predicates");
  switch (condition.op) {
    case "IS":
    case "IS NOT": {
      const impl2 = createIsPredicate(right.value, condition.op);
      if (left.type === "literal") {
        const result = impl2(left.value);
        return () => result;
      }
      return (row) => impl2(row[left.name]);
    }
  }
  if (right.value === null || right.value === void 0) {
    return (_row) => false;
  }
  const impl = createPredicateImpl(right.value, condition.op);
  if (left.type === "literal") {
    if (left.value === null || left.value === void 0) {
      return (_row) => false;
    }
    const result = impl(left.value);
    return () => result;
  }
  return (row) => {
    const lhs = row[left.name];
    if (lhs === null || lhs === void 0) {
      return false;
    }
    return impl(lhs);
  };
}
function createIsPredicate(rhs, operator) {
  switch (operator) {
    case "IS":
      return (lhs) => lhs === rhs;
    case "IS NOT":
      return (lhs) => lhs !== rhs;
  }
}
function createPredicateImpl(rhs, operator) {
  switch (operator) {
    case "=":
      return (lhs) => lhs === rhs;
    case "!=":
      return (lhs) => lhs !== rhs;
    case "<":
      return (lhs) => lhs < rhs;
    case "<=":
      return (lhs) => lhs <= rhs;
    case ">":
      return (lhs) => lhs > rhs;
    case ">=":
      return (lhs) => lhs >= rhs;
    case "LIKE":
      return getLikePredicate(rhs, "");
    case "NOT LIKE":
      return not2(getLikePredicate(rhs, ""));
    case "ILIKE":
      return getLikePredicate(rhs, "i");
    case "NOT ILIKE":
      return not2(getLikePredicate(rhs, "i"));
    case "IN": {
      assert(Array.isArray(rhs));
      const set = new Set(rhs);
      return (lhs) => set.has(lhs);
    }
    case "NOT IN": {
      assert(Array.isArray(rhs));
      const set = new Set(rhs);
      return (lhs) => !set.has(lhs);
    }
    default:
      throw new Error(`Unexpected operator: ${operator}`);
  }
}
function not2(f) {
  return (lhs) => !f(lhs);
}
function transformFilters(filters) {
  if (!filters) {
    return {
      filters: void 0,
      conditionsRemoved: false
    };
  }
  switch (filters.type) {
    case "simple":
      return {
        filters,
        conditionsRemoved: false
      };
    case "correlatedSubquery":
      return {
        filters: void 0,
        conditionsRemoved: true
      };
    case "and":
    case "or": {
      const transformedConditions = [];
      let conditionsRemoved = false;
      for (const cond of filters.conditions) {
        const transformed = transformFilters(cond);
        if (transformed.filters === void 0 && filters.type === "or") {
          return {
            filters: void 0,
            conditionsRemoved: true
          };
        }
        conditionsRemoved = conditionsRemoved || transformed.conditionsRemoved;
        if (transformed.filters) {
          transformedConditions.push(transformed.filters);
        }
      }
      return {
        filters: simplifyCondition({
          type: filters.type,
          conditions: transformedConditions
        }),
        conditionsRemoved
      };
    }
    default:
      unreachable();
  }
}
function buildPipeline(ast, delegate, queryID) {
  ast = delegate.mapAst ? delegate.mapAst(ast) : ast;
  return buildPipelineInternal(ast, delegate, queryID, "");
}
var EXISTS_LIMIT = 3;
var PERMISSIONS_EXISTS_LIMIT = 1;
function buildPipelineInternal(ast, delegate, queryID, name, partitionKey) {
  const source = delegate.getSource(ast.table);
  if (!source) {
    throw new Error(`Source not found: ${ast.table}`);
  }
  ast = uniquifyCorrelatedSubqueryConditionAliases(ast);
  const csqConditions = gatherCorrelatedSubqueryQueryConditions(ast.where);
  const splitEditKeys = partitionKey ? new Set(partitionKey) : /* @__PURE__ */ new Set();
  const aliases = /* @__PURE__ */ new Set();
  for (const csq of csqConditions) {
    aliases.add(csq.related.subquery.alias || "");
    for (const key of csq.related.correlation.parentField) {
      splitEditKeys.add(key);
    }
  }
  if (ast.related) {
    for (const csq of ast.related) {
      for (const key of csq.correlation.parentField) {
        splitEditKeys.add(key);
      }
    }
  }
  const conn = source.connect(must(ast.orderBy), ast.where, splitEditKeys, delegate.debug);
  let end = delegate.decorateSourceInput(conn, queryID);
  end = delegate.decorateInput(end, `${name}:source(${ast.table})`);
  const { fullyAppliedFilters } = conn;
  if (ast.start) {
    const skip = new Skip(end, ast.start);
    delegate.addEdge(end, skip);
    end = delegate.decorateInput(skip, `${name}:skip)`);
  }
  for (const csqCondition of csqConditions) {
    if (!csqCondition.flip) {
      end = applyCorrelatedSubQuery({
        ...csqCondition.related,
        subquery: {
          ...csqCondition.related.subquery,
          limit: csqCondition.related.system === "permissions" ? PERMISSIONS_EXISTS_LIMIT : EXISTS_LIMIT
        }
      }, delegate, queryID, end, name, true);
    }
  }
  if (ast.where && (!fullyAppliedFilters || delegate.applyFiltersAnyway)) {
    end = applyWhere(end, ast.where, delegate, name);
  }
  if (ast.limit !== void 0) {
    const takeName = `${name}:take`;
    const take2 = new Take(end, delegate.createStorage(takeName), ast.limit, partitionKey);
    delegate.addEdge(end, take2);
    end = delegate.decorateInput(take2, takeName);
  }
  if (ast.related) {
    for (const csq of ast.related) {
      end = applyCorrelatedSubQuery(csq, delegate, queryID, end, name, false);
    }
  }
  return end;
}
function applyWhere(input, condition, delegate, name) {
  if (!conditionIncludesFlippedSubqueryAtAnyLevel(condition)) {
    return buildFilterPipeline(input, delegate, (filterInput) => applyFilter(filterInput, condition, delegate, name));
  }
  return applyFilterWithFlips(input, condition, delegate, name);
}
function applyFilterWithFlips(input, condition, delegate, name) {
  let end = input;
  assert(condition.type !== "simple", "Simple conditions cannot have flips");
  switch (condition.type) {
    case "and": {
      const [withFlipped, withoutFlipped] = partitionBranches(condition.conditions, conditionIncludesFlippedSubqueryAtAnyLevel);
      if (withoutFlipped.length > 0) {
        end = buildFilterPipeline(input, delegate, (filterInput) => applyAnd(filterInput, {
          conditions: withoutFlipped
        }, delegate, name));
      }
      assert(withFlipped.length > 0, "Impossible to have no flips here");
      for (const cond of withFlipped) {
        end = applyFilterWithFlips(end, cond, delegate, name);
      }
      break;
    }
    case "or": {
      const [withFlipped, withoutFlipped] = partitionBranches(condition.conditions, conditionIncludesFlippedSubqueryAtAnyLevel);
      assert(withFlipped.length > 0, "Impossible to have no flips here");
      const ufo = new UnionFanOut(end);
      delegate.addEdge(end, ufo);
      end = delegate.decorateInput(ufo, `${name}:ufo`);
      const branches = [];
      if (withoutFlipped.length > 0) {
        branches.push(buildFilterPipeline(end, delegate, (filterInput) => applyOr(filterInput, {
          conditions: withoutFlipped
        }, delegate, name)));
      }
      for (const cond of withFlipped) {
        branches.push(applyFilterWithFlips(end, cond, delegate, name));
      }
      const ufi = new UnionFanIn(ufo, branches);
      for (const branch of branches) {
        delegate.addEdge(branch, ufi);
      }
      end = delegate.decorateInput(ufi, `${name}:ufi`);
      break;
    }
    case "correlatedSubquery": {
      const sq = condition.related;
      const child = buildPipelineInternal(sq.subquery, delegate, "", `${name}.${sq.subquery.alias}`, sq.correlation.childField);
      const flippedJoin = new FlippedJoin({
        parent: end,
        child,
        parentKey: sq.correlation.parentField,
        childKey: sq.correlation.childField,
        relationshipName: must(sq.subquery.alias, "Subquery must have an alias"),
        hidden: sq.hidden ?? false,
        system: sq.system ?? "client"
      });
      delegate.addEdge(end, flippedJoin);
      delegate.addEdge(child, flippedJoin);
      end = delegate.decorateInput(flippedJoin, `${name}:flipped-join(${sq.subquery.alias})`);
      break;
    }
  }
  return end;
}
function applyFilter(input, condition, delegate, name) {
  switch (condition.type) {
    case "and":
      return applyAnd(input, condition, delegate, name);
    case "or":
      return applyOr(input, condition, delegate, name);
    case "correlatedSubquery":
      return applyCorrelatedSubqueryCondition(input, condition, delegate, name);
    case "simple":
      return applySimpleCondition(input, delegate, condition);
  }
}
function applyAnd(input, condition, delegate, name) {
  for (const subCondition of condition.conditions) {
    input = applyFilter(input, subCondition, delegate, name);
  }
  return input;
}
function applyOr(input, condition, delegate, name) {
  const [subqueryConditions, otherConditions] = groupSubqueryConditions(condition);
  if (subqueryConditions.length === 0) {
    const filter2 = new Filter(input, createPredicate({
      type: "or",
      conditions: otherConditions
    }));
    delegate.addEdge(input, filter2);
    return filter2;
  }
  const fanOut = new FanOut(input);
  delegate.addEdge(input, fanOut);
  const branches = subqueryConditions.map((subCondition) => applyFilter(fanOut, subCondition, delegate, name));
  if (otherConditions.length > 0) {
    const filter2 = new Filter(fanOut, createPredicate({
      type: "or",
      conditions: otherConditions
    }));
    delegate.addEdge(fanOut, filter2);
    branches.push(filter2);
  }
  const ret = new FanIn(fanOut, branches);
  for (const branch of branches) {
    delegate.addEdge(branch, ret);
  }
  fanOut.setFanIn(ret);
  return ret;
}
function groupSubqueryConditions(condition) {
  const partitioned = [
    [],
    []
  ];
  for (const subCondition of condition.conditions) {
    if (isNotAndDoesNotContainSubquery(subCondition)) {
      partitioned[1].push(subCondition);
    } else {
      partitioned[0].push(subCondition);
    }
  }
  return partitioned;
}
function isNotAndDoesNotContainSubquery(condition) {
  if (condition.type === "correlatedSubquery") {
    return false;
  }
  if (condition.type === "simple") {
    return true;
  }
  return condition.conditions.every(isNotAndDoesNotContainSubquery);
}
function applySimpleCondition(input, delegate, condition) {
  const filter2 = new Filter(input, createPredicate(condition));
  delegate.decorateFilterInput(filter2, `${valuePosName(condition.left)}:${condition.op}:${valuePosName(condition.right)}`);
  delegate.addEdge(input, filter2);
  return filter2;
}
function valuePosName(left) {
  switch (left.type) {
    case "static":
      return left.field;
    case "literal":
      return left.value;
    case "column":
      return left.name;
  }
}
function applyCorrelatedSubQuery(sq, delegate, queryID, end, name, fromCondition) {
  if (sq.subquery.limit === 0 && fromCondition) {
    return end;
  }
  assert(sq.subquery.alias, "Subquery must have an alias");
  const child = buildPipelineInternal(sq.subquery, delegate, queryID, `${name}.${sq.subquery.alias}`, sq.correlation.childField);
  const joinName = `${name}:join(${sq.subquery.alias})`;
  const join = new Join({
    parent: end,
    child,
    storage: delegate.createStorage(joinName),
    parentKey: sq.correlation.parentField,
    childKey: sq.correlation.childField,
    relationshipName: sq.subquery.alias,
    hidden: sq.hidden ?? false,
    system: sq.system ?? "client"
  });
  delegate.addEdge(end, join);
  delegate.addEdge(child, join);
  return delegate.decorateInput(join, joinName);
}
function applyCorrelatedSubqueryCondition(input, condition, delegate, name) {
  assert(condition.op === "EXISTS" || condition.op === "NOT EXISTS");
  if (condition.related.subquery.limit === 0) {
    if (condition.op === "EXISTS") {
      const filter22 = new Filter(input, () => false);
      delegate.addEdge(input, filter22);
      return filter22;
    }
    const filter2 = new Filter(input, () => true);
    delegate.addEdge(input, filter2);
    return filter2;
  }
  const existsName = `${name}:exists(${condition.related.subquery.alias})`;
  const exists = new Exists(input, delegate.createStorage(existsName), must(condition.related.subquery.alias), condition.related.correlation.parentField, condition.op);
  delegate.addEdge(input, exists);
  return delegate.decorateFilterInput(exists, existsName);
}
function gatherCorrelatedSubqueryQueryConditions(condition) {
  const csqs = [];
  const gather = (condition2) => {
    if (condition2.type === "correlatedSubquery") {
      csqs.push(condition2);
      return;
    }
    if (condition2.type === "and" || condition2.type === "or") {
      for (const c of condition2.conditions) {
        gather(c);
      }
      return;
    }
  };
  if (condition) {
    gather(condition);
  }
  return csqs;
}
function assertOrderingIncludesPK(ordering, pk) {
  const orderingFields = ordering.map(([field]) => field);
  const missingFields = pk.filter((pkField) => !orderingFields.includes(pkField));
  if (missingFields.length > 0) {
    throw new Error(`Ordering must include all primary key fields. Missing: ${missingFields.join(", ")}. ZQL automatically appends primary key fields to the ordering if they are missing 
      so a common cause of this error is a casing mismatch between Postgres and ZQL.
      E.g., "userid" vs "userID".
      You may want to add double-quotes around your Postgres column names to prevent Postgres from lower-casing them:
      https://www.postgresql.org/docs/current/sql-syntax-lexical.htm`);
  }
}
function uniquifyCorrelatedSubqueryConditionAliases(ast) {
  if (!ast.where) {
    return ast;
  }
  const { where } = ast;
  if (where.type !== "and" && where.type !== "or") {
    return ast;
  }
  let count = 0;
  const uniquifyCorrelatedSubquery = (csqc) => ({
    ...csqc,
    related: {
      ...csqc.related,
      subquery: {
        ...csqc.related.subquery,
        alias: (csqc.related.subquery.alias ?? "") + "_" + count++
      }
    }
  });
  const uniquify = (cond) => {
    if (cond.type === "simple") {
      return cond;
    } else if (cond.type === "correlatedSubquery") {
      return uniquifyCorrelatedSubquery(cond);
    }
    const conditions = [];
    for (const c of cond.conditions) {
      conditions.push(uniquify(c));
    }
    return {
      type: cond.type,
      conditions
    };
  };
  const result = {
    ...ast,
    where: uniquify(where)
  };
  return result;
}
function conditionIncludesFlippedSubqueryAtAnyLevel(cond) {
  if (cond.type === "correlatedSubquery") {
    return !!cond.flip;
  }
  if (cond.type === "and" || cond.type === "or") {
    return cond.conditions.some((c) => conditionIncludesFlippedSubqueryAtAnyLevel(c));
  }
  return false;
}
function partitionBranches(conditions, predicate) {
  const matched = [];
  const notMatched = [];
  for (const c of conditions) {
    if (predicate(c)) {
      matched.push(c);
    } else {
      notMatched.push(c);
    }
  }
  return [
    matched,
    notMatched
  ];
}
var NotImplementedError = class extends Error {
  constructor(message2) {
    super(message2);
    this.name = "NotImplementedError";
  }
};
var ArrayView = (_input8 = /* @__PURE__ */ new WeakMap(), _listeners = /* @__PURE__ */ new WeakMap(), _schema7 = /* @__PURE__ */ new WeakMap(), _format$1 = /* @__PURE__ */ new WeakMap(), _root = /* @__PURE__ */ new WeakMap(), _dirty = /* @__PURE__ */ new WeakMap(), _resultType = /* @__PURE__ */ new WeakMap(), _error = /* @__PURE__ */ new WeakMap(), _updateTTL = /* @__PURE__ */ new WeakMap(), _fireListeners = /* @__PURE__ */ new WeakSet(), _fireListener = /* @__PURE__ */ new WeakSet(), _hydrate = /* @__PURE__ */ new WeakSet(), _class20 = class {
  get data() {
    return _class_private_field_get$2(this, _root)[""];
  }
  addListener(listener) {
    assert(!_class_private_field_get$2(this, _listeners).has(listener), "Listener already registered");
    _class_private_field_get$2(this, _listeners).add(listener);
    _class_private_method_get(this, _fireListener, fireListener).call(this, listener);
    return () => {
      _class_private_field_get$2(this, _listeners).delete(listener);
    };
  }
  destroy() {
    this.onDestroy?.();
  }
  push(change) {
    _class_private_field_set$2(this, _dirty, true);
    applyChange(_class_private_field_get$2(this, _root), change, _class_private_field_get$2(this, _schema7), "", _class_private_field_get$2(this, _format$1));
  }
  flush() {
    if (!_class_private_field_get$2(this, _dirty)) {
      return;
    }
    _class_private_field_set$2(this, _dirty, false);
    _class_private_method_get(this, _fireListeners, fireListeners).call(this);
  }
  updateTTL(ttl) {
    _class_private_field_get$2(this, _updateTTL).call(this, ttl);
  }
  constructor(input, format, queryComplete, updateTTL) {
    _class_private_method_init(this, _fireListeners);
    _class_private_method_init(this, _fireListener);
    _class_private_method_init(this, _hydrate);
    _class_private_field_init$2(this, _input8, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _listeners, {
      writable: true,
      value: /* @__PURE__ */ new Set()
    });
    _class_private_field_init$2(this, _schema7, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _format$1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _root, {
      writable: true,
      value: void 0
    });
    _define_property$1(this, "onDestroy", void 0);
    _class_private_field_init$2(this, _dirty, {
      writable: true,
      value: false
    });
    _class_private_field_init$2(this, _resultType, {
      writable: true,
      value: "unknown"
    });
    _class_private_field_init$2(this, _error, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _updateTTL, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _input8, input);
    _class_private_field_set$2(this, _schema7, input.getSchema());
    _class_private_field_set$2(this, _format$1, format);
    _class_private_field_set$2(this, _updateTTL, updateTTL);
    _class_private_field_set$2(this, _root, {
      "": format.singular ? void 0 : []
    });
    input.setOutput(this);
    if (queryComplete === true) {
      _class_private_field_set$2(this, _resultType, "complete");
    } else if ("error" in queryComplete) {
      _class_private_field_set$2(this, _resultType, "error");
      _class_private_field_set$2(this, _error, queryComplete);
    } else {
      void queryComplete.then(() => {
        _class_private_field_set$2(this, _resultType, "complete");
        _class_private_method_get(this, _fireListeners, fireListeners).call(this);
      }).catch((e) => {
        _class_private_field_set$2(this, _resultType, "error");
        _class_private_field_set$2(this, _error, e);
        _class_private_method_get(this, _fireListeners, fireListeners).call(this);
      });
    }
    _class_private_method_get(this, _hydrate, hydrate).call(this);
  }
}, _class20);
var defaultFormat = {
  singular: false,
  relationships: {}
};
function assertNoNotExists(condition) {
  switch (condition.type) {
    case "simple":
      return;
    case "correlatedSubquery":
      if (condition.op === "NOT EXISTS") {
        throw new Error("not(exists()) is not supported on the client - see https://bugs.rocicorp.dev/issue/3438");
      }
      if (condition.related.subquery.where) {
        assertNoNotExists(condition.related.subquery.where);
      }
      return;
    case "and":
    case "or":
      for (const c of condition.conditions) {
        assertNoNotExists(c);
      }
      return;
    default:
      unreachable();
  }
}
var delegateSymbol = Symbol("delegate");
function materialize(query, delegate, factoryOrOptions, maybeOptions) {
  if (typeof factoryOrOptions === "function") {
    return query[delegateSymbol](delegate).materialize(factoryOrOptions, maybeOptions?.ttl);
  }
  return query[delegateSymbol](delegate).materialize(factoryOrOptions?.ttl);
}
var astSymbol = Symbol();
function newQuery(delegate, schema2, table2) {
  return new QueryImpl(delegate, schema2, table2, {
    table: table2
  }, defaultFormat, void 0);
}
var newQuerySymbol = Symbol();
var AbstractQuery = (_schema8 = /* @__PURE__ */ new WeakMap(), _tableName = /* @__PURE__ */ new WeakMap(), _hash = /* @__PURE__ */ new WeakMap(), _system = /* @__PURE__ */ new WeakMap(), _currentJunction = /* @__PURE__ */ new WeakMap(), _completedAST = /* @__PURE__ */ new WeakMap(), _delegateSymbol = delegateSymbol, _astSymbol = astSymbol, class {
  [_delegateSymbol](delegate) {
    return this[newQuerySymbol](delegate, _class_private_field_get$2(this, _schema8), _class_private_field_get$2(this, _tableName), this._ast, this.format, this.customQueryID, _class_private_field_get$2(this, _currentJunction));
  }
  nameAndArgs(name, args) {
    return this[newQuerySymbol](this._delegate, _class_private_field_get$2(this, _schema8), _class_private_field_get$2(this, _tableName), this._ast, this.format, {
      name,
      args
    }, _class_private_field_get$2(this, _currentJunction));
  }
  get [_astSymbol]() {
    return this._ast;
  }
  get ast() {
    return this._completeAst();
  }
  hash() {
    if (!_class_private_field_get$2(this, _hash)) {
      _class_private_field_set$2(this, _hash, hashOfAST(this._completeAst()));
    }
    return _class_private_field_get$2(this, _hash);
  }
  _completeAst() {
    if (!_class_private_field_get$2(this, _completedAST)) {
      const finalOrderBy = addPrimaryKeys(_class_private_field_get$2(this, _schema8).tables[_class_private_field_get$2(this, _tableName)], this._ast.orderBy);
      if (this._ast.start) {
        const { row } = this._ast.start;
        const narrowedRow = {};
        for (const [field] of finalOrderBy) {
          narrowedRow[field] = row[field];
        }
        _class_private_field_set$2(this, _completedAST, {
          ...this._ast,
          start: {
            ...this._ast.start,
            row: narrowedRow
          },
          orderBy: finalOrderBy
        });
      } else {
        _class_private_field_set$2(this, _completedAST, {
          ...this._ast,
          orderBy: addPrimaryKeys(_class_private_field_get$2(this, _schema8).tables[_class_private_field_get$2(this, _tableName)], this._ast.orderBy)
        });
      }
    }
    return _class_private_field_get$2(this, _completedAST);
  }
  constructor(delegate, schema2, tableName, ast, format, system, customQueryID, currentJunction) {
    _class_private_field_init$2(this, _schema8, {
      writable: true,
      value: void 0
    });
    _define_property$1(this, "_delegate", void 0);
    _class_private_field_init$2(this, _tableName, {
      writable: true,
      value: void 0
    });
    _define_property$1(this, "_ast", void 0);
    _define_property$1(this, "format", void 0);
    _class_private_field_init$2(this, _hash, {
      writable: true,
      value: ""
    });
    _class_private_field_init$2(this, _system, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _currentJunction, {
      writable: true,
      value: void 0
    });
    _define_property$1(this, "customQueryID", void 0);
    _define_property$1(this, "one", () => this[newQuerySymbol](this._delegate, _class_private_field_get$2(this, _schema8), _class_private_field_get$2(this, _tableName), {
      ...this._ast,
      limit: 1
    }, {
      ...this.format,
      singular: true
    }, this.customQueryID, _class_private_field_get$2(this, _currentJunction)));
    _define_property$1(this, "whereExists", (relationship, cbOrOptions, options) => {
      const cb = typeof cbOrOptions === "function" ? cbOrOptions : void 0;
      const opts = typeof cbOrOptions === "function" ? options : cbOrOptions;
      const flipped = opts?.flip ?? false;
      return this.where(({ exists }) => exists(relationship, cb, {
        flip: flipped
      }));
    });
    _define_property$1(this, "related", (relationship, cb) => {
      if (relationship.startsWith(SUBQ_PREFIX)) {
        throw new Error(`Relationship names may not start with "${SUBQ_PREFIX}". That is a reserved prefix.`);
      }
      cb = cb ?? ((q) => q);
      const related = _class_private_field_get$2(this, _schema8).relationships[_class_private_field_get$2(this, _tableName)][relationship];
      assert(related, "Invalid relationship");
      if (isOneHop(related)) {
        const { destSchema, destField, sourceField, cardinality } = related[0];
        const q = this[newQuerySymbol](this._delegate, _class_private_field_get$2(this, _schema8), destSchema, {
          table: destSchema,
          alias: relationship
        }, {
          relationships: {},
          singular: cardinality === "one"
        }, this.customQueryID, void 0);
        const sq = cb(q);
        assert(isCompoundKey(sourceField), "The source of a relationship must specify at last 1 field");
        assert(isCompoundKey(destField), "The destination of a relationship must specify at last 1 field");
        assert(sourceField.length === destField.length, "The source and destination of a relationship must have the same number of fields");
        return this[newQuerySymbol](this._delegate, _class_private_field_get$2(this, _schema8), _class_private_field_get$2(this, _tableName), {
          ...this._ast,
          related: [
            ...this._ast.related ?? [],
            {
              system: _class_private_field_get$2(this, _system),
              correlation: {
                parentField: sourceField,
                childField: destField
              },
              subquery: addPrimaryKeysToAst(_class_private_field_get$2(this, _schema8).tables[destSchema], sq._ast)
            }
          ]
        }, {
          ...this.format,
          relationships: {
            ...this.format.relationships,
            [relationship]: sq.format
          }
        }, this.customQueryID, _class_private_field_get$2(this, _currentJunction));
      }
      if (isTwoHop(related)) {
        const [firstRelation, secondRelation] = related;
        const { destSchema } = secondRelation;
        const junctionSchema = firstRelation.destSchema;
        const sq = cb(this[newQuerySymbol](this._delegate, _class_private_field_get$2(this, _schema8), destSchema, {
          table: destSchema,
          alias: relationship
        }, {
          relationships: {},
          singular: secondRelation.cardinality === "one"
        }, this.customQueryID, relationship));
        assert(isCompoundKey(firstRelation.sourceField), "Invalid relationship");
        assert(isCompoundKey(firstRelation.destField), "Invalid relationship");
        assert(isCompoundKey(secondRelation.sourceField), "Invalid relationship");
        assert(isCompoundKey(secondRelation.destField), "Invalid relationship");
        return this[newQuerySymbol](this._delegate, _class_private_field_get$2(this, _schema8), _class_private_field_get$2(this, _tableName), {
          ...this._ast,
          related: [
            ...this._ast.related ?? [],
            {
              system: _class_private_field_get$2(this, _system),
              correlation: {
                parentField: firstRelation.sourceField,
                childField: firstRelation.destField
              },
              hidden: true,
              subquery: {
                table: junctionSchema,
                alias: relationship,
                orderBy: addPrimaryKeys(_class_private_field_get$2(this, _schema8).tables[junctionSchema], void 0),
                related: [
                  {
                    system: _class_private_field_get$2(this, _system),
                    correlation: {
                      parentField: secondRelation.sourceField,
                      childField: secondRelation.destField
                    },
                    subquery: addPrimaryKeysToAst(_class_private_field_get$2(this, _schema8).tables[destSchema], sq._ast)
                  }
                ]
              }
            }
          ]
        }, {
          ...this.format,
          relationships: {
            ...this.format.relationships,
            [relationship]: sq.format
          }
        }, this.customQueryID, _class_private_field_get$2(this, _currentJunction));
      }
      throw new Error(`Invalid relationship ${relationship}`);
    });
    _define_property$1(this, "where", (fieldOrExpressionFactory, opOrValue, value) => {
      let cond;
      if (typeof fieldOrExpressionFactory === "function") {
        cond = fieldOrExpressionFactory(new ExpressionBuilder(this._exists));
      } else {
        assert(opOrValue !== void 0, "Invalid condition");
        cond = cmp(fieldOrExpressionFactory, opOrValue, value);
      }
      const existingWhere = this._ast.where;
      if (existingWhere) {
        cond = and(existingWhere, cond);
      }
      const where = simplifyCondition(cond);
      if (_class_private_field_get$2(this, _system) === "client") {
        assertNoNotExists(where);
      }
      return this[newQuerySymbol](this._delegate, _class_private_field_get$2(this, _schema8), _class_private_field_get$2(this, _tableName), {
        ...this._ast,
        where
      }, this.format, this.customQueryID, _class_private_field_get$2(this, _currentJunction));
    });
    _define_property$1(this, "start", (row, opts) => this[newQuerySymbol](this._delegate, _class_private_field_get$2(this, _schema8), _class_private_field_get$2(this, _tableName), {
      ...this._ast,
      start: {
        row,
        exclusive: !opts?.inclusive
      }
    }, this.format, this.customQueryID, _class_private_field_get$2(this, _currentJunction)));
    _define_property$1(this, "limit", (limit) => {
      if (limit < 0) {
        throw new Error("Limit must be non-negative");
      }
      if ((limit | 0) !== limit) {
        throw new Error("Limit must be an integer");
      }
      if (_class_private_field_get$2(this, _currentJunction)) {
        throw new NotImplementedError("Limit is not supported in junction relationships yet. Junction relationship being limited: " + _class_private_field_get$2(this, _currentJunction));
      }
      return this[newQuerySymbol](this._delegate, _class_private_field_get$2(this, _schema8), _class_private_field_get$2(this, _tableName), {
        ...this._ast,
        limit
      }, this.format, this.customQueryID, _class_private_field_get$2(this, _currentJunction));
    });
    _define_property$1(this, "orderBy", (field, direction) => {
      if (_class_private_field_get$2(this, _currentJunction)) {
        throw new NotImplementedError("Order by is not supported in junction relationships yet. Junction relationship being ordered: " + _class_private_field_get$2(this, _currentJunction));
      }
      return this[newQuerySymbol](this._delegate, _class_private_field_get$2(this, _schema8), _class_private_field_get$2(this, _tableName), {
        ...this._ast,
        orderBy: [
          ...this._ast.orderBy ?? [],
          [
            field,
            direction
          ]
        ]
      }, this.format, this.customQueryID, _class_private_field_get$2(this, _currentJunction));
    });
    _define_property$1(this, "_exists", (relationship, cb, options) => {
      cb = cb ?? ((q) => q);
      const flip = options?.flip ?? false;
      const related = _class_private_field_get$2(this, _schema8).relationships[_class_private_field_get$2(this, _tableName)][relationship];
      assert(related, "Invalid relationship");
      if (isOneHop(related)) {
        const { destSchema, sourceField, destField } = related[0];
        assert(isCompoundKey(sourceField), "Invalid relationship");
        assert(isCompoundKey(destField), "Invalid relationship");
        const sq = cb(this[newQuerySymbol](this._delegate, _class_private_field_get$2(this, _schema8), destSchema, {
          table: destSchema,
          alias: `${SUBQ_PREFIX}${relationship}`
        }, defaultFormat, this.customQueryID, void 0));
        return {
          type: "correlatedSubquery",
          related: {
            system: _class_private_field_get$2(this, _system),
            correlation: {
              parentField: sourceField,
              childField: destField
            },
            subquery: addPrimaryKeysToAst(_class_private_field_get$2(this, _schema8).tables[destSchema], sq._ast)
          },
          op: "EXISTS",
          flip
        };
      }
      if (isTwoHop(related)) {
        const [firstRelation, secondRelation] = related;
        assert(isCompoundKey(firstRelation.sourceField), "Invalid relationship");
        assert(isCompoundKey(firstRelation.destField), "Invalid relationship");
        assert(isCompoundKey(secondRelation.sourceField), "Invalid relationship");
        assert(isCompoundKey(secondRelation.destField), "Invalid relationship");
        const { destSchema } = secondRelation;
        const junctionSchema = firstRelation.destSchema;
        const queryToDest = cb(this[newQuerySymbol](this._delegate, _class_private_field_get$2(this, _schema8), destSchema, {
          table: destSchema,
          alias: `${SUBQ_PREFIX}zhidden_${relationship}`
        }, defaultFormat, this.customQueryID, relationship));
        return {
          type: "correlatedSubquery",
          related: {
            system: _class_private_field_get$2(this, _system),
            correlation: {
              parentField: firstRelation.sourceField,
              childField: firstRelation.destField
            },
            subquery: {
              table: junctionSchema,
              alias: `${SUBQ_PREFIX}${relationship}`,
              orderBy: addPrimaryKeys(_class_private_field_get$2(this, _schema8).tables[junctionSchema], void 0),
              where: {
                type: "correlatedSubquery",
                related: {
                  system: _class_private_field_get$2(this, _system),
                  correlation: {
                    parentField: secondRelation.sourceField,
                    childField: secondRelation.destField
                  },
                  subquery: addPrimaryKeysToAst(_class_private_field_get$2(this, _schema8).tables[destSchema], queryToDest._ast)
                },
                op: "EXISTS",
                flip
              }
            }
          },
          op: "EXISTS",
          flip
        };
      }
      throw new Error(`Invalid relationship ${relationship}`);
    });
    _class_private_field_init$2(this, _completedAST, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _schema8, schema2);
    this._delegate = delegate;
    _class_private_field_set$2(this, _tableName, tableName);
    this._ast = ast;
    this.format = format;
    _class_private_field_set$2(this, _system, system);
    _class_private_field_set$2(this, _currentJunction, currentJunction);
    this.customQueryID = customQueryID;
  }
});
var completedAstSymbol = Symbol();
var QueryImpl = (_system1 = /* @__PURE__ */ new WeakMap(), _completedAstSymbol = completedAstSymbol, _newQuerySymbol = newQuerySymbol, class _QueryImpl extends AbstractQuery {
  get [_completedAstSymbol]() {
    return this._completeAst();
  }
  [_newQuerySymbol](delegate, schema2, tableName, ast, format, customQueryID, currentJunction) {
    return new _QueryImpl(delegate, schema2, tableName, ast, format, _class_private_field_get$2(this, _system1), customQueryID, currentJunction);
  }
  materialize(factoryOrTTL, ttl = DEFAULT_TTL_MS) {
    const delegate = must(this._delegate, "materialize requires a query delegate to be set");
    let factory;
    if (typeof factoryOrTTL === "function") {
      factory = factoryOrTTL;
    } else {
      ttl = factoryOrTTL ?? DEFAULT_TTL_MS;
    }
    const ast = this._completeAst();
    const queryID = this.customQueryID ? hashOfNameAndArgs(this.customQueryID.name, this.customQueryID.args) : this.hash();
    const queryCompleteResolver = resolver();
    let queryComplete = delegate.defaultQueryComplete;
    const updateTTL = (newTTL) => {
      this.customQueryID ? delegate.updateCustomQuery(this.customQueryID, newTTL) : delegate.updateServerQuery(ast, newTTL);
    };
    const gotCallback = (got, error) => {
      if (error) {
        queryCompleteResolver.reject(error);
        queryComplete = error;
        return;
      }
      if (got) {
        delegate.addMetric("query-materialization-end-to-end", performance.now() - t0, queryID, ast);
        queryComplete = true;
        queryCompleteResolver.resolve(true);
      }
    };
    let removeCommitObserver;
    const onDestroy = () => {
      input.destroy();
      removeCommitObserver?.();
      removeAddedQuery();
    };
    const t0 = performance.now();
    const removeAddedQuery = this.customQueryID ? delegate.addCustomQuery(ast, this.customQueryID, ttl, gotCallback) : delegate.addServerQuery(ast, ttl, gotCallback);
    const input = buildPipeline(ast, delegate, queryID);
    const view = delegate.batchViewUpdates(() => (factory ?? arrayViewFactory)(this, input, this.format, onDestroy, (cb) => {
      removeCommitObserver = delegate.onTransactionCommit(cb);
    }, queryComplete || queryCompleteResolver.promise, updateTTL));
    delegate.addMetric("query-materialization-client", performance.now() - t0, queryID);
    return view;
  }
  run(options) {
    const delegate = must(this._delegate, "run requires a query delegate to be set");
    delegate.assertValidRunOptions(options);
    const v1 = this.materialize(options?.ttl);
    if (options?.type === "complete") {
      return new Promise((resolve) => {
        v1.addListener((data, type) => {
          if (type === "complete") {
            v1.destroy();
            resolve(data);
          } else if (type === "error") {
            v1.destroy();
            resolve(Promise.reject(data));
          }
        });
      });
    }
    options?.type;
    const ret = v1.data;
    v1.destroy();
    return Promise.resolve(ret);
  }
  preload(options) {
    const delegate = must(this._delegate, "preload requires a query delegate to be set");
    const ttl = options?.ttl ?? DEFAULT_PRELOAD_TTL_MS;
    const ast = this._completeAst();
    const { resolve, promise: complete } = resolver();
    if (this.customQueryID) {
      const cleanup22 = delegate.addCustomQuery(ast, this.customQueryID, ttl, (got) => {
        if (got) {
          resolve();
        }
      });
      return {
        cleanup: cleanup22,
        complete
      };
    }
    const cleanup2 = delegate.addServerQuery(ast, ttl, (got) => {
      if (got) {
        resolve();
      }
    });
    return {
      cleanup: cleanup2,
      complete
    };
  }
  constructor(delegate, schema2, tableName, ast = {
    table: tableName
  }, format = defaultFormat, system = "client", customQueryID, currentJunction) {
    super(delegate, schema2, tableName, ast, format, system, customQueryID, currentJunction), _class_private_field_init$2(this, _system1, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _system1, system);
  }
});
function addPrimaryKeys(schema2, orderBy) {
  orderBy = orderBy ?? [];
  const { primaryKey } = schema2;
  const primaryKeysToAdd = new Set(primaryKey);
  for (const [field] of orderBy) {
    primaryKeysToAdd.delete(field);
  }
  if (primaryKeysToAdd.size === 0) {
    return orderBy;
  }
  return [
    ...orderBy,
    ...[
      ...primaryKeysToAdd
    ].map((key) => [
      key,
      "asc"
    ])
  ];
}
function addPrimaryKeysToAst(schema2, ast) {
  return {
    ...ast,
    orderBy: addPrimaryKeys(schema2, ast.orderBy)
  };
}
function arrayViewFactory(_query2, input, format, onDestroy, onTransactionCommit, queryComplete, updateTTL) {
  const v1 = new ArrayView(input, format, queryComplete, updateTTL);
  v1.onDestroy = onDestroy;
  onTransactionCommit(() => {
    v1.flush();
  });
  return v1;
}
function isCompoundKey(field) {
  return Array.isArray(field) && field.length >= 1;
}
function isOneHop(r) {
  return r.length === 1;
}
function isTwoHop(r) {
  return r.length === 2;
}
function send(ws, data) {
  ws.send(JSON.stringify(data));
}
var keyPrefix = "zero-active";
function toLockName(clientGroupID, clientID) {
  return `${keyPrefix}/${clientGroupID}/${clientID}`;
}
function toBroadcastChannelName(clientGroupID) {
  return `${keyPrefix}/${clientGroupID}`;
}
function fromLockName(lockKey) {
  if (!lockKey || !lockKey.startsWith(keyPrefix)) {
    return void 0;
  }
  const parts = lockKey.slice(keyPrefix.length).split("/");
  if (parts.length !== 3) {
    return void 0;
  }
  return {
    clientGroupID: parts[1],
    clientID: parts[2]
  };
}
function ignoreAbortError(e) {
  if (e instanceof Error && e.name === "AbortError") {
    return;
  }
  throw e;
}
var ActiveClientsManager = (_resolver = /* @__PURE__ */ new WeakMap(), _lockManager = /* @__PURE__ */ new WeakMap(), _activeClients = /* @__PURE__ */ new WeakMap(), _init = /* @__PURE__ */ new WeakSet(), _getActiveClients = /* @__PURE__ */ new WeakSet(), _addSharedLockForOtherClient = /* @__PURE__ */ new WeakSet(), _addClient = /* @__PURE__ */ new WeakSet(), _removeClient = /* @__PURE__ */ new WeakSet(), __ActiveClientsManager = class _ActiveClientsManager {
  /**
  * Creates an instance of `ActiveClientsManager` for the specified client
  * group and client ID. It will return a promise that resolves when the
  * instance is ready to use, which means that it has successfully acquired the
  * exclusive lock for the client and has retrieved the list of active clients.
  */
  static async create(clientGroupID, clientID, signal) {
    const instance = new _ActiveClientsManager(clientGroupID, clientID, signal);
    await _class_private_method_get(instance, _init, init).call(instance, signal);
    return instance;
  }
  get activeClients() {
    return _class_private_field_get$2(this, _activeClients);
  }
  constructor(clientGroupID, clientID, signal) {
    _class_private_method_init(this, _init);
    _class_private_method_init(this, _getActiveClients);
    _class_private_method_init(this, _addSharedLockForOtherClient);
    _class_private_method_init(this, _addClient);
    _class_private_method_init(this, _removeClient);
    _define_property$1(this, "clientGroupID", void 0);
    _define_property$1(this, "clientID", void 0);
    _class_private_field_init$2(this, _resolver, {
      writable: true,
      value: resolver()
    });
    _class_private_field_init$2(this, _lockManager, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _activeClients, {
      writable: true,
      value: /* @__PURE__ */ new Set()
    });
    _define_property$1(this, "onAdd", void 0);
    _define_property$1(this, "onDelete", void 0);
    this.clientGroupID = clientGroupID;
    this.clientID = clientID;
    _class_private_field_set$2(this, _lockManager, getClientLockManager(signal));
    _class_private_field_get$2(this, _activeClients).add(clientID);
  }
}, __ActiveClientsManager);
function getClientLockManager(signal) {
  const locks = getBrowserGlobal("navigator")?.locks;
  if (locks) {
    return new NativeClientLockManager(locks, signal);
  }
  return new MockClientLockManager();
}
var NativeClientLockManager = (_locks = /* @__PURE__ */ new WeakMap(), _signal1 = /* @__PURE__ */ new WeakMap(), class {
  request(name, mode, fn) {
    return _class_private_field_get$2(this, _locks).request(name, {
      mode,
      signal: _class_private_field_get$2(this, _signal1)
    }, fn);
  }
  release(_name2, fn) {
    fn();
  }
  async *queryExclusive() {
    const snapshot = await _class_private_field_get$2(this, _locks).query();
    for (const lock of [
      ...snapshot.held ?? [],
      ...snapshot.pending ?? []
    ]) {
      if (lock.mode === "exclusive" && lock.name) {
        yield lock.name;
      }
    }
  }
  constructor(locks, signal) {
    _class_private_field_init$2(this, _locks, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _signal1, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _locks, locks);
    _class_private_field_set$2(this, _signal1, signal);
  }
});
var mockLockNames = /* @__PURE__ */ new Set();
var mockListeners = /* @__PURE__ */ new Set();
var MockClientLockManager = (_listeners1 = /* @__PURE__ */ new WeakMap(), class {
  request(name, mode, fn) {
    if (mode === "exclusive") {
      mockLockNames.add(name);
    } else {
      const listener = (removed) => {
        if (removed === name) {
          mockListeners.delete(listener);
          return fn();
        }
      };
      mockListeners.add(listener);
      _class_private_field_get$2(this, _listeners1).add(listener);
    }
    return Promise.resolve();
  }
  release(name, fn) {
    mockLockNames.delete(name);
    for (const listener of mockListeners) {
      listener(name);
    }
    for (const listener of _class_private_field_get$2(this, _listeners1)) {
      mockListeners.delete(listener);
    }
    fn();
  }
  async *queryExclusive() {
    yield* mockLockNames;
  }
  constructor() {
    _class_private_field_init$2(this, _listeners1, {
      writable: true,
      value: /* @__PURE__ */ new Set()
    });
  }
});
var Disconnected = 0;
var Connecting = 1;
var Connected = 2;
var MAX_NODE_SIZE = 32;
var BTreeSet = (_root1 = /* @__PURE__ */ new WeakMap(), _delete = /* @__PURE__ */ new WeakSet(), _maxKey = /* @__PURE__ */ new WeakSet(), _Symbol_iterator = Symbol.iterator, __BTreeSet = class _BTreeSet {
  /** Releases the tree so that its size is 0. */
  clear() {
    _class_private_field_set$2(this, _root1, emptyLeaf);
    this.size = 0;
  }
  clone() {
    _class_private_field_get$2(this, _root1).isShared = true;
    const ret = new _BTreeSet(this.comparator);
    _class_private_field_set$2(ret, _root1, _class_private_field_get$2(this, _root1));
    ret.size = this.size;
    return ret;
  }
  get(key) {
    return _class_private_field_get$2(this, _root1).get(key, this);
  }
  add(key) {
    if (_class_private_field_get$2(this, _root1).isShared) _class_private_field_set$2(this, _root1, _class_private_field_get$2(this, _root1).clone());
    const result = _class_private_field_get$2(this, _root1).set(key, this);
    if (result === null) return this;
    _class_private_field_set$2(this, _root1, new BNodeInternal([
      _class_private_field_get$2(this, _root1),
      result
    ]));
    return this;
  }
  /**
  * Returns true if the key exists in the B+ tree, false if not.
  * Use get() for best performance; use has() if you need to
  * distinguish between "undefined value" and "key not present".
  * @param key Key to detect
  * @description Computational complexity: O(log size)
  */
  has(key) {
    return _class_private_field_get$2(this, _root1).has(key, this);
  }
  /**
  * Removes a single key-value pair from the B+ tree.
  * @param key Key to find
  * @returns true if a pair was found and removed, false otherwise.
  * @description Computational complexity: O(log size)
  */
  delete(key) {
    return _class_private_method_get(this, _delete, __delete).call(this, key);
  }
  keys() {
    return valuesFrom(_class_private_field_get$2(this, _root1), this.comparator, void 0, true);
  }
  values() {
    return valuesFrom(_class_private_field_get$2(this, _root1), this.comparator, void 0, true);
  }
  valuesFrom(lowestKey, inclusive = true) {
    return valuesFrom(_class_private_field_get$2(this, _root1), this.comparator, lowestKey, inclusive);
  }
  valuesReversed() {
    return valuesFromReversed(_class_private_method_get(this, _maxKey, maxKey).call(this), _class_private_field_get$2(this, _root1), this.comparator, void 0, true);
  }
  valuesFromReversed(highestKey, inclusive = true) {
    return valuesFromReversed(_class_private_method_get(this, _maxKey, maxKey).call(this), _class_private_field_get$2(this, _root1), this.comparator, highestKey, inclusive);
  }
  [_Symbol_iterator]() {
    return this.keys();
  }
  constructor(comparator2, entries) {
    _class_private_method_init(this, _delete);
    _class_private_method_init(this, _maxKey);
    _class_private_field_init$2(this, _root1, {
      writable: true,
      value: emptyLeaf
    });
    _define_property$1(this, "size", 0);
    _define_property$1(this, "comparator", void 0);
    this.comparator = comparator2;
    if (entries) {
      for (const key of entries) {
        this.add(key);
      }
    }
  }
}, __BTreeSet);
function valuesFrom(root, comparator2, lowestKey, inclusive) {
  const info = findPath(lowestKey, root, comparator2);
  if (info === void 0) {
    return iterator(() => ({
      done: true,
      value: void 0
    }));
  }
  let [nodeQueue, nodeIndex, leaf] = info;
  let i = lowestKey === void 0 ? -1 : indexOf(lowestKey, leaf.keys, 0, comparator2) - 1;
  if (!inclusive && i < leaf.keys.length && // +1 because we did -1 above.
  comparator2(leaf.keys[i + 1], lowestKey) === 0) {
    i++;
  }
  return iterator(() => {
    for (; ; ) {
      if (++i < leaf.keys.length) {
        return {
          done: false,
          value: leaf.keys[i]
        };
      }
      let level = -1;
      for (; ; ) {
        if (++level >= nodeQueue.length) {
          return {
            done: true,
            value: void 0
          };
        }
        if (++nodeIndex[level] < nodeQueue[level].length) {
          break;
        }
      }
      for (; level > 0; level--) {
        nodeQueue[level - 1] = nodeQueue[level][nodeIndex[level]].children;
        nodeIndex[level - 1] = 0;
      }
      leaf = nodeQueue[0][nodeIndex[0]];
      i = -1;
    }
  });
}
function valuesFromReversed(maxKey2, root, comparator2, highestKey, inclusive) {
  if (highestKey === void 0) {
    highestKey = maxKey2;
    if (highestKey === void 0) return iterator(() => ({
      done: true,
      value: void 0
    }));
  }
  let [nodeQueue, nodeIndex, leaf] = findPath(highestKey, root, comparator2) || findPath(maxKey2, root, comparator2);
  assert(!nodeQueue[0] || leaf === nodeQueue[0][nodeIndex[0]]);
  let i = indexOf(highestKey, leaf.keys, 0, comparator2);
  if (inclusive && i < leaf.keys.length && comparator2(leaf.keys[i], highestKey) <= 0) {
    i++;
  }
  return iterator(() => {
    for (; ; ) {
      if (--i >= 0) {
        return {
          done: false,
          value: leaf.keys[i]
        };
      }
      let level;
      for (level = -1; ; ) {
        if (++level >= nodeQueue.length) {
          return {
            done: true,
            value: void 0
          };
        }
        if (--nodeIndex[level] >= 0) {
          break;
        }
      }
      for (; level > 0; level--) {
        nodeQueue[level - 1] = nodeQueue[level][nodeIndex[level]].children;
        nodeIndex[level - 1] = nodeQueue[level - 1].length - 1;
      }
      leaf = nodeQueue[0][nodeIndex[0]];
      i = leaf.keys.length;
    }
  });
}
function findPath(key, root, comparator2) {
  let nextNode = root;
  const nodeQueue = [];
  const nodeIndex = [];
  if (nextNode.isInternal()) {
    for (let d = 0; nextNode.isInternal(); d++) {
      nodeQueue[d] = nextNode.children;
      nodeIndex[d] = key === void 0 ? 0 : indexOf(key, nextNode.keys, 0, comparator2);
      if (nodeIndex[d] >= nodeQueue[d].length) return;
      nextNode = nodeQueue[d][nodeIndex[d]];
    }
    nodeQueue.reverse();
    nodeIndex.reverse();
  }
  return [
    nodeQueue,
    nodeIndex,
    nextNode
  ];
}
function iterator(next) {
  return {
    next,
    [Symbol.iterator]() {
      return this;
    }
  };
}
var BNode = class _BNode {
  isInternal() {
    return false;
  }
  maxKey() {
    return this.keys[this.keys.length - 1];
  }
  minKey() {
    return this.keys[0];
  }
  clone() {
    return new _BNode(this.keys.slice(0));
  }
  get(key, tree) {
    const i = indexOf(key, this.keys, -1, tree.comparator);
    return i < 0 ? void 0 : this.keys[i];
  }
  has(key, tree) {
    const i = indexOf(key, this.keys, -1, tree.comparator);
    return i >= 0 && i < this.keys.length;
  }
  set(key, tree) {
    let i = indexOf(key, this.keys, -1, tree.comparator);
    if (i < 0) {
      i = ~i;
      tree.size++;
      if (this.keys.length < MAX_NODE_SIZE) {
        this.keys.splice(i, 0, key);
        return null;
      }
      const newRightSibling = this.splitOffRightSide();
      let target = this;
      if (i > this.keys.length) {
        i -= this.keys.length;
        target = newRightSibling;
      }
      target.keys.splice(i, 0, key);
      return newRightSibling;
    }
    this.keys[i] = key;
    return null;
  }
  takeFromRight(rhs) {
    this.keys.push(rhs.keys.shift());
  }
  takeFromLeft(lhs) {
    this.keys.unshift(lhs.keys.pop());
  }
  splitOffRightSide() {
    const half = this.keys.length >> 1;
    const keys = this.keys.splice(half);
    return new _BNode(keys);
  }
  delete(key, tree) {
    const cmp2 = tree.comparator;
    const iLow = indexOf(key, this.keys, -1, cmp2);
    const iHigh = iLow + 1;
    if (iLow < 0) {
      return false;
    }
    const { keys } = this;
    for (let i = iLow; i < iHigh; i++) {
      const key2 = keys[i];
      if (key2 !== keys[i] || this.isShared === true) {
        throw new Error("BTree illegally changed or cloned in delete");
      }
      this.keys.splice(i, 1);
      tree.size--;
      return true;
    }
    return false;
  }
  mergeSibling(rhs, _) {
    this.keys.push(...rhs.keys);
  }
  constructor(keys) {
    _define_property$1(this, "keys", void 0);
    _define_property$1(this, "isShared", void 0);
    this.keys = keys;
    this.isShared = void 0;
  }
};
var BNodeInternal = class _BNodeInternal extends BNode {
  isInternal() {
    return true;
  }
  clone() {
    const children = this.children.slice(0);
    for (let i = 0; i < children.length; i++) {
      children[i].isShared = true;
    }
    return new _BNodeInternal(children, this.keys.slice(0));
  }
  minKey() {
    return this.children[0].minKey();
  }
  get(key, tree) {
    const i = indexOf(key, this.keys, 0, tree.comparator);
    const { children } = this;
    return i < children.length ? children[i].get(key, tree) : void 0;
  }
  has(key, tree) {
    const i = indexOf(key, this.keys, 0, tree.comparator);
    const { children } = this;
    return i < children.length ? children[i].has(key, tree) : false;
  }
  set(key, tree) {
    const c = this.children;
    const cmp2 = tree.comparator;
    let i = Math.min(indexOf(key, this.keys, 0, cmp2), c.length - 1);
    let child = c[i];
    if (child.isShared) {
      c[i] = child = child.clone();
    }
    if (child.keys.length >= MAX_NODE_SIZE) {
      let other;
      if (i > 0 && (other = c[i - 1]).keys.length < MAX_NODE_SIZE && cmp2(child.keys[0], key) < 0) {
        if (other.isShared) {
          c[i - 1] = other = other.clone();
        }
        other.takeFromRight(child);
        this.keys[i - 1] = other.maxKey();
      } else if ((other = c[i + 1]) !== void 0 && other.keys.length < MAX_NODE_SIZE && cmp2(child.maxKey(), key) < 0) {
        if (other.isShared) c[i + 1] = other = other.clone();
        other.takeFromLeft(child);
        this.keys[i] = c[i].maxKey();
      }
    }
    const result = child.set(key, tree);
    this.keys[i] = child.maxKey();
    if (result === null) return null;
    if (this.keys.length < MAX_NODE_SIZE) {
      this.insert(i + 1, result);
      return null;
    }
    const newRightSibling = this.splitOffRightSide();
    let target = this;
    if (cmp2(result.maxKey(), this.maxKey()) > 0) {
      target = newRightSibling;
      i -= this.keys.length;
    }
    target.insert(i + 1, result);
    return newRightSibling;
  }
  /**
  * Inserts `child` at index `i`.
  * This does not mark `child` as shared, so it is the responsibility of the caller
  * to ensure that either child is marked shared, or it is not included in another tree.
  */
  insert(i, child) {
    this.children.splice(i, 0, child);
    this.keys.splice(i, 0, child.maxKey());
  }
  /**
  * Split this node.
  * Modifies this to remove the second half of the items, returning a separate node containing them.
  */
  splitOffRightSide() {
    const half = this.children.length >> 1;
    return new _BNodeInternal(this.children.splice(half), this.keys.splice(half));
  }
  takeFromRight(rhs) {
    this.keys.push(rhs.keys.shift());
    this.children.push(rhs.children.shift());
  }
  takeFromLeft(lhs) {
    this.keys.unshift(lhs.keys.pop());
    this.children.unshift(lhs.children.pop());
  }
  delete(key, tree) {
    const cmp2 = tree.comparator;
    const { keys } = this;
    const { children } = this;
    let iLow = indexOf(key, this.keys, 0, cmp2);
    let i = iLow;
    const iHigh = Math.min(iLow, keys.length - 1);
    if (i <= iHigh) {
      try {
        if (children[i].isShared) {
          children[i] = children[i].clone();
        }
        const result = children[i].delete(key, tree);
        keys[i] = children[i].maxKey();
        return result;
      } finally {
        const half = MAX_NODE_SIZE >> 1;
        if (iLow > 0) iLow--;
        for (i = iHigh; i >= iLow; i--) {
          if (children[i].keys.length <= half) {
            if (children[i].keys.length !== 0) {
              this.tryMerge(i, MAX_NODE_SIZE);
            } else {
              keys.splice(i, 1);
              children.splice(i, 1);
            }
          }
        }
      }
    }
    return false;
  }
  /** Merges child i with child i+1 if their combined size is not too large */
  tryMerge(i, maxSize) {
    const { children } = this;
    if (i >= 0 && i + 1 < children.length) {
      if (children[i].keys.length + children[i + 1].keys.length <= maxSize) {
        if (children[i].isShared) children[i] = children[i].clone();
        children[i].mergeSibling(children[i + 1], maxSize);
        children.splice(i + 1, 1);
        this.keys.splice(i + 1, 1);
        this.keys[i] = children[i].maxKey();
        return true;
      }
    }
    return false;
  }
  /**
  * Move children from `rhs` into this.
  * `rhs` must be part of this tree, and be removed from it after this call
  * (otherwise isShared for its children could be incorrect).
  */
  mergeSibling(rhs, maxNodeSize) {
    const oldLength = this.keys.length;
    this.keys.push(...rhs.keys);
    const rhsChildren = rhs.children;
    this.children.push(...rhsChildren);
    if (rhs.isShared && !this.isShared) {
      for (let i = 0; i < rhsChildren.length; i++) {
        rhsChildren[i].isShared = true;
      }
    }
    this.tryMerge(oldLength - 1, maxNodeSize);
  }
  /**
  * This does not mark `children` as shared, so it is the responsibility of the caller
  * to ensure children are either marked shared, or aren't included in another tree.
  */
  constructor(children, keys) {
    if (!keys) {
      keys = [];
      for (let i = 0; i < children.length; i++) {
        keys[i] = children[i].maxKey();
      }
    }
    super(keys), // Note: conventionally B+ trees have one fewer key than the number of
    // children, but I find it easier to keep the array lengths equal: each
    // keys[i] caches the value of children[i].maxKey().
    _define_property$1(this, "children", void 0);
    this.children = children;
  }
};
function indexOf(key, keys, failXor, comparator2) {
  let lo = 0;
  let hi = keys.length;
  let mid = hi >> 1;
  while (lo < hi) {
    const c = comparator2(keys[mid], key);
    if (c < 0) {
      lo = mid + 1;
    } else if (c > 0) {
      hi = mid;
    } else if (c === 0) {
      return mid;
    } else {
      if (key === key) {
        return keys.length;
      }
      throw new Error("NaN was used as a key");
    }
    mid = lo + hi >> 1;
  }
  return mid ^ failXor;
}
var emptyLeaf = new BNode([]);
emptyLeaf.isShared = true;
function comparator(a, b) {
  return compareUTF8(a[0], b[0]);
}
var MemoryStorage = (_data = /* @__PURE__ */ new WeakMap(), class {
  set(key, value) {
    _class_private_field_get$2(this, _data).add([
      key,
      value
    ]);
  }
  get(key, def) {
    const r = _class_private_field_get$2(this, _data).get([
      key,
      null
    ]);
    if (r !== void 0) {
      return r[1];
    }
    return def;
  }
  del(key) {
    _class_private_field_get$2(this, _data).delete([
      key,
      null
    ]);
  }
  *scan(options) {
    for (const entry of _class_private_field_get$2(this, _data).valuesFrom(options && [
      options.prefix,
      null
    ])) {
      if (options && !entry[0].startsWith(options.prefix)) {
        return;
      }
      yield entry;
    }
  }
  cloneData() {
    return structuredClone(Object.fromEntries(_class_private_field_get$2(this, _data).values()));
  }
  constructor() {
    _class_private_field_init$2(this, _data, {
      writable: true,
      value: new BTreeSet(comparator)
    });
  }
});
var MeasurePushOperator = (_input9 = /* @__PURE__ */ new WeakMap(), _queryID = /* @__PURE__ */ new WeakMap(), _metricsDelegate = /* @__PURE__ */ new WeakMap(), _output10 = /* @__PURE__ */ new WeakMap(), _metricName = /* @__PURE__ */ new WeakMap(), class {
  setOutput(output) {
    _class_private_field_set$2(this, _output10, output);
  }
  fetch(req) {
    return _class_private_field_get$2(this, _input9).fetch(req);
  }
  cleanup(req) {
    return _class_private_field_get$2(this, _input9).cleanup(req);
  }
  getSchema() {
    return _class_private_field_get$2(this, _input9).getSchema();
  }
  destroy() {
    _class_private_field_get$2(this, _input9).destroy();
  }
  push(change) {
    const startTime = performance.now();
    _class_private_field_get$2(this, _output10).push(change, this);
    _class_private_field_get$2(this, _metricsDelegate).addMetric(_class_private_field_get$2(this, _metricName), performance.now() - startTime, _class_private_field_get$2(this, _queryID));
  }
  constructor(input, queryID, metricsDelegate, metricName) {
    _class_private_field_init$2(this, _input9, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _queryID, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _metricsDelegate, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _output10, {
      writable: true,
      value: throwOutput
    });
    _class_private_field_init$2(this, _metricName, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _input9, input);
    _class_private_field_set$2(this, _queryID, queryID);
    _class_private_field_set$2(this, _metricsDelegate, metricsDelegate);
    _class_private_field_set$2(this, _metricName, metricName);
    input.setOutput(this);
  }
});
var MemorySource = (_tableName1 = /* @__PURE__ */ new WeakMap(), _columns = /* @__PURE__ */ new WeakMap(), _primaryKey = /* @__PURE__ */ new WeakMap(), _primaryIndexSort = /* @__PURE__ */ new WeakMap(), _indexes = /* @__PURE__ */ new WeakMap(), _connections = /* @__PURE__ */ new WeakMap(), _overlay = /* @__PURE__ */ new WeakMap(), _getSchema = /* @__PURE__ */ new WeakSet(), _disconnect = /* @__PURE__ */ new WeakSet(), _getPrimaryIndex = /* @__PURE__ */ new WeakSet(), _getOrCreateIndex = /* @__PURE__ */ new WeakSet(), _fetch = /* @__PURE__ */ new WeakSet(), _cleanup = /* @__PURE__ */ new WeakSet(), _writeChange = /* @__PURE__ */ new WeakSet(), __MemorySource = class _MemorySource {
  // Mainly for tests.
  getSchemaInfo() {
    return {
      tableName: _class_private_field_get$2(this, _tableName1),
      columns: _class_private_field_get$2(this, _columns),
      primaryKey: _class_private_field_get$2(this, _primaryKey)
    };
  }
  fork() {
    const primaryIndex = _class_private_method_get(this, _getPrimaryIndex, getPrimaryIndex).call(this);
    return new _MemorySource(_class_private_field_get$2(this, _tableName1), _class_private_field_get$2(this, _columns), _class_private_field_get$2(this, _primaryKey), primaryIndex.data.clone());
  }
  get data() {
    return _class_private_method_get(this, _getPrimaryIndex, getPrimaryIndex).call(this).data;
  }
  connect(sort, filters, splitEditKeys) {
    const transformedFilters = transformFilters(filters);
    const input = {
      getSchema: () => schema2,
      fetch: (req) => _class_private_method_get(this, _fetch, fetch1).call(this, req, connection),
      cleanup: (req) => _class_private_method_get(this, _cleanup, cleanup).call(this, req, connection),
      setOutput: (output) => {
        connection.output = output;
      },
      destroy: () => {
        _class_private_method_get(this, _disconnect, disconnect).call(this, input);
      },
      fullyAppliedFilters: !transformedFilters.conditionsRemoved
    };
    const connection = {
      input,
      output: void 0,
      sort,
      splitEditKeys,
      compareRows: makeComparator(sort),
      filters: transformedFilters.filters ? {
        condition: transformedFilters.filters,
        predicate: createPredicate(transformedFilters.filters)
      } : void 0
    };
    const schema2 = _class_private_method_get(this, _getSchema, getSchema).call(this, connection);
    assertOrderingIncludesPK(sort, _class_private_field_get$2(this, _primaryKey));
    _class_private_field_get$2(this, _connections).push(connection);
    return input;
  }
  // For unit testing that we correctly clean up indexes.
  getIndexKeys() {
    return [
      ..._class_private_field_get$2(this, _indexes).keys()
    ];
  }
  push(change) {
    for (const _ of this.genPush(change)) {
    }
  }
  *genPush(change) {
    const primaryIndex = _class_private_method_get(this, _getPrimaryIndex, getPrimaryIndex).call(this);
    const { data } = primaryIndex;
    const exists = (row) => data.has(row);
    const setOverlay = (o) => _class_private_field_set$2(this, _overlay, o);
    const writeChange1 = (c) => _class_private_method_get(this, _writeChange, writeChange).call(this, c);
    if (change.type === "set") {
      const existing = data.get(change.row);
      if (existing !== void 0) {
        change = {
          type: "edit",
          row: change.row,
          oldRow: existing
        };
      } else {
        change = {
          type: "add",
          row: change.row
        };
      }
    }
    yield* genPushAndWriteWithSplitEdit(_class_private_field_get$2(this, _connections), change, exists, setOverlay, writeChange1);
  }
  constructor(tableName, columns, primaryKey, primaryIndexData) {
    _class_private_method_init(this, _getSchema);
    _class_private_method_init(this, _disconnect);
    _class_private_method_init(this, _getPrimaryIndex);
    _class_private_method_init(this, _getOrCreateIndex);
    _class_private_method_init(this, _fetch);
    _class_private_method_init(this, _cleanup);
    _class_private_method_init(this, _writeChange);
    _class_private_field_init$2(this, _tableName1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _columns, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _primaryKey, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _primaryIndexSort, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _indexes, {
      writable: true,
      value: /* @__PURE__ */ new Map()
    });
    _class_private_field_init$2(this, _connections, {
      writable: true,
      value: []
    });
    _class_private_field_init$2(this, _overlay, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _tableName1, tableName);
    _class_private_field_set$2(this, _columns, columns);
    _class_private_field_set$2(this, _primaryKey, primaryKey);
    _class_private_field_set$2(this, _primaryIndexSort, primaryKey.map((k) => [
      k,
      "asc"
    ]));
    const comparator2 = makeBoundComparator(_class_private_field_get$2(this, _primaryIndexSort));
    _class_private_field_get$2(this, _indexes).set(JSON.stringify(_class_private_field_get$2(this, _primaryIndexSort)), {
      comparator: comparator2,
      data: primaryIndexData ?? new BTreeSet(comparator2),
      usedBy: /* @__PURE__ */ new Set()
    });
    assertOrderingIncludesPK(_class_private_field_get$2(this, _primaryIndexSort), _class_private_field_get$2(this, _primaryKey));
  }
}, __MemorySource);
function* generateWithConstraint(it, constraint) {
  for (const node of it) {
    if (constraint && !constraintMatchesRow(constraint, node.row)) {
      break;
    }
    yield node;
  }
}
function* generateWithFilter(it, filter2) {
  for (const node of it) {
    if (filter2(node.row)) {
      yield node;
    }
  }
}
function* genPushAndWriteWithSplitEdit(connections, change, exists, setOverlay, writeChange2) {
  let shouldSplitEdit = false;
  if (change.type === "edit") {
    for (const { splitEditKeys } of connections) {
      if (splitEditKeys) {
        for (const key of splitEditKeys) {
          if (!valuesEqual(change.row[key], change.oldRow[key])) {
            shouldSplitEdit = true;
            break;
          }
        }
      }
    }
  }
  if (change.type === "edit" && shouldSplitEdit) {
    yield* genPushAndWrite(connections, {
      type: "remove",
      row: change.oldRow
    }, exists, setOverlay, writeChange2);
    yield* genPushAndWrite(connections, {
      type: "add",
      row: change.row
    }, exists, setOverlay, writeChange2);
  } else {
    yield* genPushAndWrite(connections, change, exists, setOverlay, writeChange2);
  }
}
function* genPushAndWrite(connections, change, exists, setOverlay, writeChange2) {
  for (const x of genPush(connections, change, exists, setOverlay)) {
    yield x;
  }
  writeChange2(change);
}
function* genPush(connections, change, exists, setOverlay) {
  switch (change.type) {
    case "add":
      assert(!exists(change.row), () => `Row already exists ${stringify(change)}`);
      break;
    case "remove":
      assert(exists(change.row), () => `Row not found ${stringify(change)}`);
      break;
    case "edit":
      assert(exists(change.oldRow), () => `Row not found ${stringify(change)}`);
      break;
    default:
      unreachable();
  }
  for (const [outputIndex, { output, filters, input }] of connections.entries()) {
    if (output) {
      setOverlay({
        outputIndex,
        change
      });
      const outputChange = change.type === "edit" ? {
        type: change.type,
        oldNode: {
          row: change.oldRow,
          relationships: {}
        },
        node: {
          row: change.row,
          relationships: {}
        }
      } : {
        type: change.type,
        node: {
          row: change.row,
          relationships: {}
        }
      };
      filterPush(outputChange, output, input, filters?.predicate);
      yield;
    }
  }
  setOverlay(void 0);
}
function* generateWithStart(nodes, start, compare2) {
  if (!start) {
    yield* nodes;
    return;
  }
  let started = false;
  for (const node of nodes) {
    if (!started) {
      if (start.basis === "at") {
        if (compare2(node.row, start.row) >= 0) {
          started = true;
        }
      } else if (start.basis === "after") {
        if (compare2(node.row, start.row) > 0) {
          started = true;
        }
      }
    }
    if (started) {
      yield node;
    }
  }
}
function* generateWithOverlay2(startAt, rows, constraint, overlay, connectionIndex, compare2, filterPredicate) {
  let overlayToApply = void 0;
  if (overlay && connectionIndex <= overlay.outputIndex) {
    overlayToApply = overlay;
  }
  const overlays = computeOverlays(startAt, constraint, overlayToApply, compare2, filterPredicate);
  yield* generateWithOverlayInner(rows, overlays, compare2);
}
function computeOverlays(startAt, constraint, overlay, compare2, filterPredicate) {
  let overlays = {
    add: void 0,
    remove: void 0
  };
  switch (overlay?.change.type) {
    case "add":
      overlays = {
        add: overlay.change.row,
        remove: void 0
      };
      break;
    case "remove":
      overlays = {
        add: void 0,
        remove: overlay.change.row
      };
      break;
    case "edit":
      overlays = {
        add: overlay.change.row,
        remove: overlay.change.oldRow
      };
      break;
  }
  if (startAt) {
    overlays = overlaysForStartAt(overlays, startAt, compare2);
  }
  if (constraint) {
    overlays = overlaysForConstraint(overlays, constraint);
  }
  if (filterPredicate) {
    overlays = overlaysForFilterPredicate(overlays, filterPredicate);
  }
  return overlays;
}
function overlaysForStartAt({ add: add2, remove: remove2 }, startAt, compare2) {
  const undefinedIfBeforeStartAt = (row) => row === void 0 || compare2(row, startAt) < 0 ? void 0 : row;
  return {
    add: undefinedIfBeforeStartAt(add2),
    remove: undefinedIfBeforeStartAt(remove2)
  };
}
function overlaysForConstraint({ add: add2, remove: remove2 }, constraint) {
  const undefinedIfDoesntMatchConstraint = (row) => row === void 0 || !constraintMatchesRow(constraint, row) ? void 0 : row;
  return {
    add: undefinedIfDoesntMatchConstraint(add2),
    remove: undefinedIfDoesntMatchConstraint(remove2)
  };
}
function overlaysForFilterPredicate({ add: add2, remove: remove2 }, filterPredicate) {
  const undefinedIfDoesntMatchFilter = (row) => row === void 0 || !filterPredicate(row) ? void 0 : row;
  return {
    add: undefinedIfDoesntMatchFilter(add2),
    remove: undefinedIfDoesntMatchFilter(remove2)
  };
}
function* generateWithOverlayInner(rowIterator, overlays, compare2) {
  let addOverlayYielded = false;
  let removeOverlaySkipped = false;
  for (const row of rowIterator) {
    if (!addOverlayYielded && overlays.add) {
      const cmp2 = compare2(overlays.add, row);
      if (cmp2 < 0) {
        addOverlayYielded = true;
        yield {
          row: overlays.add,
          relationships: {}
        };
      }
    }
    if (!removeOverlaySkipped && overlays.remove) {
      const cmp2 = compare2(overlays.remove, row);
      if (cmp2 === 0) {
        removeOverlaySkipped = true;
        continue;
      }
    }
    yield {
      row,
      relationships: {}
    };
  }
  if (!addOverlayYielded && overlays.add) {
    yield {
      row: overlays.add,
      relationships: {}
    };
  }
}
var minValue = Symbol("min-value");
var maxValue = Symbol("max-value");
function makeBoundComparator(sort) {
  return (a, b) => {
    for (const entry of sort) {
      const key = entry[0];
      const cmp2 = compareBounds(a[key], b[key]);
      if (cmp2 !== 0) {
        return entry[1] === "asc" ? cmp2 : -cmp2;
      }
    }
    return 0;
  };
}
function compareBounds(a, b) {
  if (a === b) {
    return 0;
  }
  if (a === minValue) {
    return -1;
  }
  if (b === minValue) {
    return 1;
  }
  if (a === maxValue) {
    return 1;
  }
  if (b === maxValue) {
    return -1;
  }
  return compareValues(a, b);
}
function* generateRows(data, scanStart, reverse) {
  yield* data[reverse ? "valuesFromReversed" : "valuesFrom"](scanStart);
}
function stringify(change) {
  return JSON.stringify(change, (_, v1) => typeof v1 === "bigint" ? v1.toString() : v1);
}
var IVMSourceBranch = (_sources = /* @__PURE__ */ new WeakMap(), _tables1 = /* @__PURE__ */ new WeakMap(), class _IVMSourceBranch {
  getSource(name) {
    if (_class_private_field_get$2(this, _sources).has(name)) {
      return _class_private_field_get$2(this, _sources).get(name);
    }
    const schema2 = _class_private_field_get$2(this, _tables1)[name];
    const source = schema2 ? new MemorySource(name, schema2.columns, schema2.primaryKey) : void 0;
    _class_private_field_get$2(this, _sources).set(name, source);
    return source;
  }
  clear() {
    _class_private_field_get$2(this, _sources).clear();
  }
  /**
  * Mutates the current branch, advancing it to the new head
  * by applying the given diffs.
  */
  advance(expectedHead, newHead, diffs) {
    assert(this.hash === expectedHead, () => `Expected head must match the main head. Got: ${this.hash}, expected: ${expectedHead}`);
    applyDiffs(diffs, this);
    this.hash = newHead;
  }
  /**
  * Fork the branch and patch it up to match the desired head.
  */
  async forkToHead(store, desiredHead, readOptions) {
    const fork = this.fork();
    if (fork.hash === desiredHead) {
      return fork;
    }
    await patchBranch(desiredHead, store, fork, readOptions);
    fork.hash = desiredHead;
    return fork;
  }
  /**
  * Creates a new IVMSourceBranch that is a copy of the current one.
  * This is a cheap operation since the b-trees are shared until a write is performed
  * and then only the modified nodes are copied.
  *
  * IVM branches are forked when we need to rebase mutations.
  * The mutations modify the fork rather than original branch.
  */
  fork() {
    return new _IVMSourceBranch(_class_private_field_get$2(this, _tables1), this.hash, new Map(wrapIterable(_class_private_field_get$2(this, _sources).entries()).map(([name, source]) => [
      name,
      source?.fork()
    ])));
  }
  constructor(tables, hash2, sources = /* @__PURE__ */ new Map()) {
    _class_private_field_init$2(this, _sources, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _tables1, {
      writable: true,
      value: void 0
    });
    _define_property$1(this, "hash", void 0);
    _class_private_field_set$2(this, _tables1, tables);
    _class_private_field_set$2(this, _sources, sources);
    this.hash = hash2;
  }
});
async function patchBranch(desiredHead, store, fork, readOptions) {
  const diffs = await computeDiffs(must(fork.hash), desiredHead, store, readOptions);
  if (!diffs) {
    return;
  }
  applyDiffs(diffs, fork);
}
async function computeDiffs(startHash, endHash, store, readOptions) {
  const readFn = (dagRead) => diff2(startHash, endHash, dagRead, {
    shouldComputeDiffs: () => true,
    shouldComputeDiffsForIndex(_name2) {
      return false;
    }
  }, Latest);
  let diffs;
  if (readOptions?.openLazySourceRead) {
    diffs = await using(store.read(readOptions.openLazySourceRead), readFn);
  } else if (readOptions?.openLazyRead) {
    diffs = await readFn(readOptions.openLazyRead);
  } else {
    diffs = await withRead(store, readFn);
  }
  return diffs.get("");
}
function applyDiffs(diffs, branch) {
  for (let i = diffBinarySearch(diffs, ENTITIES_KEY_PREFIX, (diff3) => diff3.key); i < diffs.length; i++) {
    const diff3 = diffs[i];
    const { key } = diff3;
    if (!key.startsWith(ENTITIES_KEY_PREFIX)) {
      break;
    }
    const name = sourceNameFromKey(key);
    const source = must(branch.getSource(name));
    switch (diff3.op) {
      case "del":
        source.push({
          type: "remove",
          row: diff3.oldValue
        });
        break;
      case "add":
        source.push({
          type: "add",
          row: diff3.newValue
        });
        break;
      case "change":
        source.push({
          type: "edit",
          row: diff3.newValue,
          oldRow: diff3.oldValue
        });
        break;
    }
  }
}
var ZeroContext$1 = (_mainSources = /* @__PURE__ */ new WeakMap(), _batchViewUpdates = /* @__PURE__ */ new WeakMap(), _commitListeners = /* @__PURE__ */ new WeakMap(), _lc4 = /* @__PURE__ */ new WeakMap(), _endTransaction = /* @__PURE__ */ new WeakSet(), _class21 = class {
  getSource(name) {
    return _class_private_field_get$2(this, _mainSources).getSource(name);
  }
  mapAst(ast) {
    return ast;
  }
  createStorage() {
    return new MemoryStorage();
  }
  decorateInput(input) {
    return input;
  }
  decorateFilterInput(input) {
    return input;
  }
  decorateSourceInput(input, queryID) {
    return new MeasurePushOperator(input, queryID, this, "query-update-client");
  }
  addEdge() {
  }
  onTransactionCommit(cb) {
    _class_private_field_get$2(this, _commitListeners).add(cb);
    return () => {
      _class_private_field_get$2(this, _commitListeners).delete(cb);
    };
  }
  batchViewUpdates(applyViewUpdates) {
    let result;
    let viewChangesPerformed = false;
    _class_private_field_get$2(this, _batchViewUpdates).call(this, () => {
      result = applyViewUpdates();
      viewChangesPerformed = true;
    });
    assert(viewChangesPerformed, "batchViewUpdates must call applyViewUpdates synchronously.");
    return result;
  }
  processChanges(expectedHead, newHead, changes) {
    this.batchViewUpdates(() => {
      try {
        _class_private_field_get$2(this, _mainSources).advance(expectedHead, newHead, changes);
      } finally {
        _class_private_method_get(this, _endTransaction, endTransaction).call(this);
      }
    });
  }
  constructor(lc, mainSources, addQuery, addCustomQuery, updateQuery, updateCustomQuery, flushQueryChanges, batchViewUpdates, addMetric, assertValidRunOptions3) {
    _class_private_method_init(this, _endTransaction);
    _class_private_field_init$2(this, _mainSources, {
      writable: true,
      value: void 0
    });
    _define_property$1(this, "addServerQuery", void 0);
    _define_property$1(this, "addCustomQuery", void 0);
    _define_property$1(this, "updateServerQuery", void 0);
    _define_property$1(this, "updateCustomQuery", void 0);
    _define_property$1(this, "flushQueryChanges", void 0);
    _class_private_field_init$2(this, _batchViewUpdates, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _commitListeners, {
      writable: true,
      value: /* @__PURE__ */ new Set()
    });
    _class_private_field_init$2(this, _lc4, {
      writable: true,
      value: void 0
    });
    _define_property$1(this, "assertValidRunOptions", void 0);
    _define_property$1(this, "defaultQueryComplete", false);
    _define_property$1(this, "addMetric", void 0);
    _class_private_field_set$2(this, _mainSources, mainSources);
    this.addServerQuery = addQuery;
    this.updateServerQuery = updateQuery;
    this.updateCustomQuery = updateCustomQuery;
    _class_private_field_set$2(this, _batchViewUpdates, batchViewUpdates);
    _class_private_field_set$2(this, _lc4, lc);
    this.assertValidRunOptions = assertValidRunOptions3;
    this.addCustomQuery = addCustomQuery;
    this.flushQueryChanges = flushQueryChanges;
    this.addMetric = addMetric;
  }
}, _class21);
function makeCRUDMutate(schema2, repMutate) {
  const { [CRUD_MUTATION_NAME]: zeroCRUD } = repMutate;
  const mutateBatch = async (body) => {
    const ops = [];
    const m = {};
    for (const name of Object.keys(schema2.tables)) {
      m[name] = makeBatchCRUDMutate(name, schema2, ops);
    }
    const rv = await body(m);
    await zeroCRUD({
      ops
    });
    return rv;
  };
  const mutate2 = {};
  for (const [name, tableSchema] of Object.entries(schema2.tables)) {
    mutate2[name] = makeEntityCRUDMutate(name, tableSchema.primaryKey, zeroCRUD);
  }
  return {
    mutate: mutate2,
    mutateBatch
  };
}
function makeEntityCRUDMutate(tableName, primaryKey, zeroCRUD) {
  return {
    insert: (value) => {
      const op = {
        op: "insert",
        tableName,
        primaryKey,
        value
      };
      return zeroCRUD({
        ops: [
          op
        ]
      });
    },
    upsert: (value) => {
      const op = {
        op: "upsert",
        tableName,
        primaryKey,
        value
      };
      return zeroCRUD({
        ops: [
          op
        ]
      });
    },
    update: (value) => {
      const op = {
        op: "update",
        tableName,
        primaryKey,
        value
      };
      return zeroCRUD({
        ops: [
          op
        ]
      });
    },
    delete: (id) => {
      const op = {
        op: "delete",
        tableName,
        primaryKey,
        value: id
      };
      return zeroCRUD({
        ops: [
          op
        ]
      });
    }
  };
}
function makeBatchCRUDMutate(tableName, schema2, ops) {
  const { primaryKey } = schema2.tables[tableName];
  return {
    insert: (value) => {
      const op = {
        op: "insert",
        tableName,
        primaryKey,
        value
      };
      ops.push(op);
      return promiseVoid;
    },
    upsert: (value) => {
      const op = {
        op: "upsert",
        tableName,
        primaryKey,
        value
      };
      ops.push(op);
      return promiseVoid;
    },
    update: (value) => {
      const op = {
        op: "update",
        tableName,
        primaryKey,
        value
      };
      ops.push(op);
      return promiseVoid;
    },
    delete: (id) => {
      const op = {
        op: "delete",
        tableName,
        primaryKey,
        value: id
      };
      ops.push(op);
      return promiseVoid;
    }
  };
}
function makeCRUDMutator(schema2) {
  return async function zeroCRUDMutator(tx, crudArg) {
    for (const op of crudArg.ops) {
      switch (op.op) {
        case "insert":
          await insertImpl(tx, op, schema2, void 0);
          break;
        case "upsert":
          await upsertImpl(tx, op, schema2, void 0);
          break;
        case "update":
          await updateImpl(tx, op, schema2, void 0);
          break;
        case "delete":
          await deleteImpl(tx, op, schema2, void 0);
          break;
      }
    }
  };
}
function defaultOptionalFieldsToNull(schema2, value) {
  let rv = value;
  for (const name in schema2.columns) {
    if (rv[name] === void 0) {
      rv = {
        ...rv,
        [name]: null
      };
    }
  }
  return rv;
}
async function insertImpl(tx, arg, schema2, ivmBranch) {
  const key = toPrimaryKeyString(arg.tableName, schema2.tables[arg.tableName].primaryKey, arg.value);
  if (!await tx.has(key)) {
    const val = defaultOptionalFieldsToNull(schema2.tables[arg.tableName], arg.value);
    await tx.set(key, val);
    if (ivmBranch) {
      must(ivmBranch.getSource(arg.tableName)).push({
        type: "add",
        row: arg.value
      });
    }
  }
}
async function upsertImpl(tx, arg, schema2, ivmBranch) {
  const key = toPrimaryKeyString(arg.tableName, schema2.tables[arg.tableName].primaryKey, arg.value);
  const val = defaultOptionalFieldsToNull(schema2.tables[arg.tableName], arg.value);
  await tx.set(key, val);
  if (ivmBranch) {
    must(ivmBranch.getSource(arg.tableName)).push({
      type: "set",
      row: arg.value
    });
  }
}
async function updateImpl(tx, arg, schema2, ivmBranch) {
  const key = toPrimaryKeyString(arg.tableName, schema2.tables[arg.tableName].primaryKey, arg.value);
  const prev = await tx.get(key);
  if (prev === void 0) {
    return;
  }
  const update = arg.value;
  const next = {
    ...prev
  };
  for (const k in update) {
    if (update[k] !== void 0) {
      next[k] = update[k];
    }
  }
  await tx.set(key, next);
  if (ivmBranch) {
    must(ivmBranch.getSource(arg.tableName)).push({
      type: "edit",
      oldRow: prev,
      row: next
    });
  }
}
async function deleteImpl(tx, arg, schema2, ivmBranch) {
  const key = toPrimaryKeyString(arg.tableName, schema2.tables[arg.tableName].primaryKey, arg.value);
  const prev = await tx.get(key);
  if (prev === void 0) {
    return;
  }
  await tx.del(key);
  if (ivmBranch) {
    must(ivmBranch.getSource(arg.tableName)).push({
      type: "remove",
      row: prev
    });
  }
}
var TransactionImpl = class {
  constructor(lc, repTx, schema2) {
    _define_property$1(this, "clientID", void 0);
    _define_property$1(this, "mutationID", void 0);
    _define_property$1(this, "reason", void 0);
    _define_property$1(this, "location", "client");
    _define_property$1(this, "mutate", void 0);
    _define_property$1(this, "query", void 0);
    _define_property$1(this, "token", void 0);
    const castedRepTx = repTx;
    must(repTx.reason === "initial" || repTx.reason === "rebase");
    this.clientID = repTx.clientID;
    this.mutationID = repTx.mutationID;
    this.reason = repTx.reason === "initial" ? "optimistic" : "rebase";
    const txData = must(castedRepTx[zeroData], "zero was not set on replicache internal options!");
    this.mutate = makeSchemaCRUD(schema2, repTx, txData.ivmSources);
    this.query = makeSchemaQuery(lc, schema2, txData.ivmSources);
    this.token = txData.token;
  }
};
function makeReplicacheMutator(lc, mutator, schema2) {
  return async (repTx, args) => {
    const tx = new TransactionImpl(lc, repTx, schema2);
    await mutator(tx, args);
  };
}
function makeSchemaCRUD(schema2, tx, ivmBranch) {
  return new Proxy({}, {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }
      target[prop] = makeTableCRUD(schema2, prop, tx, ivmBranch);
      return target[prop];
    }
  });
}
function assertValidRunOptions(options) {
  assert(options?.type !== "complete", "Cannot wait for complete results in custom mutations");
}
function makeSchemaQuery(lc, schema2, ivmBranch) {
  const context = new ZeroContext$1(lc, ivmBranch, () => emptyFunction, () => emptyFunction, emptyFunction, emptyFunction, emptyFunction, (applyViewUpdates) => applyViewUpdates(), emptyFunction, assertValidRunOptions);
  return new Proxy({}, {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }
      target[prop] = newQuery(context, schema2, prop);
      return target[prop];
    }
  });
}
function makeTableCRUD(schema2, tableName, tx, ivmBranch) {
  const table2 = must(schema2.tables[tableName]);
  const { primaryKey } = table2;
  return {
    insert: (value) => insertImpl(tx, {
      tableName,
      value
    }, schema2, ivmBranch),
    upsert: (value) => upsertImpl(tx, {
      tableName,
      value
    }, schema2, ivmBranch),
    update: (value) => updateImpl(tx, {
      tableName,
      value
    }, schema2, ivmBranch),
    delete: (id) => deleteImpl(tx, {
      tableName,
      value: id
    }, schema2, ivmBranch)
  };
}
var DeleteClientsManager = (_send = /* @__PURE__ */ new WeakMap(), _lc5 = /* @__PURE__ */ new WeakMap(), _dagStore = /* @__PURE__ */ new WeakMap(), _clientGroupID = /* @__PURE__ */ new WeakMap(), class {
  /**
  * This gets called by Replicache when it deletes clients from the persistent
  * storage.
  */
  async onClientsDeleted(deletedClients) {
    _class_private_field_get$2(this, _lc5).debug?.("DeletedClientsManager, send:", deletedClients);
    const clientGroupID = await _class_private_field_get$2(this, _clientGroupID);
    _class_private_field_get$2(this, _send).call(this, [
      "deleteClients",
      {
        clientIDs: deletedClients.filter((dc) => dc.clientGroupID === clientGroupID).map((dc) => dc.clientID)
      }
    ]);
  }
  /**
  * Zero calls this after it connects to ensure that the server knows about all
  * the clients that might have been deleted locally since the last connection.
  */
  async sendDeletedClientsToServer() {
    const clientGroupID = await _class_private_field_get$2(this, _clientGroupID);
    const deleted = await withRead(_class_private_field_get$2(this, _dagStore), (dagRead) => getDeletedClients(dagRead));
    const clientIDs = deleted.filter((d) => d.clientGroupID === clientGroupID).map((d) => d.clientID);
    if (clientIDs.length > 0) {
      _class_private_field_get$2(this, _send).call(this, [
        "deleteClients",
        {
          clientIDs
        }
      ]);
      _class_private_field_get$2(this, _lc5).debug?.("DeletedClientsManager, send:", deleted);
    }
  }
  /**
  * This is called as a response to the server telling us which clients it
  * actually deleted.
  */
  clientsDeletedOnServer(deletedClients) {
    const { clientIDs = [], clientGroupIDs = [] } = deletedClients;
    if (clientIDs.length > 0 || clientGroupIDs.length > 0) {
      return withWrite(_class_private_field_get$2(this, _dagStore), async (dagWrite) => {
        _class_private_field_get$2(this, _lc5).debug?.("clientsDeletedOnServer:", clientIDs, clientGroupIDs);
        await confirmDeletedClients(dagWrite, clientIDs, clientGroupIDs);
      });
    }
    return promiseVoid;
  }
  async getDeletedClients() {
    const deletedClients = await withRead(_class_private_field_get$2(this, _dagStore), (read) => getDeletedClients(read));
    const clientGroupID = await _class_private_field_get$2(this, _clientGroupID);
    return deletedClients.filter((d) => d.clientGroupID === clientGroupID);
  }
  constructor(send2, dagStore, lc, clientGroupID) {
    _class_private_field_init$2(this, _send, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _lc5, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _dagStore, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _clientGroupID, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _send, send2);
    _class_private_field_set$2(this, _dagStore, dagStore);
    _class_private_field_set$2(this, _lc5, lc);
    _class_private_field_set$2(this, _clientGroupID, clientGroupID);
  }
});
var IPV4_ADDRESS_REGEX = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
var IPV6_ADDRESS_HOSTNAME_REGEX = /^\[[a-fA-F0-9:]*:[a-fA-F0-9:]*\]$/;
var IP_ADDRESS_HOSTNAME_REGEX = new RegExp(`(${IPV4_ADDRESS_REGEX.source}|${IPV6_ADDRESS_HOSTNAME_REGEX.source})`);
function shouldEnableAnalytics(server, enableAnalytics = true) {
  if (!enableAnalytics) {
    return false;
  }
  const serverURL = server === null ? null : new URL(server);
  const socketHostname = serverURL?.hostname;
  return server !== null && socketHostname !== void 0 && socketHostname !== "localhost" && !IP_ADDRESS_HOSTNAME_REGEX.test(socketHostname);
}
function toWSString(url) {
  return "ws" + url.slice(4);
}
function appendPath(url, toAppend) {
  return url + (url.endsWith("/") ? toAppend.substring(1) : toAppend);
}
var DD_BASE_URL = new URL("https://http-intake.logs.datadoghq.com/api/v2/logs");
var MAX_LOG_ENTRIES_PER_FLUSH = 1e3;
var FORCE_FLUSH_THRESHOLD = 250;
var MAX_ENTRY_BYTES = 5 * 1024 * 1024;
var MAX_MESSAGE_RETRIES = 2;
var MAX_ENTRY_CHARS = MAX_ENTRY_BYTES / 4;
var DatadogLogSink = (_messages = /* @__PURE__ */ new WeakMap(), _apiKey = /* @__PURE__ */ new WeakMap(), _source = /* @__PURE__ */ new WeakMap(), _service = /* @__PURE__ */ new WeakMap(), _host = /* @__PURE__ */ new WeakMap(), _version = /* @__PURE__ */ new WeakMap(), _interval = /* @__PURE__ */ new WeakMap(), _baseURL = /* @__PURE__ */ new WeakMap(), _timerID = /* @__PURE__ */ new WeakMap(), _flushLock = /* @__PURE__ */ new WeakMap(), _startTimer = /* @__PURE__ */ new WeakSet(), _class22 = class {
  log(level, context, ...args) {
    _class_private_field_get$2(this, _messages).push(makeMessage(args, context, level));
    if (level === "error" || _class_private_field_get$2(this, _messages).length === FORCE_FLUSH_THRESHOLD) {
      void this.flush();
    } else {
      _class_private_method_get(this, _startTimer, startTimer).call(this);
    }
  }
  flush() {
    return _class_private_field_get$2(this, _flushLock).withLock(async () => {
      const { length } = _class_private_field_get$2(this, _messages);
      if (length === 0) {
        return;
      }
      do {
        const flushTime = Date.now();
        const stringified2 = [];
        let totalBytes = 0;
        for (const m of _class_private_field_get$2(this, _messages)) {
          m.flushDelayMs = flushTime - m.date;
          let str = JSON.stringify(m);
          if (str.length > MAX_ENTRY_CHARS) {
            m.message = `[Dropped message of length ${str.length}]`;
            str = JSON.stringify(m);
          }
          if (str.length + totalBytes + stringified2.length > MAX_ENTRY_CHARS) {
            break;
          }
          totalBytes += str.length;
          stringified2.push(str);
          if (stringified2.length === MAX_LOG_ENTRIES_PER_FLUSH) {
            break;
          }
        }
        const body = stringified2.join("\n");
        const url = new URL(_class_private_field_get$2(this, _baseURL));
        if (_class_private_field_get$2(this, _apiKey) !== void 0) {
          url.searchParams.set("dd-api-key", _class_private_field_get$2(this, _apiKey));
        }
        if (_class_private_field_get$2(this, _source)) {
          url.searchParams.set("ddsource", _class_private_field_get$2(this, _source));
          url.searchParams.set("dd-evp-origin", _class_private_field_get$2(this, _source));
        }
        if (_class_private_field_get$2(this, _service)) {
          url.searchParams.set("service", _class_private_field_get$2(this, _service));
        }
        if (_class_private_field_get$2(this, _host)) {
          url.searchParams.set("host", _class_private_field_get$2(this, _host));
        }
        if (_class_private_field_get$2(this, _version)) {
          url.searchParams.set("ddtags", `version:${_class_private_field_get$2(this, _version)}`);
        }
        let ok2 = false;
        try {
          const response = await fetch(url.toString(), {
            method: "POST",
            body,
            keepalive: true
          });
          ok2 = response.ok;
          if (!ok2) {
            console.error("response", response.status, response.statusText, await response.text);
          }
        } catch (e) {
          console.error("Log flush to datadog failed", e);
        }
        if (ok2) {
          _class_private_field_get$2(this, _messages).splice(0, stringified2.length);
        } else {
          let numWithTooManyRetries = 0;
          for (let i = 0; i < stringified2.length; i++) {
            const m = _class_private_field_get$2(this, _messages)[i];
            m.flushRetryCount = (m.flushRetryCount ?? 0) + 1;
            if (m.flushRetryCount > MAX_MESSAGE_RETRIES) {
              numWithTooManyRetries++;
            }
          }
          if (numWithTooManyRetries > 0) {
            console.error(`Dropping ${numWithTooManyRetries} datadog log messages which failed to send ${MAX_MESSAGE_RETRIES + 1} times.`);
            _class_private_field_get$2(this, _messages).splice(0, numWithTooManyRetries);
          }
        }
      } while (_class_private_field_get$2(this, _messages).length >= FORCE_FLUSH_THRESHOLD);
      if (_class_private_field_get$2(this, _messages).length) {
        _class_private_method_get(this, _startTimer, startTimer).call(this);
      }
    });
  }
  constructor(options) {
    _class_private_method_init(this, _startTimer);
    _class_private_field_init$2(this, _messages, {
      writable: true,
      value: []
    });
    _class_private_field_init$2(this, _apiKey, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _source, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _service, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _host, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _version, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _interval, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _baseURL, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _timerID, {
      writable: true,
      value: 0
    });
    _class_private_field_init$2(this, _flushLock, {
      writable: true,
      value: new Lock()
    });
    const { apiKey, source, service, host, version: version3, interval = 5e3, baseURL: baseUrl = DD_BASE_URL } = options;
    _class_private_field_set$2(this, _apiKey, apiKey);
    _class_private_field_set$2(this, _source, source);
    _class_private_field_set$2(this, _service, service);
    _class_private_field_set$2(this, _host, host);
    _class_private_field_set$2(this, _version, version3);
    _class_private_field_set$2(this, _interval, interval);
    _class_private_field_set$2(this, _baseURL, baseUrl.toString());
  }
}, _class22);
function flattenMessage(message2) {
  if (Array.isArray(message2) && message2.length === 1) {
    return flattenMessage(message2[0]);
  }
  return message2;
}
function convertError(e) {
  return {
    name: e.name,
    message: e.message,
    stack: e.stack
  };
}
function convertErrors(message2) {
  if (message2 instanceof Error) {
    return convertError(message2);
  }
  if (message2 instanceof Array) {
    const convertedMessage = [];
    for (const item of message2) {
      if (item instanceof Error) {
        convertedMessage.push(convertError(item));
      } else {
        convertedMessage.push(item);
      }
    }
    return convertedMessage;
  }
  return message2;
}
var LOG_SINK_FLUSH_RETRY_COUNT = "flushRetryCount";
var LOG_SINK_FLUSH_DELAY_ATTRIBUTE = "flushDelayMs";
var RESERVED_KEY_PREFIX = "@DATADOG_RESERVED_";
var RESERVED_KEYS = [
  "host",
  "source",
  "status",
  "service",
  "version",
  "trace_id",
  "message",
  "msg",
  // alias for message
  "date",
  // The following are attributes reserved by the DataDogLogSink
  // itself (as opposed to DataDog), to report on its own behavior.
  LOG_SINK_FLUSH_DELAY_ATTRIBUTE,
  LOG_SINK_FLUSH_RETRY_COUNT
];
function makeMessage(message2, context, logLevel) {
  let safeContext = void 0;
  if (context !== void 0) {
    for (const reservedKey of RESERVED_KEYS) {
      if (Object.hasOwn(context, reservedKey)) {
        if (safeContext === void 0) {
          safeContext = {
            ...context
          };
        }
        safeContext[RESERVED_KEY_PREFIX + reservedKey] = safeContext[reservedKey];
        delete safeContext[reservedKey];
      }
    }
  }
  const msg = {
    ...safeContext ?? context,
    date: Date.now(),
    message: convertErrors(flattenMessage(message2)),
    status: logLevel
  };
  if (logLevel === "error") {
    msg.error = {
      origin: "logger"
    };
  }
  return msg;
}
var version2 = "0.24.2025102100";
var LevelFilterLogSink = (_wrappedLogSink = /* @__PURE__ */ new WeakMap(), _level = /* @__PURE__ */ new WeakMap(), class {
  log(level, context, ...args) {
    if (_class_private_field_get$2(this, _level) === "error" && level !== "error") {
      return;
    }
    if (_class_private_field_get$2(this, _level) === "info" && level === "debug") {
      return;
    }
    _class_private_field_get$2(this, _wrappedLogSink).log(level, context, ...args);
  }
  async flush() {
    await consoleLogSink.flush?.();
  }
  constructor(wrappedLogSink, level) {
    _class_private_field_init$2(this, _wrappedLogSink, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _level, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _wrappedLogSink, wrappedLogSink);
    _class_private_field_set$2(this, _level, level);
  }
});
var DATADOG_LOG_LEVEL = "info";
var ZERO_SASS_DOMAIN = ".reflect-server.net";
function createLogOptions(options, createDatadogLogSink = (options2) => new DatadogLogSink(options2)) {
  const { consoleLogLevel, server, enableAnalytics } = options;
  if (!enableAnalytics || server === null) {
    return {
      logLevel: consoleLogLevel,
      logSink: consoleLogSink
    };
  }
  const serverURL = new URL(server);
  const { hostname } = serverURL;
  const datadogServiceLabel = hostname.endsWith(ZERO_SASS_DOMAIN) ? hostname.substring(0, hostname.length - ZERO_SASS_DOMAIN.length).toLowerCase() : hostname;
  const baseURL = new URL(appendPath(server, "/logs/v0/log"));
  const logLevel = consoleLogLevel === "debug" ? "debug" : "info";
  const logSink = new TeeLogSink([
    new LevelFilterLogSink(consoleLogSink, consoleLogLevel),
    new LevelFilterLogSink(createDatadogLogSink({
      service: datadogServiceLabel,
      host: location.host,
      version: version2,
      baseURL
    }), DATADOG_LOG_LEVEL)
  ]);
  return {
    logLevel,
    logSink
  };
}
var TimeToConnectMs = "time_to_connect_ms";
var LastConnectError = "last_connect_error";
var TimeToConnectMsV2 = "time_to_connect_ms_v2";
var LastConnectErrorV2 = "last_connect_error_v2";
var TotalTimeToConnectMs = "total_time_to_connect_ms";
var NotConnected = "not_connected";
var DID_NOT_CONNECT_VALUE = 100 * 1e3;
var REPORT_INTERVAL_MS = 5e3;
function getLastConnectErrorValue(reason) {
  if ("server" in reason) {
    return `server_${camelToSnake(reason.server)}`;
  }
  return `client_${camelToSnake(reason.client)}`;
}
function camelToSnake(s) {
  return s.split(/\.?(?=[A-Z])/).join("_").toLowerCase();
}
var MetricManager = (_reportIntervalMs = /* @__PURE__ */ new WeakMap(), _host1 = /* @__PURE__ */ new WeakMap(), _reporter = /* @__PURE__ */ new WeakMap(), _lc6 = /* @__PURE__ */ new WeakMap(), _timerID1 = /* @__PURE__ */ new WeakMap(), _metrics = /* @__PURE__ */ new WeakMap(), _notConnected = /* @__PURE__ */ new WeakMap(), _timeToConnectMsV2 = /* @__PURE__ */ new WeakMap(), _lastConnectErrorV2 = /* @__PURE__ */ new WeakMap(), _totalTimeToConnectMs = /* @__PURE__ */ new WeakMap(), _setNotConnectedReason = /* @__PURE__ */ new WeakSet(), _register1 = /* @__PURE__ */ new WeakSet(), _class23 = class {
  setConnected(timeToConnectMs, totalTimeToConnectMs) {
    _class_private_field_get$2(this, _notConnected).clear();
    _class_private_field_get$2(this, _lastConnectErrorV2).clear();
    _class_private_field_get$2(this, _timeToConnectMsV2).set(timeToConnectMs);
    _class_private_field_get$2(this, _totalTimeToConnectMs).set(totalTimeToConnectMs);
  }
  setDisconnectedWaitingForVisible() {
    _class_private_field_get$2(this, _timeToConnectMsV2).clear();
    _class_private_field_get$2(this, _totalTimeToConnectMs).clear();
    _class_private_field_get$2(this, _lastConnectErrorV2).clear();
    let notConnectedReason;
    switch (_class_private_field_get$2(this, _notConnected).get()) {
      case "init":
        notConnectedReason = "hidden_was_init";
        break;
      case "error":
        notConnectedReason = "hidden_was_error";
        break;
      default:
        notConnectedReason = "hidden";
        break;
    }
    _class_private_method_get(this, _setNotConnectedReason, setNotConnectedReason).call(this, notConnectedReason);
  }
  setConnectError(reason) {
    _class_private_field_get$2(this, _timeToConnectMsV2).clear();
    _class_private_field_get$2(this, _totalTimeToConnectMs).clear();
    _class_private_method_get(this, _setNotConnectedReason, setNotConnectedReason).call(this, "error");
    _class_private_field_get$2(this, _lastConnectErrorV2).set(getLastConnectErrorValue(reason));
  }
  // Flushes all metrics to an array of time series (plural), one Series
  // per metric.
  async flush() {
    const lc = _class_private_field_get$2(this, _lc6);
    if (_class_private_field_get$2(this, _timerID1) === null) {
      lc.error?.("MetricManager.flush() called but already stopped");
      return;
    }
    const allSeries = [];
    for (const metric of _class_private_field_get$2(this, _metrics)) {
      const series = metric.flush();
      if (series !== void 0) {
        allSeries.push({
          ...series,
          host: _class_private_field_get$2(this, _host1),
          tags: this.tags
        });
      }
    }
    if (allSeries.length === 0) {
      lc?.debug?.("No metrics to report");
      return;
    }
    try {
      await _class_private_field_get$2(this, _reporter).call(this, allSeries);
    } catch (e) {
      lc?.error?.("Error reporting metrics", e);
    }
  }
  stop() {
    if (_class_private_field_get$2(this, _timerID1) === null) {
      _class_private_field_get$2(this, _lc6).error?.("MetricManager.stop() called but already stopped");
      return;
    }
    clearInterval(_class_private_field_get$2(this, _timerID1));
    _class_private_field_set$2(this, _timerID1, null);
  }
  constructor(opts) {
    _class_private_method_init(this, _setNotConnectedReason);
    _class_private_method_init(this, _register1);
    _class_private_field_init$2(this, _reportIntervalMs, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _host1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _reporter, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _lc6, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _timerID1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _metrics, {
      writable: true,
      value: []
    });
    _define_property$1(this, "timeToConnectMs", _class_private_method_get(this, _register1, register1).call(this, new Gauge(TimeToConnectMs)));
    _define_property$1(this, "lastConnectError", _class_private_method_get(this, _register1, register1).call(this, new State(LastConnectError, true)));
    _class_private_field_init$2(this, _notConnected, {
      writable: true,
      value: _class_private_method_get(this, _register1, register1).call(this, new State(NotConnected))
    });
    _class_private_field_init$2(this, _timeToConnectMsV2, {
      writable: true,
      value: _class_private_method_get(this, _register1, register1).call(this, new Gauge(TimeToConnectMsV2))
    });
    _class_private_field_init$2(this, _lastConnectErrorV2, {
      writable: true,
      value: _class_private_method_get(this, _register1, register1).call(this, new State(LastConnectErrorV2))
    });
    _class_private_field_init$2(this, _totalTimeToConnectMs, {
      writable: true,
      value: _class_private_method_get(this, _register1, register1).call(this, new Gauge(TotalTimeToConnectMs))
    });
    _define_property$1(this, "tags", []);
    _class_private_field_set$2(this, _reportIntervalMs, opts.reportIntervalMs);
    _class_private_field_set$2(this, _host1, opts.host);
    _class_private_field_set$2(this, _reporter, opts.reporter);
    _class_private_field_set$2(this, _lc6, opts.lc);
    this.tags.push(`source:${opts.source}`);
    this.timeToConnectMs.set(DID_NOT_CONNECT_VALUE);
    _class_private_method_get(this, _setNotConnectedReason, setNotConnectedReason).call(this, "init");
    _class_private_field_set$2(this, _timerID1, setInterval(() => {
      void this.flush();
    }, _class_private_field_get$2(this, _reportIntervalMs)));
  }
}, _class23);
function makePoint(ts, value) {
  return [
    ts,
    [
      value
    ]
  ];
}
var Gauge = (_name1 = /* @__PURE__ */ new WeakMap(), _value = /* @__PURE__ */ new WeakMap(), class {
  set(value) {
    _class_private_field_set$2(this, _value, value);
  }
  get() {
    return _class_private_field_get$2(this, _value);
  }
  clear() {
    _class_private_field_set$2(this, _value, void 0);
  }
  flush() {
    if (_class_private_field_get$2(this, _value) === void 0) {
      return void 0;
    }
    const points = [
      makePoint(t(), _class_private_field_get$2(this, _value))
    ];
    return {
      metric: _class_private_field_get$2(this, _name1),
      points
    };
  }
  constructor(name) {
    _class_private_field_init$2(this, _name1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _value, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _name1, name);
  }
});
function t() {
  return Math.round(Date.now() / 1e3);
}
var State = (_prefix1 = /* @__PURE__ */ new WeakMap(), _clearOnFlush = /* @__PURE__ */ new WeakMap(), _current = /* @__PURE__ */ new WeakMap(), class {
  set(state) {
    _class_private_field_set$2(this, _current, state);
  }
  get() {
    return _class_private_field_get$2(this, _current);
  }
  clear() {
    _class_private_field_set$2(this, _current, void 0);
  }
  flush() {
    if (_class_private_field_get$2(this, _current) === void 0) {
      return void 0;
    }
    const gauge = new Gauge([
      _class_private_field_get$2(this, _prefix1),
      _class_private_field_get$2(this, _current)
    ].join("_"));
    gauge.set(1);
    const series = gauge.flush();
    if (_class_private_field_get$2(this, _clearOnFlush)) {
      this.clear();
    }
    return series;
  }
  constructor(prefix, clearOnFlush = false) {
    _class_private_field_init$2(this, _prefix1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _clearOnFlush, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _current, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _prefix1, prefix);
    _class_private_field_set$2(this, _clearOnFlush, clearOnFlush);
  }
});
var currentEphemeralID = 0;
function nextEphemeralID() {
  return ++currentEphemeralID;
}
var MutationTracker = (_outstandingMutations = /* @__PURE__ */ new WeakMap(), _ephemeralIDsByMutationID = /* @__PURE__ */ new WeakMap(), _allMutationsAppliedListeners = /* @__PURE__ */ new WeakMap(), _lc7 = /* @__PURE__ */ new WeakMap(), _ackMutations = /* @__PURE__ */ new WeakMap(), _clientID1 = /* @__PURE__ */ new WeakMap(), _largestOutstandingMutationID = /* @__PURE__ */ new WeakMap(), _currentMutationID = /* @__PURE__ */ new WeakMap(), _processMutationResponses = /* @__PURE__ */ new WeakSet(), _resolveMutations = /* @__PURE__ */ new WeakSet(), _processPushOk = /* @__PURE__ */ new WeakSet(), _processMutationError = /* @__PURE__ */ new WeakSet(), _processMutationOk = /* @__PURE__ */ new WeakSet(), _settleMutation = /* @__PURE__ */ new WeakSet(), _notifyAllMutationsAppliedListeners = /* @__PURE__ */ new WeakSet(), _class24 = class {
  setClientIDAndWatch(clientID, experimentalWatch) {
    assert(_class_private_field_get$2(this, _clientID1) === void 0, "clientID already set");
    _class_private_field_set$2(this, _clientID1, clientID);
    experimentalWatch((diffs) => {
      _class_private_method_get(this, _processMutationResponses, processMutationResponses).call(this, diffs);
    }, {
      prefix: MUTATIONS_KEY_PREFIX + clientID + "/",
      initialValuesInFirstDiff: true
    });
  }
  trackMutation() {
    const id = nextEphemeralID();
    const mutationResolver = resolver();
    _class_private_field_get$2(this, _outstandingMutations).set(id, {
      resolver: mutationResolver
    });
    return {
      ephemeralID: id,
      serverPromise: mutationResolver.promise
    };
  }
  mutationIDAssigned(id, mutationID) {
    const entry = _class_private_field_get$2(this, _outstandingMutations).get(id);
    if (entry) {
      entry.mutationID = mutationID;
      _class_private_field_get$2(this, _ephemeralIDsByMutationID).set(mutationID, id);
      _class_private_field_set$2(this, _largestOutstandingMutationID, Math.max(_class_private_field_get$2(this, _largestOutstandingMutationID), mutationID));
    }
  }
  /**
  * Reject the mutation due to an unhandled exception on the client.
  * The mutation must not have been persisted to the client store.
  */
  rejectMutation(id, e) {
    const entry = _class_private_field_get$2(this, _outstandingMutations).get(id);
    if (entry) {
      _class_private_method_get(this, _settleMutation, settleMutation).call(this, id, entry, "reject", e);
    }
  }
  processPushResponse(response) {
    if ("error" in response) {
      _class_private_field_get$2(this, _lc7).error?.("Received an error response when pushing mutations", response);
    } else {
      _class_private_method_get(this, _processPushOk, processPushOk).call(this, response);
    }
  }
  /**
  * DEPRECATED: to be removed when we switch to fully driving
  * mutation resolution via poke.
  *
  * When we reconnect to zero-cache, we resolve all outstanding mutations
  * whose ID is less than or equal to the lastMutationID.
  *
  * The reason is that any responses the API server sent
  * to those mutations have been lost.
  *
  * An example case: the API server responds while the connection
  * is down. Those responses are lost.
  *
  * Mutations whose LMID is > the lastMutationID are not resolved
  * since they will be retried by the client, giving us another chance
  * at getting a response.
  *
  * The only way to ensure that all API server responses are
  * received would be to have the API server write them
  * to the DB while writing the LMID.
  */
  onConnected(lastMutationID) {
    this.lmidAdvanced(lastMutationID);
  }
  /**
  * lmid advance will:
  * 1. notify "allMutationsApplied" listeners if the lastMutationID
  *    is greater than or equal to the largest outstanding mutation ID.
  * 2. resolve all mutations whose mutation ID is less than or equal to
  *    the lastMutationID.
  */
  lmidAdvanced(lastMutationID) {
    assert(lastMutationID >= _class_private_field_get$2(this, _currentMutationID), "lmid must be greater than or equal to current lmid");
    if (lastMutationID === _class_private_field_get$2(this, _currentMutationID)) {
      return;
    }
    try {
      _class_private_field_set$2(this, _currentMutationID, lastMutationID);
      _class_private_method_get(this, _resolveMutations, resolveMutations).call(this, lastMutationID);
    } finally {
      if (lastMutationID >= _class_private_field_get$2(this, _largestOutstandingMutationID)) {
        _class_private_method_get(this, _notifyAllMutationsAppliedListeners, notifyAllMutationsAppliedListeners).call(this);
      }
    }
  }
  get size() {
    return _class_private_field_get$2(this, _outstandingMutations).size;
  }
  /**
  * Be notified when all mutations have been included in the server snapshot.
  *
  * The query manager will not de-register queries from the server until there
  * are no pending mutations.
  *
  * The reason is that a mutation may need to be rebased. We do not want
  * data that was available the first time it was run to not be available
  * on a rebase.
  */
  onAllMutationsApplied(listener) {
    _class_private_field_get$2(this, _allMutationsAppliedListeners).add(listener);
  }
  constructor(lc, ackMutations) {
    _class_private_method_init(this, _processMutationResponses);
    _class_private_method_init(this, _resolveMutations);
    _class_private_method_init(this, _processPushOk);
    _class_private_method_init(this, _processMutationError);
    _class_private_method_init(this, _processMutationOk);
    _class_private_method_init(this, _settleMutation);
    _class_private_method_init(this, _notifyAllMutationsAppliedListeners);
    _class_private_field_init$2(this, _outstandingMutations, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _ephemeralIDsByMutationID, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _allMutationsAppliedListeners, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _lc7, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _ackMutations, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _clientID1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _largestOutstandingMutationID, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _currentMutationID, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _lc7, lc.withContext("MutationTracker"));
    _class_private_field_set$2(this, _outstandingMutations, /* @__PURE__ */ new Map());
    _class_private_field_set$2(this, _ephemeralIDsByMutationID, /* @__PURE__ */ new Map());
    _class_private_field_set$2(this, _allMutationsAppliedListeners, /* @__PURE__ */ new Set());
    _class_private_field_set$2(this, _largestOutstandingMutationID, 0);
    _class_private_field_set$2(this, _currentMutationID, 0);
    _class_private_field_set$2(this, _ackMutations, ackMutations);
  }
}, _class24);
var TimedOut = 0;
var Success = 1;
var QueryManager = (_clientID2 = /* @__PURE__ */ new WeakMap(), _clientToServer = /* @__PURE__ */ new WeakMap(), _serverToClient = /* @__PURE__ */ new WeakMap(), _send1 = /* @__PURE__ */ new WeakMap(), _queries = /* @__PURE__ */ new WeakMap(), _recentQueriesMaxSize = /* @__PURE__ */ new WeakMap(), _recentQueries = /* @__PURE__ */ new WeakMap(), _gotQueries = /* @__PURE__ */ new WeakMap(), _mutationTracker = /* @__PURE__ */ new WeakMap(), _pendingQueryChanges = /* @__PURE__ */ new WeakMap(), _queryChangeThrottleMs = /* @__PURE__ */ new WeakMap(), _pendingRemovals = /* @__PURE__ */ new WeakMap(), _batchTimer = /* @__PURE__ */ new WeakMap(), _lc8 = /* @__PURE__ */ new WeakMap(), _metrics1 = /* @__PURE__ */ new WeakMap(), _queryMetrics = /* @__PURE__ */ new WeakMap(), _slowMaterializeThreshold = /* @__PURE__ */ new WeakMap(), _fireGotCallbacks = /* @__PURE__ */ new WeakSet(), _add = /* @__PURE__ */ new WeakSet(), _updateEntry = /* @__PURE__ */ new WeakSet(), _queueQueryChange = /* @__PURE__ */ new WeakSet(), _scheduleBatch = /* @__PURE__ */ new WeakSet(), _remove = /* @__PURE__ */ new WeakSet(), _class25 = class {
  getAST(queryID) {
    const ast = _class_private_field_get$2(this, _queries).get(queryID)?.normalized;
    return ast && mapAST(ast, _class_private_field_get$2(this, _serverToClient));
  }
  /**
  * Get the queries that need to be registered with the server.
  *
  * An optional `lastPatch` can be provided. This is the last patch that was
  * sent to the server and may not yet have been acked. If `lastPatch` is provided,
  * this method will return a patch that does not include any events sent in `lastPatch`.
  *
  * This diffing of last patch and current patch is needed since we send
  * a set of queries to the server when we first connect inside of the `sec-protocol` as
  * the `initConnectionMessage`.
  *
  * While we're waiting for the `connected` response to come back from the server,
  * the client may have registered more queries. We need to diff the `initConnectionMessage`
  * queries with the current set of queries to understand what those were.
  */
  async getQueriesPatch(tx, lastPatch) {
    const existingQueryHashes = /* @__PURE__ */ new Set();
    const prefix = desiredQueriesPrefixForClient(_class_private_field_get$2(this, _clientID2));
    for await (const key of tx.scan({
      prefix
    }).keys()) {
      existingQueryHashes.add(key.substring(prefix.length, key.length));
    }
    const patch = /* @__PURE__ */ new Map();
    for (const hash2 of existingQueryHashes) {
      if (!_class_private_field_get$2(this, _queries).has(hash2)) {
        patch.set(hash2, {
          op: "del",
          hash: hash2
        });
      }
    }
    for (const [hash2, { normalized, ttl, name, args }] of _class_private_field_get$2(this, _queries)) {
      if (!existingQueryHashes.has(hash2)) {
        patch.set(hash2, {
          op: "put",
          hash: hash2,
          ast: name === void 0 ? normalized : void 0,
          name,
          args,
          // We get TTL out of the DagStore so it is possible that the TTL was written
          // with a too high TTL.
          ttl: clampTTL(ttl)
        });
      }
    }
    if (lastPatch) {
      for (const [hash2, { op }] of lastPatch) {
        if (op === "put" && !patch.has(hash2)) {
          patch.set(hash2, {
            op: "del",
            hash: hash2
          });
        }
      }
      for (const [hash2, { op }] of patch) {
        const lastPatchOp = lastPatch.get(hash2);
        if (lastPatchOp && lastPatchOp.op === op) {
          patch.delete(hash2);
        }
      }
    }
    return patch;
  }
  handleTransformErrors(errors) {
    for (const error of errors) {
      const queryId = error.id;
      const entry = _class_private_field_get$2(this, _queries).get(queryId);
      if (entry) {
        entry.gotCallbacks.forEach((callback) => callback(false, error));
      }
    }
  }
  addCustom(ast, { name, args }, ttl, gotCallback) {
    const normalized = normalizeAST(ast);
    const queryId = hashOfNameAndArgs(name, args);
    return _class_private_method_get(this, _add, add1).call(this, queryId, normalized, name, args, ttl, gotCallback);
  }
  addLegacy(ast, ttl, gotCallback) {
    const normalized = normalizeAST(ast);
    const astHash = hashOfAST(normalized);
    return _class_private_method_get(this, _add, add1).call(
      this,
      astHash,
      normalized,
      void 0,
      // name is undefined for legacy queries
      void 0,
      // args are undefined for legacy queries
      ttl,
      gotCallback
    );
  }
  updateCustom({ name, args }, ttl) {
    const queryID = hashOfNameAndArgs(name, args);
    const entry = must(_class_private_field_get$2(this, _queries).get(queryID));
    _class_private_method_get(this, _updateEntry, updateEntry).call(this, entry, queryID, ttl);
  }
  updateLegacy(ast, ttl) {
    const normalized = normalizeAST(ast);
    const queryID = hashOfAST(normalized);
    const entry = must(_class_private_field_get$2(this, _queries).get(queryID));
    _class_private_method_get(this, _updateEntry, updateEntry).call(this, entry, queryID, ttl);
  }
  flushBatch() {
    if (_class_private_field_get$2(this, _batchTimer) !== void 0) {
      clearTimeout(_class_private_field_get$2(this, _batchTimer));
      _class_private_field_set$2(this, _batchTimer, void 0);
    }
    if (_class_private_field_get$2(this, _pendingQueryChanges).length > 0) {
      _class_private_field_get$2(this, _send1).call(this, [
        "changeDesiredQueries",
        {
          desiredQueriesPatch: [
            ..._class_private_field_get$2(this, _pendingQueryChanges)
          ]
        }
      ]);
      _class_private_field_get$2(this, _pendingQueryChanges).length = 0;
    }
  }
  /**
  * Gets the aggregated metrics for all queries managed by this QueryManager.
  */
  get metrics() {
    return _class_private_field_get$2(this, _metrics1);
  }
  addMetric(metric, value, ...args) {
    _class_private_field_get$2(this, _metrics1)[metric].add(value);
    const queryID = args[0];
    if (metric === "query-materialization-end-to-end") {
      const ast = args[1];
      if (_class_private_field_get$2(this, _slowMaterializeThreshold) !== void 0 && value > _class_private_field_get$2(this, _slowMaterializeThreshold)) {
        _class_private_field_get$2(this, _lc8).warn?.("Slow query materialization (including server/network)", queryID, ast, value);
      } else {
        _class_private_field_get$2(this, _lc8).debug?.("Materialized query (including server/network)", queryID, ast, value);
      }
    }
    let existing = _class_private_field_get$2(this, _queryMetrics).get(queryID);
    if (!existing) {
      existing = newMetrics();
      _class_private_field_get$2(this, _queryMetrics).set(queryID, existing);
    }
    existing[metric].add(value);
  }
  getQueryMetrics(queryID) {
    return _class_private_field_get$2(this, _queryMetrics).get(queryID);
  }
  constructor(lc, mutationTracker, clientID, tables, send2, experimentalWatch, recentQueriesMaxSize, queryChangeThrottleMs, slowMaterializeThreshold) {
    _class_private_method_init(this, _fireGotCallbacks);
    _class_private_method_init(this, _add);
    _class_private_method_init(this, _updateEntry);
    _class_private_method_init(this, _queueQueryChange);
    _class_private_method_init(this, _scheduleBatch);
    _class_private_method_init(this, _remove);
    _class_private_field_init$2(this, _clientID2, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _clientToServer, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _serverToClient, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _send1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _queries, {
      writable: true,
      value: /* @__PURE__ */ new Map()
    });
    _class_private_field_init$2(this, _recentQueriesMaxSize, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _recentQueries, {
      writable: true,
      value: /* @__PURE__ */ new Set()
    });
    _class_private_field_init$2(this, _gotQueries, {
      writable: true,
      value: /* @__PURE__ */ new Set()
    });
    _class_private_field_init$2(this, _mutationTracker, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _pendingQueryChanges, {
      writable: true,
      value: []
    });
    _class_private_field_init$2(this, _queryChangeThrottleMs, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _pendingRemovals, {
      writable: true,
      value: []
    });
    _class_private_field_init$2(this, _batchTimer, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _lc8, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _metrics1, {
      writable: true,
      value: newMetrics()
    });
    _class_private_field_init$2(this, _queryMetrics, {
      writable: true,
      value: /* @__PURE__ */ new Map()
    });
    _class_private_field_init$2(this, _slowMaterializeThreshold, {
      writable: true,
      value: void 0
    });
    _class_private_field_set$2(this, _lc8, lc.withContext("QueryManager"));
    _class_private_field_set$2(this, _clientID2, clientID);
    _class_private_field_set$2(this, _clientToServer, clientToServer(tables));
    _class_private_field_set$2(this, _serverToClient, serverToClient(tables));
    _class_private_field_set$2(this, _recentQueriesMaxSize, recentQueriesMaxSize);
    _class_private_field_set$2(this, _send1, send2);
    _class_private_field_set$2(this, _mutationTracker, mutationTracker);
    _class_private_field_set$2(this, _queryChangeThrottleMs, queryChangeThrottleMs);
    _class_private_field_set$2(this, _slowMaterializeThreshold, slowMaterializeThreshold);
    _class_private_field_get$2(this, _mutationTracker).onAllMutationsApplied(() => {
      if (_class_private_field_get$2(this, _pendingRemovals).length === 0) {
        return;
      }
      const pendingRemovals = _class_private_field_get$2(this, _pendingRemovals);
      _class_private_field_set$2(this, _pendingRemovals, []);
      for (const removal of pendingRemovals) {
        removal();
      }
    });
    experimentalWatch((diff3) => {
      for (const diffOp of diff3) {
        const queryHash = diffOp.key.substring(GOT_QUERIES_KEY_PREFIX.length);
        switch (diffOp.op) {
          case "add":
            _class_private_field_get$2(this, _gotQueries).add(queryHash);
            _class_private_method_get(this, _fireGotCallbacks, fireGotCallbacks).call(this, queryHash, true);
            break;
          case "del":
            _class_private_field_get$2(this, _gotQueries).delete(queryHash);
            _class_private_method_get(this, _fireGotCallbacks, fireGotCallbacks).call(this, queryHash, false);
            break;
        }
      }
    }, {
      prefix: GOT_QUERIES_KEY_PREFIX,
      initialValuesInFirstDiff: true
    });
  }
}, _class25);
function newMetrics() {
  return {
    "query-materialization-client": new TDigest(),
    "query-materialization-end-to-end": new TDigest(),
    "query-update-client": new TDigest()
  };
}
var updateNeededReasonTypeSchema = literalUnion(update_needed_reason_type_enum_exports.NewClientGroup, update_needed_reason_type_enum_exports.VersionNotSupported, update_needed_reason_type_enum_exports.SchemaVersionNotSupported);
var RELOAD_REASON_STORAGE_KEY = "_zeroReloadReason";
var RELOAD_BACKOFF_STATE_KEY = "_zeroReloadBackoffState";
var reloadReasonSchema = valita_exports.tuple([
  valita_exports.union(updateNeededReasonTypeSchema, errorKindSchema),
  valita_exports.string()
]);
var backoffStateSchema = valita_exports.object({
  lastReloadTime: valita_exports.number().default(0),
  nextIntervalMs: valita_exports.number().default(0)
});
var MIN_RELOAD_INTERVAL_MS = 500;
var MAX_RELOAD_INTERVAL_MS = 6e4;
var FALLBACK_RELOAD_INTERVAL_MS = 1e4;
var reloadTimer = null;
function reloadWithReason(lc, reload2, reason, message2) {
  if (reloadTimer) {
    lc.info?.("reload timer already scheduled");
    return;
  }
  const now = Date.now();
  const backoff = nextBackoff(lc, now);
  if (typeof sessionStorage !== "undefined") {
    sessionStorage.setItem(RELOAD_BACKOFF_STATE_KEY, JSON.stringify(backoff));
    sessionStorage.setItem(RELOAD_REASON_STORAGE_KEY, JSON.stringify([
      reason,
      message2
    ]));
  }
  const delay = backoff.lastReloadTime - now;
  lc.error?.(reason, "\n", "reloading", delay > 0 ? `in ${delay / 1e3} seconds` : "");
  reloadTimer = setTimeout(() => {
    reloadTimer = null;
    reload2();
  }, delay);
}
function reportReloadReason(lc) {
  if (typeof sessionStorage !== "undefined") {
    const value = sessionStorage.getItem(RELOAD_REASON_STORAGE_KEY);
    if (value) {
      sessionStorage.removeItem(RELOAD_REASON_STORAGE_KEY);
      try {
        const parsed = JSON.parse(value);
        const [reasonType, message2] = parse(parsed, reloadReasonSchema);
        lc.error?.(reasonType, "Zero reloaded the page.", message2);
      } catch (e) {
        lc.error?.("Zero reloaded the page.", e);
        return;
      }
    }
  }
}
function reloadScheduled() {
  return reloadTimer !== null;
}
function resetBackoff() {
  if (typeof sessionStorage !== "undefined") {
    sessionStorage.removeItem(RELOAD_BACKOFF_STATE_KEY);
  }
}
function nextBackoff(lc, now) {
  if (typeof sessionStorage === "undefined") {
    lc.warn?.(`sessionStorage not supported. backing off in ${FALLBACK_RELOAD_INTERVAL_MS / 1e3} seconds`);
    return {
      lastReloadTime: now + FALLBACK_RELOAD_INTERVAL_MS,
      nextIntervalMs: MIN_RELOAD_INTERVAL_MS
    };
  }
  const val = sessionStorage.getItem(RELOAD_BACKOFF_STATE_KEY);
  if (!val) {
    return {
      lastReloadTime: now,
      nextIntervalMs: MIN_RELOAD_INTERVAL_MS
    };
  }
  let parsed;
  try {
    parsed = parse(JSON.parse(val), backoffStateSchema, "passthrough");
  } catch (e) {
    lc.warn?.("ignoring unparsable backoff state", val, e);
    return {
      lastReloadTime: now,
      nextIntervalMs: MIN_RELOAD_INTERVAL_MS
    };
  }
  const { lastReloadTime, nextIntervalMs } = parsed;
  if (now - lastReloadTime > MAX_RELOAD_INTERVAL_MS * 2) {
    return {
      lastReloadTime: now,
      nextIntervalMs: MIN_RELOAD_INTERVAL_MS
    };
  }
  if (now < lastReloadTime) {
    return parsed;
  }
  const nextReloadTime = Math.max(now, lastReloadTime + nextIntervalMs);
  return {
    lastReloadTime: nextReloadTime,
    nextIntervalMs: Math.min(nextIntervalMs * 2, MAX_RELOAD_INTERVAL_MS)
  };
}
var ServerError = class extends Error {
  get kind() {
    return this.errorBody.kind;
  }
  constructor(errorBody) {
    super(errorBody.kind + ": " + errorBody.message), _define_property$1(this, "name", "ServerError"), _define_property$1(this, "errorBody", void 0);
    this.errorBody = errorBody;
  }
};
function isServerError(ex) {
  return ex instanceof ServerError;
}
function isAuthError(ex) {
  return isServerError(ex) && isAuthErrorKind(ex.kind);
}
function isAuthErrorKind(kind) {
  return kind === error_kind_enum_exports.AuthInvalidated || kind === error_kind_enum_exports.Unauthorized;
}
function isBackoffError(ex) {
  if (isServerError(ex)) {
    switch (ex.errorBody.kind) {
      case error_kind_enum_exports.Rebalance:
      case error_kind_enum_exports.Rehome:
      case error_kind_enum_exports.ServerOverloaded:
        return ex.errorBody;
    }
  }
  return void 0;
}
function validateServerParam(paramName, server) {
  const expectedProtocol = "http";
  const forExample = (path = "") => ` For example: "${expectedProtocol}s://myapp-myteam.zero.ms/${path}".`;
  if (!server.startsWith(`${expectedProtocol}://`) && !server.startsWith(`${expectedProtocol}s://`)) {
    throw new Error(`ZeroOptions.${paramName} must use the "${expectedProtocol}" or "${expectedProtocol}s" scheme.`);
  }
  let url;
  try {
    url = new URL(server);
  } catch {
    throw new Error(`ZeroOptions.${paramName} must be a valid URL.${forExample()}`);
  }
  const urlString = url.toString();
  const pathComponents = url.pathname.split("/");
  if (pathComponents[0] === "") {
    pathComponents.shift();
  }
  if (pathComponents[pathComponents.length - 1] === "") {
    pathComponents.pop();
  }
  if (pathComponents.length > 1) {
    throw new Error(`ZeroOptions.${paramName} may have at most one path component.${forExample("zero")}`);
  }
  for (const [property, invalidEndsWith] of [
    [
      "search",
      "?"
    ],
    [
      "hash",
      "#"
    ]
  ]) {
    if (url[property] || urlString.endsWith(invalidEndsWith)) {
      throw new Error(`ZeroOptions.${paramName} must not contain a ${property} component.${forExample()}`);
    }
  }
  return urlString;
}
function getServer(server) {
  const WS = getBrowserGlobal("WebSocket");
  if (!WS) {
    console.warn("Zero started in an unsupported environment, no data will be synced.");
    return null;
  }
  if (server === void 0 || server === null) {
    console.warn("Zero starting up with no server URL. No data will be synced.");
    return null;
  }
  return validateServerParam("server", server);
}
var ZeroLogContext = LogContext;
var PokeHandler = (_replicachePoke = /* @__PURE__ */ new WeakMap(), _onPokeError = /* @__PURE__ */ new WeakMap(), _clientID3 = /* @__PURE__ */ new WeakMap(), _lc9 = /* @__PURE__ */ new WeakMap(), _receivingPoke = /* @__PURE__ */ new WeakMap(), _pokeBuffer = /* @__PURE__ */ new WeakMap(), _pokePlaybackLoopRunning = /* @__PURE__ */ new WeakMap(), _lastRafPerfTimestamp = /* @__PURE__ */ new WeakMap(), _pokeLock = /* @__PURE__ */ new WeakMap(), _schema9 = /* @__PURE__ */ new WeakMap(), _serverToClient1 = /* @__PURE__ */ new WeakMap(), _mutationTracker1 = /* @__PURE__ */ new WeakMap(), _raf = /* @__PURE__ */ new WeakMap(), _startPlaybackLoop = /* @__PURE__ */ new WeakSet(), _rafCallback = /* @__PURE__ */ new WeakMap(), _processPokesForFrame = /* @__PURE__ */ new WeakSet(), _handlePokeError = /* @__PURE__ */ new WeakSet(), _clear = /* @__PURE__ */ new WeakSet(), _class26 = class {
  handlePokeStart(pokeStart) {
    if (_class_private_field_get$2(this, _receivingPoke)) {
      _class_private_method_get(this, _handlePokeError, handlePokeError).call(this, `pokeStart ${JSON.stringify(pokeStart)} while still receiving  ${JSON.stringify(_class_private_field_get$2(this, _receivingPoke).pokeStart)} `);
      return;
    }
    _class_private_field_set$2(this, _receivingPoke, {
      pokeStart,
      parts: []
    });
  }
  handlePokePart(pokePart) {
    if (pokePart.pokeID !== _class_private_field_get$2(this, _receivingPoke)?.pokeStart.pokeID) {
      _class_private_method_get(this, _handlePokeError, handlePokeError).call(this, `pokePart for ${pokePart.pokeID}, when receiving ${_class_private_field_get$2(this, _receivingPoke)?.pokeStart.pokeID}`);
      return;
    }
    _class_private_field_get$2(this, _receivingPoke).parts.push(pokePart);
    return pokePart.lastMutationIDChanges?.[_class_private_field_get$2(this, _clientID3)];
  }
  handlePokeEnd(pokeEnd) {
    if (pokeEnd.pokeID !== _class_private_field_get$2(this, _receivingPoke)?.pokeStart.pokeID) {
      _class_private_method_get(this, _handlePokeError, handlePokeError).call(this, `pokeEnd for ${pokeEnd.pokeID}, when receiving ${_class_private_field_get$2(this, _receivingPoke)?.pokeStart.pokeID}`);
      return;
    }
    if (pokeEnd.cancel) {
      _class_private_field_set$2(this, _receivingPoke, void 0);
      return;
    }
    _class_private_field_get$2(this, _pokeBuffer).push({
      ..._class_private_field_get$2(this, _receivingPoke),
      pokeEnd
    });
    _class_private_field_set$2(this, _receivingPoke, void 0);
    if (!_class_private_field_get$2(this, _pokePlaybackLoopRunning)) {
      _class_private_method_get(this, _startPlaybackLoop, startPlaybackLoop).call(this);
    }
  }
  handleDisconnect() {
    _class_private_field_get$2(this, _lc9).debug?.("clearing due to disconnect");
    _class_private_method_get(this, _clear, clear).call(this);
  }
  constructor(replicachePoke, onPokeError2, clientID, schema2, lc, mutationTracker) {
    _class_private_method_init(this, _startPlaybackLoop);
    _class_private_method_init(this, _processPokesForFrame);
    _class_private_method_init(this, _handlePokeError);
    _class_private_method_init(this, _clear);
    _class_private_field_init$2(this, _replicachePoke, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _onPokeError, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _clientID3, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _lc9, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _receivingPoke, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _pokeBuffer, {
      writable: true,
      value: []
    });
    _class_private_field_init$2(this, _pokePlaybackLoopRunning, {
      writable: true,
      value: false
    });
    _class_private_field_init$2(this, _lastRafPerfTimestamp, {
      writable: true,
      value: 0
    });
    _class_private_field_init$2(this, _pokeLock, {
      writable: true,
      value: new Lock()
    });
    _class_private_field_init$2(this, _schema9, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _serverToClient1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _mutationTracker1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _raf, {
      writable: true,
      value: getBrowserGlobalMethod("requestAnimationFrame") ?? rafFallback
    });
    _class_private_field_init$2(this, _rafCallback, {
      writable: true,
      value: async () => {
        const rafLC = _class_private_field_get$2(this, _lc9).withContext("rafAt", Math.floor(performance.now()));
        if (_class_private_field_get$2(this, _pokeBuffer).length === 0) {
          rafLC.debug?.("stopping playback loop");
          _class_private_field_set$2(this, _pokePlaybackLoopRunning, false);
          return;
        }
        _class_private_field_get$2(this, _raf).call(this, _class_private_field_get$2(this, _rafCallback));
        const start = performance.now();
        rafLC.debug?.("raf fired, processing pokes.  Since last raf", start - _class_private_field_get$2(this, _lastRafPerfTimestamp));
        _class_private_field_set$2(this, _lastRafPerfTimestamp, start);
        await _class_private_method_get(this, _processPokesForFrame, processPokesForFrame).call(this, rafLC);
        rafLC.debug?.("processing pokes took", performance.now() - start);
      }
    });
    _class_private_field_set$2(this, _replicachePoke, replicachePoke);
    _class_private_field_set$2(this, _onPokeError, onPokeError2);
    _class_private_field_set$2(this, _clientID3, clientID);
    _class_private_field_set$2(this, _schema9, schema2);
    _class_private_field_set$2(this, _serverToClient1, serverToClient(schema2.tables));
    _class_private_field_set$2(this, _lc9, lc.withContext("PokeHandler"));
    _class_private_field_set$2(this, _mutationTracker1, mutationTracker);
  }
}, _class26);
function mergePokes(pokeBuffer, schema2, serverToClient2) {
  if (pokeBuffer.length === 0) {
    return void 0;
  }
  const { baseCookie } = pokeBuffer[0].pokeStart;
  const lastPoke = pokeBuffer[pokeBuffer.length - 1];
  const { cookie } = lastPoke.pokeEnd;
  const mergedPatch = [];
  const mergedLastMutationIDChanges = {};
  const mutationResults = [];
  let prevPokeEnd = void 0;
  for (const pokeAccumulator of pokeBuffer) {
    if (prevPokeEnd && pokeAccumulator.pokeStart.baseCookie && pokeAccumulator.pokeStart.baseCookie > prevPokeEnd.cookie) {
      throw Error(`unexpected cookie gap ${JSON.stringify(prevPokeEnd)} ${JSON.stringify(pokeAccumulator.pokeStart)}`);
    }
    prevPokeEnd = pokeAccumulator.pokeEnd;
    for (const pokePart of pokeAccumulator.parts) {
      if (pokePart.lastMutationIDChanges) {
        for (const [clientID, lastMutationID] of Object.entries(pokePart.lastMutationIDChanges)) {
          mergedLastMutationIDChanges[clientID] = lastMutationID;
        }
      }
      if (pokePart.desiredQueriesPatches) {
        for (const [clientID, queriesPatch] of Object.entries(pokePart.desiredQueriesPatches)) {
          for (const op of queriesPatch) {
            mergedPatch.push(queryPatchOpToReplicachePatchOp(op, (hash2) => toDesiredQueriesKey(clientID, hash2)));
          }
        }
      }
      if (pokePart.gotQueriesPatch) {
        for (const op of pokePart.gotQueriesPatch) {
          mergedPatch.push(queryPatchOpToReplicachePatchOp(op, toGotQueriesKey));
        }
      }
      if (pokePart.rowsPatch) {
        for (const p of pokePart.rowsPatch) {
          mergedPatch.push(rowsPatchOpToReplicachePatchOp(p, schema2, serverToClient2));
        }
      }
      if (pokePart.mutationsPatch) {
        for (const op of pokePart.mutationsPatch) {
          mergedPatch.push(mutationPatchOpToReplicachePatchOp(op));
        }
      }
    }
  }
  const ret = {
    baseCookie,
    pullResponse: {
      lastMutationIDChanges: mergedLastMutationIDChanges,
      patch: mergedPatch,
      cookie
    }
  };
  if (mutationResults.length > 0) {
    ret.mutationResults = mutationResults;
  }
  return ret;
}
function queryPatchOpToReplicachePatchOp(op, toKey) {
  switch (op.op) {
    case "clear":
      return op;
    case "del":
      return {
        op: "del",
        key: toKey(op.hash)
      };
    case "put":
      return {
        op: "put",
        key: toKey(op.hash),
        value: null
      };
    default:
      unreachable();
  }
}
function mutationPatchOpToReplicachePatchOp(op) {
  switch (op.op) {
    case "put":
      return {
        op: "put",
        key: toMutationResponseKey(op.mutation.id),
        value: op.mutation.result
      };
    case "del":
      return {
        op: "del",
        key: toMutationResponseKey(op.id)
      };
  }
}
function rowsPatchOpToReplicachePatchOp(op, schema2, serverToClient2) {
  if (op.op === "clear") {
    return op;
  }
  const tableName = serverToClient2.tableName(op.tableName, op);
  switch (op.op) {
    case "del":
      return {
        op: "del",
        key: toPrimaryKeyString(tableName, schema2.tables[tableName].primaryKey, serverToClient2.row(op.tableName, op.id))
      };
    case "put":
      return {
        op: "put",
        key: toPrimaryKeyString(tableName, schema2.tables[tableName].primaryKey, serverToClient2.row(op.tableName, op.value)),
        value: serverToClient2.row(op.tableName, op.value)
      };
    case "update":
      return {
        op: "update",
        key: toPrimaryKeyString(tableName, schema2.tables[tableName].primaryKey, serverToClient2.row(op.tableName, op.id)),
        merge: op.merge ? serverToClient2.row(op.tableName, op.merge) : void 0,
        constrain: serverToClient2.columns(op.tableName, op.constrain)
      };
    default:
      unreachable();
  }
}
function rafFallback(callback) {
  setTimeout(callback, 0);
}
var ZeroRep = (_context = /* @__PURE__ */ new WeakMap(), _ivmMain = /* @__PURE__ */ new WeakMap(), _customMutatorsEnabled = /* @__PURE__ */ new WeakMap(), _mutationTracker2 = /* @__PURE__ */ new WeakMap(), _store1 = /* @__PURE__ */ new WeakMap(), _auth1 = /* @__PURE__ */ new WeakMap(), class {
  set auth(auth) {
    if (auth === "") {
      _class_private_field_set$2(this, _auth1, void 0);
    } else {
      _class_private_field_set$2(this, _auth1, auth);
    }
  }
  async init(hash2, store) {
    const diffs = [];
    await withRead(store, async (dagRead) => {
      const read = await readFromHash(hash2, dagRead, Latest);
      for await (const entry of read.map.scan(ENTITIES_KEY_PREFIX)) {
        if (!entry[0].startsWith(ENTITIES_KEY_PREFIX)) {
          break;
        }
        diffs.push({
          op: "add",
          key: entry[0],
          newValue: entry[1]
        });
      }
    });
    _class_private_field_set$2(this, _store1, store);
    _class_private_field_get$2(this, _context).processChanges(void 0, hash2, diffs);
  }
  trackMutation() {
    return _class_private_field_get$2(this, _mutationTracker2).trackMutation();
  }
  mutationIDAssigned(ephemeralID, mutationID) {
    _class_private_field_get$2(this, _mutationTracker2).mutationIDAssigned(ephemeralID, mutationID);
  }
  rejectMutation(ephemeralID, ex) {
    _class_private_field_get$2(this, _mutationTracker2).rejectMutation(ephemeralID, ex);
  }
  constructor(context, ivmMain, customMutatorsEnabled, mutationTracker) {
    _class_private_field_init$2(this, _context, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _ivmMain, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _customMutatorsEnabled, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _mutationTracker2, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _store1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _auth1, {
      writable: true,
      value: void 0
    });
    _define_property$1(this, "getTxData", (desiredHead, readOptions) => {
      if (!_class_private_field_get$2(this, _customMutatorsEnabled)) {
        return;
      }
      return _class_private_field_get$2(this, _ivmMain).forkToHead(must(_class_private_field_get$2(this, _store1)), desiredHead, readOptions).then((branch) => ({
        ivmSources: branch,
        token: _class_private_field_get$2(this, _auth1)
      }));
    });
    _define_property$1(this, "advance", (expectedHash, newHash, diffs) => {
      _class_private_field_get$2(this, _context).processChanges(expectedHash, newHash, diffs);
    });
    _class_private_field_set$2(this, _context, context);
    _class_private_field_set$2(this, _ivmMain, ivmMain);
    _class_private_field_set$2(this, _customMutatorsEnabled, customMutatorsEnabled);
    _class_private_field_set$2(this, _mutationTracker2, mutationTracker);
  }
});
var RUN_LOOP_INTERVAL_MS = 5e3;
var PING_INTERVAL_MS = 5e3;
var PING_TIMEOUT_MS = 5e3;
var PULL_TIMEOUT_MS = 5e3;
var DEFAULT_DISCONNECT_HIDDEN_DELAY_MS = 5e3;
var CONNECT_TIMEOUT_MS = 1e4;
var CHECK_CONNECTIVITY_ON_ERROR_FREQUENCY = 6;
var NULL_LAST_MUTATION_ID_SENT = {
  clientID: "",
  id: -1
};
var DEFAULT_QUERY_CHANGE_THROTTLE_MS = 10;
function convertOnUpdateNeededReason(reason) {
  return {
    type: reason.type
  };
}
function updateNeededReloadReasonMessage(reason) {
  const { type } = reason;
  let reasonMsg = "";
  switch (type) {
    case "NewClientGroup":
      reasonMsg = "This client could not sync with a newer client. This is probably due to another tab loading a newer incompatible version of the app's code.";
      break;
    case "VersionNotSupported":
      reasonMsg = "The server no longer supports this client's protocol version.";
      break;
    case "SchemaVersionNotSupported":
      reasonMsg = "Client and server schemas incompatible.";
      break;
    default:
      unreachable();
  }
  if (reason.message) {
    reasonMsg += " " + reason.message;
  }
  return reasonMsg;
}
var serverAheadReloadReason = `Server reported that client is ahead of server. This probably happened because the server is in development mode and restarted. Currently when this happens, the dev server loses its state and on reconnect sees the client as ahead. If you see this in other cases, it may be a bug in Zero.`;
function onClientStateNotFoundServerReason(serverErrMsg) {
  return `Server could not find state needed to synchronize this client. ${serverErrMsg}`;
}
var ON_CLIENT_STATE_NOT_FOUND_REASON_CLIENT = "The local persistent state needed to synchronize this client has been garbage collected.";
var CLOSE_CODE_NORMAL = 1e3;
var Zero = (_rep = /* @__PURE__ */ new WeakMap(), _server = /* @__PURE__ */ new WeakMap(), _lc10 = /* @__PURE__ */ new WeakMap(), _logOptions = /* @__PURE__ */ new WeakMap(), _enableAnalytics = /* @__PURE__ */ new WeakMap(), _clientSchema = /* @__PURE__ */ new WeakMap(), _pokeHandler = /* @__PURE__ */ new WeakMap(), _queryManager = /* @__PURE__ */ new WeakMap(), _ivmMain1 = /* @__PURE__ */ new WeakMap(), _clientToServer1 = /* @__PURE__ */ new WeakMap(), _deleteClientsManager = /* @__PURE__ */ new WeakMap(), _mutationTracker3 = /* @__PURE__ */ new WeakMap(), _initConnectionQueries = /* @__PURE__ */ new WeakMap(), _deletedClients = /* @__PURE__ */ new WeakMap(), _lastMutationIDSent = /* @__PURE__ */ new WeakMap(), _onPong = /* @__PURE__ */ new WeakMap(), _onlineManager = /* @__PURE__ */ new WeakMap(), _onUpdateNeeded = /* @__PURE__ */ new WeakMap(), _onClientStateNotFound = /* @__PURE__ */ new WeakMap(), _connectCookie = /* @__PURE__ */ new WeakMap(), _connectedCount = /* @__PURE__ */ new WeakMap(), _messageCount = /* @__PURE__ */ new WeakMap(), _connectedAt = /* @__PURE__ */ new WeakMap(), _connectErrorCount = /* @__PURE__ */ new WeakMap(), _abortPingTimeout = /* @__PURE__ */ new WeakMap(), _zeroContext = /* @__PURE__ */ new WeakMap(), _connectResolver = /* @__PURE__ */ new WeakMap(), _pendingPullsByRequestID = /* @__PURE__ */ new WeakMap(), _lastMutationIDReceived = /* @__PURE__ */ new WeakMap(), _socket = /* @__PURE__ */ new WeakMap(), _socketResolver = /* @__PURE__ */ new WeakMap(), _connectionStateChangeResolver = /* @__PURE__ */ new WeakMap(), _rejectMessageError = /* @__PURE__ */ new WeakMap(), _closeAbortController1 = /* @__PURE__ */ new WeakMap(), _visibilityWatcher1 = /* @__PURE__ */ new WeakMap(), _connectionState = /* @__PURE__ */ new WeakMap(), _activeClientsManager = /* @__PURE__ */ new WeakMap(), _inspector = /* @__PURE__ */ new WeakMap(), _setConnectionState = /* @__PURE__ */ new WeakSet(), _connectStart = /* @__PURE__ */ new WeakMap(), _totalToConnectStart = /* @__PURE__ */ new WeakMap(), _options1 = /* @__PURE__ */ new WeakMap(), _metrics2 = /* @__PURE__ */ new WeakMap(), _reload = /* @__PURE__ */ new WeakMap(), _expose = /* @__PURE__ */ new WeakSet(), _unexpose = /* @__PURE__ */ new WeakSet(), _send2 = /* @__PURE__ */ new WeakSet(), _createLogOptions = /* @__PURE__ */ new WeakSet(), _onMessage = /* @__PURE__ */ new WeakMap(), _onOpen = /* @__PURE__ */ new WeakMap(), _onClose = /* @__PURE__ */ new WeakMap(), _handleErrorMessage = /* @__PURE__ */ new WeakSet(), _handleConnectedMessage = /* @__PURE__ */ new WeakSet(), _connect = /* @__PURE__ */ new WeakSet(), _disconnect1 = /* @__PURE__ */ new WeakSet(), _handlePokeStart = /* @__PURE__ */ new WeakSet(), _handlePokePart = /* @__PURE__ */ new WeakSet(), _handlePokeEnd = /* @__PURE__ */ new WeakSet(), _onPokeError1 = /* @__PURE__ */ new WeakSet(), _handlePullResponse = /* @__PURE__ */ new WeakSet(), _pusher = /* @__PURE__ */ new WeakSet(), _updateAuthToken = /* @__PURE__ */ new WeakSet(), _runLoop = /* @__PURE__ */ new WeakSet(), _puller = /* @__PURE__ */ new WeakSet(), _setOnline = /* @__PURE__ */ new WeakSet(), _ping = /* @__PURE__ */ new WeakSet(), _reportMetrics = /* @__PURE__ */ new WeakSet(), _checkConnectivity = /* @__PURE__ */ new WeakSet(), _checkConnectivityAsync = /* @__PURE__ */ new WeakSet(), _registerQueries = /* @__PURE__ */ new WeakSet(), _addMetric = /* @__PURE__ */ new WeakMap(), __Zero = class _Zero {
  preload(query, options) {
    return query[delegateSymbol](_class_private_field_get$2(this, _zeroContext)).preload(options);
  }
  run(query, runOptions) {
    return query[delegateSymbol](_class_private_field_get$2(this, _zeroContext)).run(runOptions);
  }
  materialize(query, factoryOrOptions, maybeOptions) {
    return materialize(query, _class_private_field_get$2(this, _zeroContext), factoryOrOptions, maybeOptions);
  }
  /**
  * The server URL that this Zero instance is configured with.
  */
  get server() {
    return _class_private_field_get$2(this, _server);
  }
  /**
  * The name of the IndexedDB database in which the data of this
  * instance of Zero is stored.
  */
  get idbName() {
    return _class_private_field_get$2(this, _rep).idbName;
  }
  /**
  * The schema version of the data understood by this application.
  * See [[ZeroOptions.schemaVersion]].
  */
  get schemaVersion() {
    return _class_private_field_get$2(this, _rep).schemaVersion;
  }
  /**
  * The client ID for this instance of Zero. Each instance
  * gets a unique client ID.
  */
  get clientID() {
    return _class_private_field_get$2(this, _rep).clientID;
  }
  get clientGroupID() {
    return _class_private_field_get$2(this, _rep).clientGroupID;
  }
  /**
  * Whether this Zero instance has been closed.
  *
  * Once a Zero instance has been closed it no longer syncs, you can no
  * longer query or mutate data with it, and its query views stop updating.
  */
  get closed() {
    return _class_private_field_get$2(this, _rep).closed;
  }
  /**
  * Closes this Zero instance.
  *
  * Once a Zero instance has been closed it no longer syncs, you can no
  * longer query or mutate data with it, and its query views stop updating.
  */
  async close() {
    const lc = _class_private_field_get$2(this, _lc10).withContext("close");
    lc.debug?.("Closing Zero instance. Stack:", new Error().stack);
    _class_private_field_get$2(this, _onlineManager).cleanup();
    if (_class_private_field_get$2(this, _connectionState) !== Disconnected) {
      _class_private_method_get(this, _disconnect1, disconnect1).call(this, lc, {
        client: "ClientClosed"
      }, CLOSE_CODE_NORMAL);
    }
    lc.debug?.("Aborting closeAbortController due to close()");
    _class_private_field_get$2(this, _closeAbortController1).abort();
    _class_private_field_get$2(this, _metrics2).stop();
    const ret = await _class_private_field_get$2(this, _rep).close();
    _class_private_method_get(this, _unexpose, unexpose).call(this);
    return ret;
  }
  /**
  * A rough heuristic for whether the client is currently online and
  * authenticated.
  */
  get online() {
    return _class_private_field_get$2(this, _onlineManager).online;
  }
  /**
  * `inspector` is an object that can be used to inspect the state of the
  * queries a Zero instance uses. It is intended for debugging purposes.
  */
  get inspector() {
    {
      return _class_private_field_set$2(this, _inspector, _class_private_field_get$2(this, _inspector) ?? new Inspector(_class_private_field_get$2(this, _rep), _class_private_field_get$2(this, _queryManager), async () => {
        await _class_private_field_get$2(this, _connectResolver).promise;
        return _class_private_field_get$2(this, _socket);
      }));
    }
  }
  /**
  * Constructs a new Zero client.
  */
  constructor(options) {
    _class_private_method_init(this, _setConnectionState);
    _class_private_method_init(this, _expose);
    _class_private_method_init(this, _unexpose);
    _class_private_method_init(this, _send2);
    _class_private_method_init(this, _createLogOptions);
    _class_private_method_init(this, _handleErrorMessage);
    _class_private_method_init(this, _handleConnectedMessage);
    _class_private_method_init(this, _connect);
    _class_private_method_init(this, _disconnect1);
    _class_private_method_init(this, _handlePokeStart);
    _class_private_method_init(this, _handlePokePart);
    _class_private_method_init(this, _handlePokeEnd);
    _class_private_method_init(this, _onPokeError1);
    _class_private_method_init(this, _handlePullResponse);
    _class_private_method_init(this, _pusher);
    _class_private_method_init(this, _updateAuthToken);
    _class_private_method_init(this, _runLoop);
    _class_private_method_init(this, _puller);
    _class_private_method_init(this, _setOnline);
    _class_private_method_init(this, _ping);
    _class_private_method_init(this, _reportMetrics);
    _class_private_method_init(this, _checkConnectivity);
    _class_private_method_init(this, _checkConnectivityAsync);
    _class_private_method_init(this, _registerQueries);
    _define_property$1(this, "version", version2);
    _class_private_field_init$2(this, _rep, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _server, {
      writable: true,
      value: void 0
    });
    _define_property$1(this, "userID", void 0);
    _define_property$1(this, "storageKey", void 0);
    _class_private_field_init$2(this, _lc10, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _logOptions, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _enableAnalytics, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _clientSchema, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _pokeHandler, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _queryManager, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _ivmMain1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _clientToServer1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _deleteClientsManager, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _mutationTracker3, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _initConnectionQueries, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _deletedClients, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _lastMutationIDSent, {
      writable: true,
      value: NULL_LAST_MUTATION_ID_SENT
    });
    _class_private_field_init$2(this, _onPong, {
      writable: true,
      value: () => void 0
    });
    _class_private_field_init$2(this, _onlineManager, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _onUpdateNeeded, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _onClientStateNotFound, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _connectCookie, {
      writable: true,
      value: null
    });
    _class_private_field_init$2(this, _connectedCount, {
      writable: true,
      value: 0
    });
    _class_private_field_init$2(this, _messageCount, {
      writable: true,
      value: 0
    });
    _class_private_field_init$2(this, _connectedAt, {
      writable: true,
      value: 0
    });
    _class_private_field_init$2(this, _connectErrorCount, {
      writable: true,
      value: 0
    });
    _class_private_field_init$2(this, _abortPingTimeout, {
      writable: true,
      value: () => {
      }
    });
    _class_private_field_init$2(this, _zeroContext, {
      writable: true,
      value: void 0
    });
    _define_property$1(this, "queryDelegate", void 0);
    _class_private_field_init$2(this, _connectResolver, {
      writable: true,
      value: resolver()
    });
    _class_private_field_init$2(this, _pendingPullsByRequestID, {
      writable: true,
      value: /* @__PURE__ */ new Map()
    });
    _class_private_field_init$2(this, _lastMutationIDReceived, {
      writable: true,
      value: 0
    });
    _class_private_field_init$2(this, _socket, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _socketResolver, {
      writable: true,
      value: resolver()
    });
    _class_private_field_init$2(this, _connectionStateChangeResolver, {
      writable: true,
      value: resolver()
    });
    _class_private_field_init$2(this, _rejectMessageError, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _closeAbortController1, {
      writable: true,
      value: new AbortController()
    });
    _class_private_field_init$2(this, _visibilityWatcher1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _connectionState, {
      writable: true,
      value: Disconnected
    });
    _class_private_field_init$2(this, _activeClientsManager, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _inspector, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _connectStart, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _totalToConnectStart, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _options1, {
      writable: true,
      value: void 0
    });
    _define_property$1(this, "query", void 0);
    _class_private_field_init$2(this, _metrics2, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$2(this, _reload, {
      writable: true,
      value: () => getBrowserGlobal("location")?.reload()
    });
    _define_property$1(this, "mutate", void 0);
    _define_property$1(this, "mutateBatch", void 0);
    _class_private_field_init$2(this, _onMessage, {
      writable: true,
      value: (e) => {
        const lc2 = _class_private_field_get$2(this, _lc10);
        lc2.debug?.("received message", e.data);
        if (this.closed) {
          lc2.debug?.("ignoring message because already closed");
          return;
        }
        const rejectInvalidMessage = (e2) => _class_private_field_get$2(this, _rejectMessageError)?.reject(new Error(`Invalid message received from server: ${e2 instanceof Error ? e2.message + ". " : ""}${data}`));
        let downMessage;
        const { data } = e;
        try {
          downMessage = parse(JSON.parse(data), downstreamSchema, "passthrough");
        } catch (e2) {
          rejectInvalidMessage(e2);
          return;
        }
        _class_private_field_update(this, _messageCount).value++;
        const msgType = downMessage[0];
        switch (msgType) {
          case "connected":
            return _class_private_method_get(this, _handleConnectedMessage, handleConnectedMessage).call(this, lc2, downMessage);
          case "error":
            return _class_private_method_get(this, _handleErrorMessage, handleErrorMessage).call(this, lc2, downMessage);
          case "pong":
            resetBackoff();
            return _class_private_field_get$2(this, _onPong).call(this);
          case "pokeStart":
            return _class_private_method_get(this, _handlePokeStart, handlePokeStart).call(this, lc2, downMessage);
          case "pokePart":
            if (downMessage[1].rowsPatch) {
              resetBackoff();
            }
            return _class_private_method_get(this, _handlePokePart, handlePokePart).call(this, lc2, downMessage);
          case "pokeEnd":
            return _class_private_method_get(this, _handlePokeEnd, handlePokeEnd).call(this, lc2, downMessage);
          case "pull":
            return _class_private_method_get(this, _handlePullResponse, handlePullResponse).call(this, lc2, downMessage);
          case "deleteClients":
            return _class_private_field_get$2(this, _deleteClientsManager).clientsDeletedOnServer(downMessage[1]);
          case "pushResponse":
            return _class_private_field_get$2(this, _mutationTracker3).processPushResponse(downMessage[1]);
          case "transformError":
            _class_private_field_get$2(this, _queryManager).handleTransformErrors(downMessage[1]);
            break;
          case "inspect":
            break;
          default:
            rejectInvalidMessage();
        }
      }
    });
    _class_private_field_init$2(this, _onOpen, {
      writable: true,
      value: () => {
        const l = addWebSocketIDFromSocketToLogContext(_class_private_field_get$2(this, _socket), _class_private_field_get$2(this, _lc10));
        if (_class_private_field_get$2(this, _connectStart) === void 0) {
          l.error?.("Got open event but connect start time is undefined.");
        } else {
          const now = Date.now();
          const timeToOpenMs = now - _class_private_field_get$2(this, _connectStart);
          l.info?.("Got socket open event", {
            navigatorOnline: localNavigator?.onLine,
            timeToOpenMs
          });
        }
      }
    });
    _class_private_field_init$2(this, _onClose, {
      writable: true,
      value: (e) => {
        const lc2 = addWebSocketIDFromSocketToLogContext(_class_private_field_get$2(this, _socket), _class_private_field_get$2(this, _lc10));
        const { code, reason, wasClean } = e;
        if (code <= 1001) {
          lc2.info?.("Got socket close event", {
            code,
            reason,
            wasClean
          });
        } else {
          lc2.error?.("Got unexpected socket close event", {
            code,
            reason,
            wasClean
          });
        }
        const closeKind = wasClean ? "CleanClose" : "AbruptClose";
        _class_private_field_get$2(this, _connectResolver).reject(new CloseError(closeKind));
        _class_private_method_get(this, _disconnect1, disconnect1).call(this, lc2, {
          client: closeKind
        });
      }
    });
    _define_property$1(this, "onOnline", (listener) => _class_private_field_get$2(this, _onlineManager).subscribe(listener));
    _class_private_field_init$2(this, _addMetric, {
      writable: true,
      value: (metric, value, ...args) => {
        assert(isClientMetric(metric), `Invalid metric: ${metric}`);
        _class_private_field_get$2(this, _queryManager).addMetric(metric, value, ...args);
      }
    });
    const { userID, storageKey, onOnlineChange, onUpdateNeeded, onClientStateNotFound, hiddenTabDisconnectDelay = DEFAULT_DISCONNECT_HIDDEN_DELAY_MS, schema: schema2, batchViewUpdates = (applyViewUpdates) => applyViewUpdates(), maxRecentQueries = 0, slowMaterializeThreshold = 5e3 } = options;
    if (!userID) {
      throw new Error("ZeroOptions.userID must not be empty.");
    }
    const server = getServer(options.server);
    _class_private_field_set$2(this, _enableAnalytics, shouldEnableAnalytics(server, false));
    let { kvStore = "idb" } = options;
    if (kvStore === "idb") {
      if (!getBrowserGlobal("indexedDB")) {
        console.warn("IndexedDB is not supported in this environment. Falling back to memory storage.");
        kvStore = "mem";
      }
    }
    if (hiddenTabDisconnectDelay < 0) {
      throw new Error("ZeroOptions.hiddenTabDisconnectDelay must not be negative.");
    }
    _class_private_field_set$2(this, _onlineManager, new OnlineManager());
    if (onOnlineChange) {
      _class_private_field_get$2(this, _onlineManager).subscribe(onOnlineChange);
    }
    _class_private_field_set$2(this, _options1, options);
    _class_private_field_set$2(this, _logOptions, _class_private_method_get(this, _createLogOptions, createLogOptions1).call(this, {
      consoleLogLevel: options.logLevel ?? "warn",
      server: null,
      //server, // Reenable remote logging
      enableAnalytics: _class_private_field_get$2(this, _enableAnalytics)
    }));
    const logOptions = _class_private_field_get$2(this, _logOptions);
    const { enableLegacyMutators = true, enableLegacyQueries = true } = schema2;
    const replicacheMutators = {
      [CRUD_MUTATION_NAME]: enableLegacyMutators ? makeCRUDMutator(schema2) : () => Promise.reject(new Error("Zero CRUD mutators are not enabled."))
    };
    _class_private_field_set$2(this, _ivmMain1, new IVMSourceBranch(schema2.tables));
    function assertUnique(key) {
      assert(replicacheMutators[key] === void 0, `A mutator, or mutator namespace, has already been defined for ${key}`);
    }
    const { onError } = options;
    const sink = logOptions.logSink;
    const logSink = {
      log(level, context, ...args) {
        if (level === "error" && onError) {
          onError(...args);
        } else {
          sink.log(level, context, ...args);
        }
      },
      async flush() {
        await sink.flush?.();
      }
    };
    const lc = new ZeroLogContext(logOptions.logLevel, {}, logSink);
    _class_private_field_set$2(this, _mutationTracker3, new MutationTracker(lc, (upTo) => _class_private_method_get(this, _send2, send1).call(this, [
      "ackMutationResponses",
      upTo
    ])));
    if (options.mutators) {
      for (const [namespaceOrKey, mutatorOrMutators] of Object.entries(options.mutators)) {
        if (typeof mutatorOrMutators === "function") {
          const key = namespaceOrKey;
          assertUnique(key);
          replicacheMutators[key] = makeReplicacheMutator(lc, mutatorOrMutators, schema2);
          continue;
        }
        if (typeof mutatorOrMutators === "object") {
          for (const [name, mutator] of Object.entries(mutatorOrMutators)) {
            const key = customMutatorKey(namespaceOrKey, name);
            assertUnique(key);
            replicacheMutators[key] = makeReplicacheMutator(lc, mutator, schema2);
          }
          continue;
        }
        unreachable();
      }
    }
    this.storageKey = storageKey ?? "";
    const { clientSchema: clientSchema2, hash: hash2 } = clientSchemaFrom(schema2);
    _class_private_field_set$2(this, _clientSchema, clientSchema2);
    const nameKey = JSON.stringify({
      storageKey: this.storageKey,
      mutateUrl: options.mutateURL ?? "",
      queryUrl: options.getQueriesURL ?? ""
    });
    const hashedKey = h64(nameKey).toString(36);
    const replicacheOptions = {
      // The schema stored in IDB is dependent upon both the ClientSchema
      // and the AST schema (i.e. PROTOCOL_VERSION).
      schemaVersion: `${PROTOCOL_VERSION}.${hash2}`,
      logLevel: logOptions.logLevel,
      logSinks: [
        logOptions.logSink
      ],
      mutators: replicacheMutators,
      name: `zero-${userID}-${hashedKey}`,
      pusher: (req, reqID) => _class_private_method_get(this, _pusher, pusher).call(this, req, reqID),
      puller: (req, reqID) => _class_private_method_get(this, _puller, puller).call(this, req, reqID),
      pushDelay: 0,
      requestOptions: {
        maxDelayMs: 0,
        minDelayMs: 0
      },
      licenseKey: "zero-client-static-key",
      kvStore
    };
    _class_private_field_set$2(this, _zeroContext, new ZeroContext$1(lc, _class_private_field_get$2(this, _ivmMain1), (ast, ttl, gotCallback) => {
      if (enableLegacyQueries) {
        return _class_private_field_get$2(this, _queryManager).addLegacy(ast, ttl, gotCallback);
      }
      return emptyFunction;
    }, (ast, customQueryID, ttl, gotCallback) => _class_private_field_get$2(this, _queryManager).addCustom(ast, customQueryID, ttl, gotCallback), (ast, ttl) => {
      if (enableLegacyQueries) {
        _class_private_field_get$2(this, _queryManager).updateLegacy(ast, ttl);
      }
    }, (customQueryID, ttl) => _class_private_field_get$2(this, _queryManager).updateCustom(customQueryID, ttl), () => _class_private_field_get$2(this, _queryManager).flushBatch(), batchViewUpdates, _class_private_field_get$2(this, _addMetric), assertValidRunOptions2));
    this.queryDelegate = _class_private_field_get$2(this, _zeroContext);
    const replicacheImplOptions = {
      enableClientGroupForking: false,
      enableMutationRecovery: false,
      enablePullAndPushInOpen: false,
      // Zero calls push in its connection management code
      onClientsDeleted: (deletedClients) => _class_private_field_get$2(this, _deleteClientsManager).onClientsDeleted(deletedClients),
      zero: new ZeroRep(_class_private_field_get$2(this, _zeroContext), _class_private_field_get$2(this, _ivmMain1), options.mutators !== void 0, _class_private_field_get$2(this, _mutationTracker3))
    };
    const rep = new ReplicacheImpl(replicacheOptions, replicacheImplOptions);
    _class_private_field_set$2(this, _rep, rep);
    _class_private_field_set$2(this, _server, server);
    this.userID = userID;
    _class_private_field_set$2(this, _lc10, lc.withContext("clientID", rep.clientID));
    _class_private_field_get$2(this, _mutationTracker3).setClientIDAndWatch(rep.clientID, rep.experimentalWatch.bind(rep));
    _class_private_field_set$2(this, _activeClientsManager, makeActiveClientsManager(rep.clientGroupID, this.clientID, _class_private_field_get$2(this, _closeAbortController1).signal, (clientID, clientGroupID) => _class_private_field_get$2(this, _deleteClientsManager).onClientsDeleted([
      {
        clientGroupID,
        clientID
      }
    ])));
    const onUpdateNeededCallback = (reason) => {
      if (onUpdateNeeded) {
        onUpdateNeeded(reason);
      } else {
        reloadWithReason(_class_private_field_get$2(this, _lc10), _class_private_field_get$2(this, _reload), reason.type, updateNeededReloadReasonMessage(reason));
      }
    };
    _class_private_field_set$2(this, _onUpdateNeeded, onUpdateNeededCallback);
    _class_private_field_get$2(this, _rep).onUpdateNeeded = (reason) => {
      onUpdateNeededCallback(convertOnUpdateNeededReason(reason));
    };
    const onClientStateNotFoundCallback = onClientStateNotFound ?? ((reason) => {
      reloadWithReason(_class_private_field_get$2(this, _lc10), _class_private_field_get$2(this, _reload), error_kind_enum_exports.ClientNotFound, reason ?? ON_CLIENT_STATE_NOT_FOUND_REASON_CLIENT);
    });
    _class_private_field_set$2(this, _onClientStateNotFound, onClientStateNotFoundCallback);
    _class_private_field_get$2(this, _rep).onClientStateNotFound = onClientStateNotFoundCallback;
    const { mutate: mutate2, mutateBatch } = makeCRUDMutate(schema2, rep.mutate);
    if (options.mutators) {
      for (const [namespaceOrKey, mutatorsOrMutator] of Object.entries(options.mutators)) {
        if (typeof mutatorsOrMutator === "function") {
          mutate2[namespaceOrKey] = must(rep.mutate[namespaceOrKey]);
          continue;
        }
        let existing = mutate2[namespaceOrKey];
        if (existing === void 0) {
          existing = {};
          mutate2[namespaceOrKey] = existing;
        }
        for (const name of Object.keys(mutatorsOrMutator)) {
          existing[name] = must(rep.mutate[customMutatorKey(namespaceOrKey, name)]);
        }
      }
    }
    this.mutate = mutate2;
    this.mutateBatch = mutateBatch;
    _class_private_field_set$2(this, _queryManager, new QueryManager(_class_private_field_get$2(this, _lc10), _class_private_field_get$2(this, _mutationTracker3), rep.clientID, schema2.tables, (msg) => _class_private_method_get(this, _send2, send1).call(this, msg), rep.experimentalWatch.bind(rep), maxRecentQueries, options.queryChangeThrottleMs ?? DEFAULT_QUERY_CHANGE_THROTTLE_MS, slowMaterializeThreshold));
    _class_private_field_set$2(this, _clientToServer1, clientToServer(schema2.tables));
    _class_private_field_set$2(this, _deleteClientsManager, new DeleteClientsManager((msg) => _class_private_method_get(this, _send2, send1).call(this, msg), rep.perdag, _class_private_field_get$2(this, _lc10), _class_private_field_get$2(this, _rep).clientGroupID));
    this.query = _class_private_method_get(this, _registerQueries, registerQueries).call(this, schema2);
    reportReloadReason(_class_private_field_get$2(this, _lc10));
    _class_private_field_set$2(this, _metrics2, new MetricManager({
      reportIntervalMs: REPORT_INTERVAL_MS,
      host: getBrowserGlobal("location")?.host ?? "",
      source: "client",
      reporter: _class_private_field_get$2(this, _enableAnalytics) ? (allSeries) => _class_private_method_get(this, _reportMetrics, reportMetrics).call(this, allSeries) : () => Promise.resolve(),
      lc: _class_private_field_get$2(this, _lc10)
    }));
    _class_private_field_get$2(this, _metrics2).tags.push(`version:${this.version}`);
    _class_private_field_set$2(this, _pokeHandler, new PokeHandler((poke) => _class_private_field_get$2(this, _rep).poke(poke), () => _class_private_method_get(this, _onPokeError1, onPokeError).call(this), rep.clientID, schema2, _class_private_field_get$2(this, _lc10), _class_private_field_get$2(this, _mutationTracker3)));
    _class_private_field_set$2(this, _visibilityWatcher1, getDocumentVisibilityWatcher(getBrowserGlobal("document"), hiddenTabDisconnectDelay, _class_private_field_get$2(this, _closeAbortController1).signal));
    void _class_private_method_get(this, _runLoop, runLoop).call(this);
    _class_private_method_get(this, _expose, expose).call(this);
  }
}, __Zero);
var OnlineManager = (_online1 = /* @__PURE__ */ new WeakMap(), class extends Subscribable {
  setOnline(online) {
    if (_class_private_field_get$2(this, _online1) === online) {
      return;
    }
    _class_private_field_set$2(this, _online1, online);
    this.notify(online);
  }
  get online() {
    return _class_private_field_get$2(this, _online1);
  }
  constructor(...args) {
    super(...args), _class_private_field_init$2(this, _online1, {
      writable: true,
      value: false
    });
  }
});
async function createSocket(rep, queryManager, deleteClientsManager, socketOrigin, baseCookie, clientID, clientGroupID, clientSchema2, userID, auth, lmid, wsid, debugPerf, lc, userPushURL, userQueryURL, additionalConnectParams, activeClientsManager, maxHeaderLength = 1024 * 8) {
  const url = new URL(appendPath(socketOrigin, `/sync/v${PROTOCOL_VERSION}/connect`));
  const { searchParams } = url;
  searchParams.set("clientID", clientID);
  searchParams.set("clientGroupID", clientGroupID);
  searchParams.set("userID", userID);
  searchParams.set("baseCookie", baseCookie === null ? "" : String(baseCookie));
  searchParams.set("ts", String(performance.now()));
  searchParams.set("lmid", String(lmid));
  searchParams.set("wsid", wsid);
  if (debugPerf) {
    searchParams.set("debugPerf", true.toString());
  }
  if (additionalConnectParams) {
    for (const k in additionalConnectParams) {
      if (searchParams.has(k)) {
        lc.warn?.(`skipping conflicting parameter ${k}`);
      } else {
        searchParams.set(k, additionalConnectParams[k]);
      }
    }
  }
  lc.info?.("Connecting to", url.toString());
  const WS = mustGetBrowserGlobal("WebSocket");
  const queriesPatchP = rep.query((tx) => queryManager.getQueriesPatch(tx));
  const deletedClientsArray = await deleteClientsManager.getDeletedClients();
  let deletedClients = convertDeletedClientsToBody(deletedClientsArray, clientGroupID);
  let queriesPatch = await queriesPatchP;
  const { activeClients } = activeClientsManager;
  let secProtocol = encodeSecProtocols([
    "initConnection",
    {
      desiredQueriesPatch: [
        ...queriesPatch.values()
      ],
      deleted: skipEmptyDeletedClients(deletedClients),
      // The clientSchema only needs to be sent for the very first request.
      // Henceforth it is stored with the CVR and verified automatically.
      ...baseCookie === null ? {
        clientSchema: clientSchema2
      } : {},
      userPushURL,
      userQueryURL,
      activeClients: [
        ...activeClients
      ]
    }
  ], auth);
  if (secProtocol.length > maxHeaderLength) {
    secProtocol = encodeSecProtocols(void 0, auth);
    if (secProtocol.length > maxHeaderLength) {
      lc.warn?.(`Encoded auth token length (${secProtocol.length}) exceeds ZeroOptions.maxHeaderLength (${maxHeaderLength}). This may cause connection failures.`);
    }
    queriesPatch = void 0;
  } else {
    deletedClients = void 0;
  }
  return [
    new WS(
      // toString() required for RN URL polyfill.
      url.toString(),
      secProtocol
    ),
    queriesPatch,
    skipEmptyDeletedClients(deletedClients)
  ];
}
function skipEmptyArray(arr2) {
  return arr2 && arr2.length > 0 ? arr2 : void 0;
}
function skipEmptyDeletedClients(deletedClients) {
  if (!deletedClients) {
    return void 0;
  }
  const { clientIDs, clientGroupIDs } = deletedClients;
  if ((!clientIDs || clientIDs.length === 0) && (!clientGroupIDs || clientGroupIDs.length === 0)) {
    return void 0;
  }
  const data = {};
  data.clientIDs = skipEmptyArray(clientIDs);
  data.clientGroupIDs = skipEmptyArray(clientGroupIDs);
  return data;
}
function convertDeletedClientsToBody(deletedClients, clientGroupID) {
  if (deletedClients.length === 0) {
    return void 0;
  }
  const clientIDs = deletedClients.filter((pair) => pair.clientID && pair.clientGroupID === clientGroupID).map((pair) => pair.clientID);
  if (clientIDs.length === 0) {
    return void 0;
  }
  return {
    clientIDs
  };
}
function addWebSocketIDFromSocketToLogContext({ url }, lc) {
  const wsid = new URL(url).searchParams.get("wsid") ?? nanoid();
  return addWebSocketIDToLogContext(wsid, lc);
}
function addWebSocketIDToLogContext(wsid, lc) {
  return lc.withContext("wsid", wsid);
}
function promiseRace(ps) {
  return Promise.race(ps.map((p, i) => p.then(() => i)));
}
var TimedOutError = class extends Error {
  constructor(m) {
    super(`${m} timed out`);
  }
};
var CloseError = class extends Error {
};
function assertValidRunOptions2(_options2) {
}
async function makeActiveClientsManager(clientGroupID, clientID, signal, onDelete) {
  const manager = await ActiveClientsManager.create(await clientGroupID, clientID, signal);
  manager.onDelete = onDelete;
  return manager;
}
async function withReopen(fn) {
  const reopenExistingDB = async (name) => {
    const { promise, resolve, reject } = resolver();
    const req = indexedDB.open(name);
    req.onupgradeneeded = () => {
      const tx = req.transaction;
      assertNotNull(tx);
      tx.abort();
      _class_private_field_set$2(this, _idbDeleted, true);
      reject(new IDBNotFoundError(`Expected IndexedDB not found: ${name}. This likely means that the user deleted IndexedDB instances while the app was running. This is non-fatal. The app will continue running in memory until reload.`));
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
    const db2 = await promise;
    db2.onversionchange = () => db2.close();
    return db2;
  };
  const db = await _class_private_field_get$2(this, _db);
  try {
    return fn(db);
  } catch (e) {
    if (!_class_private_field_get$2(this, _closed) && e instanceof DOMException) {
      if (e.name === "InvalidStateError") {
        _class_private_field_set$2(this, _db, reopenExistingDB(db.name));
        const reopened = await _class_private_field_get$2(this, _db);
        return fn(reopened);
      } else if (e.name === "NotFoundError") {
        _class_private_field_set$2(this, _idbDeleted, true);
        mustGetBrowserGlobal("indexedDB").deleteDatabase(db.name);
        throw new IDBNotFoundError(`Expected IndexedDB ${db.name} missing object store. Deleting db. This is non-fatal, the app will continue working in memory until it is reloaded.`);
      }
    }
    throw e;
  }
}
async function changeRefCount(hash2, delta) {
  await _class_private_method_get(this, _ensureRefCountLoaded, ensureRefCountLoaded).call(this, hash2);
  if (_class_private_method_get(this, _updateRefCount, updateRefCount).call(this, hash2, delta)) {
    await _class_private_method_get(this, _updateRefsCounts, updateRefsCounts).call(this, hash2, delta);
  }
}
async function updateRefsCounts(hash2, delta) {
  if (hash2 === emptyHash) {
    return;
  }
  const refs = await _class_private_field_get$2(this, _delegate).getRefs(hash2);
  if (refs !== void 0) {
    _class_private_field_get$2(this, _refsCounted)?.add(hash2);
    const ps = refs.map((ref) => _class_private_method_get(this, _changeRefCount, changeRefCount).call(this, ref, delta));
    await Promise.all(ps);
  }
}
function ensureRefCountLoaded(hash2) {
  let p = _class_private_field_get$2(this, _loadedRefCountPromises).get(hash2);
  if (p === void 0) {
    p = (async () => {
      const value = await _class_private_field_get$2(this, _delegate).getRefCount(hash2) || 0;
      _class_private_field_get$2(this, _refCountUpdates).set(hash2, value);
      return value;
    })();
    _class_private_field_get$2(this, _loadedRefCountPromises).set(hash2, p);
  }
  return p;
}
function updateRefCount(hash2, delta) {
  const oldCount = _class_private_field_get$2(this, _refCountUpdates).get(hash2);
  assertNumber(oldCount);
  _class_private_field_get$2(this, _refCountUpdates).set(hash2, oldCount + delta);
  return oldCount === 0 && delta === 1 || oldCount === 1 && delta === -1;
}
async function setHead(name, hash2) {
  const oldHash = await this.getHead(name);
  const hk = headKey(name);
  let p1;
  if (hash2 === void 0) {
    p1 = this._tx.del(hk);
  } else {
    p1 = this._tx.put(hk, hash2);
  }
  const v1 = _class_private_field_get$2(this, _changedHeads).get(name);
  if (v1 === void 0) {
    _class_private_field_get$2(this, _changedHeads).set(name, {
      new: hash2,
      old: oldHash
    });
  } else {
    v1.new = hash2;
  }
  await p1;
}
async function applyRefCountUpdates(refCountCache) {
  const ps = [];
  for (const [hash2, count] of refCountCache) {
    if (count === 0) {
      ps.push(_class_private_method_get(this, _removeAllRelatedKeys, removeAllRelatedKeys).call(this, hash2));
    } else {
      const refCountKey = chunkRefCountKey(hash2);
      ps.push(this._tx.put(refCountKey, count));
    }
  }
  await Promise.all(ps);
}
async function removeAllRelatedKeys(hash2) {
  await Promise.all([
    this._tx.del(chunkDataKey(hash2)),
    this._tx.del(chunkMetaKey(hash2)),
    this._tx.del(chunkRefCountKey(hash2))
  ]);
  _class_private_field_get$2(this, _putChunks1).delete(hash2);
}
async function withBrainTransplant(f) {
  try {
    return await f(_class_private_field_get$2(this, _store));
  } catch (e) {
    if (isFirefoxPrivateBrowsingError(e)) {
      if (_class_private_field_get$2(this, _store) instanceof IDBStore) {
        _class_private_field_get$2(this, _lc).info?.("Switching to MemStore because of Firefox private browsing error");
        _class_private_field_set$2(this, _store, new MemStore(_class_private_field_get$2(this, _name)));
      }
      return f(_class_private_field_get$2(this, _store));
    }
    throw e;
  }
}
function putDatabase(db) {
  return withWrite(_class_private_field_get$2(this, _kvStore), async (write) => {
    const oldDbRecord = await getDatabases(write);
    const dbRecord = {
      ...oldDbRecord,
      [db.name]: db
    };
    await write.put(DBS_KEY, dbRecord);
    return dbRecord;
  });
}
function setVisibilityState(visibilityState) {
  if (visibilityState === this.visibilityState) {
    return;
  }
  this.visibilityState = visibilityState;
  for (const entry of _class_private_field_get$2(this, _promises)) {
    const { resolve, state } = entry;
    if (state === visibilityState) {
      resolve();
      _class_private_field_get$2(this, _promises).delete(entry);
    }
  }
}
function waitFor(state) {
  if (this.visibilityState === state) {
    return Promise.resolve();
  }
  const { promise, resolve } = resolver();
  _class_private_field_get$2(this, _promises).add({
    resolve,
    state
  });
  return promise;
}
function connectionAvailable() {
  if (_class_private_field_get$2(this, _waitingConnectionResolve)) {
    const resolve = _class_private_field_get$2(this, _waitingConnectionResolve);
    _class_private_field_set$2(this, _waitingConnectionResolve, void 0);
    resolve();
  }
}
function waitUntilAvailableConnection() {
  const { promise, resolve } = resolver();
  _class_private_field_set$2(this, _waitingConnectionResolve, resolve);
  return promise;
}
async function setHead1(name, hash2) {
  const oldHash = await this.getHead(name);
  const v1 = this._pendingHeadChanges.get(name);
  if (v1 === void 0) {
    this._pendingHeadChanges.set(name, {
      new: hash2,
      old: oldHash
    });
  } else {
    v1.new = hash2;
  }
}
function ensureCacheSizeLimit() {
  if (_class_private_field_get$2(this, _evictsAndDeletesSuspended)) {
    return;
  }
  for (const entry of this.cacheEntries.values()) {
    if (_class_private_field_get$2(this, _size) <= _class_private_field_get$2(this, _cacheSizeLimit)) {
      break;
    }
    _class_private_method_get(this, _evict, evict).call(this, entry);
  }
}
function cacheChunk(chunk, size) {
  const chunkSize = size ?? _class_private_field_get$2(this, _getSizeOfChunk).call(this, chunk);
  if (chunkSize > _class_private_field_get$2(this, _cacheSizeLimit)) {
    return false;
  }
  _class_private_field_set$2(this, _size, _class_private_field_get$2(this, _size) + chunkSize);
  this.cacheEntries.set(chunk.hash, {
    chunk,
    size: chunkSize
  });
  return true;
}
function evict(cacheEntry) {
  const { hash: hash2 } = cacheEntry.chunk;
  _class_private_field_set$2(this, _size, _class_private_field_get$2(this, _size) - cacheEntry.size);
  this.cacheEntries.delete(hash2);
}
function deleteEntryByHash(hash2) {
  _class_private_field_get$2(this, _refCounts1).delete(hash2);
  _class_private_field_get$2(this, _refs1).delete(hash2);
  const cacheEntry = this.cacheEntries.get(hash2);
  if (cacheEntry) {
    _class_private_field_set$2(this, _size, _class_private_field_get$2(this, _size) - cacheEntry.size);
    this.cacheEntries.delete(hash2);
  }
}
function newIterator(toValue) {
  return scanIterator(toValue, _class_private_field_get$2(this, _iter), _class_private_field_get$2(this, _options), _class_private_field_get$2(this, _dbDelegateOptions), _class_private_field_get$2(this, _onLimitKey));
}
async function scheduleInternal() {
  try {
    await _class_private_field_get$2(this, _runPromise);
  } catch {
  }
  await _class_private_field_get$2(this, _throttlePromise);
  if (!_class_private_field_get$2(this, _scheduledResolver)) {
    return;
  }
  await _class_private_field_get$2(this, _requestIdle).call(this, _class_private_field_get$2(this, _idleTimeoutMs));
  if (!_class_private_field_get$2(this, _scheduledResolver)) {
    return;
  }
  _class_private_field_set$2(this, _throttlePromise, throttle(_class_private_field_get$2(this, _throttleMs), _class_private_field_get$2(this, _abortSignal1)));
  _class_private_field_set$2(this, _runResolver, _class_private_field_get$2(this, _scheduledResolver));
  _class_private_field_set$2(this, _scheduledResolver, void 0);
  try {
    _class_private_field_set$2(this, _runPromise, _class_private_field_get$2(this, _process).call(this));
    await _class_private_field_get$2(this, _runPromise);
    _class_private_field_get$2(this, _runResolver)?.resolve();
  } catch (e) {
    _class_private_field_get$2(this, _runResolver)?.reject(e);
  }
  _class_private_field_set$2(this, _runResolver, void 0);
}
async function fireSubscriptions(subscriptions, kind, diffs) {
  if (_class_private_field_get$2(this, _signal).aborted) {
    return;
  }
  const subs = [
    ...subscriptions
  ];
  if (subs.length === 0) {
    return;
  }
  const results = await _class_private_field_get$2(this, _queryInternal).call(this, (tx) => Promise.allSettled(subs.map(async (s) => {
    const stx = new SubscriptionTransactionWrapper(tx);
    try {
      return await s.invoke(stx, kind, diffs);
    } finally {
      s.updateDeps(stx.keys, stx.scans);
    }
  })));
  this.callCallbacks(subs, results);
}
async function scheduleInitialSubscriptionRun(s) {
  _class_private_field_get$2(this, _pendingSubscriptions).add(s);
  if (!this.hasPendingSubscriptionRuns) {
    this.hasPendingSubscriptionRuns = true;
    await Promise.resolve();
    this.hasPendingSubscriptionRuns = false;
    const subscriptions = [
      ..._class_private_field_get$2(this, _pendingSubscriptions)
    ];
    _class_private_field_get$2(this, _pendingSubscriptions).clear();
    await _class_private_method_get(this, _fireSubscriptions, fireSubscriptions).call(this, subscriptions, InitialRun, void 0);
  }
}
function get_idbDatabase() {
  return {
    name: this.idbName,
    replicacheName: this.name,
    replicacheFormatVersion: Latest,
    schemaVersion: this.schemaVersion
  };
}
async function open(indexes, enableClientGroupForking, enableMutationRecovery, clientMaxAgeMs, profileIDResolver, resolveClientGroupID, resolveReady, onClientsDeleted) {
  const { clientID } = this;
  await closingInstances.get(this.name);
  await _class_private_field_get$2(this, _idbDatabases).getProfileID().then(profileIDResolver);
  await _class_private_field_get$2(this, _idbDatabases).putDatabase(_class_private_field_get$2(this, _idbDatabase));
  const [client, headHash, , isNewClientGroup] = await initClientV6(clientID, _class_private_field_get$2(this, _lc3), this.perdag, Object.keys(_class_private_field_get$2(this, _mutatorRegistry)), indexes, Latest, enableClientGroupForking);
  resolveClientGroupID(client.clientGroupID);
  await withWrite(this.memdag, (write) => write.setHead(DEFAULT_HEAD_NAME, headHash));
  await _class_private_field_get$2(this, _zero$1)?.init(headHash, this.memdag);
  resolveReady();
  if (_class_private_field_get$2(this, _enablePullAndPushInOpen)) {
    this.pull().catch(noop2);
    this.push().catch(noop2);
  }
  const { signal } = _class_private_field_get$2(this, _closeAbortController);
  startHeartbeats(clientID, this.perdag, () => {
    _class_private_method_get(this, _clientStateNotFoundOnClient, clientStateNotFoundOnClient).call(this, clientID);
  }, HEARTBEAT_INTERVAL, _class_private_field_get$2(this, _lc3), signal);
  initClientGC(clientID, this.perdag, clientMaxAgeMs, GC_INTERVAL, onClientsDeleted, _class_private_field_get$2(this, _lc3), signal);
  initCollectIDBDatabases(_class_private_field_get$2(this, _idbDatabases), _class_private_field_get$2(this, _kvStoreProvider).drop, COLLECT_IDB_INTERVAL, INITIAL_COLLECT_IDB_DELAY, 2 * clientMaxAgeMs, enableMutationRecovery, onClientsDeleted, _class_private_field_get$2(this, _lc3), signal);
  initClientGroupGC(this.perdag, enableMutationRecovery, _class_private_field_get$2(this, _lc3), signal);
  initNewClientChannel(this.name, this.idbName, signal, client.clientGroupID, isNewClientGroup, () => {
    _class_private_method_get(this, _fireOnUpdateNeeded, fireOnUpdateNeeded).call(this, updateNeededReasonNewClientGroup);
  }, this.perdag);
  setIntervalWithSignal(() => this.recoverMutations(), RECOVER_MUTATIONS_INTERVAL_MS, signal);
  void this.recoverMutations();
  getBrowserGlobal("document")?.addEventListener("visibilitychange", _class_private_field_get$2(this, _onVisibilityChange1));
}
async function checkForClientStateNotFoundAndCallHandler() {
  const { clientID } = this;
  const hasClientState2 = await withRead(this.perdag, (read) => hasClientState(clientID, read));
  if (!hasClientState2) {
    _class_private_method_get(this, _clientStateNotFoundOnClient, clientStateNotFoundOnClient).call(this, clientID);
  }
  return !hasClientState2;
}
function invokePull() {
  if (_class_private_method_get(this, _isPullDisabled, isPullDisabled).call(this)) {
    return Promise.resolve(true);
  }
  return _class_private_method_get(this, _wrapInOnlineCheck, wrapInOnlineCheck).call(this, async () => {
    try {
      _class_private_method_get(this, _changeSyncCounters, changeSyncCounters).call(this, 0, 1);
      const { syncHead, requestID, ok: ok2 } = await this.beginPull();
      if (!ok2) {
        return false;
      }
      if (syncHead !== emptyHash) {
        await this.maybeEndPull(syncHead, requestID);
      }
    } catch (e) {
      throw await _class_private_method_get(this, _convertToClientStateNotFoundError, convertToClientStateNotFoundError).call(this, e);
    } finally {
      _class_private_method_get(this, _changeSyncCounters, changeSyncCounters).call(this, 0, -1);
    }
    return true;
  }, "Pull");
}
function isPullDisabled() {
  return this.isClientGroupDisabled || this.pullURL === "" && isDefaultPuller(this.puller);
}
async function wrapInOnlineCheck(f, name) {
  let online = true;
  try {
    return await f();
  } catch (e) {
    if (e instanceof PushError || e instanceof PullError) {
      online = false;
      _class_private_field_get$2(this, _lc3).debug?.(`${name} threw:
`, e, "\nwith cause:\n", e.causedBy);
    } else if (e instanceof ReportError) {
      _class_private_field_get$2(this, _lc3).error?.(e);
    } else {
      _class_private_field_get$2(this, _lc3).info?.(`${name} threw:
`, e);
    }
    return false;
  } finally {
    if (_class_private_field_get$2(this, _online) !== online) {
      _class_private_field_set$2(this, _online, online);
      this.onOnlineChange?.(online);
      if (online) {
        void this.recoverMutations();
      }
    }
  }
}
async function wrapInReauthRetries(f, verb, lc, preAuth = noop2, postAuth = noop2) {
  const { clientID } = this;
  let reauthAttempts = 0;
  let lastResult;
  lc = lc.withContext(verb);
  do {
    const requestID = newRequestID(clientID);
    const requestLc = lc.withContext("requestID", requestID);
    const { httpRequestInfo, result } = await f(requestID, requestLc);
    lastResult = result;
    if (!httpRequestInfo) {
      return {
        result,
        authFailure: false
      };
    }
    const { errorMessage, httpStatusCode } = httpRequestInfo;
    if (errorMessage || httpStatusCode !== 200) {
      requestLc.error?.(`Got a non 200 response doing ${verb}: ${httpStatusCode}` + (errorMessage ? `: ${errorMessage}` : ""));
    }
    if (httpStatusCode !== httpStatusUnauthorized) {
      return {
        result,
        authFailure: false
      };
    }
    if (!this.getAuth) {
      return {
        result,
        authFailure: true
      };
    }
    let auth;
    try {
      await preAuth();
      auth = await this.getAuth();
    } finally {
      await postAuth();
    }
    if (auth === null || auth === void 0) {
      return {
        result,
        authFailure: true
      };
    }
    this.auth = auth;
    reauthAttempts++;
  } while (reauthAttempts < MAX_REAUTH_TRIES);
  lc.info?.("Tried to reauthenticate too many times");
  return {
    result: lastResult,
    authFailure: true
  };
}
function isPushDisabled() {
  return this.isClientGroupDisabled || this.pushURL === "" && isDefaultPusher(this.pusher);
}
async function invokePush() {
  if (_class_private_method_get(this, _isPushDisabled, isPushDisabled).call(this)) {
    return true;
  }
  await _class_private_field_get$2(this, _ready);
  const profileID = await _class_private_field_get$2(this, _profileIDPromise);
  const { clientID } = this;
  const clientGroupID = await _class_private_field_get$2(this, _clientGroupIDPromise);
  return _class_private_method_get(this, _wrapInOnlineCheck, wrapInOnlineCheck).call(this, async () => {
    const { result: pusherResult } = await _class_private_method_get(this, _wrapInReauthRetries, wrapInReauthRetries).call(this, async (requestID, requestLc) => {
      try {
        _class_private_method_get(this, _changeSyncCounters, changeSyncCounters).call(this, 1, 0);
        const pusherResult2 = await push(requestID, this.memdag, requestLc, profileID, clientGroupID, clientID, this.pusher, this.schemaVersion, PUSH_VERSION_DD31);
        return {
          result: pusherResult2,
          httpRequestInfo: pusherResult2?.httpRequestInfo
        };
      } finally {
        _class_private_method_get(this, _changeSyncCounters, changeSyncCounters).call(this, -1, 0);
      }
    }, "push", _class_private_field_get$2(this, _lc3));
    if (pusherResult === void 0) {
      return true;
    }
    const { response, httpRequestInfo } = pusherResult;
    if (isVersionNotSupportedResponse(response)) {
      _class_private_method_get(this, _handleVersionNotSupportedResponse, handleVersionNotSupportedResponse).call(this, response);
    } else if (isClientStateNotFoundResponse(response)) {
      await _class_private_method_get(this, _clientStateNotFoundOnServer, clientStateNotFoundOnServer).call(this);
    }
    return httpRequestInfo.httpStatusCode === 200;
  }, "Push");
}
function handleVersionNotSupportedResponse(response) {
  const reason = {
    type: response.error
  };
  if (response.versionType) {
    reason.versionType = response.versionType;
  }
  _class_private_method_get(this, _fireOnUpdateNeeded, fireOnUpdateNeeded).call(this, reason);
}
function fireOnClientStateNotFound() {
  this.onClientStateNotFound?.();
}
function clientStateNotFoundOnClient(clientID) {
  _class_private_field_get$2(this, _lc3).error?.(`Client state not found on client, clientID: ${clientID}`);
  _class_private_method_get(this, _fireOnClientStateNotFound, fireOnClientStateNotFound).call(this);
}
async function clientStateNotFoundOnServer() {
  const clientGroupID = await _class_private_field_get$2(this, _clientGroupIDPromise);
  _class_private_field_get$2(this, _lc3).error?.(`Client state not found on server, clientGroupID: ${clientGroupID}`);
  await this.disableClientGroup();
  _class_private_method_get(this, _fireOnClientStateNotFound, fireOnClientStateNotFound).call(this);
}
function fireOnUpdateNeeded(reason) {
  _class_private_field_get$2(this, _lc3).debug?.(`Update needed, reason: ${reason}`);
  this.onUpdateNeeded?.(reason);
}
async function schedulePersist() {
  if (!_class_private_field_get$2(this, _enableScheduledPersist)) {
    return;
  }
  await _class_private_method_get(this, _schedule, schedule).call(this, "persist", _class_private_field_get$2(this, _persistScheduler));
}
async function handlePersist(persistInfo) {
  _class_private_field_get$2(this, _lc3).debug?.("Handling persist", persistInfo);
  const clientGroupID = await _class_private_field_get$2(this, _clientGroupIDPromise);
  if (persistInfo.clientGroupID === clientGroupID) {
    void _class_private_method_get(this, _scheduleRefresh, scheduleRefresh).call(this);
  }
}
async function scheduleRefresh() {
  if (!_class_private_field_get$2(this, _enableScheduledRefresh)) {
    return;
  }
  await _class_private_method_get(this, _schedule, schedule).call(this, "refresh from storage", _class_private_field_get$2(this, _refreshScheduler));
}
async function schedule(name, scheduler) {
  try {
    await scheduler.schedule();
  } catch (e) {
    if (e instanceof AbortError) {
      _class_private_field_get$2(this, _lc3).debug?.(`Scheduled ${name} did not complete before close.`);
    } else {
      _class_private_field_get$2(this, _lc3).error?.(`Error during ${name}`, e);
    }
  }
}
function changeSyncCounters(pushDelta, pullDelta) {
  _class_private_field_set$2(this, _pushCounter, _class_private_field_get$2(this, _pushCounter) + pushDelta);
  _class_private_field_set$2(this, _pullCounter, _class_private_field_get$2(this, _pullCounter) + pullDelta);
  const delta = pushDelta + pullDelta;
  const counter = _class_private_field_get$2(this, _pushCounter) + _class_private_field_get$2(this, _pullCounter);
  if (delta === 1 && counter === 1 || counter === 0) {
    const syncing = counter > 0;
    void Promise.resolve().then(() => this.onSync?.(syncing));
  }
}
function register(name, mutatorImpl) {
  _class_private_field_get$2(this, _mutatorRegistry)[name] = mutatorImpl;
  return (args) => {
    const trackingData = name === "_zero_crud" ? void 0 : _class_private_field_get$2(this, _zero$1)?.trackMutation();
    const result = _class_private_method_get(this, _mutate, mutate).call(this, trackingData, name, mutatorImpl, args, performance.now());
    if (trackingData) {
      return {
        client: result,
        server: trackingData.serverPromise,
        // oxlint-disable-next-line no-thenable
        then: (onFulfilled, onRejected) => {
          _class_private_field_get$2(this, _lc3).warn?.("Awaiting the mutator result directly is being deprecated. Please use `await z.mutate[mutatorName].client` or `await result.mutate[mutatorName].server`");
          return result.then(onFulfilled, onRejected);
        }
      };
    }
    return result;
  };
}
function registerMutators(regs) {
  const rv = /* @__PURE__ */ Object.create(null);
  for (const k in regs) {
    rv[k] = _class_private_method_get(this, _register, register).call(this, k, regs[k]);
  }
  return rv;
}
async function mutate(trackingData, name, mutatorImpl, args, timestamp) {
  const frozenArgs = deepFreeze(args ?? null);
  if (_class_private_field_get$2(this, _subscriptions1).hasPendingSubscriptionRuns) {
    await Promise.resolve();
  }
  await _class_private_field_get$2(this, _ready);
  const { clientID } = this;
  return withWriteNoImplicitCommit(this.memdag, async (dagWrite) => {
    try {
      let result;
      let newHead;
      let diffs;
      let headHash;
      try {
        headHash = await mustGetHeadHash(DEFAULT_HEAD_NAME, dagWrite);
        const originalHash = null;
        const dbWrite = await newWriteLocal(headHash, name, frozenArgs, originalHash, dagWrite, timestamp, clientID, Latest);
        const mutationID = await dbWrite.getMutationID();
        const tx = new WriteTransactionImpl(clientID, mutationID, "initial", await _class_private_field_get$2(this, _zero$1)?.getTxData(headHash, {
          openLazyRead: dagWrite
        }), dbWrite, _class_private_field_get$2(this, _lc3));
        if (trackingData) {
          _class_private_field_get$2(this, _zero$1)?.mutationIDAssigned(trackingData.ephemeralID, mutationID);
        }
        result = await mutatorImpl(tx, args);
        throwIfClosed(dbWrite);
        const lastMutationID = await dbWrite.getMutationID();
        [newHead, diffs] = await dbWrite.commitWithDiffs(DEFAULT_HEAD_NAME, _class_private_field_get$2(this, _subscriptions1));
        this.lastMutationID = lastMutationID;
      } catch (e) {
        if (trackingData) {
          _class_private_field_get$2(this, _zero$1)?.rejectMutation(trackingData.ephemeralID, e);
        }
        throw e;
      }
      _class_private_field_get$2(this, _zero$1)?.advance(headHash, newHead, diffs.get("") ?? []);
      _class_private_field_get$2(this, _pushConnectionLoop).send(false).catch(() => void 0);
      await _class_private_field_get$2(this, _subscriptions1).fire(diffs);
      void _class_private_method_get(this, _schedulePersist, schedulePersist).call(this);
      return result;
    } catch (ex) {
      throw await _class_private_method_get(this, _convertToClientStateNotFoundError, convertToClientStateNotFoundError).call(this, ex);
    }
  });
}
async function convertToClientStateNotFoundError(ex) {
  if (ex instanceof ChunkNotFoundError && await _class_private_method_get(this, _checkForClientStateNotFoundAndCallHandler, checkForClientStateNotFoundAndCallHandler).call(this)) {
    return new ClientStateNotFoundError(this.clientID);
  }
  return ex;
}
function getTable(src, ctx) {
  const table2 = _class_private_field_get$2(this, _tables).get(src);
  if (!table2) {
    throw new Error(`unknown table "${src}" ${!ctx ? "" : `in ${JSON.stringify(ctx)}`}`);
  }
  return table2;
}
function filter(node, size) {
  const exists = (size ?? _class_private_method_get(this, _getOrFetchSize, getOrFetchSize).call(this, node)) > 0;
  return _class_private_field_get$2(this, _not) ? !exists : exists;
}
function pushWithFilter(change, size) {
  if (_class_private_method_get(this, _filter, filter).call(this, change.node, size)) {
    _class_private_field_get$2(this, _output2).push(change, this);
  }
}
function getSize(node) {
  return _class_private_field_get$2(this, _storage).get(_class_private_method_get(this, _makeSizeStorageKey, makeSizeStorageKey).call(this, node));
}
function setSize(node, size) {
  _class_private_field_get$2(this, _storage).set(_class_private_method_get(this, _makeSizeStorageKey, makeSizeStorageKey).call(this, node), size);
}
function delSize(node) {
  _class_private_field_get$2(this, _storage).del(_class_private_method_get(this, _makeSizeStorageKey, makeSizeStorageKey).call(this, node));
}
function getOrFetchSize(node) {
  const size = _class_private_method_get(this, _getSize, getSize).call(this, node);
  if (size !== void 0) {
    return size;
  }
  return _class_private_method_get(this, _fetchSize, fetchSize).call(this, node);
}
function fetchSize(node) {
  if (!_class_private_field_get$2(this, _noSizeReuse) && !_class_private_field_get$2(this, _inPush)) {
    const cachedSizeEntry = first(_class_private_field_get$2(this, _storage).scan({
      prefix: _class_private_method_get(this, _makeSizeStorageKeyPrefix, makeSizeStorageKeyPrefix).call(this, node)
    }));
    if (cachedSizeEntry !== void 0) {
      _class_private_method_get(this, _setSize, setSize).call(this, node, cachedSizeEntry[1]);
      return cachedSizeEntry[1];
    }
  }
  const relationship = node.relationships[_class_private_field_get$2(this, _relationshipName)];
  assert(relationship);
  let size = 0;
  for (const _relatedNode of relationship()) {
    size++;
  }
  _class_private_method_get(this, _setSize, setSize).call(this, node, size);
  return size;
}
function makeSizeStorageKeyPrefix(node) {
  return `row/${_class_private_field_get$2(this, _noSizeReuse) ? "" : JSON.stringify(_class_private_method_get(this, _getKeyValues, getKeyValues).call(this, node, _class_private_field_get$2(this, _parentJoinKey)))}/`;
}
function makeSizeStorageKey(node) {
  return `${_class_private_method_get(this, _makeSizeStorageKeyPrefix, makeSizeStorageKeyPrefix).call(this, node)}${JSON.stringify(_class_private_method_get(this, _getKeyValues, getKeyValues).call(this, node, _class_private_field_get$2(this, _input2).getSchema().primaryKey))}`;
}
function getKeyValues(node, def) {
  const values = [];
  for (const key of def) {
    values.push(normalizeUndefined(node.row[key]));
  }
  return values;
}
function pushChild(change) {
  const pushChildChange = (exists) => {
    _class_private_field_set$2(this, _inprogressChildChange, {
      change,
      position: void 0
    });
    try {
      const parentNodeStream = _class_private_field_get$2(this, _parent).fetch({
        constraint: Object.fromEntries(_class_private_field_get$2(this, _parentKey).map((key, i) => [
          key,
          change.node.row[_class_private_field_get$2(this, _childKey)[i]]
        ]))
      });
      for (const parentNode of parentNodeStream) {
        _class_private_field_set$2(this, _inprogressChildChange, {
          change,
          position: parentNode.row
        });
        const childNodeStream = () => _class_private_field_get$2(this, _child).fetch({
          constraint: Object.fromEntries(_class_private_field_get$2(this, _childKey).map((key, i) => [
            key,
            parentNode.row[_class_private_field_get$2(this, _parentKey)[i]]
          ]))
        });
        if (!exists) {
          for (const childNode of childNodeStream()) {
            if (_class_private_field_get$2(this, _child).getSchema().compareRows(childNode.row, change.node.row) !== 0) {
              exists = true;
              break;
            }
          }
        }
        if (exists) {
          _class_private_field_get$2(this, _output5).push({
            type: "child",
            node: {
              ...parentNode,
              relationships: {
                ...parentNode.relationships,
                [_class_private_field_get$2(this, _relationshipName1)]: childNodeStream
              }
            },
            child: {
              relationshipName: _class_private_field_get$2(this, _relationshipName1),
              change
            }
          }, this);
        } else {
          _class_private_field_get$2(this, _output5).push({
            ...change,
            node: {
              ...parentNode,
              relationships: {
                ...parentNode.relationships,
                [_class_private_field_get$2(this, _relationshipName1)]: () => [
                  change.node
                ]
              }
            }
          }, this);
        }
      }
    } finally {
      _class_private_field_set$2(this, _inprogressChildChange, void 0);
    }
  };
  switch (change.type) {
    case "add":
    case "remove":
      pushChildChange();
      break;
    case "edit": {
      assert(rowEqualsForCompoundKey(change.oldNode.row, change.node.row, _class_private_field_get$2(this, _childKey)), `Child edit must not change relationship.`);
      pushChildChange(true);
      break;
    }
    case "child":
      pushChildChange(true);
      break;
  }
}
function pushParent(change) {
  const childNodeStream = (node) => () => _class_private_field_get$2(this, _child).fetch({
    constraint: Object.fromEntries(_class_private_field_get$2(this, _childKey).map((key, i) => [
      key,
      node.row[_class_private_field_get$2(this, _parentKey)[i]]
    ]))
  });
  const flip = (node) => ({
    ...node,
    relationships: {
      ...node.relationships,
      [_class_private_field_get$2(this, _relationshipName1)]: childNodeStream(node)
    }
  });
  if (first(childNodeStream(change.node)()) === void 0) {
    return;
  }
  switch (change.type) {
    case "add":
    case "remove":
    case "child": {
      _class_private_field_get$2(this, _output5).push({
        ...change,
        node: flip(change.node)
      }, this);
      break;
    }
    case "edit": {
      assert(rowEqualsForCompoundKey(change.oldNode.row, change.node.row, _class_private_field_get$2(this, _parentKey)), `Parent edit must not change relationship.`);
      _class_private_field_get$2(this, _output5).push({
        type: "edit",
        oldNode: flip(change.oldNode),
        node: flip(change.node)
      }, this);
      break;
    }
    default:
      unreachable();
  }
}
function pushParent1(change) {
  switch (change.type) {
    case "add":
      _class_private_field_get$2(this, _output6).push({
        type: "add",
        node: _class_private_method_get(this, _processParentNode, processParentNode).call(this, change.node.row, change.node.relationships, "fetch")
      }, this);
      break;
    case "remove":
      _class_private_field_get$2(this, _output6).push({
        type: "remove",
        node: _class_private_method_get(this, _processParentNode, processParentNode).call(this, change.node.row, change.node.relationships, "cleanup")
      }, this);
      break;
    case "child":
      _class_private_field_get$2(this, _output6).push({
        type: "child",
        node: _class_private_method_get(this, _processParentNode, processParentNode).call(this, change.node.row, change.node.relationships, "fetch"),
        child: change.child
      }, this);
      break;
    case "edit": {
      assert(rowEqualsForCompoundKey(change.oldNode.row, change.node.row, _class_private_field_get$2(this, _parentKey1)), `Parent edit must not change relationship.`);
      _class_private_field_get$2(this, _output6).push({
        type: "edit",
        oldNode: _class_private_method_get(this, _processParentNode, processParentNode).call(this, change.oldNode.row, change.oldNode.relationships, "cleanup"),
        node: _class_private_method_get(this, _processParentNode, processParentNode).call(this, change.node.row, change.node.relationships, "fetch")
      }, this);
      break;
    }
    default:
      unreachable();
  }
}
function pushChild1(change) {
  const pushChildChange = (childRow, change2) => {
    _class_private_field_set$2(this, _inprogressChildChange1, {
      change: change2,
      position: void 0
    });
    try {
      const parentNodes = _class_private_field_get$2(this, _parent1).fetch({
        constraint: Object.fromEntries(_class_private_field_get$2(this, _parentKey1).map((key, i) => [
          key,
          childRow[_class_private_field_get$2(this, _childKey1)[i]]
        ]))
      });
      for (const parentNode of parentNodes) {
        _class_private_field_get$2(this, _inprogressChildChange1).position = parentNode.row;
        const childChange = {
          type: "child",
          node: _class_private_method_get(this, _processParentNode, processParentNode).call(this, parentNode.row, parentNode.relationships, "fetch"),
          child: {
            relationshipName: _class_private_field_get$2(this, _relationshipName2),
            change: change2
          }
        };
        _class_private_field_get$2(this, _output6).push(childChange, this);
      }
    } finally {
      _class_private_field_set$2(this, _inprogressChildChange1, void 0);
    }
  };
  switch (change.type) {
    case "add":
    case "remove":
      pushChildChange(change.node.row, change);
      break;
    case "child":
      pushChildChange(change.node.row, change);
      break;
    case "edit": {
      const childRow = change.node.row;
      const oldChildRow = change.oldNode.row;
      assert(rowEqualsForCompoundKey(oldChildRow, childRow, _class_private_field_get$2(this, _childKey1)), "Child edit must not change relationship.");
      pushChildChange(childRow, change);
      break;
    }
    default:
      unreachable();
  }
}
function processParentNode(parentNodeRow, parentNodeRelations, mode) {
  let method = mode;
  let storageUpdated = false;
  const childStream = () => {
    if (!storageUpdated) {
      if (mode === "cleanup") {
        _class_private_field_get$2(this, _storage1).del(makeStorageKey(_class_private_field_get$2(this, _parentKey1), _class_private_field_get$2(this, _parent1).getSchema().primaryKey, parentNodeRow));
        const empty = [
          ...take(_class_private_field_get$2(this, _storage1).scan({
            prefix: makeStorageKeyPrefix(parentNodeRow, _class_private_field_get$2(this, _parentKey1))
          }), 1)
        ].length === 0;
        method = empty ? "cleanup" : "fetch";
      }
      storageUpdated = true;
      if (mode === "fetch") {
        _class_private_field_get$2(this, _storage1).set(makeStorageKey(_class_private_field_get$2(this, _parentKey1), _class_private_field_get$2(this, _parent1).getSchema().primaryKey, parentNodeRow), true);
      }
    }
    const stream = _class_private_field_get$2(this, _child1)[method]({
      constraint: Object.fromEntries(_class_private_field_get$2(this, _childKey1).map((key, i) => [
        key,
        parentNodeRow[_class_private_field_get$2(this, _parentKey1)[i]]
      ]))
    });
    if (_class_private_field_get$2(this, _inprogressChildChange1) && isJoinMatch(parentNodeRow, _class_private_field_get$2(this, _parentKey1), _class_private_field_get$2(this, _inprogressChildChange1).change.node.row, _class_private_field_get$2(this, _childKey1)) && _class_private_field_get$2(this, _inprogressChildChange1).position && _class_private_field_get$2(this, _schema5).compareRows(parentNodeRow, _class_private_field_get$2(this, _inprogressChildChange1).position) > 0) {
      return generateWithOverlay(stream, _class_private_field_get$2(this, _inprogressChildChange1).change, _class_private_field_get$2(this, _child1).getSchema());
    }
    return stream;
  };
  return {
    row: parentNodeRow,
    relationships: {
      ...parentNodeRelations,
      [_class_private_field_get$2(this, _relationshipName2)]: childStream
    }
  };
}
function* fetchOrCleanup(method, req) {
  const start = _class_private_method_get(this, _getStart, getStart).call(this, req);
  if (start === "empty") {
    return;
  }
  const nodes = _class_private_field_get$2(this, _input5)[method]({
    ...req,
    start
  });
  if (!req.reverse) {
    yield* nodes;
    return;
  }
  for (const node of nodes) {
    if (!_class_private_method_get(this, _shouldBePresent, shouldBePresent).call(this, node.row)) {
      return;
    }
    yield node;
  }
}
function shouldBePresent(row) {
  const cmp2 = _class_private_field_get$2(this, _comparator).call(this, _class_private_field_get$2(this, _bound).row, row);
  return cmp2 < 0 || cmp2 === 0 && !_class_private_field_get$2(this, _bound).exclusive;
}
function getStart(req) {
  const boundStart = {
    row: _class_private_field_get$2(this, _bound).row,
    basis: _class_private_field_get$2(this, _bound).exclusive ? "after" : "at"
  };
  if (!req.start) {
    if (req.reverse) {
      return void 0;
    }
    return boundStart;
  }
  const cmp2 = _class_private_field_get$2(this, _comparator).call(this, _class_private_field_get$2(this, _bound).row, req.start.row);
  if (!req.reverse) {
    if (cmp2 > 0) {
      return boundStart;
    }
    if (cmp2 === 0) {
      if (_class_private_field_get$2(this, _bound).exclusive || req.start.basis === "after") {
        return {
          row: _class_private_field_get$2(this, _bound).row,
          basis: "after"
        };
      }
      return boundStart;
    }
    return req.start;
  }
  req.reverse;
  if (cmp2 > 0) {
    return "empty";
  }
  if (cmp2 === 0) {
    if (!_class_private_field_get$2(this, _bound).exclusive && req.start.basis === "at") {
      return boundStart;
    }
    return "empty";
  }
  return req.start;
}
function* initialFetch(req) {
  assert(req.start === void 0, "Start should be undefined");
  assert(!req.reverse, "Reverse should be false");
  assert(constraintMatchesPartitionKey(req.constraint, _class_private_field_get$2(this, _partitionKey)), "Constraint should match partition key");
  if (_class_private_field_get$2(this, _limit) === 0) {
    return;
  }
  const takeStateKey = getTakeStateKey(_class_private_field_get$2(this, _partitionKey), req.constraint);
  assert(_class_private_field_get$2(this, _storage2).get(takeStateKey) === void 0, "Take state should be undefined");
  let size = 0;
  let bound;
  let downstreamEarlyReturn = true;
  let exceptionThrown = false;
  try {
    for (const inputNode of _class_private_field_get$2(this, _input6).fetch(req)) {
      yield inputNode;
      bound = inputNode.row;
      size++;
      if (size === _class_private_field_get$2(this, _limit)) {
        break;
      }
    }
    downstreamEarlyReturn = false;
  } catch (e) {
    exceptionThrown = true;
    throw e;
  } finally {
    if (!exceptionThrown) {
      _class_private_method_get(this, _setTakeState, setTakeState).call(this, takeStateKey, size, bound, _class_private_field_get$2(this, _storage2).get(MAX_BOUND_KEY));
      assert(!downstreamEarlyReturn, "Unexpected early return prevented full hydration");
    }
  }
}
function getStateAndConstraint(row) {
  const takeStateKey = getTakeStateKey(_class_private_field_get$2(this, _partitionKey), row);
  const takeState = _class_private_field_get$2(this, _storage2).get(takeStateKey);
  let maxBound;
  let constraint;
  if (takeState) {
    maxBound = _class_private_field_get$2(this, _storage2).get(MAX_BOUND_KEY);
    constraint = _class_private_field_get$2(this, _partitionKey) && Object.fromEntries(_class_private_field_get$2(this, _partitionKey).map((key) => [
      key,
      row[key]
    ]));
  }
  return {
    takeState,
    takeStateKey,
    maxBound,
    constraint
  };
}
function pushEditChange(change) {
  assert(!_class_private_field_get$2(this, _partitionKeyComparator) || _class_private_field_get$2(this, _partitionKeyComparator).call(this, change.oldNode.row, change.node.row) === 0, "Unexpected change of partition key");
  const { takeState, takeStateKey, maxBound, constraint } = _class_private_method_get(this, _getStateAndConstraint, getStateAndConstraint).call(this, change.oldNode.row);
  if (!takeState) {
    return;
  }
  assert(takeState.bound, "Bound should be set");
  const { compareRows } = this.getSchema();
  const oldCmp = compareRows(change.oldNode.row, takeState.bound);
  const newCmp = compareRows(change.node.row, takeState.bound);
  const replaceBoundAndForwardChange = () => {
    _class_private_method_get(this, _setTakeState, setTakeState).call(this, takeStateKey, takeState.size, change.node.row, maxBound);
    _class_private_field_get$2(this, _output8).push(change, this);
  };
  if (oldCmp === 0) {
    if (newCmp === 0) {
      _class_private_field_get$2(this, _output8).push(change, this);
      return;
    }
    if (newCmp < 0) {
      if (_class_private_field_get$2(this, _limit) === 1) {
        replaceBoundAndForwardChange();
        return;
      }
      const beforeBoundNode = must(first(_class_private_field_get$2(this, _input6).fetch({
        start: {
          row: takeState.bound,
          basis: "after"
        },
        constraint,
        reverse: true
      })));
      _class_private_method_get(this, _setTakeState, setTakeState).call(this, takeStateKey, takeState.size, beforeBoundNode.row, maxBound);
      _class_private_field_get$2(this, _output8).push(change, this);
      return;
    }
    assert(newCmp > 0, "New comparison must be greater than 0");
    const newBoundNode = must(first(_class_private_field_get$2(this, _input6).fetch({
      start: {
        row: takeState.bound,
        basis: "at"
      },
      constraint
    })));
    if (compareRows(newBoundNode.row, change.node.row) === 0) {
      replaceBoundAndForwardChange();
      return;
    }
    _class_private_method_get(this, _setTakeState, setTakeState).call(this, takeStateKey, takeState.size, newBoundNode.row, maxBound);
    _class_private_method_get(this, _withRowHiddenFromFetch, withRowHiddenFromFetch).call(this, newBoundNode.row, () => {
      _class_private_field_get$2(this, _output8).push({
        type: "remove",
        node: change.oldNode
      }, this);
    });
    _class_private_field_get$2(this, _output8).push({
      type: "add",
      node: newBoundNode
    }, this);
    return;
  }
  if (oldCmp > 0) {
    assert(newCmp !== 0, "Invalid state. Row has duplicate primary key");
    if (newCmp > 0) {
      return;
    }
    assert(newCmp < 0, "New comparison must be less than 0");
    const [oldBoundNode, newBoundNode] = take(_class_private_field_get$2(this, _input6).fetch({
      start: {
        row: takeState.bound,
        basis: "at"
      },
      constraint,
      reverse: true
    }), 2);
    _class_private_method_get(this, _setTakeState, setTakeState).call(this, takeStateKey, takeState.size, newBoundNode.row, maxBound);
    _class_private_method_get(this, _withRowHiddenFromFetch, withRowHiddenFromFetch).call(this, change.node.row, () => {
      _class_private_field_get$2(this, _output8).push({
        type: "remove",
        node: oldBoundNode
      }, this);
    });
    _class_private_field_get$2(this, _output8).push({
      type: "add",
      node: change.node
    }, this);
    return;
  }
  if (oldCmp < 0) {
    assert(newCmp !== 0, "Invalid state. Row has duplicate primary key");
    if (newCmp < 0) {
      _class_private_field_get$2(this, _output8).push(change, this);
      return;
    }
    assert(newCmp > 0, "New comparison must be greater than 0");
    const afterBoundNode = must(first(_class_private_field_get$2(this, _input6).fetch({
      start: {
        row: takeState.bound,
        basis: "after"
      },
      constraint
    })));
    if (compareRows(afterBoundNode.row, change.node.row) === 0) {
      replaceBoundAndForwardChange();
      return;
    }
    _class_private_field_get$2(this, _output8).push({
      type: "remove",
      node: change.oldNode
    }, this);
    _class_private_method_get(this, _setTakeState, setTakeState).call(this, takeStateKey, takeState.size, afterBoundNode.row, maxBound);
    _class_private_field_get$2(this, _output8).push({
      type: "add",
      node: afterBoundNode
    }, this);
    return;
  }
  unreachable();
}
function withRowHiddenFromFetch(row, fn) {
  _class_private_field_set$2(this, _rowHiddenFromFetch, row);
  try {
    fn();
  } finally {
    _class_private_field_set$2(this, _rowHiddenFromFetch, void 0);
  }
}
function setTakeState(takeStateKey, size, bound, maxBound) {
  _class_private_field_get$2(this, _storage2).set(takeStateKey, {
    size,
    bound
  });
  if (bound !== void 0 && (maxBound === void 0 || this.getSchema().compareRows(bound, maxBound) > 0)) {
    _class_private_field_get$2(this, _storage2).set(MAX_BOUND_KEY, bound);
  }
}
function pushInternalChange(change, pusher2) {
  if (change.type === "child") {
    _class_private_field_get$2(this, _output9).push(change, this);
    return;
  }
  assert(change.type === "add" || change.type === "remove");
  let hadMatch = false;
  for (const input of _class_private_field_get$2(this, _inputs1)) {
    if (input === pusher2) {
      hadMatch = true;
      continue;
    }
    const constraint = {};
    for (const key of _class_private_field_get$2(this, _schema6).primaryKey) {
      constraint[key] = change.node.row[key];
    }
    const fetchResult = input.fetch({
      constraint
    });
    if (first(fetchResult) !== void 0) {
      return;
    }
  }
  assert(hadMatch, "Pusher was not one of the inputs to union-fan-in!");
  _class_private_field_get$2(this, _output9).push(change, this);
}
function fireListeners() {
  for (const listener of _class_private_field_get$2(this, _listeners)) {
    _class_private_method_get(this, _fireListener, fireListener).call(this, listener);
  }
}
function fireListener(listener) {
  listener(this.data, _class_private_field_get$2(this, _resultType), _class_private_field_get$2(this, _error));
}
function hydrate() {
  _class_private_field_set$2(this, _dirty, true);
  for (const node of _class_private_field_get$2(this, _input8).fetch({})) {
    applyChange(_class_private_field_get$2(this, _root), {
      type: "add",
      node
    }, _class_private_field_get$2(this, _schema7), "", _class_private_field_get$2(this, _format$1));
  }
  this.flush();
}
async function init(signal) {
  const { clientGroupID, clientID } = this;
  const name = toLockName(clientGroupID, clientID);
  const channel = new bc(toBroadcastChannelName(clientGroupID));
  channel.addEventListener("message", (e) => {
    const client = fromLockName(e.data);
    if (client?.clientGroupID === this.clientGroupID) {
      _class_private_method_get(this, _addClient, addClient).call(this, client.clientID);
    }
  }, {
    signal
  });
  _class_private_field_get$2(this, _lockManager).request(name, "exclusive", () => _class_private_field_get$2(this, _resolver).promise).catch(ignoreAbortError);
  signal.addEventListener("abort", () => {
    _class_private_field_get$2(this, _lockManager).release(name, () => _class_private_field_get$2(this, _resolver).resolve());
    channel.close();
  }, {
    once: true
  });
  for (const clientID2 of await _class_private_method_get(this, _getActiveClients, getActiveClients).call(this)) {
    if (clientID2 !== this.clientID) {
      _class_private_method_get(this, _addClient, addClient).call(this, clientID2);
    }
  }
  if (!signal.aborted) {
    channel.postMessage(name);
  }
}
async function getActiveClients() {
  const activeClients = /* @__PURE__ */ new Set();
  for await (const lockName of _class_private_field_get$2(this, _lockManager).queryExclusive()) {
    const client = fromLockName(lockName);
    if (client?.clientGroupID === this.clientGroupID) {
      activeClients.add(client.clientID);
    }
  }
  return activeClients;
}
function addSharedLockForOtherClient(clientID) {
  const name = toLockName(this.clientGroupID, clientID);
  _class_private_field_get$2(this, _lockManager).request(name, "shared", () => _class_private_method_get(this, _removeClient, removeClient).call(this, clientID)).catch(ignoreAbortError);
}
function addClient(clientID) {
  if (!_class_private_field_get$2(this, _activeClients).has(clientID)) {
    _class_private_field_get$2(this, _activeClients).add(clientID);
    _class_private_method_get(this, _addSharedLockForOtherClient, addSharedLockForOtherClient).call(this, clientID);
    this.onAdd?.(clientID);
  }
}
function removeClient(clientID) {
  if (_class_private_field_get$2(this, _activeClients).delete(clientID)) {
    this.onDelete?.(clientID, this.clientGroupID);
  }
}
function __delete(key) {
  let root = _class_private_field_get$2(this, _root1);
  if (root.isShared) {
    _class_private_field_set$2(this, _root1, root = root.clone());
  }
  try {
    return root.delete(key, this);
  } finally {
    let isShared;
    while (root.keys.length <= 1 && root.isInternal()) {
      isShared || (isShared = root.isShared);
      _class_private_field_set$2(this, _root1, root = root.keys.length === 0 ? emptyLeaf : root.children[0]);
    }
    if (isShared) {
      root.isShared = true;
    }
  }
}
function maxKey() {
  return _class_private_field_get$2(this, _root1).maxKey();
}
function getSchema(connection) {
  return {
    tableName: _class_private_field_get$2(this, _tableName1),
    columns: _class_private_field_get$2(this, _columns),
    primaryKey: _class_private_field_get$2(this, _primaryKey),
    sort: connection.sort,
    system: "client",
    relationships: {},
    isHidden: false,
    compareRows: connection.compareRows
  };
}
function disconnect(input) {
  const idx = _class_private_field_get$2(this, _connections).findIndex((c) => c.input === input);
  assert(idx !== -1, "Connection not found");
  _class_private_field_get$2(this, _connections).splice(idx, 1);
}
function getPrimaryIndex() {
  const index = _class_private_field_get$2(this, _indexes).get(JSON.stringify(_class_private_field_get$2(this, _primaryIndexSort)));
  assert(index, "Primary index not found");
  return index;
}
function getOrCreateIndex(sort, usedBy) {
  const key = JSON.stringify(sort);
  const index = _class_private_field_get$2(this, _indexes).get(key);
  if (index) {
    index.usedBy.add(usedBy);
    return index;
  }
  const comparator2 = makeBoundComparator(sort);
  const data = new BTreeSet(comparator2);
  for (const row of _class_private_method_get(this, _getPrimaryIndex, getPrimaryIndex).call(this).data) {
    data.add(row);
  }
  const newIndex = {
    comparator: comparator2,
    data,
    usedBy: /* @__PURE__ */ new Set([
      usedBy
    ])
  };
  _class_private_field_get$2(this, _indexes).set(key, newIndex);
  return newIndex;
}
function* fetch1(req, from) {
  const callingConnectionIndex = _class_private_field_get$2(this, _connections).indexOf(from);
  assert(callingConnectionIndex !== -1, "Output not found");
  const conn = _class_private_field_get$2(this, _connections)[callingConnectionIndex];
  const { sort: requestedSort, compareRows } = conn;
  const connectionComparator = (r1, r2) => compareRows(r1, r2) * (req.reverse ? -1 : 1);
  const pkConstraint = primaryKeyConstraintFromFilters(conn.filters?.condition, _class_private_field_get$2(this, _primaryKey));
  const fetchOrPkConstraint = pkConstraint ?? req.constraint;
  const indexSort = [];
  if (fetchOrPkConstraint) {
    for (const key of Object.keys(fetchOrPkConstraint)) {
      indexSort.push([
        key,
        "asc"
      ]);
    }
  }
  if (_class_private_field_get$2(this, _primaryKey).length > 1 || !fetchOrPkConstraint || !constraintMatchesPrimaryKey(fetchOrPkConstraint, _class_private_field_get$2(this, _primaryKey))) {
    indexSort.push(...requestedSort);
  }
  const index = _class_private_method_get(this, _getOrCreateIndex, getOrCreateIndex).call(this, indexSort, from);
  const { data, comparator: compare2 } = index;
  const indexComparator = (r1, r2) => compare2(r1, r2) * (req.reverse ? -1 : 1);
  const startAt = req.start?.row;
  let scanStart;
  if (fetchOrPkConstraint) {
    scanStart = {};
    for (const [key, dir] of indexSort) {
      if (hasOwn(fetchOrPkConstraint, key)) {
        scanStart[key] = fetchOrPkConstraint[key];
      } else {
        if (req.reverse) {
          scanStart[key] = dir === "asc" ? maxValue : minValue;
        } else {
          scanStart[key] = dir === "asc" ? minValue : maxValue;
        }
      }
    }
  } else {
    scanStart = startAt;
  }
  const rowsIterable = generateRows(data, scanStart, req.reverse);
  const withOverlay = generateWithOverlay2(
    startAt,
    pkConstraint ? once(rowsIterable) : rowsIterable,
    // use `req.constraint` here and not `fetchOrPkConstraint` since `fetchOrPkConstraint` could be the
    // primary key constraint. The primary key constraint comes from filters and is acting as a filter
    // rather than as the fetch constraint.
    req.constraint,
    _class_private_field_get$2(this, _overlay),
    callingConnectionIndex,
    // Use indexComparator, generateWithOverlayInner has a subtle dependency
    // on this.  Since generateWithConstraint is done after
    // generateWithOverlay, the generator consumed by generateWithOverlayInner
    // does not end when the constraint stops matching and so the final
    // check to yield an add overlay if not yet yielded is not reached.
    // However, using the indexComparator the add overlay will be less than
    // the first row that does not match the constraint, and so any
    // not yet yielded add overlay will be yielded when the first row
    // not matching the constraint is reached.
    indexComparator,
    conn.filters?.predicate
  );
  const withConstraint = generateWithConstraint(
    generateWithStart(withOverlay, req.start, connectionComparator),
    // we use `req.constraint` and not `fetchOrPkConstraint` here because we need to
    // AND the constraint with what could have been the primary key constraint
    req.constraint
  );
  yield* conn.filters ? generateWithFilter(withConstraint, conn.filters.predicate) : withConstraint;
}
function cleanup(req, connection) {
  return _class_private_method_get(this, _fetch, fetch1).call(this, req, connection);
}
function writeChange(change) {
  for (const { data } of _class_private_field_get$2(this, _indexes).values()) {
    switch (change.type) {
      case "add": {
        const added = data.add(change.row);
        assert(added);
        break;
      }
      case "remove": {
        const removed = data.delete(change.row);
        assert(removed);
        break;
      }
      case "edit": {
        const removed = data.delete(change.oldRow);
        assert(removed);
        data.add(change.row);
        break;
      }
      default:
        unreachable();
    }
  }
}
function endTransaction() {
  for (const listener of _class_private_field_get$2(this, _commitListeners)) {
    try {
      listener();
    } catch (e) {
      _class_private_field_get$2(this, _lc4).error?.(error_kind_enum_exports.Internal, "Failed notifying a commit listener of IVM updates", e);
    }
  }
}
function startTimer() {
  if (_class_private_field_get$2(this, _timerID)) {
    return;
  }
  _class_private_field_set$2(this, _timerID, setTimeout(() => {
    _class_private_field_set$2(this, _timerID, 0);
    void this.flush();
  }, _class_private_field_get$2(this, _interval)));
}
function setNotConnectedReason(reason) {
  _class_private_field_get$2(this, _notConnected).set(reason);
}
function register1(metric) {
  _class_private_field_get$2(this, _metrics).push(metric);
  return metric;
}
function processMutationResponses(diffs) {
  const clientID = must(_class_private_field_get$2(this, _clientID1));
  let largestLmid = 0;
  for (const diff3 of diffs) {
    const mutationID = Number(diff3.key.slice(MUTATIONS_KEY_PREFIX.length + clientID.length + 1));
    assert(!isNaN(mutationID), `MutationTracker received a diff with an invalid mutation ID: ${diff3.key}`);
    largestLmid = Math.max(largestLmid, mutationID);
    switch (diff3.op) {
      case "add": {
        const result = parse(diff3.newValue, mutationResultSchema);
        if ("error" in result) {
          _class_private_method_get(this, _processMutationError, processMutationError).call(this, clientID, mutationID, result);
        } else {
          _class_private_method_get(this, _processMutationOk, processMutationOk).call(this, clientID, mutationID, result);
        }
        break;
      }
      case "del":
        break;
      case "change":
        throw new Error("MutationTracker does not expect change operations");
    }
  }
  if (largestLmid > 0) {
    _class_private_field_get$2(this, _ackMutations).call(this, {
      clientID: must(_class_private_field_get$2(this, _clientID1)),
      id: largestLmid
    });
  }
}
function resolveMutations(upTo) {
  for (const [id, entry] of _class_private_field_get$2(this, _outstandingMutations)) {
    if (entry.mutationID && entry.mutationID <= upTo) {
      _class_private_method_get(this, _settleMutation, settleMutation).call(this, id, entry, "resolve", emptyObject);
    } else {
      break;
    }
  }
}
function processPushOk(ok2) {
  for (const mutation of ok2.mutations) {
    if ("error" in mutation.result) {
      _class_private_method_get(this, _processMutationError, processMutationError).call(this, mutation.id.clientID, mutation.id.id, mutation.result);
    } else {
      _class_private_method_get(this, _processMutationOk, processMutationOk).call(this, mutation.id.clientID, mutation.id.id, mutation.result);
    }
  }
}
function processMutationError(clientID, mid, error) {
  assert(clientID === _class_private_field_get$2(this, _clientID1), "received mutation for the wrong client");
  const ephemeralID = _class_private_field_get$2(this, _ephemeralIDsByMutationID).get(mid);
  if (!ephemeralID && error.error === "alreadyProcessed") {
    return;
  }
  assert(ephemeralID, `ephemeral ID is missing for mutation error: ${error.error}.`);
  const entry = _class_private_field_get$2(this, _outstandingMutations).get(ephemeralID);
  assert(entry && entry.mutationID === mid);
  _class_private_method_get(this, _settleMutation, settleMutation).call(this, ephemeralID, entry, "reject", error);
}
function processMutationOk(clientID, mid, result) {
  assert(clientID === _class_private_field_get$2(this, _clientID1), "received mutation for the wrong client");
  const ephemeralID = _class_private_field_get$2(this, _ephemeralIDsByMutationID).get(mid);
  assert(ephemeralID, "ephemeral ID is missing. This can happen if a mutation response is received twice but it should be impossible to receive a success response twice for the same mutation.");
  const entry = _class_private_field_get$2(this, _outstandingMutations).get(ephemeralID);
  assert(entry && entry.mutationID === mid);
  _class_private_method_get(this, _settleMutation, settleMutation).call(this, ephemeralID, entry, "resolve", result);
}
function settleMutation(ephemeralID, entry, type, result) {
  switch (type) {
    case "resolve":
      entry.resolver.resolve(result);
      break;
    case "reject":
      entry.resolver.reject(result);
      break;
  }
  _class_private_field_get$2(this, _outstandingMutations).delete(ephemeralID);
  if (entry.mutationID) {
    _class_private_field_get$2(this, _ephemeralIDsByMutationID).delete(entry.mutationID);
  }
}
function notifyAllMutationsAppliedListeners() {
  for (const listener of _class_private_field_get$2(this, _allMutationsAppliedListeners)) {
    listener();
  }
}
function fireGotCallbacks(queryHash, got) {
  const gotCallbacks = _class_private_field_get$2(this, _queries).get(queryHash)?.gotCallbacks ?? [];
  for (const gotCallback of gotCallbacks) {
    gotCallback(got);
  }
}
function add1(queryId, normalized, name, args, ttl, gotCallback) {
  assert(name === void 0 === (args === void 0), "If name is defined, args must be defined");
  ttl = clampTTL(ttl, _class_private_field_get$2(this, _lc8));
  let entry = _class_private_field_get$2(this, _queries).get(queryId);
  _class_private_field_get$2(this, _recentQueries).delete(queryId);
  if (!entry) {
    normalized = mapAST(normalized, _class_private_field_get$2(this, _clientToServer));
    entry = {
      normalized,
      name,
      args,
      count: 1,
      gotCallbacks: gotCallback ? [
        gotCallback
      ] : [],
      ttl
    };
    _class_private_field_get$2(this, _queries).set(queryId, entry);
    _class_private_method_get(this, _queueQueryChange, queueQueryChange).call(this, {
      op: "put",
      hash: queryId,
      ast: name === void 0 ? normalized : void 0,
      name,
      args,
      ttl
    });
  } else {
    ++entry.count;
    _class_private_method_get(this, _updateEntry, updateEntry).call(this, entry, queryId, ttl);
    if (gotCallback) {
      entry.gotCallbacks.push(gotCallback);
    }
  }
  if (gotCallback) {
    gotCallback(_class_private_field_get$2(this, _gotQueries).has(queryId));
  }
  let removed = false;
  const cleanupCb = () => {
    if (removed) {
      return;
    }
    removed = true;
    if (_class_private_field_get$2(this, _mutationTracker).size > 0) {
      _class_private_field_get$2(this, _pendingRemovals).push(() => _class_private_method_get(this, _remove, remove).call(this, entry, queryId, gotCallback));
      return;
    }
    _class_private_method_get(this, _remove, remove).call(this, entry, queryId, gotCallback);
  };
  return cleanupCb;
}
function updateEntry(entry, queryID, ttl) {
  ttl = clampTTL(ttl, _class_private_field_get$2(this, _lc8));
  if (compareTTL(ttl, entry.ttl) > 0) {
    entry.ttl = ttl;
    _class_private_method_get(this, _queueQueryChange, queueQueryChange).call(this, {
      op: "put",
      hash: queryID,
      ast: entry.name === void 0 ? entry.normalized : void 0,
      name: entry.name,
      args: entry.args,
      ttl
    });
  }
}
function queueQueryChange(op) {
  _class_private_field_get$2(this, _pendingQueryChanges).push(op);
  _class_private_method_get(this, _scheduleBatch, scheduleBatch).call(this);
}
function scheduleBatch() {
  if (_class_private_field_get$2(this, _batchTimer) === void 0) {
    _class_private_field_set$2(this, _batchTimer, setTimeout(() => this.flushBatch(), _class_private_field_get$2(this, _queryChangeThrottleMs)));
  }
}
function remove(entry, astHash, gotCallback) {
  if (gotCallback) {
    const index = entry.gotCallbacks.indexOf(gotCallback);
    entry.gotCallbacks.splice(index, 1);
  }
  --entry.count;
  if (entry.count === 0) {
    _class_private_field_get$2(this, _recentQueries).add(astHash);
    if (_class_private_field_get$2(this, _recentQueries).size > _class_private_field_get$2(this, _recentQueriesMaxSize)) {
      const lruQueryID = _class_private_field_get$2(this, _recentQueries).values().next().value;
      assert(lruQueryID);
      _class_private_field_get$2(this, _queries).delete(lruQueryID);
      _class_private_field_get$2(this, _recentQueries).delete(lruQueryID);
      _class_private_field_get$2(this, _queryMetrics).delete(lruQueryID);
      _class_private_method_get(this, _queueQueryChange, queueQueryChange).call(this, {
        op: "del",
        hash: lruQueryID
      });
    }
  }
}
function startPlaybackLoop() {
  _class_private_field_get$2(this, _lc9).debug?.("starting playback loop");
  _class_private_field_set$2(this, _pokePlaybackLoopRunning, true);
  _class_private_field_get$2(this, _raf).call(this, _class_private_field_get$2(this, _rafCallback));
}
function processPokesForFrame(lc) {
  return _class_private_field_get$2(this, _pokeLock).withLock(async () => {
    const now = Date.now();
    lc.debug?.("got poke lock at", now);
    lc.debug?.("merging", _class_private_field_get$2(this, _pokeBuffer).length);
    try {
      const merged = mergePokes(_class_private_field_get$2(this, _pokeBuffer), _class_private_field_get$2(this, _schema9), _class_private_field_get$2(this, _serverToClient1));
      _class_private_field_get$2(this, _pokeBuffer).length = 0;
      if (merged === void 0) {
        lc.debug?.("frame is empty");
        return;
      }
      const start = performance.now();
      lc.debug?.("poking replicache");
      await _class_private_field_get$2(this, _replicachePoke).call(this, merged);
      lc.debug?.("poking replicache took", performance.now() - start);
      if (!("error" in merged.pullResponse)) {
        const lmid = merged.pullResponse.lastMutationIDChanges[_class_private_field_get$2(this, _clientID3)];
        if (lmid !== void 0) {
          _class_private_field_get$2(this, _mutationTracker1).lmidAdvanced(lmid);
        }
      }
    } catch (e) {
      _class_private_method_get(this, _handlePokeError, handlePokeError).call(this, e);
    }
  });
}
function handlePokeError(e) {
  if (String(e).includes("unexpected base cookie for poke")) {
    _class_private_field_get$2(this, _lc9).debug?.("clearing due to", e);
  } else {
    _class_private_field_get$2(this, _lc9).error?.("clearing due to unexpected poke error", e);
  }
  _class_private_method_get(this, _clear, clear).call(this);
  _class_private_field_get$2(this, _onPokeError).call(this);
}
function clear() {
  _class_private_field_set$2(this, _receivingPoke, void 0);
  _class_private_field_get$2(this, _pokeBuffer).length = 0;
}
function setConnectionState(state) {
  if (state === _class_private_field_get$2(this, _connectionState)) {
    return;
  }
  _class_private_field_set$2(this, _connectionState, state);
  _class_private_field_get$2(this, _connectionStateChangeResolver).resolve(state);
  _class_private_field_set$2(this, _connectionStateChangeResolver, resolver());
}
function expose() {
  const g = globalThis;
  if (g.__zero === void 0) {
    g.__zero = this;
  } else if (g.__zero instanceof __Zero) {
    const prev = g.__zero;
    g.__zero = {
      [prev.clientID]: prev,
      [this.clientID]: this
    };
  } else {
    g.__zero[this.clientID] = this;
  }
}
function unexpose() {
  const g = globalThis;
  assert(g.__zero !== void 0);
  if (g.__zero instanceof __Zero) {
    assert(g.__zero === this);
    delete g.__zero;
  } else {
    delete g.__zero[this.clientID];
    if (Object.entries(g.__zero).length === 1) {
      g.__zero = Object.values(g.__zero)[0];
    }
  }
}
function send1(msg) {
  if (_class_private_field_get$2(this, _socket) && _class_private_field_get$2(this, _connectionState) === Connected) {
    send(_class_private_field_get$2(this, _socket), msg);
  }
}
function createLogOptions1(options) {
  return createLogOptions(options);
}
async function handleErrorMessage(lc, downMessage) {
  var _this, _this1;
  const [, { kind, message: message2 }] = downMessage;
  if (kind === error_kind_enum_exports.MutationRateLimited) {
    _class_private_field_set$2(this, _lastMutationIDSent, NULL_LAST_MUTATION_ID_SENT);
    lc.error?.(kind, "Mutation rate limited", {
      message: message2
    });
    return;
  }
  lc.info?.(`${kind}: ${message2}}`);
  const error = new ServerError(downMessage[1]);
  lc.error?.(`${error.kind}:

${error.errorBody.message}`, error);
  _class_private_field_get$2(this, _rejectMessageError)?.reject(error);
  lc.debug?.("Rejecting connect resolver due to error", error);
  _class_private_field_get$2(this, _connectResolver).reject(error);
  _class_private_method_get(this, _disconnect1, disconnect1).call(this, lc, {
    server: kind
  });
  if (kind === error_kind_enum_exports.VersionNotSupported) {
    _class_private_field_get$2(this, _onUpdateNeeded).call(this, {
      type: kind,
      message: message2
    });
  } else if (kind === error_kind_enum_exports.SchemaVersionNotSupported) {
    await _class_private_field_get$2(this, _rep).disableClientGroup();
    _class_private_field_get$2(this, _onUpdateNeeded).call(this, {
      type: "SchemaVersionNotSupported",
      message: message2
    });
  } else if (kind === error_kind_enum_exports.ClientNotFound) {
    await _class_private_field_get$2(this, _rep).disableClientGroup();
    (_this = _class_private_field_get$2(_this1 = this, _onClientStateNotFound)) === null || _this === void 0 ? void 0 : _this.call(_this1, onClientStateNotFoundServerReason(message2));
  } else if (kind === error_kind_enum_exports.InvalidConnectionRequestLastMutationID || kind === error_kind_enum_exports.InvalidConnectionRequestBaseCookie) {
    await dropDatabase(_class_private_field_get$2(this, _rep).idbName);
    reloadWithReason(lc, _class_private_field_get$2(this, _reload), kind, serverAheadReloadReason);
  }
}
async function handleConnectedMessage(lc, connectedMessage) {
  const now = Date.now();
  const [, connectBody] = connectedMessage;
  lc = addWebSocketIDToLogContext(connectBody.wsid, lc);
  if (_class_private_field_get$2(this, _connectedCount) === 0) {
    _class_private_method_get(this, _checkConnectivity, checkConnectivity).call(this, "firstConnect");
  } else if (_class_private_field_get$2(this, _connectErrorCount) > 0) {
    _class_private_method_get(this, _checkConnectivity, checkConnectivity).call(this, "connectAfterError");
  }
  _class_private_field_update(this, _connectedCount).value++;
  _class_private_field_set$2(this, _connectedAt, now);
  _class_private_field_get$2(this, _metrics2).lastConnectError.clear();
  const proceedingConnectErrorCount = _class_private_field_get$2(this, _connectErrorCount);
  _class_private_field_set$2(this, _connectErrorCount, 0);
  let timeToConnectMs;
  let connectMsgLatencyMs;
  if (_class_private_field_get$2(this, _connectStart) === void 0) {
    lc.error?.("Got connected message but connect start time is undefined.");
  } else {
    timeToConnectMs = now - _class_private_field_get$2(this, _connectStart);
    _class_private_field_get$2(this, _metrics2).timeToConnectMs.set(timeToConnectMs);
    connectMsgLatencyMs = connectBody.timestamp !== void 0 ? now - connectBody.timestamp : void 0;
    _class_private_field_set$2(this, _connectStart, void 0);
  }
  let totalTimeToConnectMs;
  if (_class_private_field_get$2(this, _totalToConnectStart) === void 0) {
    lc.error?.("Got connected message but total to connect start time is undefined.");
  } else {
    totalTimeToConnectMs = now - _class_private_field_get$2(this, _totalToConnectStart);
    _class_private_field_set$2(this, _totalToConnectStart, void 0);
  }
  _class_private_field_get$2(this, _metrics2).setConnected(timeToConnectMs ?? 0, totalTimeToConnectMs ?? 0);
  lc.info?.("Connected", {
    navigatorOnline: localNavigator?.onLine,
    timeToConnectMs,
    totalTimeToConnectMs,
    connectMsgLatencyMs,
    connectedCount: _class_private_field_get$2(this, _connectedCount),
    proceedingConnectErrorCount
  });
  _class_private_field_set$2(this, _lastMutationIDSent, NULL_LAST_MUTATION_ID_SENT);
  lc.debug?.("Resolving connect resolver");
  const socket = must(_class_private_field_get$2(this, _socket));
  const queriesPatch = await _class_private_field_get$2(this, _rep).query((tx) => _class_private_field_get$2(this, _queryManager).getQueriesPatch(tx, _class_private_field_get$2(this, _initConnectionQueries)));
  const hasDeletedClients = () => skipEmptyArray(_class_private_field_get$2(this, _deletedClients)?.clientIDs) || skipEmptyArray(_class_private_field_get$2(this, _deletedClients)?.clientGroupIDs);
  const maybeSendDeletedClients = () => {
    if (hasDeletedClients()) {
      send(socket, [
        "deleteClients",
        _class_private_field_get$2(this, _deletedClients)
      ]);
      _class_private_field_set$2(this, _deletedClients, void 0);
    }
  };
  if (queriesPatch.size > 0 && _class_private_field_get$2(this, _initConnectionQueries) !== void 0) {
    maybeSendDeletedClients();
    send(socket, [
      "changeDesiredQueries",
      {
        desiredQueriesPatch: [
          ...queriesPatch.values()
        ]
      }
    ]);
  } else if (_class_private_field_get$2(this, _initConnectionQueries) === void 0) {
    const clientSchema2 = _class_private_field_get$2(this, _clientSchema);
    send(socket, [
      "initConnection",
      {
        desiredQueriesPatch: [
          ...queriesPatch.values()
        ],
        deleted: skipEmptyDeletedClients(_class_private_field_get$2(this, _deletedClients)),
        // The clientSchema only needs to be sent for the very first request.
        // Henceforth it is stored with the CVR and verified automatically.
        ..._class_private_field_get$2(this, _connectCookie) === null ? {
          clientSchema: clientSchema2
        } : {},
        userPushURL: _class_private_field_get$2(this, _options1).mutateURL,
        userQueryURL: _class_private_field_get$2(this, _options1).getQueriesURL
      }
    ]);
    _class_private_field_set$2(this, _deletedClients, void 0);
  }
  _class_private_field_set$2(this, _initConnectionQueries, void 0);
  maybeSendDeletedClients();
  _class_private_method_get(this, _setConnectionState, setConnectionState).call(this, Connected);
  _class_private_field_get$2(this, _connectResolver).resolve();
}
async function connect(lc, additionalConnectParams) {
  assert(_class_private_field_get$2(this, _server));
  assert(_class_private_field_get$2(this, _connectionState) === Disconnected);
  const wsid = nanoid();
  lc = addWebSocketIDToLogContext(wsid, lc);
  lc.info?.("Connecting...", {
    navigatorOnline: localNavigator?.onLine
  });
  _class_private_method_get(this, _setConnectionState, setConnectionState).call(this, Connecting);
  assert(_class_private_field_get$2(this, _connectStart) === void 0);
  const now = Date.now();
  _class_private_field_set$2(this, _connectStart, now);
  if (_class_private_field_get$2(this, _totalToConnectStart) === void 0) {
    _class_private_field_set$2(this, _totalToConnectStart, now);
  }
  if (this.closed) {
    return;
  }
  _class_private_field_set$2(this, _connectCookie, parse(await _class_private_field_get$2(this, _rep).cookie, nullableVersionSchema, "passthrough"));
  if (this.closed) {
    return;
  }
  const timeoutID = setTimeout(() => {
    lc.debug?.("Rejecting connect resolver due to timeout");
    _class_private_field_get$2(this, _connectResolver).reject(new TimedOutError("Connect"));
    _class_private_method_get(this, _disconnect1, disconnect1).call(this, lc, {
      client: "ConnectTimeout"
    });
  }, CONNECT_TIMEOUT_MS);
  const abortHandler = () => {
    clearTimeout(timeoutID);
  };
  _class_private_field_get$2(this, _closeAbortController1).signal.addEventListener("abort", abortHandler);
  const [ws, initConnectionQueries, deletedClients] = await createSocket(_class_private_field_get$2(this, _rep), _class_private_field_get$2(this, _queryManager), _class_private_field_get$2(this, _deleteClientsManager), toWSString(_class_private_field_get$2(this, _server)), _class_private_field_get$2(this, _connectCookie), this.clientID, await this.clientGroupID, _class_private_field_get$2(this, _clientSchema), this.userID, _class_private_field_get$2(this, _rep).auth, _class_private_field_get$2(this, _lastMutationIDReceived), wsid, _class_private_field_get$2(this, _options1).logLevel === "debug", lc, _class_private_field_get$2(this, _options1).mutateURL, _class_private_field_get$2(this, _options1).getQueriesURL, additionalConnectParams, await _class_private_field_get$2(this, _activeClientsManager), _class_private_field_get$2(this, _options1).maxHeaderLength);
  if (this.closed) {
    return;
  }
  _class_private_field_set$2(this, _initConnectionQueries, initConnectionQueries);
  _class_private_field_set$2(this, _deletedClients, deletedClients);
  ws.addEventListener("message", _class_private_field_get$2(this, _onMessage));
  ws.addEventListener("open", _class_private_field_get$2(this, _onOpen));
  ws.addEventListener("close", _class_private_field_get$2(this, _onClose));
  _class_private_field_set$2(this, _socket, ws);
  _class_private_field_get$2(this, _socketResolver).resolve(ws);
  try {
    lc.debug?.("Waiting for connection to be acknowledged");
    await _class_private_field_get$2(this, _connectResolver).promise;
    _class_private_field_get$2(this, _mutationTracker3).onConnected(_class_private_field_get$2(this, _lastMutationIDReceived));
    _class_private_field_get$2(this, _rep).push().catch(() => {
    });
  } finally {
    clearTimeout(timeoutID);
    _class_private_field_get$2(this, _closeAbortController1).signal.removeEventListener("abort", abortHandler);
  }
}
function disconnect1(lc, reason, closeCode) {
  if (_class_private_field_get$2(this, _connectionState) === Connecting) {
    _class_private_field_update(this, _connectErrorCount).value++;
  }
  lc.info?.("disconnecting", {
    navigatorOnline: localNavigator?.onLine,
    reason,
    connectStart: _class_private_field_get$2(this, _connectStart),
    totalToConnectStart: _class_private_field_get$2(this, _totalToConnectStart),
    connectedAt: _class_private_field_get$2(this, _connectedAt),
    connectionDuration: _class_private_field_get$2(this, _connectedAt) ? Date.now() - _class_private_field_get$2(this, _connectedAt) : 0,
    messageCount: _class_private_field_get$2(this, _messageCount),
    connectionState: _class_private_field_get$2(this, _connectionState),
    connectErrorCount: _class_private_field_get$2(this, _connectErrorCount)
  });
  switch (_class_private_field_get$2(this, _connectionState)) {
    case Connected: {
      if (_class_private_field_get$2(this, _connectStart) !== void 0) {
        lc.error?.("disconnect() called while connected but connect start time is defined.");
      }
      break;
    }
    case Connecting: {
      _class_private_field_get$2(this, _metrics2).lastConnectError.set(getLastConnectErrorValue(reason));
      _class_private_field_get$2(this, _metrics2).timeToConnectMs.set(DID_NOT_CONNECT_VALUE);
      _class_private_field_get$2(this, _metrics2).setConnectError(reason);
      if (_class_private_field_get$2(this, _connectErrorCount) % CHECK_CONNECTIVITY_ON_ERROR_FREQUENCY === 1) {
        _class_private_method_get(this, _checkConnectivity, checkConnectivity).call(this, `connectErrorCount=${_class_private_field_get$2(this, _connectErrorCount)}`);
      }
      if (_class_private_field_get$2(this, _connectStart) === void 0) {
        lc.error?.("disconnect() called while connecting but connect start time is undefined.");
      }
      break;
    }
    case Disconnected:
      lc.error?.("disconnect() called while disconnected");
      break;
  }
  _class_private_field_set$2(this, _socketResolver, resolver());
  lc.debug?.("Creating new connect resolver");
  _class_private_field_set$2(this, _connectResolver, resolver());
  _class_private_method_get(this, _setConnectionState, setConnectionState).call(this, Disconnected);
  _class_private_field_set$2(this, _messageCount, 0);
  _class_private_field_set$2(this, _connectStart, void 0);
  _class_private_field_set$2(this, _connectedAt, 0);
  _class_private_field_get$2(this, _socket)?.removeEventListener("message", _class_private_field_get$2(this, _onMessage));
  _class_private_field_get$2(this, _socket)?.removeEventListener("open", _class_private_field_get$2(this, _onOpen));
  _class_private_field_get$2(this, _socket)?.removeEventListener("close", _class_private_field_get$2(this, _onClose));
  _class_private_field_get$2(this, _socket)?.close(closeCode);
  _class_private_field_set$2(this, _socket, void 0);
  _class_private_field_set$2(this, _lastMutationIDSent, NULL_LAST_MUTATION_ID_SENT);
  _class_private_field_get$2(this, _pokeHandler).handleDisconnect();
}
function handlePokeStart(_lc11, pokeMessage) {
  _class_private_field_get$2(this, _abortPingTimeout).call(this);
  _class_private_field_get$2(this, _pokeHandler).handlePokeStart(pokeMessage[1]);
}
function handlePokePart(_lc11, pokeMessage) {
  _class_private_field_get$2(this, _abortPingTimeout).call(this);
  const lastMutationIDChangeForSelf = _class_private_field_get$2(this, _pokeHandler).handlePokePart(pokeMessage[1]);
  if (lastMutationIDChangeForSelf !== void 0) {
    _class_private_field_set$2(this, _lastMutationIDReceived, lastMutationIDChangeForSelf);
  }
}
function handlePokeEnd(_lc11, pokeMessage) {
  _class_private_field_get$2(this, _abortPingTimeout).call(this);
  _class_private_field_get$2(this, _pokeHandler).handlePokeEnd(pokeMessage[1]);
}
function onPokeError() {
  const lc = _class_private_field_get$2(this, _lc10);
  lc.info?.("poke error, disconnecting?", _class_private_field_get$2(this, _connectionState) !== Disconnected);
  if (_class_private_field_get$2(this, _connectionState) !== Disconnected) {
    _class_private_method_get(this, _disconnect1, disconnect1).call(this, lc, {
      client: "UnexpectedBaseCookie"
    });
  }
}
function handlePullResponse(lc, pullResponseMessage) {
  _class_private_field_get$2(this, _abortPingTimeout).call(this);
  const body = pullResponseMessage[1];
  lc = lc.withContext("requestID", body.requestID);
  lc.debug?.("Handling pull response", body);
  const resolver11 = _class_private_field_get$2(this, _pendingPullsByRequestID).get(body.requestID);
  if (!resolver11) {
    lc.debug?.("No resolver found");
    return;
  }
  resolver11.resolve(pullResponseMessage[1]);
}
async function pusher(req, requestID) {
  assert(req.pushVersion === 1);
  await _class_private_field_get$2(this, _connectResolver).promise;
  const lc = _class_private_field_get$2(this, _lc10).withContext("requestID", requestID);
  lc.debug?.(`pushing ${req.mutations.length} mutations`);
  const socket = _class_private_field_get$2(this, _socket);
  assert(socket);
  const isMutationRecoveryPush = req.clientGroupID !== await this.clientGroupID;
  const start = isMutationRecoveryPush ? 0 : req.mutations.findIndex((m) => m.clientID === _class_private_field_get$2(this, _lastMutationIDSent).clientID && m.id === _class_private_field_get$2(this, _lastMutationIDSent).id) + 1;
  lc.debug?.(isMutationRecoveryPush ? "pushing for recovery" : "pushing", req.mutations.length - start, "mutations of", req.mutations.length, "mutations.");
  const now = Date.now();
  for (let i = start; i < req.mutations.length; i++) {
    const m = req.mutations[i];
    const timestamp = now - Math.round(performance.now() - m.timestamp);
    const zeroM = m.name === CRUD_MUTATION_NAME ? {
      type: CRUD,
      timestamp,
      id: m.id,
      clientID: m.clientID,
      name: m.name,
      args: [
        mapCRUD(m.args, _class_private_field_get$2(this, _clientToServer1))
      ]
    } : {
      type: Custom,
      timestamp,
      id: m.id,
      clientID: m.clientID,
      name: m.name,
      args: [
        m.args
      ]
    };
    const msg = [
      "push",
      {
        timestamp: now,
        clientGroupID: req.clientGroupID,
        mutations: [
          zeroM
        ],
        pushVersion: req.pushVersion,
        requestID
      }
    ];
    send(socket, msg);
    if (!isMutationRecoveryPush) {
      _class_private_field_set$2(this, _lastMutationIDSent, {
        clientID: m.clientID,
        id: m.id
      });
    }
  }
  return {
    httpRequestInfo: {
      errorMessage: "",
      httpStatusCode: 200
    }
  };
}
async function updateAuthToken(lc, error) {
  const { auth: authOption } = _class_private_field_get$2(this, _options1);
  const auth = await (typeof authOption === "function" ? authOption(error) : authOption);
  if (auth) {
    lc.debug?.("Got auth token");
    _class_private_field_get$2(this, _rep).auth = auth;
  }
}
async function runLoop() {
  _class_private_field_get$2(this, _lc10).info?.(`Starting Zero version: ${this.version}`);
  if (_class_private_field_get$2(this, _server) === null) {
    _class_private_field_get$2(this, _lc10).info?.("No socket origin provided, not starting connect loop.");
    return;
  }
  let runLoopCounter = 0;
  const bareLogContext = _class_private_field_get$2(this, _lc10);
  const getLogContext = () => {
    let lc = bareLogContext;
    if (_class_private_field_get$2(this, _socket)) {
      lc = addWebSocketIDFromSocketToLogContext(_class_private_field_get$2(this, _socket), lc);
    }
    return lc.withContext("runLoopCounter", runLoopCounter);
  };
  await _class_private_method_get(this, _updateAuthToken, updateAuthToken).call(this, bareLogContext);
  let needsReauth = false;
  let lastReauthAttemptAt;
  let gotError = false;
  let backoffMs = RUN_LOOP_INTERVAL_MS;
  let additionalConnectParams;
  while (!this.closed) {
    runLoopCounter++;
    let lc = getLogContext();
    backoffMs = RUN_LOOP_INTERVAL_MS;
    try {
      switch (_class_private_field_get$2(this, _connectionState)) {
        case Disconnected: {
          if (_class_private_field_get$2(this, _visibilityWatcher1).visibilityState === "hidden") {
            _class_private_field_get$2(this, _metrics2).setDisconnectedWaitingForVisible();
            _class_private_field_set$2(this, _totalToConnectStart, void 0);
          }
          await _class_private_field_get$2(this, _visibilityWatcher1).waitForVisible();
          if (needsReauth) {
            lastReauthAttemptAt = Date.now();
            await _class_private_method_get(this, _updateAuthToken, updateAuthToken).call(this, lc, "invalid-token");
          }
          if (reloadScheduled()) {
            break;
          }
          await _class_private_method_get(this, _connect, connect).call(this, lc, additionalConnectParams);
          additionalConnectParams = void 0;
          if (this.closed) {
            break;
          }
          assert(_class_private_field_get$2(this, _socket));
          lc = getLogContext();
          lc.debug?.("Connected successfully");
          gotError = false;
          needsReauth = false;
          _class_private_method_get(this, _setOnline, setOnline).call(this, true);
          break;
        }
        case Connecting:
          lc.error?.("unreachable");
          gotError = true;
          break;
        case Connected: {
          const controller = new AbortController();
          _class_private_field_set$2(this, _abortPingTimeout, () => controller.abort());
          const [pingTimeoutPromise, pingTimeoutAborted] = sleepWithAbort(PING_INTERVAL_MS, controller.signal);
          _class_private_field_set$2(this, _rejectMessageError, resolver());
          const PING = 0;
          const HIDDEN = 2;
          const raceResult = await promiseRace([
            pingTimeoutPromise,
            pingTimeoutAborted,
            _class_private_field_get$2(this, _visibilityWatcher1).waitForHidden(),
            _class_private_field_get$2(this, _connectionStateChangeResolver).promise,
            _class_private_field_get$2(this, _rejectMessageError).promise
          ]);
          if (this.closed) {
            _class_private_field_set$2(this, _rejectMessageError, void 0);
            break;
          }
          switch (raceResult) {
            case PING: {
              const pingResult = await _class_private_method_get(this, _ping, ping).call(this, lc, _class_private_field_get$2(this, _rejectMessageError).promise);
              if (pingResult === TimedOut) {
                gotError = true;
              }
              break;
            }
            case HIDDEN:
              _class_private_method_get(this, _disconnect1, disconnect1).call(this, lc, {
                client: "Hidden"
              });
              _class_private_method_get(this, _setOnline, setOnline).call(this, false);
              break;
          }
          _class_private_field_set$2(this, _rejectMessageError, void 0);
        }
      }
    } catch (ex) {
      if (_class_private_field_get$2(this, _connectionState) !== Connected) {
        const level = isAuthError(ex) ? "warn" : "error";
        const kind = isServerError(ex) ? ex.kind : "Unknown Error";
        lc[level]?.("Failed to connect", ex, kind, {
          lmid: _class_private_field_get$2(this, _lastMutationIDReceived),
          baseCookie: _class_private_field_get$2(this, _connectCookie)
        });
      }
      lc.debug?.("Got an exception in the run loop", "state:", _class_private_field_get$2(this, _connectionState), "exception:", ex);
      if (isAuthError(ex)) {
        const now = Date.now();
        const msSinceLastReauthAttempt = lastReauthAttemptAt === void 0 ? Number.POSITIVE_INFINITY : now - lastReauthAttemptAt;
        needsReauth = true;
        if (msSinceLastReauthAttempt > RUN_LOOP_INTERVAL_MS) {
          continue;
        }
      }
      if (isServerError(ex) || ex instanceof TimedOutError || ex instanceof CloseError) {
        gotError = true;
      }
      const backoffError = isBackoffError(ex);
      if (backoffError) {
        if (backoffError.minBackoffMs !== void 0) {
          backoffMs = Math.max(backoffMs, backoffError.minBackoffMs);
        }
        if (backoffError.maxBackoffMs !== void 0) {
          backoffMs = Math.min(backoffMs, backoffError.maxBackoffMs);
        }
        additionalConnectParams = backoffError.reconnectParams;
      }
    }
    if (gotError) {
      _class_private_method_get(this, _setOnline, setOnline).call(this, false);
      lc.debug?.("Sleeping", backoffMs, "ms before reconnecting due to error, state:", _class_private_field_get$2(this, _connectionState));
      await sleep(backoffMs);
    }
  }
}
async function puller(req, requestID) {
  assert(req.pullVersion === 1);
  const lc = _class_private_field_get$2(this, _lc10).withContext("requestID", requestID);
  lc.debug?.("Pull", req);
  if (req.clientGroupID === await this.clientGroupID) {
    return {
      httpRequestInfo: {
        errorMessage: "",
        httpStatusCode: 200
      }
    };
  }
  await _class_private_field_get$2(this, _connectResolver).promise;
  const socket = _class_private_field_get$2(this, _socket);
  assert(socket);
  lc.debug?.("Pull is for mutation recovery");
  const cookie = parse(req.cookie, nullableVersionSchema, "passthrough");
  const pullRequestMessage = [
    "pull",
    {
      clientGroupID: req.clientGroupID,
      cookie,
      requestID
    }
  ];
  send(socket, pullRequestMessage);
  const pullResponseResolver = resolver();
  _class_private_field_get$2(this, _pendingPullsByRequestID).set(requestID, pullResponseResolver);
  try {
    const TIMEOUT = 0;
    const RESPONSE = 1;
    const raceResult = await promiseRace([
      sleep(PULL_TIMEOUT_MS),
      pullResponseResolver.promise
    ]);
    switch (raceResult) {
      case TIMEOUT:
        lc.debug?.("Mutation recovery pull timed out");
        throw new Error("Pull timed out");
      case RESPONSE: {
        lc.debug?.("Returning mutation recovery pull response");
        const response = await pullResponseResolver.promise;
        return {
          response: {
            cookie: response.cookie,
            lastMutationIDChanges: response.lastMutationIDChanges,
            patch: []
          },
          httpRequestInfo: {
            errorMessage: "",
            httpStatusCode: 200
          }
        };
      }
      default:
        unreachable();
    }
  } finally {
    pullResponseResolver.reject("timed out");
    _class_private_field_get$2(this, _pendingPullsByRequestID).delete(requestID);
  }
}
function setOnline(online) {
  _class_private_field_get$2(this, _onlineManager).setOnline(online);
}
async function ping(lc, messageErrorRejectionPromise) {
  lc.debug?.("pinging");
  const { promise, resolve } = resolver();
  _class_private_field_set$2(this, _onPong, resolve);
  const pingMessage = [
    "ping",
    {}
  ];
  const t0 = performance.now();
  assert(_class_private_field_get$2(this, _socket));
  send(_class_private_field_get$2(this, _socket), pingMessage);
  const connected = await promiseRace([
    promise,
    sleep(PING_TIMEOUT_MS),
    messageErrorRejectionPromise
  ]) === 0;
  const delta = performance.now() - t0;
  if (!connected) {
    lc.info?.("ping failed in", delta, "ms - disconnecting");
    _class_private_method_get(this, _disconnect1, disconnect1).call(this, lc, {
      client: "PingTimeout"
    });
    return TimedOut;
  }
  lc.debug?.("ping succeeded in", delta, "ms");
  return Success;
}
async function reportMetrics(_allSeries) {
}
function checkConnectivity(reason) {
  void _class_private_method_get(this, _checkConnectivityAsync, checkConnectivityAsync).call(this, reason);
}
function checkConnectivityAsync(_reason) {
}
function registerQueries(schema2) {
  const rv = {};
  const context = _class_private_field_get$2(this, _zeroContext);
  for (const name of Object.keys(schema2.tables)) {
    rv[name] = newQuery(context, schema2, name);
  }
  return rv;
}
function _check_private_redeclaration$1(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}
function _class_apply_descriptor_get$1(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}
function _class_apply_descriptor_set$1(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }
    descriptor.value = value;
  }
}
function _class_extract_field_descriptor$1(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }
  return privateMap.get(receiver);
}
function _class_private_field_get$1(receiver, privateMap) {
  var descriptor = _class_extract_field_descriptor$1(receiver, privateMap, "get");
  return _class_apply_descriptor_get$1(receiver, descriptor);
}
function _class_private_field_init$1(obj, privateMap, value) {
  _check_private_redeclaration$1(obj, privateMap);
  privateMap.set(obj, value);
}
function _class_private_field_set$1(receiver, privateMap, value) {
  var descriptor = _class_extract_field_descriptor$1(receiver, privateMap, "set");
  _class_apply_descriptor_set$1(receiver, descriptor, value);
  return value;
}
function _define_property(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var _views, _zero, _view, _onDematerialized, _query, _format, _snapshot, _reactInternals, _ttl, _complete, _completeResolver, _nonEmpty, _nonEmptyResolver, _onData, _refetch, _materializeIfNeeded;
reactExports.lazy(() => import("./inspector-IU2HG74I-nOC-1m8O.js"));
function deepClone(value) {
  const seen = [];
  return internalDeepClone(value, seen);
}
function internalDeepClone(value, seen) {
  switch (typeof value) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return value;
    case "object": {
      if (value === null) {
        return null;
      }
      if (seen.includes(value)) {
        throw new Error("Cyclic object");
      }
      seen.push(value);
      if (Array.isArray(value)) {
        const rv = value.map((v) => internalDeepClone(v, seen));
        seen.pop();
        return rv;
      }
      const obj = {};
      for (const k in value) {
        if (hasOwn(value, k)) {
          const v = value[k];
          if (v !== void 0) {
            obj[k] = internalDeepClone(v, seen);
          }
        }
      }
      seen.pop();
      return obj;
    }
    default:
      throw new Error(`Invalid type: ${typeof value}`);
  }
}
var ZeroContext = reactExports.createContext(void 0);
function useZero() {
  const zero2 = reactExports.useContext(ZeroContext);
  if (zero2 === void 0) {
    throw new Error("useZero must be used within a ZeroProvider");
  }
  return zero2;
}
function ZeroProvider({ children, init: init2, ...props }) {
  const [zero2, setZero] = reactExports.useState("zero" in props ? props.zero : void 0);
  reactExports.useEffect(() => {
    if ("zero" in props) {
      setZero(props.zero);
      return;
    }
    const z = new Zero(props);
    init2?.(z);
    setZero(z);
    return () => {
      void z.close();
      setZero(void 0);
    };
  }, [
    init2,
    ...Object.values(props)
  ]);
  return zero2 && /* @__PURE__ */ jsxRuntimeExports.jsx(ZeroContext.Provider, {
    value: zero2,
    children
  });
}
React.use;
function useQuery$1(query, options) {
  let enabled = true;
  let ttl = DEFAULT_TTL_MS;
  const view = viewStore.getView(useZero(), query, enabled, ttl);
  return reactExports.useSyncExternalStore(view.subscribeReactInternals, view.getSnapshot, view.getSnapshot);
}
var emptyArray = [];
var disabledSubscriber = () => () => {
};
var resultTypeUnknown = {
  type: "unknown"
};
var resultTypeComplete = {
  type: "complete"
};
var resultTypeError = {
  type: "error"
};
var emptySnapshotSingularUnknown = [
  void 0,
  resultTypeUnknown
];
var emptySnapshotSingularComplete = [
  void 0,
  resultTypeComplete
];
var emptySnapshotSingularErrorUnknown = [
  void 0,
  resultTypeError
];
var emptySnapshotPluralUnknown = [
  emptyArray,
  resultTypeUnknown
];
var emptySnapshotPluralComplete = [
  emptyArray,
  resultTypeComplete
];
var emptySnapshotErrorUnknown = [
  emptyArray,
  resultTypeError
];
function getDefaultSnapshot(singular) {
  return singular ? emptySnapshotSingularUnknown : emptySnapshotPluralUnknown;
}
function getSnapshot(singular, data, resultType, refetchFn, error) {
  if (singular && data === void 0) {
    switch (resultType) {
      case "error":
        if (error) {
          return [
            void 0,
            makeError(refetchFn, error)
          ];
        }
        return emptySnapshotSingularErrorUnknown;
      case "complete":
        return emptySnapshotSingularComplete;
      case "unknown":
        return emptySnapshotSingularUnknown;
    }
  }
  if (!singular && data.length === 0) {
    switch (resultType) {
      case "error":
        if (error) {
          return [
            emptyArray,
            makeError(refetchFn, error)
          ];
        }
        return emptySnapshotErrorUnknown;
      case "complete":
        return emptySnapshotPluralComplete;
      case "unknown":
        return emptySnapshotPluralUnknown;
    }
  }
  switch (resultType) {
    case "error":
      if (error) {
        return [
          data,
          makeError(refetchFn, error)
        ];
      }
      return [
        data,
        makeError(refetchFn, {
          error: "app",
          name: "unknown",
          details: "An unknown error occurred"
        })
      ];
    case "complete":
      return [
        data,
        resultTypeComplete
      ];
    case "unknown":
      return [
        data,
        resultTypeUnknown
      ];
  }
}
function makeError(refetch, error) {
  return {
    type: "error",
    refetch,
    error: error.error === "app" || error.error === "zero" ? {
      type: "app",
      queryName: error.name,
      details: error.details
    } : {
      type: "http",
      queryName: error.name,
      status: error.status,
      details: error.details
    }
  };
}
var ViewStore = (_views = /* @__PURE__ */ new WeakMap(), class {
  getView(zero2, query, enabled, ttl) {
    const { format } = query;
    if (!enabled) {
      return {
        getSnapshot: () => getDefaultSnapshot(format.singular),
        subscribeReactInternals: disabledSubscriber,
        updateTTL: () => {
        },
        waitForComplete: () => Promise.resolve(),
        waitForNonEmpty: () => Promise.resolve(),
        complete: false,
        nonEmpty: false
      };
    }
    const hash2 = query.hash() + zero2.clientID;
    let existing = _class_private_field_get$1(this, _views).get(hash2);
    if (!existing) {
      existing = new ViewWrapper(zero2, query, format, ttl, (view) => {
        const currentView = _class_private_field_get$1(this, _views).get(hash2);
        if (currentView && currentView !== view) {
          return;
        }
        _class_private_field_get$1(this, _views).delete(hash2);
      });
      _class_private_field_get$1(this, _views).set(hash2, existing);
    } else {
      existing.updateTTL(ttl);
    }
    return existing;
  }
  constructor() {
    _class_private_field_init$1(this, _views, {
      writable: true,
      value: /* @__PURE__ */ new Map()
    });
  }
});
var viewStore = new ViewStore();
var ViewWrapper = (_zero = /* @__PURE__ */ new WeakMap(), _view = /* @__PURE__ */ new WeakMap(), _onDematerialized = /* @__PURE__ */ new WeakMap(), _query = /* @__PURE__ */ new WeakMap(), _format = /* @__PURE__ */ new WeakMap(), _snapshot = /* @__PURE__ */ new WeakMap(), _reactInternals = /* @__PURE__ */ new WeakMap(), _ttl = /* @__PURE__ */ new WeakMap(), _complete = /* @__PURE__ */ new WeakMap(), _completeResolver = /* @__PURE__ */ new WeakMap(), _nonEmpty = /* @__PURE__ */ new WeakMap(), _nonEmptyResolver = /* @__PURE__ */ new WeakMap(), _onData = /* @__PURE__ */ new WeakMap(), _refetch = /* @__PURE__ */ new WeakMap(), _materializeIfNeeded = /* @__PURE__ */ new WeakMap(), class {
  updateTTL(ttl) {
    _class_private_field_set$1(this, _ttl, ttl);
    _class_private_field_get$1(this, _view)?.updateTTL(ttl);
  }
  get complete() {
    return _class_private_field_get$1(this, _complete);
  }
  waitForComplete() {
    return _class_private_field_get$1(this, _completeResolver).promise;
  }
  get nonEmpty() {
    return _class_private_field_get$1(this, _nonEmpty);
  }
  waitForNonEmpty() {
    return _class_private_field_get$1(this, _nonEmptyResolver).promise;
  }
  constructor(zero2, query, format, ttl, onDematerialized) {
    _class_private_field_init$1(this, _zero, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$1(this, _view, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$1(this, _onDematerialized, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$1(this, _query, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$1(this, _format, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$1(this, _snapshot, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$1(this, _reactInternals, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$1(this, _ttl, {
      writable: true,
      value: void 0
    });
    _class_private_field_init$1(this, _complete, {
      writable: true,
      value: false
    });
    _class_private_field_init$1(this, _completeResolver, {
      writable: true,
      value: resolver()
    });
    _class_private_field_init$1(this, _nonEmpty, {
      writable: true,
      value: false
    });
    _class_private_field_init$1(this, _nonEmptyResolver, {
      writable: true,
      value: resolver()
    });
    _class_private_field_init$1(this, _onData, {
      writable: true,
      value: (snap, resultType, error) => {
        const data = snap === void 0 ? snap : deepClone(snap);
        _class_private_field_set$1(this, _snapshot, getSnapshot(_class_private_field_get$1(this, _format).singular, data, resultType, _class_private_field_get$1(this, _refetch), error));
        if (resultType === "complete" || resultType === "error") {
          _class_private_field_set$1(this, _complete, true);
          _class_private_field_get$1(this, _completeResolver).resolve();
          _class_private_field_set$1(this, _nonEmpty, true);
          _class_private_field_get$1(this, _nonEmptyResolver).resolve();
        }
        if (_class_private_field_get$1(this, _format).singular ? _class_private_field_get$1(this, _snapshot)[0] !== void 0 : _class_private_field_get$1(this, _snapshot)[0].length !== 0) {
          _class_private_field_set$1(this, _nonEmpty, true);
          _class_private_field_get$1(this, _nonEmptyResolver).resolve();
        }
        for (const internals of _class_private_field_get$1(this, _reactInternals)) {
          internals();
        }
      }
    });
    _class_private_field_init$1(this, _refetch, {
      writable: true,
      value: () => {
        _class_private_field_get$1(this, _view)?.destroy();
        _class_private_field_set$1(this, _view, void 0);
        _class_private_field_get$1(this, _materializeIfNeeded).call(this);
      }
    });
    _class_private_field_init$1(this, _materializeIfNeeded, {
      writable: true,
      value: () => {
        if (_class_private_field_get$1(this, _view)) {
          return;
        }
        _class_private_field_set$1(this, _view, _class_private_field_get$1(this, _zero).materialize(_class_private_field_get$1(this, _query), {
          ttl: _class_private_field_get$1(this, _ttl)
        }));
        _class_private_field_get$1(this, _view).addListener(_class_private_field_get$1(this, _onData));
      }
    });
    _define_property(this, "getSnapshot", () => _class_private_field_get$1(this, _snapshot));
    _define_property(this, "subscribeReactInternals", (internals) => {
      _class_private_field_get$1(this, _reactInternals).add(internals);
      _class_private_field_get$1(this, _materializeIfNeeded).call(this);
      return () => {
        _class_private_field_get$1(this, _reactInternals).delete(internals);
        if (_class_private_field_get$1(this, _reactInternals).size === 0) {
          setTimeout(() => {
            if (_class_private_field_get$1(this, _view) === void 0) {
              return;
            }
            if (_class_private_field_get$1(this, _reactInternals).size > 0) {
              return;
            }
            _class_private_field_get$1(this, _view).destroy();
            _class_private_field_set$1(this, _view, void 0);
            _class_private_field_set$1(this, _complete, false);
            _class_private_field_set$1(this, _completeResolver, resolver());
            _class_private_field_set$1(this, _nonEmpty, false);
            _class_private_field_set$1(this, _nonEmptyResolver, resolver());
            _class_private_field_get$1(this, _onDematerialized).call(this, this);
          }, 10);
        }
      };
    });
    _class_private_field_set$1(this, _zero, zero2);
    _class_private_field_set$1(this, _query, query);
    _class_private_field_set$1(this, _format, format);
    _class_private_field_set$1(this, _ttl, ttl);
    _class_private_field_set$1(this, _onDematerialized, onDematerialized);
    _class_private_field_set$1(this, _snapshot, getDefaultSnapshot(format.singular));
    _class_private_field_set$1(this, _reactInternals, /* @__PURE__ */ new Set());
    _class_private_field_get$1(this, _materializeIfNeeded).call(this);
  }
});
const startTransition = (callback) => {
  reactExports.startTransition(callback);
};
if (typeof globalThis["__DEV__"] === "undefined") {
  globalThis["__DEV__"] = false;
}
const ZIndexStackContext = reactExports.createContext(1), ZIndexHardcodedContext = reactExports.createContext(void 0);
const ZIndicesByContext = {}, CurrentPortalZIndices = {}, useStackedZIndex = (props) => {
  if (process.env.TAMAGUI_STACK_Z_INDEX_GLOBAL) {
    const { stackZIndex, zIndex: zIndexProp } = props, id = reactExports.useId(), zIndex = reactExports.useMemo(() => {
      if (stackZIndex && stackZIndex !== "global" && zIndexProp === void 0) {
        const highest = Object.values(CurrentPortalZIndices).reduce((acc, cur) => Math.max(acc, cur), 0);
        return Math.max(stackZIndex === true ? 1 : stackZIndex, highest + 1);
      }
      return zIndexProp ?? 1e3;
    }, [
      stackZIndex
    ]);
    return reactExports.useEffect(() => {
      if (typeof stackZIndex == "number") return CurrentPortalZIndices[id] = stackZIndex, () => {
        delete CurrentPortalZIndices[id];
      };
    }, [
      stackZIndex
    ]), zIndex;
  } else {
    var _ZIndicesByContext, _stackLayer;
    const { stackZIndex, zIndex: zIndexProp } = props, id = reactExports.useId(), stackingContextLevel = reactExports.useContext(ZIndexStackContext), stackLayer = stackZIndex === "global" ? 0 : stackingContextLevel, hardcoded = reactExports.useContext(ZIndexHardcodedContext);
    (_ZIndicesByContext = ZIndicesByContext)[_stackLayer = stackLayer] || (_ZIndicesByContext[_stackLayer] = {});
    const stackContext = ZIndicesByContext[stackLayer], zIndex = reactExports.useMemo(() => {
      if (typeof zIndexProp == "number") return zIndexProp;
      if (stackZIndex) {
        if (hardcoded) return hardcoded + 1;
        const highest = Object.values(stackContext).reduce((acc, cur) => Math.max(acc, cur), 0), found = stackLayer * 5e3 + highest + 1;
        return typeof stackZIndex == "number" ? stackZIndex + found : found;
      }
      return 1;
    }, [
      stackLayer,
      zIndexProp,
      stackZIndex
    ]);
    return reactExports.useEffect(() => {
      if (stackZIndex) return stackContext[id] = zIndex, () => {
        delete stackContext[id];
      };
    }, [
      zIndex
    ]), zIndex;
  }
};
const getStackedZIndexProps = (propsIn) => ({
  stackZIndex: propsIn.stackZIndex,
  zIndex: resolveViewZIndex(propsIn.zIndex)
}), resolveViewZIndex = (zIndex) => typeof zIndex > "u" || zIndex === "unset" ? void 0 : typeof zIndex == "number" ? zIndex : getTokenValue(zIndex, "zIndex");
reactExports.memo((propsIn) => {
  if (isServer) return null;
  const body = globalThis.document?.body;
  if (!body) return propsIn.children;
  const { children, passThrough } = propsIn, zIndex = useStackedZIndex(getStackedZIndexProps(propsIn));
  return passThrough ? children : reactDomExports.createPortal(/* @__PURE__ */ jsxRuntimeExports.jsx("span", {
    style: {
      zIndex,
      position: "fixed",
      inset: 0,
      contain: "strict",
      pointerEvents: "none"
    },
    children
  }), body);
});
const IS_FABRIC = typeof global < "u" && !!(global._IS_FABRIC ?? global.nativeFabricUIManager);
process.env.TAMAGUI_USE_NATIVE_PORTAL && process.env.TAMAGUI_USE_NATIVE_PORTAL !== "false" ? true : !IS_FABRIC;
const allPortalHosts = /* @__PURE__ */ new Map(), portalListeners = {};
const INITIAL_STATE = {};
const registerHost = (state, hostName) => (hostName in state || (state[hostName] = []), state), deregisterHost = (state, hostName) => (delete state[hostName], state), addUpdatePortal = (state, hostName, portalName, node) => {
  hostName in state || (state = registerHost(state, hostName));
  const index = state[hostName].findIndex((item) => item.name === portalName);
  return index !== -1 ? state[hostName][index].node = node : state[hostName].push({
    name: portalName,
    node
  }), state;
}, removePortal = (state, hostName, portalName) => {
  if (!(hostName in state)) return console.info(`Failed to remove portal '${portalName}', '${hostName}' was not registered!`), state;
  const index = state[hostName].findIndex((item) => item.name === portalName);
  return index !== -1 && state[hostName].splice(index, 1), state;
}, reducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case 0:
      return registerHost({
        ...state
      }, action.hostName);
    case 1:
      return deregisterHost({
        ...state
      }, action.hostName);
    case 2:
      return addUpdatePortal({
        ...state
      }, action.hostName, action.portalName, action.node);
    case 3:
      return removePortal({
        ...state
      }, action.hostName, action.portalName);
    default:
      return state;
  }
}, PortalStateContext = reactExports.createContext(null), PortalDispatchContext = reactExports.createContext(null), PortalProviderComponent = ({ rootHostName = "root", shouldAddRootHost = true, children }) => {
  const [state, dispatch] = reactExports.useReducer(reducer, INITIAL_STATE), transitionDispatch = reactExports.useMemo(() => (value) => {
    startTransition(() => {
      dispatch(value);
    });
  }, [
    dispatch
  ]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalDispatchContext.Provider, {
    value: transitionDispatch,
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PortalStateContext.Provider, {
      value: state,
      children: [
        children,
        shouldAddRootHost && /* @__PURE__ */ jsxRuntimeExports.jsx(PortalHost, {
          name: rootHostName
        })
      ]
    })
  });
}, PortalProvider = reactExports.memo(PortalProviderComponent);
PortalProvider.displayName = "PortalProvider";
const PortalHost = reactExports.memo(function(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalHostWeb, {
    ...props
  });
});
function PortalHostWeb(props) {
  return useIsomorphicLayoutEffect(() => () => {
    allPortalHosts.delete(props.name);
  }, [
    props.name
  ]), /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    style: {
      display: "contents"
    },
    ref: (node) => {
      node && (allPortalHosts.set(props.name, node), portalListeners[props.name]?.forEach((x) => x(node)));
    }
  });
}
function _check_private_redeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}
function _class_apply_descriptor_get(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}
function _class_apply_descriptor_set(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }
    descriptor.value = value;
  }
}
function _class_extract_field_descriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }
  return privateMap.get(receiver);
}
function _class_private_field_get(receiver, privateMap) {
  var descriptor = _class_extract_field_descriptor(receiver, privateMap, "get");
  return _class_apply_descriptor_get(receiver, descriptor);
}
function _class_private_field_init(obj, privateMap, value) {
  _check_private_redeclaration(obj, privateMap);
  privateMap.set(obj, value);
}
function _class_private_field_set(receiver, privateMap, value) {
  var descriptor = _class_extract_field_descriptor(receiver, privateMap, "set");
  _class_apply_descriptor_set(receiver, descriptor, value);
  return value;
}
var _anchor, _path;
function relationships(table2, cb) {
  const relationships2 = cb({
    many,
    one
  });
  return {
    name: table2.schema.name,
    relationships: relationships2
  };
}
function many(...args) {
  return args.map((arg) => ({
    sourceField: arg.sourceField,
    destField: arg.destField,
    destSchema: arg.destSchema.schema.name,
    cardinality: "many"
  }));
}
function one(...args) {
  return args.map((arg) => ({
    sourceField: arg.sourceField,
    destField: arg.destField,
    destSchema: arg.destSchema.schema.name,
    cardinality: "one"
  }));
}
var StaticQuery = class _StaticQuery extends AbstractQuery {
  expressionBuilder() {
    return new ExpressionBuilder(this._exists);
  }
  [newQuerySymbol](_delegate3, schema2, tableName, ast, format, customQueryID, currentJunction) {
    return new _StaticQuery(schema2, tableName, ast, format, "permissions", customQueryID, currentJunction);
  }
  get ast() {
    return this._completeAst();
  }
  materialize() {
    throw new Error("StaticQuery cannot be materialized");
  }
  run() {
    return Promise.reject(new Error("StaticQuery cannot be run"));
  }
  preload() {
    throw new Error("StaticQuery cannot be preloaded");
  }
  constructor(schema2, tableName, ast, format, system = "permissions", customQueryID, currentJunction) {
    super(void 0, schema2, tableName, ast, format, system, customQueryID, currentJunction);
  }
};
var ANYONE_CAN = [
  (_, eb) => eb.and()
];
async function definePermissions(schema2, definer) {
  const expressionBuilders = {};
  for (const name of Object.keys(schema2.tables)) {
    expressionBuilders[name] = new StaticQuery(schema2, name, {
      table: name
    }, defaultFormat).expressionBuilder();
  }
  const config = await definer();
  return compilePermissions(schema2, config, expressionBuilders);
}
function compilePermissions(schema2, authz, expressionBuilders) {
  if (!authz) {
    return void 0;
  }
  const nameMapper = clientToServer(schema2.tables);
  const ret = {
    tables: {}
  };
  for (const [tableName, tableConfig] of Object.entries(authz)) {
    const serverName = schema2.tables[tableName].serverName ?? tableName;
    ret.tables[serverName] = {
      row: compileRowConfig(nameMapper, tableName, tableConfig.row, expressionBuilders[tableName]),
      cell: compileCellConfig(nameMapper, tableName, tableConfig.cell, expressionBuilders[tableName])
    };
  }
  return ret;
}
function compileRowConfig(clientToServer2, tableName, rowRules, expressionBuilder) {
  if (!rowRules) {
    return void 0;
  }
  return {
    select: compileRules(clientToServer2, tableName, rowRules.select, expressionBuilder),
    insert: compileRules(clientToServer2, tableName, rowRules.insert, expressionBuilder),
    update: {
      preMutation: compileRules(clientToServer2, tableName, rowRules.update?.preMutation, expressionBuilder),
      postMutation: compileRules(clientToServer2, tableName, rowRules.update?.postMutation, expressionBuilder)
    },
    delete: compileRules(clientToServer2, tableName, rowRules.delete, expressionBuilder)
  };
}
function compileRules(clientToServer2, tableName, rules, expressionBuilder) {
  if (!rules) {
    return void 0;
  }
  return rules.map((rule) => {
    const cond = rule(authDataRef, expressionBuilder);
    return [
      "allow",
      mapCondition(cond, tableName, clientToServer2)
    ];
  });
}
function compileCellConfig(clientToServer2, tableName, cellRules, expressionBuilder) {
  if (!cellRules) {
    return void 0;
  }
  const ret = {};
  for (const [columnName, rules] of Object.entries(cellRules)) {
    ret[columnName] = {
      select: compileRules(clientToServer2, tableName, rules.select, expressionBuilder),
      insert: compileRules(clientToServer2, tableName, rules.insert, expressionBuilder),
      update: {
        preMutation: compileRules(clientToServer2, tableName, rules.update?.preMutation, expressionBuilder),
        postMutation: compileRules(clientToServer2, tableName, rules.update?.postMutation, expressionBuilder)
      },
      delete: compileRules(clientToServer2, tableName, rules.delete, expressionBuilder)
    };
  }
  return ret;
}
var CallTracker = (_anchor = /* @__PURE__ */ new WeakMap(), _path = /* @__PURE__ */ new WeakMap(), class _CallTracker {
  get(target, prop) {
    if (prop === toStaticParam) {
      return target[toStaticParam];
    }
    assert(typeof prop === "string");
    const path = [
      ..._class_private_field_get(this, _path),
      prop
    ];
    return new Proxy({
      [toStaticParam]: () => staticParam(_class_private_field_get(this, _anchor), path)
    }, new _CallTracker(_class_private_field_get(this, _anchor), path));
  }
  constructor(anchor, path) {
    _class_private_field_init(this, _anchor, {
      writable: true,
      value: void 0
    });
    _class_private_field_init(this, _path, {
      writable: true,
      value: void 0
    });
    _class_private_field_set(this, _anchor, anchor);
    _class_private_field_set(this, _path, path);
  }
});
function baseTracker(anchor) {
  return new Proxy({
    [toStaticParam]: () => {
      throw new Error("no JWT field specified");
    }
  }, new CallTracker(anchor, []));
}
var authDataRef = baseTracker("authData");
baseTracker("preMutationRow");
function staticParam(anchorClass, field) {
  return {
    type: "static",
    anchor: anchorClass,
    // for backwards compatibility
    field: field.length === 1 ? field[0] : field
  };
}
const user = table("user").columns({
  id: string2(),
  username: string2(),
  email: string2(),
  name: string2(),
  image: string2(),
  state: json(),
  updatedAt: number2(),
  createdAt: number2()
}).primaryKey("id");
const message = table("message").columns({
  id: string2(),
  senderId: string2().optional(),
  content: string2(),
  createdAt: number2(),
  updatedAt: number2().optional()
}).primaryKey("id");
const messageRelationships = relationships(message, ({ one: one2 }) => ({
  sender: one2({
    sourceField: [
      "senderId"
    ],
    destField: [
      "id"
    ],
    destSchema: user
  })
}));
const schema = createSchema({
  tables: [
    user,
    message
  ],
  relationships: [
    messageRelationships
  ]
});
definePermissions(schema, () => {
  const allowIfLoggedIn = (authData, { cmpLit }) => cmpLit(authData.sub, "IS NOT", null);
  const allowIfIsMessageSender = (authData, { cmp: cmp2 }) => cmp2("senderId", "=", authData.sub ?? "");
  const allowIfMessageSenderIsSelf = (authData, { or: or2, cmp: cmp2 }) => or2(cmp2("senderId", "IS", null), cmp2("senderId", "=", authData.sub ?? ""));
  return {
    user: {
      row: {
        select: ANYONE_CAN
      }
    },
    message: {
      row: {
        // anyone can insert, but the senderId of the message must match the current user
        insert: [
          allowIfMessageSenderIsSelf
        ],
        update: {
          // sender can only edit own messages
          preMutation: [
            allowIfIsMessageSender
          ],
          // sender can only edit messages to be owned by themselves
          postMutation: [
            allowIfIsMessageSender
          ]
        },
        // must be logged in to delete
        delete: [
          allowIfLoggedIn
        ],
        // everyone can read current messages
        select: ANYONE_CAN
      }
    }
  };
});
let zero = createZero();
const zeroEmitter = createEmitter();
const useZeroEmit = zeroEmitter.use;
function createZero({ auth, userID = "anon" } = {}) {
  return new Zero({
    userID,
    auth,
    server: "http://localhost:4848",
    schema,
    kvStore: "mem"
  });
}
function setZeroAuth({ jwtToken, userID }) {
  zero = createZero({
    auth: jwtToken,
    userID
  });
  zeroEmitter.emit(zero);
}
function useQuery(createQuery, enable) {
  const z = useZero();
  z.query;
  return useQuery$1(createQuery(z.query));
}
const isTauri = typeof window !== "undefined" && window["__TAURI__"] !== void 0;
export {
  Client as C,
  ENTITIES_KEY_PREFIX as E,
  Latest as L,
  PortalProvider as P,
  SUBQ_PREFIX as S,
  TDigest as T,
  ZIndexStackContext as Z,
  inspectQueriesDownSchema as a,
  assert as b,
  inspectAnalyzeQueryDownSchema as c,
  nanoid as d,
  inspectAuthenticatedDownSchema as e,
  must as f,
  inspectMetricsDownSchema as g,
  getClients as h,
  inspectVersionDownSchema as i,
  getClient as j,
  getClientGroup as k,
  useQuery as l,
  mapValues as m,
  normalizeTTL as n,
  isTauri as o,
  useZeroEmit as p,
  ZeroProvider as q,
  readFromHash as r,
  setZeroAuth as s,
  test as t,
  unreachable as u,
  withRead as w,
  zero as z
};
