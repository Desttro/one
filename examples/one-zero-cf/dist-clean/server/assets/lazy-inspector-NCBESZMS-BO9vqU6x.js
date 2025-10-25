import { i as inspectVersionDownSchema, w as withRead, a as inspectQueriesDownSchema, b as assert, c as inspectAnalyzeQueryDownSchema, n as normalizeTTL, m as mapValues, T as TDigest, d as nanoid, t as test, e as inspectAuthenticatedDownSchema, u as unreachable, f as must, S as SUBQ_PREFIX, g as inspectMetricsDownSchema, E as ENTITIES_KEY_PREFIX, h as getClients, C as Client, j as getClient, k as getClientGroup, r as readFromHash, L as Latest } from "./constants-PMqLTXbb.js";
import "./authClient-DTdP_buj.js";
import "../_virtual_one-entry.js";
import "node:async_hooks";
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
var _socket, _serverAST;
function canUseHTMLDialog() {
  try {
    if (typeof globalThis !== "undefined" && "__vitest_worker__" in globalThis) {
      return false;
    }
    return typeof document !== "undefined" && typeof document.createElement === "function" && typeof HTMLDialogElement !== "undefined" && document.body !== null && // Make sure we can actually create a dialog element
    document.createElement("dialog") instanceof HTMLDialogElement;
  } catch {
    return false;
  }
}
function createHTMLPasswordPrompt(message) {
  if (!canUseHTMLDialog()) {
    return Promise.resolve(prompt(message));
  }
  return new Promise((resolve) => {
    const reset = "all:revert;";
    const w = "rgba(255,255,255,";
    const white = w + "1)";
    const whiteTransp = w + "0.4)";
    const r1 = "0.25rem";
    const font = `font-family:system-ui,sans-serif;color:${white};`;
    const btnBase = `${reset}${font}cursor:pointer;font-size:1rem;font-weight:500;border:none;padding:0.4rem 0.75rem;border-radius:${r1};background:`;
    const dialog = document.createElement("dialog");
    dialog.style.cssText = `${reset}${font}background:rgba(0,0,0,0.95);padding:2rem;border:1px solid ${whiteTransp};border-radius:0.5rem;`;
    dialog.addEventListener("keydown", (e) => {
      e.stopPropagation();
    });
    dialog.oncancel = () => {
      dialog.remove();
      resolve(null);
    };
    const form = document.createElement("form");
    form.method = "dialog";
    form.style.cssText = `${reset}margin:0;`;
    const messagePara = document.createElement("p");
    messagePara.style.cssText = `${reset}${font}font-size:1.5rem;margin:0 0 1rem 0;`;
    messagePara.append(message);
    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.placeholder = "Admin password";
    passwordInput.autocomplete = "current-password";
    passwordInput.autofocus = true;
    passwordInput.style.cssText = `${reset}${font}font-size:1rem;display:block;margin:0 0 1rem 0;padding:0.5rem;background:rgba(0,0,0,0.5);border:1px solid ${whiteTransp};border-radius:${r1};`;
    const buttonDiv = document.createElement("div");
    buttonDiv.style.cssText = reset;
    const cancelBtn = document.createElement("button");
    cancelBtn.type = "reset";
    cancelBtn.append("Cancel");
    cancelBtn.style.cssText = btnBase + w + "0.25);";
    const okBtn = document.createElement("button");
    okBtn.type = "submit";
    okBtn.value = "ok";
    okBtn.append("OK");
    okBtn.style.cssText = btnBase + "rgba(19,106,235,1);margin-right:0.5rem;";
    buttonDiv.append(okBtn, cancelBtn);
    form.append(messagePara, passwordInput, buttonDiv);
    dialog.append(form);
    form.onreset = () => {
      dialog.close();
    };
    dialog.onclose = () => {
      if (dialog.returnValue === "ok") {
        resolve(passwordInput.value || null);
      } else {
        resolve(null);
      }
      dialog.remove();
    };
    document.body.append(dialog);
    dialog.showModal();
  });
}
function astToZQL(ast) {
  let code = "";
  if (ast.where) {
    code += transformCondition(ast.where, ".where", /* @__PURE__ */ new Set());
  }
  if (ast.related && ast.related.length > 0) {
    for (const related of ast.related) {
      if (related.hidden) {
        const nestedRelated = related.subquery.related?.[0];
        if (nestedRelated) {
          code += transformRelated(nestedRelated);
        }
      } else {
        code += transformRelated(related);
      }
    }
  }
  if (ast.orderBy && ast.orderBy.length > 0) {
    code += transformOrder(ast.orderBy);
  }
  if (ast.limit !== void 0) {
    code += `.limit(${ast.limit})`;
  }
  if (ast.start) {
    const { row, exclusive } = ast.start;
    code += `.start(${JSON.stringify(row)}${exclusive ? "" : ", { inclusive: true }"})`;
  }
  return code;
}
function transformCondition(condition, prefix, args) {
  switch (condition.type) {
    case "simple":
      return transformSimpleCondition(condition, prefix);
    case "and":
    case "or":
      return transformLogicalCondition(condition, prefix, args);
    case "correlatedSubquery":
      return transformExistsCondition(condition, prefix, args);
    default:
      unreachable();
  }
}
function transformSimpleCondition(condition, prefix) {
  const { left, op, right } = condition;
  const leftCode = transformValuePosition(left);
  const rightCode = transformValuePosition(right);
  if (op === "=") {
    return `${prefix}(${leftCode}, ${rightCode})`;
  }
  return `${prefix}(${leftCode}, '${op}', ${rightCode})`;
}
function transformLogicalCondition(condition, prefix, args) {
  const { type, conditions } = condition;
  if (conditions.length === 1) {
    return transformCondition(conditions[0], prefix, args);
  }
  if (type === "and") {
    const parts = conditions.map((c) => transformCondition(c, prefix, args));
    if (prefix === ".where") {
      return parts.join("");
    }
    args.add("and");
    return "and(" + parts.join(", ") + ")";
  }
  args = /* @__PURE__ */ new Set();
  const conditionsCode = conditions.map((c) => transformCondition(c, "cmp", args)).join(", ");
  args.add("cmp");
  args.add(type);
  const argsCode = [
    ...args
  ].sort().join(", ");
  return `.where(({${argsCode}}) => ${type}(${conditionsCode}))`;
}
function transformExistsCondition(condition, prefix, args) {
  const { related, op } = condition;
  const relationship = extractRelationshipName(related);
  const nextSubquery = getNextExistsSubquery(related);
  const hasSubQueryProps = nextSubquery.where || nextSubquery.related && nextSubquery.related.length > 0 || nextSubquery.orderBy || nextSubquery.limit;
  if (op === "EXISTS") {
    const flipped = condition.flip ? ", {flip: true}" : "";
    if (!hasSubQueryProps) {
      if (prefix === ".where") {
        return `.whereExists('${relationship}'${flipped})`;
      }
      args.add("exists");
      return `exists('${relationship}'${flipped})`;
    }
    if (prefix === ".where") {
      return `.whereExists('${relationship}', q => q${astToZQL(nextSubquery)}${flipped})`;
    }
    args.add("exists");
    return `exists('${relationship}', q => q${astToZQL(nextSubquery)}${flipped})`;
  }
  if (hasSubQueryProps) {
    if (prefix === ".where") {
      return `.where(({exists, not}) => not(exists('${relationship}', q => q${astToZQL(nextSubquery)})))`;
    }
    args.add("not");
    args.add("exists");
    return `not(exists('${relationship}', q => q${astToZQL(nextSubquery)}))`;
  }
  if (prefix === ".where") {
    return `.where(({exists, not}) => not(exists('${relationship}')))`;
  }
  args.add("not");
  args.add("exists");
  return `not(exists('${relationship}')))`;
}
function getNextExistsSubquery(related) {
  if (related.subquery.where?.type === "correlatedSubquery" && related.subquery.where.related.subquery.alias?.includes(SUBQ_PREFIX + "zhidden_")) {
    return getNextExistsSubquery(related.subquery.where.related);
  }
  return related.subquery;
}
function extractRelationshipName(related) {
  const alias = must(related.subquery.alias);
  return alias.startsWith(SUBQ_PREFIX) ? alias.substring(SUBQ_PREFIX.length) : alias;
}
function transformRelated(related) {
  const { alias } = related.subquery;
  if (!alias) return "";
  const relationship = alias;
  let code = `.related('${relationship}'`;
  if (related.subquery.where || related.subquery.related && related.subquery.related.length > 0 || related.subquery.orderBy || related.subquery.limit) {
    code += ", q => q" + astToZQL(related.subquery);
  }
  code += ")";
  return code;
}
function transformOrder(orderBy) {
  let code = "";
  for (const [field, direction] of orderBy) {
    code += `.orderBy('${field}', '${direction}')`;
  }
  return code;
}
function transformValuePosition(value) {
  switch (value.type) {
    case "literal":
      return transformLiteral(value);
    case "column":
      return `'${value.name}'`;
    case "static":
      return transformParameter(value);
    default:
      unreachable();
  }
}
function transformLiteral(literal) {
  if (literal.value === null) {
    return "null";
  }
  if (Array.isArray(literal.value)) {
    return JSON.stringify(literal.value);
  }
  if (typeof literal.value === "string") {
    return `'${literal.value.replace(/'/g, "\\'")}'`;
  }
  return String(literal.value);
}
function transformParameter(param) {
  const fieldStr = Array.isArray(param.field) ? `[${param.field.map((f) => `'${f}'`).join(", ")}]` : `'${param.field}'`;
  return `authParam(${fieldStr})`;
}
var Query = (_socket = /* @__PURE__ */ new WeakMap(), _serverAST = /* @__PURE__ */ new WeakMap(), class {
  async analyze(options) {
    assert(_class_private_field_get(this, _serverAST), "No server AST available for this query");
    return rpc(await _class_private_field_get(this, _socket).call(this), {
      op: "analyze-query",
      value: _class_private_field_get(this, _serverAST),
      options
    }, inspectAnalyzeQueryDownSchema);
  }
  constructor(row, delegate, socket) {
    _class_private_field_init(this, _socket, {
      writable: true,
      value: void 0
    });
    _define_property(this, "name", void 0);
    _define_property(this, "args", void 0);
    _define_property(this, "got", void 0);
    _define_property(this, "ttl", void 0);
    _define_property(this, "inactivatedAt", void 0);
    _define_property(this, "rowCount", void 0);
    _define_property(this, "deleted", void 0);
    _define_property(this, "id", void 0);
    _define_property(this, "clientID", void 0);
    _define_property(this, "metrics", void 0);
    _define_property(this, "clientZQL", void 0);
    _define_property(this, "serverZQL", void 0);
    _class_private_field_init(this, _serverAST, {
      writable: true,
      value: void 0
    });
    _define_property(this, "hydrateClient", void 0);
    _define_property(this, "hydrateServer", void 0);
    _define_property(this, "hydrateTotal", void 0);
    _define_property(this, "updateClientP50", void 0);
    _define_property(this, "updateClientP95", void 0);
    _define_property(this, "updateServerP50", void 0);
    _define_property(this, "updateServerP95", void 0);
    _class_private_field_set(this, _socket, socket);
    const { ast, queryID, inactivatedAt } = row;
    this.clientID = row.clientID;
    this.id = queryID;
    this.inactivatedAt = inactivatedAt === null ? null : new Date(inactivatedAt);
    this.ttl = normalizeTTL(row.ttl);
    this.name = row.name;
    this.args = row.args;
    this.got = row.got;
    this.rowCount = row.rowCount;
    this.deleted = row.deleted;
    _class_private_field_set(this, _serverAST, ast);
    this.serverZQL = ast ? ast.table + astToZQL(ast) : null;
    const clientAST = delegate.getAST(queryID);
    this.clientZQL = clientAST ? clientAST.table + astToZQL(clientAST) : null;
    const clientMetrics = delegate.getQueryMetrics(queryID);
    const serverMetrics = row.metrics;
    const merged = mergeMetrics(clientMetrics, serverMetrics);
    this.metrics = merged;
    const percentile = (name, percentile2) => {
      if (!merged?.[name]) {
        return null;
      }
      const n = merged[name].quantile(percentile2);
      return Number.isNaN(n) ? null : n;
    };
    this.hydrateClient = percentile("query-materialization-client", 0.5);
    this.hydrateServer = percentile("query-materialization-server", 0.5);
    this.hydrateTotal = percentile("query-materialization-end-to-end", 0.5);
    this.updateClientP50 = percentile("query-update-client", 0.5);
    this.updateClientP95 = percentile("query-update-client", 0.95);
    this.updateServerP50 = percentile("query-update-server", 0.5);
    this.updateServerP95 = percentile("query-update-server", 0.95);
  }
});
async function rpc(socket, arg, downSchema) {
  try {
    return await rpcNoAuthTry(socket, arg, downSchema);
  } catch (e) {
    if (e instanceof UnauthenticatedError) {
      const password = await createHTMLPasswordPrompt("Enter password:");
      if (password) {
        const authRes = await rpcNoAuthTry(socket, {
          op: "authenticate",
          value: password
        }, inspectAuthenticatedDownSchema);
        if (authRes) {
          return rpcNoAuthTry(socket, arg, downSchema);
        }
      }
      throw new Error("Authentication failed");
    }
    throw e;
  }
}
function rpcNoAuthTry(socket, arg, downSchema) {
  return new Promise((resolve, reject) => {
    const id = nanoid();
    const f = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg[0] === "inspect") {
        const body = msg[1];
        if (body.id !== id) {
          return;
        }
        const res = test(body, downSchema);
        if (res.ok) {
          if (res.value.op === "error") {
            reject(new Error(res.value.value));
          } else {
            resolve(res.value.value);
          }
        } else {
          const authRes = test(body, inspectAuthenticatedDownSchema);
          if (authRes.ok) {
            assert(authRes.value.value === false, "Expected unauthenticated response");
            reject(new UnauthenticatedError());
          }
          reject(res.error);
        }
        socket.removeEventListener("message", f);
      }
    };
    socket.addEventListener("message", f);
    socket.send(JSON.stringify([
      "inspect",
      {
        ...arg,
        id
      }
    ]));
  });
}
function mergeMetrics(clientMetrics, serverMetrics) {
  return {
    ...clientMetrics ?? newClientMetrics(),
    ...serverMetrics ? convertServerMetrics(serverMetrics) : newServerMetrics()
  };
}
function newClientMetrics() {
  return {
    "query-materialization-client": new TDigest(),
    "query-materialization-end-to-end": new TDigest(),
    "query-update-client": new TDigest()
  };
}
function newServerMetrics() {
  return {
    "query-materialization-server": new TDigest(),
    "query-update-server": new TDigest()
  };
}
function convertServerMetrics(metrics) {
  return mapValues(metrics, (v) => TDigest.fromJSON(v));
}
async function inspectorMetrics(delegate) {
  const clientMetrics = delegate.metrics;
  const serverMetricsJSON = await rpc(await delegate.getSocket(), {
    op: "metrics"
  }, inspectMetricsDownSchema);
  return mergeMetrics(clientMetrics, serverMetricsJSON);
}
function inspectorClients(delegate) {
  return withDagRead(delegate, (dagRead) => clients(delegate, dagRead));
}
function inspectorClientsWithQueries(delegate) {
  return withDagRead(delegate, (dagRead) => clientsWithQueries(delegate, dagRead));
}
async function withDagRead(delegate, f) {
  const { rep } = delegate;
  await rep.refresh();
  await rep.persist();
  return withRead(rep.perdag, f);
}
async function getBTree(dagRead, clientID) {
  const client = await getClient(clientID, dagRead);
  assert(client, `Client not found: ${clientID}`);
  const { clientGroupID } = client;
  const clientGroup = await getClientGroup(clientGroupID, dagRead);
  assert(clientGroup, `Client group not found: ${clientGroupID}`);
  const dbRead = await readFromHash(clientGroup.headHash, dagRead, Latest);
  return dbRead.map;
}
async function clients(delegate, dagRead, predicate = () => true) {
  const clients2 = await getClients(dagRead);
  return [
    ...clients2.entries()
  ].filter(predicate).map(([clientID, { clientGroupID }]) => new Client(delegate, clientID, clientGroupID));
}
async function clientsWithQueries(delegate, dagRead, predicate = () => true) {
  const allClients = await clients(delegate, dagRead, predicate);
  const clientsWithQueries2 = [];
  await Promise.all(allClients.map(async (client) => {
    const queries = await client.queries();
    if (queries.length > 0) {
      clientsWithQueries2.push(client);
    }
  }));
  return clientsWithQueries2;
}
async function clientGroupClients(delegate, clientGroupID) {
  const id = await clientGroupID;
  return withDagRead(delegate, (dagRead) => clients(delegate, dagRead, ([_, v]) => v.clientGroupID === id));
}
async function clientGroupClientsWithQueries(delegate, clientGroupID) {
  const id = await clientGroupID;
  return withDagRead(delegate, (dagRead) => clientsWithQueries(delegate, dagRead, ([_, v]) => v.clientGroupID === id));
}
async function clientGroupQueries(delegate) {
  const rows = await rpc(await delegate.getSocket(), {
    op: "queries"
  }, inspectQueriesDownSchema);
  return rows.map((row) => new Query(row, delegate, delegate.getSocket));
}
function clientMap(delegate, clientID) {
  return withDagRead(delegate, async (dagRead) => {
    const tree = await getBTree(dagRead, clientID);
    const map = /* @__PURE__ */ new Map();
    for await (const [key, value] of tree.scan("")) {
      map.set(key, value);
    }
    return map;
  });
}
function clientRows(delegate, clientID, tableName) {
  return withDagRead(delegate, async (dagRead) => {
    const prefix = ENTITIES_KEY_PREFIX + tableName + "/";
    const tree = await getBTree(dagRead, clientID);
    const rows = [];
    for await (const [key, value] of tree.scan(prefix)) {
      if (!key.startsWith(prefix)) {
        break;
      }
      rows.push(value);
    }
    return rows;
  });
}
async function serverVersion(delegate) {
  return rpc(await delegate.getSocket(), {
    op: "version"
  }, inspectVersionDownSchema);
}
async function clientQueries(delegate, clientID) {
  const rows = await rpc(await delegate.getSocket(), {
    op: "queries",
    clientID
  }, inspectQueriesDownSchema);
  return rows.map((row) => new Query(row, delegate, delegate.getSocket));
}
async function analyzeQuery(delegate, query, options) {
  const { customQueryID } = query;
  const queryParameters = customQueryID ? {
    name: customQueryID.name,
    args: customQueryID.args
  } : {
    ast: query.ast
  };
  return rpc(await delegate.getSocket(), {
    op: "analyze-query",
    ...queryParameters,
    options
  }, inspectAnalyzeQueryDownSchema);
}
var UnauthenticatedError = class extends Error {
};
export {
  analyzeQuery,
  clientGroupClients,
  clientGroupClientsWithQueries,
  clientGroupQueries,
  clientMap,
  clientQueries,
  clientRows,
  inspectorClients,
  inspectorClientsWithQueries,
  inspectorMetrics,
  mergeMetrics,
  rpc,
  serverVersion
};
