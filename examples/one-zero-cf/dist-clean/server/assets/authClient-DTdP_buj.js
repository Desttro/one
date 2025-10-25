import { r as reactExports, R as React, j as jsxRuntimeExports, ak as getDefaultExportFromCjs } from "../_virtual_one-entry.js";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
const IS_REACT_19 = !!reactExports.use, isWeb = true, isWindowDefined = typeof window < "u", isServer = !isWindowDefined, isClient = isWindowDefined, useIsomorphicLayoutEffect = isServer ? reactExports.useEffect : reactExports.useLayoutEffect, isAndroid = false, isIos = process.env.TEST_NATIVE_PLATFORM === "ios", currentPlatform = "web";
const cache$5 = /* @__PURE__ */ new Map();
let cacheSize = 0;
const simpleHash = (strIn, hashMin = 10) => {
  if (cache$5.has(strIn)) return cache$5.get(strIn);
  let str = strIn;
  str[0] === "v" && str.startsWith("var(") && (str = str.slice(6, str.length - 1));
  let hash = 0, valids = "", added = 0;
  const len = str.length;
  for (let i = 0; i < len; i++) {
    if (hashMin !== "strict" && added <= hashMin) {
      const char = str.charCodeAt(i);
      if (char === 46) {
        valids += "--";
        continue;
      }
      if (isValidCSSCharCode(char)) {
        added++, valids += str[i];
        continue;
      }
    }
    hash = hashChar(hash, str[i]);
  }
  const res = valids + (hash ? Math.abs(hash) : "");
  return cacheSize > 1e4 && (cache$5.clear(), cacheSize = 0), cache$5.set(strIn, res), cacheSize++, res;
}, hashChar = (hash, c) => Math.imul(31, hash) + c.charCodeAt(0) | 0;
function isValidCSSCharCode(code) {
  return (
    // A-Z
    code >= 65 && code <= 90 || // a-z
    code >= 97 && code <= 122 || // _
    code === 95 || // -
    code === 45 || // 0-9
    code >= 48 && code <= 57
  );
}
function composeEventHandlers(og, next, { checkDefaultPrevented = true } = {}) {
  return !og || !next ? next || og || void 0 : (event) => {
    if (og?.(event), !event || !(checkDefaultPrevented && typeof event == "object" && "defaultPrevented" in event) || // @ts-ignore
    "defaultPrevented" in event && !event.defaultPrevented) return next?.(event);
  };
}
const StyleObjectProperty = 0, StyleObjectIdentifier = 2, StyleObjectPseudo = 3, StyleObjectRules = 4;
const textColors = {
  color: true,
  textDecorationColor: true,
  textShadowColor: true
}, tokenCategories = {
  radius: {
    borderRadius: true,
    borderTopLeftRadius: true,
    borderTopRightRadius: true,
    borderBottomLeftRadius: true,
    borderBottomRightRadius: true,
    // logical
    borderStartStartRadius: true,
    borderStartEndRadius: true,
    borderEndStartRadius: true,
    borderEndEndRadius: true
  },
  size: {
    width: true,
    height: true,
    minWidth: true,
    minHeight: true,
    maxWidth: true,
    maxHeight: true,
    blockSize: true,
    minBlockSize: true,
    maxBlockSize: true,
    inlineSize: true,
    minInlineSize: true,
    maxInlineSize: true
  },
  zIndex: {
    zIndex: true
  },
  color: {
    backgroundColor: true,
    borderColor: true,
    borderBlockStartColor: true,
    borderBlockEndColor: true,
    borderBlockColor: true,
    borderBottomColor: true,
    borderInlineColor: true,
    borderInlineStartColor: true,
    borderInlineEndColor: true,
    borderTopColor: true,
    borderLeftColor: true,
    borderRightColor: true,
    borderEndColor: true,
    borderStartColor: true,
    shadowColor: true,
    ...textColors,
    outlineColor: true,
    caretColor: true
  }
}, stylePropsUnitless = {
  WebkitLineClamp: true,
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexOrder: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  fontWeight: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowGap: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnGap: true,
  gridColumnStart: true,
  gridTemplateColumns: true,
  gridTemplateAreas: true,
  lineClamp: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  scale: true,
  scaleX: true,
  scaleY: true,
  scaleZ: true,
  shadowOpacity: true
}, stylePropsTransform = {
  x: true,
  y: true,
  scale: true,
  perspective: true,
  scaleX: true,
  scaleY: true,
  skewX: true,
  skewY: true,
  matrix: true,
  rotate: true,
  rotateY: true,
  rotateX: true,
  rotateZ: true
}, stylePropsView = {
  backfaceVisibility: true,
  borderBottomEndRadius: true,
  borderBottomStartRadius: true,
  borderBottomWidth: true,
  borderLeftWidth: true,
  borderRightWidth: true,
  borderBlockWidth: true,
  borderBlockEndWidth: true,
  borderBlockStartWidth: true,
  borderInlineWidth: true,
  borderInlineEndWidth: true,
  borderInlineStartWidth: true,
  borderStyle: true,
  borderBlockStyle: true,
  borderBlockEndStyle: true,
  borderBlockStartStyle: true,
  borderInlineStyle: true,
  borderInlineEndStyle: true,
  borderInlineStartStyle: true,
  borderTopEndRadius: true,
  borderTopStartRadius: true,
  borderTopWidth: true,
  borderWidth: true,
  transform: true,
  transformOrigin: true,
  alignContent: true,
  alignItems: true,
  alignSelf: true,
  borderEndWidth: true,
  borderStartWidth: true,
  bottom: true,
  display: true,
  end: true,
  flexBasis: true,
  flexDirection: true,
  flexWrap: true,
  gap: true,
  columnGap: true,
  rowGap: true,
  justifyContent: true,
  left: true,
  margin: true,
  marginBlock: true,
  marginBlockEnd: true,
  marginBlockStart: true,
  marginInline: true,
  marginInlineStart: true,
  marginInlineEnd: true,
  marginBottom: true,
  marginEnd: true,
  marginHorizontal: true,
  marginLeft: true,
  marginRight: true,
  marginStart: true,
  marginTop: true,
  marginVertical: true,
  overflow: true,
  padding: true,
  paddingBottom: true,
  paddingInline: true,
  paddingBlock: true,
  paddingBlockStart: true,
  paddingInlineEnd: true,
  paddingInlineStart: true,
  paddingEnd: true,
  paddingHorizontal: true,
  paddingLeft: true,
  paddingRight: true,
  paddingStart: true,
  paddingTop: true,
  paddingVertical: true,
  position: true,
  right: true,
  start: true,
  top: true,
  inset: true,
  insetBlock: true,
  insetBlockEnd: true,
  insetBlockStart: true,
  insetInline: true,
  insetInlineEnd: true,
  insetInlineStart: true,
  direction: true,
  shadowOffset: true,
  shadowRadius: true,
  ...tokenCategories.color,
  ...tokenCategories.radius,
  ...tokenCategories.size,
  ...tokenCategories.radius,
  ...stylePropsTransform,
  ...stylePropsUnitless,
  boxShadow: true,
  filter: true,
  // RN doesn't support specific border styles per-edge
  transition: true,
  textWrap: true,
  backdropFilter: true,
  WebkitBackdropFilter: true,
  background: true,
  backgroundAttachment: true,
  backgroundBlendMode: true,
  backgroundClip: true,
  backgroundColor: true,
  backgroundImage: true,
  backgroundOrigin: true,
  backgroundPosition: true,
  backgroundRepeat: true,
  backgroundSize: true,
  borderBottomStyle: true,
  borderImage: true,
  borderLeftStyle: true,
  borderRightStyle: true,
  borderTopStyle: true,
  boxSizing: true,
  caretColor: true,
  clipPath: true,
  contain: true,
  containerType: true,
  content: true,
  cursor: true,
  float: true,
  mask: true,
  maskBorder: true,
  maskBorderMode: true,
  maskBorderOutset: true,
  maskBorderRepeat: true,
  maskBorderSlice: true,
  maskBorderSource: true,
  maskBorderWidth: true,
  maskClip: true,
  maskComposite: true,
  maskImage: true,
  maskMode: true,
  maskOrigin: true,
  maskPosition: true,
  maskRepeat: true,
  maskSize: true,
  maskType: true,
  mixBlendMode: true,
  objectFit: true,
  objectPosition: true,
  outlineOffset: true,
  outlineStyle: true,
  outlineWidth: true,
  overflowBlock: true,
  overflowInline: true,
  overflowX: true,
  overflowY: true,
  pointerEvents: true,
  scrollbarWidth: true,
  textEmphasis: true,
  touchAction: true,
  transformStyle: true,
  userSelect: true,
  ...{}
}, stylePropsFont = {
  fontFamily: true,
  fontSize: true,
  fontStyle: true,
  fontWeight: true,
  fontVariant: true,
  letterSpacing: true,
  lineHeight: true,
  textTransform: true
}, stylePropsTextOnly = {
  ...stylePropsFont,
  textAlign: true,
  textDecorationLine: true,
  textDecorationStyle: true,
  ...textColors,
  textShadowOffset: true,
  textShadowRadius: true,
  userSelect: true,
  selectable: true,
  verticalAlign: true,
  whiteSpace: true,
  wordWrap: true,
  textOverflow: true,
  textDecorationDistance: true,
  cursor: true,
  WebkitLineClamp: true,
  WebkitBoxOrient: true
}, stylePropsText = {
  ...stylePropsView,
  ...stylePropsTextOnly
}, stylePropsAll = stylePropsText, validPseudoKeys = {
  enterStyle: true,
  exitStyle: true,
  hoverStyle: true,
  pressStyle: true,
  focusStyle: true,
  disabledStyle: true,
  focusWithinStyle: true,
  focusVisibleStyle: true
}, validStyles = stylePropsView;
const THEME_CLASSNAME_PREFIX = "t_", stackDefaultStyles = {}, webViewFlexCompatStyles = {
  display: "flex",
  alignItems: "stretch",
  flexDirection: "column",
  flexBasis: "auto",
  boxSizing: "border-box",
  position: process.env.TAMAGUI_POSITION_STATIC === "1" ? "static" : "relative",
  minHeight: 0,
  minWidth: 0,
  flexShrink: 0
};
Object.assign(stackDefaultStyles, webViewFlexCompatStyles);
const MISSING_THEME_MESSAGE = "Missing theme.";
let conf$2;
const getSetting = (key) => {
  return conf$2.settings[key] ?? // @ts-expect-error
  conf$2[key];
}, setConfig = (next) => {
  conf$2 = next;
}, getConfig = () => {
  if (!conf$2) throw new Error("Err0");
  return conf$2;
}, getConfigMaybe = () => conf$2;
let tokensMerged;
function setTokens(_) {
  tokensMerged = _;
}
const getTokens = ({ prefixed } = {}) => {
  const { tokens, tokensParsed } = conf$2;
  return prefixed === false ? tokens : prefixed === true ? tokensParsed : tokensMerged;
}, getTokenObject = (value, group) => conf$2.specificTokens[value] ?? (group ? tokensMerged[group]?.[value] : tokensMerged[Object.keys(tokensMerged).find((cat) => tokensMerged[cat][value]) || ""]?.[value]), getToken = (value, group, useVariable = isWeb) => {
  const token = getTokenObject(value, group);
  return useVariable ? token?.variable : token?.val;
}, getTokenValue = (value, group) => {
  if (!(value === "unset" || value === "auto")) return getToken(value, group, false);
}, configListeners = /* @__PURE__ */ new Set(), onConfiguredOnce = (cb) => {
  conf$2 ? cb(conf$2) : configListeners.add(cb);
};
function constructCSSVariableName(name) {
  return `var(--${process.env.TAMAGUI_CSS_VARIABLE_PREFIX || ""}${name})`;
}
const createVariable = (props, skipHash = false) => {
  if (!skipHash && isVariable(props)) return props;
  const { key, name, val } = props;
  return {
    isVar: true,
    key,
    name: skipHash ? name : simpleHash(name, 40),
    val,
    variable: skipHash ? constructCSSVariableName(name) : createCSSVariable(name)
  };
};
function variableToString(vrble, getValue = false) {
  return isVariable(vrble) ? !getValue && isWeb && vrble.variable ? vrble.variable : `${vrble.val}` : `${vrble || ""}`;
}
function isVariable(v) {
  return v && typeof v == "object" && "isVar" in v;
}
function getVariable(nameOrVariable, group = "size") {
  if (nameOrVariable?.dynamic) return nameOrVariable;
  if (setDidGetVariableValue(true), isVariable(nameOrVariable)) return variableToString(nameOrVariable);
  const tokens = getConfig().tokensParsed;
  return variableToString(tokens[group]?.[nameOrVariable] ?? nameOrVariable);
}
let accessed = false;
const setDidGetVariableValue = (val) => accessed = val, didGetVariableValue = () => accessed;
function getVariableValue(v, group) {
  if (isVariable(v)) return setDidGetVariableValue(true), v.val;
  return v;
}
const createCSSVariable = (nameProp, includeVar = true) => {
  const name = simpleHash(nameProp, 60);
  return includeVar ? constructCSSVariableName(name) : name;
};
const scannedCache = /* @__PURE__ */ new WeakMap(), totalSelectorsInserted = /* @__PURE__ */ new Map(), allRules = {}, getAllRules = () => Object.values(allRules);
let lastScannedSheets = null;
function scanAllSheets(collectThemes = false, tokens) {
  if (!isClient) return;
  let themes2;
  const sheets = document.styleSheets || [], prev = lastScannedSheets, current = new Set(sheets);
  for (const sheet2 of current) if (sheet2) {
    const out = updateSheetStyles(sheet2, false, collectThemes, tokens);
    out && (themes2 = out);
  }
  if (lastScannedSheets = current, prev) for (const sheet2 of prev) sheet2 && !current.has(sheet2) && updateSheetStyles(sheet2, true);
  return themes2;
}
function trackInsertedStyle(id) {
  const next = (totalSelectorsInserted.get(id) || 0) + 1;
  return totalSelectorsInserted.set(id, next), next;
}
const bailAfterEnv = process.env.TAMAGUI_BAIL_AFTER_SCANNING_X_CSS_RULES, bailAfter = bailAfterEnv ? +bailAfterEnv : 400;
function updateSheetStyles(sheet2, remove = false, collectThemes = false, tokens) {
  let rules;
  try {
    if (rules = sheet2.cssRules, !rules) return;
  } catch {
    return;
  }
  const firstSelector = getTamaguiSelector(rules[0], collectThemes)?.[0], lastSelector = getTamaguiSelector(rules[rules.length - 1], collectThemes)?.[0], cacheKey = `${rules.length}${firstSelector}${lastSelector}`, lastScanned = scannedCache.get(sheet2);
  if (!remove && lastScanned === cacheKey) return;
  const len = rules.length;
  let fails = 0, dedupedThemes;
  const nameToTheme = {};
  for (let i = 0; i < len; i++) {
    const rule = rules[i];
    if (!(rule instanceof CSSStyleRule)) continue;
    const response = getTamaguiSelector(rule, collectThemes);
    if (response) fails = 0;
    else {
      if (fails++, fails > bailAfter) return;
      continue;
    }
    const [identifier, cssRule, isTheme] = response;
    if (isTheme) {
      const deduped = addThemesFromCSS(cssRule, tokens);
      if (deduped) {
        for (const name of deduped.names) nameToTheme[name] ? (Object.apply(nameToTheme[name], deduped.theme), deduped.names = deduped.names.filter((x) => x !== name)) : nameToTheme[name] = deduped.theme;
        dedupedThemes || (dedupedThemes = []), dedupedThemes.push(deduped);
      }
      continue;
    }
  }
  return scannedCache.set(sheet2, cacheKey), dedupedThemes;
}
let colorVarToVal, rootComputedStyle = null;
function addThemesFromCSS(cssStyleRule, tokens) {
  const selectors2 = cssStyleRule.selectorText.split(",");
  if (!selectors2.length) return;
  if (tokens?.color && !colorVarToVal) {
    colorVarToVal = {};
    for (const key in tokens.color) {
      const token = tokens.color[key];
      colorVarToVal[token.name] = token.val;
    }
  }
  const rules = (cssStyleRule.cssText || "").slice(cssStyleRule.selectorText.length + 2, -1).split(";"), values = {};
  for (const rule of rules) {
    const sepI = rule.indexOf(":");
    if (sepI === -1) continue;
    const varIndex = rule.indexOf("--");
    let key = rule.slice(varIndex === -1 ? 0 : varIndex + 2, sepI);
    process.env.TAMAGUI_CSS_VARIABLE_PREFIX && (key = key.replace(process.env.TAMAGUI_CSS_VARIABLE_PREFIX, ""));
    const val = rule.slice(sepI + 2);
    let value;
    if (val[0] === "v" && val.startsWith("var(")) {
      const varName = val.slice(6, -1), tokenVal = colorVarToVal[varName];
      tokenVal ? value = tokenVal : (rootComputedStyle || (rootComputedStyle = getComputedStyle(document.body)), value = rootComputedStyle.getPropertyValue("--" + varName));
    } else value = val;
    values[key] = createVariable({
      key,
      name: key,
      val: value
    }, true);
  }
  const names = /* @__PURE__ */ new Set();
  for (const selector of selectors2) {
    if (selector === " .tm_xxt") continue;
    const lastThemeSelectorIndex = selector.lastIndexOf(".t_"), name = selector.slice(lastThemeSelectorIndex).slice(3), [schemeChar] = selector[lastThemeSelectorIndex - 5], scheme = schemeChar === "d" ? "dark" : schemeChar === "i" ? "light" : "", themeName = scheme && scheme !== name ? `${scheme}_${name}` : name;
    !themeName || themeName === "light_dark" || themeName === "dark_light" || names.add(themeName);
  }
  return {
    names: [
      ...names
    ],
    theme: values
  };
}
const tamaguiSelectorRegex = /\.tm_xxt/;
function getTamaguiSelector(rule, collectThemes = false) {
  if (rule instanceof CSSStyleRule) {
    const text = rule.selectorText;
    if (text[0] === ":" && text[1] === "r" && tamaguiSelectorRegex.test(text)) {
      const id = getIdentifierFromTamaguiSelector(
        // next.js minifies it so its in front
        text.replace(tamaguiSelectorRegex, "")
      );
      return collectThemes ? [
        id,
        rule,
        true
      ] : [
        id,
        rule
      ];
    }
  } else if (rule instanceof CSSMediaRule) return rule.cssRules.length > 1 ? void 0 : getTamaguiSelector(rule.cssRules[0]);
}
const getIdentifierFromTamaguiSelector = (selector) => {
  const dotIndex = selector.indexOf(":");
  return dotIndex > -1 ? selector.slice(7, dotIndex) : selector.slice(7);
};
let sheet = null, trackAllRules = true;
function stopAccumulatingRules() {
  trackAllRules = false;
}
function updateRules(identifier, rules) {
  return trackAllRules && (allRules[identifier] = rules.join(" ")), true;
}
function insertStyleRules(rulesToInsert) {
  if (isClient) {
    if (!sheet && document.head) {
      const styleTag = document.createElement("style");
      styleTag.id = "_tamagui-styles", sheet = document.head.appendChild(styleTag).sheet;
    }
    if (sheet) for (const key in rulesToInsert) {
      const styleObject = rulesToInsert[key], identifier = styleObject[StyleObjectIdentifier];
      if (!shouldInsertStyleRules(identifier)) continue;
      const rules = styleObject[StyleObjectRules];
      rules.join(`
`), trackInsertedStyle(identifier), updateRules(identifier, rules);
      try {
        for (const rule of rules) sheet.insertRule(rule, sheet.cssRules.length), identifier === "_dsp-_groupframe-maxMd_none" && console.warn("INSERT", rule);
      } catch {
        console.error("Error inserting style rule", rules);
      }
    }
  }
}
const maxToInsert = process.env.TAMAGUI_INSERT_SELECTOR_TRIES ? +process.env.TAMAGUI_INSERT_SELECTOR_TRIES : 1;
function shouldInsertStyleRules(identifier) {
  const total = totalSelectorsInserted.get(identifier) || 0;
  return total < maxToInsert;
}
const matchMedia = typeof window < "u" && window.matchMedia || matchMediaFallback;
function matchMediaFallback(_) {
  return {
    match: (a, b) => false,
    addListener() {
    },
    removeListener() {
    },
    matches: false
  };
}
const pseudoDescriptorsBase = {
  // order of keys here important! in priority order
  hoverStyle: {
    name: "hover",
    priority: 2
  },
  pressStyle: {
    name: "active",
    stateKey: "press",
    priority: 3
  },
  focusVisibleStyle: {
    name: "focus-visible",
    priority: 4,
    stateKey: "focusVisible"
  },
  focusStyle: {
    name: "focus",
    priority: 4
  },
  focusWithinStyle: {
    name: "focus-within",
    priority: 4,
    stateKey: "focusWithin"
  },
  disabledStyle: {
    name: "disabled",
    priority: 5,
    stateKey: "disabled"
  }
}, pseudoPriorities = {
  hover: pseudoDescriptorsBase.hoverStyle.priority,
  press: pseudoDescriptorsBase.pressStyle.priority,
  focus: pseudoDescriptorsBase.focusStyle.priority,
  focusVisible: pseudoDescriptorsBase.focusVisibleStyle.priority,
  focusWithin: pseudoDescriptorsBase.focusWithinStyle.priority,
  disabled: pseudoDescriptorsBase.disabledStyle.priority
}, pseudoDescriptors = {
  ...pseudoDescriptorsBase,
  enterStyle: {
    name: "enter",
    selector: ".t_unmounted",
    priority: 4
  },
  exitStyle: {
    name: "exit",
    priority: 5
  }
};
let mediaState = (
  // development only safeguard
  {}
);
const mediaQueryConfig = {}, getMedia = () => mediaState, mediaKeys = /* @__PURE__ */ new Set(), mediaKeyRegex = /\$(platform|theme|group)-/, isMediaKey = (key) => {
  if (mediaKeys.has(key)) return true;
  if (key[0] === "$") {
    const match = key.match(mediaKeyRegex);
    if (match) return match[1];
  }
  return false;
};
let initState;
const defaultMediaImportance = Object.keys(pseudoDescriptors).length;
let mediaKeysOrdered;
const getMediaKeyImportance = (key) => {
  return getConfig().settings.mediaPropOrder ? defaultMediaImportance : mediaKeysOrdered.indexOf(key) + 100;
}, dispose = /* @__PURE__ */ new Set();
let mediaVersion = 0;
const configureMedia = (config) => {
  const { media } = config, mediaQueryDefaultActive = getSetting("mediaQueryDefaultActive");
  if (media) {
    mediaVersion++;
    for (const key in media) mediaState[key] = mediaQueryDefaultActive?.[key] || false, mediaKeys.add(`$${key}`);
    Object.assign(mediaQueryConfig, media), initState = {
      ...mediaState
    }, mediaKeysOrdered = Object.keys(media), setupMediaListeners();
  }
};
function unlisten() {
  dispose.forEach((cb) => cb()), dispose.clear();
}
let setupVersion = -1;
function setupMediaListeners() {
  if (!isServer && true && setupVersion !== mediaVersion) {
    setupVersion = mediaVersion, unlisten();
    for (const key in mediaQueryConfig) {
      let update = function() {
        const next = !!getMatch().matches;
        next !== mediaState[key] && (mediaState = {
          ...mediaState,
          [key]: next
        }, updateMediaListeners());
      };
      const str = mediaObjectToString(mediaQueryConfig[key]), getMatch = () => matchMedia(str), match = getMatch();
      if (!match) throw new Error("⚠️ No match");
      match.addListener(update), dispose.add(() => {
        match.removeListener(update);
      }), update();
    }
  }
}
const listeners = /* @__PURE__ */ new Set();
function updateMediaListeners() {
  listeners.forEach((cb) => cb(mediaState));
}
const States = /* @__PURE__ */ new WeakMap();
function setMediaShouldUpdate(ref, enabled, keys) {
  const cur = States.get(ref);
  (!cur || cur.enabled !== enabled || keys) && States.set(ref, {
    ...cur,
    enabled,
    keys
  });
}
function subscribe$1(subscriber) {
  return listeners.add(subscriber), () => {
    listeners.delete(subscriber);
  };
}
function useMedia(componentContext, debug) {
  const componentState = componentContext ? States.get(componentContext) : null, internalRef = reactExports.useRef(null);
  internalRef.current || (internalRef.current = {
    keys: /* @__PURE__ */ new Set(),
    lastState: mediaState
  }), internalRef.current.pendingState && (internalRef.current.lastState = internalRef.current.pendingState, internalRef.current.pendingState = void 0);
  const { keys } = internalRef.current;
  keys.size && keys.clear();
  const state = reactExports.useSyncExternalStore(subscribe$1, () => {
    const curKeys2 = componentState?.keys || keys, { lastState, pendingState } = internalRef.current;
    if (!curKeys2.size) return lastState;
    for (const key of curKeys2) if (mediaState[key] !== (pendingState || lastState)[key]) return componentContext?.mediaEmit ? (componentContext.mediaEmit(mediaState), internalRef.current.pendingState = mediaState, lastState) : (internalRef.current.lastState = mediaState, mediaState);
    return lastState;
  }, getServerSnapshot);
  return new Proxy(state, {
    get(_, key) {
      return !disableMediaTouch && typeof key == "string" && keys.add(key), Reflect.get(state, key);
    }
  });
}
const getServerSnapshot = () => initState;
let disableMediaTouch = false;
function getMediaState(mediaGroups, layout) {
  disableMediaTouch = true;
  let res;
  try {
    res = Object.fromEntries([
      ...mediaGroups
    ].map((mediaKey) => [
      mediaKey,
      mediaKeyMatch(mediaKey, layout)
    ]));
  } finally {
    disableMediaTouch = false;
  }
  return res;
}
const getMediaImportanceIfMoreImportant = (mediaKey, key, styleState, isSizeMedia) => {
  const importance = isSizeMedia && !getSetting("mediaPropOrder") ? getMediaKeyImportance(mediaKey) : defaultMediaImportance, usedKeys = styleState.usedKeys;
  return !usedKeys[key] || importance > usedKeys[key] ? importance : null;
};
function camelToHyphen(str) {
  return str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`).toLowerCase();
}
const cache$4 = /* @__PURE__ */ new WeakMap();
function mediaObjectToString(query, key) {
  if (typeof query == "string") return query;
  if (cache$4.has(query)) return cache$4.get(query);
  const res = Object.entries(query).map(([feature, value]) => (feature = camelToHyphen(feature), typeof value == "string" ? `(${feature}: ${value})` : (typeof value == "number" && /[height|width]$/.test(feature) && (value = `${value}px`), `(${feature}: ${value})`))).join(" and ");
  return cache$4.set(query, res), res;
}
function mediaKeyMatch(key, dimensions) {
  const mediaQueries = mediaQueryConfig[key];
  return Object.keys(mediaQueries).every((query) => {
    const expectedVal = +mediaQueries[query], isMax = query.startsWith("max"), isWidth = query.endsWith("Width"), givenVal = dimensions[isWidth ? "width" : "height"];
    return isMax ? givenVal < expectedVal : givenVal > expectedVal;
  });
}
function setRef(ref, value) {
  typeof ref == "function" ? ref(value) : ref && (ref.current = value);
}
function composeRefs(...refs) {
  return (node) => refs.forEach((ref) => setRef(ref, node));
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
function useCreateShallowSetState(setter, debug) {
  return reactExports.useCallback((stateOrGetState) => {
    setter((prev) => {
      const next = typeof stateOrGetState == "function" ? stateOrGetState(prev) : stateOrGetState, update = mergeIfNotShallowEqual(prev, next);
      return update;
    });
  }, [
    setter,
    debug
  ]);
}
function mergeIfNotShallowEqual(prev, next) {
  return !prev || !next || isEqualShallow(prev, next) ? prev || next : {
    ...prev,
    ...next
  };
}
function isEqualShallow(prev, next) {
  for (const key in next) if (prev[key] !== next[key]) return false;
  return true;
}
function objectIdentityKey(obj) {
  let k = "";
  for (const key in obj) {
    k += key;
    const arg = obj[key];
    let type = typeof arg;
    if (!arg || type !== "object" && type !== "function") k += type + arg;
    else if (cache$3.has(arg)) k += cache$3.get(arg);
    else {
      let v = Math.random();
      cache$3.set(arg, v), k += v;
    }
  }
  return k;
}
const cache$3 = /* @__PURE__ */ new WeakMap();
const createReactContext = React["createContext"];
function createStyledContext(defaultValues, namespace = "") {
  const OGContext = createReactContext(defaultValues), OGProvider = OGContext.Provider, Context = OGContext, scopedContexts = /* @__PURE__ */ new Map(), LastScopeInNamespace = createReactContext(namespace);
  function getOrCreateScopedContext(scope) {
    let ScopedContext = scopedContexts.get(scope);
    return ScopedContext || (ScopedContext = createReactContext(defaultValues), scopedContexts.set(scope, ScopedContext)), ScopedContext;
  }
  const getNamespacedScope = (scope) => namespace ? `${namespace}--${scope}` : scope, Provider = ({ children, scope: scopeIn, ...values }) => {
    const scope = getNamespacedScope(scopeIn), next = React.useMemo(() => ({
      // this ! is a workaround for ts error
      ...defaultValues,
      ...values
    }), [
      objectIdentityKey(values)
    ]);
    let Provider2 = OGProvider;
    return scope && (Provider2 = getOrCreateScopedContext(scope).Provider), /* @__PURE__ */ jsxRuntimeExports.jsx(LastScopeInNamespace.Provider, {
      value: scope,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Provider2, {
        value: next,
        children
      })
    });
  }, useStyledContext = (scopeIn = "") => {
    const lastScopeInNamespace = reactExports.useContext(LastScopeInNamespace), scope = namespace ? scopeIn ? getNamespacedScope(scopeIn) : lastScopeInNamespace : scopeIn, context = scope ? getOrCreateScopedContext(scope) : OGContext;
    return React.useContext(context);
  };
  return Context.Provider = Provider, Context.props = defaultValues, Context.context = OGContext, Context.useStyledContext = useStyledContext, Context;
}
const ComponentContext = createStyledContext({
  disableSSR: void 0,
  inText: false,
  language: null,
  animationDriver: null,
  setParentFocusState: null
});
const GroupContext = reactExports.createContext(null);
const defaultComponentState = {
  hover: false,
  press: false,
  pressIn: false,
  focus: false,
  focusVisible: false,
  focusWithin: false,
  unmounted: true,
  disabled: false
}, defaultComponentStateMounted = {
  ...defaultComponentState,
  unmounted: false
}, defaultComponentStateShouldEnter = {
  ...defaultComponentState,
  unmounted: "should-enter"
};
let inverseShorthands = null;
const getShorthandValue = (props, key) => (inverseShorthands || (inverseShorthands = getConfig().inverseShorthands), props[key] ?? (inverseShorthands ? props[inverseShorthands[key]] : void 0));
function getOppositeScheme(scheme) {
  return scheme === "dark" ? "light" : "dark";
}
function getDynamicVal({ scheme, val, oppositeVal }) {
  const oppositeScheme = getOppositeScheme(scheme);
  return {
    dynamic: {
      [scheme]: val,
      [oppositeScheme]: oppositeVal
    }
  };
}
function extractValueFromDynamic(val, scheme) {
  return val?.dynamic ? val.dynamic[scheme] : val;
}
const accessibilityDirectMap = {};
{
  const items = {
    Hidden: true,
    ActiveDescendant: true,
    Atomic: true,
    AutoComplete: true,
    Busy: true,
    Checked: true,
    ColumnCount: "colcount",
    ColumnIndex: "colindex",
    ColumnSpan: "colspan",
    Current: true,
    Details: true,
    ErrorMessage: true,
    Expanded: true,
    HasPopup: true,
    Invalid: true,
    Label: true,
    Level: true,
    Modal: true,
    Multiline: true,
    MultiSelectable: true,
    Orientation: true,
    Owns: true,
    Placeholder: true,
    PosInSet: true,
    Pressed: true,
    RoleDescription: true,
    RowCount: true,
    RowIndex: true,
    RowSpan: true,
    Selected: true,
    SetSize: true,
    Sort: true,
    ValueMax: true,
    ValueMin: true,
    ValueNow: true,
    ValueText: true
  };
  for (const key in items) {
    let val = items[key];
    val === true && (val = key.toLowerCase()), accessibilityDirectMap[`accessibility${key}`] = `aria-${val}`;
  }
}
function getGroupPropParts(groupProp) {
  const mediaQueries = getMedia(), [_, name, part3, part4] = groupProp.split("-");
  let pseudo;
  const media = part3 in mediaQueries ? part3 : void 0;
  return media ? pseudo = part4 : pseudo = part3, {
    name,
    pseudo,
    media
  };
}
const MEDIA_SEP = "_";
let prefixes = null, selectors = null;
const groupPseudoToPseudoCSSMap = {
  press: "active",
  focusVisible: "focus-visible",
  focusWithin: "focus-within"
}, specificities = new Array(5).fill(0).map((_, i) => new Array(i).fill(":root").join(""));
function getThemeOrGroupSelector(name, styleInner, isGroup, groupParts, isTheme = false, precedenceImportancePrefix = "") {
  const selectorStart = styleInner.lastIndexOf(":root") + 5, selectorEnd = styleInner.lastIndexOf("{"), selector = styleInner.slice(selectorStart, selectorEnd), precedenceSpace = getSetting("themeClassNameOnRoot") && isTheme ? "" : " ", pseudoSelectorName = groupParts.pseudo ? groupPseudoToPseudoCSSMap[groupParts.pseudo] || groupParts.pseudo : void 0, pseudoSelector = pseudoSelectorName ? `:${pseudoSelectorName}` : "", presedencePrefix = `:root${precedenceImportancePrefix}${precedenceSpace}`, mediaSelector = `.t_${isGroup ? "group_" : ""}${name}${pseudoSelector}`;
  return [
    selector,
    `${presedencePrefix}${mediaSelector} ${selector.replaceAll(":root", "")}`
  ];
}
const createMediaStyle = (styleObject, mediaKeyIn, mediaQueries, type, negate, priority) => {
  const [propertyIn, , identifier, pseudoIn, rules] = styleObject;
  let property = propertyIn;
  const enableMediaPropOrder = getSetting("mediaPropOrder"), isTheme = type === "theme", isPlatform = type === "platform", isGroup = type === "group", isNonWindowMedia = isTheme || isPlatform || isGroup, negKey = "", ogPrefix = identifier.slice(0, identifier.indexOf("-") + 1), id = `${ogPrefix}${MEDIA_SEP}${mediaKeyIn.replace("-", "")}${negKey}${MEDIA_SEP}`;
  let styleRule = "", groupPriority = "", groupMediaKey, containerName, nextIdentifier = identifier.replace(ogPrefix, id), styleInner = rules.map((rule) => rule.replace(identifier, nextIdentifier)).join(";"), isHover = false;
  if (isNonWindowMedia) {
    let specificity = (priority || 0) + (isGroup || isPlatform ? 1 : 0);
    if (isTheme || isGroup) {
      const groupParts = getGroupPropParts(isTheme ? "theme-" + mediaKeyIn : mediaKeyIn), { name, media, pseudo } = groupParts;
      groupMediaKey = media, isGroup && (containerName = name), (pseudo === "press" || pseudoIn === "active") && (specificity += 2), pseudo === "hover" && (isHover = true);
      const [selector, nextSelector] = getThemeOrGroupSelector(name, styleInner, isGroup, groupParts, isTheme, specificities[specificity]);
      styleRule = styleInner.replace(selector, nextSelector);
    } else styleRule = `${specificities[specificity]}${styleInner}`;
  }
  if (!isNonWindowMedia || groupMediaKey) {
    if (!selectors) {
      const mediaKeys2 = Object.keys(mediaQueries);
      selectors = Object.fromEntries(mediaKeys2.map((key) => [
        key,
        mediaObjectToString(mediaQueries[key])
      ])), enableMediaPropOrder || (prefixes = Object.fromEntries(mediaKeys2.map((k, index2) => [
        k,
        new Array(index2 + 1).fill(":root").join("")
      ])));
    }
    const mediaKey = groupMediaKey || mediaKeyIn, mediaSelector = selectors[mediaKey], mediaQuery = `${""}${mediaSelector}`, precedenceImportancePrefix = groupMediaKey ? groupPriority : enableMediaPropOrder && priority ? (
      // this new array should be cached
      specificities[priority]
    ) : (
      // @ts-ignore
      prefixes[mediaKey]
    ), prefix = groupMediaKey ? `@container ${containerName}` : "@media";
    groupMediaKey && (styleInner = styleRule), styleInner.includes(prefix) ? styleRule = styleInner.replace("{", ` and ${mediaQuery} {`).replace("and screen and", "and") : styleRule = `${prefix} ${mediaQuery}{${precedenceImportancePrefix}${styleInner}}`, groupMediaKey && (styleRule = `@supports (contain: ${getSetting("webContainerType") || "inline-size"}) {${styleRule}}`);
  }
  return isHover && (styleRule = `@media (hover:hover){${styleRule}}`), [
    property,
    void 0,
    nextIdentifier,
    void 0,
    [
      styleRule
    ]
  ];
};
const defaultOffset = {
  height: 0,
  width: 0
};
var normalizeColor_1;
var hasRequiredNormalizeColor;
function requireNormalizeColor() {
  if (hasRequiredNormalizeColor) return normalizeColor_1;
  hasRequiredNormalizeColor = 1;
  function normalizeColor2(color) {
    if (typeof color === "number") {
      if (color >>> 0 === color && color >= 0 && color <= 4294967295) {
        return color;
      }
      return null;
    }
    if (typeof color !== "string") {
      return null;
    }
    const matchers = getMatchers();
    let match;
    if (match = matchers.hex6.exec(color)) {
      return parseInt(match[1] + "ff", 16) >>> 0;
    }
    const colorFromKeyword = normalizeKeyword(color);
    if (colorFromKeyword != null) {
      return colorFromKeyword;
    }
    if (match = matchers.rgb.exec(color)) {
      return (parse255(match[1]) << 24 | // r
      parse255(match[2]) << 16 | // g
      parse255(match[3]) << 8 | // b
      255) >>> // a
      0;
    }
    if (match = matchers.rgba.exec(color)) {
      if (match[6] !== void 0) {
        return (parse255(match[6]) << 24 | // r
        parse255(match[7]) << 16 | // g
        parse255(match[8]) << 8 | // b
        parse1(match[9])) >>> // a
        0;
      }
      return (parse255(match[2]) << 24 | // r
      parse255(match[3]) << 16 | // g
      parse255(match[4]) << 8 | // b
      parse1(match[5])) >>> // a
      0;
    }
    if (match = matchers.hex3.exec(color)) {
      return parseInt(match[1] + match[1] + // r
      match[2] + match[2] + // g
      match[3] + match[3] + // b
      "ff", 16) >>> 0;
    }
    if (match = matchers.hex8.exec(color)) {
      return parseInt(match[1], 16) >>> 0;
    }
    if (match = matchers.hex4.exec(color)) {
      return parseInt(match[1] + match[1] + // r
      match[2] + match[2] + // g
      match[3] + match[3] + // b
      match[4] + match[4], 16) >>> 0;
    }
    if (match = matchers.hsl.exec(color)) {
      return (hslToRgb(parse360(match[1]), parsePercentage(match[2]), parsePercentage(match[3])) | 255) >>> // a
      0;
    }
    if (match = matchers.hsla.exec(color)) {
      if (match[6] !== void 0) {
        return (hslToRgb(parse360(match[6]), parsePercentage(match[7]), parsePercentage(match[8])) | parse1(match[9])) >>> // a
        0;
      }
      return (hslToRgb(parse360(match[2]), parsePercentage(match[3]), parsePercentage(match[4])) | parse1(match[5])) >>> // a
      0;
    }
    if (match = matchers.hwb.exec(color)) {
      return (hwbToRgb(parse360(match[1]), parsePercentage(match[2]), parsePercentage(match[3])) | 255) >>> // a
      0;
    }
    return null;
  }
  function hue2rgb(p, q, t) {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
  }
  function hslToRgb(h, s, l) {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const r = hue2rgb(p, q, h + 1 / 3);
    const g = hue2rgb(p, q, h);
    const b = hue2rgb(p, q, h - 1 / 3);
    return Math.round(r * 255) << 24 | Math.round(g * 255) << 16 | Math.round(b * 255) << 8;
  }
  function hwbToRgb(h, w, b) {
    if (w + b >= 1) {
      const gray = Math.round(w * 255 / (w + b));
      return gray << 24 | gray << 16 | gray << 8;
    }
    const red = hue2rgb(0, 1, h + 1 / 3) * (1 - w - b) + w;
    const green = hue2rgb(0, 1, h) * (1 - w - b) + w;
    const blue = hue2rgb(0, 1, h - 1 / 3) * (1 - w - b) + w;
    return Math.round(red * 255) << 24 | Math.round(green * 255) << 16 | Math.round(blue * 255) << 8;
  }
  const NUMBER = "[-+]?\\d*\\.?\\d+";
  const PERCENTAGE = NUMBER + "%";
  function call(...args) {
    return "\\(\\s*(" + args.join(")\\s*,?\\s*(") + ")\\s*\\)";
  }
  function callWithSlashSeparator(...args) {
    return "\\(\\s*(" + args.slice(0, args.length - 1).join(")\\s*,?\\s*(") + ")\\s*/\\s*(" + args[args.length - 1] + ")\\s*\\)";
  }
  function commaSeparatedCall(...args) {
    return "\\(\\s*(" + args.join(")\\s*,\\s*(") + ")\\s*\\)";
  }
  let cachedMatchers;
  function getMatchers() {
    if (cachedMatchers === void 0) {
      cachedMatchers = {
        rgb: new RegExp("rgb" + call(NUMBER, NUMBER, NUMBER)),
        rgba: new RegExp("rgba(" + commaSeparatedCall(NUMBER, NUMBER, NUMBER, NUMBER) + "|" + callWithSlashSeparator(NUMBER, NUMBER, NUMBER, NUMBER) + ")"),
        hsl: new RegExp("hsl" + call(NUMBER, PERCENTAGE, PERCENTAGE)),
        hsla: new RegExp("hsla(" + commaSeparatedCall(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER) + "|" + callWithSlashSeparator(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER) + ")"),
        hwb: new RegExp("hwb" + call(NUMBER, PERCENTAGE, PERCENTAGE)),
        hex3: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex4: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#([0-9a-fA-F]{6})$/,
        hex8: /^#([0-9a-fA-F]{8})$/
      };
    }
    return cachedMatchers;
  }
  function parse255(str) {
    const int = parseInt(str, 10);
    if (int < 0) {
      return 0;
    }
    if (int > 255) {
      return 255;
    }
    return int;
  }
  function parse360(str) {
    const int = parseFloat(str);
    return (int % 360 + 360) % 360 / 360;
  }
  function parse1(str) {
    const num = parseFloat(str);
    if (num < 0) {
      return 0;
    }
    if (num > 1) {
      return 255;
    }
    return Math.round(num * 255);
  }
  function parsePercentage(str) {
    const int = parseFloat(str);
    if (int < 0) {
      return 0;
    }
    if (int > 100) {
      return 1;
    }
    return int / 100;
  }
  function normalizeKeyword(name) {
    switch (name) {
      case "transparent":
        return 0;
      // http://www.w3.org/TR/css3-color/#svg-color
      case "aliceblue":
        return 4042850303;
      case "antiquewhite":
        return 4209760255;
      case "aqua":
        return 16777215;
      case "aquamarine":
        return 2147472639;
      case "azure":
        return 4043309055;
      case "beige":
        return 4126530815;
      case "bisque":
        return 4293182719;
      case "black":
        return 255;
      case "blanchedalmond":
        return 4293643775;
      case "blue":
        return 65535;
      case "blueviolet":
        return 2318131967;
      case "brown":
        return 2771004159;
      case "burlywood":
        return 3736635391;
      case "burntsienna":
        return 3934150143;
      case "cadetblue":
        return 1604231423;
      case "chartreuse":
        return 2147418367;
      case "chocolate":
        return 3530104575;
      case "coral":
        return 4286533887;
      case "cornflowerblue":
        return 1687547391;
      case "cornsilk":
        return 4294499583;
      case "crimson":
        return 3692313855;
      case "cyan":
        return 16777215;
      case "darkblue":
        return 35839;
      case "darkcyan":
        return 9145343;
      case "darkgoldenrod":
        return 3095792639;
      case "darkgray":
        return 2846468607;
      case "darkgreen":
        return 6553855;
      case "darkgrey":
        return 2846468607;
      case "darkkhaki":
        return 3182914559;
      case "darkmagenta":
        return 2332068863;
      case "darkolivegreen":
        return 1433087999;
      case "darkorange":
        return 4287365375;
      case "darkorchid":
        return 2570243327;
      case "darkred":
        return 2332033279;
      case "darksalmon":
        return 3918953215;
      case "darkseagreen":
        return 2411499519;
      case "darkslateblue":
        return 1211993087;
      case "darkslategray":
        return 793726975;
      case "darkslategrey":
        return 793726975;
      case "darkturquoise":
        return 13554175;
      case "darkviolet":
        return 2483082239;
      case "deeppink":
        return 4279538687;
      case "deepskyblue":
        return 12582911;
      case "dimgray":
        return 1768516095;
      case "dimgrey":
        return 1768516095;
      case "dodgerblue":
        return 512819199;
      case "firebrick":
        return 2988581631;
      case "floralwhite":
        return 4294635775;
      case "forestgreen":
        return 579543807;
      case "fuchsia":
        return 4278255615;
      case "gainsboro":
        return 3705462015;
      case "ghostwhite":
        return 4177068031;
      case "gold":
        return 4292280575;
      case "goldenrod":
        return 3668254975;
      case "gray":
        return 2155905279;
      case "green":
        return 8388863;
      case "greenyellow":
        return 2919182335;
      case "grey":
        return 2155905279;
      case "honeydew":
        return 4043305215;
      case "hotpink":
        return 4285117695;
      case "indianred":
        return 3445382399;
      case "indigo":
        return 1258324735;
      case "ivory":
        return 4294963455;
      case "khaki":
        return 4041641215;
      case "lavender":
        return 3873897215;
      case "lavenderblush":
        return 4293981695;
      case "lawngreen":
        return 2096890111;
      case "lemonchiffon":
        return 4294626815;
      case "lightblue":
        return 2916673279;
      case "lightcoral":
        return 4034953471;
      case "lightcyan":
        return 3774873599;
      case "lightgoldenrodyellow":
        return 4210742015;
      case "lightgray":
        return 3553874943;
      case "lightgreen":
        return 2431553791;
      case "lightgrey":
        return 3553874943;
      case "lightpink":
        return 4290167295;
      case "lightsalmon":
        return 4288707327;
      case "lightseagreen":
        return 548580095;
      case "lightskyblue":
        return 2278488831;
      case "lightslategray":
        return 2005441023;
      case "lightslategrey":
        return 2005441023;
      case "lightsteelblue":
        return 2965692159;
      case "lightyellow":
        return 4294959359;
      case "lime":
        return 16711935;
      case "limegreen":
        return 852308735;
      case "linen":
        return 4210091775;
      case "magenta":
        return 4278255615;
      case "maroon":
        return 2147483903;
      case "mediumaquamarine":
        return 1724754687;
      case "mediumblue":
        return 52735;
      case "mediumorchid":
        return 3126187007;
      case "mediumpurple":
        return 2473647103;
      case "mediumseagreen":
        return 1018393087;
      case "mediumslateblue":
        return 2070474495;
      case "mediumspringgreen":
        return 16423679;
      case "mediumturquoise":
        return 1221709055;
      case "mediumvioletred":
        return 3340076543;
      case "midnightblue":
        return 421097727;
      case "mintcream":
        return 4127193855;
      case "mistyrose":
        return 4293190143;
      case "moccasin":
        return 4293178879;
      case "navajowhite":
        return 4292783615;
      case "navy":
        return 33023;
      case "oldlace":
        return 4260751103;
      case "olive":
        return 2155872511;
      case "olivedrab":
        return 1804477439;
      case "orange":
        return 4289003775;
      case "orangered":
        return 4282712319;
      case "orchid":
        return 3664828159;
      case "palegoldenrod":
        return 4008225535;
      case "palegreen":
        return 2566625535;
      case "paleturquoise":
        return 2951671551;
      case "palevioletred":
        return 3681588223;
      case "papayawhip":
        return 4293907967;
      case "peachpuff":
        return 4292524543;
      case "peru":
        return 3448061951;
      case "pink":
        return 4290825215;
      case "plum":
        return 3718307327;
      case "powderblue":
        return 2967529215;
      case "purple":
        return 2147516671;
      case "rebeccapurple":
        return 1714657791;
      case "red":
        return 4278190335;
      case "rosybrown":
        return 3163525119;
      case "royalblue":
        return 1097458175;
      case "saddlebrown":
        return 2336560127;
      case "salmon":
        return 4202722047;
      case "sandybrown":
        return 4104413439;
      case "seagreen":
        return 780883967;
      case "seashell":
        return 4294307583;
      case "sienna":
        return 2689740287;
      case "silver":
        return 3233857791;
      case "skyblue":
        return 2278484991;
      case "slateblue":
        return 1784335871;
      case "slategray":
        return 1887473919;
      case "slategrey":
        return 1887473919;
      case "snow":
        return 4294638335;
      case "springgreen":
        return 16744447;
      case "steelblue":
        return 1182971135;
      case "tan":
        return 3535047935;
      case "teal":
        return 8421631;
      case "thistle":
        return 3636451583;
      case "tomato":
        return 4284696575;
      case "turquoise":
        return 1088475391;
      case "violet":
        return 4001558271;
      case "wheat":
        return 4125012991;
      case "white":
        return 4294967295;
      case "whitesmoke":
        return 4126537215;
      case "yellow":
        return 4294902015;
      case "yellowgreen":
        return 2597139199;
    }
    return null;
  }
  normalizeColor_1 = normalizeColor2;
  return normalizeColor_1;
}
var normalizeColorExports = requireNormalizeColor();
const index = /* @__PURE__ */ getDefaultExportFromCjs(normalizeColorExports);
const normalizeColor$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: index
}, [normalizeColorExports]);
const norm = index || normalizeColor$1, normalizeCSSColor = norm;
function rgba(colorInt) {
  const r = Math.round((colorInt & 4278190080) >>> 24), g = Math.round((colorInt & 16711680) >>> 16), b = Math.round((colorInt & 65280) >>> 8), a = ((colorInt & 255) >>> 0) / 255;
  return {
    r,
    g,
    b,
    a
  };
}
const normalizeColor = (color, opacity) => {
  if (color) {
    if (color[0] === "$") return color;
    if (color.startsWith("var(")) {
      if (typeof opacity == "number" && opacity < 1) return `color-mix(in srgb, ${color} ${opacity * 100}%, transparent)`;
    } else {
      const rgba3 = getRgba(color);
      if (rgba3) {
        const colors = `${rgba3.r},${rgba3.g},${rgba3.b}`;
        return opacity === 1 ? `rgb(${colors})` : `rgba(${colors},${opacity ?? rgba3.a ?? 1})`;
      }
    }
    return color;
  }
}, getRgba = (color) => {
  const colorNum = normalizeCSSColor(color);
  if (colorNum != null) return rgba(colorNum);
};
function normalizeShadow({ shadowColor, shadowOffset, shadowOpacity, shadowRadius }) {
  const { height, width } = shadowOffset || defaultOffset;
  return {
    shadowOffset: {
      width: width || 0,
      height: height || 0
    },
    shadowRadius: shadowRadius || 0,
    shadowColor: normalizeColor(shadowColor, 1),
    shadowOpacity: shadowOpacity ?? (shadowColor ? getRgba(shadowColor)?.a : 1)
  };
}
function fixStyles(style) {
  var _style, _borderDefaults_key;
  (style.shadowRadius != null || style.shadowColor || style.shadowOpacity != null || style.shadowOffset) && Object.assign(style, normalizeShadow(style));
  for (const key in borderDefaults) key in style && ((_style = style)[_borderDefaults_key = borderDefaults[key]] || (_style[_borderDefaults_key] = "solid"));
}
const borderDefaults = {
  borderWidth: "borderStyle",
  borderBottomWidth: "borderBottomStyle",
  borderTopWidth: "borderTopStyle",
  borderLeftWidth: "borderLeftStyle",
  borderRightWidth: "borderRightStyle"
};
const stylePropsAllPlusTransforms = {
  ...stylePropsAll,
  translateX: true,
  translateY: true
};
function normalizeValueWithProperty(value, property = "") {
  if (stylePropsUnitless[property] || property && !stylePropsAllPlusTransforms[property] || typeof value == "boolean") return value;
  let res = value;
  return value && typeof value == "object" ? value : (typeof value == "number" ? res = `${value}px` : property && (res = `${res}`), res);
}
function transformsToString(transforms) {
  return transforms.map(
    // { scale: 2 } => 'scale(2)'
    // { translateX: 20 } => 'translateX(20px)'
    // { matrix: [1,2,3,4,5,6] } => 'matrix(1,2,3,4,5,6)'
    // { perspective: 1000 } => perspective(1000px)
    (transform) => {
      const type = Object.keys(transform)[0], value = transform[type];
      return type === "matrix" || type === "matrix3d" ? `${type}(${value.join(",")})` : `${type}(${normalizeValueWithProperty(value, type)})`;
    }
  ).join(" ");
}
function getCSSStylesAtomic(style) {
  styleToCSS(style);
  const out = [];
  for (const key in style) {
    if (key === "$$css") continue;
    const val = style[key];
    if (key in pseudoDescriptors) val && out.push(...getStyleAtomic(val, pseudoDescriptors[key]));
    else if (isMediaKey(key)) for (const subKey in val) {
      const so = getStyleObject(val, subKey);
      so && (so[0] = key, out.push(so));
    }
    else {
      const so = getStyleObject(style, key);
      so && out.push(so);
    }
  }
  return out;
}
const getStyleAtomic = (style, pseudo) => {
  styleToCSS(style);
  const out = [];
  for (const key in style) {
    const so = getStyleObject(style, key, pseudo);
    so && out.push(so);
  }
  return out;
};
let conf$1 = null;
const getStyleObject = (style, key, pseudo) => {
  let val = style[key];
  if (val == null) return;
  key === "transform" && Array.isArray(style.transform) && (val = transformsToString(val));
  const value = normalizeValueWithProperty(val, key), hash = simpleHash(typeof value == "string" ? value : `${value}`), pseudoPrefix = pseudo ? `0${pseudo.name}-` : "";
  conf$1 || (conf$1 = getConfigMaybe());
  const identifier = `_${conf$1?.inverseShorthands[key] || key}-${pseudoPrefix}${hash}`, rules = createAtomicRules(identifier, key, value, pseudo);
  return [
    // array for performance
    key,
    value,
    identifier,
    pseudo?.name,
    rules
  ];
};
function styleToCSS(style) {
  const { shadowOffset, shadowRadius, shadowColor, shadowOpacity } = style;
  if (shadowRadius != null || shadowColor || shadowOffset != null || shadowOpacity != null) {
    const offset = shadowOffset || defaultOffset, width = normalizeValueWithProperty(offset.width), height = normalizeValueWithProperty(offset.height), radius = normalizeValueWithProperty(shadowRadius), color = normalizeColor(shadowColor, shadowOpacity);
    if (color) {
      const shadow = `${width} ${height} ${radius} ${color}`;
      style.boxShadow = style.boxShadow ? `${style.boxShadow}, ${shadow}` : shadow;
    }
    delete style.shadowOffset, delete style.shadowRadius, delete style.shadowColor, delete style.shadowOpacity;
  }
  const { textShadowColor, textShadowOffset, textShadowRadius } = style;
  if (textShadowColor || textShadowOffset || textShadowRadius) {
    const { height, width } = textShadowOffset || defaultOffset, radius = textShadowRadius || 0, color = normalizeValueWithProperty(textShadowColor, "textShadowColor");
    if (color && (height !== 0 || width !== 0 || radius !== 0)) {
      const blurRadius = normalizeValueWithProperty(radius), offsetX = normalizeValueWithProperty(width), offsetY = normalizeValueWithProperty(height);
      style.textShadow = `${offsetX} ${offsetY} ${blurRadius} ${color}`;
    }
    delete style.textShadowColor, delete style.textShadowOffset, delete style.textShadowRadius;
  }
}
function createDeclarationBlock(style, important = false) {
  let next = "";
  for (const [key, value] of style) next += `${hyphenateStyleName(key)}:${value}${important ? " !important" : ""};`;
  return `{${next}}`;
}
const hcache = {}, toHyphenLower = (match) => `-${match.toLowerCase()}`, hyphenateStyleName = (key) => {
  if (key in hcache) return hcache[key];
  const val = key.replace(/[A-Z]/g, toHyphenLower);
  return hcache[key] = val, val;
}, selectorPriority = (() => {
  const res = {};
  for (const key in pseudoDescriptors) {
    const pseudo = pseudoDescriptors[key];
    res[pseudo.name] = `${[
      ...Array(pseudo.priority)
    ].map(() => ":root").join("")} `;
  }
  return res;
})();
function createAtomicRules(identifier, property, value, pseudo) {
  const pseudoIdPostfix = pseudo ? pseudo.name === "disabled" ? "[aria-disabled]" : `:${pseudo.name}` : "", pseudoSelector = pseudo?.selector;
  let selector = pseudo ? pseudoSelector ? `${pseudoSelector} .${identifier}` : `${selectorPriority[pseudo.name]} .${identifier}${pseudoIdPostfix}` : `:root .${identifier}`;
  pseudoSelector === pseudoDescriptors.enterStyle.selector && (selector = `${selector}, .${identifier}${pseudoSelector}`);
  const important = !!pseudo;
  let rules = [];
  switch (property) {
    // Equivalent to using '::placeholder'
    case "placeholderTextColor": {
      const block = createDeclarationBlock([
        [
          "color",
          value
        ],
        [
          "opacity",
          1
        ]
      ], important);
      rules.push(`${selector}::placeholder${block}`);
      break;
    }
    // all webkit prefixed rules
    case "backgroundClip":
    case "userSelect": {
      const webkitProperty = `Webkit${`${property[0].toUpperCase()}${property.slice(1)}`}`, block = createDeclarationBlock([
        [
          property,
          value
        ],
        [
          webkitProperty,
          value
        ]
      ], important);
      rules.push(`${selector}${block}`);
      break;
    }
    // Polyfill for additional 'pointer-events' values
    case "pointerEvents": {
      let finalValue = value;
      value === "auto" || value === "box-only" ? (finalValue = "auto", value === "box-only" && rules.push(`${selector}>*${boxOnly}`)) : (value === "none" || value === "box-none") && (finalValue = "none", value === "box-none" && rules.push(`${selector}>*${boxNone}`));
      const block = createDeclarationBlock([
        [
          "pointerEvents",
          finalValue
        ]
      ], true);
      rules.push(`${selector}${block}`);
      break;
    }
    default: {
      const block = createDeclarationBlock([
        [
          property,
          value
        ]
      ], important);
      rules.push(`${selector}${block}`);
      break;
    }
  }
  return pseudo?.name === "hover" && (rules = rules.map((r) => `@media (hover) {${r}}`)), rules;
}
const boxNone = createDeclarationBlock([
  [
    "pointerEvents",
    "auto"
  ]
], true), boxOnly = createDeclarationBlock([
  [
    "pointerEvents",
    "none"
  ]
], true);
function isActivePlatform(key) {
  if (!key.startsWith("$platform")) return true;
  const platform = key.slice(10);
  return (
    // web, ios, android
    platform === currentPlatform || // web, native
    platform === "web"
  );
}
function isActiveTheme(key, activeThemeName) {
  if (key.startsWith("$theme-")) return key.slice(7).startsWith(activeThemeName);
}
const webToNativeDynamicExpansion = {}, webToNativeExpansion = {};
const neg1Flex = [
  [
    "flexGrow",
    0
  ],
  [
    "flexShrink",
    1
  ],
  [
    "flexBasis",
    "auto"
  ]
];
function expandStyle(key, value) {
  if (key === "flex") return value === -1 ? neg1Flex : [
    [
      "flexGrow",
      value
    ],
    [
      "flexShrink",
      1
    ],
    [
      "flexBasis",
      getSetting("styleCompat") === "react-native" ? 0 : "auto"
    ]
  ];
  switch (key) {
    case "textAlignVertical":
      return [
        [
          "verticalAlign",
          value === "center" ? "middle" : value
        ]
      ];
    case "writingDirection":
      return [
        [
          "direction",
          value
        ]
      ];
    // some safari-based browsers seem not to support without -webkit prefix
    case "backdropFilter":
      return [
        [
          "backdropFilter",
          value
        ],
        [
          "WebkitBackdropFilter",
          value
        ]
      ];
  }
  if (key in EXPANSIONS) return EXPANSIONS[key].map((key2) => [
    key2,
    value
  ]);
  if (key in webToNativeExpansion) return webToNativeExpansion[key].map((key2) => [
    key2,
    value
  ]);
  if (key in webToNativeDynamicExpansion) return webToNativeDynamicExpansion[key](value);
}
const all = [
  "Top",
  "Right",
  "Bottom",
  "Left"
], horiz = [
  "Right",
  "Left"
], vert = [
  "Top",
  "Bottom"
], xy = [
  "X",
  "Y"
], EXPANSIONS = {
  borderColor: [
    "TopColor",
    "RightColor",
    "BottomColor",
    "LeftColor"
  ],
  borderRadius: [
    "TopLeftRadius",
    "TopRightRadius",
    "BottomRightRadius",
    "BottomLeftRadius"
  ],
  borderWidth: [
    "TopWidth",
    "RightWidth",
    "BottomWidth",
    "LeftWidth"
  ],
  margin: all,
  marginHorizontal: horiz,
  marginVertical: vert,
  overscrollBehavior: xy,
  padding: all,
  paddingHorizontal: horiz,
  paddingVertical: vert,
  ...{
    // react-native only supports borderStyle
    borderStyle: [
      "TopStyle",
      "RightStyle",
      "BottomStyle",
      "LeftStyle"
    ],
    // react-native doesn't support X / Y
    overflow: xy
  }
};
for (const parent in EXPANSIONS) {
  const prefix = parent.slice(0, /[A-Z]/.exec(parent)?.index ?? parent.length);
  EXPANSIONS[parent] = EXPANSIONS[parent].map((k) => `${prefix}${k}`);
}
const cache$2 = /* @__PURE__ */ new WeakMap(), getVariantExtras = (styleState) => {
  if (cache$2.has(styleState)) return cache$2.get(styleState);
  const { props, conf: conf2, context, theme } = styleState;
  let fonts = conf2.fontsParsed;
  context?.language && (fonts = getFontsForLanguage(conf2.fontsParsed, context.language));
  const next = {
    fonts,
    tokens: conf2.tokensParsed,
    theme,
    get fontFamily() {
      return getVariableValue(styleState.fontFamily || styleState.props.fontFamily) || props.fontFamily || getVariableValue(styleState.conf.defaultFont);
    },
    get font() {
      return fonts[this.fontFamily] || (!props.fontFamily || props.fontFamily[0] === "$" ? fonts[styleState.conf.defaultFont] : void 0);
    },
    props
  };
  return cache$2.set(styleState, next), next;
}, fontLanguageCache = /* @__PURE__ */ new WeakMap();
function getFontsForLanguage(fonts, language) {
  if (fontLanguageCache.has(language)) return fontLanguageCache.get(language);
  const next = {
    ...fonts,
    ...Object.fromEntries(Object.entries(language).map(([name, lang]) => {
      if (lang === "default") return [];
      const langKey = `$${name}_${lang}`;
      return [
        `$${name}`,
        fonts[langKey]
      ];
    }))
  };
  return fontLanguageCache.set(language, next), next;
}
const isObj = (x) => x && !Array.isArray(x) && typeof x == "object";
function normalizeStyle$1(style, disableNormalize = false) {
  const res = {};
  for (let key in style) {
    const prop = style[key];
    if (prop == null) continue;
    if (key in pseudoDescriptors || // this should capture all parent-based styles like media, group, etc
    key[0] === "$" && isObj(prop)) {
      res[key] = normalizeStyle$1(prop, disableNormalize);
      continue;
    }
    const value = disableNormalize ? prop : normalizeValueWithProperty(prop, key), out = expandStyle(key, value);
    out ? Object.assign(res, Object.fromEntries(out)) : res[key] = value;
  }
  return fixStyles(res), res;
}
const skipProps = {
  untilMeasured: 1,
  animation: 1,
  space: 1,
  animateOnly: 1,
  disableClassName: 1,
  debug: 1,
  componentName: 1,
  disableOptimization: 1,
  tag: 1,
  style: 1,
  // handled after loop so pseudos set usedKeys and override it if necessary
  group: 1,
  themeInverse: 1,
  animatePresence: 1
};
const propMapper = (key, value, styleState, disabled, map) => {
  if (disabled) return map(key, value);
  if (lastFontFamilyToken = null, key === "elevationAndroid") return;
  const { conf: conf2, styleProps, staticConfig } = styleState;
  if (value === "unset") {
    const unsetVal = conf2.unset?.[key];
    if (unsetVal != null) value = unsetVal;
    else return;
  }
  const { variants } = staticConfig;
  if (!styleProps.noExpand && variants && key in variants) {
    const variantValue = resolveVariants(key, value, styleProps, styleState, "");
    if (variantValue) {
      variantValue.forEach(([key2, value2]) => map(key2, value2));
      return;
    }
  }
  if (styleProps.disableExpandShorthands || key in conf2.shorthands && (key = conf2.shorthands[key]), value != null && (value[0] === "$" ? value = getTokenForKey(key, value, styleProps, styleState) : isVariable(value) && (value = resolveVariableValue(key, value, styleProps.resolveValues))), value != null) {
    key === "fontFamily" && lastFontFamilyToken && (styleState.fontFamily = lastFontFamilyToken);
    const expanded = styleProps.noExpand ? null : expandStyle(key, value);
    if (expanded) {
      const max = expanded.length;
      for (let i = 0; i < max; i++) {
        const [nkey, nvalue] = expanded[i];
        map(nkey, nvalue);
      }
    } else map(key, value);
  }
}, resolveVariants = (key, value, styleProps, styleState, parentVariantKey) => {
  const { staticConfig, conf: conf2, debug } = styleState, { variants } = staticConfig;
  if (!variants) return;
  let variantValue = getVariantDefinition(variants[key], value, conf2);
  if (!variantValue) {
    if (process.env.TAMAGUI_WARN_ON_MISSING_VARIANT === "1" && typeof value != "boolean") {
      const name = staticConfig.componentName || "[UnnamedComponent]";
      console.warn(`No variant found: ${name} has variant "${key}", but no matching value "${value}"`);
    }
    return;
  }
  if (typeof variantValue == "function") {
    const fn = variantValue, extras = getVariantExtras(styleState);
    variantValue = fn(value, extras);
  }
  let fontFamilyResult;
  if (isObj(variantValue)) {
    const fontFamilyUpdate = variantValue.fontFamily || variantValue[conf2.inverseShorthands.fontFamily];
    fontFamilyUpdate && (fontFamilyResult = getFontFamilyFromNameOrVariable(fontFamilyUpdate, conf2), styleState.fontFamily = fontFamilyResult, false), variantValue = resolveTokensAndVariants(key, variantValue, styleProps, styleState, parentVariantKey);
  }
  if (variantValue) {
    const expanded = normalizeStyle$1(variantValue, !!styleProps.noNormalize);
    const next = Object.entries(expanded);
    return fontFamilyResult && fontFamilyResult[0] === "$" && (lastFontFamilyToken = getVariableValue(fontFamilyResult)), next;
  }
};
function getFontFamilyFromNameOrVariable(input, conf2) {
  if (isVariable(input)) {
    const val = variableToFontNameCache.get(input);
    if (val) return val;
    for (const key in conf2.fontsParsed) {
      const familyVariable = conf2.fontsParsed[key].family;
      if (isVariable(familyVariable) && (variableToFontNameCache.set(familyVariable, key), familyVariable === input)) return key;
    }
  } else if (typeof input == "string" && input[0] === "$") return input;
}
const variableToFontNameCache = /* @__PURE__ */ new WeakMap(), resolveTokensAndVariants = (key, value, styleProps, styleState, parentVariantKey) => {
  const { conf: conf2, staticConfig, debug, theme } = styleState, { variants } = staticConfig, res = {};
  for (const _key in value) {
    const subKey = conf2.shorthands[_key] || _key, val = value[_key];
    if (!(!styleProps.noSkip && subKey in skipProps)) {
      if (styleProps.noExpand) res[subKey] = val;
      else if (variants && subKey in variants) {
        if (parentVariantKey && parentVariantKey === key) res[subKey] = // SYNC WITH *1
        val[0] === "$" ? getTokenForKey(subKey, val, styleProps, styleState) : val;
        else {
          var _res, _key2;
          const variantOut = resolveVariants(subKey, val, styleProps, styleState, key);
          if (variantOut) for (const [key2, val2] of variantOut) val2 != null && (key2 in pseudoDescriptors ? ((_res = res)[_key2 = key2] ?? (_res[_key2] = {}), Object.assign(res[key2], val2)) : res[key2] = val2);
        }
        continue;
      }
      if (isVariable(val)) {
        res[subKey] = resolveVariableValue(subKey, val, styleProps.resolveValues);
        continue;
      }
      if (typeof val == "string") {
        const fVal = (
          // SYNC WITH *1
          val[0] === "$" ? getTokenForKey(subKey, val, styleProps, styleState) : val
        );
        res[subKey] = fVal;
        continue;
      }
      if (isObj(val)) {
        var _res1, _subKey;
        const subObject = resolveTokensAndVariants(subKey, val, styleProps, styleState, key);
        (_res1 = res)[_subKey = subKey] ?? (_res1[_subKey] = {}), Object.assign(res[subKey], subObject);
      } else res[subKey] = val;
    }
  }
  return res;
}, tokenCats = [
  "size",
  "color",
  "radius",
  "space",
  "zIndex"
].map((name) => ({
  name,
  spreadName: `...${name}`
}));
function getVariantDefinition(variant, value, conf2) {
  if (!variant) return;
  if (typeof variant == "function") return variant;
  const exact = variant[value];
  if (exact) return exact;
  if (value != null) {
    const { tokensParsed } = conf2;
    for (const { name, spreadName } of tokenCats) if (spreadName in variant && name in tokensParsed && value in tokensParsed[name]) return variant[spreadName];
    const fontSizeVariant = variant["...fontSize"];
    if (fontSizeVariant && conf2.fontSizeTokens.has(value)) return fontSizeVariant;
  }
  return variant[`:${typeof value}`] || variant["..."];
}
const fontShorthand = {
  fontSize: "size",
  fontWeight: "weight"
};
let lastFontFamilyToken = null;
const getTokenForKey = (key, value, styleProps, styleState) => {
  let resolveAs = styleProps.resolveValues || "none";
  if (resolveAs === "none") return value;
  const { theme, conf: conf2 = getConfig(), context, fontFamily, staticConfig } = styleState, themeValue = theme ? theme[value] || theme[value.slice(1)] : void 0, tokensParsed = conf2.tokensParsed;
  let valOrVar, hasSet = false;
  const customTokenAccept = staticConfig?.accept?.[key];
  if (customTokenAccept) {
    const val = themeValue ?? tokensParsed[customTokenAccept][value];
    val != null && (resolveAs = "value", valOrVar = val, hasSet = true);
  }
  if (themeValue) {
    if (resolveAs === "except-theme") return value;
    valOrVar = themeValue, hasSet = true;
  } else {
    if (value in conf2.specificTokens) hasSet = true, valOrVar = conf2.specificTokens[value];
    else {
      switch (key) {
        case "fontFamily": {
          valOrVar = (context?.language ? getFontsForLanguage(conf2.fontsParsed, context.language) : conf2.fontsParsed)[value]?.family || value, lastFontFamilyToken = value, hasSet = true;
          break;
        }
        case "fontSize":
        case "lineHeight":
        case "letterSpacing":
        case "fontWeight": {
          const fam = fontFamily || conf2.defaultFontToken;
          if (fam) {
            const fontsParsed = context?.language ? getFontsForLanguage(conf2.fontsParsed, context.language) : conf2.fontsParsed;
            valOrVar = (fontsParsed[fam] || fontsParsed[conf2.defaultFontToken])?.[fontShorthand[key] || key]?.[value] || value, hasSet = true;
          }
          break;
        }
      }
      for (const cat in tokenCategories) if (key in tokenCategories[cat]) {
        const res = tokensParsed[cat][value];
        res != null && (valOrVar = res, hasSet = true);
      }
    }
    if (!hasSet) {
      const spaceVar = tokensParsed.space[value];
      spaceVar != null && (valOrVar = spaceVar, hasSet = true);
    }
  }
  if (hasSet) {
    const out = resolveVariableValue(key, valOrVar, resolveAs);
    return out;
  }
};
function resolveVariableValue(key, valOrVar, resolveValues) {
  if (resolveValues === "none") return valOrVar;
  if (isVariable(valOrVar)) {
    if (resolveValues === "value") return valOrVar.val;
    const get = valOrVar?.get;
    return typeof get == "function" ? get(resolveValues === "web" ? "web" : void 0) : valOrVar.variable;
  }
  return valOrVar;
}
const sortString = (a, b) => a < b ? -1 : a > b ? 1 : 0;
let conf;
const PROP_SPLIT = "-";
function isValidStyleKey(key, validStyles2, accept) {
  return key in validStyles2 ? true : accept && key in accept;
}
const getSplitStyles = (props, staticConfig, theme, themeName, componentState, styleProps, parentSplitStyles, componentContext, groupContext, elementType, startedUnhydrated, debug) => {
  var _styleState, _viewProps;
  conf = conf || getConfig();
  const animationDriver = componentContext?.animationDriver || conf.animations;
  if (props.passThrough) return null;
  styleProps.isAnimated && animationDriver.isReactNative && !styleProps.noNormalize && (styleProps.noNormalize = "values");
  const { shorthands } = conf, { isHOC, isText, isInput, variants, isReactNative, inlineProps, inlineWhenUnflattened, parentStaticConfig, acceptsClassName } = staticConfig, viewProps = {}, mediaState$1 = styleProps.mediaState || mediaState, shouldDoClasses = acceptsClassName && isWeb && !styleProps.noClass, rulesToInsert = {}, classNames = {};
  let pseudos = null, space = props.space, hasMedia = false, dynamicThemeAccess, pseudoGroups, mediaGroups;
  props.className || "";
  let mediaStylesSeen = 0;
  const validStyles$1 = staticConfig.validStyles || (staticConfig.isText || staticConfig.isInput ? stylePropsText : validStyles);
  const styleState = {
    classNames,
    conf,
    props,
    styleProps,
    componentState,
    staticConfig,
    style: null,
    theme,
    usedKeys: {},
    viewProps,
    context: componentContext,
    debug
  };
  const { asChild } = props, { accept } = staticConfig, { noSkip, disableExpandShorthands, noExpand } = styleProps, { webContainerType } = conf.settings, parentVariants = parentStaticConfig?.variants;
  for (const keyOg in props) {
    let keyInit = keyOg, valInit = props[keyInit];
    if (keyInit === "children") {
      viewProps[keyInit] = valInit;
      continue;
    }
    if (accept) {
      const accepted = accept[keyInit];
      if ((accepted === "style" || accepted === "textStyle") && valInit && typeof valInit == "object") {
        viewProps[keyInit] = getSubStyle(styleState, keyInit, valInit, styleProps.noClass);
        continue;
      }
    }
    if (disableExpandShorthands || keyInit in shorthands && (keyInit = shorthands[keyInit]), keyInit === "className" || asChild && webViewFlexCompatStyles[keyInit] === valInit) continue;
    if (keyInit in skipProps && !noSkip && !isHOC) {
      if (keyInit === "group") {
        const identifier = `t_group_${valInit}`, containerCSS = [
          "continer",
          void 0,
          identifier,
          void 0,
          [
            `.${identifier} { container-name: ${valInit}; container-type: ${webContainerType || "inline-size"}; }`
          ]
        ];
        addStyleToInsertRules(rulesToInsert, containerCSS);
      }
      continue;
    }
    let isValidStyleKeyInit = isValidStyleKey(keyInit, validStyles$1, accept);
    if (staticConfig.isReactNative && keyInit.startsWith("data-")) {
      var _viewProps1;
      keyInit = keyInit.replace("data-", ""), (_viewProps1 = viewProps).dataSet || (_viewProps1.dataSet = {}), viewProps.dataSet[keyInit] = valInit;
      continue;
    }
    if (keyInit === "dataSet") {
      for (const keyInit2 in valInit) viewProps[`data-${hyphenate(keyInit2)}`] = valInit[keyInit2];
      continue;
    }
    if (!noExpand) {
      if (keyInit === "disabled" && valInit === true && (viewProps["aria-disabled"] = true, (elementType === "button" || elementType === "form" || elementType === "input" || elementType === "select" || elementType === "textarea") && (viewProps.disabled = true), !variants?.disabled)) continue;
      if (keyInit === "testID") {
        viewProps[isReactNative ? keyInit : "data-testid"] = valInit;
        continue;
      }
      if (keyInit === "id" || keyInit === "nativeID") {
        viewProps.id = valInit;
        continue;
      }
      let didUseKeyInit = false;
      if (isReactNative) {
        if (keyInit in accessibilityDirectMap || keyInit.startsWith("accessibility")) {
          viewProps[keyInit] = valInit;
          continue;
        }
      } else {
        if (didUseKeyInit = true, keyInit in accessibilityDirectMap) {
          viewProps[accessibilityDirectMap[keyInit]] = valInit;
          continue;
        }
        switch (keyInit) {
          case "accessibilityRole": {
            valInit === "none" ? viewProps.role = "presentation" : viewProps.role = accessibilityRoleToWebRole[valInit] || valInit;
            continue;
          }
          case "accessibilityLabelledBy":
          case "accessibilityFlowTo":
          case "accessibilityControls":
          case "accessibilityDescribedBy": {
            viewProps[`aria-${keyInit.replace("accessibility", "").toLowerCase()}`] = processIDRefList(valInit);
            continue;
          }
          case "accessibilityKeyShortcuts": {
            Array.isArray(valInit) && (viewProps["aria-keyshortcuts"] = valInit.join(" "));
            continue;
          }
          case "accessibilityLiveRegion": {
            viewProps["aria-live"] = valInit === "none" ? "off" : valInit;
            continue;
          }
          case "accessibilityReadOnly": {
            viewProps["aria-readonly"] = valInit, (elementType === "input" || elementType === "select" || elementType === "textarea") && (viewProps.readOnly = true);
            continue;
          }
          case "accessibilityRequired": {
            viewProps["aria-required"] = valInit, (elementType === "input" || elementType === "select" || elementType === "textarea") && (viewProps.required = valInit);
            continue;
          }
          default:
            didUseKeyInit = false;
        }
      }
      if (didUseKeyInit) continue;
    }
    let isVariant = !isValidStyleKeyInit && variants && keyInit in variants;
    const isStyleLikeKey = isValidStyleKeyInit || isVariant;
    let isPseudo = keyInit in validPseudoKeys, isMedia = !isStyleLikeKey && !isPseudo && isMediaKey(keyInit), isMediaOrPseudo = !!(isMedia || isPseudo);
    if (isMediaOrPseudo && keyInit.startsWith("$group-")) {
      const parts = keyInit.split("-"), plen = parts.length;
      if (
        // check if its actually a simple group selector to avoid breaking selectors
        plen === 2 || plen === 3 && pseudoPriorities[parts[parts.length - 1]]
      ) {
        const name = parts[1];
        groupContext && !groupContext?.[name] && (keyInit = keyInit.replace("$group-", "$group-true-"));
      }
    }
    const isStyleProp = isValidStyleKeyInit || isMediaOrPseudo || isVariant && !noExpand;
    if (isStyleProp && (asChild === "except-style" || asChild === "except-style-web")) continue;
    const shouldPassProp = !isStyleProp && isHOC || // is in parent variants
    isHOC && parentVariants && keyInit in parentVariants || inlineProps?.has(keyInit), parentVariant = parentVariants?.[keyInit], isHOCShouldPassThrough = !!(isHOC && (isValidStyleKeyInit || isMediaOrPseudo || parentVariant || keyInit in skipProps)), shouldPassThrough = shouldPassProp || isHOCShouldPassThrough;
    if (shouldPassThrough && (passDownProp(viewProps, keyInit, valInit, isMediaOrPseudo), !isVariant)) continue;
    if (!noSkip && keyInit in skipProps) {
      continue;
    }
    (isText || isInput) && valInit && (keyInit === "fontFamily" || keyInit === shorthands.fontFamily) && valInit in conf.fontsParsed && (styleState.fontFamily = valInit);
    const disablePropMap = isMediaOrPseudo || !isStyleLikeKey;
    if (propMapper(keyInit, valInit, styleState, disablePropMap, (key, val) => {
      const isStyledContextProp = styleProps.styledContextProps && key in styleProps.styledContextProps;
      if (!isHOC && disablePropMap && !isStyledContextProp && !isMediaOrPseudo) {
        viewProps[key] = val;
        return;
      }
      if (val == null) return;
      if (!isHOC && isValidStyleKey(key, validStyles$1, accept)) {
        mergeStyle(styleState, key, val, 1);
        return;
      }
      if (isPseudo = key in validPseudoKeys, isMedia = !isPseudo && isMediaKey(key), isMediaOrPseudo = !!(isMedia || isPseudo), isVariant = variants && key in variants, (inlineProps?.has(key) || false) && (viewProps[key] = props[key] ?? val), styleProps.noExpand && isPseudo || isHOC && (isMediaOrPseudo || parentStaticConfig?.variants?.[keyInit])) {
        passDownProp(viewProps, key, val, isMediaOrPseudo);
        return;
      }
      if (isPseudo) {
        var _pseudos, _key;
        if (!val) return;
        const pseudoStyleObject = getSubStyle(styleState, key, val, styleProps.noClass && true);
        if ((!shouldDoClasses || false) && (pseudos || (pseudos = {}), (_pseudos = pseudos)[_key = key] || (_pseudos[_key] = {}), false)) ;
        const descriptor = pseudoDescriptors[key], isEnter = key === "enterStyle", isExit = key === "exitStyle";
        if (!descriptor) return;
        if (shouldDoClasses && !isExit) {
          const pseudoStyles = getStyleAtomic(pseudoStyleObject, descriptor);
          for (const psuedoStyle of pseudoStyles) {
            const fullKey = `${psuedoStyle[StyleObjectProperty]}${PROP_SPLIT}${descriptor.name}`;
            addStyleToInsertRules(rulesToInsert, psuedoStyle), classNames[fullKey] = psuedoStyle[StyleObjectIdentifier];
          }
        }
        if (!shouldDoClasses || isExit || isEnter) {
          const descriptorKey = descriptor.stateKey || descriptor.name;
          let isDisabled2 = componentState[descriptorKey] === false;
          isExit && (isDisabled2 = !styleProps.isExiting), isEnter && componentState.unmounted === false && (isDisabled2 = true);
          const importance = descriptor.priority;
          for (const pkey in pseudoStyleObject) {
            const val2 = pseudoStyleObject[pkey];
            if (isDisabled2) applyDefaultStyle(pkey, styleState);
            else {
              const curImportance = styleState.usedKeys[pkey] || 0, shouldMerge = importance >= curImportance;
              shouldMerge && mergeStyle(styleState, pkey, val2, importance);
            }
          }
          if (!isDisabled2) for (const key2 in val) {
            const k = shorthands[key2] || key2;
            styleState.usedKeys[k] = Math.max(importance, styleState.usedKeys[k] || 0);
          }
        }
        return;
      }
      if (isMedia) {
        if (!val) return;
        const hasSpace = val.space, mediaKeyShort = key.slice(isMedia == "theme" ? 7 : 1);
        if (hasMedia || (hasMedia = true), (hasSpace || !shouldDoClasses || styleProps.willBeAnimated) && ((!hasMedia || typeof hasMedia == "boolean") && (hasMedia = /* @__PURE__ */ new Set()), hasMedia.add(mediaKeyShort)), isMedia === "platform" && !isActivePlatform(key)) return;
        const priority = mediaStylesSeen;
        if (mediaStylesSeen += 1, shouldDoClasses) {
          const mediaStyle = getSubStyle(styleState, key, val, false);
          if (hasSpace && (delete mediaStyle.space, mediaState$1[mediaKeyShort])) {
            const importance = getMediaImportanceIfMoreImportant(mediaKeyShort, "space", styleState, true);
            importance && (space = val.space, styleState.usedKeys.space = importance, false);
          }
          const mediaStyles = getCSSStylesAtomic(mediaStyle);
          for (const style of mediaStyles) {
            const property = style[StyleObjectProperty], isSubStyle = property[0] === "$";
            if (isSubStyle && !isActivePlatform(property)) continue;
            const out = createMediaStyle(style, mediaKeyShort, mediaQueryConfig, isMedia, false, priority);
            const subKey = isSubStyle ? style[2] : "", fullKey = `${style[StyleObjectProperty]}${subKey}${PROP_SPLIT}${mediaKeyShort}${style[StyleObjectPseudo] || ""}`;
            addStyleToInsertRules(rulesToInsert, out), classNames[fullKey] = out[StyleObjectIdentifier];
          }
        } else {
          let mergeMediaStyle = function(key2, val2) {
            var _styleState4;
            (_styleState4 = styleState).style || (_styleState4.style = {}), mergeMediaByImportance(styleState, mediaKeyShort, key2, val2, mediaState$1[mediaKeyShort], importanceBump) && key2 === "fontFamily" && (styleState.fontFamily = mediaStyle.fontFamily);
          };
          const isThemeMedia = isMedia === "theme", isGroupMedia = isMedia === "group";
          if (!isThemeMedia && !(isMedia === "platform") && !isGroupMedia) {
            if (!mediaState$1[mediaKeyShort]) {
              return;
            }
          }
          const mediaStyle = getSubStyle(styleState, key, val, true);
          let importanceBump = 0;
          if (isThemeMedia) {
            if (dynamicThemeAccess = true, isIos && getSetting("fastSchemeChange")) {
              var _styleState3;
              (_styleState3 = styleState).style || (_styleState3.style = {});
              const scheme = mediaKeyShort, oppositeScheme = getOppositeScheme(mediaKeyShort);
              for (const subKey in mediaStyle) {
                let val2 = extractValueFromDynamic(mediaStyle[subKey], scheme);
                const oppositeVal = extractValueFromDynamic(styleState.style[subKey], oppositeScheme);
                mediaStyle[subKey] = getDynamicVal({
                  scheme,
                  val: val2,
                  oppositeVal
                }), mergeStyle(styleState, subKey, mediaStyle[subKey], priority);
              }
            } else if (!(themeName === mediaKeyShort || themeName.startsWith(mediaKeyShort))) return;
          } else if (isGroupMedia) {
            const groupInfo = getGroupPropParts(mediaKeyShort), groupName = groupInfo.name, groupState = groupContext?.[groupName]?.state, groupPseudoKey = groupInfo.pseudo, groupMediaKey = groupInfo.media;
            if (!groupState) {
              pseudoGroups || (pseudoGroups = /* @__PURE__ */ new Set());
              return;
            }
            const componentGroupState = componentState.group?.[groupName];
            if (groupMediaKey) {
              mediaGroups || (mediaGroups = /* @__PURE__ */ new Set()), mediaGroups.add(groupMediaKey);
              const mediaState2 = componentGroupState?.media;
              let isActive = mediaState2?.[groupMediaKey];
              if (!mediaState2 && groupState.layout && (isActive = mediaKeyMatch(groupMediaKey, groupState.layout)), !isActive) {
                for (const pkey in mediaStyle) applyDefaultStyle(pkey, styleState);
                return;
              }
              importanceBump = 2;
            }
            if (groupPseudoKey) {
              pseudoGroups || (pseudoGroups = /* @__PURE__ */ new Set()), pseudoGroups.add(groupName);
              const componentGroupPseudoState = (componentGroupState || // fallback to context initially
              groupContext?.[groupName].state)?.pseudo, isActive = componentGroupPseudoState?.[groupPseudoKey], priority2 = pseudoPriorities[groupPseudoKey];
              if (!isActive) {
                for (const pkey in mediaStyle) applyDefaultStyle(pkey, styleState);
                return;
              }
              importanceBump = priority2;
            }
          }
          for (const subKey in mediaStyle) {
            if (subKey === "space") {
              space = valInit.space;
              continue;
            }
            if (subKey[0] === "$") {
              if (!isActivePlatform(subKey) || !isActiveTheme(subKey, themeName)) continue;
              for (const subSubKey in mediaStyle[subKey]) mergeMediaStyle(subSubKey, mediaStyle[subKey][subSubKey]);
            } else mergeMediaStyle(subKey, mediaStyle[subKey]);
          }
        }
        return;
      }
      if (!isVariant) {
        if (isStyledContextProp) return;
        viewProps[key] = val;
      }
    }), false) ;
  }
  if (!(styleProps.noNormalize === false) && (styleState.style && (fixStyles(styleState.style), !styleProps.noExpand && !styleProps.noMergeStyle && isWeb && (!isReactNative || !animationDriver.supportsCSS) && styleToCSS(styleState.style)), styleState.flatTransforms && ((_styleState = styleState).style || (_styleState.style = {}), mergeFlatTransforms(styleState.style, styleState.flatTransforms)), parentSplitStyles)) ;
  if (!styleProps.noNormalize && !staticConfig.isReactNative && !staticConfig.isHOC && (!styleProps.isAnimated || animationDriver.supportsCSS) && Array.isArray(styleState.style?.transform) && (styleState.style.transform = transformsToString(styleState.style.transform)), !styleProps.noMergeStyle && styleState.style && shouldDoClasses) {
    let retainedStyles;
    if (!styleState.style.$$css) {
      const atomic = getCSSStylesAtomic(styleState.style);
      for (const atomicStyle of atomic) {
        const [key, value, identifier] = atomicStyle, isAnimatedAndAnimateOnly = styleProps.isAnimated && styleProps.noClass && props.animateOnly?.includes(key), nonAnimatedAnimateOnly = !isAnimatedAndAnimateOnly && !styleProps.isAnimated && props.animateOnly?.includes(key);
        isAnimatedAndAnimateOnly ? (retainedStyles || (retainedStyles = {}), retainedStyles[key] = styleState.style[key]) : nonAnimatedAnimateOnly ? (retainedStyles || (retainedStyles = {}), retainedStyles[key] = value, true) : (addStyleToInsertRules(rulesToInsert, atomicStyle), classNames[key] = identifier);
      }
      styleState.style = retainedStyles || {};
    }
  }
  if (isReactNative) viewProps.tabIndex === 0 && ((_viewProps = viewProps).accessible ?? (_viewProps.accessible = true));
  else if (viewProps.tabIndex == null) {
    const isFocusable = viewProps.focusable ?? viewProps.accessible;
    viewProps.focusable && delete viewProps.focusable;
    const role = viewProps.role;
    isFocusable === false && (viewProps.tabIndex = "-1"), // These native elements are focusable by default
    elementType === "a" || elementType === "button" || elementType === "input" || elementType === "select" || elementType === "textarea" ? (isFocusable === false || props.accessibilityDisabled === true) && (viewProps.tabIndex = "-1") : (
      // These roles are made focusable by default
      (role === "button" || role === "checkbox" || role === "link" || role === "radio" || // @ts-expect-error (consistent with RNW)
      role === "textbox" || role === "switch") && isFocusable !== false && (viewProps.tabIndex = "0")
    ), isFocusable && (viewProps.tabIndex = "0", delete viewProps.focusable);
  }
  const styleProp = props.style;
  if (!styleProps.noMergeStyle && styleProp) if (isHOC) viewProps.style = normalizeStyle(styleProp);
  else {
    const isArray = Array.isArray(styleProp), len = isArray ? styleProp.length : 1;
    for (let i = 0; i < len; i++) {
      var _styleState2;
      const style = isArray ? styleProp[i] : styleProp;
      style && (style.$$css ? Object.assign(styleState.classNames, style) : ((_styleState2 = styleState).style || (_styleState2.style = {}), Object.assign(styleState.style, normalizeStyle(style))));
    }
  }
  const result = {
    space,
    hasMedia,
    fontFamily: styleState.fontFamily,
    viewProps,
    style: styleState.style,
    pseudos,
    classNames,
    rulesToInsert,
    dynamicThemeAccess,
    pseudoGroups,
    mediaGroups
  }, asChildExceptStyleLike = asChild === "except-style" || asChild === "except-style-web";
  if (!styleProps.noMergeStyle && !asChildExceptStyleLike) {
    const style = styleState.style;
    {
      let fontFamily = isText || isInput ? styleState.fontFamily || staticConfig.defaultProps?.fontFamily : null;
      fontFamily && fontFamily[0] === "$" && (fontFamily = fontFamily.slice(1));
      const fontFamilyClassName = fontFamily ? `font_${fontFamily}` : "", groupClassName = props.group ? `t_group_${props.group}` : "", componentNameFinal = props.componentName || staticConfig.componentName, componentClassName = props.asChild || !componentNameFinal ? "" : `is_${componentNameFinal}`;
      let classList = [];
      componentClassName && classList.push(componentClassName), fontFamilyClassName && classList.push(fontFamilyClassName), classNames && classList.push(Object.values(classNames).join(" ")), groupClassName && classList.push(groupClassName), props.className && classList.push(props.className);
      const finalClassName = classList.join(" ");
      if (styleProps.isAnimated && isReactNative) style && (viewProps.style = style), animationDriver?.supportsCSS && (viewProps.className = finalClassName);
      else if (isReactNative) {
        let cnStyles;
        for (const name of finalClassName.split(" ")) cnStyles || (cnStyles = {
          $$css: true
        }), cnStyles[name] = name;
        viewProps.style = cnStyles ? [
          ...Array.isArray(style) ? style : [
            style
          ],
          cnStyles
        ] : [
          style
        ];
      } else finalClassName && (viewProps.className = finalClassName), style && (viewProps.style = style);
    }
  }
  return result;
};
function mergeFlatTransforms(target, flatTransforms) {
  Object.entries(flatTransforms).sort(([a], [b]) => sortString(a, b)).forEach(([key, val]) => {
    mergeTransform(target, key, val, true);
  });
}
function mergeStyle(styleState, key, val, importance, disableNormalize = false) {
  var _styleState;
  const { viewProps, styleProps, staticConfig, usedKeys } = styleState;
  if (!((usedKeys[key] || 0) > importance)) if (key in stylePropsTransform) (_styleState = styleState).flatTransforms || (_styleState.flatTransforms = {}), usedKeys[key] = importance, styleState.flatTransforms[key] = val;
  else {
    var _styleState1;
    const out = !disableNormalize && !styleProps.noNormalize ? normalizeValueWithProperty(val, key) : val;
    staticConfig.accept && key in staticConfig.accept ? viewProps[key] = out : ((_styleState1 = styleState).style || (_styleState1.style = {}), usedKeys[key] = importance, styleState.style[key] = // if you dont do this you'll be passing props.transform arrays directly here and then mutating them
    // if theres any flatTransforms later, causing issues (mutating props is bad, in strict mode styles get borked)
    key === "transform" && Array.isArray(out) ? [
      ...out
    ] : out);
  }
}
const getSubStyle = (styleState, subKey, styleIn, avoidMergeTransform) => {
  const { staticConfig, conf: conf2, styleProps } = styleState, styleOut = {};
  for (let key in styleIn) {
    const val = styleIn[key];
    key = conf2.shorthands[key] || key, !(!staticConfig.isHOC && key in skipProps && !styleProps.noSkip) && propMapper(key, val, styleState, false, (skey, sval) => {
      skey in validPseudoKeys && (sval = getSubStyle(styleState, skey, sval, avoidMergeTransform)), !avoidMergeTransform && skey in stylePropsTransform ? mergeTransform(styleOut, skey, sval) : styleOut[skey] = styleProps.noNormalize ? sval : normalizeValueWithProperty(sval, key);
    });
  }
  if (!avoidMergeTransform) {
    if (Array.isArray(styleOut.transform)) {
      const parentTransform = styleState.style?.transform;
      parentTransform && (styleOut.transform = [
        ...parentTransform,
        ...styleOut.transform
      ]);
    }
    styleState.flatTransforms && mergeFlatTransforms(styleOut, styleState.flatTransforms);
  }
  return styleProps.noNormalize || fixStyles(styleOut), styleOut;
}, useInsertEffectCompat = React.useInsertionEffect || useIsomorphicLayoutEffect, useSplitStyles = (a, b, c, d, e, f, g, h, i, j, k, l) => {
  const res = getSplitStyles(a, b, c, d, e, f, g, h, i, j, k, l);
  return useInsertEffectCompat(() => {
    res && insertStyleRules(res.rulesToInsert);
  }, [
    res?.rulesToInsert
  ]), res;
};
function addStyleToInsertRules(rulesToInsert, styleObject) {
  {
    const identifier = styleObject[StyleObjectIdentifier];
    shouldInsertStyleRules(identifier) && (updateRules(identifier, styleObject[StyleObjectRules]), rulesToInsert[identifier] = styleObject);
  }
}
function processIDRefList(idRefList) {
  return Array.isArray(idRefList) ? idRefList.join(" ") : idRefList;
}
const defaultColor = process.env.TAMAGUI_DEFAULT_COLOR || "rgba(0,0,0,0)", animatableDefaults = {
  ...Object.fromEntries(Object.entries(tokenCategories.color).map(([k, v]) => [
    k,
    defaultColor
  ])),
  opacity: 1,
  scale: 1,
  rotate: "0deg",
  rotateY: "0deg",
  rotateX: "0deg",
  x: 0,
  y: 0,
  borderRadius: 0
}, lowercaseHyphenate = (match) => `-${match.toLowerCase()}`, hyphenate = (str) => str.replace(/[A-Z]/g, lowercaseHyphenate), mergeTransform = (obj, key, val, backwards = false) => {
  var _obj;
  typeof obj.transform != "string" && ((_obj = obj).transform || (_obj.transform = []), obj.transform[backwards ? "unshift" : "push"]({
    [mapTransformKeys[key] || key]: val
  }));
}, mapTransformKeys = {
  x: "translateX",
  y: "translateY"
}, accessibilityRoleToWebRole = {
  adjustable: "slider",
  header: "heading",
  image: "img",
  link: "link",
  none: "presentation",
  summary: "region"
};
function passDownProp(viewProps, key, val, shouldMergeObject = false) {
  if (shouldMergeObject) {
    const next = {
      ...viewProps[key],
      ...val
    };
    delete viewProps[key], viewProps[key] = next;
  } else viewProps[key] = val;
}
function mergeMediaByImportance(styleState, mediaKey, key, value, isSizeMedia, importanceBump, debugProp) {
  styleState.usedKeys;
  let importance = getMediaImportanceIfMoreImportant(mediaKey, key, styleState, isSizeMedia);
  if (importanceBump && (importance = (importance || 0) + importanceBump), importance === null) return false;
  if (key in pseudoDescriptors) {
    const descriptor = pseudoDescriptors[key], descriptorKey = descriptor.stateKey || descriptor.name;
    if (styleState.componentState[descriptorKey] === false) return false;
    for (const subKey in value) mergeStyle(styleState, subKey, value[subKey], importance);
  } else mergeStyle(styleState, key, value, importance);
  return true;
}
function normalizeStyle(style) {
  const out = {};
  for (const key in style) {
    const val = style[key];
    key in stylePropsTransform ? mergeTransform(out, key, val) : out[key] = normalizeValueWithProperty(val, key);
  }
  return Array.isArray(out.transform) && (out.transform = transformsToString(out.transform)), fixStyles(out), out;
}
function applyDefaultStyle(pkey, styleState) {
  const defaultValues = animatableDefaults[pkey];
  defaultValues != null && !(pkey in styleState.usedKeys) && (!styleState.style || !(pkey in styleState.style)) && mergeStyle(styleState, pkey, defaultValues, 1);
}
const mergeProps = (a, b, inverseShorthands2) => {
  const out = {};
  for (const key in a) mergeProp(out, a, b, key);
  if (b) for (const key in b) mergeProp(out, b, void 0, key);
  if (b && Object.keys(b).length > 0 && Object.keys(b).some((key) => (key in pseudoDescriptors || key === "variant") && a && key in a && key in out)) {
    const reordered = {};
    for (const key in b) (key in pseudoDescriptors || key === "variant") && key in out && (reordered[key] = out[key]);
    for (const key in out) key in reordered || (reordered[key] = out[key]);
    return reordered;
  }
  return out;
};
function mergeProp(out, a, b, key, inverseShorthands2) {
  const longhand = null, val = a[key];
  if (key in pseudoDescriptors || mediaKeys.has(key)) {
    out[key] = {
      ...out[key],
      ...val
    };
    return;
  }
  b && (key in b || longhand) || (out[key] = val);
}
const hooks = {};
function setupHooks(next) {
  Object.assign(hooks, next);
}
const setElementProps = (node) => {
  hooks.setElementProps?.(node);
};
const subscribeToContextGroup = (props) => {
  const { pseudoGroups, mediaGroups, groupContext } = props;
  if (pseudoGroups || mediaGroups) {
    const disposables = /* @__PURE__ */ new Set();
    if (pseudoGroups) for (const name of [
      ...pseudoGroups
    ]) disposables.add(createGroupListener(name, props));
    if (mediaGroups) for (const name of [
      ...mediaGroups
    ]) disposables.add(createGroupListener(name, props));
    return () => {
      disposables.forEach((d) => d());
    };
  }
}, createGroupListener = (name, { setStateShallow, pseudoGroups, mediaGroups, groupContext }) => {
  const parent = groupContext?.[name];
  if (!parent) return () => {
  };
  const dispose2 = parent.subscribe(({ layout, pseudo }) => {
    setStateShallow((prev) => {
      var _group;
      let didChange = false;
      const group = prev.group?.[name] || {
        pseudo: {},
        media: {}
      };
      if (pseudo && pseudoGroups?.has(name)) (_group = group).pseudo || (_group.pseudo = {}), mergeIfNotShallowEqual(group.pseudo, pseudo) !== group.pseudo && (Object.assign(group.pseudo, pseudo), didChange = true);
      else if (layout && mediaGroups) {
        var _group1;
        (_group1 = group).media || (_group1.media = {});
        const mediaState2 = getMediaState(mediaGroups, layout), next = mergeIfNotShallowEqual(group.media, mediaState2);
        next !== group.media && (Object.assign(group.media, next), didChange = true);
      }
      return didChange ? {
        group: {
          ...prev.group,
          [name]: group
        }
      } : prev;
    });
  });
  return () => {
    dispose2(), setStateShallow({
      group: {}
    });
  };
};
const cache$1 = /* @__PURE__ */ new Map();
let curKeys, curState;
const emptyObject$3 = {};
function getThemeProxied(_props, _state, _keys) {
  if (!_state?.theme) return emptyObject$3;
  if (curKeys = _keys, curState = _state, cache$1.has(curState.theme)) return cache$1.get(curState.theme);
  getConfig();
  function track(key) {
    curKeys && (curKeys.current || (curKeys.current = /* @__PURE__ */ new Set()), curKeys.current.add(key), false);
  }
  const proxied = Object.fromEntries(Object.entries(_state.theme).flatMap(([key, value]) => {
    const proxied2 = {
      ...value,
      get val() {
        return globalThis.tamaguiAvoidTracking || track(key), value.val;
      },
      get(platform) {
        if (!curState) return;
        const outVal = getVariable(value), { name, scheme, inverses } = curState;
        return outVal;
      }
    };
    return [
      [
        key,
        proxied2
      ],
      [
        `$${key}`,
        proxied2
      ]
    ];
  }));
  return cache$1.set(_state.theme, proxied), proxied;
}
const ThemeStateContext = reactExports.createContext(""), allListeners = /* @__PURE__ */ new Map(), listenersByParent = {}, HasRenderedOnce = /* @__PURE__ */ new WeakMap(), HadTheme = /* @__PURE__ */ new WeakMap(), PendingUpdate = /* @__PURE__ */ new Map(), states = /* @__PURE__ */ new Map(), localStates = /* @__PURE__ */ new Map();
const getThemeState = (id) => states.get(id);
let themes = null;
const useThemeState = (props, isRoot = false, keys) => {
  var _listenersByParent, _parentId;
  const { disable } = props, parentId = reactExports.useContext(ThemeStateContext);
  if (!parentId && !isRoot) throw new Error(MISSING_THEME_MESSAGE);
  if (disable) return states.get(parentId) || {
    id: "",
    name: "light",
    theme: getConfig().themes.light,
    inverses: 0
  };
  const id = reactExports.useId(), subscribe2 = reactExports.useCallback((cb) => ((_listenersByParent = listenersByParent)[_parentId = parentId] || (_listenersByParent[_parentId] = /* @__PURE__ */ new Set()), listenersByParent[parentId].add(id), allListeners.set(id, () => {
    PendingUpdate.set(id, true), cb();
  }), () => {
    allListeners.delete(id), listenersByParent[parentId].delete(id), localStates.delete(id), states.delete(id), PendingUpdate.delete(id);
  }), [
    id,
    parentId
  ]), propsKey = getPropsKey(props), getSnapshot = () => {
    let local = localStates.get(id);
    const needsUpdate = props.passThrough ? false : isRoot || props.name === "light" || props.name === "dark" || props.name === null ? true : HasRenderedOnce.get(keys) ? keys?.current?.size ? true : props.needsUpdate?.() : true, [rerender, next] = getNextState(local, props, propsKey, isRoot, id, parentId, needsUpdate, PendingUpdate.get(id));
    return PendingUpdate.delete(id), (!local || rerender) && (local = {
      ...next
    }, localStates.set(id, local)), Object.assign(local, next), local.id = id, states.set(id, next), local;
  };
  const state = reactExports.useSyncExternalStore(subscribe2, getSnapshot, getSnapshot);
  return useIsomorphicLayoutEffect(() => {
    if (!HasRenderedOnce.get(keys)) {
      HasRenderedOnce.set(keys, true);
      return;
    }
    if (!propsKey) {
      HadTheme.get(keys) && scheduleUpdate(id), HadTheme.set(keys, false);
      return;
    }
    scheduleUpdate(id), HadTheme.set(keys, true);
  }, [
    keys,
    propsKey
  ]), state;
}, getNextState = (lastState, props, propsKey, isRoot = false, id, parentId, needsUpdate, pendingUpdate) => {
  const { debug } = props, parentState = states.get(parentId);
  if (props.passThrough) return [
    false,
    lastState || parentState || {
      name: ""
    }
  ];
  themes || (themes = getConfig().themes);
  const name = !propsKey && (!lastState || !lastState?.isNew) ? null : getNewThemeName(parentState?.name, props, pendingUpdate === "force" ? true : !!needsUpdate), isSameAsParent = parentState && (!name || name === parentState.name), shouldRerender = !!(needsUpdate && (pendingUpdate || lastState?.name !== parentState?.name));
  if (isSameAsParent) return [
    shouldRerender,
    {
      ...parentState,
      isNew: false
    }
  ];
  if (!name) {
    const next = lastState ?? parentState;
    if (!next) throw new Error(MISSING_THEME_MESSAGE);
    return shouldRerender ? [
      true,
      {
        ...parentState || lastState
      }
    ] : [
      false,
      next
    ];
  }
  const scheme = getScheme(name), parentInverses = parentState?.inverses ?? 0, isInverse = parentState && scheme !== parentState.scheme, inverses = parentInverses + (isInverse ? 1 : 0), nextState = {
    id,
    name,
    theme: themes[name],
    scheme,
    parentId,
    parentName: parentState?.name,
    inverses,
    isInverse,
    isNew: true
  };
  if (pendingUpdate !== "force" && lastState && lastState.name === name) return [
    false,
    nextState
  ];
  const shouldAvoidRerender = pendingUpdate !== "force" && lastState && !needsUpdate && nextState.name === lastState.name;
  return shouldAvoidRerender ? [
    false,
    nextState
  ] : [
    true,
    nextState
  ];
};
function scheduleUpdate(id) {
  const queue = [
    id
  ], visited = /* @__PURE__ */ new Set();
  for (; queue.length; ) {
    const parent = queue.shift(), children = listenersByParent[parent];
    if (children) for (const childId of children) visited.has(childId) || (visited.add(childId), queue.push(childId));
  }
  visited.forEach((childId) => {
    allListeners.get(childId)?.();
  });
}
const validSchemes = {
  light: "light",
  dark: "dark"
};
function getScheme(name) {
  return validSchemes[name.split("_")[0]];
}
function getNewThemeName(parentName = "", { name, reset, componentName, inverse, debug }, forceUpdate = false) {
  if (name && reset) throw new Error("❌004");
  const { themes: themes2 } = getConfig();
  if (reset) {
    if (parentName === "light" || parentName === "dark") return parentName === "light" ? "dark" : "light";
    const lastPartIndex = parentName.lastIndexOf("_"), name2 = lastPartIndex <= 0 ? parentName : parentName.slice(lastPartIndex), scheme = parentName.slice(0, lastPartIndex);
    return themes2[name2] ? name2 : scheme;
  }
  const parentParts = parentName.split("_"), lastName = parentParts[parentParts.length - 1];
  lastName && lastName[0].toLowerCase() !== lastName[0] && parentParts.pop();
  const subNames = [
    name && componentName ? `${name}_${componentName}` : void 0,
    name,
    componentName
  ].filter(Boolean);
  let found = null;
  const max = parentParts.length;
  for (let i = 0; i <= max; i++) {
    const base = (i === 0 ? parentParts : parentParts.slice(0, -i)).join("_");
    for (const subName of subNames) {
      const potential = base ? `${base}_${subName}` : subName;
      if (potential in themes2) {
        found = potential;
        break;
      }
    }
    if (found) break;
  }
  if (inverse) {
    found || (found = parentName);
    const scheme = found.split("_")[0];
    found = found.replace(new RegExp(`^${scheme}`), scheme === "light" ? "dark" : "light");
  }
  return !forceUpdate && found === parentName && // if its a scheme only sub-theme, we always consider it "new" because it likely inverses
  // and we want to avoid reparenting
  !validSchemes[found] ? null : found;
}
const getPropsKey = ({ name, reset, inverse, forceClassName, componentName }) => `${name || ""}${inverse || ""}${reset || ""}${forceClassName || ""}${componentName || ""}`, hasThemeUpdatingProps = (props) => "inverse" in props || "name" in props || "reset" in props || "forceClassName" in props;
const useTheme = (props = {}) => {
  const [theme] = useThemeWithState(props);
  return theme;
}, useThemeWithState = (props, isRoot = false) => {
  const keys = reactExports.useRef(null), themeState = useThemeState(props, isRoot, keys);
  return [
    props.passThrough ? {} : getThemeProxied(props, themeState, keys),
    themeState
  ];
};
const ClientOnlyContext = reactExports.createContext(false), ClientOnly = ({ children, enabled }) => {
  const existingValue = reactExports.useContext(ClientOnlyContext);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ClientOnlyContext.Provider, {
    value: enabled ?? existingValue,
    children
  });
};
const useIsClientOnly = () => reactExports.useContext(ClientOnlyContext);
function useDidFinishSSR() {
  return reactExports.useContext(ClientOnlyContext) ? true : reactExports.useSyncExternalStore(subscribe, () => true, () => false);
}
const subscribe = () => () => {
};
const Theme = reactExports.forwardRef(function(props, ref) {
  if (props.disable) return props.children;
  const { passThrough } = props, isRoot = !!props._isRoot, [_, themeState] = useThemeWithState(props, isRoot);
  let finalChildren = props["disable-child-theme"] ? reactExports.Children.map(props.children, (child) => passThrough ? child : reactExports.cloneElement(child, {
    "data-disable-theme": true
  })) : props.children;
  if (ref) try {
    React.Children.only(finalChildren), finalChildren = reactExports.cloneElement(finalChildren, {
      ref
    });
  } catch {
  }
  const stateRef = reactExports.useRef({
    hasEverThemed: false
  });
  return getThemedChildren(themeState, finalChildren, props, isRoot, stateRef, passThrough);
});
Theme.avoidForwardRef = true;
function getThemedChildren(themeState, children, props, isRoot = false, stateRef, passThrough = false) {
  const { shallow, forceClassName } = props, state = stateRef.current;
  let shouldRenderChildrenWithTheme = state.hasEverThemed || themeState.isNew || isRoot || hasThemeUpdatingProps(props);
  if (!shouldRenderChildrenWithTheme) return children;
  children = /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeStateContext.Provider, {
    value: themeState.id,
    children
  });
  const { isInverse, name } = themeState, requiresExtraWrapper = isInverse || forceClassName;
  if (state.hasEverThemed || (state.hasEverThemed = true), (requiresExtraWrapper || // if the theme is exactly dark or light, its likely to change between dark/light
  // and that would require wrapping which would re-parent, so to avoid re-parenting do this
  themeState.name === "dark" || themeState.name === "light") && (state.hasEverThemed = "wrapped"), shallow && themeState.parentId) {
    const parentState = getThemeState(themeState.isNew ? themeState.id : themeState.parentId);
    if (!parentState) throw new Error("‼️010");
    children = reactExports.Children.toArray(children).map((child) => reactExports.isValidElement(child) ? passThrough ? child : reactExports.cloneElement(child, void 0, /* @__PURE__ */ jsxRuntimeExports.jsx(Theme, {
      name: parentState.name,
      children: child.props.children
    })) : child);
  }
  if (forceClassName === false) return children;
  {
    const baseStyle = props.contain ? inertContainedStyle : inertStyle, { className = "", color } = passThrough ? {} : getThemeClassNameAndColor(themeState, props, isRoot);
    if (children = /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
      className: `${className} is_Theme`,
      style: passThrough ? baseStyle : {
        color,
        ...baseStyle
      },
      children
    }), state.hasEverThemed === "wrapped") {
      const className2 = !passThrough && requiresExtraWrapper ? `${isInverse ? name.startsWith("light") ? "t_light is_inversed" : name.startsWith("dark") ? "t_dark is_inversed" : "" : ""} ` : "";
      children = /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
        style: baseStyle,
        className: className2,
        children
      });
    }
    return children;
  }
}
const inertStyle = {
  display: "contents"
}, inertContainedStyle = {
  display: "contents",
  contain: "strict"
}, empty$1 = {
  className: "",
  color: void 0
};
function getThemeClassNameAndColor(themeState, props, isRoot = false) {
  if (!themeState.isNew && !props.forceClassName) return empty$1;
  const themeColor = themeState?.theme && themeState.isNew ? variableToString(themeState.theme.color) : "", maxInverses = getSetting("maxDarkLightNesting") || 3, themeClassName = themeState.inverses >= maxInverses ? themeState.name : themeState.name.replace(schemePrefix, ""), className = `${isRoot ? "" : "t_sub_theme"} t_${themeClassName}`;
  return {
    color: themeColor,
    className
  };
}
const schemePrefix = /^(dark|light)_/;
function themeable(Component, staticConfig, optimize = false) {
  const withTheme = React.forwardRef(function(props, ref) {
    const { themeInverse, theme, componentName, themeReset, ...rest } = props;
    let overriddenContextProps;
    const context = staticConfig?.context;
    if (context) for (const key in context.props) {
      const val = props[key];
      val !== void 0 && (overriddenContextProps || (overriddenContextProps = {}), overriddenContextProps[key] = val);
    }
    const element = (
      // @ts-expect-error its ok
      /* @__PURE__ */ jsxRuntimeExports.jsx(Component, {
        ref,
        ...rest,
        "data-disable-theme": true
      })
    );
    let filteredProps = null;
    const compName = componentName || staticConfig?.componentName;
    if (compName && (filteredProps || (filteredProps = {}), filteredProps.componentName = compName), "debug" in props && (filteredProps || (filteredProps = {}), filteredProps.debug = props.debug), "theme" in props && (filteredProps || (filteredProps = {}), filteredProps.name = props.theme), "themeInverse" in props && (filteredProps || (filteredProps = {}), filteredProps.inverse = props.themeInverse), "themeReset" in props && (filteredProps || (filteredProps = {}), filteredProps.reset = themeReset), optimize && !filteredProps) return element;
    let contents = /* @__PURE__ */ jsxRuntimeExports.jsx(Theme, {
      "disable-child-theme": true,
      ...filteredProps,
      children: element
    });
    if (context) {
      const Provider = context.Provider, contextValue = React.useContext(context);
      contents = /* @__PURE__ */ jsxRuntimeExports.jsx(Provider, {
        ...contextValue,
        ...overriddenContextProps,
        children: contents
      });
    }
    return contents;
  });
  return withTheme.displayName = `Themed(${Component?.displayName || Component?.name || "Anonymous"})`, withTheme;
}
function getStyleTags(styles) {
  if (IS_REACT_19 && styles.length) return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
    children: styles.map((styleObject) => {
      const identifier = styleObject[StyleObjectIdentifier];
      return /* @__PURE__ */ jsxRuntimeExports.jsx("style", {
        href: `t_${identifier}`,
        precedence: "default",
        children: styleObject[StyleObjectRules].join(`
`)
      }, identifier);
    })
  });
}
const useComponentState = (props, animationDriver, staticConfig, config) => {
  const isHydrated = useDidFinishSSR(), needsHydration = !useIsClientOnly(), [startedUnhydrated] = reactExports.useState(needsHydration && !isHydrated), useAnimations = animationDriver?.useAnimations, { isHOC } = staticConfig, stateRef = reactExports.useRef({}), hasAnimationProp = !!(!isHOC && "animation" in props || props.style && hasAnimatedStyleValue(props.style)), supportsCSS = animationDriver?.supportsCSS, curStateRef = stateRef.current;
  !needsHydration && hasAnimationProp && (curStateRef.hasAnimated = true);
  const willBeAnimatedClient = !!(!!(hasAnimationProp && !isHOC && useAnimations) || curStateRef.hasAnimated), willBeAnimated = !isServer && willBeAnimatedClient;
  willBeAnimated && !curStateRef.hasAnimated && (curStateRef.hasAnimated = true);
  const { disableClassName } = props, presence = !isHOC && willBeAnimated && props.animatePresence !== false && animationDriver?.usePresence?.() || null, presenceState = presence?.[2], isExiting = presenceState?.isPresent === false, isEntering = presenceState?.isPresent === true && presenceState.initial !== false, hasEnterStyle = !!props.enterStyle, hasAnimationThatNeedsHydrate = hasAnimationProp && !isHydrated && (animationDriver?.isReactNative || !supportsCSS), initialState = !isHOC && (hasEnterStyle || isEntering || hasAnimationThatNeedsHydrate || // disableClassName doesnt work server side, only client, so needs hydrate
  // this is just for a better ux, supports css variables for light/dark, media queries, etc
  disableClassName) ? (
    // on the very first render we switch all spring animation drivers to css rendering
    // this is because we need to use css variables, which they don't support to do proper SSR
    // without flickers of the wrong colors.
    // but once we do that initial hydration and we are in client side rendering mode,
    // we can avoid the extra re-render on mount
    hasEnterStyle || isEntering ? defaultComponentStateShouldEnter : defaultComponentState
  ) : defaultComponentStateMounted, disabled = isDisabled(props);
  disabled != null && (initialState.disabled = disabled);
  const states2 = reactExports.useState(initialState), state = props.forceStyle ? {
    ...states2[0],
    [props.forceStyle]: true
  } : states2[0], setState = states2[1];
  let isAnimated = willBeAnimated;
  hasAnimationThatNeedsHydrate && !staticConfig.isHOC && !isHydrated && (isAnimated = false, curStateRef.willHydrate = true), disabled !== state.disabled && (disabled && Object.assign(state, defaultComponentStateMounted), state.disabled = disabled, setState((_) => ({
    ...state
  })));
  const groupName = props.group, setStateShallow = useCreateShallowSetState(setState, props.debug);
  if (presenceState && isAnimated && isHydrated && staticConfig.variants) {
    const { enterVariant, exitVariant, enterExitVariant, custom } = presenceState;
    isObj(custom) && Object.assign(props, custom);
    const exv = exitVariant ?? enterExitVariant, env2 = enterVariant ?? enterExitVariant;
    state.unmounted && env2 && staticConfig.variants[env2] ? props[env2] = true : isExiting && exv && (props[exv] = exitVariant !== enterExitVariant);
  }
  let noClass = !!props.forceStyle;
  if (!isHydrated) noClass = false;
  else if (isHydrated) {
    const isAnimatedAndHydrated = isAnimated && isHydrated, isClassNameDisabled = !staticConfig.acceptsClassName && (config.disableSSR || !state.unmounted), isDisabledManually = disableClassName && !state.unmounted;
    (isAnimatedAndHydrated || isDisabledManually || isClassNameDisabled) && (noClass = true, false);
  }
  return {
    startedUnhydrated,
    curStateRef,
    disabled,
    groupName,
    hasAnimationProp,
    hasEnterStyle,
    isAnimated,
    isExiting,
    isHydrated,
    presence,
    presenceState,
    setState,
    setStateShallow,
    noClass,
    state,
    stateRef,
    supportsCSS,
    willBeAnimated,
    willBeAnimatedClient
  };
};
function hasAnimatedStyleValue(style) {
  return Object.keys(style).some((k) => {
    const val = style[k];
    return val && typeof val == "object" && "_animation" in val;
  });
}
const isDisabled = (props) => props.disabled || props.passThrough || props.accessibilityState?.disabled || props["aria-disabled"] || props.accessibilityDisabled || false;
const is19 = reactExports.version.startsWith("19."), Slot = reactExports.memo(reactExports.forwardRef(function(props, forwardedRef) {
  const { children, ...slotProps } = props;
  if (reactExports.isValidElement(children)) {
    const mergedProps = mergeSlotProps(children, slotProps);
    return reactExports.cloneElement(children, children.type.avoidForwardRef ? mergedProps : {
      ...mergedProps,
      ref: composeRefs(forwardedRef, is19 ? children.props.ref : children.ref)
    });
  }
  return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
}));
const pressMap = {
  onPress: "onClick",
  onPressOut: "onMouseUp",
  onPressIn: "onMouseDown"
};
function mergeSlotProps(child, slotProps) {
  const childProps = child.props, overrideProps = {
    ...childProps
  }, isHTMLChild = typeof child.type == "string";
  if (isHTMLChild) for (const key in pressMap) key in slotProps && (slotProps[pressMap[key]] = slotProps[key], delete slotProps[key]);
  for (let propName in childProps) {
    const slotPropValue = slotProps[propName], childPropValue = childProps[propName];
    isHTMLChild && propName in pressMap && (propName = pressMap[propName], delete overrideProps[propName]), handleRegex.test(propName) ? overrideProps[propName] = composeEventHandlers(childPropValue, slotPropValue) : propName === "style" ? overrideProps[propName] = {
      ...slotPropValue,
      ...childPropValue
    } : propName === "className" && (overrideProps[propName] = [
      slotPropValue,
      childPropValue
    ].filter(Boolean).join(" "));
  }
  return {
    ...slotProps,
    ...overrideProps
  };
}
const handleRegex = /^on[A-Z]/;
const componentSetStates = /* @__PURE__ */ new Set(), avoidReRenderKeys = /* @__PURE__ */ new Set([
  "hover",
  "press",
  "pressIn",
  "group",
  "focus",
  "focusWithin",
  "media",
  "group"
]);
if (typeof window < "u") {
  const cancelTouches = () => {
    componentSetStates.forEach((setState) => setState((prev) => prev.press || prev.pressIn ? {
      ...prev,
      press: false,
      pressIn: false
    } : prev)), componentSetStates.clear();
  };
  addEventListener("mouseup", cancelTouches), addEventListener("touchend", cancelTouches), addEventListener("touchcancel", cancelTouches);
}
const lastInteractionWasKeyboard = {
  value: false
};
typeof document < "u" && (document.addEventListener("keydown", () => {
  lastInteractionWasKeyboard.value || (lastInteractionWasKeyboard.value = true);
}), document.addEventListener("mousedown", () => {
  lastInteractionWasKeyboard.value && (lastInteractionWasKeyboard.value = false);
}), document.addEventListener("mousemove", () => {
  lastInteractionWasKeyboard.value && (lastInteractionWasKeyboard.value = false);
}));
function createComponent(staticConfig) {
  const { componentName } = staticConfig;
  let config = null, defaultProps = staticConfig.defaultProps;
  onConfiguredOnce((conf2) => {
    if (config = conf2, componentName) {
      const defaultForComponent = conf2.defaultProps?.[componentName];
      defaultForComponent && (defaultProps = {
        ...defaultForComponent,
        ...defaultProps
      });
    }
  });
  const { Component, isText, isZStack, isHOC } = staticConfig;
  const component = React.forwardRef((propsIn, forwardedRef) => {
    var _splitStyles;
    let styledContextProps, overriddenContextProps, contextValue;
    const { context, isReactNative } = staticConfig;
    if (context && (contextValue = React.useContext(context), contextValue)) {
      for (const key in context.props) {
        const propVal = getShorthandValue(propsIn, key);
        if (propVal === void 0) {
          const val = contextValue?.[key];
          val !== void 0 && (styledContextProps || (styledContextProps = {}), styledContextProps[key] = val);
        }
        const finalVal = propVal ?? defaultProps?.[key];
        finalVal !== void 0 && (overriddenContextProps || (overriddenContextProps = {}), overriddenContextProps[key] = finalVal);
      }
    }
    const debugProp = propsIn.debug;
    !process.env.TAMAGUI_IS_CORE_NODE && false;
    const curDefaultProps = styledContextProps ? {
      ...defaultProps,
      ...styledContextProps
    } : defaultProps;
    let props = propsIn;
    curDefaultProps && (props = mergeProps(curDefaultProps, propsIn));
    const componentName2 = props.componentName || staticConfig.componentName;
    const componentContext = React.useContext(ComponentContext), groupContextParent = React.useContext(GroupContext), animationDriver = componentContext.animationDriver, useAnimations = animationDriver?.useAnimations, componentState = useComponentState(props, animationDriver, staticConfig, config), { disabled, groupName, hasAnimationProp, hasEnterStyle, isAnimated, isExiting, isHydrated, presence, presenceState, setState, noClass, state, stateRef, supportsCSS, willBeAnimated, willBeAnimatedClient, startedUnhydrated } = componentState;
    hasAnimationProp && animationDriver?.avoidReRenders && useIsomorphicLayoutEffect(() => {
      const pendingState = stateRef.current.nextState;
      pendingState && (stateRef.current.nextState = void 0, componentState.setStateShallow(pendingState));
    });
    const allGroupContexts = reactExports.useMemo(() => {
      if (!groupName || props.passThrough) return groupContextParent;
      const listeners2 = /* @__PURE__ */ new Set();
      return stateRef.current.group?.listeners?.clear(), stateRef.current.group = {
        listeners: listeners2,
        emit(state2) {
          listeners2.forEach((l) => l(state2));
        },
        subscribe(cb) {
          return listeners2.add(cb), listeners2.size === 1 && setStateShallow({
            hasDynGroupChildren: true
          }), () => {
            listeners2.delete(cb), listeners2.size === 0 && setStateShallow({
              hasDynGroupChildren: false
            });
          };
        }
      }, {
        ...groupContextParent,
        [groupName]: {
          state: {
            pseudo: defaultComponentStateMounted
          },
          subscribe: (listener) => {
            const dispose2 = stateRef.current.group?.subscribe(listener);
            return () => {
              dispose2?.();
            };
          }
        }
      };
    }, [
      stateRef,
      groupName,
      groupContextParent
    ]);
    let setStateShallow = componentState.setStateShallow;
    const hasTextAncestor = !!(isText && componentContext.inText), isTaggable = !Component || typeof Component == "string", tagProp = props.tag, element = isTaggable && tagProp || Component, BaseTextComponent = element || "span", BaseViewComponent = element || (hasTextAncestor ? "span" : "div");
    let elementType = isText ? BaseTextComponent : BaseViewComponent;
    animationDriver && isAnimated && // this should really be behind another prop as it's not really related to
    // "needsWebStyles" basically with motion we just animate a plain div, but
    // we still have animated.View/Text for Sheet which wants to control
    // things declaratively
    !animationDriver.needsWebStyles && (elementType = animationDriver[isText ? "Text" : "View"] || elementType);
    const disableTheme = props["data-disable-theme"] || isHOC;
    props.themeShallow && (stateRef.current.themeShallow = true);
    const themeStateProps = {
      componentName: componentName2,
      disable: disableTheme,
      shallow: stateRef.current.themeShallow,
      debug: debugProp
    };
    if ("themeInverse" in props && (themeStateProps.inverse = props.themeInverse), "theme" in props && (themeStateProps.name = props.theme), typeof stateRef.current.isListeningToTheme == "boolean" && (themeStateProps.needsUpdate = () => !!stateRef.current.isListeningToTheme), false) ;
    const [theme, themeState] = useThemeWithState(themeStateProps);
    elementType = Component || elementType;
    const mediaState2 = useMedia(componentContext);
    setDidGetVariableValue(false);
    const resolveValues = (
      // if HOC + mounted + has animation prop, resolve as value so it passes non-variable to child
      isAnimated && !supportsCSS || isHOC && state.unmounted == false && hasAnimationProp ? "value" : "auto"
    ), styleProps = {
      mediaState: mediaState2,
      noClass,
      resolveValues,
      isExiting,
      isAnimated,
      willBeAnimated,
      styledContextProps
    }, themeName = themeState?.name || "";
    const splitStyles = useSplitStyles(props, staticConfig, theme, themeName, state, styleProps, null, componentContext, allGroupContexts, elementType, startedUnhydrated, debugProp), isPassthrough = !splitStyles, groupContext = groupName && allGroupContexts?.[groupName] || null;
    if (!isPassthrough && groupContext && // avoids onLayout if we don't need it
    props.containerType !== "normal") {
      const groupState = groupContext?.state;
      groupState && groupState.layout === void 0 && (splitStyles.style?.width || splitStyles.style?.height) && (groupState.layout = {
        width: fromPx(splitStyles.style.width),
        height: fromPx(splitStyles.style.height)
      });
    }
    if (!isPassthrough && (hasAnimationProp || groupName) && animationDriver?.avoidReRenders) {
      var _componentContext;
      let updateGroupListeners = function() {
        const updatedState = stateRef.current.nextState;
        if (groupContext) {
          const { group, hasDynGroupChildren, unmounted, animation, ...childrenGroupState } = updatedState;
          notifyGroupSubscribers(groupContext, stateRef.current.group || null, childrenGroupState);
        }
      };
      const ogSetStateShallow = setStateShallow;
      stateRef.current.updateStyleListener = () => {
        const updatedState = stateRef.current.nextState || state, mediaState22 = stateRef.current.nextMedia, nextStyles = getSplitStyles(props, staticConfig, theme, themeName, updatedState, mediaState22 ? {
          ...styleProps,
          mediaState: mediaState22
        } : styleProps, null, componentContext, allGroupContexts, elementType, startedUnhydrated, debugProp), useStyleListener = stateRef.current.useStyleListener;
        useStyleListener?.(nextStyles?.style || {});
      }, (_componentContext = componentContext).mediaEmit || (_componentContext.mediaEmit = (next) => {
        stateRef.current.nextMedia = next, stateRef.current.updateStyleListener?.();
      }), stateRef.current.setStateShallow = (nextOrGetNext) => {
        const prev = stateRef.current.nextState || state, next = typeof nextOrGetNext == "function" ? nextOrGetNext(prev) : nextOrGetNext;
        if (next === prev || isEqualShallow(prev, next)) return;
        const canAvoidReRender = Object.keys(next).every((key) => avoidReRenderKeys.has(key)), updatedState = {
          ...prev,
          ...next
        };
        stateRef.current.nextState = updatedState, canAvoidReRender ? (updateGroupListeners(), stateRef.current.updateStyleListener?.()) : ogSetStateShallow(next);
      }, setStateShallow = (state2) => {
        stateRef.current.setStateShallow?.(state2);
      };
    }
    splitStyles && (props.group && props.untilMeasured === "hide" && !stateRef.current.hasMeasured && ((_splitStyles = splitStyles).style || (_splitStyles.style = {}), splitStyles.style.opacity = 0), splitStyles.dynamicThemeAccess != null && (stateRef.current.isListeningToTheme = splitStyles.dynamicThemeAccess));
    const hasRuntimeMediaKeys = splitStyles?.hasMedia && splitStyles.hasMedia !== true, shouldListenForMedia = didGetVariableValue() || hasRuntimeMediaKeys || noClass && splitStyles?.hasMedia === true, mediaListeningKeys = hasRuntimeMediaKeys ? splitStyles.hasMedia : null;
    setMediaShouldUpdate(componentContext, shouldListenForMedia, mediaListeningKeys);
    const { viewProps: viewPropsIn, pseudos, style: splitStylesStyle, classNames, space, pseudoGroups, mediaGroups } = splitStyles || {}, propsWithAnimation = props, {
      asChild,
      children,
      themeShallow,
      spaceDirection: _spaceDirection,
      onPress,
      onLongPress,
      onPressIn,
      onPressOut,
      onHoverIn,
      onHoverOut,
      onMouseUp,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      separator,
      // ignore from here on out
      passThrough,
      forceStyle: _forceStyle,
      // @ts-ignore  for next/link compat etc
      onClick,
      theme: _themeProp,
      ...nonTamaguiProps
    } = viewPropsIn || {};
    let viewProps = nonTamaguiProps;
    !isTaggable && props.forceStyle && (viewProps.forceStyle = props.forceStyle), isHOC && (typeof _themeProp < "u" && (viewProps.theme = _themeProp), typeof passThrough < "u" && (viewProps.passThrough = passThrough)), tagProp && elementType.acceptTagProp && (viewProps.tag = tagProp);
    let animationStyles;
    const shouldUseAnimation = (
      // if it supports css vars we run it on server too to get matching initial style
      (supportsCSS ? willBeAnimatedClient : willBeAnimated) && useAnimations && !isHOC
    );
    let animatedRef;
    if (shouldUseAnimation) {
      const useStyleEmitter = animationDriver?.avoidReRenders ? (listener) => {
        stateRef.current.useStyleListener = listener;
      } : void 0, animations = useAnimations({
        props: propsWithAnimation,
        // if hydrating, send empty style
        style: splitStylesStyle || {},
        // @ts-ignore
        styleState: splitStyles,
        useStyleEmitter,
        presence,
        componentState: state,
        styleProps,
        theme,
        pseudos: pseudos || null,
        staticConfig,
        stateRef
      });
      animations && (animations.ref && (animatedRef = animations.ref), isHydrated && animations && (animationStyles = animations.style, viewProps.style = animationStyles, animations.className && (viewProps.className = `${state.unmounted === "should-enter" ? "t_unmounted " : ""}${viewProps.className || ""} ${animations.className}`)));
    }
    !isPassthrough && groupContext && // avoids onLayout if we don't need it
    props.containerType !== "normal" && (nonTamaguiProps.onLayout = composeEventHandlers(nonTamaguiProps.onLayout, (e) => {
      const layout = e.nativeEvent.layout;
      groupContext.state.layout = layout, stateRef.current.group?.emit({
        layout
      }), !stateRef.current.hasMeasured && props.untilMeasured === "hide" && setState((prev) => ({
        ...prev
      })), stateRef.current.hasMeasured = true;
    })), viewProps = hooks.usePropsTransform?.(elementType, nonTamaguiProps, stateRef, stateRef.current.willHydrate) || nonTamaguiProps, stateRef.current.composedRef || (stateRef.current.composedRef = composeRefs((x) => stateRef.current.host = x, forwardedRef, setElementProps, animatedRef)), viewProps.ref = stateRef.current.composedRef;
    const unPress = () => {
      setStateShallow({
        press: false,
        pressIn: false
      });
    };
    useIsomorphicLayoutEffect(() => {
      if (state.unmounted === true && hasEnterStyle) {
        setStateShallow({
          unmounted: "should-enter"
        });
        return;
      }
      let tm;
      if (state.unmounted) {
        if (animationDriver?.supportsCSS || isAndroid) return tm = setTimeout(() => {
          setStateShallow({
            unmounted: false
          });
        }), () => clearTimeout(tm);
        setStateShallow({
          unmounted: false
        });
        return;
      }
      return () => {
        componentSetStates.delete(setState);
      };
    }, [
      state.unmounted,
      disabled
    ]), useIsomorphicLayoutEffect(() => {
      if (!disabled && !(!pseudoGroups && !mediaGroups) && allGroupContexts) return subscribeToContextGroup({
        groupContext: allGroupContexts,
        setStateShallow,
        mediaGroups,
        pseudoGroups
      });
    }, [
      allGroupContexts,
      disabled,
      pseudoGroups ? objectIdentityKey(pseudoGroups) : 0,
      mediaGroups ? objectIdentityKey(mediaGroups) : 0
    ]);
    const groupEmitter = stateRef.current.group;
    useIsomorphicLayoutEffect(() => {
      !groupContext || !groupEmitter || notifyGroupSubscribers(groupContext, groupEmitter, state);
    }, [
      groupContext,
      groupEmitter,
      state
    ]);
    const runtimePressStyle = !disabled && noClass && pseudos?.pressStyle, runtimeFocusStyle = !disabled && noClass && pseudos?.focusStyle, runtimeFocusVisibleStyle = !disabled && noClass && pseudos?.focusVisibleStyle, attachFocus = !!(runtimePressStyle || runtimeFocusStyle || runtimeFocusVisibleStyle || onFocus || onBlur || componentContext.setParentFocusState), hasDynamicGroupChildren = !!(groupName && state.hasDynGroupChildren), attachPress = !!(hasDynamicGroupChildren || runtimePressStyle || onPress || onPressOut || onPressIn || onMouseDown || onMouseUp || onLongPress || onClick || pseudos?.focusVisibleStyle), runtimeHoverStyle = !disabled && noClass && pseudos?.hoverStyle, needsHoverState = !!(hasDynamicGroupChildren || runtimeHoverStyle), attachHover = !!(hasDynamicGroupChildren || needsHoverState || onMouseEnter || onMouseLeave), shouldAttach = !disabled && !props.asChild && !!(attachFocus || attachPress || attachHover || runtimePressStyle || runtimeHoverStyle || runtimeFocusStyle), needsPressState = !!(hasDynamicGroupChildren || runtimePressStyle);
    const events = shouldAttach ? {
      onPressOut: attachPress ? (e) => {
        unPress(), onPressOut?.(e), onMouseUp?.(e);
      } : void 0,
      ...(attachHover || attachPress) && {
        onMouseEnter: (e) => {
          const next = {};
          needsHoverState && (next.hover = true), needsPressState && state.pressIn && (next.press = true), setStateShallow(next), onHoverIn?.(e), onMouseEnter?.(e);
        },
        onMouseLeave: (e) => {
          const next = {};
          needsHoverState && (next.hover = false), needsPressState && (next.press = false, next.pressIn = false), setStateShallow(next), onHoverOut?.(e), onMouseLeave?.(e);
        }
      },
      onPressIn: attachPress ? (e) => {
        needsPressState && setStateShallow({
          press: true,
          pressIn: true
        }), onPressIn?.(e), onMouseDown?.(e), componentSetStates.add(setState);
      } : void 0,
      onPress: attachPress ? (e) => {
        unPress(), onClick?.(e), onPress?.(e), onLongPress?.(e);
      } : void 0,
      ...attachFocus && {
        onFocus: (e) => {
          const next = {};
          componentContext.setParentFocusState && (next.focusWithin = true), pseudos?.focusVisibleStyle && lastInteractionWasKeyboard.value ? next.focusVisible = true : next.focus = true, setStateShallow(next), onFocus?.(e);
        },
        onBlur: (e) => {
          componentContext.setParentFocusState && componentContext.setParentFocusState({
            focusWithin: false
          }), setStateShallow({
            focus: false,
            focusVisible: false,
            focusWithin: false
          }), onBlur?.(e);
        }
      }
    } : null;
    events && !isReactNative && Object.assign(viewProps, getWebEvents(events)), hooks.useEvents?.(viewProps, events, splitStyles, setStateShallow, staticConfig);
    const direction = props.spaceDirection || "both";
    let content = !children || asChild || !splitStyles ? children : spacedChildren({
      separator,
      children,
      space,
      direction,
      isZStack
    });
    if (asChild) {
      elementType = Slot;
      {
        const passEvents = getWebEvents({
          onPress,
          onPressIn,
          onPressOut,
          onMouseEnter,
          onMouseLeave
        }, asChild === "web" || asChild === "except-style-web");
        Object.assign(viewProps, passEvents);
      }
    }
    isPassthrough && (content = propsIn.children, elementType = BaseViewComponent, viewProps = {
      style: {
        display: "contents"
      }
    });
    let useChildrenResult;
    hooks.useChildren && (useChildrenResult = hooks.useChildren(elementType, content, viewProps)), useChildrenResult ? content = useChildrenResult : content = React.createElement(elementType, viewProps, content);
    const ResetPresence = config?.animations?.ResetPresence, needsReset = !!// not when passing down to child
    (!asChild && // not when passThrough
    splitStyles && // not when HOC
    !isHOC && ResetPresence && willBeAnimated && (hasEnterStyle || presenceState)), hasEverReset = stateRef.current.hasEverResetPresence;
    if (needsReset && !hasEverReset && (stateRef.current.hasEverResetPresence = true), (needsReset || hasEverReset) && ResetPresence && (content = /* @__PURE__ */ jsxRuntimeExports.jsx(ResetPresence, {
      disabled: !needsReset,
      children: content
    })), "focusWithinStyle" in propsIn && (content = /* @__PURE__ */ jsxRuntimeExports.jsx(ComponentContext.Provider, {
      ...componentContext,
      setParentFocusState: setStateShallow,
      children: content
    })), "group" in props && (content = /* @__PURE__ */ jsxRuntimeExports.jsx(GroupContext.Provider, {
      value: allGroupContexts,
      children: content
    })), content = disableTheme || !splitStyles ? content : getThemedChildren(themeState, content, themeStateProps, false, stateRef), isReactNative && !asChild && (content = /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
      className: "_dsp_contents",
      ...!isPassthrough && isHydrated && events && getWebEvents(events),
      children: content
    })), staticConfig.context) {
      const contextProps = staticConfig.context.props;
      for (const key in contextProps) (viewProps.style && key in viewProps.style || key in viewProps) && (overriddenContextProps || (overriddenContextProps = {}), overriddenContextProps[key] = viewProps.style?.[key] ?? viewProps[key]);
    }
    if (overriddenContextProps) {
      const Provider = staticConfig.context.Provider;
      content = /* @__PURE__ */ jsxRuntimeExports.jsx(Provider, {
        ...contextValue,
        ...overriddenContextProps,
        children: content
      });
    }
    if (startedUnhydrated) {
      const styleTags = reactExports.useMemo(() => {
        if (!isPassthrough) return getStyleTags(Object.values(splitStyles.rulesToInsert));
      }, []);
      content = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
        children: [
          content,
          styleTags
        ]
      });
    }
    return content;
  });
  function notifyGroupSubscribers(groupContext, groupEmitter, pseudo) {
    if (!groupContext || !groupEmitter) return;
    const nextState = {
      ...groupContext.state,
      pseudo
    };
    groupEmitter.emit(nextState), groupContext.state = nextState;
  }
  staticConfig.componentName && (component.displayName = staticConfig.componentName);
  let res = component;
  (process.env.TAMAGUI_FORCE_MEMO || staticConfig.memo) && (res = React.memo(res)), res.staticConfig = staticConfig;
  function extendStyledConfig(extended) {
    return {
      ...staticConfig,
      ...extended,
      neverFlatten: true,
      isHOC: true,
      isStyledHOC: false
    };
  }
  function extractable(Component2, extended) {
    return Component2.staticConfig = extendStyledConfig(extended), Component2.styleable = styleable, Component2;
  }
  function styleable(Component2, options) {
    let out = IS_REACT_19 && typeof Component2 == "function" && Component2.length === 1 || Component2.render?.length === 2 ? Component2 : React.forwardRef(Component2);
    const extendedConfig = extendStyledConfig(options?.staticConfig);
    return out = options?.disableTheme ? out : themeable(out, extendedConfig, true), (extendedConfig.memo || process.env.TAMAGUI_MEMOIZE_STYLEABLE) && (out = React.memo(out)), out.staticConfig = extendedConfig, out.styleable = styleable, out;
  }
  return res.extractable = extractable, res.styleable = styleable, res;
}
function getWebEvents(events, webStyle = true) {
  return {
    onMouseEnter: events.onMouseEnter,
    onMouseLeave: events.onMouseLeave,
    [webStyle ? "onClick" : "onPress"]: events.onPress,
    onMouseDown: events.onPressIn,
    onMouseUp: events.onPressOut,
    onTouchStart: events.onPressIn,
    onTouchEnd: events.onPressOut,
    onFocus: events.onFocus,
    onBlur: events.onBlur
  };
}
const getSpacerSize = (size, { tokens }) => {
  size = size === false ? 0 : size === true ? "$true" : size;
  const sizePx = tokens.space[size] ?? size;
  return {
    width: sizePx,
    height: sizePx,
    minWidth: sizePx,
    minHeight: sizePx
  };
}, Spacer = createComponent({
  acceptsClassName: true,
  memo: true,
  componentName: "Spacer",
  validStyles,
  defaultProps: {
    ...stackDefaultStyles,
    // avoid nesting issues
    tag: "span",
    size: true,
    pointerEvents: "none"
  },
  variants: {
    size: {
      "...": getSpacerSize
    },
    flex: {
      true: {
        flexGrow: 1
      }
    },
    direction: {
      horizontal: {
        height: 0,
        minHeight: 0
      },
      vertical: {
        width: 0,
        minWidth: 0
      },
      both: {}
    }
  }
});
function spacedChildren(props) {
  const { isZStack, children, space, direction, spaceFlex, separator, ensureKeys } = props, hasSpace = !!(space || spaceFlex), hasSeparator = separator != null, areChildrenArray = Array.isArray(children);
  if (!ensureKeys && !(hasSpace || hasSeparator || isZStack)) return children;
  const childrenList = areChildrenArray ? children : React.Children.toArray(children);
  if (childrenList.length <= 1 && !isZStack && !childrenList[0]?.type?.shouldForwardSpace) return children;
  const final = [];
  for (let [index2, child] of childrenList.entries()) {
    const isEmpty = child == null || Array.isArray(child) && child.length === 0;
    if (!isEmpty && React.isValidElement(child) && child.type?.shouldForwardSpace && (child = React.cloneElement(child, {
      // @ts-expect-error we explicitly know with shouldForwardSpace
      space,
      spaceFlex,
      separator,
      key: child.key
    })), isEmpty || !child || child.key && !isZStack ? final.push(child) : final.push(/* @__PURE__ */ jsxRuntimeExports.jsx(React.Fragment, {
      children: isZStack ? /* @__PURE__ */ jsxRuntimeExports.jsx(AbsoluteFill, {
        children: child
      }) : child
    }, `${index2}0t`)), isUnspaced(child) && index2 === 0 || isZStack) continue;
    const next = childrenList[index2 + 1];
    next && !isEmpty && !isUnspaced(next) && (separator ? (hasSpace && final.push(createSpacer({
      key: `_${index2}_00t`,
      direction,
      space,
      spaceFlex
    })), final.push(/* @__PURE__ */ jsxRuntimeExports.jsx(React.Fragment, {
      children: separator
    }, `${index2}03t`)), hasSpace && final.push(createSpacer({
      key: `_${index2}01t`,
      direction,
      space,
      spaceFlex
    }))) : final.push(createSpacer({
      key: `_${index2}02t`,
      direction,
      space,
      spaceFlex
    })));
  }
  return final;
}
function createSpacer({ key, direction, space, spaceFlex }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Spacer, {
    size: space,
    direction,
    ...typeof spaceFlex < "u" && {
      flex: spaceFlex === true ? 1 : spaceFlex === false ? 0 : spaceFlex
    }
  }, key);
}
function isUnspaced(child) {
  const t = child?.type;
  return t?.isVisuallyHidden || t?.isUnspaced;
}
const AbsoluteFill = createComponent({
  defaultProps: {
    ...stackDefaultStyles,
    flexDirection: "column",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    pointerEvents: "box-none"
  }
}), fromPx = (val) => typeof val == "number" ? val : typeof val == "string" ? +val.replace("px", "") : 0;
const cache = /* @__PURE__ */ new WeakMap(), createVariables = (tokens, parentPath = "", isFont = false) => {
  if (cache.has(tokens)) return tokens;
  const res = {};
  for (let keyIn in tokens) {
    const val = tokens[keyIn], isPrefixed = keyIn[0] === "$", keyWithPrefix = isPrefixed ? keyIn : `$${keyIn}`, key = isPrefixed ? keyWithPrefix.slice(1) : keyIn;
    if (isVariable(val)) {
      res[key] = val;
      continue;
    }
    const niceKey = simpleHash(key, 1e3), name = parentPath && parentPath !== "t-color" ? `${parentPath}-${niceKey}` : `c-${niceKey}`;
    if (val && typeof val == "object" && "needsPx" in val && "val" in val) {
      const finalValue2 = createVariable({
        val: val.val,
        name,
        key: keyWithPrefix
      });
      finalValue2.needsPx = val.needsPx, res[key] = finalValue2;
      continue;
    }
    if (val && typeof val == "object") {
      res[key] = createVariables(tokens[key], name, false);
      continue;
    }
    const finalValue = isVariable(val) ? val : createVariable({
      val,
      name,
      key: keyWithPrefix
    });
    res[key] = finalValue;
  }
  return cache.set(res, true), res;
};
const registerCSSVariable = (v) => {
  tokensValueToVariable.set(getVariableValue(v), v);
}, variableToCSS = (v, unitless = false) => `--${process.env.TAMAGUI_CSS_VARIABLE_PREFIX || ""}${createCSSVariable(v.name, false)}:${!unitless && typeof v.val == "number" ? `${v.val}px` : v.val}`, tokensValueToVariable = /* @__PURE__ */ new Map();
const darkLight = [
  "dark",
  "light"
], lightDark = [
  "light",
  "dark"
];
function getThemeCSSRules(props) {
  const cssRuleSets = [];
  if (!process.env.TAMAGUI_DOES_SSR_CSS || process.env.TAMAGUI_DOES_SSR_CSS === "mutates-themes" || process.env.TAMAGUI_DOES_SSR_CSS === "false") {
    const { config, themeName, theme, names } = props, hasDarkLight = props.hasDarkLight ?? (config.themes && ("light" in config.themes || "dark" in config.themes)), CNP = `.${THEME_CLASSNAME_PREFIX}`;
    let vars = "";
    for (const themeKey in theme) {
      const variable = theme[themeKey];
      let value = null;
      tokensValueToVariable.has(variable.val) ? value = tokensValueToVariable.get(variable.val).variable : value = variable.val, vars += `--${process.env.TAMAGUI_CSS_VARIABLE_PREFIX || ""}${simpleHash(themeKey, 40)}:${value};`;
    }
    const isDarkBase = themeName === "dark", isLightBase = themeName === "light", baseSelectors = names.map((name) => `${CNP}${name}`), selectorsSet = new Set(isDarkBase || isLightBase ? baseSelectors : []);
    if (hasDarkLight) {
      const maxDepth = getSetting("maxDarkLightNesting") ?? 3;
      for (const subName of names) {
        const isDark = isDarkBase || subName.startsWith("dark_"), isLight = !isDark && (isLightBase || subName.startsWith("light_"));
        if (!(isDark || isLight)) {
          selectorsSet.add(`${CNP}${subName}`);
          continue;
        }
        const childSelector = `${CNP}${subName.replace(/^(dark|light)_/, "")}`, order = isDark ? darkLight : lightDark, [stronger, weaker] = order, numSelectors = Math.round(maxDepth * 1.5);
        for (let depth = 0; depth < numSelectors; depth++) {
          const isOdd = depth % 2 === 1;
          if (isOdd && depth < 3) continue;
          const parents = new Array(depth + 1).fill(0).map((_, idx) => `${CNP}${idx % 2 === 0 ? stronger : weaker}`);
          let parentSelectors = parents.length > 1 ? parents.slice(1) : parents;
          if (isOdd) {
            const [_first, second, ...rest] = parentSelectors;
            parentSelectors = [
              second,
              ...rest,
              second
            ];
          }
          const lastParentSelector = parentSelectors[parentSelectors.length - 1], nextChildSelector = childSelector === lastParentSelector ? "" : childSelector, parentSelectorString = parentSelectors.join(" ");
          selectorsSet.add(`${parentSelectorString} ${nextChildSelector}`);
        }
      }
    }
    const selectors2 = [
      ...selectorsSet
    ].sort(sortString), css = `${selectors2.map((x) => `:root${isBaseTheme(x) && getSetting("themeClassNameOnRoot") ? "" : " "}${x}`).join(", ") + ", .tm_xxt"} {${vars}}`;
    if (cssRuleSets.push(css), getSetting("shouldAddPrefersColorThemes")) {
      const bgString = theme.background ? `background:${variableToString(theme.background)};` : "", fgString = theme.color ? `color:${variableToString(theme.color)}` : "", bodyRules = `body{${bgString}${fgString}}`, isDark = themeName.startsWith("dark"), baseName = isDark ? "dark" : "light", themeRules = `${selectors2.map((x) => {
        if (x == darkSelector || x === lightSelector) return ":root";
        if (!(isDark && x.startsWith(lightSelector) || !isDark && x.startsWith(darkSelector))) return x.replace(/^\.t_(dark|light) /, "").trim();
      }).filter(Boolean).join(", ")} {${vars}}`, prefersMediaSelectors = `@media(prefers-color-scheme:${baseName}){
    ${bodyRules}
    ${themeRules}
  }`;
      cssRuleSets.push(prefersMediaSelectors);
    }
    const selectionStyles = getSetting("selectionStyles");
    if (selectionStyles) {
      const rules = selectionStyles(theme);
      if (rules) {
        const selectionSelectors = baseSelectors.map((s) => `${s} ::selection`).join(", "), styles = Object.entries(rules).flatMap(([k, v]) => v ? `${k === "backgroundColor" ? "background" : k}:${variableToString(v)}` : []).join(";");
        if (styles) {
          const css2 = `${selectionSelectors}{${styles}}`;
          cssRuleSets.push(css2);
        }
      }
    }
  }
  return cssRuleSets;
}
const darkSelector = ".t_dark", lightSelector = ".t_light", isBaseTheme = (x) => x === darkSelector || x === lightSelector || x.startsWith(".t_dark ") || x.startsWith(".t_light ");
const themesRaw = {};
function proxyThemesToParents(dedupedThemes) {
  for (const { names, theme } of dedupedThemes) for (const name of names) themesRaw[name] = theme;
  const themes2 = {};
  for (const { names, theme } of dedupedThemes) for (const themeName of names) {
    const proxiedTheme = proxyThemeToParents(themeName, theme);
    themes2[themeName] = proxiedTheme;
  }
  return themes2;
}
function proxyThemeToParents(themeName, theme) {
  const out = {}, cur = [], parents = themeName.split("_").slice(0, -1).map((part) => (cur.push(part), cur.join("_")));
  for (const parent of parents) Object.assign(out, themesRaw[parent]);
  return Object.assign(out, theme), out;
}
function ensureThemeVariable(theme, key) {
  const val = theme[key];
  isVariable(val) ? val.name !== key && (theme[key] = createVariable({
    key: val.name,
    name: key,
    val: val.val
  })) : theme[key] = createVariable({
    key,
    name: key,
    val
  });
}
function parseFont(definition) {
  const parsed = {};
  for (const attrKey in definition) {
    const attr = definition[attrKey];
    if (attrKey === "family" || attrKey === "face") parsed[attrKey] = attr;
    else {
      parsed[attrKey] = {};
      for (const key in attr) {
        let val = attr[key];
        val.val?.[0] === "$" && (val = val.val), parsed[attrKey][`$${key}`] = val;
      }
    }
  }
  return parsed;
}
function registerFontVariables(parsedFont) {
  const response = [];
  for (const fkey in parsedFont) if (fkey !== "face") {
    if (fkey === "family") {
      const val = parsedFont[fkey];
      registerCSSVariable(val), response.push(variableToCSS(val));
    } else for (const fskey in parsedFont[fkey]) if (typeof parsedFont[fkey][fskey] != "string") {
      const val = parsedFont[fkey][fskey];
      registerCSSVariable(val), response.push(variableToCSS(val));
    }
  }
  return response;
}
function shouldTokenCategoryHaveUnits(category) {
  return /* @__PURE__ */ (/* @__PURE__ */ new Set([
    "size",
    "space",
    "radius"
  ])).has(category);
}
function createTamagui$1(configIn) {
  const tokensParsed = {}, tokens = createVariables(configIn.tokens || {});
  if (configIn.tokens) {
    const tokensMerged2 = {};
    for (const cat in tokens) {
      tokensParsed[cat] = {}, tokensMerged2[cat] = {};
      const tokenCat = tokens[cat];
      for (const key in tokenCat) {
        const val = tokenCat[key], prefixedKey = `$${key}`;
        tokensParsed[cat][prefixedKey] = val, tokensMerged2[cat][prefixedKey] = val, tokensMerged2[cat][key] = val;
      }
    }
    setTokens(tokensMerged2);
  }
  let foundThemes;
  if (configIn.themes) {
    const noThemes = Object.keys(configIn.themes).length === 0;
    noThemes && (foundThemes = scanAllSheets(noThemes, tokensParsed));
  }
  let fontSizeTokens = null, fontsParsed;
  if (configIn.fonts) {
    const fontTokens = Object.fromEntries(Object.entries(configIn.fonts).map(([k, v]) => [
      k,
      createVariables(v, "f", true)
    ]));
    fontsParsed = (() => {
      const res = {};
      for (const familyName in fontTokens) {
        const font = fontTokens[familyName], fontParsed = parseFont(font);
        res[`$${familyName}`] = fontParsed, !fontSizeTokens && fontParsed.size && (fontSizeTokens = new Set(Object.keys(fontParsed.size)));
      }
      return res;
    })();
  }
  const specificTokens = {}, themeConfig = (() => {
    const cssRuleSets = [], declarations = [], fontDeclarations = {};
    for (const key in tokens) for (const skey in tokens[key]) {
      const variable = tokens[key][skey];
      if (specificTokens[`$${key}.${skey}`] = variable, false) ;
      {
        registerCSSVariable(variable);
        const variableNeedsPx = variable.needsPx === true, categoryNeedsPx = shouldTokenCategoryHaveUnits(key), shouldBeUnitless = !(variableNeedsPx || categoryNeedsPx);
        declarations.push(variableToCSS(variable, shouldBeUnitless));
      }
    }
    {
      let declarationsToRuleSet = function(decs, selector = "") {
        return `:root${selector} {${sep}${[
          ...decs
        ].join(`;${sep}`)}${sep}}`;
      };
      for (const key in fontsParsed) {
        const fontParsed = fontsParsed[key], [name, language] = key.includes("_") ? key.split("_") : [
          key
        ], fontVars = registerFontVariables(fontParsed);
        fontDeclarations[key] = {
          name: name.slice(1),
          declarations: fontVars,
          language
        };
      }
      const sep = configIn.cssStyleSeparator || "";
      if (cssRuleSets.push(declarationsToRuleSet(declarations)), fontDeclarations) for (const key in fontDeclarations) {
        const { name, declarations: declarations2, language = "default" } = fontDeclarations[key], fontSelector = `.font_${name}`, langSelector = `:root .t_lang-${name}-${language} ${fontSelector}`, selectors2 = language === "default" ? ` ${fontSelector}, ${langSelector}` : langSelector, specificRuleSet = declarationsToRuleSet(declarations2, selectors2);
        cssRuleSets.push(specificRuleSet);
      }
    }
    const themesIn = configIn.themes, dedupedThemes = foundThemes ?? getThemesDeduped(themesIn, tokens.color);
    return {
      themes: proxyThemesToParents(dedupedThemes),
      cssRuleSets,
      getThemeRulesSets() {
        let themeRuleSets = [];
        for (const { names, theme } of dedupedThemes) {
          const nextRules = getThemeCSSRules({
            config: configIn,
            themeName: names[0],
            names,
            theme
          });
          themeRuleSets = [
            ...themeRuleSets,
            ...nextRules
          ];
        }
        return themeRuleSets;
      }
    };
  })(), shorthands = configIn.shorthands || {};
  let lastCSSInsertedRulesIndex = -1;
  const getCSS = (opts = {}) => {
    {
      const { separator = `
`, sinceLastCall, exclude } = opts;
      if (sinceLastCall && lastCSSInsertedRulesIndex >= 0) {
        const rules = getAllRules();
        return lastCSSInsertedRulesIndex = rules.length, rules.slice(lastCSSInsertedRulesIndex).join(separator);
      }
      lastCSSInsertedRulesIndex = 0;
      const runtimeStyles = getAllRules().join(separator);
      return exclude === "design-system" ? runtimeStyles : `${`._ovs-contain {overscroll-behavior:contain;}
  .is_Text .is_Text {display:inline-flex;}
  ._dsp_contents {display:contents;}
  ._no_backdrop::backdrop {display: none;}
  ${themeConfig.cssRuleSets.join(separator)}`}
  ${exclude ? "" : themeConfig.getThemeRulesSets().join(separator)}
  ${runtimeStyles}`;
    }
  }, getNewCSS = (opts) => getCSS({
    ...opts,
    sinceLastCall: true
  }), defaultFontSetting = configIn.settings?.defaultFont ?? configIn.defaultFont, defaultFont = (() => {
    let val = defaultFontSetting;
    return val?.[0] === "$" && (val = val.slice(1)), val;
  })(), defaultFontToken = defaultFont ? `$${defaultFont}` : "", unset = {
    ...configIn.unset
  };
  !unset.fontFamily && defaultFont && (unset.fontFamily = defaultFontToken);
  const config = {
    fonts: {},
    onlyAllowShorthands: false,
    fontLanguages: [],
    animations: {},
    media: {},
    ...configIn,
    unset,
    settings: {
      // move deprecated settings here so we can reference them all using `getSetting`
      // TODO remove this on v2
      disableSSR: configIn.disableSSR,
      defaultFont: configIn.defaultFont,
      disableRootThemeClass: configIn.disableRootThemeClass,
      onlyAllowShorthands: configIn.onlyAllowShorthands,
      mediaQueryDefaultActive: configIn.mediaQueryDefaultActive,
      themeClassNameOnRoot: configIn.themeClassNameOnRoot,
      cssStyleSeparator: configIn.cssStyleSeparator,
      webContainerType: "inline-size",
      ...configIn.settings
    },
    tokens,
    // vite made this into a function if it wasn't set
    shorthands,
    inverseShorthands: shorthands ? Object.fromEntries(Object.entries(shorthands).map(([k, v]) => [
      v,
      k
    ])) : {},
    themes: themeConfig.themes,
    fontsParsed: fontsParsed || {},
    themeConfig,
    tokensParsed,
    parsed: true,
    getNewCSS,
    getCSS,
    defaultFont,
    fontSizeTokens: fontSizeTokens || /* @__PURE__ */ new Set(),
    specificTokens,
    defaultFontToken
  };
  return setConfig(config), configureMedia(config), configListeners.size && (configListeners.forEach((cb) => cb(config)), configListeners.clear()), config;
}
function getThemesDeduped(themes2, colorTokens) {
  const dedupedThemes = [], existing = /* @__PURE__ */ new Map();
  for (const themeName in themes2) {
    const darkOrLightSpecificPrefix = themeName.startsWith("dark") ? "dark" : themeName.startsWith("light") ? "light" : "", rawTheme = themes2[themeName], key = darkOrLightSpecificPrefix + JSON.stringify(rawTheme);
    if (existing.has(key)) {
      existing.get(key).names.push(themeName);
      continue;
    }
    const theme = {
      ...rawTheme
    };
    colorTokens && Object.assign(theme, colorTokens);
    for (const key2 in theme) ensureThemeVariable(theme, key2);
    const deduped = {
      names: [
        themeName
      ],
      theme
    };
    dedupedThemes.push(deduped), existing.set(key, deduped);
  }
  return dedupedThemes;
}
const View$1 = createComponent({
  acceptsClassName: true,
  defaultProps: stackDefaultStyles,
  validStyles
});
const ellipseStyle = {
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
}, defaultWebStyle = {
  display: "inline",
  // display: inline breaks css transform styles
  boxSizing: "border-box",
  wordWrap: "break-word",
  whiteSpace: "pre-wrap",
  margin: 0
}, ellipsisStyle = ellipseStyle, Text$1 = createComponent({
  acceptsClassName: true,
  isText: true,
  defaultProps: {
    fontFamily: "unset",
    ...defaultWebStyle
  },
  inlineWhenUnflattened: /* @__PURE__ */ new Set([
    "fontFamily"
  ]),
  variants: {
    numberOfLines: {
      1: ellipseStyle,
      ":number": (numberOfLines) => numberOfLines >= 1 ? {
        WebkitLineClamp: numberOfLines,
        WebkitBoxOrient: "vertical",
        display: "-webkit-box",
        overflow: "hidden"
      } : null
    },
    selectable: {
      true: {
        userSelect: "text",
        cursor: "text"
      },
      false: {
        userSelect: "none",
        cursor: "default"
      }
    },
    /**
    * @deprecated Use ellipsis instead
    */
    ellipse: {
      true: ellipsisStyle
    },
    ellipsis: {
      true: ellipsisStyle
    }
  },
  validStyles: {
    ...validStyles,
    ...stylePropsTextOnly
  }
});
Text$1.displayName = "Text";
const ThemeProvider = (props) => {
  const disableRootThemeClass = props.disableRootThemeClass ?? getSetting("disableRootThemeClass"), themeClassNameOnRoot = props.themeClassNameOnRoot ?? getSetting("themeClassNameOnRoot");
  return isClient && useIsomorphicLayoutEffect(() => {
    if (disableRootThemeClass) return;
    const cn = `${THEME_CLASSNAME_PREFIX}${props.defaultTheme}`, target = themeClassNameOnRoot ? document.documentElement : document.body;
    return target.classList.add(cn), () => {
      target.classList.remove(cn);
    };
  }, [
    props.defaultTheme,
    disableRootThemeClass,
    themeClassNameOnRoot
  ]), /* @__PURE__ */ jsxRuntimeExports.jsx(Theme, {
    className: props.className,
    name: props.defaultTheme,
    forceClassName: !disableRootThemeClass && !themeClassNameOnRoot,
    _isRoot: reactExports.useId,
    children: props.children
  });
};
function TamaguiProvider$1({ children, disableInjectCSS, config, className, defaultTheme, disableRootThemeClass, reset, themeClassNameOnRoot }) {
  IS_REACT_19 || isClient && useIsomorphicLayoutEffect(() => {
    if (config && !disableInjectCSS) {
      const style = document.createElement("style");
      return style.appendChild(document.createTextNode(config.getCSS())), document.head.appendChild(style), () => {
        document.head.removeChild(style);
      };
    }
  }, [
    config,
    disableInjectCSS
  ]), useIsomorphicLayoutEffect(() => {
    stopAccumulatingRules(), updateMediaListeners();
  }, []);
  let contents = /* @__PURE__ */ jsxRuntimeExports.jsx(UnmountedClassName, {
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ComponentContext.Provider, {
      animationDriver: config?.animations,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, {
        themeClassNameOnRoot: themeClassNameOnRoot ?? getSetting("themeClassNameOnRoot"),
        disableRootThemeClass: disableRootThemeClass ?? getSetting("disableRootThemeClass"),
        defaultTheme: defaultTheme ?? (config ? Object.keys(config.themes)[0] : ""),
        reset,
        className,
        children
      })
    })
  });
  return getSetting("disableSSR") && (contents = /* @__PURE__ */ jsxRuntimeExports.jsx(ClientOnly, {
    enabled: true,
    children: contents
  })), /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
    children: [
      contents,
      IS_REACT_19 && config && !disableInjectCSS && /* @__PURE__ */ jsxRuntimeExports.jsx("style", {
        precedence: "default",
        href: "tamagui-css",
        children: config.getCSS()
      }, "tamagui-css")
    ]
  });
}
function UnmountedClassName(props) {
  const [mounted, setMounted] = React.useState(false);
  return React.useEffect(() => {
    setMounted(true);
  }, []), /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
    style: {
      display: "contents"
    },
    className: mounted ? "" : "t_unmounted",
    children: props.children
  });
}
TamaguiProvider$1.displayName = "TamaguiProvider";
const keyName = "__reactResponderId", canUseDOM = !!(typeof window < "u" && window.document && window.document.createElement), getBoundingClientRect = (node) => {
  if (node && node.nodeType === 1 && node.getBoundingClientRect) return node.getBoundingClientRect();
};
function getEventPath(domEvent) {
  if (domEvent.type === "selectionchange") {
    const target = window.getSelection()?.anchorNode;
    return composedPathFallback(target);
  }
  return domEvent.composedPath != null ? domEvent.composedPath() : composedPathFallback(domEvent.target);
}
function composedPathFallback(target) {
  const path = [];
  for (; target != null && target !== document.body; ) path.push(target), target = target.parentNode;
  return path;
}
function getResponderId(node) {
  return node != null ? node[keyName] : null;
}
function setResponderId(node, id) {
  node != null && (node[keyName] = id);
}
function getResponderPaths(domEvent) {
  const idPath = [], nodePath = [], eventPath = getEventPath(domEvent);
  for (let i = 0; i < eventPath.length; i++) {
    const node = eventPath[i], id = getResponderId(node);
    id != null && (idPath.push(id), nodePath.push(node));
  }
  return {
    idPath,
    nodePath
  };
}
function getLowestCommonAncestor(pathA, pathB) {
  let pathALength = pathA.length, pathBLength = pathB.length;
  if (
    // If either path is empty
    pathALength === 0 || pathBLength === 0 || // If the last elements aren't the same there can't be a common ancestor
    // that is connected to the responder system
    pathA[pathALength - 1] !== pathB[pathBLength - 1]
  ) return null;
  let itemA = pathA[0], indexA = 0, itemB = pathB[0], indexB = 0;
  pathALength - pathBLength > 0 && (indexA = pathALength - pathBLength, itemA = pathA[indexA], pathALength = pathBLength), pathBLength - pathALength > 0 && (indexB = pathBLength - pathALength, itemB = pathB[indexB], pathBLength = pathALength);
  let depth = pathALength;
  for (; depth--; ) {
    if (itemA === itemB) return itemA;
    itemA = pathA[indexA++], itemB = pathB[indexB++];
  }
  return null;
}
function hasTargetTouches(target, touches) {
  if (!touches || touches.length === 0) return false;
  for (let i = 0; i < touches.length; i++) {
    const node = touches[i].target;
    if (node != null && target.contains(node)) return true;
  }
  return false;
}
function hasValidSelection(domEvent) {
  return domEvent.type === "selectionchange" ? isSelectionValid() : domEvent.type === "select";
}
function isPrimaryPointerDown(domEvent) {
  const { altKey, button, buttons, ctrlKey, type } = domEvent, isTouch = type === "touchstart" || type === "touchmove", isPrimaryMouseDown = type === "mousedown" && (button === 0 || buttons === 1), isPrimaryMouseMove = type === "mousemove" && buttons === 1, noModifiers = altKey === false && ctrlKey === false;
  return !!(isTouch || isPrimaryMouseDown && noModifiers || isPrimaryMouseMove && noModifiers);
}
function isSelectionValid() {
  const selection = window.getSelection();
  if (!selection) return false;
  const string = selection.toString(), anchorNode = selection.anchorNode, focusNode = selection.focusNode, isTextNode = anchorNode && anchorNode.nodeType === window.Node.TEXT_NODE || focusNode && focusNode.nodeType === window.Node.TEXT_NODE;
  return string.length >= 1 && string !== `
` && !!isTextNode;
}
const emptyFunction = () => {
}, emptyObject$2 = {}, emptyArray = [];
function normalizeIdentifier(identifier) {
  return identifier > 20 ? identifier % 20 : identifier;
}
function createResponderEvent(domEvent, responderTouchHistoryStore2) {
  let rect, propagationWasStopped = false, changedTouches, touches;
  const domEventChangedTouches = domEvent.changedTouches, domEventType = domEvent.type, metaKey = domEvent.metaKey === true, shiftKey = domEvent.shiftKey === true, force = domEventChangedTouches?.[0].force || 0, identifier = normalizeIdentifier(domEventChangedTouches?.[0].identifier || 0), clientX = domEventChangedTouches?.[0].clientX || domEvent.clientX, clientY = domEventChangedTouches?.[0].clientY || domEvent.clientY, pageX = domEventChangedTouches?.[0].pageX || domEvent.pageX, pageY = domEventChangedTouches?.[0].pageY || domEvent.pageY, preventDefault = typeof domEvent.preventDefault == "function" ? domEvent.preventDefault.bind(domEvent) : emptyFunction, timestamp = domEvent.timeStamp;
  function normalizeTouches(touches2) {
    return Array.prototype.slice.call(touches2).map((touch) => ({
      force: touch.force,
      identifier: normalizeIdentifier(touch.identifier),
      get locationX() {
        return locationX(touch.clientX);
      },
      get locationY() {
        return locationY(touch.clientY);
      },
      pageX: touch.pageX,
      pageY: touch.pageY,
      target: touch.target,
      timestamp
    }));
  }
  if (domEventChangedTouches != null) changedTouches = normalizeTouches(domEventChangedTouches), touches = normalizeTouches(domEvent.touches);
  else {
    const emulatedTouches = [
      {
        force,
        identifier,
        get locationX() {
          return locationX(clientX);
        },
        get locationY() {
          return locationY(clientY);
        },
        pageX,
        pageY,
        target: domEvent.target,
        timestamp
      }
    ];
    changedTouches = emulatedTouches, touches = domEventType === "mouseup" || domEventType === "dragstart" ? emptyArray : emulatedTouches;
  }
  const responderEvent = {
    bubbles: true,
    cancelable: true,
    // `currentTarget` is set before dispatch
    currentTarget: null,
    defaultPrevented: domEvent.defaultPrevented,
    dispatchConfig: emptyObject$2,
    eventPhase: domEvent.eventPhase,
    isDefaultPrevented() {
      return domEvent.defaultPrevented;
    },
    isPropagationStopped() {
      return propagationWasStopped;
    },
    isTrusted: domEvent.isTrusted,
    nativeEvent: {
      altKey: false,
      ctrlKey: false,
      metaKey,
      shiftKey,
      changedTouches,
      force,
      identifier,
      get locationX() {
        return locationX(clientX);
      },
      get locationY() {
        return locationY(clientY);
      },
      pageX,
      pageY,
      target: domEvent.target,
      timestamp,
      touches,
      type: domEventType
    },
    persist: emptyFunction,
    preventDefault,
    stopPropagation() {
      propagationWasStopped = true;
    },
    target: domEvent.target,
    timeStamp: timestamp,
    touchHistory: responderTouchHistoryStore2.touchHistory
  };
  function locationX(x) {
    if (rect = rect || getBoundingClientRect(responderEvent.currentTarget), rect) return x - rect.left;
  }
  function locationY(y) {
    if (rect = rect || getBoundingClientRect(responderEvent.currentTarget), rect) return y - rect.top;
  }
  return responderEvent;
}
const MOUSE_DOWN = "mousedown", MOUSE_MOVE = "mousemove", MOUSE_UP = "mouseup", MOUSE_CANCEL = "dragstart", TOUCH_START = "touchstart", TOUCH_MOVE = "touchmove", TOUCH_END = "touchend", TOUCH_CANCEL = "touchcancel", SCROLL = "scroll", SELECT = "select", SELECTION_CHANGE = "selectionchange";
function isStartish(eventType) {
  return eventType === TOUCH_START || eventType === MOUSE_DOWN;
}
function isMoveish(eventType) {
  return eventType === TOUCH_MOVE || eventType === MOUSE_MOVE;
}
function isEndish(eventType) {
  return eventType === TOUCH_END || eventType === MOUSE_UP || isCancelish(eventType);
}
function isCancelish(eventType) {
  return eventType === TOUCH_CANCEL || eventType === MOUSE_CANCEL;
}
function isScroll(eventType) {
  return eventType === SCROLL;
}
function isSelectionChange(eventType) {
  return eventType === SELECT || eventType === SELECTION_CHANGE;
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
class ResponderTouchHistoryStore {
  recordTouchTrack(topLevelType, nativeEvent) {
    const touchHistory = this._touchHistory;
    if (isMoveish(topLevelType)) nativeEvent.changedTouches.forEach((touch) => recordTouchMove(touch, touchHistory));
    else if (isStartish(topLevelType)) nativeEvent.changedTouches.forEach((touch) => recordTouchStart(touch, touchHistory)), touchHistory.numberActiveTouches = nativeEvent.touches.length, touchHistory.numberActiveTouches === 1 && (touchHistory.indexOfSingleActiveTouch = nativeEvent.touches[0].identifier);
    else if (isEndish(topLevelType) && (nativeEvent.changedTouches.forEach((touch) => recordTouchEnd(touch, touchHistory)), touchHistory.numberActiveTouches = nativeEvent.touches.length, touchHistory.numberActiveTouches === 1)) {
      const { touchBank } = touchHistory;
      for (let i = 0; i < touchBank.length; i++) if (touchBank[i]?.touchActive) {
        touchHistory.indexOfSingleActiveTouch = i;
        break;
      }
    }
  }
  get touchHistory() {
    return this._touchHistory;
  }
  constructor() {
    _define_property$1(this, "_touchHistory", {
      touchBank: [],
      //Array<TouchRecord>
      numberActiveTouches: 0,
      // If there is only one active touch, we remember its location. This prevents
      // us having to loop through all of the touches all the time in the most
      // common case.
      indexOfSingleActiveTouch: -1,
      mostRecentTimeStamp: 0
    });
  }
}
const MAX_TOUCH_BANK = 20;
function timestampForTouch(touch) {
  return touch.timeStamp || touch.timestamp;
}
function createTouchRecord(touch) {
  return {
    touchActive: true,
    startPageX: touch.pageX,
    startPageY: touch.pageY,
    startTimeStamp: timestampForTouch(touch),
    currentPageX: touch.pageX,
    currentPageY: touch.pageY,
    currentTimeStamp: timestampForTouch(touch),
    previousPageX: touch.pageX,
    previousPageY: touch.pageY,
    previousTimeStamp: timestampForTouch(touch)
  };
}
function resetTouchRecord(touchRecord, touch) {
  touchRecord.touchActive = true, touchRecord.startPageX = touch.pageX, touchRecord.startPageY = touch.pageY, touchRecord.startTimeStamp = timestampForTouch(touch), touchRecord.currentPageX = touch.pageX, touchRecord.currentPageY = touch.pageY, touchRecord.currentTimeStamp = timestampForTouch(touch), touchRecord.previousPageX = touch.pageX, touchRecord.previousPageY = touch.pageY, touchRecord.previousTimeStamp = timestampForTouch(touch);
}
function getTouchIdentifier({ identifier }) {
  return identifier == null && console.error("Touch object is missing identifier."), identifier;
}
function recordTouchStart(touch, touchHistory) {
  const identifier = getTouchIdentifier(touch), touchRecord = touchHistory.touchBank[identifier];
  touchRecord ? resetTouchRecord(touchRecord, touch) : touchHistory.touchBank[identifier] = createTouchRecord(touch), touchHistory.mostRecentTimeStamp = timestampForTouch(touch);
}
function recordTouchMove(touch, touchHistory) {
  const touchRecord = touchHistory.touchBank[getTouchIdentifier(touch)];
  touchRecord ? (touchRecord.touchActive = true, touchRecord.previousPageX = touchRecord.currentPageX, touchRecord.previousPageY = touchRecord.currentPageY, touchRecord.previousTimeStamp = touchRecord.currentTimeStamp, touchRecord.currentPageX = touch.pageX, touchRecord.currentPageY = touch.pageY, touchRecord.currentTimeStamp = timestampForTouch(touch), touchHistory.mostRecentTimeStamp = timestampForTouch(touch)) : console.warn(`Cannot record touch move without a touch start.
`, `Touch Move: ${printTouch(touch)}
`, `Touch Bank: ${printTouchBank(touchHistory)}`);
}
function recordTouchEnd(touch, touchHistory) {
  const touchRecord = touchHistory.touchBank[getTouchIdentifier(touch)];
  touchRecord ? (touchRecord.touchActive = false, touchRecord.previousPageX = touchRecord.currentPageX, touchRecord.previousPageY = touchRecord.currentPageY, touchRecord.previousTimeStamp = touchRecord.currentTimeStamp, touchRecord.currentPageX = touch.pageX, touchRecord.currentPageY = touch.pageY, touchRecord.currentTimeStamp = timestampForTouch(touch), touchHistory.mostRecentTimeStamp = timestampForTouch(touch)) : console.warn(`Cannot record touch end without a touch start.
`, `Touch End: ${printTouch(touch)}
`, `Touch Bank: ${printTouchBank(touchHistory)}`);
}
function printTouch(touch) {
  return JSON.stringify({
    identifier: touch.identifier,
    pageX: touch.pageX,
    pageY: touch.pageY,
    timestamp: timestampForTouch(touch)
  });
}
function printTouchBank(touchHistory) {
  const { touchBank } = touchHistory;
  let printed = JSON.stringify(touchBank.slice(0, MAX_TOUCH_BANK));
  return touchBank.length > MAX_TOUCH_BANK && (printed += ` (original size: ${touchBank.length})`), printed;
}
const emptyObject$1 = {}, startRegistration = [
  "onStartShouldSetResponderCapture",
  "onStartShouldSetResponder",
  {
    bubbles: true
  }
], moveRegistration = [
  "onMoveShouldSetResponderCapture",
  "onMoveShouldSetResponder",
  {
    bubbles: true
  }
], scrollRegistration = [
  "onScrollShouldSetResponderCapture",
  "onScrollShouldSetResponder",
  {
    bubbles: false
  }
], shouldSetResponderEvents = {
  touchstart: startRegistration,
  mousedown: startRegistration,
  touchmove: moveRegistration,
  mousemove: moveRegistration,
  scroll: scrollRegistration
}, emptyResponder = {
  id: null,
  idPath: null,
  node: null
}, responderListenersMap = /* @__PURE__ */ new Map();
let isEmulatingMouseEvents = false, trackedTouchCount = 0, currentResponder = {
  id: null,
  node: null,
  idPath: null
};
const responderTouchHistoryStore = new ResponderTouchHistoryStore();
function changeCurrentResponder(responder) {
  currentResponder = responder;
}
function getResponderConfig(id) {
  const config = responderListenersMap.get(id);
  return config ?? emptyObject$1;
}
function eventListener(domEvent) {
  const eventType = domEvent.type, eventTarget = domEvent.target;
  if (eventType === "touchstart" && (isEmulatingMouseEvents = true), (eventType === "touchmove" || trackedTouchCount > 1) && (isEmulatingMouseEvents = false), // Ignore browser emulated mouse events
  eventType === "mousedown" && isEmulatingMouseEvents || eventType === "mousemove" && isEmulatingMouseEvents || // Ignore mousemove if a mousedown didn't occur first
  eventType === "mousemove" && trackedTouchCount < 1) return;
  if (isEmulatingMouseEvents && eventType === "mouseup") {
    trackedTouchCount === 0 && (isEmulatingMouseEvents = false);
    return;
  }
  const isStartEvent = isStartish(eventType) && isPrimaryPointerDown(domEvent), isMoveEvent = isMoveish(eventType), isEndEvent = isEndish(eventType), isScrollEvent = isScroll(eventType), isSelectionChangeEvent = isSelectionChange(eventType), responderEvent = createResponderEvent(domEvent, responderTouchHistoryStore);
  (isStartEvent || isMoveEvent || isEndEvent) && (domEvent.touches ? trackedTouchCount = domEvent.touches.length : isStartEvent ? trackedTouchCount = 1 : isEndEvent && (trackedTouchCount = 0), responderTouchHistoryStore.recordTouchTrack(eventType, responderEvent.nativeEvent));
  let eventPaths = getResponderPaths(domEvent), wasNegotiated = false, wantsResponder;
  if (isStartEvent || isMoveEvent || isScrollEvent && trackedTouchCount > 0) {
    const currentResponderIdPath = currentResponder.idPath, eventIdPath = eventPaths.idPath;
    if (currentResponderIdPath != null && eventIdPath != null) {
      const lowestCommonAncestor = getLowestCommonAncestor(currentResponderIdPath, eventIdPath);
      if (lowestCommonAncestor != null) {
        const index2 = eventIdPath.indexOf(lowestCommonAncestor) + (lowestCommonAncestor === currentResponder.id ? 1 : 0);
        eventPaths = {
          idPath: eventIdPath.slice(index2),
          nodePath: eventPaths.nodePath.slice(index2)
        };
      } else eventPaths = null;
    }
    eventPaths != null && (wantsResponder = findWantsResponder(eventPaths, domEvent, responderEvent), wantsResponder != null && (attemptTransfer(responderEvent, wantsResponder), wasNegotiated = true));
  }
  if (currentResponder.id != null && currentResponder.node != null) {
    const { id, node } = currentResponder, { onResponderStart, onResponderMove, onResponderEnd, onResponderRelease, onResponderTerminate, onResponderTerminationRequest } = getResponderConfig(id);
    if (responderEvent.bubbles = false, responderEvent.cancelable = false, responderEvent.currentTarget = node, isStartEvent) onResponderStart != null && (responderEvent.dispatchConfig.registrationName = "onResponderStart", onResponderStart(responderEvent));
    else if (isMoveEvent) onResponderMove != null && (responderEvent.dispatchConfig.registrationName = "onResponderMove", onResponderMove(responderEvent));
    else {
      const isTerminateEvent = isCancelish(eventType) || // native context menu
      eventType === "contextmenu" || // window blur
      eventType === "blur" && eventTarget === window || // responder (or ancestors) blur
      eventType === "blur" && eventTarget.contains(node) && domEvent.relatedTarget !== node || // native scroll without using a pointer
      isScrollEvent && trackedTouchCount === 0 || // native scroll on node that is parent of the responder (allow siblings to scroll)
      isScrollEvent && eventTarget.contains(node) && eventTarget !== node || // native select/selectionchange on node
      isSelectionChangeEvent && hasValidSelection(domEvent), isReleaseEvent = isEndEvent && !isTerminateEvent && !hasTargetTouches(node, domEvent.touches);
      if (isEndEvent && onResponderEnd != null && (responderEvent.dispatchConfig.registrationName = "onResponderEnd", onResponderEnd(responderEvent)), isReleaseEvent && (onResponderRelease != null && (responderEvent.dispatchConfig.registrationName = "onResponderRelease", onResponderRelease(responderEvent)), changeCurrentResponder(emptyResponder)), isTerminateEvent) {
        let shouldTerminate = true;
        (eventType === "contextmenu" || eventType === "scroll" || eventType === "selectionchange") && (wasNegotiated ? shouldTerminate = false : onResponderTerminationRequest != null && (responderEvent.dispatchConfig.registrationName = "onResponderTerminationRequest", onResponderTerminationRequest(responderEvent) === false && (shouldTerminate = false))), shouldTerminate && (onResponderTerminate != null && (responderEvent.dispatchConfig.registrationName = "onResponderTerminate", onResponderTerminate(responderEvent)), changeCurrentResponder(emptyResponder), isEmulatingMouseEvents = false, trackedTouchCount = 0);
      }
    }
  }
}
function findWantsResponder(eventPaths, domEvent, responderEvent) {
  const shouldSetCallbacks = shouldSetResponderEvents[domEvent.type];
  if (shouldSetCallbacks != null) {
    const { idPath, nodePath } = eventPaths, shouldSetCallbackCaptureName = shouldSetCallbacks[0], shouldSetCallbackBubbleName = shouldSetCallbacks[1], { bubbles } = shouldSetCallbacks[2], check = (id, node, callbackName) => {
      const shouldSetCallback = getResponderConfig(id)[callbackName];
      if (shouldSetCallback != null && (responderEvent.currentTarget = node, shouldSetCallback(responderEvent) === true)) {
        const prunedIdPath = idPath.slice(idPath.indexOf(id));
        return {
          id,
          node,
          idPath: prunedIdPath
        };
      }
    };
    for (let i = idPath.length - 1; i >= 0; i--) {
      const id = idPath[i], node = nodePath[i], result = check(id, node, shouldSetCallbackCaptureName);
      if (result != null) return result;
      if (responderEvent.isPropagationStopped() === true) return;
    }
    if (bubbles) for (let i = 0; i < idPath.length; i++) {
      const id = idPath[i], node = nodePath[i], result = check(id, node, shouldSetCallbackBubbleName);
      if (result != null) return result;
      if (responderEvent.isPropagationStopped() === true) return;
    }
    else {
      const id = idPath[0], node = nodePath[0];
      if (domEvent.target === node) return check(id, node, shouldSetCallbackBubbleName);
    }
  }
}
function attemptTransfer(responderEvent, wantsResponder) {
  const { id: currentId, node: currentNode } = currentResponder, { id, node } = wantsResponder, { onResponderGrant, onResponderReject } = getResponderConfig(id);
  if (responderEvent.bubbles = false, responderEvent.cancelable = false, responderEvent.currentTarget = node, currentId == null) onResponderGrant != null && (responderEvent.currentTarget = node, responderEvent.dispatchConfig.registrationName = "onResponderGrant", onResponderGrant(responderEvent)), changeCurrentResponder(wantsResponder);
  else {
    const { onResponderTerminate, onResponderTerminationRequest } = getResponderConfig(currentId);
    let allowTransfer = true;
    onResponderTerminationRequest != null && (responderEvent.currentTarget = currentNode, responderEvent.dispatchConfig.registrationName = "onResponderTerminationRequest", onResponderTerminationRequest(responderEvent) === false && (allowTransfer = false)), allowTransfer ? (onResponderTerminate != null && (responderEvent.currentTarget = currentNode, responderEvent.dispatchConfig.registrationName = "onResponderTerminate", onResponderTerminate(responderEvent)), onResponderGrant != null && (responderEvent.currentTarget = node, responderEvent.dispatchConfig.registrationName = "onResponderGrant", onResponderGrant(responderEvent)), changeCurrentResponder(wantsResponder)) : onResponderReject != null && (responderEvent.currentTarget = node, responderEvent.dispatchConfig.registrationName = "onResponderReject", onResponderReject(responderEvent));
  }
}
const documentEventsCapturePhase = [
  "blur",
  "scroll"
], documentEventsBubblePhase = [
  // mouse
  "mousedown",
  "mousemove",
  "mouseup",
  "dragstart",
  // touch
  "touchstart",
  "touchmove",
  "touchend",
  "touchcancel",
  // other
  "contextmenu",
  "select",
  "selectionchange"
], isTamaguiResponderActive = Symbol();
function attachListeners() {
  canUseDOM && !window[isTamaguiResponderActive] && (window.addEventListener("blur", eventListener), documentEventsBubblePhase.forEach((eventType) => {
    document.addEventListener(eventType, eventListener);
  }), documentEventsCapturePhase.forEach((eventType) => {
    document.addEventListener(eventType, eventListener, true);
  }), window[isTamaguiResponderActive] = true);
}
function addNode(id, node, config) {
  setResponderId(node, id), responderListenersMap.set(id, config);
}
function removeNode(id) {
  currentResponder.id === id && terminateResponder(), responderListenersMap.has(id) && responderListenersMap.delete(id);
}
function terminateResponder() {
  const { id, node } = currentResponder;
  if (id != null && node != null) {
    const { onResponderTerminate } = getResponderConfig(id);
    if (onResponderTerminate != null) {
      const event = createResponderEvent({}, responderTouchHistoryStore);
      event.currentTarget = node, onResponderTerminate(event);
    }
    changeCurrentResponder(emptyResponder);
  }
  isEmulatingMouseEvents = false, trackedTouchCount = 0;
}
const emptyObject = {}, Attached = /* @__PURE__ */ new WeakMap(), Ids = /* @__PURE__ */ new WeakMap();
function useResponderEvents(hostRef, configIn = emptyObject) {
  const config = getResponderConfigIfDefined(configIn), node = hostRef?.current?.host || hostRef?.current;
  reactExports.useEffect(() => {
    if (config === emptyObject) return;
    attachListeners(), Ids.has(hostRef) || Ids.set(hostRef, `${Math.random()}`);
    const id = Ids.get(hostRef);
    return addNode(id, node, config), Attached.set(hostRef, true), () => {
      removeNode(node), Attached.set(hostRef, false);
    };
  }, [
    config,
    hostRef
  ]);
}
function getResponderConfigIfDefined({ onMoveShouldSetResponder, onMoveShouldSetResponderCapture, onResponderEnd, onResponderGrant, onResponderMove, onResponderReject, onResponderRelease, onResponderStart, onResponderTerminate, onResponderTerminationRequest, onScrollShouldSetResponder, onScrollShouldSetResponderCapture, onSelectionChangeShouldSetResponder, onSelectionChangeShouldSetResponderCapture, onStartShouldSetResponder, onStartShouldSetResponderCapture }) {
  return onMoveShouldSetResponder || onMoveShouldSetResponderCapture || onResponderEnd || onResponderGrant || onResponderMove || onResponderReject || onResponderRelease || onResponderStart || onResponderTerminate || onResponderTerminationRequest || onScrollShouldSetResponder || onScrollShouldSetResponderCapture || onSelectionChangeShouldSetResponder || onSelectionChangeShouldSetResponderCapture || onStartShouldSetResponder || onStartShouldSetResponderCapture ? {
    onMoveShouldSetResponder,
    onMoveShouldSetResponderCapture,
    onResponderEnd,
    onResponderGrant,
    onResponderMove,
    onResponderReject,
    onResponderRelease,
    onResponderStart,
    onResponderTerminate,
    onResponderTerminationRequest,
    onScrollShouldSetResponder,
    onScrollShouldSetResponderCapture,
    onSelectionChangeShouldSetResponder,
    onSelectionChangeShouldSetResponderCapture,
    onStartShouldSetResponder,
    onStartShouldSetResponderCapture
  } : emptyObject;
}
const LayoutHandlers = /* @__PURE__ */ new WeakMap(), Nodes = /* @__PURE__ */ new Set(), IntersectionState = /* @__PURE__ */ new WeakMap();
let globalIntersectionObserver = null;
const NodeRectCache = /* @__PURE__ */ new WeakMap(), ParentRectCache = /* @__PURE__ */ new WeakMap(), LastChangeTime = /* @__PURE__ */ new WeakMap(), rAF = typeof window < "u" ? window.requestAnimationFrame : void 0;
let avoidUpdates = true;
const queuedUpdates = /* @__PURE__ */ new Map();
function enable() {
  avoidUpdates && (avoidUpdates = false, queuedUpdates && (queuedUpdates.forEach((cb) => cb()), queuedUpdates.clear()));
}
function startGlobalObservers() {
  !isClient || globalIntersectionObserver || (globalIntersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const node = entry.target;
      IntersectionState.get(node) !== entry.isIntersecting && IntersectionState.set(node, entry.isIntersecting);
    });
  }, {
    threshold: 0
  }));
}
if (isClient) {
  if (rAF) {
    const supportsCheckVisibility = "checkVisibility" in document.body, BoundingRects = /* @__PURE__ */ new WeakMap();
    async function updateLayoutIfChanged(node) {
      if (IntersectionState.get(node) === false || process.env.TAMAGUI_ONLAYOUT_VISIBILITY_CHECK === "1" && supportsCheckVisibility && !node.checkVisibility()) return;
      const onLayout = LayoutHandlers.get(node);
      if (typeof onLayout != "function") return;
      const parentNode = node.parentElement;
      if (!parentNode) return;
      let nodeRect, parentRect;
      {
        const [nr, pr] = await Promise.all([
          BoundingRects.get(node) || getBoundingClientRectAsync(node),
          BoundingRects.get(parentNode) || getBoundingClientRectAsync(parentNode)
        ]);
        if (nr === false || pr === false) return;
        nodeRect = nr, parentRect = pr;
      }
      const cachedRect = NodeRectCache.get(node), cachedParentRect = NodeRectCache.get(parentNode);
      if (!cachedRect || // has changed one rect
      // @ts-expect-error DOMRectReadOnly can go into object
      !isEqualShallow(cachedRect, nodeRect) && // @ts-expect-error DOMRectReadOnly can go into object
      (!cachedParentRect || !isEqualShallow(cachedParentRect, parentRect))) {
        NodeRectCache.set(node, nodeRect), ParentRectCache.set(parentNode, parentRect);
        const event = getElementLayoutEvent(nodeRect, parentRect);
        avoidUpdates ? queuedUpdates.set(node, () => onLayout(event)) : onLayout(event);
      }
    }
    rAF(layoutOnAnimationFrame);
    let frameCount = 0;
    const userSkipVal = process.env.TAMAGUI_LAYOUT_FRAME_SKIP, RUN_EVERY_X_FRAMES = userSkipVal ? +userSkipVal : 10;
    async function layoutOnAnimationFrame() {
      {
        if (!Nodes.size || frameCount++ % RUN_EVERY_X_FRAMES !== 0) {
          rAF(layoutOnAnimationFrame);
          return;
        }
        frameCount === Number.MAX_SAFE_INTEGER && (frameCount = 0), await new Promise((res) => {
          const io = new IntersectionObserver((entries) => {
            io.disconnect();
            for (const entry of entries) BoundingRects.set(entry.target, entry.boundingClientRect);
            res();
          }, {
            threshold: 0
          });
          for (const node of Nodes) node.parentElement instanceof HTMLElement && (io.observe(node), io.observe(node.parentElement));
        }), Nodes.forEach((node) => {
          updateLayoutIfChanged(node);
        });
      }
      rAF(layoutOnAnimationFrame);
    }
  }
}
const getElementLayoutEvent = (nodeRect, parentRect) => ({
  nativeEvent: {
    layout: getRelativeDimensions(nodeRect, parentRect),
    target: nodeRect
  },
  timeStamp: Date.now()
}), getRelativeDimensions = (a, b) => {
  const { height, left, top, width } = a, x = left - b.left, y = top - b.top;
  return {
    x,
    y,
    width,
    height,
    pageX: a.left,
    pageY: a.top
  };
};
function useElementLayout(ref, onLayout) {
  const node = ensureWebElement(ref.current?.host);
  node && onLayout && LayoutHandlers.set(node, onLayout), useIsomorphicLayoutEffect(() => {
    if (!onLayout) return;
    const node2 = ref.current?.host;
    if (!node2) return;
    Nodes.add(node2), startGlobalObservers(), globalIntersectionObserver && (globalIntersectionObserver.observe(node2), IntersectionState.set(node2, true));
    const parentNode = node2.parentNode;
    return parentNode && onLayout(getElementLayoutEvent(node2.getBoundingClientRect(), parentNode.getBoundingClientRect())), () => {
      Nodes.delete(node2), LayoutHandlers.delete(node2), NodeRectCache.delete(node2), LastChangeTime.delete(node2), IntersectionState.delete(node2), globalIntersectionObserver && globalIntersectionObserver.unobserve(node2);
    };
  }, [
    ref,
    !!onLayout
  ]);
}
function ensureWebElement(x) {
  if (!(typeof HTMLElement > "u")) return x instanceof HTMLElement ? x : void 0;
}
const getBoundingClientRectAsync = (node) => new Promise((res) => {
  if (!node || node.nodeType !== 1) return res(false);
  const io = new IntersectionObserver((entries) => (io.disconnect(), res(entries[0].boundingClientRect)), {
    threshold: 0
  });
  io.observe(node);
}), measureNode = async (node, relativeTo) => {
  const relativeNode = relativeTo || node?.parentElement;
  if (relativeNode instanceof HTMLElement) {
    const [nodeDim, relativeNodeDim] = await Promise.all([
      getBoundingClientRectAsync(node),
      getBoundingClientRectAsync(relativeNode)
    ]);
    if (relativeNodeDim && nodeDim) return getRelativeDimensions(nodeDim, relativeNodeDim);
  }
  return null;
}, measure = async (node, callback) => {
  const out = await measureNode(node, node.parentNode instanceof HTMLElement ? node.parentNode : null);
  return out && callback?.(out.x, out.y, out.width, out.height, out.pageX, out.pageY), out;
};
function createMeasure(node) {
  return (callback) => measure(node, callback);
}
const measureInWindow = async (node, callback) => {
  const out = await measureNode(node, null);
  return out && callback?.(out.pageX, out.pageY, out.width, out.height), out;
}, createMeasureInWindow = (node) => (callback) => measureInWindow(node, callback), measureLayout = async (node, relativeNode, callback) => {
  const out = await measureNode(node, relativeNode);
  return out && callback?.(out.x, out.y, out.width, out.height, out.pageX, out.pageY), out;
};
function createMeasureLayout(node) {
  return (relativeTo, callback) => measureLayout(node, relativeTo, callback);
}
function getBaseViews() {
  return null;
}
const TamaguiProvider = (props) => (useIsomorphicLayoutEffect(() => {
  enable();
}, []), /* @__PURE__ */ jsxRuntimeExports.jsx(TamaguiProvider$1, {
  ...props
})), createTamagui = (conf2) => createTamagui$1(conf2);
setupHooks({
  getBaseViews,
  setElementProps: (node) => {
    var _node, _node1, _node2;
    node && !node.measure && ((_node = node).measure || (_node.measure = createMeasure(node)), (_node1 = node).measureInWindow || (_node1.measureInWindow = createMeasureInWindow(node)), (_node2 = node).measureLayout || (_node2.measureLayout = createMeasureLayout(node)));
  },
  usePropsTransform(elementType, propsIn, stateRef, willHydrate) {
    {
      const isDOM = typeof elementType == "string", {
        // remove event props handles by useResponderEvents
        onMoveShouldSetResponder,
        onMoveShouldSetResponderCapture,
        onResponderEnd,
        onResponderGrant,
        onResponderMove,
        onResponderReject,
        onResponderRelease,
        onResponderStart,
        onResponderTerminate,
        onResponderTerminationRequest,
        onScrollShouldSetResponder,
        onScrollShouldSetResponderCapture,
        onSelectionChangeShouldSetResponder,
        onSelectionChangeShouldSetResponderCapture,
        onStartShouldSetResponder,
        onStartShouldSetResponderCapture,
        // android
        collapsable,
        focusable,
        // deprecated,
        accessible,
        accessibilityDisabled,
        onLayout,
        hrefAttrs,
        ...plainDOMProps
      } = propsIn;
      if ((willHydrate || isDOM) && (useElementLayout(stateRef, isDOM ? onLayout : void 0), useResponderEvents(stateRef, isDOM ? propsIn : void 0)), isDOM) {
        if (plainDOMProps.href && hrefAttrs) {
          const { download, rel, target } = hrefAttrs;
          download != null && (plainDOMProps.download = download), rel && (plainDOMProps.rel = rel), typeof target == "string" && (plainDOMProps.target = target.charAt(0) !== "_" ? `_${target}` : target);
        }
        return plainDOMProps;
      }
    }
  },
  useEvents(viewProps, events, splitStyles, setStateShallow, staticConfig) {
  }
});
const View = View$1, Text = Text$1;
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
class Emitter {
  constructor(value) {
    _define_property(this, "disposables", /* @__PURE__ */ new Set());
    _define_property(this, "listen", (disposable) => (this.disposables.add(disposable), () => {
      this.disposables.delete(disposable);
    }));
    _define_property(this, "emit", (next) => {
      this.value = next, this.disposables.forEach((cb) => cb(next));
    });
    _define_property(this, "use", (cb, args) => {
      reactExports.useLayoutEffect(() => this.listen(cb), args ?? []);
    });
    _define_property(this, "useValue", () => {
      const [state, setState] = reactExports.useState(this.value);
      return this.use(setState), state;
    });
    _define_property(this, "nextValue", () => new Promise((res) => {
      const dispose2 = this.listen((val) => {
        dispose2(), res(val);
      });
    }));
    this.value = value;
  }
}
function createEmitter(defaultValue) {
  return new Emitter(defaultValue);
}
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
  enumerable: true,
  configurable: true,
  writable: true,
  value
}) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)) {
    if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var BetterFetchError = class extends Error {
  constructor(status, statusText, error) {
    super(statusText || status.toString(), {
      cause: error
    });
    this.status = status;
    this.statusText = statusText;
    this.error = error;
  }
};
var initializePlugins = async (url, options) => {
  var _a, _b, _c, _d, _e, _f;
  let opts = options || {};
  const hooks2 = {
    onRequest: [
      options == null ? void 0 : options.onRequest
    ],
    onResponse: [
      options == null ? void 0 : options.onResponse
    ],
    onSuccess: [
      options == null ? void 0 : options.onSuccess
    ],
    onError: [
      options == null ? void 0 : options.onError
    ],
    onRetry: [
      options == null ? void 0 : options.onRetry
    ]
  };
  if (!options || !(options == null ? void 0 : options.plugins)) {
    return {
      url,
      options: opts,
      hooks: hooks2
    };
  }
  for (const plugin of (options == null ? void 0 : options.plugins) || []) {
    if (plugin.init) {
      const pluginRes = await ((_a = plugin.init) == null ? void 0 : _a.call(plugin, url.toString(), options));
      opts = pluginRes.options || opts;
      url = pluginRes.url;
    }
    hooks2.onRequest.push((_b = plugin.hooks) == null ? void 0 : _b.onRequest);
    hooks2.onResponse.push((_c = plugin.hooks) == null ? void 0 : _c.onResponse);
    hooks2.onSuccess.push((_d = plugin.hooks) == null ? void 0 : _d.onSuccess);
    hooks2.onError.push((_e = plugin.hooks) == null ? void 0 : _e.onError);
    hooks2.onRetry.push((_f = plugin.hooks) == null ? void 0 : _f.onRetry);
  }
  return {
    url,
    options: opts,
    hooks: hooks2
  };
};
var LinearRetryStrategy = class {
  shouldAttemptRetry(attempt, response) {
    if (this.options.shouldRetry) {
      return Promise.resolve(attempt < this.options.attempts && this.options.shouldRetry(response));
    }
    return Promise.resolve(attempt < this.options.attempts);
  }
  getDelay() {
    return this.options.delay;
  }
  constructor(options) {
    this.options = options;
  }
};
var ExponentialRetryStrategy = class {
  shouldAttemptRetry(attempt, response) {
    if (this.options.shouldRetry) {
      return Promise.resolve(attempt < this.options.attempts && this.options.shouldRetry(response));
    }
    return Promise.resolve(attempt < this.options.attempts);
  }
  getDelay(attempt) {
    const delay = Math.min(this.options.maxDelay, this.options.baseDelay * 2 ** attempt);
    return delay;
  }
  constructor(options) {
    this.options = options;
  }
};
function createRetryStrategy(options) {
  if (typeof options === "number") {
    return new LinearRetryStrategy({
      type: "linear",
      attempts: options,
      delay: 1e3
    });
  }
  switch (options.type) {
    case "linear":
      return new LinearRetryStrategy(options);
    case "exponential":
      return new ExponentialRetryStrategy(options);
    default:
      throw new Error("Invalid retry strategy");
  }
}
var getAuthHeader = async (options) => {
  const headers = {};
  const getValue = async (value) => typeof value === "function" ? await value() : value;
  if (options == null ? void 0 : options.auth) {
    if (options.auth.type === "Bearer") {
      const token = await getValue(options.auth.token);
      if (!token) {
        return headers;
      }
      headers["authorization"] = `Bearer ${token}`;
    } else if (options.auth.type === "Basic") {
      const username = getValue(options.auth.username);
      const password = getValue(options.auth.password);
      if (!username || !password) {
        return headers;
      }
      headers["authorization"] = `Basic ${btoa(`${username}:${password}`)}`;
    } else if (options.auth.type === "Custom") {
      const value = getValue(options.auth.value);
      if (!value) {
        return headers;
      }
      headers["authorization"] = `${getValue(options.auth.prefix)} ${value}`;
    }
  }
  return headers;
};
var JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(request) {
  const _contentType = request.headers.get("content-type");
  const textTypes = /* @__PURE__ */ new Set([
    "image/svg",
    "application/xml",
    "application/xhtml",
    "application/html"
  ]);
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function isJSONParsable(value) {
  try {
    JSON.parse(value);
    return true;
  } catch (error) {
    return false;
  }
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
function jsonParse(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    return text;
  }
}
function isFunction(value) {
  return typeof value === "function";
}
function getFetch(options) {
  if (options == null ? void 0 : options.customFetchImpl) {
    return options.customFetchImpl;
  }
  if (typeof globalThis !== "undefined" && isFunction(globalThis.fetch)) {
    return globalThis.fetch;
  }
  if (typeof window !== "undefined" && isFunction(window.fetch)) {
    return window.fetch;
  }
  throw new Error("No fetch implementation found");
}
async function getHeaders(opts) {
  const headers = new Headers(opts == null ? void 0 : opts.headers);
  const authHeader = await getAuthHeader(opts);
  for (const [key, value] of Object.entries(authHeader || {})) {
    headers.set(key, value);
  }
  if (!headers.has("content-type")) {
    const t = detectContentType(opts == null ? void 0 : opts.body);
    if (t) {
      headers.set("content-type", t);
    }
  }
  return headers;
}
function detectContentType(body) {
  if (isJSONSerializable(body)) {
    return "application/json";
  }
  return null;
}
function getBody(options) {
  if (!(options == null ? void 0 : options.body)) {
    return null;
  }
  const headers = new Headers(options == null ? void 0 : options.headers);
  if (isJSONSerializable(options.body) && !headers.has("content-type")) {
    for (const [key, value] of Object.entries(options == null ? void 0 : options.body)) {
      if (value instanceof Date) {
        options.body[key] = value.toISOString();
      }
    }
    return JSON.stringify(options.body);
  }
  return options.body;
}
function getMethod$1(url, options) {
  var _a;
  if (options == null ? void 0 : options.method) {
    return options.method.toUpperCase();
  }
  if (url.startsWith("@")) {
    const pMethod = (_a = url.split("@")[1]) == null ? void 0 : _a.split("/")[0];
    if (!methods.includes(pMethod)) {
      return (options == null ? void 0 : options.body) ? "POST" : "GET";
    }
    return pMethod.toUpperCase();
  }
  return (options == null ? void 0 : options.body) ? "POST" : "GET";
}
function getTimeout(options, controller) {
  let abortTimeout;
  if (!(options == null ? void 0 : options.signal) && (options == null ? void 0 : options.timeout)) {
    abortTimeout = setTimeout(() => controller == null ? void 0 : controller.abort(), options == null ? void 0 : options.timeout);
  }
  return {
    abortTimeout,
    clearTimeout: () => {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
  };
}
var ValidationError = class _ValidationError extends Error {
  constructor(issues, message) {
    super(message || JSON.stringify(issues, null, 2));
    this.issues = issues;
    Object.setPrototypeOf(this, _ValidationError.prototype);
  }
};
async function parseStandardSchema(schema, input) {
  let result = await schema["~standard"].validate(input);
  if (result.issues) {
    throw new ValidationError(result.issues);
  }
  return result.value;
}
var methods = [
  "get",
  "post",
  "put",
  "patch",
  "delete"
];
var applySchemaPlugin = (config) => ({
  id: "apply-schema",
  name: "Apply Schema",
  version: "1.0.0",
  async init(url, options) {
    var _a, _b, _c, _d;
    const schema = ((_b = (_a = config.plugins) == null ? void 0 : _a.find((plugin) => {
      var _a2;
      return ((_a2 = plugin.schema) == null ? void 0 : _a2.config) ? url.startsWith(plugin.schema.config.baseURL || "") || url.startsWith(plugin.schema.config.prefix || "") : false;
    })) == null ? void 0 : _b.schema) || config.schema;
    if (schema) {
      let urlKey = url;
      if ((_c = schema.config) == null ? void 0 : _c.prefix) {
        if (urlKey.startsWith(schema.config.prefix)) {
          urlKey = urlKey.replace(schema.config.prefix, "");
          if (schema.config.baseURL) {
            url = url.replace(schema.config.prefix, schema.config.baseURL);
          }
        }
      }
      if ((_d = schema.config) == null ? void 0 : _d.baseURL) {
        if (urlKey.startsWith(schema.config.baseURL)) {
          urlKey = urlKey.replace(schema.config.baseURL, "");
        }
      }
      const keySchema = schema.schema[urlKey];
      if (keySchema) {
        let opts = __spreadProps(__spreadValues({}, options), {
          method: keySchema.method,
          output: keySchema.output
        });
        if (!(options == null ? void 0 : options.disableValidation)) {
          opts = __spreadProps(__spreadValues({}, opts), {
            body: keySchema.input ? await parseStandardSchema(keySchema.input, options == null ? void 0 : options.body) : options == null ? void 0 : options.body,
            params: keySchema.params ? await parseStandardSchema(keySchema.params, options == null ? void 0 : options.params) : options == null ? void 0 : options.params,
            query: keySchema.query ? await parseStandardSchema(keySchema.query, options == null ? void 0 : options.query) : options == null ? void 0 : options.query
          });
        }
        return {
          url,
          options: opts
        };
      }
    }
    return {
      url,
      options
    };
  }
});
var createFetch = (config) => {
  async function $fetch(url, options) {
    const opts = __spreadProps(__spreadValues(__spreadValues({}, config), options), {
      plugins: [
        ...(config == null ? void 0 : config.plugins) || [],
        applySchemaPlugin(config || {})
      ]
    });
    if (config == null ? void 0 : config.catchAllError) {
      try {
        return await betterFetch(url, opts);
      } catch (error) {
        return {
          data: null,
          error: {
            status: 500,
            statusText: "Fetch Error",
            message: "Fetch related error. Captured by catchAllError option. See error property for more details.",
            error
          }
        };
      }
    }
    return await betterFetch(url, opts);
  }
  return $fetch;
};
function getURL2(url, option) {
  let { baseURL, params, query } = option || {
    query: {},
    params: {},
    baseURL: ""
  };
  let basePath = url.startsWith("http") ? url.split("/").slice(0, 3).join("/") : baseURL || "";
  if (url.startsWith("@")) {
    const m = url.toString().split("@")[1].split("/")[0];
    if (methods.includes(m)) {
      url = url.replace(`@${m}/`, "/");
    }
  }
  if (!basePath.endsWith("/")) basePath += "/";
  let [path, urlQuery] = url.replace(basePath, "").split("?");
  const queryParams = new URLSearchParams(urlQuery);
  for (const [key, value] of Object.entries(query || {})) {
    if (value == null) continue;
    queryParams.set(key, String(value));
  }
  if (params) {
    if (Array.isArray(params)) {
      const paramPaths = path.split("/").filter((p) => p.startsWith(":"));
      for (const [index2, key] of paramPaths.entries()) {
        const value = params[index2];
        path = path.replace(key, value);
      }
    } else {
      for (const [key, value] of Object.entries(params)) {
        path = path.replace(`:${key}`, String(value));
      }
    }
  }
  path = path.split("/").map(encodeURIComponent).join("/");
  if (path.startsWith("/")) path = path.slice(1);
  let queryParamString = queryParams.toString();
  queryParamString = queryParamString.length > 0 ? `?${queryParamString}`.replace(/\+/g, "%20") : "";
  if (!basePath.startsWith("http")) {
    return `${basePath}${path}${queryParamString}`;
  }
  const _url = new URL(`${path}${queryParamString}`, basePath);
  return _url;
}
var betterFetch = async (url, options) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const { hooks: hooks2, url: __url, options: opts } = await initializePlugins(url, options);
  const fetch2 = getFetch(opts);
  const controller = new AbortController();
  const signal = (_a = opts.signal) != null ? _a : controller.signal;
  const _url = getURL2(__url, opts);
  const body = getBody(opts);
  const headers = await getHeaders(opts);
  const method = getMethod$1(__url, opts);
  let context = __spreadProps(__spreadValues({}, opts), {
    url: _url,
    headers,
    body,
    method,
    signal
  });
  for (const onRequest of hooks2.onRequest) {
    if (onRequest) {
      const res = await onRequest(context);
      if (res instanceof Object) {
        context = res;
      }
    }
  }
  if ("pipeTo" in context && typeof context.pipeTo === "function" || typeof ((_b = options == null ? void 0 : options.body) == null ? void 0 : _b.pipe) === "function") {
    if (!("duplex" in context)) {
      context.duplex = "half";
    }
  }
  const { clearTimeout: clearTimeout2 } = getTimeout(opts, controller);
  let response = await fetch2(context.url, context);
  clearTimeout2();
  const responseContext = {
    response,
    request: context
  };
  for (const onResponse of hooks2.onResponse) {
    if (onResponse) {
      const r = await onResponse(__spreadProps(__spreadValues({}, responseContext), {
        response: ((_c = options == null ? void 0 : options.hookOptions) == null ? void 0 : _c.cloneResponse) ? response.clone() : response
      }));
      if (r instanceof Response) {
        response = r;
      } else if (r instanceof Object) {
        response = r.response;
      }
    }
  }
  if (response.ok) {
    const hasBody = context.method !== "HEAD";
    if (!hasBody) {
      return {
        data: "",
        error: null
      };
    }
    const responseType = detectResponseType(response);
    const successContext = {
      data: "",
      response,
      request: context
    };
    if (responseType === "json" || responseType === "text") {
      const text = await response.text();
      const parser2 = (_d = context.jsonParser) != null ? _d : jsonParse;
      const data = await parser2(text);
      successContext.data = data;
    } else {
      successContext.data = await response[responseType]();
    }
    if (context == null ? void 0 : context.output) {
      if (context.output && !context.disableValidation) {
        successContext.data = await parseStandardSchema(context.output, successContext.data);
      }
    }
    for (const onSuccess of hooks2.onSuccess) {
      if (onSuccess) {
        await onSuccess(__spreadProps(__spreadValues({}, successContext), {
          response: ((_e = options == null ? void 0 : options.hookOptions) == null ? void 0 : _e.cloneResponse) ? response.clone() : response
        }));
      }
    }
    if (options == null ? void 0 : options.throw) {
      return successContext.data;
    }
    return {
      data: successContext.data,
      error: null
    };
  }
  const parser = (_f = options == null ? void 0 : options.jsonParser) != null ? _f : jsonParse;
  const responseText = await response.text();
  const isJSONResponse = isJSONParsable(responseText);
  const errorObject = isJSONResponse ? await parser(responseText) : null;
  const errorContext = {
    response,
    responseText,
    request: context,
    error: __spreadProps(__spreadValues({}, errorObject), {
      status: response.status,
      statusText: response.statusText
    })
  };
  for (const onError of hooks2.onError) {
    if (onError) {
      await onError(__spreadProps(__spreadValues({}, errorContext), {
        response: ((_g = options == null ? void 0 : options.hookOptions) == null ? void 0 : _g.cloneResponse) ? response.clone() : response
      }));
    }
  }
  if (options == null ? void 0 : options.retry) {
    const retryStrategy = createRetryStrategy(options.retry);
    const _retryAttempt = (_h = options.retryAttempt) != null ? _h : 0;
    if (await retryStrategy.shouldAttemptRetry(_retryAttempt, response)) {
      for (const onRetry of hooks2.onRetry) {
        if (onRetry) {
          await onRetry(responseContext);
        }
      }
      const delay = retryStrategy.getDelay(_retryAttempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return await betterFetch(url, __spreadProps(__spreadValues({}, options), {
        retryAttempt: _retryAttempt + 1
      }));
    }
  }
  if (options == null ? void 0 : options.throw) {
    throw new BetterFetchError(response.status, response.statusText, isJSONResponse ? errorObject : responseText);
  }
  return {
    data: null,
    error: __spreadProps(__spreadValues({}, errorObject), {
      status: response.status,
      statusText: response.statusText
    })
  };
};
const _envShim = /* @__PURE__ */ Object.create(null);
const _getEnv = (useShim) => globalThis.process?.env || //@ts-expect-error
globalThis.Deno?.env.toObject() || //@ts-expect-error
globalThis.__env__ || (useShim ? _envShim : globalThis);
const env = new Proxy(_envShim, {
  get(_, prop) {
    const env2 = _getEnv();
    return env2[prop] ?? _envShim[prop];
  },
  has(_, prop) {
    const env2 = _getEnv();
    return prop in env2 || prop in _envShim;
  },
  set(_, prop, value) {
    const env2 = _getEnv(true);
    env2[prop] = value;
    return true;
  },
  deleteProperty(_, prop) {
    if (!prop) {
      return false;
    }
    const env2 = _getEnv(true);
    delete env2[prop];
    return true;
  },
  ownKeys() {
    const env2 = _getEnv(true);
    return Object.keys(env2);
  }
});
function toBoolean(val) {
  return val ? val !== "false" : false;
}
const nodeENV = typeof process !== "undefined" && process.env && "production" || "";
nodeENV === "test" || toBoolean(env.TEST);
class BetterAuthError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = "BetterAuthError";
    this.message = message;
    this.cause = cause;
    this.stack = "";
  }
}
function checkHasPath(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.pathname !== "/";
  } catch (error) {
    throw new BetterAuthError(`Invalid base URL: ${url}. Please provide a valid base URL.`);
  }
}
function withPath(url, path = "/api/auth") {
  const hasPath = checkHasPath(url);
  if (hasPath) {
    return url;
  }
  path = path.startsWith("/") ? path : `/${path}`;
  return `${url.replace(/\/+$/, "")}${path}`;
}
function getBaseURL(url, path, request) {
  if (url) {
    return withPath(url, path);
  }
  const fromEnv = env.BETTER_AUTH_URL || env.NEXT_PUBLIC_BETTER_AUTH_URL || env.PUBLIC_BETTER_AUTH_URL || env.NUXT_PUBLIC_BETTER_AUTH_URL || env.NUXT_PUBLIC_AUTH_URL || (env.BASE_URL !== "/" ? env.BASE_URL : void 0);
  if (fromEnv) {
    return withPath(fromEnv, path);
  }
  if (typeof window !== "undefined" && window.location) {
    return withPath(window.location.origin, path);
  }
  return void 0;
}
let listenerQueue = [];
let lqIndex = 0;
const QUEUE_ITEMS_PER_LISTENER = 4;
let atom = (initialValue) => {
  let listeners2 = [];
  let $atom = {
    get() {
      if (!$atom.lc) {
        $atom.listen(() => {
        })();
      }
      return $atom.value;
    },
    lc: 0,
    listen(listener) {
      $atom.lc = listeners2.push(listener);
      return () => {
        for (let i = lqIndex + QUEUE_ITEMS_PER_LISTENER; i < listenerQueue.length; ) {
          if (listenerQueue[i] === listener) {
            listenerQueue.splice(i, QUEUE_ITEMS_PER_LISTENER);
          } else {
            i += QUEUE_ITEMS_PER_LISTENER;
          }
        }
        let index2 = listeners2.indexOf(listener);
        if (~index2) {
          listeners2.splice(index2, 1);
          if (!--$atom.lc) $atom.off();
        }
      };
    },
    notify(oldValue, changedKey) {
      let runListenerQueue = !listenerQueue.length;
      for (let listener of listeners2) {
        listenerQueue.push(listener, $atom.value, oldValue, changedKey);
      }
      if (runListenerQueue) {
        for (lqIndex = 0; lqIndex < listenerQueue.length; lqIndex += QUEUE_ITEMS_PER_LISTENER) {
          listenerQueue[lqIndex](listenerQueue[lqIndex + 1], listenerQueue[lqIndex + 2], listenerQueue[lqIndex + 3]);
        }
        listenerQueue.length = 0;
      }
    },
    /* It will be called on last listener unsubscribing.
    We will redefine it in onMount and onStop. */
    off() {
    },
    set(newValue) {
      let oldValue = $atom.value;
      if (oldValue !== newValue) {
        $atom.value = newValue;
        $atom.notify(oldValue);
      }
    },
    subscribe(listener) {
      let unbind = $atom.listen(listener);
      listener($atom.value);
      return unbind;
    },
    value: initialValue
  };
  return $atom;
};
const MOUNT = 5;
const UNMOUNT = 6;
const REVERT_MUTATION = 10;
let on = (object, listener, eventKey, mutateStore) => {
  object.events = object.events || {};
  if (!object.events[eventKey + REVERT_MUTATION]) {
    object.events[eventKey + REVERT_MUTATION] = mutateStore((eventProps) => {
      object.events[eventKey].reduceRight((event, l) => (l(event), event), {
        shared: {},
        ...eventProps
      });
    });
  }
  object.events[eventKey] = object.events[eventKey] || [];
  object.events[eventKey].push(listener);
  return () => {
    let currentListeners = object.events[eventKey];
    let index2 = currentListeners.indexOf(listener);
    currentListeners.splice(index2, 1);
    if (!currentListeners.length) {
      delete object.events[eventKey];
      object.events[eventKey + REVERT_MUTATION]();
      delete object.events[eventKey + REVERT_MUTATION];
    }
  };
};
let STORE_UNMOUNT_DELAY = 1e3;
let onMount = ($store, initialize) => {
  let listener = (payload) => {
    let destroy = initialize(payload);
    if (destroy) $store.events[UNMOUNT].push(destroy);
  };
  return on($store, listener, MOUNT, (runListeners) => {
    let originListen = $store.listen;
    $store.listen = (...args) => {
      if (!$store.lc && !$store.active) {
        $store.active = true;
        runListeners();
      }
      return originListen(...args);
    };
    let originOff = $store.off;
    $store.events[UNMOUNT] = [];
    $store.off = () => {
      originOff();
      setTimeout(() => {
        if ($store.active && !$store.lc) {
          $store.active = false;
          for (let destroy of $store.events[UNMOUNT]) destroy();
          $store.events[UNMOUNT] = [];
        }
      }, STORE_UNMOUNT_DELAY);
    };
    return () => {
      $store.listen = originListen;
      $store.off = originOff;
    };
  });
};
const useAuthQuery = (initializedAtom, path, $fetch, options) => {
  const value = atom({
    data: null,
    error: null,
    isPending: true,
    isRefetching: false,
    refetch: () => {
      return fn();
    }
  });
  const fn = () => {
    const opts = typeof options === "function" ? options({
      data: value.get().data,
      error: value.get().error,
      isPending: value.get().isPending
    }) : options;
    return $fetch(path, {
      ...opts,
      async onSuccess(context) {
        if (typeof window !== "undefined") {
          value.set({
            data: context.data,
            error: null,
            isPending: false,
            isRefetching: false,
            refetch: value.value.refetch
          });
        }
        await opts?.onSuccess?.(context);
      },
      async onError(context) {
        const { request } = context;
        const retryAttempts = typeof request.retry === "number" ? request.retry : request.retry?.attempts;
        const retryAttempt = request.retryAttempt || 0;
        if (retryAttempts && retryAttempt < retryAttempts) return;
        value.set({
          error: context.error,
          data: null,
          isPending: false,
          isRefetching: false,
          refetch: value.value.refetch
        });
        await opts?.onError?.(context);
      },
      async onRequest(context) {
        const currentValue = value.get();
        value.set({
          isPending: currentValue.data === null,
          data: currentValue.data,
          error: null,
          isRefetching: true,
          refetch: value.value.refetch
        });
        await opts?.onRequest?.(context);
      }
    });
  };
  initializedAtom = Array.isArray(initializedAtom) ? initializedAtom : [
    initializedAtom
  ];
  let isMounted = false;
  for (const initAtom of initializedAtom) {
    initAtom.subscribe(() => {
      if (isMounted) {
        fn();
      } else {
        onMount(value, () => {
          fn();
          isMounted = true;
          return () => {
            value.off();
            initAtom.off();
          };
        });
      }
    });
  }
  return value;
};
const PROTO_POLLUTION_PATTERNS = {
  proto: /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
  constructor: /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
  protoShort: /"__proto__"\s*:/,
  constructorShort: /"constructor"\s*:/
};
const JSON_SIGNATURE = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
const SPECIAL_VALUES = {
  true: true,
  false: false,
  null: null,
  undefined: void 0,
  nan: Number.NaN,
  infinity: Number.POSITIVE_INFINITY,
  "-infinity": Number.NEGATIVE_INFINITY
};
const ISO_DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,7}))?(?:Z|([+-])(\d{2}):(\d{2}))$/;
function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}
function parseISODate(value) {
  const match = ISO_DATE_REGEX.exec(value);
  if (!match) return null;
  const [, year, month, day, hour, minute, second, ms, offsetSign, offsetHour, offsetMinute] = match;
  let date = new Date(Date.UTC(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10), parseInt(hour, 10), parseInt(minute, 10), parseInt(second, 10), ms ? parseInt(ms.padEnd(3, "0"), 10) : 0));
  if (offsetSign) {
    const offset = (parseInt(offsetHour, 10) * 60 + parseInt(offsetMinute, 10)) * (offsetSign === "+" ? -1 : 1);
    date.setUTCMinutes(date.getUTCMinutes() + offset);
  }
  return isValidDate(date) ? date : null;
}
function betterJSONParse(value, options = {}) {
  const { strict = false, warnings = false, reviver, parseDates = true } = options;
  if (typeof value !== "string") {
    return value;
  }
  const trimmed = value.trim();
  if (trimmed[0] === '"' && trimmed.endsWith('"') && !trimmed.slice(1, -1).includes('"')) {
    return trimmed.slice(1, -1);
  }
  const lowerValue = trimmed.toLowerCase();
  if (lowerValue.length <= 9 && lowerValue in SPECIAL_VALUES) {
    return SPECIAL_VALUES[lowerValue];
  }
  if (!JSON_SIGNATURE.test(trimmed)) {
    if (strict) {
      throw new SyntaxError("[better-json] Invalid JSON");
    }
    return value;
  }
  const hasProtoPattern = Object.entries(PROTO_POLLUTION_PATTERNS).some(([key, pattern]) => {
    const matches = pattern.test(trimmed);
    if (matches && warnings) {
      console.warn(`[better-json] Detected potential prototype pollution attempt using ${key} pattern`);
    }
    return matches;
  });
  if (hasProtoPattern && strict) {
    throw new Error("[better-json] Potential prototype pollution attempt detected");
  }
  try {
    const secureReviver = (key, value2) => {
      if (key === "__proto__" || key === "constructor" && value2 && typeof value2 === "object" && "prototype" in value2) {
        if (warnings) {
          console.warn(`[better-json] Dropping "${key}" key to prevent prototype pollution`);
        }
        return void 0;
      }
      if (parseDates && typeof value2 === "string") {
        const date = parseISODate(value2);
        if (date) {
          return date;
        }
      }
      return reviver ? reviver(key, value2) : value2;
    };
    return JSON.parse(trimmed, secureReviver);
  } catch (error) {
    if (strict) {
      throw error;
    }
    return value;
  }
}
function parseJSON(value, options = {
  strict: true
}) {
  return betterJSONParse(value, options);
}
const redirectPlugin = {
  id: "redirect",
  name: "Redirect",
  hooks: {
    onSuccess(context) {
      if (context.data?.url && context.data?.redirect) {
        if (typeof window !== "undefined" && window.location) {
          if (window.location) {
            try {
              window.location.href = context.data.url;
            } catch {
            }
          }
        }
      }
    }
  }
};
function getSessionAtom($fetch) {
  const $signal = atom(false);
  const session = useAuthQuery($signal, "/get-session", $fetch, {
    method: "GET"
  });
  return {
    session,
    $sessionSignal: $signal
  };
}
const getClientConfig = (options) => {
  const isCredentialsSupported = "credentials" in Request.prototype;
  const baseURL = getBaseURL(options?.baseURL, options?.basePath);
  const pluginsFetchPlugins = options?.plugins?.flatMap((plugin) => plugin.fetchPlugins).filter((pl) => pl !== void 0) || [];
  const $fetch = createFetch({
    baseURL,
    ...isCredentialsSupported ? {
      credentials: "include"
    } : {},
    method: "GET",
    jsonParser(text) {
      if (!text) {
        return null;
      }
      return parseJSON(text, {
        strict: false
      });
    },
    customFetchImpl: async (input, init) => {
      try {
        return await fetch(input, init);
      } catch (error) {
        return Response.error();
      }
    },
    ...options?.fetchOptions,
    plugins: options?.disableDefaultFetchPlugins ? [
      ...options?.fetchOptions?.plugins || [],
      ...pluginsFetchPlugins
    ] : [
      redirectPlugin,
      ...options?.fetchOptions?.plugins || [],
      ...pluginsFetchPlugins
    ]
  });
  const { $sessionSignal, session } = getSessionAtom($fetch);
  const plugins = options?.plugins || [];
  let pluginsActions = {};
  let pluginsAtoms = {
    $sessionSignal,
    session
  };
  let pluginPathMethods = {
    "/sign-out": "POST",
    "/revoke-sessions": "POST",
    "/revoke-other-sessions": "POST",
    "/delete-user": "POST"
  };
  const atomListeners = [
    {
      signal: "$sessionSignal",
      matcher(path) {
        return path === "/sign-out" || path === "/update-user" || path.startsWith("/sign-in") || path.startsWith("/sign-up") || path === "/delete-user" || path === "/verify-email";
      }
    }
  ];
  for (const plugin of plugins) {
    if (plugin.getAtoms) {
      Object.assign(pluginsAtoms, plugin.getAtoms?.($fetch));
    }
    if (plugin.pathMethods) {
      Object.assign(pluginPathMethods, plugin.pathMethods);
    }
    if (plugin.atomListeners) {
      atomListeners.push(...plugin.atomListeners);
    }
  }
  const $store = {
    notify: (signal) => {
      pluginsAtoms[signal].set(!pluginsAtoms[signal].get());
    },
    listen: (signal, listener) => {
      pluginsAtoms[signal].subscribe(listener);
    },
    atoms: pluginsAtoms
  };
  for (const plugin of plugins) {
    if (plugin.getActions) {
      Object.assign(pluginsActions, plugin.getActions?.($fetch, $store, options));
    }
  }
  return {
    pluginsActions,
    pluginsAtoms,
    pluginPathMethods,
    atomListeners,
    $fetch,
    $store
  };
};
function getMethod(path, knownPathMethods, args) {
  const method = knownPathMethods[path];
  const { fetchOptions, query, ...body } = args || {};
  if (method) {
    return method;
  }
  if (fetchOptions?.method) {
    return fetchOptions.method;
  }
  if (body && Object.keys(body).length > 0) {
    return "POST";
  }
  return "GET";
}
function createDynamicPathProxy(routes, client, knownPathMethods, atoms, atomListeners) {
  function createProxy(path = []) {
    return new Proxy(function() {
    }, {
      get(target, prop) {
        const fullPath = [
          ...path,
          prop
        ];
        let current = routes;
        for (const segment of fullPath) {
          if (current && typeof current === "object" && segment in current) {
            current = current[segment];
          } else {
            current = void 0;
            break;
          }
        }
        if (typeof current === "function") {
          return current;
        }
        return createProxy(fullPath);
      },
      apply: async (_, __, args) => {
        const routePath = "/" + path.map((segment) => segment.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)).join("/");
        const arg = args[0] || {};
        const fetchOptions = args[1] || {};
        const { query, fetchOptions: argFetchOptions, ...body } = arg;
        const options = {
          ...fetchOptions,
          ...argFetchOptions
        };
        const method = getMethod(routePath, knownPathMethods, arg);
        return await client(routePath, {
          ...options,
          body: method === "GET" ? void 0 : {
            ...body,
            ...options?.body || {}
          },
          query: query || options?.query,
          method,
          async onSuccess(context) {
            await options?.onSuccess?.(context);
            const matches = atomListeners?.find((s) => s.matcher(routePath));
            if (!matches) return;
            const signal = atoms[matches.signal];
            if (!signal) return;
            const val = signal.get();
            setTimeout(() => {
              signal.set(!val);
            }, 10);
          }
        });
      }
    });
  }
  return createProxy();
}
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function createAuthClient(options) {
  const { pluginPathMethods, pluginsActions, pluginsAtoms, $fetch, atomListeners, $store } = getClientConfig(options);
  let resolvedHooks = {};
  for (const [key, value] of Object.entries(pluginsAtoms)) {
    resolvedHooks[`use${capitalizeFirstLetter(key)}`] = value;
  }
  const routes = {
    ...pluginsActions,
    ...resolvedHooks,
    $fetch,
    $store
  };
  const proxy = createDynamicPathProxy(routes, $fetch, pluginPathMethods, pluginsAtoms, atomListeners);
  return proxy;
}
const empty = {
  session: null,
  user: null,
  token: null
};
function createBetterAuthClient(options, { storageKeys } = {}) {
  const authState = createEmitter(empty);
  let loading = true;
  const keys = {
    token: storageKeys?.token ?? "TOKEN_KEY",
    session: storageKeys?.session ?? "SESSION_KEY"
  }, createAuthClientWithSession = (session) => createAuthClient({
    ...options,
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${session}`
      }
    }
  });
  let authClient2 = (() => {
    const existingSession = typeof localStorage < "u" ? localStorage.getItem(keys.session) : "";
    return existingSession ? createAuthClientWithSession(existingSession) : createAuthClient(options);
  })();
  const authClientVersion = createEmitter(), useAuthClientVersion = authClientVersion.use, setAuthClientToken2 = async ({ token, session }) => {
    localStorage.setItem(keys.token, token), localStorage.setItem(keys.session, session), updateAuthClient(session);
  };
  function updateAuthClient(session) {
    authClient2 = createAuthClientWithSession(session), authClientVersion.emit(Math.random()), subscribeToAuthClientSession();
  }
  let disposeSessionSub = null;
  function subscribeToAuthClientSession() {
    disposeSessionSub?.(), disposeSessionSub = authClient2.useSession.subscribe(async ({ data, error, isPending }) => {
      if (loading = isPending, error && console.error("Auth error", error), data) {
        const token = await fetchToken();
        console.warn("data", data), setState({
          // @ts-expect-error
          ...data,
          token
        });
      } else setState(empty);
    });
  }
  subscribeToAuthClientSession();
  async function fetchToken() {
    const res = await authClient2.$fetch("/token");
    if (res.error) {
      console.error(`Error fetching token ${res.error.statusText}`);
      return;
    }
    return res.data?.token;
  }
  function getPersistedKeys() {
    const token = localStorage.getItem(keys.token), session = localStorage.getItem(keys.session);
    return {
      token,
      session
    };
  }
  async function refreshAuth() {
    const { token, session } = getPersistedKeys();
    if (token && session) {
      setAuthClientToken2({
        token,
        session
      });
      return;
    }
  }
  const clearAuthClientToken = () => {
    localStorage.setItem(keys.token, ""), localStorage.setItem(keys.session, "");
  };
  function setState(next) {
    const current = authState.value;
    authState.emit({
      ...current,
      ...next
    });
  }
  return {
    getPersistedKeys,
    authState,
    authClient: authClient2,
    setAuthClientToken: setAuthClientToken2,
    clearAuthClientToken,
    useAuthClientVersion,
    useAuth: () => {
      const state = authState.useValue() || empty;
      return {
        ...state,
        loggedIn: loading ? null : !!state.session,
        loading
      };
    },
    refreshAuth,
    fetchToken
  };
}
const { authClient, setAuthClientToken, useAuth } = createBetterAuthClient({});
export {
  createTamagui as A,
  TamaguiProvider as B,
  ComponentContext as C,
  setAuthClientToken as D,
  transformsToString as E,
  GroupContext as G,
  Text as T,
  View as V,
  useComponentState as a,
  useMedia as b,
  createComponent as c,
  useSplitStyles as d,
  useIsomorphicLayoutEffect as e,
  subscribeToContextGroup as f,
  getConfig as g,
  getVariable as h,
  getTokenValue as i,
  authClient as j,
  isServer as k,
  createEmitter as l,
  mediaState as m,
  isVariable as n,
  getVariableValue as o,
  getTokens as p,
  Text$1 as q,
  useTheme as r,
  stackDefaultStyles as s,
  createStyledContext as t,
  useThemeWithState as u,
  validStyles as v,
  spacedChildren as w,
  composeRefs as x,
  useComposedRefs as y,
  useAuth as z
};
