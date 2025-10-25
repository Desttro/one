import { D as Dimensions, r as reactExports, _ as _objectWithoutPropertiesLoose, T as TextAncestorContext, b as createElement, s as stylesheet, V as View, d as _extends, e as createBoxShadowValue, f as _objectSpread2, g as TextInputState, u as useLayoutEffectImpl, h as useElementLayout, i as useResponderEvents, k as useLocaleContext, p as pick, l as usePlatformMethods, m as useMergeRefs, n as getLocaleDirection, o as defaultProps, q as accessibilityProps, t as clickProps, v as focusProps, w as keyboardProps, x as mouseProps, y as touchProps, z as styleProps, R as React, j as jsxRuntimeExports } from "../_virtual_one-entry.js";
import { e as useIsomorphicLayoutEffect, c as createComponent, n as isVariable, o as getVariableValue, V as View$1, p as getTokens, q as Text, g as getConfig, r as useTheme, h as getVariable, t as createStyledContext, w as spacedChildren, x as composeRefs, y as useComposedRefs, z as useAuth, j as authClient } from "./authClient-DTdP_buj.js";
import { l as useQuery, z as zero, o as isTauri } from "./constants-PMqLTXbb.js";
import { u as usePropsAndStyle, a as useProps } from "./useProps-BHYOGbmk.js";
import "node:async_hooks";
var assets = [];
function getAssetByID(assetId) {
  return assets[assetId - 1];
}
var dataUriPattern = /^data:/;
class ImageUriCache {
  static has(uri) {
    var entries = ImageUriCache._entries;
    var isDataUri = dataUriPattern.test(uri);
    return isDataUri || Boolean(entries[uri]);
  }
  static add(uri) {
    var entries = ImageUriCache._entries;
    var lastUsedTimestamp = Date.now();
    if (entries[uri]) {
      entries[uri].lastUsedTimestamp = lastUsedTimestamp;
      entries[uri].refCount += 1;
    } else {
      entries[uri] = {
        lastUsedTimestamp,
        refCount: 1
      };
    }
  }
  static remove(uri) {
    var entries = ImageUriCache._entries;
    if (entries[uri]) {
      entries[uri].refCount -= 1;
    }
    ImageUriCache._cleanUpIfNeeded();
  }
  static _cleanUpIfNeeded() {
    var entries = ImageUriCache._entries;
    var imageUris = Object.keys(entries);
    if (imageUris.length + 1 > ImageUriCache._maximumEntries) {
      var leastRecentlyUsedKey;
      var leastRecentlyUsedEntry;
      imageUris.forEach((uri) => {
        var entry = entries[uri];
        if ((!leastRecentlyUsedEntry || entry.lastUsedTimestamp < leastRecentlyUsedEntry.lastUsedTimestamp) && entry.refCount === 0) {
          leastRecentlyUsedKey = uri;
          leastRecentlyUsedEntry = entry;
        }
      });
      if (leastRecentlyUsedKey) {
        delete entries[leastRecentlyUsedKey];
      }
    }
  }
}
ImageUriCache._maximumEntries = 256;
ImageUriCache._entries = {};
var id = 0;
var requests = {};
var ImageLoader = {
  abort(requestId) {
    var image = requests["" + requestId];
    if (image) {
      image.onerror = null;
      image.onload = null;
      image = null;
      delete requests["" + requestId];
    }
  },
  getSize(uri, success, failure) {
    var complete = false;
    var interval = setInterval(callback, 16);
    var requestId = ImageLoader.load(uri, callback, errorCallback);
    function callback() {
      var image = requests["" + requestId];
      if (image) {
        var naturalHeight = image.naturalHeight, naturalWidth = image.naturalWidth;
        if (naturalHeight && naturalWidth) {
          success(naturalWidth, naturalHeight);
          complete = true;
        }
      }
      if (complete) {
        ImageLoader.abort(requestId);
        clearInterval(interval);
      }
    }
    function errorCallback() {
      if (typeof failure === "function") {
        failure();
      }
      ImageLoader.abort(requestId);
      clearInterval(interval);
    }
  },
  has(uri) {
    return ImageUriCache.has(uri);
  },
  load(uri, onLoad, onError) {
    id += 1;
    var image = new window.Image();
    image.onerror = onError;
    image.onload = (e) => {
      var onDecode = () => onLoad({
        nativeEvent: e
      });
      if (typeof image.decode === "function") {
        image.decode().then(onDecode, onDecode);
      } else {
        setTimeout(onDecode, 0);
      }
    };
    image.src = uri;
    requests["" + id] = image;
    return id;
  },
  prefetch(uri) {
    return new Promise((resolve, reject) => {
      ImageLoader.load(uri, () => {
        ImageUriCache.add(uri);
        ImageUriCache.remove(uri);
        resolve();
      }, reject);
    });
  },
  queryCache(uris) {
    var result = {};
    uris.forEach((u) => {
      if (ImageUriCache.has(u)) {
        result[u] = "disk/memory";
      }
    });
    return Promise.resolve(result);
  }
};
class PixelRatio {
  /**
  * Returns the device pixel density.
  */
  static get() {
    return Dimensions.get("window").scale;
  }
  /**
  * No equivalent for Web
  */
  static getFontScale() {
    return Dimensions.get("window").fontScale || PixelRatio.get();
  }
  /**
  * Converts a layout size (dp) to pixel size (px).
  * Guaranteed to return an integer number.
  */
  static getPixelSizeForLayoutSize(layoutSize) {
    return Math.round(layoutSize * PixelRatio.get());
  }
  /**
  * Rounds a layout size (dp) to the nearest layout size that corresponds to
  * an integer number of pixels. For example, on a device with a PixelRatio
  * of 3, `PixelRatio.roundToNearestPixel(8.4) = 8.33`, which corresponds to
  * exactly (8.33 * 3) = 25 pixels.
  */
  static roundToNearestPixel(layoutSize) {
    var ratio = PixelRatio.get();
    return Math.round(layoutSize * ratio) / ratio;
  }
}
var _excluded = [
  "aria-label",
  "accessibilityLabel",
  "blurRadius",
  "defaultSource",
  "draggable",
  "onError",
  "onLayout",
  "onLoad",
  "onLoadEnd",
  "onLoadStart",
  "pointerEvents",
  "source",
  "style"
];
var ERRORED = "ERRORED";
var LOADED = "LOADED";
var LOADING = "LOADING";
var IDLE = "IDLE";
var _filterId = 0;
var svgDataUriPattern = /^(data:image\/svg\+xml;utf8,)(.*)/;
function createTintColorSVG(tintColor, id2) {
  return tintColor && id2 != null ? /* @__PURE__ */ reactExports.createElement("svg", {
    style: {
      position: "absolute",
      height: 0,
      visibility: "hidden",
      width: 0
    }
  }, /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement("filter", {
    id: "tint-" + id2,
    suppressHydrationWarning: true
  }, /* @__PURE__ */ reactExports.createElement("feFlood", {
    floodColor: "" + tintColor,
    key: tintColor
  }), /* @__PURE__ */ reactExports.createElement("feComposite", {
    in2: "SourceAlpha",
    operator: "in"
  })))) : null;
}
function extractNonStandardStyleProps(style, blurRadius, filterId, tintColorProp) {
  var flatStyle = stylesheet.flatten(style);
  var filter = flatStyle.filter, resizeMode = flatStyle.resizeMode, shadowOffset = flatStyle.shadowOffset, tintColor = flatStyle.tintColor;
  if (flatStyle.resizeMode) ;
  if (flatStyle.tintColor) ;
  var filters = [];
  var _filter = null;
  if (filter) {
    filters.push(filter);
  }
  if (blurRadius) {
    filters.push("blur(" + blurRadius + "px)");
  }
  if (shadowOffset) {
    var shadowString = createBoxShadowValue(flatStyle);
    if (shadowString) {
      filters.push("drop-shadow(" + shadowString + ")");
    }
  }
  if ((tintColorProp || tintColor) && filterId != null) {
    filters.push("url(#tint-" + filterId + ")");
  }
  if (filters.length > 0) {
    _filter = filters.join(" ");
  }
  return [
    resizeMode,
    _filter,
    tintColor
  ];
}
function resolveAssetDimensions(source) {
  if (typeof source === "number") {
    var _getAssetByID = getAssetByID(source), _height = _getAssetByID.height, _width = _getAssetByID.width;
    return {
      height: _height,
      width: _width
    };
  } else if (source != null && !Array.isArray(source) && typeof source === "object") {
    var _height2 = source.height, _width2 = source.width;
    return {
      height: _height2,
      width: _width2
    };
  }
}
function resolveAssetUri(source) {
  var uri = null;
  if (typeof source === "number") {
    var asset = getAssetByID(source);
    if (asset == null) {
      throw new Error('Image: asset with ID "' + source + '" could not be found. Please check the image source or packager.');
    }
    var scale = asset.scales[0];
    if (asset.scales.length > 1) {
      var preferredScale = PixelRatio.get();
      scale = asset.scales.reduce((prev, curr) => Math.abs(curr - preferredScale) < Math.abs(prev - preferredScale) ? curr : prev);
    }
    var scaleSuffix = scale !== 1 ? "@" + scale + "x" : "";
    uri = asset ? asset.httpServerLocation + "/" + asset.name + scaleSuffix + "." + asset.type : "";
  } else if (typeof source === "string") {
    uri = source;
  } else if (source && typeof source.uri === "string") {
    uri = source.uri;
  }
  if (uri) {
    var match = uri.match(svgDataUriPattern);
    if (match) {
      var prefix = match[1], svg = match[2];
      var encodedSvg = encodeURIComponent(svg);
      return "" + prefix + encodedSvg;
    }
  }
  return uri;
}
var Image$1 = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var _ariaLabel = props["aria-label"], accessibilityLabel = props.accessibilityLabel, blurRadius = props.blurRadius, defaultSource = props.defaultSource, draggable = props.draggable, onError = props.onError, onLayout = props.onLayout, onLoad = props.onLoad, onLoadEnd = props.onLoadEnd, onLoadStart = props.onLoadStart, pointerEvents = props.pointerEvents, source = props.source, style = props.style, rest = _objectWithoutPropertiesLoose(props, _excluded);
  var ariaLabel = _ariaLabel || accessibilityLabel;
  var _React$useState = reactExports.useState(() => {
    var uri2 = resolveAssetUri(source);
    if (uri2 != null) {
      var isLoaded = ImageLoader.has(uri2);
      if (isLoaded) {
        return LOADED;
      }
    }
    return IDLE;
  }), state = _React$useState[0], updateState = _React$useState[1];
  var _React$useState2 = reactExports.useState({}), layout = _React$useState2[0], updateLayout = _React$useState2[1];
  var hasTextAncestor = reactExports.useContext(TextAncestorContext);
  var hiddenImageRef = reactExports.useRef(null);
  var filterRef = reactExports.useRef(_filterId++);
  var requestRef = reactExports.useRef(null);
  var shouldDisplaySource = state === LOADED || state === LOADING && defaultSource == null;
  var _extractNonStandardSt = extractNonStandardStyleProps(style, blurRadius, filterRef.current, props.tintColor), _resizeMode = _extractNonStandardSt[0], filter = _extractNonStandardSt[1], _tintColor = _extractNonStandardSt[2];
  var resizeMode = props.resizeMode || _resizeMode || "cover";
  var tintColor = props.tintColor || _tintColor;
  var selectedSource = shouldDisplaySource ? source : defaultSource;
  var displayImageUri = resolveAssetUri(selectedSource);
  var imageSizeStyle = resolveAssetDimensions(selectedSource);
  var backgroundImage = displayImageUri ? 'url("' + displayImageUri + '")' : null;
  var backgroundSize = getBackgroundSize();
  var hiddenImage = displayImageUri ? createElement("img", {
    alt: ariaLabel || "",
    style: styles$1.accessibilityImage$raw,
    draggable: draggable || false,
    ref: hiddenImageRef,
    src: displayImageUri
  }) : null;
  function getBackgroundSize() {
    if (hiddenImageRef.current != null && (resizeMode === "center" || resizeMode === "repeat")) {
      var _hiddenImageRef$curre = hiddenImageRef.current, naturalHeight = _hiddenImageRef$curre.naturalHeight, naturalWidth = _hiddenImageRef$curre.naturalWidth;
      var _height3 = layout.height, _width3 = layout.width;
      if (naturalHeight && naturalWidth && _height3 && _width3) {
        var scaleFactor = Math.min(1, _width3 / naturalWidth, _height3 / naturalHeight);
        var x = Math.ceil(scaleFactor * naturalWidth);
        var y = Math.ceil(scaleFactor * naturalHeight);
        return x + "px " + y + "px";
      }
    }
  }
  function handleLayout(e) {
    if (resizeMode === "center" || resizeMode === "repeat" || onLayout) {
      var _layout = e.nativeEvent.layout;
      onLayout && onLayout(e);
      updateLayout(_layout);
    }
  }
  var uri = resolveAssetUri(source);
  reactExports.useEffect(() => {
    abortPendingRequest();
    if (uri != null) {
      updateState(LOADING);
      if (onLoadStart) {
        onLoadStart();
      }
      requestRef.current = ImageLoader.load(uri, function load(e) {
        updateState(LOADED);
        if (onLoad) {
          onLoad(e);
        }
        if (onLoadEnd) {
          onLoadEnd();
        }
      }, function error() {
        updateState(ERRORED);
        if (onError) {
          onError({
            nativeEvent: {
              error: "Failed to load resource " + uri
            }
          });
        }
        if (onLoadEnd) {
          onLoadEnd();
        }
      });
    }
    function abortPendingRequest() {
      if (requestRef.current != null) {
        ImageLoader.abort(requestRef.current);
        requestRef.current = null;
      }
    }
    return abortPendingRequest;
  }, [
    uri,
    requestRef,
    updateState,
    onError,
    onLoad,
    onLoadEnd,
    onLoadStart
  ]);
  return /* @__PURE__ */ reactExports.createElement(View, _extends({}, rest, {
    "aria-label": ariaLabel,
    onLayout: handleLayout,
    pointerEvents,
    ref,
    style: [
      styles$1.root,
      hasTextAncestor && styles$1.inline,
      imageSizeStyle,
      style,
      styles$1.undo,
      // TEMP: avoid deprecated shadow props regression
      // until Image refactored to use createElement.
      {
        boxShadow: null
      }
    ]
  }), /* @__PURE__ */ reactExports.createElement(View, {
    style: [
      styles$1.image,
      resizeModeStyles[resizeMode],
      {
        backgroundImage,
        filter
      },
      backgroundSize != null && {
        backgroundSize
      }
    ],
    suppressHydrationWarning: true
  }), hiddenImage, createTintColorSVG(tintColor, filterRef.current));
});
Image$1.displayName = "Image";
var ImageWithStatics = Image$1;
ImageWithStatics.getSize = function(uri, success, failure) {
  ImageLoader.getSize(uri, success, failure);
};
ImageWithStatics.prefetch = function(uri) {
  return ImageLoader.prefetch(uri);
};
ImageWithStatics.queryCache = function(uris) {
  return ImageLoader.queryCache(uris);
};
var styles$1 = stylesheet.create({
  root: {
    flexBasis: "auto",
    overflow: "hidden",
    zIndex: 0
  },
  inline: {
    display: "inline-flex"
  },
  undo: {
    // These styles are converted to CSS filters applied to the
    // element displaying the background image.
    blurRadius: null,
    shadowColor: null,
    shadowOpacity: null,
    shadowOffset: null,
    shadowRadius: null,
    tintColor: null,
    // These styles are not supported
    overlayColor: null,
    resizeMode: null
  },
  image: _objectSpread2(_objectSpread2({}, stylesheet.absoluteFillObject), {}, {
    backgroundColor: "transparent",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
    zIndex: -1
  }),
  accessibilityImage$raw: _objectSpread2(_objectSpread2({}, stylesheet.absoluteFillObject), {}, {
    height: "100%",
    opacity: 0,
    width: "100%",
    zIndex: -1
  })
});
var resizeModeStyles = stylesheet.create({
  center: {
    backgroundSize: "auto"
  },
  contain: {
    backgroundSize: "contain"
  },
  cover: {
    backgroundSize: "cover"
  },
  none: {
    backgroundPosition: "0",
    backgroundSize: "auto"
  },
  repeat: {
    backgroundPosition: "0",
    backgroundRepeat: "repeat",
    backgroundSize: "auto"
  },
  stretch: {
    backgroundSize: "100% 100%"
  }
});
var isSelectionStale = (node, selection) => {
  var selectionEnd = node.selectionEnd, selectionStart = node.selectionStart;
  var start = selection.start, end = selection.end;
  return start !== selectionStart || end !== selectionEnd;
};
var setSelection = (node, selection) => {
  if (isSelectionStale(node, selection)) {
    var start = selection.start, end = selection.end;
    try {
      node.setSelectionRange(start, end || start);
    } catch (e) {
    }
  }
};
var forwardPropsList = Object.assign({}, defaultProps, accessibilityProps, clickProps, focusProps, keyboardProps, mouseProps, touchProps, styleProps, {
  autoCapitalize: true,
  autoComplete: true,
  autoCorrect: true,
  autoFocus: true,
  defaultValue: true,
  disabled: true,
  lang: true,
  maxLength: true,
  onChange: true,
  onScroll: true,
  placeholder: true,
  pointerEvents: true,
  readOnly: true,
  rows: true,
  spellCheck: true,
  value: true,
  type: true
});
var pickProps = (props) => pick(props, forwardPropsList);
function isEventComposing(nativeEvent) {
  return nativeEvent.isComposing || nativeEvent.keyCode === 229;
}
var focusTimeout = null;
var TextInput = /* @__PURE__ */ reactExports.forwardRef((props, forwardedRef) => {
  var _props$autoCapitalize = props.autoCapitalize, autoCapitalize = _props$autoCapitalize === void 0 ? "sentences" : _props$autoCapitalize, autoComplete = props.autoComplete, autoCompleteType = props.autoCompleteType, _props$autoCorrect = props.autoCorrect, autoCorrect = _props$autoCorrect === void 0 ? true : _props$autoCorrect, blurOnSubmit = props.blurOnSubmit, caretHidden = props.caretHidden, clearTextOnFocus = props.clearTextOnFocus, dir = props.dir, editable = props.editable, enterKeyHint = props.enterKeyHint, inputMode = props.inputMode, keyboardType = props.keyboardType, _props$multiline = props.multiline, multiline = _props$multiline === void 0 ? false : _props$multiline, numberOfLines = props.numberOfLines, onBlur = props.onBlur, onChange = props.onChange, onChangeText = props.onChangeText, onContentSizeChange = props.onContentSizeChange, onFocus = props.onFocus, onKeyPress = props.onKeyPress, onLayout = props.onLayout, onMoveShouldSetResponder = props.onMoveShouldSetResponder, onMoveShouldSetResponderCapture = props.onMoveShouldSetResponderCapture, onResponderEnd = props.onResponderEnd, onResponderGrant = props.onResponderGrant, onResponderMove = props.onResponderMove, onResponderReject = props.onResponderReject, onResponderRelease = props.onResponderRelease, onResponderStart = props.onResponderStart, onResponderTerminate = props.onResponderTerminate, onResponderTerminationRequest = props.onResponderTerminationRequest, onScrollShouldSetResponder = props.onScrollShouldSetResponder, onScrollShouldSetResponderCapture = props.onScrollShouldSetResponderCapture, onSelectionChange = props.onSelectionChange, onSelectionChangeShouldSetResponder = props.onSelectionChangeShouldSetResponder, onSelectionChangeShouldSetResponderCapture = props.onSelectionChangeShouldSetResponderCapture, onStartShouldSetResponder = props.onStartShouldSetResponder, onStartShouldSetResponderCapture = props.onStartShouldSetResponderCapture, onSubmitEditing = props.onSubmitEditing, placeholderTextColor = props.placeholderTextColor, _props$readOnly = props.readOnly, readOnly = _props$readOnly === void 0 ? false : _props$readOnly, returnKeyType = props.returnKeyType, rows = props.rows, _props$secureTextEntr = props.secureTextEntry, secureTextEntry = _props$secureTextEntr === void 0 ? false : _props$secureTextEntr, selection = props.selection, selectTextOnFocus = props.selectTextOnFocus, showSoftInputOnFocus = props.showSoftInputOnFocus, spellCheck = props.spellCheck;
  var type;
  var _inputMode;
  if (inputMode != null) {
    _inputMode = inputMode;
    if (inputMode === "email") {
      type = "email";
    } else if (inputMode === "tel") {
      type = "tel";
    } else if (inputMode === "search") {
      type = "search";
    } else if (inputMode === "url") {
      type = "url";
    } else {
      type = "text";
    }
  } else if (keyboardType != null) {
    switch (keyboardType) {
      case "email-address":
        type = "email";
        break;
      case "number-pad":
      case "numeric":
        _inputMode = "numeric";
        break;
      case "decimal-pad":
        _inputMode = "decimal";
        break;
      case "phone-pad":
        type = "tel";
        break;
      case "search":
      case "web-search":
        type = "search";
        break;
      case "url":
        type = "url";
        break;
      default:
        type = "text";
    }
  }
  if (secureTextEntry) {
    type = "password";
  }
  var dimensions = reactExports.useRef({
    height: null,
    width: null
  });
  var hostRef = reactExports.useRef(null);
  var prevSelection = reactExports.useRef(null);
  var prevSecureTextEntry = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (hostRef.current && prevSelection.current) {
      setSelection(hostRef.current, prevSelection.current);
    }
    prevSecureTextEntry.current = secureTextEntry;
  }, [
    secureTextEntry
  ]);
  var handleContentSizeChange = reactExports.useCallback((hostNode) => {
    if (multiline && onContentSizeChange && hostNode != null) {
      var newHeight = hostNode.scrollHeight;
      var newWidth = hostNode.scrollWidth;
      if (newHeight !== dimensions.current.height || newWidth !== dimensions.current.width) {
        dimensions.current.height = newHeight;
        dimensions.current.width = newWidth;
        onContentSizeChange({
          nativeEvent: {
            contentSize: {
              height: dimensions.current.height,
              width: dimensions.current.width
            }
          }
        });
      }
    }
  }, [
    multiline,
    onContentSizeChange
  ]);
  var imperativeRef = reactExports.useMemo(() => (hostNode) => {
    if (hostNode != null) {
      hostNode.clear = function() {
        if (hostNode != null) {
          hostNode.value = "";
        }
      };
      hostNode.isFocused = function() {
        return hostNode != null && TextInputState.currentlyFocusedField() === hostNode;
      };
      handleContentSizeChange(hostNode);
    }
  }, [
    handleContentSizeChange
  ]);
  function handleBlur(e) {
    TextInputState._currentlyFocusedNode = null;
    if (onBlur) {
      e.nativeEvent.text = e.target.value;
      onBlur(e);
    }
  }
  function handleChange(e) {
    var hostNode = e.target;
    var text = hostNode.value;
    e.nativeEvent.text = text;
    handleContentSizeChange(hostNode);
    if (onChange) {
      onChange(e);
    }
    if (onChangeText) {
      onChangeText(text);
    }
  }
  function handleFocus(e) {
    var hostNode = e.target;
    if (onFocus) {
      e.nativeEvent.text = hostNode.value;
      onFocus(e);
    }
    if (hostNode != null) {
      TextInputState._currentlyFocusedNode = hostNode;
      if (clearTextOnFocus) {
        hostNode.value = "";
      }
      if (selectTextOnFocus) {
        if (focusTimeout != null) {
          clearTimeout(focusTimeout);
        }
        focusTimeout = setTimeout(() => {
          if (hostNode != null && document.activeElement === hostNode) {
            hostNode.select();
          }
        }, 0);
      }
    }
  }
  function handleKeyDown(e) {
    var hostNode = e.target;
    e.stopPropagation();
    var blurOnSubmitDefault = !multiline;
    var shouldBlurOnSubmit = blurOnSubmit == null ? blurOnSubmitDefault : blurOnSubmit;
    var nativeEvent = e.nativeEvent;
    var isComposing = isEventComposing(nativeEvent);
    if (onKeyPress) {
      onKeyPress(e);
    }
    if (e.key === "Enter" && !e.shiftKey && // Do not call submit if composition is occuring.
    !isComposing && !e.isDefaultPrevented()) {
      if ((blurOnSubmit || !multiline) && onSubmitEditing) {
        e.preventDefault();
        nativeEvent.text = e.target.value;
        onSubmitEditing(e);
      }
      if (shouldBlurOnSubmit && hostNode != null) {
        setTimeout(() => hostNode.blur(), 0);
      }
    }
  }
  function handleSelectionChange(e) {
    try {
      var _e$target = e.target, selectionStart = _e$target.selectionStart, selectionEnd = _e$target.selectionEnd;
      var _selection = {
        start: selectionStart,
        end: selectionEnd
      };
      if (onSelectionChange) {
        e.nativeEvent.selection = _selection;
        e.nativeEvent.text = e.target.value;
        onSelectionChange(e);
      }
      if (prevSecureTextEntry.current === secureTextEntry) {
        prevSelection.current = _selection;
      }
    } catch (e2) {
    }
  }
  useLayoutEffectImpl(() => {
    var node = hostRef.current;
    if (node != null && selection != null) {
      setSelection(node, selection);
    }
    if (document.activeElement === node) {
      TextInputState._currentlyFocusedNode = node;
    }
  }, [
    hostRef,
    selection
  ]);
  var component = multiline ? "textarea" : "input";
  useElementLayout(hostRef, onLayout);
  useResponderEvents(hostRef, {
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
  });
  var _useLocaleContext = useLocaleContext(), contextDirection = _useLocaleContext.direction;
  var supportedProps = pickProps(props);
  supportedProps.autoCapitalize = autoCapitalize;
  supportedProps.autoComplete = autoComplete || autoCompleteType || "on";
  supportedProps.autoCorrect = autoCorrect ? "on" : "off";
  supportedProps.dir = dir !== void 0 ? dir : "auto";
  supportedProps.enterKeyHint = enterKeyHint || returnKeyType;
  supportedProps.inputMode = _inputMode;
  supportedProps.onBlur = handleBlur;
  supportedProps.onChange = handleChange;
  supportedProps.onFocus = handleFocus;
  supportedProps.onKeyDown = handleKeyDown;
  supportedProps.onSelect = handleSelectionChange;
  supportedProps.readOnly = readOnly === true || editable === false;
  supportedProps.rows = multiline ? rows != null ? rows : numberOfLines : 1;
  supportedProps.spellCheck = spellCheck != null ? spellCheck : autoCorrect;
  supportedProps.style = [
    {
      "--placeholderTextColor": placeholderTextColor
    },
    styles.textinput$raw,
    styles.placeholder,
    props.style,
    caretHidden && styles.caretHidden
  ];
  supportedProps.type = multiline ? void 0 : type;
  supportedProps.virtualkeyboardpolicy = showSoftInputOnFocus === false ? "manual" : "auto";
  var platformMethodsRef = usePlatformMethods(supportedProps);
  var setRef = useMergeRefs(hostRef, platformMethodsRef, imperativeRef, forwardedRef);
  supportedProps.ref = setRef;
  var langDirection = props.lang != null ? getLocaleDirection(props.lang) : null;
  var componentDirection = props.dir || langDirection;
  var writingDirection = componentDirection || contextDirection;
  var element = createElement(component, supportedProps, {
    writingDirection
  });
  return element;
});
TextInput.displayName = "TextInput";
TextInput.State = TextInputState;
var styles = stylesheet.create({
  textinput$raw: {
    MozAppearance: "textfield",
    WebkitAppearance: "none",
    backgroundColor: "transparent",
    border: "0 solid black",
    borderRadius: 0,
    boxSizing: "border-box",
    font: "14px System",
    margin: 0,
    padding: 0,
    resize: "none"
  },
  placeholder: {
    placeholderTextColor: "var(--placeholderTextColor)"
  },
  caretHidden: {
    caretColor: "transparent"
  }
});
const Decorated = Symbol(), withStaticProperties = (component, staticProps) => {
  const next = (() => {
    if (component[Decorated]) {
      const _ = React.forwardRef((props, ref) => React.createElement(component, {
        ...props,
        ref
      }));
      for (const key in component) {
        const v = component[key];
        _[key] = v && typeof v == "object" ? {
          ...v
        } : v;
      }
    }
    return component;
  })();
  return Object.assign(next, staticProps), next[Decorated] = true, next;
};
function useGet(currentValue, initialValue, forwardToFunction) {
  const curRef = reactExports.useRef(initialValue ?? currentValue);
  return useIsomorphicLayoutEffect(() => {
    curRef.current = currentValue;
  }), reactExports.useCallback((...args) => curRef.current?.apply(null, args), []);
}
function useEvent(callback) {
  return useGet(callback, defaultValue);
}
const defaultValue = () => {
  throw new Error("Cannot call an event handler while rendering.");
};
const mergeVariants = (parentVariants, ourVariants, level = 0) => {
  const variants2 = {};
  for (const key in ourVariants) {
    const parentVariant = parentVariants?.[key], ourVariant = ourVariants[key];
    !parentVariant || typeof ourVariant == "function" ? variants2[key] = ourVariant : parentVariant && !ourVariant ? variants2[key] = parentVariant[key] : level === 0 ? variants2[key] = mergeVariants(parentVariant, ourVariant, level + 1) : variants2[key] = {
      ...parentVariant,
      ...ourVariant
    };
  }
  return {
    ...parentVariants,
    ...variants2
  };
};
const ReactNativeStaticConfigs = /* @__PURE__ */ new WeakMap();
function getReactNativeConfig(Component) {
  if (Component) return Component.getSize && Component.prefetch ? RNConfigs.Image : Component.displayName === "Text" && Component.render ? RNConfigs.Text : Component.render && (Component.displayName === "ScrollView" || Component.displayName === "View") ? RNConfigs.default : Component.State?.blurTextInput ? RNConfigs.TextInput : ReactNativeStaticConfigs.get(Component);
}
const RNConfigs = {
  Image: {
    isReactNative: true,
    inlineProps: /* @__PURE__ */ new Set([
      "src",
      "width",
      "height"
    ])
  },
  Text: {
    isReactNative: true,
    isText: true
  },
  TextInput: {
    isReactNative: true,
    isInput: true,
    isText: true
  },
  default: {
    isReactNative: true
  }
};
function styled(ComponentIn, options, config) {
  const parentStaticConfig = ComponentIn.staticConfig, isPlainStyledComponent = !!parentStaticConfig && !(parentStaticConfig.isReactNative || parentStaticConfig.isHOC);
  let Component = parentStaticConfig?.isHOC && !parentStaticConfig?.isStyledHOC || isPlainStyledComponent ? ComponentIn : parentStaticConfig?.Component || ComponentIn;
  const reactNativeConfig = parentStaticConfig ? void 0 : getReactNativeConfig(Component), isReactNative = !!(reactNativeConfig || config?.isReactNative || parentStaticConfig?.isReactNative), staticConfigProps = (() => {
    let { variants: variants2, name, defaultVariants, acceptsClassName: acceptsClassNameProp, context, ...defaultProps2 } = options || {}, parentDefaultVariants, parentDefaultProps;
    if (parentStaticConfig && !(parentStaticConfig.isHOC && !parentStaticConfig.isStyledHOC)) {
      const pdp = parentStaticConfig.defaultProps;
      for (const key in pdp) {
        const val = pdp[key];
        parentStaticConfig.defaultVariants && key in parentStaticConfig.defaultVariants && (!defaultVariants || !(key in defaultVariants)) && (parentDefaultVariants || (parentDefaultVariants = {}), parentDefaultVariants[key] = val), !(key in defaultProps2) && (!defaultVariants || !(key in defaultVariants)) && (parentDefaultProps || (parentDefaultProps = {}), parentDefaultProps[key] = pdp[key]);
      }
      parentStaticConfig.variants && (variants2 = mergeVariants(parentStaticConfig.variants, variants2));
    }
    (parentDefaultProps || defaultVariants || parentDefaultVariants) && (defaultProps2 = {
      ...parentDefaultProps,
      ...parentDefaultVariants,
      ...defaultProps2,
      ...defaultVariants
    }), parentStaticConfig?.isHOC && name && (defaultProps2.componentName = name);
    const isText = !!(config?.isText || parentStaticConfig?.isText), acceptsClassName = config?.acceptsClassName ?? acceptsClassNameProp ?? (isPlainStyledComponent || isReactNative || parentStaticConfig?.isHOC && parentStaticConfig?.acceptsClassName), conf = {
      ...parentStaticConfig,
      ...config,
      ...!isPlainStyledComponent && {
        Component
      },
      // @ts-expect-error
      variants: variants2,
      defaultProps: defaultProps2,
      defaultVariants,
      componentName: name || parentStaticConfig?.componentName,
      isReactNative,
      isText,
      acceptsClassName,
      context,
      ...reactNativeConfig,
      isStyledHOC: !!parentStaticConfig?.isHOC,
      parentStaticConfig
    };
    return (defaultProps2.children || !acceptsClassName || context) && (conf.neverFlatten = true), conf;
  })(), component = createComponent(staticConfigProps || {});
  for (const key in ComponentIn) key !== "propTypes" && (key in component || (component[key] = ComponentIn[key]));
  return component;
}
const getElevation = (size, extras) => {
  if (!size) return;
  const { tokens } = extras, token = tokens.size[size], sizeNum = isVariable(token) ? +token.val : size;
  return getSizedElevation(sizeNum, extras);
}, getSizedElevation = (val, { theme, tokens }) => {
  let num = 0;
  if (val === true) {
    const val2 = getVariableValue(tokens.size.true);
    typeof val2 == "number" ? num = val2 : num = 10;
  } else num = +val;
  if (num === 0) return;
  const [height, shadowRadius] = [
    Math.round(num / 4 + 1),
    Math.round(num / 2 + 2)
  ];
  return {
    shadowColor: theme.shadowColor,
    shadowRadius,
    shadowOffset: {
      height,
      width: 0
    },
    ...{}
  };
};
const fullscreenStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
}, getInset = (val) => val && typeof val == "object" ? val : {
  top: val,
  left: val,
  bottom: val,
  right: val
}, variants = {
  fullscreen: {
    true: fullscreenStyle
  },
  elevation: {
    "...size": getElevation,
    ":number": getElevation
  },
  inset: getInset
}, YStack = styled(View$1, {
  flexDirection: "column",
  variants
});
YStack.displayName = "YStack";
const XStack = styled(View$1, {
  flexDirection: "row",
  variants
});
XStack.displayName = "XStack";
const ZStack = styled(YStack, {
  position: "relative"
}, {
  neverFlatten: true,
  isZStack: true
});
ZStack.displayName = "ZStack";
const defaultOptions = {
  shift: 0,
  bounds: [
    0
  ]
}, getSpace = (space, options) => getTokenRelative("space", space, options), cacheVariables = {}, cacheWholeVariables = {}, cacheKeys = {}, cacheWholeKeys = {}, stepTokenUpOrDown = (type, current, options = defaultOptions) => {
  const tokens = getTokens({
    prefixed: true
  })[type];
  if (!(type in cacheVariables)) {
    cacheKeys[type] = [], cacheVariables[type] = [], cacheWholeKeys[type] = [], cacheWholeVariables[type] = [];
    const sorted = Object.keys(tokens).map((k) => tokens[k]).sort((a, b) => a.val - b.val);
    for (const token of sorted) cacheKeys[type].push(token.key), cacheVariables[type].push(token);
    const sortedExcludingHalfSteps = sorted.filter((x) => !x.key.endsWith(".5"));
    for (const token of sortedExcludingHalfSteps) cacheWholeKeys[type].push(token.key), cacheWholeVariables[type].push(token);
  }
  const isString = typeof current == "string", tokensOrdered = (options.excludeHalfSteps ? isString ? cacheWholeKeys : cacheWholeVariables : isString ? cacheKeys : cacheVariables)[type], min = options.bounds?.[0] ?? 0, max = options.bounds?.[1] ?? tokensOrdered.length - 1, currentIndex = tokensOrdered.indexOf(current);
  let shift = options.shift || 0;
  shift && (current === "$true" || isVariable(current) && current.name === "true") && (shift += shift > 0 ? 1 : -1);
  const index = Math.min(max, Math.max(min, currentIndex + shift)), found = tokensOrdered[index];
  return (typeof found == "string" ? tokens[found] : found) || tokens.$true;
}, getTokenRelative = stepTokenUpOrDown;
const getButtonSized = (val, { tokens, props }) => {
  if (!val || props.circular) return;
  if (typeof val == "number") return {
    paddingHorizontal: val * 0.25,
    height: val,
    borderRadius: props.circular ? 1e5 : val * 0.2
  };
  const xSize = getSpace(val), radiusToken = tokens.radius[val] ?? tokens.radius.$true;
  return {
    paddingHorizontal: xSize,
    height: val,
    borderRadius: props.circular ? 1e5 : radiusToken
  };
};
const elevate = {
  true: (_, extras) => getElevation(extras.props.size, extras)
}, bordered = (val, { props }) => ({
  // TODO size it with size in '...size'
  borderWidth: typeof val == "number" ? val : 1,
  borderColor: "$borderColor",
  ...props.hoverTheme && {
    hoverStyle: {
      borderColor: "$borderColorHover"
    }
  },
  ...props.pressTheme && {
    pressStyle: {
      borderColor: "$borderColorPress"
    }
  },
  ...props.focusTheme && {
    focusStyle: {
      borderColor: "$borderColorFocus"
    }
  }
}), padded = {
  true: (_, extras) => {
    const { tokens, props } = extras;
    return {
      padding: tokens.space[props.size] || tokens.space.$true
    };
  }
}, radiused = {
  true: (_, extras) => {
    const { tokens, props } = extras;
    return {
      borderRadius: tokens.radius[props.size] || tokens.radius.$true
    };
  }
}, circularStyle = {
  borderRadius: 1e5,
  padding: 0
}, circular = {
  true: (_, { props, tokens }) => {
    if (!("size" in props)) return circularStyle;
    const size = typeof props.size == "number" ? props.size : tokens.size[props.size];
    return {
      ...circularStyle,
      width: size,
      height: size,
      maxWidth: size,
      maxHeight: size,
      minWidth: size,
      minHeight: size
    };
  }
}, hoverTheme = {
  true: {
    hoverStyle: {
      backgroundColor: "$backgroundHover",
      borderColor: "$borderColorHover"
    }
  },
  false: {}
}, pressTheme = {
  true: {
    cursor: "pointer",
    pressStyle: {
      backgroundColor: "$backgroundPress",
      borderColor: "$borderColorPress"
    }
  },
  false: {}
}, focusTheme = {
  true: {
    focusStyle: {
      backgroundColor: "$backgroundFocus",
      borderColor: "$borderColorFocus"
    }
  },
  false: {}
};
const chromelessStyle = {
  backgroundColor: "transparent",
  borderColor: "transparent",
  shadowColor: "transparent",
  hoverStyle: {
    borderColor: "transparent"
  }
}, themeableVariants = {
  backgrounded: {
    true: {
      backgroundColor: "$background"
    }
  },
  radiused,
  hoverTheme,
  pressTheme,
  focusTheme,
  circular,
  padded,
  elevate,
  bordered,
  transparent: {
    true: {
      backgroundColor: "transparent"
    }
  },
  chromeless: {
    true: chromelessStyle,
    all: {
      ...chromelessStyle,
      hoverStyle: chromelessStyle,
      pressStyle: chromelessStyle,
      focusStyle: chromelessStyle
    }
  }
}, ThemeableStack = styled(YStack, {
  variants: themeableVariants
});
const ButtonNestingContext = React.createContext(false);
const getFontSized = (sizeTokenIn = "$true", { font, fontFamily, props }) => {
  if (!font) return {
    fontSize: sizeTokenIn
  };
  const sizeToken = sizeTokenIn === "$true" ? getDefaultSizeToken(font) : sizeTokenIn, style = {}, fontSize = font.size[sizeToken], lineHeight = font.lineHeight?.[sizeToken], fontWeight = font.weight?.[sizeToken], letterSpacing = font.letterSpacing?.[sizeToken], textTransform = font.transform?.[sizeToken], fontStyle = props.fontStyle ?? font.style?.[sizeToken], color = props.color ?? font.color?.[sizeToken];
  return fontStyle && (style.fontStyle = fontStyle), textTransform && (style.textTransform = textTransform), fontFamily && (style.fontFamily = fontFamily), fontWeight && (style.fontWeight = fontWeight), letterSpacing && (style.letterSpacing = letterSpacing), fontSize && (style.fontSize = fontSize), lineHeight && (style.lineHeight = lineHeight), color && (style.color = color), style;
};
styled(Text, {
  name: "SizableText",
  fontFamily: "$body",
  variants: {
    size: {
      "...fontSize": getFontSized
    }
  },
  defaultVariants: {
    size: "$true"
  }
});
const cache = /* @__PURE__ */ new WeakMap();
function getDefaultSizeToken(font) {
  if (typeof font == "object" && cache.has(font)) return cache.get(font);
  const sizeTokens = "$true" in font.size ? font.size : getTokens().size, sizeDefault = sizeTokens.$true, sizeDefaultSpecific = sizeDefault ? Object.keys(sizeTokens).find((x) => x !== "$true" && sizeTokens[x].val === sizeDefault.val) : null;
  return !sizeDefault || !sizeDefaultSpecific ? Object.keys(font.size)[3] : (cache.set(font, sizeDefaultSpecific), sizeDefaultSpecific);
}
const SizableText = styled(Text, {
  name: "SizableText",
  fontFamily: "$body",
  variants: {
    unstyled: {
      false: {
        size: "$true",
        color: "$color"
      }
    },
    size: getFontSized
  },
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === "1"
  }
});
SizableText.staticConfig.variants.fontFamily = {
  "...": (_val, extras) => {
    const sizeProp = extras.props.size, fontSizeProp = extras.props.fontSize, size = sizeProp === "$true" && fontSizeProp ? fontSizeProp : extras.props.size || "$true";
    return getFontSized(size, extras);
  }
};
function wrapChildrenInText(TextComponent, propsIn, extraProps) {
  const { children, textProps, size, noTextWrap, color, fontFamily, fontSize, fontWeight, letterSpacing, textAlign, fontStyle, maxFontSizeMultiplier } = propsIn;
  if (noTextWrap || !children) return [
    children
  ];
  const props = {
    ...extraProps
  };
  return color && (props.color = color), fontFamily && (props.fontFamily = fontFamily), fontSize && (props.fontSize = fontSize), fontWeight && (props.fontWeight = fontWeight), letterSpacing && (props.letterSpacing = letterSpacing), textAlign && (props.textAlign = textAlign), size && (props.size = size), fontStyle && (props.fontStyle = fontStyle), maxFontSizeMultiplier && (props.maxFontSizeMultiplier = maxFontSizeMultiplier), React.Children.toArray(children).map((child, index) => typeof child == "string" ? (
    // so "data-disable-theme" is a hack to fix themeInverse, don't ask me why
    /* @__PURE__ */ jsxRuntimeExports.jsx(TextComponent, {
      ...props,
      ...textProps,
      children: child
    }, index)
  ) : child);
}
const StyledImage = styled(ImageWithStatics, {
  name: "Image"
});
const Image = StyledImage.styleable((inProps, ref) => {
  const [props, style] = usePropsAndStyle(inProps), { src, source, objectFit, ...rest } = props;
  let finalSource = typeof src == "string" ? {
    uri: src,
    ...{
      width: props.width || style?.width,
      height: props.height || style?.height
    }
  } : source ?? src;
  return finalSource && typeof finalSource == "object" && (finalSource.default && (finalSource = finalSource.default)), /* @__PURE__ */ jsxRuntimeExports.jsx(ImageWithStatics, {
    resizeMode: objectFit,
    ref,
    source: finalSource,
    style,
    ...rest
  });
});
Image.getSize = ImageWithStatics.getSize;
Image.getSizeWithHeaders = ImageWithStatics.getSizeWithHeaders;
Image.prefetch = ImageWithStatics.prefetch;
Image.prefetchWithMetadata = ImageWithStatics.prefetchWithMetadata;
Image.abortPrefetch = ImageWithStatics.abortPrefetch;
Image.queryCache = ImageWithStatics.queryCache;
const getShapeSize = (size, { tokens }) => {
  const width = tokens.size[size] ?? size, height = tokens.size[size] ?? size;
  return {
    width,
    height,
    minWidth: width,
    maxWidth: width,
    maxHeight: height,
    minHeight: height
  };
};
const Square = styled(ThemeableStack, {
  name: "Square",
  alignItems: "center",
  justifyContent: "center",
  variants: {
    size: {
      "...size": getShapeSize,
      ":number": getShapeSize
    }
  }
}, {
  memo: true
});
const Circle = styled(Square, {
  name: "Circle",
  circular: true
});
const getFontSize = (inSize, opts) => {
  const res = getFontSizeVariable(inSize, opts);
  return isVariable(res) ? +res.val : res ? +res : 16;
}, getFontSizeVariable = (inSize, opts) => {
  const token = getFontSizeToken(inSize, opts);
  if (!token) return inSize;
  const conf = getConfig();
  return conf.fontsParsed[opts?.font || conf.defaultFontToken]?.size[token];
}, getFontSizeToken = (inSize, opts) => {
  if (typeof inSize == "number") return null;
  const relativeSize = opts?.relativeSize || 0, conf = getConfig(), fontSize = conf.fontsParsed[opts?.font || conf.defaultFontToken]?.size || // fallback to size tokens
  conf.tokensParsed.size, size = (inSize === "$true" && !("$true" in fontSize) ? "$4" : inSize) ?? ("$true" in fontSize ? "$true" : "$4"), sizeTokens = Object.keys(fontSize);
  let foundIndex = sizeTokens.indexOf(size);
  foundIndex === -1 && size.endsWith(".5") && (foundIndex = sizeTokens.indexOf(size.replace(".5", "")));
  const tokenIndex = Math.min(Math.max(0, foundIndex + relativeSize), sizeTokens.length - 1);
  return sizeTokens[tokenIndex] ?? size;
};
const useCurrentColor = (colorProp) => {
  const theme = useTheme();
  return colorProp ? getVariable(colorProp) : theme[colorProp]?.get() || theme.color?.get();
};
const useGetThemedIcon = (props) => {
  const color = useCurrentColor(props.color);
  return (el) => el && (React.isValidElement(el) ? React.cloneElement(el, {
    ...props,
    color,
    // @ts-expect-error
    ...el.props
  }) : React.createElement(el, props));
};
const ButtonContext = createStyledContext({
  // keeping these here means they work with styled() passing down color to text
  color: void 0,
  ellipse: void 0,
  fontFamily: void 0,
  fontSize: void 0,
  fontStyle: void 0,
  fontWeight: void 0,
  letterSpacing: void 0,
  maxFontSizeMultiplier: void 0,
  size: void 0,
  textAlign: void 0,
  variant: void 0
}), BUTTON_NAME = "Button", ButtonFrame = styled(ThemeableStack, {
  name: BUTTON_NAME,
  tag: "button",
  context: ButtonContext,
  role: "button",
  focusable: true,
  variants: {
    unstyled: {
      false: {
        size: "$true",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
        flexDirection: "row",
        cursor: "pointer",
        hoverTheme: true,
        pressTheme: true,
        backgrounded: true,
        borderWidth: 1,
        borderColor: "transparent",
        focusVisibleStyle: {
          outlineColor: "$outlineColor",
          outlineStyle: "solid",
          outlineWidth: 2
        }
      }
    },
    variant: {
      outlined: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "$borderColor",
        hoverStyle: {
          backgroundColor: "transparent",
          borderColor: "$borderColorHover"
        },
        pressStyle: {
          backgroundColor: "transparent",
          borderColor: "$borderColorPress"
        },
        focusVisibleStyle: {
          backgroundColor: "transparent",
          borderColor: "$borderColorFocus"
        }
      }
    },
    size: {
      "...size": getButtonSized,
      ":number": getButtonSized
    },
    disabled: {
      true: {
        pointerEvents: "none"
      }
    }
  },
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === "1"
  }
}), ButtonText = styled(SizableText, {
  name: "Button",
  context: ButtonContext,
  variants: {
    unstyled: {
      false: {
        userSelect: "none",
        cursor: "pointer",
        // flexGrow 1 leads to inconsistent native style where text pushes to start of view
        flexGrow: 0,
        flexShrink: 1,
        ellipse: true,
        color: "$color"
      }
    }
  },
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === "1"
  }
}), ButtonIcon = (props) => {
  const { children, scaleIcon = 1 } = props, { size, color } = reactExports.useContext(ButtonContext), iconSize = (typeof size == "number" ? size * 0.5 : getFontSize(size)) * scaleIcon;
  return useGetThemedIcon({
    size: iconSize,
    color
  })(children);
}, ButtonComponent = ButtonFrame.styleable(function(props, ref) {
  const { props: buttonProps } = useButton(props);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ButtonFrame, {
    "data-disable-theme": true,
    ...buttonProps,
    ref
  });
}), Button2 = withStaticProperties(ButtonComponent, {
  Text: ButtonText,
  Icon: ButtonIcon
});
function useButton({ textProps, ...propsIn }, { Text: Text2 = Button2.Text } = {
  Text: Button2.Text
}) {
  const isNested = reactExports.useContext(ButtonNestingContext), propsActive = useProps(propsIn, {
    noNormalize: true,
    noExpand: true
  }), { icon, iconAfter, space, spaceFlex, scaleIcon = 1, scaleSpace = 0.66, separator, noTextWrap, fontFamily, fontSize, fontWeight, fontStyle, letterSpacing, tag, ellipse, maxFontSizeMultiplier, ...restProps } = propsActive, size = propsActive.size || (propsActive.unstyled ? void 0 : "$true"), color = propsActive.color, iconSize = (typeof size == "number" ? size * 0.5 : getFontSize(size, {
    font: fontFamily?.[0] === "$" ? fontFamily : void 0
  })) * scaleIcon, getThemedIcon = useGetThemedIcon({
    size: iconSize,
    color
  }), [themedIcon, themedIconAfter] = [
    icon,
    iconAfter
  ].map(getThemedIcon), spaceSize = space ?? getVariableValue(iconSize) * scaleSpace, contents = noTextWrap ? [
    propsIn.children
  ] : wrapChildrenInText(Text2, {
    children: propsIn.children,
    fontFamily,
    fontSize,
    textProps,
    fontWeight,
    fontStyle,
    letterSpacing,
    maxFontSizeMultiplier
  }, Text2 === ButtonText && propsActive.unstyled !== true ? {
    unstyled: process.env.TAMAGUI_HEADLESS === "1",
    size
  } : void 0), inner = spacedChildren({
    // a bit arbitrary but scaling to font size is necessary so long as button does
    space: spaceSize === false ? 0 : spaceSize == true ? "$true" : spaceSize,
    spaceFlex,
    ensureKeys: true,
    separator,
    direction: propsActive.flexDirection === "column" || propsActive.flexDirection === "column-reverse" ? "vertical" : "horizontal",
    // for keys to stay the same we keep indices as similar a possible
    // so even if icons are undefined we still pass them
    children: [
      themedIcon,
      ...contents,
      themedIconAfter
    ]
  }), props = {
    size,
    ...propsIn.disabled && {
      // in rnw - false still has keyboard tabIndex, undefined = not actually focusable
      focusable: void 0,
      // even with tabIndex unset, it will keep focusVisibleStyle on web so disable it here
      focusVisibleStyle: {
        borderColor: "$background"
      }
    },
    // fixes SSR issue + DOM nesting issue of not allowing button in button
    tag: tag ?? (isNested ? "span" : (
      // defaults to <a /> when accessibilityRole = link
      // see https://github.com/tamagui/tamagui/issues/505
      propsActive.accessibilityRole === "link" || propsActive.role === "link" ? "a" : "button"
    )),
    ...restProps,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ButtonNestingContext.Provider, {
      value: true,
      children: inner
    }),
    // forces it to be a runtime pressStyle so it passes through context text colors
    disableClassName: true
  };
  return {
    spaceSize,
    isNested,
    props
  };
}
const registerFocusable = (id2, input) => () => {
};
function useFocusable({ isInput, props, ref }) {
  const { id: id2, onChangeText, value, defaultValue: defaultValue2 } = props, inputValue = React.useRef(value || defaultValue2 || ""), unregisterFocusable = React.useRef(void 0), focusAndSelect = React.useCallback((input) => {
    input.focus(), input.setSelection && typeof inputValue.current == "string" && input.setSelection(0, inputValue.current.length);
  }, []), registerFocusableHandler = React.useCallback((input) => {
    !id2 || !input || (unregisterFocusable.current?.(), unregisterFocusable.current = registerFocusable(id2, {
      focus: input.focus
    }));
  }, [
    id2,
    isInput,
    focusAndSelect
  ]), inputRef = React.useCallback((input) => {
    input && registerFocusableHandler(input);
  }, [
    registerFocusableHandler
  ]), handleChangeText = useEvent((value2) => {
    inputValue.current = value2, onChangeText?.(value2);
  });
  return React.useEffect(() => () => {
    unregisterFocusable.current?.();
  }, []), {
    ref: React.useMemo(() => composeRefs(ref, inputRef), [
      ref,
      inputRef
    ]),
    onChangeText: handleChangeText
  };
}
const inputSizeVariant = (val = "$true", extras) => {
  if (extras.props.multiline || extras.props.numberOfLines > 1) return textAreaSizeVariant(val, extras);
  const buttonStyles = getButtonSized(val, extras), paddingHorizontal = getSpace(val, {
    shift: -1,
    bounds: [
      2
    ]
  }), fontStyle = getFontSized(val, extras);
  return {
    ...fontStyle,
    ...buttonStyles,
    paddingHorizontal
  };
}, textAreaSizeVariant = (val = "$true", extras) => {
  const { props } = extras, buttonStyles = getButtonSized(val, extras), fontStyle = getFontSized(val, extras), lines = props.rows ?? props.numberOfLines, height = typeof lines == "number" ? lines * getVariableValue(fontStyle.lineHeight) : "auto", paddingVertical = getSpace(val, {
    shift: -2,
    bounds: [
      2
    ]
  }), paddingHorizontal = getSpace(val, {
    shift: -1,
    bounds: [
      2
    ]
  });
  return {
    ...buttonStyles,
    ...fontStyle,
    paddingVertical,
    paddingHorizontal,
    height
  };
};
const defaultStyles = {
  size: "$true",
  fontFamily: "$body",
  borderWidth: 1,
  outlineWidth: 0,
  color: "$color",
  ...{
    tabIndex: 0
  },
  borderColor: "$borderColor",
  backgroundColor: "$background",
  // this fixes a flex bug where it overflows container
  minWidth: 0,
  hoverStyle: {
    borderColor: "$borderColorHover"
  },
  focusStyle: {
    borderColor: "$borderColorFocus"
  },
  focusVisibleStyle: {
    outlineColor: "$outlineColor",
    outlineWidth: 2,
    outlineStyle: "solid"
  }
}, InputFrame = styled(TextInput, {
  name: "Input",
  variants: {
    unstyled: {
      false: defaultStyles
    },
    size: {
      "...size": inputSizeVariant
    },
    disabled: {
      true: {}
    }
  },
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === "1"
  }
}, {
  isInput: true,
  accept: {
    placeholderTextColor: "color",
    selectionColor: "color"
  }
}), Input = InputFrame.styleable((propsIn, forwardedRef) => {
  const ref = React.useRef(null), composedRefs = useComposedRefs(forwardedRef, ref), props = useInputProps(propsIn, composedRefs);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(InputFrame, {
    ...props
  });
});
function useInputProps(props, ref) {
  const theme = useTheme(), focusableProps = useFocusable({
    props,
    ref,
    isInput: true
  }), placeholderTextColor = React.useMemo(() => {
    const placeholderColorProp = props.placeholderTextColor;
    return theme[placeholderColorProp]?.get() ?? placeholderColorProp ?? theme.placeholderColor?.get();
  }, [
    props.placeholderTextColor,
    theme
  ]);
  return React.useMemo(() => ({
    ref: focusableProps.ref,
    readOnly: props.disabled,
    ...props,
    placeholderTextColor,
    onChangeText: focusableProps.onChangeText
  }), [
    focusableProps.ref,
    focusableProps.onChangeText,
    props.disabled,
    props,
    placeholderTextColor
  ]);
}
const SelectableCircle = styled(Circle, {
  variants: {
    active: {
      true: {
        outlineColor: "#fff",
        outlineWidth: 2,
        outlineStyle: "solid"
      }
    }
  }
});
const Avatar = ({ image, size = 32, active, ...rest }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectableCircle, {
    active,
    size,
    bg: "$color5",
    overflow: "hidden",
    ...rest,
    children: image && /* @__PURE__ */ jsxRuntimeExports.jsx(Image, {
      src: image,
      width: size,
      height: size
    })
  });
};
const randomID = () => Math.random().toString(36).slice(2);
const _cn8 = "is_SizableText font_body _dsp-inline _bxs-border-box _ww-break-word _ws-pre-wrap _mt-0px _mr-0px _mb-0px _ml-0px _ff-f-family _fw-700 _ls-f-letterSpa1360334202 _fs-f-size-4 _lh-f-lineHeigh112923 _col-color ";
const _cn7 = "is_Paragraph font_body _dsp-inline _bxs-border-box _ww-break-word _mt-0px _mr-0px _mb-0px _ml-0px _ff-f-family _fw-f-weight-4 _ls-f-letterSpa1360334202 _fs-f-size-4 _lh-f-lineHeigh112923 _col-color _select-auto _ws-normal ";
const _cn6 = "_dsp-flex _items-stretch _fb-auto _bxs-border-box _pos-relative _minH-0px _minW-0px _shrink-0 _fd-row ";
const _cn5 = "is_H3 font_heading _dsp-inline _bxs-border-box _ww-break-word _select-auto _col-color _ws-normal _ff-f-family _fw-f-weight-8 _ls-f-letterSpa1360334198 _fs-f-size-8 _lh-f-lineHeigh112927 _mt-0px _mr-0px _mb-0px _ml-0px ";
const _cn4 = "_dsp-flex _items-stretch _fb-auto _bxs-border-box _pos-relative _minH-0px _minW-0px _shrink-0 _fd-column _width-10037 _gap-c-space-4 _pt-c-space-4 _pr-c-space-4 _pb-c-space-4 _pl-c-space-4 _btc-color2 _brc-color2 _borderBottomColor-color2 _borderLeftColor-color2 _btw-1px _brw-1px _borderBottomWidth-1px _borderLeftWidth-1px _btlr-c-radius-4 _btrr-c-radius-4 _bbrr-c-radius-4 _bblr-c-radius-4 _borderBottomStyle-solid _borderTopStyle-solid _borderLeftStyle-solid _borderRightStyle-solid ";
const _cn3 = "is_SizableText font_body _dsp-inline _bxs-border-box _ww-break-word _ws-pre-wrap _mt-0px _mr-0px _mb-0px _ml-0px _ff-f-family _fw-f-weight-4 _ls-f-letterSpa1360334202 _fs-f-size-4 _lh-f-lineHeigh112923 _col-color ";
const _cn2 = "_dsp-flex _fb-auto _bxs-border-box _pos-relative _minH-0px _minW-0px _shrink-0 _fd-row _items-center _gap-c-space-4 ";
const _cn = "is_H1 font_heading _dsp-inline _bxs-border-box _ww-break-word _select-auto _col-color _ws-normal _ff-f-family _fw-f-weight-10 _ls-f-letterSpa779312653 _fs-f-size-10 _lh-f-lineHeigh3500568 _mt-0px _mr-0px _mb-0px _ml-0px ";
function HomePage() {
  const { user, token, session } = useAuth();
  const [text, setText] = reactExports.useState("");
  const [messages] = useQuery((q) => q.message.related("sender").orderBy("createdAt", "desc"));
  const handleSubmit = reactExports.useCallback(async () => {
    zero.mutate.message.insert({
      id: randomID(),
      senderId: user?.id,
      content: text,
      createdAt: (/* @__PURE__ */ new Date()).getTime()
    });
  }, [
    user,
    text
  ]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(YStack, {
    flex: 1,
    p: "$4",
    gap: "$4",
    items: "flex-start",
    maxW: 600,
    width: "100%",
    self: "center",
    "$platform-ios": {
      pt: "$10"
    },
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", {
        className: _cn,
        children: "Welcome"
      }),
      user ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: _cn2,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, {
            image: user.image || ""
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
            className: _cn3,
            children: user.name
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button2, {
            onPress: () => authClient.signOut(),
            children: "Logout"
          }),
          !isTauri && token && /* @__PURE__ */ jsxRuntimeExports.jsx("a", {
            href: `one-chat://finish-auth?token=${session?.token}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button2, {
              children: "Login in Tauri"
            })
          })
        ]
      }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button2, {
        onPress: () => {
          authClient.signIn.social({
            provider: "github"
          });
        },
        children: "Login with Github"
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: _cn4,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {
            onChangeText: setText,
            onSubmitEditing: handleSubmit
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button2, {
            onPress: handleSubmit,
            children: "Post"
          })
        ]
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", {
        className: _cn5,
        children: "Messages"
      }),
      messages.map((message) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
          className: _cn6,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
            className: _cn7,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                className: _cn8,
                children: message.sender ? message.sender.name : "Anonymous"
              }),
              ": ",
              message.content
            ]
          })
        }, message.id);
      })
    ]
  });
}
export {
  HomePage as default
};
