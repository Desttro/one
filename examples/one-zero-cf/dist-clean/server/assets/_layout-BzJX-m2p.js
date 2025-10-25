import { r as reactExports, N as NavigationRouteContext, A as useLatestCallback, j as jsxRuntimeExports, B as NavigationContainerRefContext, C as useOptionsGetters, E as NavigationFocusedRouteStateContext, F as NavigationStateContext, G as EnsureSingleNavigator, H as NavigationBuilderContext, I as CommonActions, J as ThemeContext, U as UnhandledActionContext, K as goBack, L as DeprecatedNavigationInChildContext, M as isArrayEqual, S as SingleNavigatorContext, O as reset, P as navigate, Q as deepFreeze, W as useEventEmitter, X as useChildListeners, Y as useKeyedChildListeners, Z as Screen$1, $ as Group, a0 as subscribeToLoadingState, a1 as subscribeToRootState, a2 as setParams, a3 as canGoBack, a4 as goBack$1, a5 as replace, a6 as canDismiss, a7 as dismissAll, a8 as dismiss, a9 as push, aa as navigate$1, ab as useContextKey, R as React, ac as getNameFromFilePath, ad as useIsomorphicLayoutEffect$1, ae as useSortedScreens, af as StackRouter, ag as FlagsContext, V as View, ah as useColorSchemeSetting, ai as setColorScheme, aj as useColorScheme$1 } from "../_virtual_one-entry.js";
import { Z as ZIndexStackContext, P as PortalProvider, o as isTauri, s as setZeroAuth, z as zero, p as useZeroEmit, q as ZeroProvider } from "./constants-PMqLTXbb.js";
import { A as createTamagui$1, B as TamaguiProvider$1, D as setAuthClientToken, z as useAuth, e as useIsomorphicLayoutEffect$2, E as transformsToString, o as getVariableValue } from "./authClient-DTdP_buj.js";
import "node:async_hooks";
const CurrentRenderContext = /* @__PURE__ */ reactExports.createContext(void 0);
function isRecordEqual(a, b) {
  if (a === b) {
    return true;
  }
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  return aKeys.every((key) => a[key] === b[key]);
}
function useRouteCache(routes) {
  reactExports.useMemo(() => ({
    current: /* @__PURE__ */ new Map()
  }), []);
  {
    return routes;
  }
}
const NavigationContext = /* @__PURE__ */ reactExports.createContext(void 0);
const NavigationHelpersContext = /* @__PURE__ */ reactExports.createContext(void 0);
const PreventRemoveContext = /* @__PURE__ */ reactExports.createContext(void 0);
let urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let nanoid = (size2 = 21) => {
  let id = "";
  let i = size2 | 0;
  while (i--) {
    id += urlAlphabet[Math.random() * 64 | 0];
  }
  return id;
};
const transformPreventedRoutes = (preventedRoutesMap) => {
  const preventedRoutesToTransform = [
    ...preventedRoutesMap.values()
  ];
  const preventedRoutes = preventedRoutesToTransform.reduce((acc, { routeKey, preventRemove }) => {
    acc[routeKey] = {
      preventRemove: acc[routeKey]?.preventRemove || preventRemove
    };
    return acc;
  }, {});
  return preventedRoutes;
};
function PreventRemoveProvider({ children }) {
  const [parentId] = reactExports.useState(() => nanoid());
  const [preventedRoutesMap, setPreventedRoutesMap] = reactExports.useState(() => /* @__PURE__ */ new Map());
  const navigation = reactExports.useContext(NavigationHelpersContext);
  const route = reactExports.useContext(NavigationRouteContext);
  const preventRemoveContextValue = reactExports.useContext(PreventRemoveContext);
  const setParentPrevented = preventRemoveContextValue?.setPreventRemove;
  const setPreventRemove = useLatestCallback((id, routeKey, preventRemove) => {
    if (preventRemove && (navigation == null || navigation?.getState().routes.every((route2) => route2.key !== routeKey))) {
      throw new Error(`Couldn't find a route with the key ${routeKey}. Is your component inside NavigationContent?`);
    }
    setPreventedRoutesMap((prevPrevented) => {
      if (routeKey === prevPrevented.get(id)?.routeKey && preventRemove === prevPrevented.get(id)?.preventRemove) {
        return prevPrevented;
      }
      const nextPrevented = new Map(prevPrevented);
      if (preventRemove) {
        nextPrevented.set(id, {
          routeKey,
          preventRemove
        });
      } else {
        nextPrevented.delete(id);
      }
      return nextPrevented;
    });
  });
  const isPrevented = [
    ...preventedRoutesMap.values()
  ].some(({ preventRemove }) => preventRemove);
  reactExports.useEffect(() => {
    if (route?.key !== void 0 && setParentPrevented !== void 0) {
      setParentPrevented(parentId, route.key, isPrevented);
      return () => {
        setParentPrevented(parentId, route.key, false);
      };
    }
    return;
  }, [
    parentId,
    isPrevented,
    route?.key,
    setParentPrevented
  ]);
  const value = reactExports.useMemo(() => ({
    setPreventRemove,
    preventedRoutes: transformPreventedRoutes(preventedRoutesMap)
  }), [
    setPreventRemove,
    preventedRoutesMap
  ]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PreventRemoveContext.Provider, {
    value,
    children
  });
}
function useNavigation$1() {
  const root = reactExports.useContext(NavigationContainerRefContext);
  const navigation = reactExports.useContext(NavigationContext);
  if (navigation === void 0 && root === void 0) {
    throw new Error("Couldn't find a navigation object. Is your component inside NavigationContainer?");
  }
  return navigation ?? root;
}
const NavigationContent = ({ render, children }) => {
  return render(children);
};
function useComponent(render) {
  const renderRef = reactExports.useRef(render);
  renderRef.current = render;
  reactExports.useEffect(() => {
    renderRef.current = null;
  });
  return reactExports.useRef(({ children }) => {
    const render2 = renderRef.current;
    if (render2 === null) {
      throw new Error("The returned component must be rendered in the same render phase as the hook.");
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationContent, {
      render: render2,
      children
    });
  }).current;
}
function useCurrentRender({ state, navigation, descriptors }) {
  const current = reactExports.useContext(CurrentRenderContext);
  if (current && navigation.isFocused()) {
    current.options = descriptors[state.routes[state.index].key].options;
  }
}
const StaticContainer = /* @__PURE__ */ reactExports.memo(function StaticContainer2(props) {
  return props.children;
}, (prevProps, nextProps) => {
  const prevPropKeys = Object.keys(prevProps);
  const nextPropKeys = Object.keys(nextProps);
  if (prevPropKeys.length !== nextPropKeys.length) {
    return false;
  }
  for (const key of prevPropKeys) {
    if (key === "children") {
      continue;
    }
    if (prevProps[key] !== nextProps[key]) {
      return false;
    }
  }
  return true;
});
function SceneView({ screen, route, navigation, routeState, getState, setState, options, clearOptions }) {
  const navigatorKeyRef = reactExports.useRef();
  const getKey = reactExports.useCallback(() => navigatorKeyRef.current, []);
  const { addOptionsGetter } = useOptionsGetters({
    key: route.key,
    options,
    navigation
  });
  const setKey = reactExports.useCallback((key) => {
    navigatorKeyRef.current = key;
  }, []);
  const getCurrentState = reactExports.useCallback(() => {
    const state = getState();
    const currentRoute = state.routes.find((r2) => r2.key === route.key);
    return currentRoute ? currentRoute.state : void 0;
  }, [
    getState,
    route.key
  ]);
  const setCurrentState = reactExports.useCallback((child) => {
    const state = getState();
    setState({
      ...state,
      routes: state.routes.map((r2) => {
        if (r2.key !== route.key) {
          return r2;
        }
        const nextRoute = {
          ...r2,
          state: child
        };
        if (nextRoute.params && ("state" in nextRoute.params && typeof nextRoute.params.state === "object" && nextRoute.params.state !== null || "screen" in nextRoute.params && typeof nextRoute.params.screen === "string")) {
          const { state: state2, screen: screen2, params, initial, ...rest } = nextRoute.params;
          if (Object.keys(rest).length) {
            nextRoute.params = rest;
          } else {
            delete nextRoute.params;
          }
        }
        return nextRoute;
      })
    });
  }, [
    getState,
    route.key,
    setState
  ]);
  const isInitialRef = reactExports.useRef(true);
  reactExports.useEffect(() => {
    isInitialRef.current = false;
  });
  reactExports.useEffect(() => {
    return clearOptions;
  }, []);
  const getIsInitial = reactExports.useCallback(() => isInitialRef.current, []);
  const parentFocusedRouteState = reactExports.useContext(NavigationFocusedRouteStateContext);
  const focusedRouteState = reactExports.useMemo(() => {
    const state = {
      routes: [
        {
          key: route.key,
          name: route.name,
          params: route.params,
          path: route.path
        }
      ]
    };
    const addState = (parent) => {
      const parentRoute = parent?.routes[0];
      if (parentRoute) {
        return {
          routes: [
            {
              ...parentRoute,
              state: addState(parentRoute.state)
            }
          ]
        };
      }
      return state;
    };
    return addState(parentFocusedRouteState);
  }, [
    parentFocusedRouteState,
    route.key,
    route.name,
    route.params,
    route.path
  ]);
  const context = reactExports.useMemo(() => ({
    state: routeState,
    getState: getCurrentState,
    setState: setCurrentState,
    getKey,
    setKey,
    getIsInitial,
    addOptionsGetter
  }), [
    routeState,
    getCurrentState,
    setCurrentState,
    getKey,
    setKey,
    getIsInitial,
    addOptionsGetter
  ]);
  const ScreenComponent = screen.getComponent ? screen.getComponent() : screen.component;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationStateContext.Provider, {
    value: context,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationFocusedRouteStateContext.Provider, {
      value: focusedRouteState,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(EnsureSingleNavigator, {
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(StaticContainer, {
          name: screen.name,
          render: ScreenComponent || screen.children,
          navigation,
          route,
          children: ScreenComponent !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScreenComponent, {
            navigation,
            route
          }) : screen.children !== void 0 ? screen.children({
            navigation,
            route
          }) : null
        })
      })
    })
  });
}
function useNavigationCache({ state, getState, navigation, setOptions, router: router2, emitter }) {
  const { stackRef } = reactExports.useContext(NavigationBuilderContext);
  const base = reactExports.useMemo(() => {
    const { emit: emit2, ...rest } = navigation;
    const actions = {
      ...router2.actionCreators,
      ...CommonActions
    };
    const dispatch = () => {
      throw new Error("Actions cannot be dispatched from a placeholder screen.");
    };
    const helpers = Object.keys(actions).reduce((acc, name) => {
      acc[name] = dispatch;
      return acc;
    }, {});
    return {
      ...rest,
      ...helpers,
      addListener: () => {
        return () => {
        };
      },
      removeListener: () => {
      },
      dispatch,
      getParent: (id) => {
        if (id !== void 0 && id === rest.getId()) {
          return base;
        }
        return rest.getParent(id);
      },
      setOptions: () => {
        throw new Error("Options cannot be set from a placeholder screen.");
      },
      isFocused: () => false
    };
  }, [
    navigation,
    router2.actionCreators
  ]);
  const cache = reactExports.useMemo(
    () => ({
      current: {}
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      base,
      getState,
      navigation,
      setOptions,
      emitter
    ]
  );
  cache.current = state.routes.reduce((acc, route) => {
    const previous = cache.current[route.key];
    if (previous) {
      acc[route.key] = previous;
    } else {
      const dispatch = (thunk) => {
        const action = typeof thunk === "function" ? thunk(getState()) : thunk;
        if (action != null) {
          navigation.dispatch({
            source: route.key,
            ...action
          });
        }
      };
      const withStack = (callback) => {
        let isStackSet = false;
        try {
          if (false) ;
          callback();
        } finally {
          if (isStackSet && stackRef) {
            stackRef.current = void 0;
          }
        }
      };
      const actions = {
        ...router2.actionCreators,
        ...CommonActions
      };
      const helpers = Object.keys(actions).reduce((acc2, name) => {
        acc2[name] = (...args) => withStack(() => (
          // @ts-expect-error: name is a valid key, but TypeScript is dumb
          dispatch(actions[name](...args))
        ));
        return acc2;
      }, {});
      acc[route.key] = {
        ...base,
        ...helpers,
        // FIXME: too much work to fix the types for now
        ...emitter.create(route.key),
        dispatch: (thunk) => withStack(() => dispatch(thunk)),
        getParent: (id) => {
          if (id !== void 0 && id === base.getId()) {
            return acc[route.key];
          }
          return base.getParent(id);
        },
        setOptions: (options) => {
          setOptions((o) => ({
            ...o,
            [route.key]: {
              ...o[route.key],
              ...options
            }
          }));
        },
        isFocused: () => {
          const state2 = base.getState();
          if (state2.routes[state2.index].key !== route.key) {
            return false;
          }
          return navigation ? navigation.isFocused() : true;
        }
      };
    }
    return acc;
  }, {});
  return {
    base,
    navigations: cache.current
  };
}
function useDescriptors({ state, screens, navigation, screenOptions, screenLayout, onAction, getState, setState, addListener, addKeyedListener, onRouteFocus, router: router2, emitter }) {
  const theme = reactExports.useContext(ThemeContext);
  const [options, setOptions] = reactExports.useState({});
  const { onDispatchAction, onOptionsChange, scheduleUpdate, flushUpdates, stackRef } = reactExports.useContext(NavigationBuilderContext);
  const context = reactExports.useMemo(() => ({
    navigation,
    onAction,
    addListener,
    addKeyedListener,
    onRouteFocus,
    onDispatchAction,
    onOptionsChange,
    scheduleUpdate,
    flushUpdates,
    stackRef
  }), [
    navigation,
    onAction,
    addListener,
    addKeyedListener,
    onRouteFocus,
    onDispatchAction,
    onOptionsChange,
    scheduleUpdate,
    flushUpdates,
    stackRef
  ]);
  const { base, navigations } = useNavigationCache({
    state,
    getState,
    navigation,
    setOptions,
    router: router2,
    emitter
  });
  const routes = useRouteCache(state.routes);
  const getOptions = (route, navigation2, overrides) => {
    const config2 = screens[route.name];
    const screen = config2.props;
    const optionsList = [
      // The default `screenOptions` passed to the navigator
      screenOptions,
      // The `screenOptions` props passed to `Group` elements
      ...config2.options ? config2.options.filter(Boolean) : [],
      // The `options` prop passed to `Screen` elements,
      screen.options,
      // The options set via `navigation.setOptions`
      overrides
    ];
    return optionsList.reduce((acc, curr) => Object.assign(
      acc,
      // @ts-expect-error: we check for function but TS still complains
      typeof curr !== "function" ? curr : curr({
        route,
        navigation: navigation2,
        theme
      })
    ), {});
  };
  const render = (route, navigation2, customOptions, routeState) => {
    const config2 = screens[route.name];
    const screen = config2.props;
    const clearOptions = () => setOptions((o) => {
      if (route.key in o) {
        const { [route.key]: _, ...rest } = o;
        return rest;
      }
      return o;
    });
    const layout = (
      // The `layout` prop passed to `Screen` elements,
      screen.layout ?? // The `screenLayout` props passed to `Group` elements
      config2.layout ?? // The default `screenLayout` passed to the navigator
      screenLayout
    );
    let element = /* @__PURE__ */ jsxRuntimeExports.jsx(SceneView, {
      navigation: navigation2,
      route,
      screen,
      routeState,
      getState,
      setState,
      options: customOptions,
      clearOptions
    });
    if (layout != null) {
      element = layout({
        route,
        navigation: navigation2,
        // @ts-expect-error: in practice `theme` will be defined
        theme,
        children: element
      });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationBuilderContext.Provider, {
      value: context,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationContext.Provider, {
        value: navigation2,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationRouteContext.Provider, {
          value: route,
          children: element
        })
      })
    }, route.key);
  };
  const descriptors = routes.reduce((acc, route, i) => {
    const navigation2 = navigations[route.key];
    const customOptions = getOptions(route, navigation2, options[route.key]);
    const element = render(route, navigation2, customOptions, state.routes[i].state);
    acc[route.key] = {
      route,
      // @ts-expect-error: it's missing action helpers, fix later
      navigation: navigation2,
      render() {
        return element;
      },
      options: customOptions
    };
    return acc;
  }, {});
  const describe = (route, placeholder) => {
    if (!placeholder) {
      if (!(route.key in descriptors)) {
        throw new Error(`Couldn't find a route with the key ${route.key}.`);
      }
      return descriptors[route.key];
    }
    const navigation2 = base;
    const customOptions = getOptions(route, navigation2, {});
    const element = render(route, navigation2, customOptions, void 0);
    return {
      route,
      navigation: navigation2,
      render() {
        return element;
      },
      options: customOptions
    };
  };
  return {
    describe,
    descriptors
  };
}
function useFocusedListenersChildrenAdapter({ navigation, focusedListeners }) {
  const { addListener } = reactExports.useContext(NavigationBuilderContext);
  const listener = reactExports.useCallback((callback) => {
    if (navigation.isFocused()) {
      for (const listener2 of focusedListeners) {
        const { handled, result } = listener2(callback);
        if (handled) {
          return {
            handled,
            result
          };
        }
      }
      return {
        handled: true,
        result: callback(navigation)
      };
    } else {
      return {
        handled: false,
        result: null
      };
    }
  }, [
    focusedListeners,
    navigation
  ]);
  reactExports.useEffect(() => addListener?.("focus", listener), [
    addListener,
    listener
  ]);
}
function useFocusEvents({ state, emitter }) {
  const navigation = reactExports.useContext(NavigationContext);
  const lastFocusedKeyRef = reactExports.useRef();
  const currentFocusedKey = state.routes[state.index].key;
  reactExports.useEffect(() => navigation?.addListener("focus", () => {
    lastFocusedKeyRef.current = currentFocusedKey;
    emitter.emit({
      type: "focus",
      target: currentFocusedKey
    });
  }), [
    currentFocusedKey,
    emitter,
    navigation
  ]);
  reactExports.useEffect(() => navigation?.addListener("blur", () => {
    lastFocusedKeyRef.current = void 0;
    emitter.emit({
      type: "blur",
      target: currentFocusedKey
    });
  }), [
    currentFocusedKey,
    emitter,
    navigation
  ]);
  reactExports.useEffect(() => {
    const lastFocusedKey = lastFocusedKeyRef.current;
    lastFocusedKeyRef.current = currentFocusedKey;
    if (lastFocusedKey === void 0 && !navigation) {
      emitter.emit({
        type: "focus",
        target: currentFocusedKey
      });
    }
    if (lastFocusedKey === currentFocusedKey || !(navigation ? navigation.isFocused() : true)) {
      return;
    }
    if (lastFocusedKey === void 0) {
      return;
    }
    emitter.emit({
      type: "blur",
      target: lastFocusedKey
    });
    emitter.emit({
      type: "focus",
      target: currentFocusedKey
    });
  }, [
    currentFocusedKey,
    emitter,
    navigation
  ]);
}
const useIsomorphicLayoutEffect = typeof document !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
function useLazyValue(create) {
  const lazyRef = reactExports.useRef();
  if (lazyRef.current === void 0) {
    lazyRef.current = create();
  }
  return lazyRef.current;
}
function useNavigationHelpers({ id: navigatorId, onAction, getState, emitter, router: router2, stateRef }) {
  const onUnhandledAction = reactExports.useContext(UnhandledActionContext);
  const parentNavigationHelpers = reactExports.useContext(NavigationContext);
  return reactExports.useMemo(() => {
    const dispatch = (op) => {
      const action = typeof op === "function" ? op(getState()) : op;
      const handled = onAction(action);
      if (!handled) {
        onUnhandledAction?.(action);
      }
    };
    const actions = {
      ...router2.actionCreators,
      ...CommonActions
    };
    const helpers = Object.keys(actions).reduce((acc, name) => {
      acc[name] = (...args) => dispatch(actions[name](...args));
      return acc;
    }, {});
    const navigationHelpers = {
      ...parentNavigationHelpers,
      ...helpers,
      dispatch,
      emit: emitter.emit,
      isFocused: parentNavigationHelpers ? parentNavigationHelpers.isFocused : () => true,
      canGoBack: () => {
        const state = getState();
        return router2.getStateForAction(state, goBack(), {
          routeNames: state.routeNames,
          routeParamList: {},
          routeGetIdList: {}
        }) !== null || parentNavigationHelpers?.canGoBack() || false;
      },
      getId: () => navigatorId,
      getParent: (id) => {
        if (id !== void 0) {
          let current = navigationHelpers;
          while (current && id !== current.getId()) {
            current = current.getParent();
          }
          return current;
        }
        return parentNavigationHelpers;
      },
      getState: () => {
        if (stateRef.current != null) {
          return stateRef.current;
        }
        return getState();
      }
    };
    return navigationHelpers;
  }, [
    router2,
    parentNavigationHelpers,
    emitter.emit,
    getState,
    onAction,
    onUnhandledAction,
    navigatorId,
    stateRef
  ]);
}
const VISITED_ROUTE_KEYS = Symbol("VISITED_ROUTE_KEYS");
const shouldPreventRemove = (emitter, beforeRemoveListeners, currentRoutes, nextRoutes, action) => {
  const nextRouteKeys = nextRoutes.map((route) => route.key);
  const removedRoutes = currentRoutes.filter((route) => !nextRouteKeys.includes(route.key)).reverse();
  const visitedRouteKeys = (
    // @ts-expect-error: add this property to mark that we've already emitted this action
    action[VISITED_ROUTE_KEYS] ?? /* @__PURE__ */ new Set()
  );
  const beforeRemoveAction = {
    ...action,
    [VISITED_ROUTE_KEYS]: visitedRouteKeys
  };
  for (const route of removedRoutes) {
    if (visitedRouteKeys.has(route.key)) {
      continue;
    }
    const isPrevented = beforeRemoveListeners[route.key]?.(beforeRemoveAction);
    if (isPrevented) {
      return true;
    }
    visitedRouteKeys.add(route.key);
    const event = emitter.emit({
      type: "beforeRemove",
      target: route.key,
      data: {
        action: beforeRemoveAction
      },
      canPreventDefault: true
    });
    if (event.defaultPrevented) {
      return true;
    }
  }
  return false;
};
function useOnPreventRemove({ getState, emitter, beforeRemoveListeners }) {
  const { addKeyedListener } = reactExports.useContext(NavigationBuilderContext);
  const route = reactExports.useContext(NavigationRouteContext);
  const routeKey = route?.key;
  reactExports.useEffect(() => {
    if (routeKey) {
      return addKeyedListener?.("beforeRemove", routeKey, (action) => {
        const state = getState();
        return shouldPreventRemove(emitter, beforeRemoveListeners, state.routes, [], action);
      });
    }
  }, [
    addKeyedListener,
    beforeRemoveListeners,
    emitter,
    getState,
    routeKey
  ]);
}
function useOnAction({ router: router2, getState, setState, key, actionListeners, beforeRemoveListeners, routerConfigOptions, emitter }) {
  const { onAction: onActionParent, onRouteFocus: onRouteFocusParent, addListener: addListenerParent, onDispatchAction } = reactExports.useContext(NavigationBuilderContext);
  const navigationInChildEnabled = reactExports.useContext(DeprecatedNavigationInChildContext);
  const routerConfigOptionsRef = reactExports.useRef(routerConfigOptions);
  reactExports.useEffect(() => {
    routerConfigOptionsRef.current = routerConfigOptions;
  });
  const onAction = reactExports.useCallback((action, visitedNavigators = /* @__PURE__ */ new Set()) => {
    const state = getState();
    if (visitedNavigators.has(state.key)) {
      return false;
    }
    visitedNavigators.add(state.key);
    if (typeof action.target !== "string" || action.target === state.key) {
      let result = router2.getStateForAction(state, action, routerConfigOptionsRef.current);
      result = result === null && action.target === state.key ? state : result;
      if (result !== null) {
        onDispatchAction(action, state === result);
        if (state !== result) {
          const isPrevented = shouldPreventRemove(emitter, beforeRemoveListeners, state.routes, result.routes, action);
          if (isPrevented) {
            return true;
          }
          setState(result);
        }
        if (onRouteFocusParent !== void 0) {
          const shouldFocus = router2.shouldActionChangeFocus(action);
          if (shouldFocus && key !== void 0) {
            onRouteFocusParent(key);
          }
        }
        return true;
      }
    }
    if (onActionParent !== void 0) {
      if (onActionParent(action, visitedNavigators)) {
        return true;
      }
    }
    if (typeof action.target === "string" || // For backward compatibility
    action.type === "NAVIGATE_DEPRECATED" || navigationInChildEnabled) {
      for (let i = actionListeners.length - 1; i >= 0; i--) {
        const listener = actionListeners[i];
        if (listener(action, visitedNavigators)) {
          return true;
        }
      }
    }
    return false;
  }, [
    actionListeners,
    beforeRemoveListeners,
    emitter,
    getState,
    navigationInChildEnabled,
    key,
    onActionParent,
    onDispatchAction,
    onRouteFocusParent,
    router2,
    setState
  ]);
  useOnPreventRemove({
    getState,
    emitter,
    beforeRemoveListeners
  });
  reactExports.useEffect(() => addListenerParent?.("action", onAction), [
    addListenerParent,
    onAction
  ]);
  return onAction;
}
function useOnGetState({ getState, getStateListeners }) {
  const { addKeyedListener } = reactExports.useContext(NavigationBuilderContext);
  const route = reactExports.useContext(NavigationRouteContext);
  const key = route ? route.key : "root";
  const getRehydratedState = reactExports.useCallback(() => {
    const state = getState();
    const routes = state.routes.map((route2) => {
      const childState = getStateListeners[route2.key]?.();
      if (route2.state === childState) {
        return route2;
      }
      return {
        ...route2,
        state: childState
      };
    });
    if (isArrayEqual(state.routes, routes)) {
      return state;
    }
    return {
      ...state,
      routes
    };
  }, [
    getState,
    getStateListeners
  ]);
  reactExports.useEffect(() => {
    return addKeyedListener?.("getState", key, getRehydratedState);
  }, [
    addKeyedListener,
    getRehydratedState,
    key
  ]);
}
function useOnRouteFocus({ router: router2, getState, key: sourceRouteKey, setState }) {
  const { onRouteFocus: onRouteFocusParent } = reactExports.useContext(NavigationBuilderContext);
  return reactExports.useCallback((key) => {
    const state = getState();
    const result = router2.getStateForRouteFocus(state, key);
    if (result !== state) {
      setState(result);
    }
    if (onRouteFocusParent !== void 0 && sourceRouteKey !== void 0) {
      onRouteFocusParent(sourceRouteKey);
    }
  }, [
    getState,
    onRouteFocusParent,
    router2,
    setState,
    sourceRouteKey
  ]);
}
function useRegisterNavigator() {
  const [key] = reactExports.useState(() => nanoid());
  const container = reactExports.useContext(SingleNavigatorContext);
  if (container === void 0) {
    throw new Error("Couldn't register the navigator. Have you wrapped your app with 'NavigationContainer'?\n\nThis can also happen if there are multiple copies of '@react-navigation' packages installed.");
  }
  reactExports.useEffect(() => {
    const { register, unregister } = container;
    register(key);
    return () => unregister(key);
  }, [
    container,
    key
  ]);
  return key;
}
function useScheduleUpdate(callback) {
  const { scheduleUpdate, flushUpdates } = reactExports.useContext(NavigationBuilderContext);
  scheduleUpdate(callback);
  useIsomorphicLayoutEffect(flushUpdates);
}
const isValidKey = (key) => key === void 0 || typeof key === "string" && key !== "";
const getRouteConfigsFromChildren = (children, groupKey, groupOptions, groupLayout) => {
  const configs = reactExports.Children.toArray(children).reduce((acc, child) => {
    if (/* @__PURE__ */ reactExports.isValidElement(child)) {
      if (child.type === Screen$1) {
        if (!isValidKey(child.props.navigationKey)) {
          throw new Error(`Got an invalid 'navigationKey' prop (${JSON.stringify(child.props.navigationKey)}) for the screen '${child.props.name}'. It must be a non-empty string or 'undefined'.`);
        }
        acc.push({
          keys: [
            groupKey,
            child.props.navigationKey
          ],
          options: groupOptions,
          layout: groupLayout,
          props: child.props
        });
        return acc;
      }
      if (child.type === reactExports.Fragment || child.type === Group) {
        if (!isValidKey(child.props.navigationKey)) {
          throw new Error(`Got an invalid 'navigationKey' prop (${JSON.stringify(child.props.navigationKey)}) for the group. It must be a non-empty string or 'undefined'.`);
        }
        acc.push(...getRouteConfigsFromChildren(child.props.children, child.props.navigationKey, child.type !== Group ? groupOptions : groupOptions != null ? [
          ...groupOptions,
          child.props.screenOptions
        ] : [
          child.props.screenOptions
        ], typeof child.props.screenLayout === "function" ? child.props.screenLayout : groupLayout));
        return acc;
      }
    }
    throw new Error(`A navigator can only contain 'Screen', 'Group' or 'React.Fragment' as its direct children (found ${reactExports.isValidElement(child) ? `'${typeof child.type === "string" ? child.type : child.type?.name}'${child.props != null && typeof child.props === "object" && "name" in child.props && child.props?.name ? ` for the screen '${child.props.name}'` : ""}` : typeof child === "object" ? JSON.stringify(child) : `'${String(child)}'`}). To render this component in the navigator, pass it in the 'component' prop to 'Screen'.`);
  }, []);
  return configs;
};
function useNavigationBuilder(createRouter, options) {
  const navigatorKey = useRegisterNavigator();
  const route = reactExports.useContext(NavigationRouteContext);
  const { children, layout, screenOptions, screenLayout, screenListeners, UNSTABLE_router, ...rest } = options;
  const routeConfigs = getRouteConfigsFromChildren(children);
  const router2 = useLazyValue(() => {
    if (rest.initialRouteName != null && routeConfigs.every((config2) => config2.props.name !== rest.initialRouteName)) {
      throw new Error(`Couldn't find a screen named '${rest.initialRouteName}' to use as 'initialRouteName'.`);
    }
    const original = createRouter(rest);
    if (UNSTABLE_router != null) {
      const overrides = UNSTABLE_router(original);
      return {
        ...original,
        ...overrides
      };
    }
    return original;
  });
  const screens = routeConfigs.reduce((acc, config2) => {
    if (config2.props.name in acc) {
      throw new Error(`A navigator cannot contain multiple 'Screen' components with the same name (found duplicate screen named '${config2.props.name}')`);
    }
    acc[config2.props.name] = config2;
    return acc;
  }, {});
  const routeNames = routeConfigs.map((config2) => config2.props.name);
  const routeKeyList = routeNames.reduce((acc, curr) => {
    acc[curr] = screens[curr].keys.map((key) => key ?? "").join(":");
    return acc;
  }, {});
  const routeParamList = routeNames.reduce((acc, curr) => {
    const { initialParams } = screens[curr].props;
    acc[curr] = initialParams;
    return acc;
  }, {});
  const routeGetIdList = routeNames.reduce((acc, curr) => Object.assign(acc, {
    [curr]: screens[curr].props.getId
  }), {});
  if (!routeNames.length) {
    throw new Error("Couldn't find any screens for the navigator. Have you defined any screens as its children?");
  }
  const isStateValid = reactExports.useCallback((state2) => state2.type === void 0 || state2.type === router2.type, [
    router2.type
  ]);
  const isStateInitialized = reactExports.useCallback((state2) => state2 !== void 0 && state2.stale === false && isStateValid(state2), [
    isStateValid
  ]);
  const { state: currentState, getState: getCurrentState, setState: setCurrentState, setKey, getKey, getIsInitial } = reactExports.useContext(NavigationStateContext);
  const stateCleanedUp = reactExports.useRef(false);
  const setState = useLatestCallback((state2) => {
    if (stateCleanedUp.current) {
      return;
    }
    setCurrentState(state2);
  });
  const [initializedState, isFirstStateInitialization] = reactExports.useMemo(() => {
    const initialRouteParamList = routeNames.reduce((acc, curr) => {
      const { initialParams } = screens[curr].props;
      const initialParamsFromParams = route?.params?.state == null && route?.params?.initial !== false && route?.params?.screen === curr ? route.params.params : void 0;
      acc[curr] = initialParams !== void 0 || initialParamsFromParams !== void 0 ? {
        ...initialParams,
        ...initialParamsFromParams
      } : void 0;
      return acc;
    }, {});
    if ((currentState === void 0 || !isStateValid(currentState)) && route?.params?.state == null && !(typeof route?.params?.screen === "string" && route?.params?.initial !== false)) {
      return [
        router2.getInitialState({
          routeNames,
          routeParamList: initialRouteParamList,
          routeGetIdList
        }),
        true
      ];
    } else {
      let stateFromParams;
      if (route?.params?.state != null) {
        stateFromParams = route.params.state;
      } else if (typeof route?.params?.screen === "string" && route?.params?.initial !== false) {
        stateFromParams = {
          index: 0,
          routes: [
            {
              name: route.params.screen,
              params: route.params.params,
              path: route.params.path
            }
          ]
        };
      }
      return [
        router2.getRehydratedState(stateFromParams ?? currentState, {
          routeNames,
          routeParamList: initialRouteParamList,
          routeGetIdList
        }),
        false
      ];
    }
  }, [
    currentState,
    router2,
    isStateValid
  ]);
  const previousRouteKeyListRef = reactExports.useRef(routeKeyList);
  reactExports.useEffect(() => {
    previousRouteKeyListRef.current = routeKeyList;
  });
  const previousRouteKeyList = previousRouteKeyListRef.current;
  let state = (
    // If the state isn't initialized, or stale, use the state we initialized instead
    // The state won't update until there's a change needed in the state we have initialized locally
    // So it'll be `undefined` or stale until the first navigation event happens
    isStateInitialized(currentState) ? currentState : initializedState
  );
  let nextState = state;
  if (!isArrayEqual(state.routeNames, routeNames) || !isRecordEqual(routeKeyList, previousRouteKeyList)) {
    nextState = router2.getStateForRouteNamesChange(state, {
      routeNames,
      routeParamList,
      routeGetIdList,
      routeKeyChanges: Object.keys(routeKeyList).filter((name) => name in previousRouteKeyList && routeKeyList[name] !== previousRouteKeyList[name])
    });
  }
  const previousNestedParamsRef = reactExports.useRef(route?.params);
  reactExports.useEffect(() => {
    previousNestedParamsRef.current = route?.params;
  }, [
    route?.params
  ]);
  if (route?.params) {
    const previousParams = previousNestedParamsRef.current;
    let action;
    if (typeof route.params.state === "object" && route.params.state != null && route.params !== previousParams) {
      action = reset(route.params.state);
    } else if (typeof route.params.screen === "string" && (route.params.initial === false && isFirstStateInitialization || route.params !== previousParams)) {
      action = navigate({
        name: route.params.screen,
        params: route.params.params,
        path: route.params.path,
        pop: route.params.pop
      });
    }
    const updatedState = action ? router2.getStateForAction(nextState, action, {
      routeNames,
      routeParamList,
      routeGetIdList
    }) : null;
    nextState = updatedState !== null ? router2.getRehydratedState(updatedState, {
      routeNames,
      routeParamList,
      routeGetIdList
    }) : nextState;
  }
  const shouldUpdate = state !== nextState;
  useScheduleUpdate(() => {
    if (shouldUpdate) {
      setState(nextState);
    }
  });
  state = nextState;
  reactExports.useEffect(() => {
    stateCleanedUp.current = false;
    setKey(navigatorKey);
    if (!getIsInitial()) {
      setState(nextState);
    }
    return () => {
      if (getCurrentState() !== void 0 && getKey() === navigatorKey) {
        setCurrentState(void 0);
        stateCleanedUp.current = true;
      }
    };
  }, []);
  const stateRef = reactExports.useRef(state);
  stateRef.current = state;
  useIsomorphicLayoutEffect(() => {
    stateRef.current = null;
  });
  const getState = useLatestCallback(() => {
    const currentState2 = getCurrentState();
    return deepFreeze(isStateInitialized(currentState2) ? currentState2 : initializedState);
  });
  const emitter = useEventEmitter((e) => {
    const routeNames2 = [];
    let route2;
    if (e.target) {
      route2 = state.routes.find((route3) => route3.key === e.target);
      if (route2?.name) {
        routeNames2.push(route2.name);
      }
    } else {
      route2 = state.routes[state.index];
      routeNames2.push(...Object.keys(screens).filter((name) => route2?.name === name));
    }
    if (route2 == null) {
      return;
    }
    const navigation2 = descriptors[route2.key].navigation;
    const listeners = [].concat(
      ...[
        screenListeners,
        ...routeNames2.map((name) => {
          const { listeners: listeners2 } = screens[name].props;
          return listeners2;
        })
      ].map((listeners2) => {
        const map = typeof listeners2 === "function" ? listeners2({
          route: route2,
          navigation: navigation2
        }) : listeners2;
        return map ? Object.keys(map).filter((type) => type === e.type).map((type) => map?.[type]) : void 0;
      })
    ).filter((cb, i, self) => cb && self.lastIndexOf(cb) === i);
    listeners.forEach((listener) => listener?.(e));
  });
  useFocusEvents({
    state,
    emitter
  });
  reactExports.useEffect(() => {
    emitter.emit({
      type: "state",
      data: {
        state
      }
    });
  }, [
    emitter,
    state
  ]);
  const { listeners: childListeners, addListener } = useChildListeners();
  const { keyedListeners, addKeyedListener } = useKeyedChildListeners();
  const onAction = useOnAction({
    router: router2,
    getState,
    setState,
    key: route?.key,
    actionListeners: childListeners.action,
    beforeRemoveListeners: keyedListeners.beforeRemove,
    routerConfigOptions: {
      routeNames,
      routeParamList,
      routeGetIdList
    },
    emitter
  });
  const onRouteFocus = useOnRouteFocus({
    router: router2,
    key: route?.key,
    getState,
    setState
  });
  const navigation = useNavigationHelpers({
    id: options.id,
    onAction,
    getState,
    emitter,
    router: router2,
    stateRef
  });
  useFocusedListenersChildrenAdapter({
    navigation,
    focusedListeners: childListeners.focus
  });
  useOnGetState({
    getState,
    getStateListeners: keyedListeners.getState
  });
  const { describe, descriptors } = useDescriptors({
    state,
    screens,
    navigation,
    screenOptions,
    screenLayout,
    onAction,
    getState,
    setState,
    onRouteFocus,
    addListener,
    addKeyedListener,
    router: router2,
    // @ts-expect-error: this should have both core and custom events, but too much work right now
    emitter
  });
  useCurrentRender({
    state,
    navigation,
    descriptors
  });
  const NavigationContent2 = useComponent((children2) => {
    const element = layout != null ? layout({
      state,
      descriptors,
      navigation,
      children: children2
    }) : children2;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationHelpersContext.Provider, {
      value: navigation,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(PreventRemoveProvider, {
        children: element
      })
    });
  });
  return {
    state,
    navigation,
    describe,
    descriptors,
    NavigationContent: NavigationContent2
  };
}
const router = {
  navigate: navigate$1,
  push,
  dismiss,
  dismissAll,
  canDismiss,
  replace,
  back: goBack$1,
  canGoBack,
  setParams: (params) => setParams(params),
  subscribe: subscribeToRootState,
  onLoadState: subscribeToLoadingState
};
function useNavigation(parent) {
  const navigation = useNavigation$1(), contextKey = useContextKey(), normalizedParent = React.useMemo(() => {
    if (!parent) return null;
    const normalized = getNameFromFilePath(parent);
    return parent.startsWith(".") ? relativePaths(contextKey, parent) : normalized;
  }, [
    contextKey,
    parent
  ]);
  if (normalizedParent != null) {
    const parentNavigation = navigation.getParent(normalizedParent);
    if (!parentNavigation) throw new Error(`Could not find parent navigation with route "${parent}".` + (normalizedParent !== parent ? ` (normalized: ${normalizedParent})` : ""));
    return parentNavigation;
  }
  return navigation;
}
function relativePaths(from, to) {
  const fromParts = from.split("/").filter(Boolean), toParts = to.split("/").filter(Boolean);
  for (const part of toParts) if (part === "..") {
    if (fromParts.length === 0) throw new Error(`Cannot resolve path "${to}" relative to "${from}"`);
    fromParts.pop();
  } else part === "." || fromParts.push(part);
  return "/" + fromParts.join("/");
}
function Screen({ name, options }) {
  const navigation = useNavigation(name);
  return useIsomorphicLayoutEffect$1(() => {
    options && // React Navigation will infinitely loop in some cases if an empty object is passed to setOptions.
    // https://github.com/expo/router/issues/452
    Object.keys(options).length && navigation.setOptions(options);
  }, [
    navigation,
    options
  ]), null;
}
function useFilterScreenChildren(children, { isCustomNavigator, contextKey } = {}) {
  return React.useMemo(() => {
    const customChildren = [], screens = React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child && child.type === Screen) {
        if (!child.props.name) throw new Error(`<Screen /> component in \`default export\` at \`app${contextKey}/_layout\` must have a \`name\` prop when used as a child of a Layout Route.`);
        return child.props;
      }
      isCustomNavigator ? customChildren.push(child) : console.warn(`Layout children must be of type Screen, all other children are ignored. To use custom children, create a custom <Layout />. Update Layout Route at: "app${contextKey}/_layout"`);
    })?.filter(Boolean);
    return {
      screens,
      children: customChildren
    };
  }, [
    children,
    contextKey,
    isCustomNavigator
  ]);
}
const NavigatorContext = reactExports.createContext(null);
function Navigator({ initialRouteName, screenOptions, children, router: router2 }) {
  const contextKey = useContextKey(), { screens, children: otherSlot } = useFilterScreenChildren(children, {
    isCustomNavigator: true,
    contextKey
  }), sorted = useSortedScreens(screens ?? []);
  return sorted.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(QualifiedNavigator, {
    initialRouteName,
    screenOptions,
    screens: sorted,
    contextKey,
    router: router2,
    children: otherSlot
  }) : (console.warn(`Navigator at "${contextKey}" has no children.`), null);
}
function QualifiedNavigator({ initialRouteName, screenOptions, children, screens, contextKey, router: router2 = StackRouter }) {
  const { state, navigation, descriptors, NavigationContent: NavigationContent2 } = useNavigationBuilder(router2, {
    // Used for getting the parent with navigation.getParent('/normalized/path')
    id: contextKey,
    children: screens,
    screenOptions,
    initialRouteName
  }), value = reactExports.useMemo(() => ({
    contextKey,
    state,
    navigation,
    descriptors,
    router: router2
  }), [
    contextKey,
    state,
    navigation,
    descriptors,
    router2
  ]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(NavigatorContext.Provider, {
    value,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationContent2, {
      children
    })
  });
}
function useNavigatorContext() {
  const context = reactExports.useContext(NavigatorContext);
  if (!context) throw new Error("useNavigatorContext must be used within a <Navigator />");
  return context;
}
function useSlot() {
  const context = useNavigatorContext(), flags = reactExports.useContext(FlagsContext), { state, descriptors } = context, current = state.routes.find((route, i) => state.index === i);
  if (!current) return null;
  let renderedElement = descriptors[current.key]?.render() ?? null;
  return flags.experimentalPreventLayoutRemounting && renderedElement !== null && (renderedElement = {
    ...renderedElement,
    key: "one-uses-a-static-key-here-for-slot-navigator"
  }), renderedElement;
}
const Slot = reactExports.memo(function(props) {
  const contextKey = useContextKey();
  return reactExports.useContext(NavigatorContext)?.contextKey !== contextKey ? /* @__PURE__ */ jsxRuntimeExports.jsx(Navigator, {
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(QualifiedSlot, {})
  }) : /* @__PURE__ */ jsxRuntimeExports.jsx(QualifiedSlot, {});
});
function QualifiedSlot() {
  return useSlot();
}
Navigator.Slot = Slot;
Navigator.useContext = useNavigatorContext;
Navigator.Screen = Screen;
const LoadProgressBar = ({ startDelay = 500, finishDelay = 50, initialPercent = 20, updateInterval = 300, sporadicness = 3, ...props }) => {
  const [loaded, setLoaded] = reactExports.useState(0), [width, setWidth] = reactExports.useState(0);
  return reactExports.useEffect(() => {
    let loadInterval;
    const dispose = router.onLoadState((state) => {
      switch (clearTimeout(loadInterval), state) {
        case "loading": {
          loadInterval = setTimeout(() => {
            setLoaded(initialPercent);
            let intervalCount = 0;
            loadInterval = setInterval(() => {
              intervalCount++, intervalCount % sporadicness !== 0 && setLoaded((prev) => {
                const increment = (100 - prev) * (prev > 80 ? 0.05 : 0.1) * Math.random();
                return Math.min(prev + increment, 100);
              });
            }, updateInterval);
          }, startDelay);
          break;
        }
        case "loaded": {
          setLoaded(100), clearInterval(loadInterval), setTimeout(() => {
            setLoaded(0);
          }, finishDelay);
          break;
        }
      }
    });
    return () => {
      dispose(), clearInterval(loadInterval);
    };
  }, [
    finishDelay,
    initialPercent,
    sporadicness,
    startDelay,
    updateInterval
  ]), /* @__PURE__ */ jsxRuntimeExports.jsx(View, {
    ...props,
    onLayout: (e) => {
      setWidth(e.nativeEvent.layout.width), props.onLayout?.(e);
    },
    style: [
      {
        display: loaded === 0 ? "none" : "flex",
        height: 1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(60, 100, 200, 0.65)",
        width: "100%",
        transform: [
          {
            translateX: -(1 - loaded * 0.01) * width
          }
        ],
        zIndex: Number.MAX_SAFE_INTEGER
      },
      props.style
    ]
  });
};
const storageKey = "vxrn-scheme", getSetting = () => typeof localStorage < "u" && localStorage.getItem(storageKey) || "system", SchemeContext = reactExports.createContext({
  setting: "system",
  scheme: "light"
}), useColorScheme = () => {
  const [state] = useColorScheme$1();
  return [
    state,
    setSchemeSetting
  ];
};
function setSchemeSetting(next) {
  typeof localStorage < "u" && localStorage.setItem(storageKey, next), setColorScheme(next);
}
function SchemeProvider({
  children,
  // defaults to tamagui-compatible
  getClassName = (name) => `t_${name}`
}) {
  const [colorSchemeSetting] = useColorSchemeSetting(), [colorScheme] = useColorScheme();
  return useIsomorphicLayoutEffect$1(() => {
    setColorScheme(getSetting());
    const toAdd = getClassName(colorScheme), { classList } = document.documentElement;
    if (!classList.contains(toAdd)) {
      const toRemove = colorScheme === "light" ? "dark" : "light";
      classList.remove(getClassName(toRemove)), classList.add(toAdd);
    }
  }, [
    colorScheme
  ]), /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", {
        dangerouslySetInnerHTML: {
          __html: `let d = document.documentElement.classList
          d.remove('${getClassName("light")}')
            d.remove('${getClassName("dark")}')
          let e = localStorage.getItem('${storageKey}')
          let t =
            'system' === e || !e
              ? window.matchMedia('(prefers-color-scheme: dark)').matches
              : e === 'dark'
          t ? d.add('${getClassName("dark")}') : d.add('${getClassName("light")}')
          `
        }
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SchemeContext.Provider, {
        value: reactExports.useMemo(() => ({
          scheme: colorScheme,
          setting: colorSchemeSetting
        }), [
          colorScheme,
          colorSchemeSetting
        ]),
        children
      })
    ]
  });
}
const PresenceContext = reactExports.createContext(null), ResetPresence = (props) => {
  const parent = reactExports.useContext(PresenceContext);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PresenceContext.Provider, {
    value: props.disable ? parent : null,
    children: props.children
  });
};
function usePresence() {
  const context = reactExports.useContext(PresenceContext);
  if (!context) return [
    true,
    null,
    context
  ];
  const { id, isPresent: isPresent2, onExitComplete, register } = context;
  return reactExports.useEffect(() => register(id), []), !isPresent2 && onExitComplete ? [
    false,
    () => onExitComplete?.(id),
    context
  ] : [
    true,
    void 0,
    context
  ];
}
const fontWeights = [
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900"
], processSection = (section, keys, defaultValue) => {
  if (typeof section == "string") return section;
  const sectionKeys = Object.keys(section);
  let fillValue = section[sectionKeys[0]];
  return Object.fromEntries([
    .../* @__PURE__ */ new Set([
      ...keys,
      ...sectionKeys
    ])
  ].map((key) => {
    const value = section[key] ?? defaultValue ?? fillValue;
    return fillValue = value, defaultValue = value, [
      key,
      value
    ];
  }));
}, createFont = (font) => {
  const sizeKeys = Object.keys(font.size || {}), processedFont = Object.fromEntries(Object.entries(font).map(([key, section]) => [
    key,
    processSection(section, key === "face" ? fontWeights : sizeKeys, key === "face" ? {
      normal: font.family
    } : void 0)
  ]));
  return Object.freeze(processedFont);
};
const createTamagui = createTamagui$1;
const TamaguiProvider = ({ children, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(TamaguiProvider$1, {
  ...props,
  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZIndexStackContext.Provider, {
    value: 1,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(PortalProvider, {
      shouldAddRootHost: true,
      children
    })
  })
});
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (typeof state === "function" ? receiver !== state || true : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return state.set(receiver, value), value;
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
var _Resource_rid;
const SERIALIZE_TO_IPC_FN = "__TAURI_TO_IPC_KEY__";
function transformCallback(callback, once2 = false) {
  return window.__TAURI_INTERNALS__.transformCallback(callback, once2);
}
async function invoke(cmd, args = {}, options) {
  return window.__TAURI_INTERNALS__.invoke(cmd, args, options);
}
class Resource {
  get rid() {
    return __classPrivateFieldGet(this, _Resource_rid, "f");
  }
  /**
   * Destroys and cleans up this resource from memory.
   * **You should not call any method on this object anymore and should drop any reference to it.**
   */
  async close() {
    return invoke("plugin:resources|close", {
      rid: this.rid
    });
  }
  constructor(rid) {
    _Resource_rid.set(this, void 0);
    __classPrivateFieldSet(this, _Resource_rid, rid);
  }
}
_Resource_rid = /* @__PURE__ */ new WeakMap();
var TauriEvent;
(function(TauriEvent2) {
  TauriEvent2["WINDOW_RESIZED"] = "tauri://resize";
  TauriEvent2["WINDOW_MOVED"] = "tauri://move";
  TauriEvent2["WINDOW_CLOSE_REQUESTED"] = "tauri://close-requested";
  TauriEvent2["WINDOW_DESTROYED"] = "tauri://destroyed";
  TauriEvent2["WINDOW_FOCUS"] = "tauri://focus";
  TauriEvent2["WINDOW_BLUR"] = "tauri://blur";
  TauriEvent2["WINDOW_SCALE_FACTOR_CHANGED"] = "tauri://scale-change";
  TauriEvent2["WINDOW_THEME_CHANGED"] = "tauri://theme-changed";
  TauriEvent2["WINDOW_CREATED"] = "tauri://window-created";
  TauriEvent2["WEBVIEW_CREATED"] = "tauri://webview-created";
  TauriEvent2["DRAG_ENTER"] = "tauri://drag-enter";
  TauriEvent2["DRAG_OVER"] = "tauri://drag-over";
  TauriEvent2["DRAG_DROP"] = "tauri://drag-drop";
  TauriEvent2["DRAG_LEAVE"] = "tauri://drag-leave";
})(TauriEvent || (TauriEvent = {}));
async function _unlisten(event, eventId) {
  await invoke("plugin:event|unlisten", {
    event,
    eventId
  });
}
async function listen(event, handler, options) {
  var _a;
  const target = typeof (options === null || options === void 0 ? void 0 : options.target) === "string" ? {
    kind: "AnyLabel",
    label: options.target
  } : (_a = options === null || options === void 0 ? void 0 : options.target) !== null && _a !== void 0 ? _a : {
    kind: "Any"
  };
  return invoke("plugin:event|listen", {
    event,
    target,
    handler: transformCallback(handler)
  }).then((eventId) => {
    return async () => _unlisten(event, eventId);
  });
}
async function once(event, handler, options) {
  return listen(event, (eventData) => {
    _unlisten(event, eventData.id);
    handler(eventData);
  }, options);
}
async function emit(event, payload) {
  await invoke("plugin:event|emit", {
    event,
    payload
  });
}
async function emitTo(target, event, payload) {
  const eventTarget = typeof target === "string" ? {
    kind: "AnyLabel",
    label: target
  } : target;
  await invoke("plugin:event|emit_to", {
    target: eventTarget,
    event,
    payload
  });
}
async function onOpenUrl(handler) {
  return await listen("deep-link://new-url", (event) => {
    handler(event.payload);
  });
}
const AuthEffects = () => {
  useAuthPassTokenToTauriEffect();
  useAuthPassJWTSecretToZeroEffect();
  return null;
};
const useAuthPassJWTSecretToZeroEffect = () => {
  const { token, user } = useAuth();
  reactExports.useEffect(() => {
    if (user && token) {
      setZeroAuth({
        jwtToken: token,
        userID: user.id
      });
    }
  }, [
    user,
    token
  ]);
};
const useAuthPassTokenToTauriEffect = () => {
  if (!isTauri) return;
  reactExports.useEffect(() => {
    try {
      onOpenUrl(([urlString]) => {
        const url = new URL(urlString);
        switch (url.host) {
          case "finish-auth": {
            const token = url.searchParams.get("token");
            const session = url.searchParams.get("session");
            if (token && session) {
              setAuthClientToken({
                token,
                session
              });
            }
            break;
          }
        }
      });
    } catch (err) {
      console.error(err);
    }
  }, []);
};
class LogicalSize {
  /**
   * Converts the logical size to a physical one.
   * @example
   * ```typescript
   * import { LogicalSize } from '@tauri-apps/api/dpi';
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   *
   * const appWindow = getCurrentWindow();
   * const factor = await appWindow.scaleFactor();
   * const size = new LogicalSize(400, 500);
   * const physical = size.toPhysical(factor);
   * ```
   *
   * @since 2.0.0
   */
  toPhysical(scaleFactor) {
    return new PhysicalSize(this.width * scaleFactor, this.height * scaleFactor);
  }
  [SERIALIZE_TO_IPC_FN]() {
    return {
      width: this.width,
      height: this.height
    };
  }
  toJSON() {
    return this[SERIALIZE_TO_IPC_FN]();
  }
  constructor(...args) {
    this.type = "Logical";
    if (args.length === 1) {
      if ("Logical" in args[0]) {
        this.width = args[0].Logical.width;
        this.height = args[0].Logical.height;
      } else {
        this.width = args[0].width;
        this.height = args[0].height;
      }
    } else {
      this.width = args[0];
      this.height = args[1];
    }
  }
}
class PhysicalSize {
  /**
   * Converts the physical size to a logical one.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * const appWindow = getCurrentWindow();
   * const factor = await appWindow.scaleFactor();
   * const size = await appWindow.innerSize(); // PhysicalSize
   * const logical = size.toLogical(factor);
   * ```
   */
  toLogical(scaleFactor) {
    return new LogicalSize(this.width / scaleFactor, this.height / scaleFactor);
  }
  [SERIALIZE_TO_IPC_FN]() {
    return {
      width: this.width,
      height: this.height
    };
  }
  toJSON() {
    return this[SERIALIZE_TO_IPC_FN]();
  }
  constructor(...args) {
    this.type = "Physical";
    if (args.length === 1) {
      if ("Physical" in args[0]) {
        this.width = args[0].Physical.width;
        this.height = args[0].Physical.height;
      } else {
        this.width = args[0].width;
        this.height = args[0].height;
      }
    } else {
      this.width = args[0];
      this.height = args[1];
    }
  }
}
class Size {
  toLogical(scaleFactor) {
    return this.size instanceof LogicalSize ? this.size : this.size.toLogical(scaleFactor);
  }
  toPhysical(scaleFactor) {
    return this.size instanceof PhysicalSize ? this.size : this.size.toPhysical(scaleFactor);
  }
  [SERIALIZE_TO_IPC_FN]() {
    return {
      [`${this.size.type}`]: {
        width: this.size.width,
        height: this.size.height
      }
    };
  }
  toJSON() {
    return this[SERIALIZE_TO_IPC_FN]();
  }
  constructor(size2) {
    this.size = size2;
  }
}
class LogicalPosition {
  /**
   * Converts the logical position to a physical one.
   * @example
   * ```typescript
   * import { LogicalPosition } from '@tauri-apps/api/dpi';
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   *
   * const appWindow = getCurrentWindow();
   * const factor = await appWindow.scaleFactor();
   * const position = new LogicalPosition(400, 500);
   * const physical = position.toPhysical(factor);
   * ```
   *
   * @since 2.0.0
   */
  toPhysical(scaleFactor) {
    return new PhysicalPosition(this.x * scaleFactor, this.y * scaleFactor);
  }
  [SERIALIZE_TO_IPC_FN]() {
    return {
      x: this.x,
      y: this.y
    };
  }
  toJSON() {
    return this[SERIALIZE_TO_IPC_FN]();
  }
  constructor(...args) {
    this.type = "Logical";
    if (args.length === 1) {
      if ("Logical" in args[0]) {
        this.x = args[0].Logical.x;
        this.y = args[0].Logical.y;
      } else {
        this.x = args[0].x;
        this.y = args[0].y;
      }
    } else {
      this.x = args[0];
      this.y = args[1];
    }
  }
}
class PhysicalPosition {
  /**
   * Converts the physical position to a logical one.
   * @example
   * ```typescript
   * import { PhysicalPosition } from '@tauri-apps/api/dpi';
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   *
   * const appWindow = getCurrentWindow();
   * const factor = await appWindow.scaleFactor();
   * const position = new PhysicalPosition(400, 500);
   * const physical = position.toLogical(factor);
   * ```
   *
   * @since 2.0.0
   */
  toLogical(scaleFactor) {
    return new LogicalPosition(this.x / scaleFactor, this.y / scaleFactor);
  }
  [SERIALIZE_TO_IPC_FN]() {
    return {
      x: this.x,
      y: this.y
    };
  }
  toJSON() {
    return this[SERIALIZE_TO_IPC_FN]();
  }
  constructor(...args) {
    this.type = "Physical";
    if (args.length === 1) {
      if ("Physical" in args[0]) {
        this.x = args[0].Physical.x;
        this.y = args[0].Physical.y;
      } else {
        this.x = args[0].x;
        this.y = args[0].y;
      }
    } else {
      this.x = args[0];
      this.y = args[1];
    }
  }
}
class Position {
  toLogical(scaleFactor) {
    return this.position instanceof LogicalPosition ? this.position : this.position.toLogical(scaleFactor);
  }
  toPhysical(scaleFactor) {
    return this.position instanceof PhysicalPosition ? this.position : this.position.toPhysical(scaleFactor);
  }
  [SERIALIZE_TO_IPC_FN]() {
    return {
      [`${this.position.type}`]: {
        x: this.position.x,
        y: this.position.y
      }
    };
  }
  toJSON() {
    return this[SERIALIZE_TO_IPC_FN]();
  }
  constructor(position) {
    this.position = position;
  }
}
class Image extends Resource {
  /** Creates a new Image using RGBA data, in row-major order from top to bottom, and with specified width and height. */
  static async new(rgba, width, height) {
    return invoke("plugin:image|new", {
      rgba: transformImage(rgba),
      width,
      height
    }).then((rid) => new Image(rid));
  }
  /**
   * Creates a new image using the provided bytes by inferring the file format.
   * If the format is known, prefer [@link Image.fromPngBytes] or [@link Image.fromIcoBytes].
   *
   * Only `ico` and `png` are supported (based on activated feature flag).
   *
   * Note that you need the `image-ico` or `image-png` Cargo features to use this API.
   * To enable it, change your Cargo.toml file:
   * ```toml
   * [dependencies]
   * tauri = { version = "...", features = ["...", "image-png"] }
   * ```
   */
  static async fromBytes(bytes) {
    return invoke("plugin:image|from_bytes", {
      bytes: transformImage(bytes)
    }).then((rid) => new Image(rid));
  }
  /**
   * Creates a new image using the provided path.
   *
   * Only `ico` and `png` are supported (based on activated feature flag).
   *
   * Note that you need the `image-ico` or `image-png` Cargo features to use this API.
   * To enable it, change your Cargo.toml file:
   * ```toml
   * [dependencies]
   * tauri = { version = "...", features = ["...", "image-png"] }
   * ```
   */
  static async fromPath(path) {
    return invoke("plugin:image|from_path", {
      path
    }).then((rid) => new Image(rid));
  }
  /** Returns the RGBA data for this image, in row-major order from top to bottom.  */
  async rgba() {
    return invoke("plugin:image|rgba", {
      rid: this.rid
    }).then((buffer) => new Uint8Array(buffer));
  }
  /** Returns the size of this image.  */
  async size() {
    return invoke("plugin:image|size", {
      rid: this.rid
    });
  }
  /**
   * Creates an Image from a resource ID. For internal use only.
   *
   * @ignore
   */
  constructor(rid) {
    super(rid);
  }
}
function transformImage(image) {
  const ret = image == null ? null : typeof image === "string" ? image : image instanceof Image ? image.rid : image;
  return ret;
}
var UserAttentionType;
(function(UserAttentionType2) {
  UserAttentionType2[UserAttentionType2["Critical"] = 1] = "Critical";
  UserAttentionType2[UserAttentionType2["Informational"] = 2] = "Informational";
})(UserAttentionType || (UserAttentionType = {}));
class CloseRequestedEvent {
  preventDefault() {
    this._preventDefault = true;
  }
  isPreventDefault() {
    return this._preventDefault;
  }
  constructor(event) {
    this._preventDefault = false;
    this.event = event.event;
    this.id = event.id;
  }
}
var ProgressBarStatus;
(function(ProgressBarStatus2) {
  ProgressBarStatus2["None"] = "none";
  ProgressBarStatus2["Normal"] = "normal";
  ProgressBarStatus2["Indeterminate"] = "indeterminate";
  ProgressBarStatus2["Paused"] = "paused";
  ProgressBarStatus2["Error"] = "error";
})(ProgressBarStatus || (ProgressBarStatus = {}));
function getCurrentWindow() {
  return new Window(window.__TAURI_INTERNALS__.metadata.currentWindow.label, {
    // @ts-expect-error `skip` is not defined in the public API but it is handled by the constructor
    skip: true
  });
}
async function getAllWindows() {
  return invoke("plugin:window|get_all_windows").then((windows) => windows.map((w) => new Window(w, {
    // @ts-expect-error `skip` is not defined in the public API but it is handled by the constructor
    skip: true
  })));
}
const localTauriEvents$1 = [
  "tauri://created",
  "tauri://error"
];
class Window {
  /**
   * Gets the Window associated with the given label.
   * @example
   * ```typescript
   * import { Window } from '@tauri-apps/api/window';
   * const mainWindow = Window.getByLabel('main');
   * ```
   *
   * @param label The window label.
   * @returns The Window instance to communicate with the window or null if the window doesn't exist.
   */
  static async getByLabel(label) {
    var _a;
    return (_a = (await getAllWindows()).find((w) => w.label === label)) !== null && _a !== void 0 ? _a : null;
  }
  /**
   * Get an instance of `Window` for the current window.
   */
  static getCurrent() {
    return getCurrentWindow();
  }
  /**
   * Gets a list of instances of `Window` for all available windows.
   */
  static async getAll() {
    return getAllWindows();
  }
  /**
   *  Gets the focused window.
   * @example
   * ```typescript
   * import { Window } from '@tauri-apps/api/window';
   * const focusedWindow = Window.getFocusedWindow();
   * ```
   *
   * @returns The Window instance or `undefined` if there is not any focused window.
   */
  static async getFocusedWindow() {
    for (const w of await getAllWindows()) {
      if (await w.isFocused()) {
        return w;
      }
    }
    return null;
  }
  /**
   * Listen to an emitted event on this window.
   *
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * const unlisten = await getCurrentWindow().listen<string>('state-changed', (event) => {
   *   console.log(`Got error: ${payload}`);
   * });
   *
   * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
   * unlisten();
   * ```
   *
   * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
   * @param handler Event handler.
   * @returns A promise resolving to a function to unlisten to the event.
   * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
   */
  async listen(event, handler) {
    if (this._handleTauriEvent(event, handler)) {
      return () => {
        const listeners = this.listeners[event];
        listeners.splice(listeners.indexOf(handler), 1);
      };
    }
    return listen(event, handler, {
      target: {
        kind: "Window",
        label: this.label
      }
    });
  }
  /**
   * Listen to an emitted event on this window only once.
   *
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * const unlisten = await getCurrentWindow().once<null>('initialized', (event) => {
   *   console.log(`Window initialized!`);
   * });
   *
   * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
   * unlisten();
   * ```
   *
   * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
   * @param handler Event handler.
   * @returns A promise resolving to a function to unlisten to the event.
   * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
   */
  async once(event, handler) {
    if (this._handleTauriEvent(event, handler)) {
      return () => {
        const listeners = this.listeners[event];
        listeners.splice(listeners.indexOf(handler), 1);
      };
    }
    return once(event, handler, {
      target: {
        kind: "Window",
        label: this.label
      }
    });
  }
  /**
   * Emits an event to all {@link EventTarget|targets}.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().emit('window-loaded', { loggedIn: true, token: 'authToken' });
   * ```
   *
   * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
   * @param payload Event payload.
   */
  async emit(event, payload) {
    if (localTauriEvents$1.includes(event)) {
      for (const handler of this.listeners[event] || []) {
        handler({
          event,
          id: -1,
          payload
        });
      }
      return;
    }
    return emit(event, payload);
  }
  /**
   * Emits an event to all {@link EventTarget|targets} matching the given target.
   *
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().emit('main', 'window-loaded', { loggedIn: true, token: 'authToken' });
   * ```
   * @param target Label of the target Window/Webview/WebviewWindow or raw {@link EventTarget} object.
   * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
   * @param payload Event payload.
   */
  async emitTo(target, event, payload) {
    if (localTauriEvents$1.includes(event)) {
      for (const handler of this.listeners[event] || []) {
        handler({
          event,
          id: -1,
          payload
        });
      }
      return;
    }
    return emitTo(target, event, payload);
  }
  /** @ignore */
  _handleTauriEvent(event, handler) {
    if (localTauriEvents$1.includes(event)) {
      if (!(event in this.listeners)) {
        this.listeners[event] = [
          handler
        ];
      } else {
        this.listeners[event].push(handler);
      }
      return true;
    }
    return false;
  }
  // Getters
  /**
   * The scale factor that can be used to map physical pixels to logical pixels.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * const factor = await getCurrentWindow().scaleFactor();
   * ```
   *
   * @returns The window's monitor scale factor.
   */
  async scaleFactor() {
    return invoke("plugin:window|scale_factor", {
      label: this.label
    });
  }
  /**
   * The position of the top-left hand corner of the window's client area relative to the top-left hand corner of the desktop.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * const position = await getCurrentWindow().innerPosition();
   * ```
   *
   * @returns The window's inner position.
   */
  async innerPosition() {
    return invoke("plugin:window|inner_position", {
      label: this.label
    }).then((p) => new PhysicalPosition(p));
  }
  /**
   * The position of the top-left hand corner of the window relative to the top-left hand corner of the desktop.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * const position = await getCurrentWindow().outerPosition();
   * ```
   *
   * @returns The window's outer position.
   */
  async outerPosition() {
    return invoke("plugin:window|outer_position", {
      label: this.label
    }).then((p) => new PhysicalPosition(p));
  }
  /**
   * The physical size of the window's client area.
   * The client area is the content of the window, excluding the title bar and borders.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * const size = await getCurrentWindow().innerSize();
   * ```
   *
   * @returns The window's inner size.
   */
  async innerSize() {
    return invoke("plugin:window|inner_size", {
      label: this.label
    }).then((s) => new PhysicalSize(s));
  }
  /**
   * The physical size of the entire window.
   * These dimensions include the title bar and borders. If you don't want that (and you usually don't), use inner_size instead.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * const size = await getCurrentWindow().outerSize();
   * ```
   *
   * @returns The window's outer size.
   */
  async outerSize() {
    return invoke("plugin:window|outer_size", {
      label: this.label
    }).then((s) => new PhysicalSize(s));
  }
  /**
   * Gets the window's current fullscreen state.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * const fullscreen = await getCurrentWindow().isFullscreen();
   * ```
   *
   * @returns Whether the window is in fullscreen mode or not.
   */
  async isFullscreen() {
    return invoke("plugin:window|is_fullscreen", {
      label: this.label
    });
  }
  /**
   * Gets the window's current minimized state.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * const minimized = await getCurrentWindow().isMinimized();
   * ```
   */
  async isMinimized() {
    return invoke("plugin:window|is_minimized", {
      label: this.label
    });
  }
  /**
   * Gets the window's current maximized state.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * const maximized = await getCurrentWindow().isMaximized();
   * ```
   *
   * @returns Whether the window is maximized or not.
   */
  async isMaximized() {
    return invoke("plugin:window|is_maximized", {
      label: this.label
    });
  }
  /**
   * Gets the window's current focus state.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * const focused = await getCurrentWindow().isFocused();
   * ```
   *
   * @returns Whether the window is focused or not.
   */
  async isFocused() {
    return invoke("plugin:window|is_focused", {
      label: this.label
    });
  }
  /**
   * Gets the window's current decorated state.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * const decorated = await getCurrentWindow().isDecorated();
   * ```
   *
   * @returns Whether the window is decorated or not.
   */
  async isDecorated() {
    return invoke("plugin:window|is_decorated", {
      label: this.label
    });
  }
  /**
   * Gets the window's current resizable state.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * const resizable = await getCurrentWindow().isResizable();
   * ```
   *
   * @returns Whether the window is resizable or not.
   */
  async isResizable() {
    return invoke("plugin:window|is_resizable", {
      label: this.label
    });
  }
  /**
   * Gets the window's native maximize button state.
   *
   * #### Platform-specific
   *
   * - **Linux / iOS / Android:** Unsupported.
   *
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * const maximizable = await getCurrentWindow().isMaximizable();
   * ```
   *
   * @returns Whether the window's native maximize button is enabled or not.
   */
  async isMaximizable() {
    return invoke("plugin:window|is_maximizable", {
      label: this.label
    });
  }
  /**
   * Gets the window's native minimize button state.
   *
   * #### Platform-specific
   *
   * - **Linux / iOS / Android:** Unsupported.
   *
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * const minimizable = await getCurrentWindow().isMinimizable();
   * ```
   *
   * @returns Whether the window's native minimize button is enabled or not.
   */
  async isMinimizable() {
    return invoke("plugin:window|is_minimizable", {
      label: this.label
    });
  }
  /**
   * Gets the window's native close button state.
   *
   * #### Platform-specific
   *
   * - **iOS / Android:** Unsupported.
   *
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * const closable = await getCurrentWindow().isClosable();
   * ```
   *
   * @returns Whether the window's native close button is enabled or not.
   */
  async isClosable() {
    return invoke("plugin:window|is_closable", {
      label: this.label
    });
  }
  /**
   * Gets the window's current visible state.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * const visible = await getCurrentWindow().isVisible();
   * ```
   *
   * @returns Whether the window is visible or not.
   */
  async isVisible() {
    return invoke("plugin:window|is_visible", {
      label: this.label
    });
  }
  /**
   * Gets the window's current title.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * const title = await getCurrentWindow().title();
   * ```
   */
  async title() {
    return invoke("plugin:window|title", {
      label: this.label
    });
  }
  /**
   * Gets the window's current theme.
   *
   * #### Platform-specific
   *
   * - **macOS:** Theme was introduced on macOS 10.14. Returns `light` on macOS 10.13 and below.
   *
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * const theme = await getCurrentWindow().theme();
   * ```
   *
   * @returns The window theme.
   */
  async theme() {
    return invoke("plugin:window|theme", {
      label: this.label
    });
  }
  // Setters
  /**
   * Centers the window.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().center();
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   */
  async center() {
    return invoke("plugin:window|center", {
      label: this.label
    });
  }
  /**
   *  Requests user attention to the window, this has no effect if the application
   * is already focused. How requesting for user attention manifests is platform dependent,
   * see `UserAttentionType` for details.
   *
   * Providing `null` will unset the request for user attention. Unsetting the request for
   * user attention might not be done automatically by the WM when the window receives input.
   *
   * #### Platform-specific
   *
   * - **macOS:** `null` has no effect.
   * - **Linux:** Urgency levels have the same effect.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().requestUserAttention();
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   */
  async requestUserAttention(requestType) {
    let requestType_ = null;
    if (requestType) {
      if (requestType === UserAttentionType.Critical) {
        requestType_ = {
          type: "Critical"
        };
      } else {
        requestType_ = {
          type: "Informational"
        };
      }
    }
    return invoke("plugin:window|request_user_attention", {
      label: this.label,
      value: requestType_
    });
  }
  /**
   * Updates the window resizable flag.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().setResizable(false);
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   */
  async setResizable(resizable) {
    return invoke("plugin:window|set_resizable", {
      label: this.label,
      value: resizable
    });
  }
  /**
   * Enable or disable the window.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().setEnabled(false);
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   *
   * @since 2.0.0
   */
  async setEnabled(enabled) {
    return invoke("plugin:window|set_enabled", {
      label: this.label,
      value: enabled
    });
  }
  /**
   * Whether the window is enabled or disabled.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().setEnabled(false);
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   *
   * @since 2.0.0
   */
  async isEnabled() {
    return invoke("plugin:window|is_enabled", {
      label: this.label
    });
  }
  /**
   * Sets whether the window's native maximize button is enabled or not.
   * If resizable is set to false, this setting is ignored.
   *
   * #### Platform-specific
   *
   * - **macOS:** Disables the "zoom" button in the window titlebar, which is also used to enter fullscreen mode.
   * - **Linux / iOS / Android:** Unsupported.
   *
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().setMaximizable(false);
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   */
  async setMaximizable(maximizable) {
    return invoke("plugin:window|set_maximizable", {
      label: this.label,
      value: maximizable
    });
  }
  /**
   * Sets whether the window's native minimize button is enabled or not.
   *
   * #### Platform-specific
   *
   * - **Linux / iOS / Android:** Unsupported.
   *
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().setMinimizable(false);
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   */
  async setMinimizable(minimizable) {
    return invoke("plugin:window|set_minimizable", {
      label: this.label,
      value: minimizable
    });
  }
  /**
   * Sets whether the window's native close button is enabled or not.
   *
   * #### Platform-specific
   *
   * - **Linux:** GTK+ will do its best to convince the window manager not to show a close button. Depending on the system, this function may not have any effect when called on a window that is already visible
   * - **iOS / Android:** Unsupported.
   *
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().setClosable(false);
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   */
  async setClosable(closable) {
    return invoke("plugin:window|set_closable", {
      label: this.label,
      value: closable
    });
  }
  /**
   * Sets the window title.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().setTitle('Tauri');
   * ```
   *
   * @param title The new title
   * @returns A promise indicating the success or failure of the operation.
   */
  async setTitle(title) {
    return invoke("plugin:window|set_title", {
      label: this.label,
      value: title
    });
  }
  /**
   * Maximizes the window.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().maximize();
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   */
  async maximize() {
    return invoke("plugin:window|maximize", {
      label: this.label
    });
  }
  /**
   * Unmaximizes the window.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().unmaximize();
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   */
  async unmaximize() {
    return invoke("plugin:window|unmaximize", {
      label: this.label
    });
  }
  /**
   * Toggles the window maximized state.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().toggleMaximize();
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   */
  async toggleMaximize() {
    return invoke("plugin:window|toggle_maximize", {
      label: this.label
    });
  }
  /**
   * Minimizes the window.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().minimize();
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   */
  async minimize() {
    return invoke("plugin:window|minimize", {
      label: this.label
    });
  }
  /**
   * Unminimizes the window.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().unminimize();
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   */
  async unminimize() {
    return invoke("plugin:window|unminimize", {
      label: this.label
    });
  }
  /**
   * Sets the window visibility to true.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().show();
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   */
  async show() {
    return invoke("plugin:window|show", {
      label: this.label
    });
  }
  /**
   * Sets the window visibility to false.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().hide();
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   */
  async hide() {
    return invoke("plugin:window|hide", {
      label: this.label
    });
  }
  /**
   * Closes the window.
   *
   * Note this emits a closeRequested event so you can intercept it. To force window close, use {@link Window.destroy}.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().close();
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   */
  async close() {
    return invoke("plugin:window|close", {
      label: this.label
    });
  }
  /**
   * Destroys the window. Behaves like {@link Window.close} but forces the window close instead of emitting a closeRequested event.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().destroy();
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   */
  async destroy() {
    return invoke("plugin:window|destroy", {
      label: this.label
    });
  }
  /**
   * Whether the window should have borders and bars.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().setDecorations(false);
   * ```
   *
   * @param decorations Whether the window should have borders and bars.
   * @returns A promise indicating the success or failure of the operation.
   */
  async setDecorations(decorations) {
    return invoke("plugin:window|set_decorations", {
      label: this.label,
      value: decorations
    });
  }
  /**
   * Whether or not the window should have shadow.
   *
   * #### Platform-specific
   *
   * - **Windows:**
   *   - `false` has no effect on decorated window, shadows are always ON.
   *   - `true` will make undecorated window have a 1px white border,
   * and on Windows 11, it will have a rounded corners.
   * - **Linux:** Unsupported.
   *
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().setShadow(false);
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   */
  async setShadow(enable) {
    return invoke("plugin:window|set_shadow", {
      label: this.label,
      value: enable
    });
  }
  /**
   * Set window effects.
   */
  async setEffects(effects) {
    return invoke("plugin:window|set_effects", {
      label: this.label,
      value: effects
    });
  }
  /**
   * Clear any applied effects if possible.
   */
  async clearEffects() {
    return invoke("plugin:window|set_effects", {
      label: this.label,
      value: null
    });
  }
  /**
   * Whether the window should always be on top of other windows.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().setAlwaysOnTop(true);
   * ```
   *
   * @param alwaysOnTop Whether the window should always be on top of other windows or not.
   * @returns A promise indicating the success or failure of the operation.
   */
  async setAlwaysOnTop(alwaysOnTop) {
    return invoke("plugin:window|set_always_on_top", {
      label: this.label,
      value: alwaysOnTop
    });
  }
  /**
   * Whether the window should always be below other windows.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().setAlwaysOnBottom(true);
   * ```
   *
   * @param alwaysOnBottom Whether the window should always be below other windows or not.
   * @returns A promise indicating the success or failure of the operation.
   */
  async setAlwaysOnBottom(alwaysOnBottom) {
    return invoke("plugin:window|set_always_on_bottom", {
      label: this.label,
      value: alwaysOnBottom
    });
  }
  /**
   * Prevents the window contents from being captured by other apps.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().setContentProtected(true);
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   */
  async setContentProtected(protected_) {
    return invoke("plugin:window|set_content_protected", {
      label: this.label,
      value: protected_
    });
  }
  /**
   * Resizes the window with a new inner size.
   * @example
   * ```typescript
   * import { getCurrentWindow, LogicalSize } from '@tauri-apps/api/window';
   * await getCurrentWindow().setSize(new LogicalSize(600, 500));
   * ```
   *
   * @param size The logical or physical inner size.
   * @returns A promise indicating the success or failure of the operation.
   */
  async setSize(size2) {
    return invoke("plugin:window|set_size", {
      label: this.label,
      value: size2 instanceof Size ? size2 : new Size(size2)
    });
  }
  /**
   * Sets the window minimum inner size. If the `size` argument is not provided, the constraint is unset.
   * @example
   * ```typescript
   * import { getCurrentWindow, PhysicalSize } from '@tauri-apps/api/window';
   * await getCurrentWindow().setMinSize(new PhysicalSize(600, 500));
   * ```
   *
   * @param size The logical or physical inner size, or `null` to unset the constraint.
   * @returns A promise indicating the success or failure of the operation.
   */
  async setMinSize(size2) {
    return invoke("plugin:window|set_min_size", {
      label: this.label,
      value: size2 instanceof Size ? size2 : size2 ? new Size(size2) : null
    });
  }
  /**
   * Sets the window maximum inner size. If the `size` argument is undefined, the constraint is unset.
   * @example
   * ```typescript
   * import { getCurrentWindow, LogicalSize } from '@tauri-apps/api/window';
   * await getCurrentWindow().setMaxSize(new LogicalSize(600, 500));
   * ```
   *
   * @param size The logical or physical inner size, or `null` to unset the constraint.
   * @returns A promise indicating the success or failure of the operation.
   */
  async setMaxSize(size2) {
    return invoke("plugin:window|set_max_size", {
      label: this.label,
      value: size2 instanceof Size ? size2 : size2 ? new Size(size2) : null
    });
  }
  /**
   * Sets the window inner size constraints.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().setSizeConstraints({ minWidth: 300 });
   * ```
   *
   * @param constraints The logical or physical inner size, or `null` to unset the constraint.
   * @returns A promise indicating the success or failure of the operation.
   */
  async setSizeConstraints(constraints) {
    function logical(pixel) {
      return pixel ? {
        Logical: pixel
      } : null;
    }
    return invoke("plugin:window|set_size_constraints", {
      label: this.label,
      value: {
        minWidth: logical(constraints === null || constraints === void 0 ? void 0 : constraints.minWidth),
        minHeight: logical(constraints === null || constraints === void 0 ? void 0 : constraints.minHeight),
        maxWidth: logical(constraints === null || constraints === void 0 ? void 0 : constraints.maxWidth),
        maxHeight: logical(constraints === null || constraints === void 0 ? void 0 : constraints.maxHeight)
      }
    });
  }
  /**
   * Sets the window outer position.
   * @example
   * ```typescript
   * import { getCurrentWindow, LogicalPosition } from '@tauri-apps/api/window';
   * await getCurrentWindow().setPosition(new LogicalPosition(600, 500));
   * ```
   *
   * @param position The new position, in logical or physical pixels.
   * @returns A promise indicating the success or failure of the operation.
   */
  async setPosition(position) {
    return invoke("plugin:window|set_position", {
      label: this.label,
      value: position instanceof Position ? position : new Position(position)
    });
  }
  /**
   * Sets the window fullscreen state.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().setFullscreen(true);
   * ```
   *
   * @param fullscreen Whether the window should go to fullscreen or not.
   * @returns A promise indicating the success or failure of the operation.
   */
  async setFullscreen(fullscreen) {
    return invoke("plugin:window|set_fullscreen", {
      label: this.label,
      value: fullscreen
    });
  }
  /**
   * Bring the window to front and focus.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().setFocus();
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   */
  async setFocus() {
    return invoke("plugin:window|set_focus", {
      label: this.label
    });
  }
  /**
   * Sets the window icon.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().setIcon('/tauri/awesome.png');
   * ```
   *
   * Note that you may need the `image-ico` or `image-png` Cargo features to use this API.
   * To enable it, change your Cargo.toml file:
   * ```toml
   * [dependencies]
   * tauri = { version = "...", features = ["...", "image-png"] }
   * ```
   *
   * @param icon Icon bytes or path to the icon file.
   * @returns A promise indicating the success or failure of the operation.
   */
  async setIcon(icon) {
    return invoke("plugin:window|set_icon", {
      label: this.label,
      value: transformImage(icon)
    });
  }
  /**
   * Whether the window icon should be hidden from the taskbar or not.
   *
   * #### Platform-specific
   *
   * - **macOS:** Unsupported.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().setSkipTaskbar(true);
   * ```
   *
   * @param skip true to hide window icon, false to show it.
   * @returns A promise indicating the success or failure of the operation.
   */
  async setSkipTaskbar(skip) {
    return invoke("plugin:window|set_skip_taskbar", {
      label: this.label,
      value: skip
    });
  }
  /**
   * Grabs the cursor, preventing it from leaving the window.
   *
   * There's no guarantee that the cursor will be hidden. You should
   * hide it by yourself if you want so.
   *
   * #### Platform-specific
   *
   * - **Linux:** Unsupported.
   * - **macOS:** This locks the cursor in a fixed location, which looks visually awkward.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().setCursorGrab(true);
   * ```
   *
   * @param grab `true` to grab the cursor icon, `false` to release it.
   * @returns A promise indicating the success or failure of the operation.
   */
  async setCursorGrab(grab) {
    return invoke("plugin:window|set_cursor_grab", {
      label: this.label,
      value: grab
    });
  }
  /**
   * Modifies the cursor's visibility.
   *
   * #### Platform-specific
   *
   * - **Windows:** The cursor is only hidden within the confines of the window.
   * - **macOS:** The cursor is hidden as long as the window has input focus, even if the cursor is
   *   outside of the window.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().setCursorVisible(false);
   * ```
   *
   * @param visible If `false`, this will hide the cursor. If `true`, this will show the cursor.
   * @returns A promise indicating the success or failure of the operation.
   */
  async setCursorVisible(visible) {
    return invoke("plugin:window|set_cursor_visible", {
      label: this.label,
      value: visible
    });
  }
  /**
   * Modifies the cursor icon of the window.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().setCursorIcon('help');
   * ```
   *
   * @param icon The new cursor icon.
   * @returns A promise indicating the success or failure of the operation.
   */
  async setCursorIcon(icon) {
    return invoke("plugin:window|set_cursor_icon", {
      label: this.label,
      value: icon
    });
  }
  /**
   * Sets the window background color.
   *
   * #### Platform-specific:
   *
   * - **Windows:** alpha channel is ignored.
   * - **iOS / Android:** Unsupported.
   *
   * @returns A promise indicating the success or failure of the operation.
   *
   * @since 2.1.0
   */
  async setBackgroundColor(color) {
    return invoke("plugin:window|set_background_color", {
      color
    });
  }
  /**
   * Changes the position of the cursor in window coordinates.
   * @example
   * ```typescript
   * import { getCurrentWindow, LogicalPosition } from '@tauri-apps/api/window';
   * await getCurrentWindow().setCursorPosition(new LogicalPosition(600, 300));
   * ```
   *
   * @param position The new cursor position.
   * @returns A promise indicating the success or failure of the operation.
   */
  async setCursorPosition(position) {
    return invoke("plugin:window|set_cursor_position", {
      label: this.label,
      value: position instanceof Position ? position : new Position(position)
    });
  }
  /**
   * Changes the cursor events behavior.
   *
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().setIgnoreCursorEvents(true);
   * ```
   *
   * @param ignore `true` to ignore the cursor events; `false` to process them as usual.
   * @returns A promise indicating the success or failure of the operation.
   */
  async setIgnoreCursorEvents(ignore) {
    return invoke("plugin:window|set_ignore_cursor_events", {
      label: this.label,
      value: ignore
    });
  }
  /**
   * Starts dragging the window.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().startDragging();
   * ```
   *
   * @return A promise indicating the success or failure of the operation.
   */
  async startDragging() {
    return invoke("plugin:window|start_dragging", {
      label: this.label
    });
  }
  /**
   * Starts resize-dragging the window.
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().startResizeDragging();
   * ```
   *
   * @return A promise indicating the success or failure of the operation.
   */
  async startResizeDragging(direction) {
    return invoke("plugin:window|start_resize_dragging", {
      label: this.label,
      value: direction
    });
  }
  /**
   * Sets the badge count. It is app wide and not specific to this window.
   *
   * #### Platform-specific
   *
   * - **Windows**: Unsupported. Use @{linkcode Window.setOverlayIcon} instead.
   *
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().setBadgeCount(5);
   * ```
   *
   * @param count The badge count. Use `undefined` to remove the badge.
   * @return A promise indicating the success or failure of the operation.
   */
  async setBadgeCount(count) {
    return invoke("plugin:window|set_badge_count", {
      label: this.label,
      value: count
    });
  }
  /**
   * Sets the badge cont **macOS only**.
   *
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().setBadgeLabel("Hello");
   * ```
   *
   * @param label The badge label. Use `undefined` to remove the badge.
   * @return A promise indicating the success or failure of the operation.
   */
  async setBadgeLabel(label) {
    return invoke("plugin:window|set_badge_label", {
      label: this.label,
      value: label
    });
  }
  /**
   * Sets the overlay icon. **Windows only**
   * The overlay icon can be set for every window.
   *
   *
   * Note that you may need the `image-ico` or `image-png` Cargo features to use this API.
   * To enable it, change your Cargo.toml file:
   *
   * ```toml
   * [dependencies]
   * tauri = { version = "...", features = ["...", "image-png"] }
   * ```
   *
   * @example
   * ```typescript
   * import { getCurrentWindow } from '@tauri-apps/api/window';
   * await getCurrentWindow().setOverlayIcon("/tauri/awesome.png");
   * ```
   *
   * @param icon Icon bytes or path to the icon file. Use `undefined` to remove the overlay icon.
   * @return A promise indicating the success or failure of the operation.
   */
  async setOverlayIcon(icon) {
    return invoke("plugin:window|set_overlay_icon", {
      label: this.label,
      value: icon ? transformImage(icon) : void 0
    });
  }
  /**
   * Sets the taskbar progress state.
   *
   * #### Platform-specific
   *
   * - **Linux / macOS**: Progress bar is app-wide and not specific to this window.
   * - **Linux**: Only supported desktop environments with `libunity` (e.g. GNOME).
   *
   * @example
   * ```typescript
   * import { getCurrentWindow, ProgressBarStatus } from '@tauri-apps/api/window';
   * await getCurrentWindow().setProgressBar({
   *   status: ProgressBarStatus.Normal,
   *   progress: 50,
   * });
   * ```
   *
   * @return A promise indicating the success or failure of the operation.
   */
  async setProgressBar(state) {
    return invoke("plugin:window|set_progress_bar", {
      label: this.label,
      value: state
    });
  }
  /**
   * Sets whether the window should be visible on all workspaces or virtual desktops.
   *
   * #### Platform-specific
   *
   * - **Windows / iOS / Android:** Unsupported.
   *
   * @since 2.0.0
   */
  async setVisibleOnAllWorkspaces(visible) {
    return invoke("plugin:window|set_visible_on_all_workspaces", {
      label: this.label,
      value: visible
    });
  }
  /**
   * Sets the title bar style. **macOS only**.
   *
   * @since 2.0.0
   */
  async setTitleBarStyle(style) {
    return invoke("plugin:window|set_title_bar_style", {
      label: this.label,
      value: style
    });
  }
  /**
   * Set window theme, pass in `null` or `undefined` to follow system theme
   *
   * #### Platform-specific
   *
   * - **Linux / macOS**: Theme is app-wide and not specific to this window.
   * - **iOS / Android:** Unsupported.
   *
   * @since 2.0.0
   */
  async setTheme(theme) {
    return invoke("plugin:window|set_theme", {
      label: this.label,
      value: theme
    });
  }
  // Listeners
  /**
   * Listen to window resize.
   *
   * @example
   * ```typescript
   * import { getCurrentWindow } from "@tauri-apps/api/window";
   * const unlisten = await getCurrentWindow().onResized(({ payload: size }) => {
   *  console.log('Window resized', size);
   * });
   *
   * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
   * unlisten();
   * ```
   *
   * @returns A promise resolving to a function to unlisten to the event.
   * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
   */
  async onResized(handler) {
    return this.listen(TauriEvent.WINDOW_RESIZED, (e) => {
      e.payload = new PhysicalSize(e.payload);
      handler(e);
    });
  }
  /**
   * Listen to window move.
   *
   * @example
   * ```typescript
   * import { getCurrentWindow } from "@tauri-apps/api/window";
   * const unlisten = await getCurrentWindow().onMoved(({ payload: position }) => {
   *  console.log('Window moved', position);
   * });
   *
   * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
   * unlisten();
   * ```
   *
   * @returns A promise resolving to a function to unlisten to the event.
   * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
   */
  async onMoved(handler) {
    return this.listen(TauriEvent.WINDOW_MOVED, (e) => {
      e.payload = new PhysicalPosition(e.payload);
      handler(e);
    });
  }
  /**
   * Listen to window close requested. Emitted when the user requests to closes the window.
   *
   * @example
   * ```typescript
   * import { getCurrentWindow } from "@tauri-apps/api/window";
   * import { confirm } from '@tauri-apps/api/dialog';
   * const unlisten = await getCurrentWindow().onCloseRequested(async (event) => {
   *   const confirmed = await confirm('Are you sure?');
   *   if (!confirmed) {
   *     // user did not confirm closing the window; let's prevent it
   *     event.preventDefault();
   *   }
   * });
   *
   * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
   * unlisten();
   * ```
   *
   * @returns A promise resolving to a function to unlisten to the event.
   * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
   */
  async onCloseRequested(handler) {
    return this.listen(TauriEvent.WINDOW_CLOSE_REQUESTED, async (event) => {
      const evt = new CloseRequestedEvent(event);
      await handler(evt);
      if (!evt.isPreventDefault()) {
        await this.destroy();
      }
    });
  }
  /**
   * Listen to a file drop event.
   * The listener is triggered when the user hovers the selected files on the webview,
   * drops the files or cancels the operation.
   *
   * @example
   * ```typescript
   * import { getCurrentWindow } from "@tauri-apps/api/webview";
   * const unlisten = await getCurrentWindow().onDragDropEvent((event) => {
   *  if (event.payload.type === 'over') {
   *    console.log('User hovering', event.payload.position);
   *  } else if (event.payload.type === 'drop') {
   *    console.log('User dropped', event.payload.paths);
   *  } else {
   *    console.log('File drop cancelled');
   *  }
   * });
   *
   * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
   * unlisten();
   * ```
   *
   * @returns A promise resolving to a function to unlisten to the event.
   * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
   */
  async onDragDropEvent(handler) {
    const unlistenDrag = await this.listen(TauriEvent.DRAG_ENTER, (event) => {
      handler({
        ...event,
        payload: {
          type: "enter",
          paths: event.payload.paths,
          position: new PhysicalPosition(event.payload.position)
        }
      });
    });
    const unlistenDragOver = await this.listen(TauriEvent.DRAG_OVER, (event) => {
      handler({
        ...event,
        payload: {
          type: "over",
          position: new PhysicalPosition(event.payload.position)
        }
      });
    });
    const unlistenDrop = await this.listen(TauriEvent.DRAG_DROP, (event) => {
      handler({
        ...event,
        payload: {
          type: "drop",
          paths: event.payload.paths,
          position: new PhysicalPosition(event.payload.position)
        }
      });
    });
    const unlistenCancel = await this.listen(TauriEvent.DRAG_LEAVE, (event) => {
      handler({
        ...event,
        payload: {
          type: "leave"
        }
      });
    });
    return () => {
      unlistenDrag();
      unlistenDrop();
      unlistenDragOver();
      unlistenCancel();
    };
  }
  /**
   * Listen to window focus change.
   *
   * @example
   * ```typescript
   * import { getCurrentWindow } from "@tauri-apps/api/window";
   * const unlisten = await getCurrentWindow().onFocusChanged(({ payload: focused }) => {
   *  console.log('Focus changed, window is focused? ' + focused);
   * });
   *
   * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
   * unlisten();
   * ```
   *
   * @returns A promise resolving to a function to unlisten to the event.
   * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
   */
  async onFocusChanged(handler) {
    const unlistenFocus = await this.listen(TauriEvent.WINDOW_FOCUS, (event) => {
      handler({
        ...event,
        payload: true
      });
    });
    const unlistenBlur = await this.listen(TauriEvent.WINDOW_BLUR, (event) => {
      handler({
        ...event,
        payload: false
      });
    });
    return () => {
      unlistenFocus();
      unlistenBlur();
    };
  }
  /**
   * Listen to window scale change. Emitted when the window's scale factor has changed.
   * The following user actions can cause DPI changes:
   * - Changing the display's resolution.
   * - Changing the display's scale factor (e.g. in Control Panel on Windows).
   * - Moving the window to a display with a different scale factor.
   *
   * @example
   * ```typescript
   * import { getCurrentWindow } from "@tauri-apps/api/window";
   * const unlisten = await getCurrentWindow().onScaleChanged(({ payload }) => {
   *  console.log('Scale changed', payload.scaleFactor, payload.size);
   * });
   *
   * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
   * unlisten();
   * ```
   *
   * @returns A promise resolving to a function to unlisten to the event.
   * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
   */
  async onScaleChanged(handler) {
    return this.listen(TauriEvent.WINDOW_SCALE_FACTOR_CHANGED, handler);
  }
  /**
   * Listen to the system theme change.
   *
   * @example
   * ```typescript
   * import { getCurrentWindow } from "@tauri-apps/api/window";
   * const unlisten = await getCurrentWindow().onThemeChanged(({ payload: theme }) => {
   *  console.log('New theme: ' + theme);
   * });
   *
   * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
   * unlisten();
   * ```
   *
   * @returns A promise resolving to a function to unlisten to the event.
   * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
   */
  async onThemeChanged(handler) {
    return this.listen(TauriEvent.WINDOW_THEME_CHANGED, handler);
  }
  /**
   * Creates a new Window.
   * @example
   * ```typescript
   * import { Window } from '@tauri-apps/api/window';
   * const appWindow = new Window('my-label');
   * appWindow.once('tauri://created', function () {
   *  // window successfully created
   * });
   * appWindow.once('tauri://error', function (e) {
   *  // an error happened creating the window
   * });
   * ```
   *
   * @param label The unique window label. Must be alphanumeric: `a-zA-Z-/:_`.
   * @returns The {@link Window} instance to communicate with the window.
   */
  constructor(label, options = {}) {
    var _a;
    this.label = label;
    this.listeners = /* @__PURE__ */ Object.create(null);
    if (!(options === null || options === void 0 ? void 0 : options.skip)) {
      invoke("plugin:window|create", {
        options: {
          ...options,
          parent: typeof options.parent === "string" ? options.parent : (_a = options.parent) === null || _a === void 0 ? void 0 : _a.label,
          label
        }
      }).then(async () => this.emit("tauri://created")).catch(async (e) => this.emit("tauri://error", e));
    }
  }
}
var Effect;
(function(Effect2) {
  Effect2["AppearanceBased"] = "appearanceBased";
  Effect2["Light"] = "light";
  Effect2["Dark"] = "dark";
  Effect2["MediumLight"] = "mediumLight";
  Effect2["UltraDark"] = "ultraDark";
  Effect2["Titlebar"] = "titlebar";
  Effect2["Selection"] = "selection";
  Effect2["Menu"] = "menu";
  Effect2["Popover"] = "popover";
  Effect2["Sidebar"] = "sidebar";
  Effect2["HeaderView"] = "headerView";
  Effect2["Sheet"] = "sheet";
  Effect2["WindowBackground"] = "windowBackground";
  Effect2["HudWindow"] = "hudWindow";
  Effect2["FullScreenUI"] = "fullScreenUI";
  Effect2["Tooltip"] = "tooltip";
  Effect2["ContentBackground"] = "contentBackground";
  Effect2["UnderWindowBackground"] = "underWindowBackground";
  Effect2["UnderPageBackground"] = "underPageBackground";
  Effect2["Mica"] = "mica";
  Effect2["Blur"] = "blur";
  Effect2["Acrylic"] = "acrylic";
  Effect2["Tabbed"] = "tabbed";
  Effect2["TabbedDark"] = "tabbedDark";
  Effect2["TabbedLight"] = "tabbedLight";
})(Effect || (Effect = {}));
var EffectState;
(function(EffectState2) {
  EffectState2["FollowsWindowActiveState"] = "followsWindowActiveState";
  EffectState2["Active"] = "active";
  EffectState2["Inactive"] = "inactive";
})(EffectState || (EffectState = {}));
function getCurrentWebview() {
  return new Webview(getCurrentWindow(), window.__TAURI_INTERNALS__.metadata.currentWebview.label, {
    // @ts-expect-error `skip` is not defined in the public API but it is handled by the constructor
    skip: true
  });
}
async function getAllWebviews() {
  return invoke("plugin:webview|get_all_webviews").then((webviews) => webviews.map((w) => new Webview(new Window(w.windowLabel, {
    // @ts-expect-error `skip` is not defined in the public API but it is handled by the constructor
    skip: true
  }), w.label, {
    // @ts-expect-error `skip` is not defined in the public API but it is handled by the constructor
    skip: true
  })));
}
const localTauriEvents = [
  "tauri://created",
  "tauri://error"
];
class Webview {
  /**
   * Gets the Webview for the webview associated with the given label.
   * @example
   * ```typescript
   * import { Webview } from '@tauri-apps/api/webview';
   * const mainWebview = Webview.getByLabel('main');
   * ```
   *
   * @param label The webview label.
   * @returns The Webview instance to communicate with the webview or null if the webview doesn't exist.
   */
  static async getByLabel(label) {
    var _a;
    return (_a = (await getAllWebviews()).find((w) => w.label === label)) !== null && _a !== void 0 ? _a : null;
  }
  /**
   * Get an instance of `Webview` for the current webview.
   */
  static getCurrent() {
    return getCurrentWebview();
  }
  /**
   * Gets a list of instances of `Webview` for all available webviews.
   */
  static async getAll() {
    return getAllWebviews();
  }
  /**
   * Listen to an emitted event on this webview.
   *
   * @example
   * ```typescript
   * import { getCurrentWebview } from '@tauri-apps/api/webview';
   * const unlisten = await getCurrentWebview().listen<string>('state-changed', (event) => {
   *   console.log(`Got error: ${payload}`);
   * });
   *
   * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
   * unlisten();
   * ```
   *
   * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
   * @param handler Event handler.
   * @returns A promise resolving to a function to unlisten to the event.
   * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
   */
  async listen(event, handler) {
    if (this._handleTauriEvent(event, handler)) {
      return () => {
        const listeners = this.listeners[event];
        listeners.splice(listeners.indexOf(handler), 1);
      };
    }
    return listen(event, handler, {
      target: {
        kind: "Webview",
        label: this.label
      }
    });
  }
  /**
   * Listen to an emitted event on this webview only once.
   *
   * @example
   * ```typescript
   * import { getCurrentWebview } from '@tauri-apps/api/webview';
   * const unlisten = await getCurrent().once<null>('initialized', (event) => {
   *   console.log(`Webview initialized!`);
   * });
   *
   * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
   * unlisten();
   * ```
   *
   * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
   * @param handler Event handler.
   * @returns A promise resolving to a function to unlisten to the event.
   * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
   */
  async once(event, handler) {
    if (this._handleTauriEvent(event, handler)) {
      return () => {
        const listeners = this.listeners[event];
        listeners.splice(listeners.indexOf(handler), 1);
      };
    }
    return once(event, handler, {
      target: {
        kind: "Webview",
        label: this.label
      }
    });
  }
  /**
   * Emits an event to all {@link EventTarget|targets}.
   *
   * @example
   * ```typescript
   * import { getCurrentWebview } from '@tauri-apps/api/webview';
   * await getCurrentWebview().emit('webview-loaded', { loggedIn: true, token: 'authToken' });
   * ```
   *
   * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
   * @param payload Event payload.
   */
  async emit(event, payload) {
    if (localTauriEvents.includes(event)) {
      for (const handler of this.listeners[event] || []) {
        handler({
          event,
          id: -1,
          payload
        });
      }
      return;
    }
    return emit(event, payload);
  }
  /**
   * Emits an event to all {@link EventTarget|targets} matching the given target.
   *
   * @example
   * ```typescript
   * import { getCurrentWebview } from '@tauri-apps/api/webview';
   * await getCurrentWebview().emitTo('main', 'webview-loaded', { loggedIn: true, token: 'authToken' });
   * ```
   *
   * @param target Label of the target Window/Webview/WebviewWindow or raw {@link EventTarget} object.
   * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
   * @param payload Event payload.
   */
  async emitTo(target, event, payload) {
    if (localTauriEvents.includes(event)) {
      for (const handler of this.listeners[event] || []) {
        handler({
          event,
          id: -1,
          payload
        });
      }
      return;
    }
    return emitTo(target, event, payload);
  }
  /** @ignore */
  _handleTauriEvent(event, handler) {
    if (localTauriEvents.includes(event)) {
      if (!(event in this.listeners)) {
        this.listeners[event] = [
          handler
        ];
      } else {
        this.listeners[event].push(handler);
      }
      return true;
    }
    return false;
  }
  // Getters
  /**
   * The position of the top-left hand corner of the webview's client area relative to the top-left hand corner of the desktop.
   * @example
   * ```typescript
   * import { getCurrentWebview } from '@tauri-apps/api/webview';
   * const position = await getCurrentWebview().position();
   * ```
   *
   * @returns The webview's position.
   */
  async position() {
    return invoke("plugin:webview|webview_position", {
      label: this.label
    }).then((p) => new PhysicalPosition(p));
  }
  /**
   * The physical size of the webview's client area.
   * The client area is the content of the webview, excluding the title bar and borders.
   * @example
   * ```typescript
   * import { getCurrentWebview } from '@tauri-apps/api/webview';
   * const size = await getCurrentWebview().size();
   * ```
   *
   * @returns The webview's size.
   */
  async size() {
    return invoke("plugin:webview|webview_size", {
      label: this.label
    }).then((s) => new PhysicalSize(s));
  }
  // Setters
  /**
   * Closes the webview.
   * @example
   * ```typescript
   * import { getCurrentWebview } from '@tauri-apps/api/webview';
   * await getCurrentWebview().close();
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   */
  async close() {
    return invoke("plugin:webview|close", {
      label: this.label
    });
  }
  /**
   * Resizes the webview.
   * @example
   * ```typescript
   * import { getCurrent, LogicalSize } from '@tauri-apps/api/webview';
   * await getCurrentWebview().setSize(new LogicalSize(600, 500));
   * ```
   *
   * @param size The logical or physical size.
   * @returns A promise indicating the success or failure of the operation.
   */
  async setSize(size2) {
    return invoke("plugin:webview|set_webview_size", {
      label: this.label,
      value: size2 instanceof Size ? size2 : new Size(size2)
    });
  }
  /**
   * Sets the webview position.
   * @example
   * ```typescript
   * import { getCurrent, LogicalPosition } from '@tauri-apps/api/webview';
   * await getCurrentWebview().setPosition(new LogicalPosition(600, 500));
   * ```
   *
   * @param position The new position, in logical or physical pixels.
   * @returns A promise indicating the success or failure of the operation.
   */
  async setPosition(position) {
    return invoke("plugin:webview|set_webview_position", {
      label: this.label,
      value: position instanceof Position ? position : new Position(position)
    });
  }
  /**
   * Bring the webview to front and focus.
   * @example
   * ```typescript
   * import { getCurrentWebview } from '@tauri-apps/api/webview';
   * await getCurrentWebview().setFocus();
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   */
  async setFocus() {
    return invoke("plugin:webview|set_webview_focus", {
      label: this.label
    });
  }
  /**
   * Hide the webview.
   * @example
   * ```typescript
   * import { getCurrentWebview } from '@tauri-apps/api/webview';
   * await getCurrentWebview().hide();
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   */
  async hide() {
    return invoke("plugin:webview|webview_hide", {
      label: this.label
    });
  }
  /**
   * Show the webview.
   * @example
   * ```typescript
   * import { getCurrentWebview } from '@tauri-apps/api/webview';
   * await getCurrentWebview().show();
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   */
  async show() {
    return invoke("plugin:webview|webview_show", {
      label: this.label
    });
  }
  /**
   * Set webview zoom level.
   * @example
   * ```typescript
   * import { getCurrentWebview } from '@tauri-apps/api/webview';
   * await getCurrentWebview().setZoom(1.5);
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   */
  async setZoom(scaleFactor) {
    return invoke("plugin:webview|set_webview_zoom", {
      label: this.label,
      value: scaleFactor
    });
  }
  /**
   * Moves this webview to the given label.
   * @example
   * ```typescript
   * import { getCurrentWebview } from '@tauri-apps/api/webview';
   * await getCurrentWebview().reparent('other-window');
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   */
  async reparent(window1) {
    return invoke("plugin:webview|reparent", {
      label: this.label,
      window: typeof window1 === "string" ? window1 : window1.label
    });
  }
  /**
   * Clears all browsing data for this webview.
   * @example
   * ```typescript
   * import { getCurrentWebview } from '@tauri-apps/api/webview';
   * await getCurrentWebview().clearAllBrowsingData();
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   */
  async clearAllBrowsingData() {
    return invoke("plugin:webview|clear_all_browsing_data");
  }
  /**
   * Specify the webview background color.
   *
   * #### Platfrom-specific:
   *
   * - **macOS / iOS**: Not implemented.
   * - **Windows**:
   *   - On Windows 7, transparency is not supported and the alpha value will be ignored.
   *   - On Windows higher than 7: translucent colors are not supported so any alpha value other than `0` will be replaced by `255`
   *
   * @returns A promise indicating the success or failure of the operation.
   *
   * @since 2.1.0
   */
  async setBackgroundColor(color) {
    return invoke("plugin:webview|set_webview_background_color", {
      color
    });
  }
  // Listeners
  /**
   * Listen to a file drop event.
   * The listener is triggered when the user hovers the selected files on the webview,
   * drops the files or cancels the operation.
   *
   * @example
   * ```typescript
   * import { getCurrentWebview } from "@tauri-apps/api/webview";
   * const unlisten = await getCurrentWebview().onDragDropEvent((event) => {
   *  if (event.payload.type === 'over') {
   *    console.log('User hovering', event.payload.position);
   *  } else if (event.payload.type === 'drop') {
   *    console.log('User dropped', event.payload.paths);
   *  } else {
   *    console.log('File drop cancelled');
   *  }
   * });
   *
   * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
   * unlisten();
   * ```
   *
   * When the debugger panel is open, the drop position of this event may be inaccurate due to a known limitation.
   * To retrieve the correct drop position, please detach the debugger.
   *
   * @returns A promise resolving to a function to unlisten to the event.
   * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
   */
  async onDragDropEvent(handler) {
    const unlistenDragEnter = await this.listen(TauriEvent.DRAG_ENTER, (event) => {
      handler({
        ...event,
        payload: {
          type: "enter",
          paths: event.payload.paths,
          position: new PhysicalPosition(event.payload.position)
        }
      });
    });
    const unlistenDragOver = await this.listen(TauriEvent.DRAG_OVER, (event) => {
      handler({
        ...event,
        payload: {
          type: "over",
          position: new PhysicalPosition(event.payload.position)
        }
      });
    });
    const unlistenDragDrop = await this.listen(TauriEvent.DRAG_DROP, (event) => {
      handler({
        ...event,
        payload: {
          type: "drop",
          paths: event.payload.paths,
          position: new PhysicalPosition(event.payload.position)
        }
      });
    });
    const unlistenDragLeave = await this.listen(TauriEvent.DRAG_LEAVE, (event) => {
      handler({
        ...event,
        payload: {
          type: "leave"
        }
      });
    });
    return () => {
      unlistenDragEnter();
      unlistenDragDrop();
      unlistenDragOver();
      unlistenDragLeave();
    };
  }
  /**
   * Creates a new Webview.
   * @example
   * ```typescript
   * import { Window } from '@tauri-apps/api/window'
   * import { Webview } from '@tauri-apps/api/webview'
   * const appWindow = new Window('my-label')
   * const webview = new Webview(appWindow, 'my-label', {
   *   url: 'https://github.com/tauri-apps/tauri'
   * });
   * webview.once('tauri://created', function () {
   *  // webview successfully created
   * });
   * webview.once('tauri://error', function (e) {
   *  // an error happened creating the webview
   * });
   * ```
   *
   * @param window the window to add this webview to.
   * @param label The unique webview label. Must be alphanumeric: `a-zA-Z-/:_`.
   * @returns The {@link Webview} instance to communicate with the webview.
   */
  constructor(window1, label, options) {
    this.window = window1;
    this.label = label;
    this.listeners = /* @__PURE__ */ Object.create(null);
    if (!(options === null || options === void 0 ? void 0 : options.skip)) {
      invoke("plugin:webview|create_webview", {
        windowLabel: window1.label,
        label,
        options
      }).then(async () => this.emit("tauri://created")).catch(async (e) => this.emit("tauri://error", e));
    }
  }
}
var BaseDirectory;
(function(BaseDirectory2) {
  BaseDirectory2[BaseDirectory2["Audio"] = 1] = "Audio";
  BaseDirectory2[BaseDirectory2["Cache"] = 2] = "Cache";
  BaseDirectory2[BaseDirectory2["Config"] = 3] = "Config";
  BaseDirectory2[BaseDirectory2["Data"] = 4] = "Data";
  BaseDirectory2[BaseDirectory2["LocalData"] = 5] = "LocalData";
  BaseDirectory2[BaseDirectory2["Document"] = 6] = "Document";
  BaseDirectory2[BaseDirectory2["Download"] = 7] = "Download";
  BaseDirectory2[BaseDirectory2["Picture"] = 8] = "Picture";
  BaseDirectory2[BaseDirectory2["Public"] = 9] = "Public";
  BaseDirectory2[BaseDirectory2["Video"] = 10] = "Video";
  BaseDirectory2[BaseDirectory2["Resource"] = 11] = "Resource";
  BaseDirectory2[BaseDirectory2["Temp"] = 12] = "Temp";
  BaseDirectory2[BaseDirectory2["AppConfig"] = 13] = "AppConfig";
  BaseDirectory2[BaseDirectory2["AppData"] = 14] = "AppData";
  BaseDirectory2[BaseDirectory2["AppLocalData"] = 15] = "AppLocalData";
  BaseDirectory2[BaseDirectory2["AppCache"] = 16] = "AppCache";
  BaseDirectory2[BaseDirectory2["AppLog"] = 17] = "AppLog";
  BaseDirectory2[BaseDirectory2["Desktop"] = 18] = "Desktop";
  BaseDirectory2[BaseDirectory2["Executable"] = 19] = "Executable";
  BaseDirectory2[BaseDirectory2["Font"] = 20] = "Font";
  BaseDirectory2[BaseDirectory2["Home"] = 21] = "Home";
  BaseDirectory2[BaseDirectory2["Runtime"] = 22] = "Runtime";
  BaseDirectory2[BaseDirectory2["Template"] = 23] = "Template";
})(BaseDirectory || (BaseDirectory = {}));
var SeekMode;
(function(SeekMode2) {
  SeekMode2[SeekMode2["Start"] = 0] = "Start";
  SeekMode2[SeekMode2["Current"] = 1] = "Current";
  SeekMode2[SeekMode2["End"] = 2] = "End";
})(SeekMode || (SeekMode = {}));
async function readFile(path, options) {
  if (path instanceof URL && path.protocol !== "file:") {
    throw new TypeError("Must be a file URL.");
  }
  const arr = await invoke("plugin:fs|read_file", {
    path: path instanceof URL ? path.toString() : path,
    options
  });
  return arr instanceof ArrayBuffer ? new Uint8Array(arr) : Uint8Array.from(arr);
}
async function exists(path, options) {
  if (path instanceof URL && path.protocol !== "file:") {
    throw new TypeError("Must be a file URL.");
  }
  return await invoke("plugin:fs|exists", {
    path: path instanceof URL ? path.toString() : path,
    options
  });
}
const useDragDrop = (callback) => {
  if (!isTauri) {
    return;
  }
  reactExports.useEffect(() => {
    let unlisten = null;
    getCurrentWebview().onDragDropEvent(async (event) => {
      if (event.payload.type === "over") {
        callback({
          ...event.payload.position,
          type: "drag"
        });
      } else if (event.payload.type === "drop") {
        const paths = event.payload.paths;
        const files = (await Promise.all(paths.flatMap(async (path) => {
          if (await exists(path)) {
            return [
              {
                path,
                contents: await readFile(path)
              }
            ];
          }
          return [];
        }))).flat();
        callback({
          type: "drop",
          files
        });
      } else {
        callback({
          type: "cancel"
        });
      }
    }).then((disposer) => {
      unlisten = disposer;
    });
    return () => {
      unlisten?.();
    };
  }, []);
};
const DragDropFile = (props) => {
  const [state, setState] = reactExports.useState(null);
  useDragDrop((event) => {
    setState(event);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    id: "drag-drop-root",
    style: {
      display: "contents"
    },
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
        style: {
          width: "100%",
          height: "100%",
          zIndex: 1e5,
          position: "absolute",
          pointerEvents: "none",
          background: !state || state.type === "cancel" ? "transparent" : "rgba(0,0,0,0.5)"
        }
      }),
      props.children
    ]
  });
};
const shorthands = {
  // text
  text: "textAlign",
  // view
  b: "bottom",
  bg: "backgroundColor",
  content: "alignContent",
  grow: "flexGrow",
  items: "alignItems",
  justify: "justifyContent",
  l: "left",
  m: "margin",
  maxH: "maxHeight",
  maxW: "maxWidth",
  mb: "marginBottom",
  minH: "minHeight",
  minW: "minWidth",
  ml: "marginLeft",
  mr: "marginRight",
  mt: "marginTop",
  mx: "marginHorizontal",
  my: "marginVertical",
  p: "padding",
  pb: "paddingBottom",
  pl: "paddingLeft",
  pr: "paddingRight",
  pt: "paddingTop",
  px: "paddingHorizontal",
  py: "paddingVertical",
  r: "right",
  rounded: "borderRadius",
  select: "userSelect",
  self: "alignSelf",
  shrink: "flexShrink",
  t: "top",
  z: "zIndex"
};
const nonCompilerShorthands = [
  [
    "fd",
    "flexDirection"
  ],
  [
    "fb",
    "flexBasis"
  ],
  [
    "bblr",
    "borderBottomLeftRadius"
  ],
  [
    "bbrr",
    "borderBottomRightRadius"
  ],
  [
    "fwr",
    "flexWrap"
  ],
  [
    "col",
    "color"
  ],
  [
    "ff",
    "fontFamily"
  ],
  [
    "fst",
    "fontStyle"
  ],
  [
    "tr",
    "transform"
  ],
  [
    "tt",
    "textTransform"
  ],
  [
    "td",
    "textDecorationLine"
  ],
  [
    "va",
    "verticalAlign"
  ],
  [
    "ws",
    "whiteSpace"
  ],
  // @ts-ignore
  [
    "wb",
    "wordBreak"
  ],
  [
    "ww",
    "wordWrap"
  ],
  [
    "brc",
    "borderRightColor"
  ],
  [
    "brw",
    "borderRightWidth"
  ],
  [
    "bs",
    "borderStyle"
  ],
  [
    "btc",
    "borderTopColor"
  ],
  [
    "btlr",
    "borderTopLeftRadius"
  ],
  [
    "btrr",
    "borderTopRightRadius"
  ],
  [
    "btw",
    "borderTopWidth"
  ],
  [
    "bw",
    "borderWidth"
  ],
  [
    "o",
    "opacity"
  ],
  [
    "cur",
    "cursor"
  ],
  [
    "pe",
    "pointerEvents"
  ],
  [
    "ov",
    "overflow"
  ],
  [
    "pos",
    "position"
  ],
  [
    "dsp",
    "display"
  ],
  [
    "fw",
    "fontWeight"
  ],
  [
    "fs",
    "fontSize"
  ],
  [
    "ls",
    "letterSpacing"
  ],
  [
    "lh",
    "lineHeight"
  ],
  // @ts-ignore
  [
    "bxs",
    "boxSizing"
  ],
  [
    "bxsh",
    "boxShadow"
  ],
  // @ts-ignore
  [
    "ox",
    "overflowX"
  ],
  // @ts-ignore
  [
    "oy",
    "overflowY"
  ]
];
Object.assign(shorthands, Object.fromEntries(nonCompilerShorthands));
function sizeToSpace(v) {
  return v === 0 ? 0 : v === 2 ? 0.5 : v === 4 ? 1 : v === 8 ? 1.5 : v <= 16 ? Math.round(v * 0.333) : Math.floor(v * 0.7 - 12);
}
const size = {
  $0: 0,
  "$0.25": 2,
  "$0.5": 4,
  "$0.75": 8,
  $1: 20,
  "$1.5": 24,
  $2: 28,
  "$2.5": 32,
  $3: 36,
  "$3.5": 40,
  $4: 44,
  $true: 44,
  "$4.5": 48,
  $5: 52,
  $6: 64,
  $7: 74,
  $8: 84,
  $9: 94,
  $10: 104,
  $11: 124,
  $12: 144,
  $13: 164,
  $14: 184,
  $15: 204,
  $16: 224,
  $17: 224,
  $18: 244,
  $19: 264,
  $20: 284
}, spaces = Object.entries(size).map(([k, v]) => [
  k,
  sizeToSpace(v)
]), spacesNegative = spaces.slice(1).map(([k, v]) => [
  `-${k.slice(1)}`,
  -v
]), space = {
  ...Object.fromEntries(spaces),
  ...Object.fromEntries(spacesNegative)
}, zIndex = {
  0: 0,
  1: 100,
  2: 200,
  3: 300,
  4: 400,
  5: 500
}, radius = {
  0: 0,
  1: 3,
  2: 5,
  3: 7,
  4: 9,
  true: 9,
  5: 10,
  6: 16,
  7: 19,
  8: 22,
  9: 26,
  10: 34,
  11: 42,
  12: 50
}, tokens = {
  radius,
  zIndex,
  space,
  size
};
function isMinusZero(value) {
  return 1 / value === Number.NEGATIVE_INFINITY;
}
const THEME_INFO = /* @__PURE__ */ new Map(), getThemeInfo = (theme, name) => THEME_INFO.get(name || JSON.stringify(theme)), setThemeInfo = (theme, info) => {
  const next = {
    ...info,
    cache: /* @__PURE__ */ new Map()
  };
  THEME_INFO.set(info.name || JSON.stringify(theme), next), THEME_INFO.set(JSON.stringify(info.definition), next);
};
const identityCache = /* @__PURE__ */ new Map();
function createTheme(palette, definition, options, name, skipCache = false) {
  const cacheKey = skipCache ? "" : JSON.stringify([
    name,
    palette,
    definition,
    options
  ]);
  if (!skipCache && identityCache.has(cacheKey)) return identityCache.get(cacheKey);
  const theme = {
    ...Object.fromEntries(Object.entries(definition).map(([key, offset]) => [
      key,
      getValue(palette, offset)
    ])),
    ...options?.nonInheritedValues
  };
  return setThemeInfo(theme, {
    palette,
    definition,
    options,
    name
  }), cacheKey && identityCache.set(cacheKey, theme), theme;
}
const getValue = (palette, value) => {
  if (!palette) throw new Error("No palette!");
  if (typeof value == "string") return value;
  const max = palette.length - 1, next = (value === 0 ? !isMinusZero(value) : value >= 0) ? value : max + value, index = Math.min(Math.max(0, next), max);
  return palette[index];
};
function objectEntries(obj) {
  return Object.entries(obj);
}
function objectFromEntries$1(arr) {
  return Object.fromEntries(arr);
}
const createMask = (createMask2) => typeof createMask2 == "function" ? {
  name: createMask2.name || "unnamed",
  mask: createMask2
} : createMask2, skipMask = {
  name: "skip-mask",
  mask: (template, opts) => {
    const { skip } = opts;
    return Object.fromEntries(Object.entries(template).filter(([k]) => !skip || !(k in skip)).map(([k, v]) => [
      k,
      applyOverrides(k, v, opts)
    ]));
  }
};
function applyOverrides(key, value, opts) {
  let override, strategy = opts.overrideStrategy;
  const overrideSwap = opts.overrideSwap?.[key];
  if (typeof overrideSwap < "u") override = overrideSwap, strategy = "swap";
  else {
    const overrideShift = opts.overrideShift?.[key];
    if (typeof overrideShift < "u") override = overrideShift, strategy = "shift";
    else {
      const overrideDefault = opts.override?.[key];
      typeof overrideDefault < "u" && (override = overrideDefault, strategy = opts.overrideStrategy);
    }
  }
  return typeof override > "u" || typeof override == "string" ? value : strategy === "swap" ? override : value;
}
const createInverseMask = () => ({
  name: "inverse-mask",
  mask: (template, opts) => {
    const inversed = objectFromEntries$1(objectEntries(template).map(([k, v]) => [
      k,
      -v
    ]));
    return skipMask.mask(inversed, opts);
  }
}), createShiftMask = ({ inverse } = {}, defaultOptions) => ({
  name: "shift-mask",
  mask: (template, opts) => {
    const { override, overrideStrategy = "shift", max: maxIn, palette, min = 0, strength = 1 } = {
      ...defaultOptions,
      ...opts
    }, values = Object.entries(template), max = maxIn ?? (palette ? Object.values(palette).length - 1 : Number.POSITIVE_INFINITY), out = {};
    for (const [key, value] of values) {
      if (typeof value == "string") continue;
      if (typeof override?.[key] == "number") {
        const overrideVal = override[key];
        out[key] = overrideStrategy === "shift" ? value + overrideVal : overrideVal;
        continue;
      }
      if (typeof override?.[key] == "string") {
        out[key] = override[key];
        continue;
      }
      const isPositive = value === 0 ? !isMinusZero(value) : value >= 0, direction = isPositive ? 1 : -1, invert = inverse ? -1 : 1, next = value + strength * direction * invert, clamped = isPositive ? Math.max(min, Math.min(max, next)) : Math.min(-min, Math.max(-max, next));
      out[key] = clamped;
    }
    return skipMask.mask(out, opts);
  }
}), createWeakenMask = (defaultOptions) => ({
  name: "soften-mask",
  mask: createShiftMask({}, defaultOptions).mask
}), createSoftenMask = createWeakenMask, createStrengthenMask = (defaultOptions) => ({
  name: "strengthen-mask",
  mask: createShiftMask({
    inverse: true
  }, defaultOptions).mask
});
function applyMaskStateless(info, mask, options = {}, parentName) {
  const skip = {
    ...options.skip
  };
  if (info.options?.nonInheritedValues) for (const key in info.options.nonInheritedValues) skip[key] = 1;
  const maskOptions = {
    parentName,
    palette: info.palette,
    ...options,
    skip
  }, template = mask.mask(info.definition, maskOptions), theme = createTheme(info.palette, template);
  return {
    ...info,
    cache: /* @__PURE__ */ new Map(),
    definition: template,
    theme
  };
}
const combineMasks = (...masks) => ({
  name: "combine-mask",
  mask: (template, opts) => {
    let current = getThemeInfo(template, opts.parentName), theme;
    for (const mask2 of masks) {
      if (!current) throw new Error(`Nothing returned from mask: ${current}, for template: ${template} and mask: ${mask2.toString()}, given opts ${JSON.stringify(opts, null, 2)}`);
      const next = applyMaskStateless(current, mask2, opts);
      current = next, theme = next.theme;
    }
    return theme;
  }
});
function guard(low, high, value) {
  return Math.min(Math.max(low, value), high);
}
class ColorError extends Error {
  constructor(color) {
    super(`Failed to parse color: "${color}"`);
  }
}
var ColorError$1 = ColorError;
function parseToRgba(color) {
  if (typeof color !== "string") throw new ColorError$1(color);
  if (color.trim().toLowerCase() === "transparent") return [
    0,
    0,
    0,
    0
  ];
  let normalizedColor = color.trim();
  normalizedColor = namedColorRegex.test(color) ? nameToHex(color) : color;
  const reducedHexMatch = reducedHexRegex.exec(normalizedColor);
  if (reducedHexMatch) {
    const arr = Array.from(reducedHexMatch).slice(1);
    return [
      ...arr.slice(0, 3).map((x) => parseInt(r(x, 2), 16)),
      parseInt(r(arr[3] || "f", 2), 16) / 255
    ];
  }
  const hexMatch = hexRegex.exec(normalizedColor);
  if (hexMatch) {
    const arr = Array.from(hexMatch).slice(1);
    return [
      ...arr.slice(0, 3).map((x) => parseInt(x, 16)),
      parseInt(arr[3] || "ff", 16) / 255
    ];
  }
  const rgbaMatch = rgbaRegex.exec(normalizedColor);
  if (rgbaMatch) {
    const arr = Array.from(rgbaMatch).slice(1);
    return [
      ...arr.slice(0, 3).map((x) => parseInt(x, 10)),
      parseFloat(arr[3] || "1")
    ];
  }
  const hslaMatch = hslaRegex.exec(normalizedColor);
  if (hslaMatch) {
    const [h, s, l, a] = Array.from(hslaMatch).slice(1).map(parseFloat);
    if (guard(0, 100, s) !== s) throw new ColorError$1(color);
    if (guard(0, 100, l) !== l) throw new ColorError$1(color);
    return [
      ...hslToRgb(h, s, l),
      Number.isNaN(a) ? 1 : a
    ];
  }
  throw new ColorError$1(color);
}
function hash(str) {
  let hash2 = 5381;
  let i = str.length;
  while (i) {
    hash2 = hash2 * 33 ^ str.charCodeAt(--i);
  }
  return (hash2 >>> 0) % 2341;
}
const colorToInt = (x) => parseInt(x.replace(/_/g, ""), 36);
const compressedColorMap = "1q29ehhb 1n09sgk7 1kl1ekf_ _yl4zsno 16z9eiv3 1p29lhp8 _bd9zg04 17u0____ _iw9zhe5 _to73___ _r45e31e _7l6g016 _jh8ouiv _zn3qba8 1jy4zshs 11u87k0u 1ro9yvyo 1aj3xael 1gz9zjz0 _3w8l4xo 1bf1ekf_ _ke3v___ _4rrkb__ 13j776yz _646mbhl _nrjr4__ _le6mbhl 1n37ehkb _m75f91n _qj3bzfz 1939yygw 11i5z6x8 _1k5f8xs 1509441m 15t5lwgf _ae2th1n _tg1ugcv 1lp1ugcv 16e14up_ _h55rw7n _ny9yavn _7a11xb_ 1ih442g9 _pv442g9 1mv16xof 14e6y7tu 1oo9zkds 17d1cisi _4v9y70f _y98m8kc 1019pq0v 12o9zda8 _348j4f4 1et50i2o _8epa8__ _ts6senj 1o350i2o 1mi9eiuo 1259yrp0 1ln80gnw _632xcoy 1cn9zldc _f29edu4 1n490c8q _9f9ziet 1b94vk74 _m49zkct 1kz6s73a 1eu9dtog _q58s1rz 1dy9sjiq __u89jo3 _aj5nkwg _ld89jo3 13h9z6wx _qa9z2ii _l119xgq _bs5arju 1hj4nwk9 1qt4nwk9 1ge6wau6 14j9zlcw 11p1edc_ _ms1zcxe _439shk6 _jt9y70f _754zsow 1la40eju _oq5p___ _x279qkz 1fa5r3rv _yd2d9ip _424tcku _8y1di2_ _zi2uabw _yy7rn9h 12yz980_ __39ljp6 1b59zg0x _n39zfzp 1fy9zest _b33k___ _hp9wq92 1il50hz4 _io472ub _lj9z3eo 19z9ykg0 _8t8iu3a 12b9bl4a 1ak5yw0o _896v4ku _tb8k8lv _s59zi6t _c09ze0p 1lg80oqn 1id9z8wb _238nba5 1kq6wgdi _154zssg _tn3zk49 _da9y6tc 1sg7cv4f _r12jvtt 1gq5fmkz 1cs9rvci _lp9jn1c _xw1tdnb 13f9zje6 16f6973h _vo7ir40 _bt5arjf _rc45e4t _hr4e100 10v4e100 _hc9zke2 _w91egv_ _sj2r1kk 13c87yx8 _vqpds__ _ni8ggk8 _tj9yqfb 1ia2j4r4 _7x9b10u 1fc9ld4j 1eq9zldr _5j9lhpx _ez9zl6o _md61fzm".split(" ").reduce((acc, next) => {
  const key = colorToInt(next.substring(0, 3));
  const hex = colorToInt(next.substring(3)).toString(16);
  let prefix = "";
  for (let i = 0; i < 6 - hex.length; i++) {
    prefix += "0";
  }
  acc[key] = `${prefix}${hex}`;
  return acc;
}, {});
function nameToHex(color) {
  const normalizedColorName = color.toLowerCase().trim();
  const result = compressedColorMap[hash(normalizedColorName)];
  if (!result) throw new ColorError$1(color);
  return `#${result}`;
}
const r = (str, amount) => Array.from(Array(amount)).map(() => str).join("");
const reducedHexRegex = new RegExp(`^#${r("([a-f0-9])", 3)}([a-f0-9])?$`, "i");
const hexRegex = new RegExp(`^#${r("([a-f0-9]{2})", 3)}([a-f0-9]{2})?$`, "i");
const rgbaRegex = new RegExp(`^rgba?\\(\\s*(\\d+)\\s*${r(",\\s*(\\d+)\\s*", 2)}(?:,\\s*([\\d.]+))?\\s*\\)$`, "i");
const hslaRegex = /^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%(?:\s*,\s*([\d.]+))?\s*\)$/i;
const namedColorRegex = /^[a-z]+$/i;
const roundColor = (color) => {
  return Math.round(color * 255);
};
const hslToRgb = (hue, saturation, lightness) => {
  let l = lightness / 100;
  if (saturation === 0) {
    return [
      l,
      l,
      l
    ].map(roundColor);
  }
  const huePrime = (hue % 360 + 360) % 360 / 60;
  const chroma = (1 - Math.abs(2 * l - 1)) * (saturation / 100);
  const secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));
  let red = 0;
  let green = 0;
  let blue = 0;
  if (huePrime >= 0 && huePrime < 1) {
    red = chroma;
    green = secondComponent;
  } else if (huePrime >= 1 && huePrime < 2) {
    red = secondComponent;
    green = chroma;
  } else if (huePrime >= 2 && huePrime < 3) {
    green = chroma;
    blue = secondComponent;
  } else if (huePrime >= 3 && huePrime < 4) {
    green = secondComponent;
    blue = chroma;
  } else if (huePrime >= 4 && huePrime < 5) {
    red = secondComponent;
    blue = chroma;
  } else if (huePrime >= 5 && huePrime < 6) {
    red = chroma;
    blue = secondComponent;
  }
  const lightnessModification = l - chroma / 2;
  const finalRed = red + lightnessModification;
  const finalGreen = green + lightnessModification;
  const finalBlue = blue + lightnessModification;
  return [
    finalRed,
    finalGreen,
    finalBlue
  ].map(roundColor);
};
function parseToHsla(color) {
  const [red, green, blue, alpha] = parseToRgba(color).map((value, index) => (
    // 3rd index is alpha channel which is already normalized
    index === 3 ? value : value / 255
  ));
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;
  if (max === min) return [
    0,
    0,
    lightness,
    alpha
  ];
  const delta = max - min;
  const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  const hue = 60 * (red === max ? (green - blue) / delta + (green < blue ? 6 : 0) : green === max ? (blue - red) / delta + 2 : (red - green) / delta + 4);
  return [
    hue,
    saturation,
    lightness,
    alpha
  ];
}
function hsla(hue, saturation, lightness, alpha) {
  return `hsla(${(hue % 360).toFixed()}, ${guard(0, 100, saturation * 100).toFixed()}%, ${guard(0, 100, lightness * 100).toFixed()}%, ${parseFloat(guard(0, 1, alpha).toFixed(3))})`;
}
const objectKeys = (obj) => Object.keys(obj);
function objectFromEntries(arr) {
  return Object.fromEntries(arr);
}
const getTemplates$2 = () => {
  const lightTemplates = getBaseTemplates$2("light"), darkTemplates = getBaseTemplates$2("dark");
  return {
    ...objectFromEntries(objectKeys(lightTemplates).map((name) => [
      `light_${name}`,
      lightTemplates[name]
    ])),
    ...objectFromEntries(objectKeys(darkTemplates).map((name) => [
      `dark_${name}`,
      darkTemplates[name]
    ]))
  };
}, getBaseTemplates$2 = (scheme) => {
  const isLight = scheme === "light", bgIndex = 6, lighten = isLight ? -1 : 1, darken = -lighten, borderColor = bgIndex + 3, baseColors = {
    color: -bgIndex,
    colorHover: -bgIndex - 1,
    colorPress: -bgIndex,
    colorFocus: -bgIndex - 1,
    placeholderColor: -bgIndex - 3,
    outlineColor: -2
  }, base = {
    accentBackground: 0,
    accentColor: -0,
    background0: 1,
    background02: 2,
    background04: 3,
    background06: 4,
    background08: 5,
    color1: bgIndex,
    color2: bgIndex + 1,
    color3: bgIndex + 2,
    color4: bgIndex + 3,
    color5: bgIndex + 4,
    color6: bgIndex + 5,
    color7: bgIndex + 6,
    color8: bgIndex + 7,
    color9: bgIndex + 8,
    color10: bgIndex + 9,
    color11: bgIndex + 10,
    color12: bgIndex + 11,
    color0: -1,
    color02: -2,
    color04: -3,
    color06: -4,
    color08: -5,
    // the background, color, etc keys here work like generics - they make it so you
    // can publish components for others to use without mandating a specific color scale
    // the @tamagui/button Button component looks for `$background`, so you set the
    // dark_red_Button theme to have a stronger background than the dark_red theme.
    background: bgIndex,
    backgroundHover: bgIndex + lighten,
    // always lighten on hover no matter the scheme
    backgroundPress: bgIndex + darken,
    // always darken on press no matter the theme
    backgroundFocus: bgIndex + darken,
    borderColor,
    borderColorHover: borderColor + lighten,
    borderColorPress: borderColor + darken,
    borderColorFocus: borderColor,
    ...baseColors,
    colorTransparent: -1
  }, surface1 = {
    ...baseColors,
    background: base.background + 1,
    backgroundHover: base.backgroundHover + 1,
    backgroundPress: base.backgroundPress + 1,
    backgroundFocus: base.backgroundFocus + 1,
    borderColor: base.borderColor + 1,
    borderColorHover: base.borderColorHover + 1,
    borderColorFocus: base.borderColorFocus + 1,
    borderColorPress: base.borderColorPress + 1
  }, surface2 = {
    ...baseColors,
    background: base.background + 2,
    backgroundHover: base.backgroundHover + 2,
    backgroundPress: base.backgroundPress + 2,
    backgroundFocus: base.backgroundFocus + 2,
    borderColor: base.borderColor + 2,
    borderColorHover: base.borderColorHover + 2,
    borderColorFocus: base.borderColorFocus + 2,
    borderColorPress: base.borderColorPress + 2
  }, surface3 = {
    ...baseColors,
    background: base.background + 3,
    backgroundHover: base.backgroundHover + 3,
    backgroundPress: base.backgroundPress + 3,
    backgroundFocus: base.backgroundFocus + 3,
    borderColor: base.borderColor + 3,
    borderColorHover: base.borderColorHover + 3,
    borderColorFocus: base.borderColorFocus + 3,
    borderColorPress: base.borderColorPress + 3
  }, alt1 = {
    color: base.color - 1,
    colorHover: base.colorHover - 1,
    colorPress: base.colorPress - 1,
    colorFocus: base.colorFocus - 1
  }, alt2 = {
    color: base.color - 2,
    colorHover: base.colorHover - 2,
    colorPress: base.colorPress - 2,
    colorFocus: base.colorFocus - 2
  }, inverse = Object.fromEntries(Object.entries(base).map(([key, index]) => [
    key,
    -index
  ]));
  return {
    base,
    surface1,
    surface2,
    surface3,
    alt1,
    alt2,
    inverse
  };
};
getTemplates$2();
const paletteSize = 12, generateColorPalette = ({ palette: buildPalette, scheme }) => {
  if (!buildPalette) return [];
  const { anchors } = buildPalette;
  let palette = [];
  const add = (h, s, l) => {
    palette.push(hsla(h, s, l, 1));
  }, numAnchors = Object.keys(anchors).length;
  for (const [anchorIndex, anchor] of anchors.entries()) {
    const [h, s, l] = [
      anchor.hue[scheme],
      anchor.sat[scheme],
      anchor.lum[scheme]
    ];
    if (anchorIndex !== 0) {
      const lastAnchor = anchors[anchorIndex - 1], steps = anchor.index - lastAnchor.index, lastHue = lastAnchor.hue[scheme], lastSat = lastAnchor.sat[scheme], lastLum = lastAnchor.lum[scheme], stepHue = (lastHue - h) / steps, stepSat = (lastSat - s) / steps, stepLum = (lastLum - l) / steps;
      for (let step = lastAnchor.index + 1; step < anchor.index; step++) {
        const str = anchor.index - step;
        add(h + stepHue * str, s + stepSat * str, l + stepLum * str);
      }
    }
    if (add(h, s, l), anchorIndex === numAnchors - 1 && palette.length < paletteSize) for (let step = anchor.index + 1; step < paletteSize; step++) add(h, s, l);
  }
  const background = palette[0], foreground = palette[palette.length - 1], transparentValues = [
    background,
    foreground
  ].map((color) => {
    const [h, s, l] = parseToHsla(color);
    return [
      hsla(h, s, l, 0),
      hsla(h, s, l, 0.2),
      hsla(h, s, l, 0.4),
      hsla(h, s, l, 0.6),
      hsla(h, s, l, 0.8)
    ];
  }), reverseForeground = [
    ...transparentValues[1]
  ].reverse();
  return palette = [
    ...transparentValues[0],
    ...palette,
    ...reverseForeground
  ], palette;
};
function getThemeSuitePalettes(palette) {
  return {
    light: generateColorPalette({
      palette,
      scheme: "light"
    }),
    dark: generateColorPalette({
      palette,
      scheme: "dark"
    })
  };
}
createPalettes(getThemesPalettes({
  base: {
    palette: [
      "#fff",
      "#000"
    ]
  },
  accent: {
    palette: [
      "#ff0000",
      "#ff9999"
    ]
  }
}));
function getSchemePalette(colors2) {
  return {
    light: colors2,
    dark: [
      ...colors2
    ].reverse()
  };
}
function getAnchors(palette) {
  const numItems = palette.light.length;
  return palette.light.map((lcolor, index) => {
    const dcolor = palette.dark[index], [lhue, lsat, llum] = parseToHsla(lcolor), [dhue, dsat, dlum] = parseToHsla(dcolor);
    return {
      index: spreadIndex(11, numItems, index),
      hue: {
        light: lhue,
        dark: dhue
      },
      sat: {
        light: lsat,
        dark: dsat
      },
      lum: {
        light: llum,
        dark: dlum
      }
    };
  });
}
function spreadIndex(maxIndex, numItems, index) {
  return Math.round(index / (numItems - 1) * maxIndex);
}
function coerceSimplePaletteToSchemePalette(def) {
  return Array.isArray(def) ? getSchemePalette(def) : def;
}
function getThemesPalettes(props) {
  const base = coerceSimplePaletteToSchemePalette(props.base.palette), accent = props.accent ? coerceSimplePaletteToSchemePalette(props.accent.palette) : null, baseAnchors = getAnchors(base);
  function getSubThemesPalettes(defs) {
    return Object.fromEntries(Object.entries(defs).map(([key, value]) => [
      key,
      {
        name: key,
        anchors: value.palette ? getAnchors(coerceSimplePaletteToSchemePalette(value.palette)) : baseAnchors
      }
    ]));
  }
  return {
    base: {
      name: "base",
      anchors: baseAnchors
    },
    ...accent && {
      accent: {
        name: "accent",
        anchors: getAnchors(accent)
      }
    },
    ...props.childrenThemes && getSubThemesPalettes(props.childrenThemes),
    ...props.grandChildrenThemes && getSubThemesPalettes(props.grandChildrenThemes)
  };
}
function createPalettes(palettes) {
  const accentPalettes = palettes.accent ? getThemeSuitePalettes(palettes.accent) : null, basePalettes = getThemeSuitePalettes(palettes.base);
  return Object.fromEntries(Object.entries(palettes).flatMap(([name, palette]) => {
    const palettes2 = getThemeSuitePalettes(palette), oppositePalettes = name.startsWith("accent") ? basePalettes : accentPalettes || basePalettes;
    if (!oppositePalettes) return [];
    const oppositeLight = oppositePalettes.light, oppositeDark = oppositePalettes.dark, bgOffset = 7;
    return [
      [
        name === "base" ? "light" : `light_${name}`,
        [
          oppositeLight[bgOffset],
          ...palettes2.light,
          oppositeLight[oppositeLight.length - bgOffset - 1]
        ]
      ],
      [
        name === "base" ? "dark" : `dark_${name}`,
        [
          oppositeDark[oppositeDark.length - bgOffset - 1],
          ...palettes2.dark,
          oppositeDark[bgOffset]
        ]
      ]
    ];
  }));
}
const getTemplates$1 = () => {
  const lightTemplates = getBaseTemplates$1("light"), darkTemplates = getBaseTemplates$1("dark");
  return {
    ...objectFromEntries(objectKeys(lightTemplates).map((name) => [
      `light_${name}`,
      lightTemplates[name]
    ])),
    ...objectFromEntries(objectKeys(darkTemplates).map((name) => [
      `dark_${name}`,
      darkTemplates[name]
    ]))
  };
}, getBaseTemplates$1 = (scheme) => {
  const isLight = scheme === "light", bgIndex = 6, lighten = isLight ? -1 : 1, darken = -lighten, borderColor = bgIndex + 3, baseColors = {
    color: -bgIndex,
    colorHover: -bgIndex - 1,
    colorPress: -bgIndex,
    colorFocus: -bgIndex - 1,
    placeholderColor: -bgIndex - 3,
    outlineColor: -2
  }, base = {
    accentBackground: 0,
    accentColor: -0,
    background0: 1,
    background02: 2,
    background04: 3,
    background06: 4,
    background08: 5,
    color1: bgIndex,
    color2: bgIndex + 1,
    color3: bgIndex + 2,
    color4: bgIndex + 3,
    color5: bgIndex + 4,
    color6: bgIndex + 5,
    color7: bgIndex + 6,
    color8: bgIndex + 7,
    color9: bgIndex + 8,
    color10: bgIndex + 9,
    color11: bgIndex + 10,
    color12: bgIndex + 11,
    color0: -1,
    color02: -2,
    color04: -3,
    color06: -4,
    color08: -5,
    // the background, color, etc keys here work like generics - they make it so you
    // can publish components for others to use without mandating a specific color scale
    // the @tamagui/button Button component looks for `$background`, so you set the
    // dark_red_Button theme to have a stronger background than the dark_red theme.
    background: bgIndex,
    backgroundHover: bgIndex + lighten,
    // always lighten on hover no matter the scheme
    backgroundPress: bgIndex + darken,
    // always darken on press no matter the theme
    backgroundFocus: bgIndex + darken,
    borderColor,
    borderColorHover: borderColor + lighten,
    borderColorPress: borderColor + darken,
    borderColorFocus: borderColor,
    ...baseColors,
    colorTransparent: -1
  }, surface1 = {
    ...baseColors,
    background: base.background + 2,
    backgroundHover: base.backgroundHover + 2,
    backgroundPress: base.backgroundPress + 2,
    backgroundFocus: base.backgroundFocus + 2,
    borderColor: base.borderColor + 2,
    borderColorHover: base.borderColorHover + 2,
    borderColorFocus: base.borderColorFocus + 2,
    borderColorPress: base.borderColorPress + 2
  }, surface2 = {
    ...baseColors,
    background: base.background + 3,
    backgroundHover: base.backgroundHover + 3,
    backgroundPress: base.backgroundPress + 3,
    backgroundFocus: base.backgroundFocus + 3,
    borderColor: base.borderColor + 3,
    borderColorHover: base.borderColorHover + 3,
    borderColorFocus: base.borderColorFocus + 3,
    borderColorPress: base.borderColorPress + 3
  }, surface3 = {
    ...baseColors,
    background: base.background + 4,
    backgroundHover: base.backgroundHover + 4,
    backgroundPress: base.backgroundPress + 4,
    backgroundFocus: base.backgroundFocus + 4,
    borderColor: base.borderColor + 4,
    borderColorHover: base.borderColorHover + 4,
    borderColorFocus: base.borderColorFocus + 4,
    borderColorPress: base.borderColorPress + 4
  }, alt1 = {
    color: base.color - 1,
    colorHover: base.colorHover - 1,
    colorPress: base.colorPress - 1,
    colorFocus: base.colorFocus - 1
  }, alt2 = {
    color: base.color - 2,
    colorHover: base.colorHover - 2,
    colorPress: base.colorPress - 2,
    colorFocus: base.colorFocus - 2
  }, inverse = Object.fromEntries(Object.entries(base).map(([key, index]) => [
    key,
    -index
  ]));
  return {
    base,
    surface1,
    surface2,
    surface3,
    alt1,
    alt2,
    inverse
  };
};
getTemplates$1();
const getTemplates = () => {
  const lightTemplates = getBaseTemplates("light"), darkTemplates = getBaseTemplates("dark");
  return {
    ...objectFromEntries(objectKeys(lightTemplates).map((name) => [
      `light_${name}`,
      lightTemplates[name]
    ])),
    ...objectFromEntries(objectKeys(darkTemplates).map((name) => [
      `dark_${name}`,
      darkTemplates[name]
    ]))
  };
}, getBaseTemplates = (scheme) => {
  const isLight = scheme === "light", bgIndex = 6, lighten = isLight ? -1 : 1, darken = -lighten, borderColor = bgIndex + 3, baseColors = {
    color: -bgIndex,
    colorHover: -bgIndex - 1,
    colorPress: -bgIndex,
    colorFocus: -bgIndex - 1,
    placeholderColor: -bgIndex - 3,
    outlineColor: -2
  }, base = {
    accentBackground: 0,
    accentColor: -0,
    background0: 1,
    background02: 2,
    background04: 3,
    background06: 4,
    background08: 5,
    color1: bgIndex,
    color2: bgIndex + 1,
    color3: bgIndex + 2,
    color4: bgIndex + 3,
    color5: bgIndex + 4,
    color6: bgIndex + 5,
    color7: bgIndex + 6,
    color8: bgIndex + 7,
    color9: bgIndex + 8,
    color10: bgIndex + 9,
    color11: bgIndex + 10,
    color12: bgIndex + 11,
    color0: -1,
    color02: -2,
    color04: -3,
    color06: -4,
    color08: -5,
    // the background, color, etc keys here work like generics - they make it so you
    // can publish components for others to use without mandating a specific color scale
    // the @tamagui/button Button component looks for `$background`, so you set the
    // dark_red_Button theme to have a stronger background than the dark_red theme.
    background: bgIndex,
    backgroundHover: bgIndex + lighten,
    // always lighten on hover no matter the scheme
    backgroundPress: bgIndex + darken,
    // always darken on press no matter the theme
    backgroundFocus: bgIndex + darken,
    borderColor,
    borderColorHover: borderColor + lighten,
    borderColorPress: borderColor + darken,
    borderColorFocus: borderColor,
    ...baseColors,
    colorTransparent: -1
  }, surface1 = {
    ...baseColors,
    background: base.background + 3,
    backgroundHover: base.backgroundHover + 3,
    backgroundPress: base.backgroundPress + 3,
    backgroundFocus: base.backgroundFocus + 3,
    borderColor: base.borderColor + 3,
    borderColorHover: base.borderColorHover + 3,
    borderColorFocus: base.borderColorFocus + 3,
    borderColorPress: base.borderColorPress + 3
  }, surface2 = {
    ...baseColors,
    background: base.background + 4,
    backgroundHover: base.backgroundHover + 4,
    backgroundPress: base.backgroundPress + 4,
    backgroundFocus: base.backgroundFocus + 4,
    borderColor: base.borderColor + 4,
    borderColorHover: base.borderColorHover + 4,
    borderColorFocus: base.borderColorFocus + 4,
    borderColorPress: base.borderColorPress + 4
  }, surface3 = {
    ...baseColors,
    background: base.background + 5,
    backgroundHover: base.backgroundHover + 5,
    backgroundPress: base.backgroundPress + 5,
    backgroundFocus: base.backgroundFocus + 5,
    borderColor: base.borderColor + 5,
    borderColorHover: base.borderColorHover + 5,
    borderColorFocus: base.borderColorFocus + 5,
    borderColorPress: base.borderColorPress + 5
  }, alt1 = {
    color: base.color - 1,
    colorHover: base.colorHover - 1,
    colorPress: base.colorPress - 1,
    colorFocus: base.colorFocus - 1
  }, alt2 = {
    color: base.color - 2,
    colorHover: base.colorHover - 2,
    colorPress: base.colorPress - 2,
    colorFocus: base.colorFocus - 2
  }, inverse = Object.fromEntries(Object.entries(base).map(([key, index]) => [
    key,
    -index
  ]));
  return {
    base,
    surface1,
    surface2,
    surface3,
    alt1,
    alt2,
    inverse
  };
};
getTemplates();
({
  inverseSoften: combineMasks(createInverseMask(), createSoftenMask({
    strength: 2
  })),
  inverseSoften2: combineMasks(createInverseMask(), createSoftenMask({
    strength: 3
  })),
  inverseSoften3: combineMasks(createInverseMask(), createSoftenMask({
    strength: 4
  })),
  inverseStrengthen2: combineMasks(createInverseMask(), createStrengthenMask({
    strength: 2
  })),
  strengthenButSoftenBorder: createMask((template, options) => {
    const stronger = createStrengthenMask().mask(template, options), softer = createSoftenMask().mask(template, options);
    return {
      ...stronger,
      borderColor: softer.borderColor,
      borderColorHover: softer.borderColorHover,
      borderColorPress: softer.borderColorPress,
      borderColorFocus: softer.borderColorFocus
    };
  }),
  soften2Border1: createMask((template, options) => {
    const softer2 = createSoftenMask({
      strength: 2
    }).mask(template, options), softer1 = createSoftenMask({
      strength: 1
    }).mask(template, options);
    return {
      ...softer2,
      borderColor: softer1.borderColor,
      borderColorHover: softer1.borderColorHover,
      borderColorPress: softer1.borderColorPress,
      borderColorFocus: softer1.borderColorFocus
    };
  }),
  soften3FlatBorder: createMask((template, options) => {
    const borderMask = createSoftenMask({
      strength: 2
    }).mask(template, options);
    return {
      ...createSoftenMask({
        strength: 3
      }).mask(template, options),
      borderColor: borderMask.borderColor,
      borderColorHover: borderMask.borderColorHover,
      borderColorPress: borderMask.borderColorPress,
      borderColorFocus: borderMask.borderColorFocus
    };
  }),
  softenBorder: createMask((template, options) => {
    const plain = skipMask.mask(template, options), softer = createSoftenMask().mask(template, options);
    return {
      ...plain,
      borderColor: softer.borderColor,
      borderColorHover: softer.borderColorHover,
      borderColorPress: softer.borderColorPress,
      borderColorFocus: softer.borderColorFocus
    };
  }),
  softenBorder2: createMask((template, options) => {
    const plain = skipMask.mask(template, options), softer = createSoftenMask({
      strength: 2
    }).mask(template, options);
    return {
      ...plain,
      borderColor: softer.borderColor,
      borderColorHover: softer.borderColorHover,
      borderColorPress: softer.borderColorPress,
      borderColorFocus: softer.borderColorFocus
    };
  })
});
function t(a) {
  let res = {};
  for (const [ki, vi] of a) res[ks[ki]] = colors[vi];
  return res;
}
const colors = [
  "hsla(0, 0%, 10%, 1)",
  "hsla(0, 0%, 38%, 1)",
  "hsla(0, 0%, 100%, 0)",
  "hsla(0, 0%, 100%, 0.2)",
  "hsla(0, 0%, 100%, 0.4)",
  "hsla(0, 0%, 100%, 0.6)",
  "hsla(0, 0%, 100%, 0.8)",
  "hsla(0, 0%, 100%, 1)",
  "hsla(0, 0%, 95%, 1)",
  "hsla(0, 0%, 93%, 1)",
  "hsla(0, 0%, 91%, 1)",
  "hsla(0, 0%, 88%, 1)",
  "hsla(0, 0%, 85%, 1)",
  "hsla(0, 0%, 82%, 1)",
  "hsla(0, 0%, 76%, 1)",
  "hsla(0, 0%, 56%, 1)",
  "hsla(0, 0%, 50%, 1)",
  "hsla(0, 0%, 42%, 1)",
  "hsla(0, 0%, 9%, 1)",
  "hsla(0, 0%, 9%, 0)",
  "hsla(0, 0%, 9%, 0.2)",
  "hsla(0, 0%, 9%, 0.4)",
  "hsla(0, 0%, 9%, 0.6)",
  "hsla(0, 0%, 9%, 0.8)",
  "hsl(206, 100%, 99.2%)",
  "hsl(210, 100%, 98.0%)",
  "hsl(209, 100%, 96.5%)",
  "hsl(210, 98.8%, 94.0%)",
  "hsl(209, 95.0%, 90.1%)",
  "hsl(209, 81.2%, 84.5%)",
  "hsl(208, 77.5%, 76.9%)",
  "hsl(206, 81.9%, 65.3%)",
  "hsl(206, 100%, 50.0%)",
  "hsl(208, 100%, 47.3%)",
  "hsl(211, 100%, 43.2%)",
  "hsl(211, 100%, 15.0%)",
  "hsl(136, 50.0%, 98.9%)",
  "hsl(138, 62.5%, 96.9%)",
  "hsl(139, 55.2%, 94.5%)",
  "hsl(140, 48.7%, 91.0%)",
  "hsl(141, 43.7%, 86.0%)",
  "hsl(143, 40.3%, 79.0%)",
  "hsl(146, 38.5%, 69.0%)",
  "hsl(151, 40.2%, 54.1%)",
  "hsl(151, 55.0%, 41.5%)",
  "hsl(152, 57.5%, 37.6%)",
  "hsl(153, 67.0%, 28.5%)",
  "hsl(155, 40.0%, 14.0%)",
  "hsl(359, 100%, 99.4%)",
  "hsl(359, 100%, 98.6%)",
  "hsl(360, 100%, 96.8%)",
  "hsl(360, 97.9%, 94.8%)",
  "hsl(360, 90.2%, 91.9%)",
  "hsl(360, 81.7%, 87.8%)",
  "hsl(359, 74.2%, 81.7%)",
  "hsl(359, 69.5%, 74.3%)",
  "hsl(358, 75.0%, 59.0%)",
  "hsl(358, 69.4%, 55.2%)",
  "hsl(358, 65.0%, 48.7%)",
  "hsl(354, 50.0%, 14.6%)",
  "hsl(60, 54.0%, 98.5%)",
  "hsl(52, 100%, 95.5%)",
  "hsl(55, 100%, 90.9%)",
  "hsl(54, 100%, 86.6%)",
  "hsl(52, 97.9%, 82.0%)",
  "hsl(50, 89.4%, 76.1%)",
  "hsl(47, 80.4%, 68.0%)",
  "hsl(48, 100%, 46.1%)",
  "hsl(53, 92.0%, 50.0%)",
  "hsl(50, 100%, 48.5%)",
  "hsl(42, 100%, 29.0%)",
  "hsl(40, 55.0%, 13.5%)",
  "rgba(0,0,0,0.04)",
  "rgba(0,0,0,0.08)",
  "rgba(0,0,0,0.16)",
  "rgba(0,0,0,0.24)",
  "rgba(0,0,0,0.32)",
  "rgba(0,0,0,0.4)",
  "#050505",
  "#151515",
  "#191919",
  "#232323",
  "#282828",
  "#323232",
  "#424242",
  "#494949",
  "#545454",
  "#626262",
  "#a5a5a5",
  "#fff",
  "#f2f2f2",
  "hsl(0, 0%, 93%)",
  "hsl(0, 0%, 91%)",
  "hsl(0, 0%, 88%)",
  "hsl(0, 0%, 85%)",
  "hsl(0, 0%, 82%)",
  "hsl(0, 0%, 76%)",
  "hsl(0, 0%, 56%)",
  "hsl(0, 0%, 50%)",
  "hsl(0, 0%, 42%)",
  "hsl(0, 0%, 9%)",
  "hsla(0, 0%, 2%, 1)",
  "hsla(0, 0%, 8%, 1)",
  "hsla(0, 0%, 14%, 1)",
  "hsla(0, 0%, 16%, 1)",
  "hsla(0, 0%, 20%, 1)",
  "hsla(0, 0%, 26%, 1)",
  "hsla(0, 0%, 29%, 1)",
  "hsla(0, 0%, 33%, 1)",
  "hsla(0, 0%, 65%, 1)",
  "hsla(0, 0%, 2%, 0)",
  "hsla(0, 0%, 2%, 0.2)",
  "hsla(0, 0%, 2%, 0.4)",
  "hsla(0, 0%, 2%, 0.6)",
  "hsla(0, 0%, 2%, 0.8)",
  "hsl(212, 35.0%, 9.2%)",
  "hsl(216, 50.0%, 11.8%)",
  "hsl(214, 59.4%, 15.3%)",
  "hsl(214, 65.8%, 17.9%)",
  "hsl(213, 71.2%, 20.2%)",
  "hsl(212, 77.4%, 23.1%)",
  "hsl(211, 85.1%, 27.4%)",
  "hsl(211, 89.7%, 34.1%)",
  "hsl(209, 100%, 60.6%)",
  "hsl(210, 100%, 66.1%)",
  "hsl(206, 98.0%, 95.8%)",
  "hsl(146, 30.0%, 7.4%)",
  "hsl(155, 44.2%, 8.4%)",
  "hsl(155, 46.7%, 10.9%)",
  "hsl(154, 48.4%, 12.9%)",
  "hsl(154, 49.7%, 14.9%)",
  "hsl(154, 50.9%, 17.6%)",
  "hsl(153, 51.8%, 21.8%)",
  "hsl(151, 51.7%, 28.4%)",
  "hsl(151, 49.3%, 46.5%)",
  "hsl(151, 50.0%, 53.2%)",
  "hsl(137, 72.0%, 94.0%)",
  "hsl(353, 23.0%, 9.8%)",
  "hsl(357, 34.4%, 12.0%)",
  "hsl(356, 43.4%, 16.4%)",
  "hsl(356, 47.6%, 19.2%)",
  "hsl(356, 51.1%, 21.9%)",
  "hsl(356, 55.2%, 25.9%)",
  "hsl(357, 60.2%, 31.8%)",
  "hsl(358, 65.0%, 40.4%)",
  "hsl(358, 85.3%, 64.0%)",
  "hsl(358, 100%, 69.5%)",
  "hsl(351, 89.0%, 96.0%)",
  "hsl(45, 100%, 5.5%)",
  "hsl(46, 100%, 6.7%)",
  "hsl(45, 100%, 8.7%)",
  "hsl(45, 100%, 10.4%)",
  "hsl(47, 100%, 12.1%)",
  "hsl(49, 100%, 14.3%)",
  "hsl(49, 90.3%, 18.4%)",
  "hsl(50, 100%, 22.0%)",
  "hsl(54, 100%, 68.0%)",
  "hsl(48, 100%, 47.0%)",
  "hsl(53, 100%, 91.0%)",
  "rgba(0,0,0,0.2)",
  "rgba(0,0,0,0.3)",
  "rgba(0,0,0,0.5)",
  "rgba(0,0,0,0.6)",
  "rgba(0,0,0,0.7)",
  "hsla(216, 100%, 99%, 0)",
  "hsla(216, 100%, 99%, 0.2)",
  "hsla(216, 100%, 99%, 0.4)",
  "hsla(216, 100%, 99%, 0.6)",
  "hsla(216, 100%, 99%, 0.8)",
  "hsla(210, 100%, 99%, 1)",
  "hsla(210, 100%, 98%, 1)",
  "hsla(210, 100%, 96%, 1)",
  "hsla(210, 100%, 94%, 1)",
  "hsla(209, 96%, 90%, 1)",
  "hsla(209, 82%, 85%, 1)",
  "hsla(208, 78%, 77%, 1)",
  "hsla(206, 82%, 65%, 1)",
  "hsla(206, 100%, 50%, 1)",
  "hsla(208, 100%, 47%, 1)",
  "hsla(211, 100%, 43%, 1)",
  "hsla(211, 100%, 15%, 1)",
  "hsla(211, 100%, 15%, 0)",
  "hsla(211, 100%, 15%, 0.2)",
  "hsla(211, 100%, 15%, 0.4)",
  "hsla(211, 100%, 15%, 0.6)",
  "hsla(211, 100%, 15%, 0.8)",
  "hsla(0, 100%, 99%, 0)",
  "hsla(0, 100%, 99%, 0.2)",
  "hsla(0, 100%, 99%, 0.4)",
  "hsla(0, 100%, 99%, 0.6)",
  "hsla(0, 100%, 99%, 0.8)",
  "hsla(0, 100%, 99%, 1)",
  "hsla(0, 100%, 97%, 1)",
  "hsla(0, 100%, 95%, 1)",
  "hsla(0, 90%, 92%, 1)",
  "hsla(0, 81%, 88%, 1)",
  "hsla(359, 74%, 82%, 1)",
  "hsla(359, 69%, 74%, 1)",
  "hsla(358, 75%, 59%, 1)",
  "hsla(358, 69%, 55%, 1)",
  "hsla(358, 65%, 49%, 1)",
  "hsla(355, 49%, 15%, 1)",
  "hsla(355, 48%, 15%, 0)",
  "hsla(355, 48%, 15%, 0.2)",
  "hsla(355, 48%, 15%, 0.4)",
  "hsla(355, 48%, 15%, 0.6)",
  "hsla(355, 48%, 15%, 0.8)",
  "hsla(60, 45%, 98%, 0)",
  "hsla(60, 45%, 98%, 0.2)",
  "hsla(60, 45%, 98%, 0.4)",
  "hsla(60, 45%, 98%, 0.6)",
  "hsla(60, 45%, 98%, 0.8)",
  "hsla(60, 50%, 98%, 1)",
  "hsla(52, 100%, 95%, 1)",
  "hsla(55, 100%, 91%, 1)",
  "hsla(54, 100%, 87%, 1)",
  "hsla(52, 98%, 82%, 1)",
  "hsla(50, 90%, 76%, 1)",
  "hsla(47, 80%, 68%, 1)",
  "hsla(48, 100%, 46%, 1)",
  "hsla(53, 92%, 50%, 1)",
  "hsla(50, 100%, 48%, 1)",
  "hsla(42, 100%, 29%, 1)",
  "hsla(41, 56%, 13%, 1)",
  "hsla(41, 55%, 13%, 0)",
  "hsla(41, 55%, 13%, 0.2)",
  "hsla(41, 55%, 13%, 0.4)",
  "hsla(41, 55%, 13%, 0.6)",
  "hsla(41, 55%, 13%, 0.8)",
  "hsla(140, 60%, 99%, 0)",
  "hsla(140, 60%, 99%, 0.2)",
  "hsla(140, 60%, 99%, 0.4)",
  "hsla(140, 60%, 99%, 0.6)",
  "hsla(140, 60%, 99%, 0.8)",
  "hsla(140, 60%, 99%, 1)",
  "hsla(138, 63%, 97%, 1)",
  "hsla(139, 57%, 95%, 1)",
  "hsla(139, 48%, 91%, 1)",
  "hsla(141, 44%, 86%, 1)",
  "hsla(142, 40%, 79%, 1)",
  "hsla(146, 38%, 69%, 1)",
  "hsla(151, 40%, 54%, 1)",
  "hsla(151, 55%, 42%, 1)",
  "hsla(152, 57%, 38%, 1)",
  "hsla(153, 67%, 28%, 1)",
  "hsla(155, 41%, 14%, 1)",
  "hsla(155, 41%, 14%, 0)",
  "hsla(155, 41%, 14%, 0.2)",
  "hsla(155, 41%, 14%, 0.4)",
  "hsla(155, 41%, 14%, 0.6)",
  "hsla(155, 41%, 14%, 0.8)",
  "hsla(214, 35%, 9%, 0)",
  "hsla(214, 35%, 9%, 0.2)",
  "hsla(214, 35%, 9%, 0.4)",
  "hsla(214, 35%, 9%, 0.6)",
  "hsla(214, 35%, 9%, 0.8)",
  "hsla(212, 36%, 9%, 1)",
  "hsla(216, 50%, 12%, 1)",
  "hsla(214, 59%, 15%, 1)",
  "hsla(214, 65%, 18%, 1)",
  "hsla(213, 71%, 20%, 1)",
  "hsla(212, 78%, 23%, 1)",
  "hsla(211, 86%, 27%, 1)",
  "hsla(211, 90%, 34%, 1)",
  "hsla(209, 100%, 61%, 1)",
  "hsla(210, 100%, 66%, 1)",
  "hsla(206, 100%, 96%, 1)",
  "hsla(207, 100%, 96%, 0)",
  "hsla(207, 100%, 96%, 0.2)",
  "hsla(207, 100%, 96%, 0.4)",
  "hsla(207, 100%, 96%, 0.6)",
  "hsla(207, 100%, 96%, 0.8)",
  "hsla(351, 25%, 10%, 0)",
  "hsla(351, 25%, 10%, 0.2)",
  "hsla(351, 25%, 10%, 0.4)",
  "hsla(351, 25%, 10%, 0.6)",
  "hsla(351, 25%, 10%, 0.8)",
  "hsla(350, 24%, 10%, 1)",
  "hsla(357, 34%, 12%, 1)",
  "hsla(357, 43%, 16%, 1)",
  "hsla(356, 47%, 19%, 1)",
  "hsla(356, 51%, 22%, 1)",
  "hsla(357, 55%, 26%, 1)",
  "hsla(357, 60%, 32%, 1)",
  "hsla(358, 65%, 40%, 1)",
  "hsla(358, 86%, 64%, 1)",
  "hsla(358, 100%, 69%, 1)",
  "hsla(353, 90%, 96%, 1)",
  "hsla(353, 90%, 96%, 0)",
  "hsla(353, 90%, 96%, 0.2)",
  "hsla(353, 90%, 96%, 0.4)",
  "hsla(353, 90%, 96%, 0.6)",
  "hsla(353, 90%, 96%, 0.8)",
  "hsla(46, 100%, 5%, 0)",
  "hsla(46, 100%, 5%, 0.2)",
  "hsla(46, 100%, 5%, 0.4)",
  "hsla(46, 100%, 5%, 0.6)",
  "hsla(46, 100%, 5%, 0.8)",
  "hsla(45, 100%, 5%, 1)",
  "hsla(46, 100%, 7%, 1)",
  "hsla(45, 100%, 9%, 1)",
  "hsla(45, 100%, 10%, 1)",
  "hsla(46, 100%, 12%, 1)",
  "hsla(49, 100%, 14%, 1)",
  "hsla(49, 89%, 18%, 1)",
  "hsla(50, 100%, 22%, 1)",
  "hsla(54, 100%, 68%, 1)",
  "hsla(48, 100%, 47%, 1)",
  "hsla(53, 100%, 91%, 1)",
  "hsla(53, 100%, 91%, 0)",
  "hsla(53, 100%, 91%, 0.2)",
  "hsla(53, 100%, 91%, 0.4)",
  "hsla(53, 100%, 91%, 0.6)",
  "hsla(53, 100%, 91%, 0.8)",
  "hsla(145, 33%, 7%, 0)",
  "hsla(145, 33%, 7%, 0.2)",
  "hsla(145, 33%, 7%, 0.4)",
  "hsla(145, 33%, 7%, 0.6)",
  "hsla(145, 33%, 7%, 0.8)",
  "hsla(145, 32%, 7%, 1)",
  "hsla(155, 44%, 8%, 1)",
  "hsla(155, 46%, 11%, 1)",
  "hsla(154, 48%, 13%, 1)",
  "hsla(155, 50%, 15%, 1)",
  "hsla(154, 51%, 18%, 1)",
  "hsla(153, 51%, 22%, 1)",
  "hsla(151, 52%, 28%, 1)",
  "hsla(151, 49%, 46%, 1)",
  "hsla(151, 50%, 53%, 1)",
  "hsla(136, 73%, 94%, 1)",
  "hsla(134, 73%, 94%, 0)",
  "hsla(134, 73%, 94%, 0.2)",
  "hsla(134, 73%, 94%, 0.4)",
  "hsla(134, 73%, 94%, 0.6)",
  "hsla(134, 73%, 94%, 0.8)"
], ks = [
  "accentBackground",
  "accentColor",
  "background0",
  "background02",
  "background04",
  "background06",
  "background08",
  "color1",
  "color2",
  "color3",
  "color4",
  "color5",
  "color6",
  "color7",
  "color8",
  "color9",
  "color10",
  "color11",
  "color12",
  "color0",
  "color02",
  "color04",
  "color06",
  "color08",
  "background",
  "backgroundHover",
  "backgroundPress",
  "backgroundFocus",
  "borderColor",
  "borderColorHover",
  "borderColorPress",
  "borderColorFocus",
  "color",
  "colorHover",
  "colorPress",
  "colorFocus",
  "placeholderColor",
  "outlineColor",
  "colorTransparent",
  "blue1",
  "blue2",
  "blue3",
  "blue4",
  "blue5",
  "blue6",
  "blue7",
  "blue8",
  "blue9",
  "blue10",
  "blue11",
  "blue12",
  "green1",
  "green2",
  "green3",
  "green4",
  "green5",
  "green6",
  "green7",
  "green8",
  "green9",
  "green10",
  "green11",
  "green12",
  "red1",
  "red2",
  "red3",
  "red4",
  "red5",
  "red6",
  "red7",
  "red8",
  "red9",
  "red10",
  "red11",
  "red12",
  "yellow1",
  "yellow2",
  "yellow3",
  "yellow4",
  "yellow5",
  "yellow6",
  "yellow7",
  "yellow8",
  "yellow9",
  "yellow10",
  "yellow11",
  "yellow12",
  "shadow1",
  "shadow2",
  "shadow3",
  "shadow4",
  "shadow5",
  "shadow6",
  "black1",
  "black2",
  "black3",
  "black4",
  "black5",
  "black6",
  "black7",
  "black8",
  "black9",
  "black10",
  "black11",
  "black12",
  "white1",
  "white2",
  "white3",
  "white4",
  "white5",
  "white6",
  "white7",
  "white8",
  "white9",
  "white10",
  "white11",
  "white12",
  "shadowColor",
  "accent1",
  "accent2",
  "accent3",
  "accent4",
  "accent5",
  "accent6",
  "accent7",
  "accent8",
  "accent9",
  "accent10",
  "accent11",
  "accent12"
], n1 = t([
  [
    0,
    0
  ],
  [
    1,
    1
  ],
  [
    2,
    2
  ],
  [
    3,
    3
  ],
  [
    4,
    4
  ],
  [
    5,
    5
  ],
  [
    6,
    6
  ],
  [
    7,
    7
  ],
  [
    8,
    8
  ],
  [
    9,
    9
  ],
  [
    10,
    10
  ],
  [
    11,
    11
  ],
  [
    12,
    12
  ],
  [
    13,
    13
  ],
  [
    14,
    14
  ],
  [
    15,
    15
  ],
  [
    16,
    16
  ],
  [
    17,
    17
  ],
  [
    18,
    18
  ],
  [
    19,
    19
  ],
  [
    20,
    20
  ],
  [
    21,
    21
  ],
  [
    22,
    22
  ],
  [
    23,
    23
  ],
  [
    24,
    7
  ],
  [
    25,
    6
  ],
  [
    26,
    8
  ],
  [
    27,
    8
  ],
  [
    28,
    10
  ],
  [
    29,
    9
  ],
  [
    30,
    11
  ],
  [
    31,
    10
  ],
  [
    32,
    18
  ],
  [
    33,
    17
  ],
  [
    34,
    18
  ],
  [
    35,
    17
  ],
  [
    36,
    15
  ],
  [
    37,
    20
  ],
  [
    38,
    19
  ],
  [
    39,
    24
  ],
  [
    40,
    25
  ],
  [
    41,
    26
  ],
  [
    42,
    27
  ],
  [
    43,
    28
  ],
  [
    44,
    29
  ],
  [
    45,
    30
  ],
  [
    46,
    31
  ],
  [
    47,
    32
  ],
  [
    48,
    33
  ],
  [
    49,
    34
  ],
  [
    50,
    35
  ],
  [
    51,
    36
  ],
  [
    52,
    37
  ],
  [
    53,
    38
  ],
  [
    54,
    39
  ],
  [
    55,
    40
  ],
  [
    56,
    41
  ],
  [
    57,
    42
  ],
  [
    58,
    43
  ],
  [
    59,
    44
  ],
  [
    60,
    45
  ],
  [
    61,
    46
  ],
  [
    62,
    47
  ],
  [
    63,
    48
  ],
  [
    64,
    49
  ],
  [
    65,
    50
  ],
  [
    66,
    51
  ],
  [
    67,
    52
  ],
  [
    68,
    53
  ],
  [
    69,
    54
  ],
  [
    70,
    55
  ],
  [
    71,
    56
  ],
  [
    72,
    57
  ],
  [
    73,
    58
  ],
  [
    74,
    59
  ],
  [
    75,
    60
  ],
  [
    76,
    61
  ],
  [
    77,
    62
  ],
  [
    78,
    63
  ],
  [
    79,
    64
  ],
  [
    80,
    65
  ],
  [
    81,
    66
  ],
  [
    82,
    67
  ],
  [
    83,
    68
  ],
  [
    84,
    69
  ],
  [
    85,
    70
  ],
  [
    86,
    71
  ],
  [
    87,
    72
  ],
  [
    88,
    73
  ],
  [
    89,
    74
  ],
  [
    90,
    75
  ],
  [
    91,
    76
  ],
  [
    92,
    77
  ],
  [
    93,
    78
  ],
  [
    94,
    79
  ],
  [
    95,
    80
  ],
  [
    96,
    81
  ],
  [
    97,
    82
  ],
  [
    98,
    83
  ],
  [
    99,
    84
  ],
  [
    100,
    85
  ],
  [
    101,
    86
  ],
  [
    102,
    87
  ],
  [
    103,
    88
  ],
  [
    104,
    89
  ],
  [
    105,
    89
  ],
  [
    106,
    90
  ],
  [
    107,
    91
  ],
  [
    108,
    92
  ],
  [
    109,
    93
  ],
  [
    110,
    94
  ],
  [
    111,
    95
  ],
  [
    112,
    96
  ],
  [
    113,
    97
  ],
  [
    114,
    98
  ],
  [
    115,
    99
  ],
  [
    116,
    100
  ],
  [
    117,
    72
  ],
  [
    118,
    101
  ],
  [
    119,
    102
  ],
  [
    120,
    0
  ],
  [
    121,
    103
  ],
  [
    122,
    104
  ],
  [
    123,
    105
  ],
  [
    124,
    106
  ],
  [
    125,
    107
  ],
  [
    126,
    108
  ],
  [
    127,
    1
  ],
  [
    128,
    109
  ],
  [
    129,
    7
  ]
]), n2 = t([
  [
    0,
    16
  ],
  [
    1,
    9
  ],
  [
    2,
    110
  ],
  [
    3,
    111
  ],
  [
    4,
    112
  ],
  [
    5,
    113
  ],
  [
    6,
    114
  ],
  [
    7,
    101
  ],
  [
    8,
    102
  ],
  [
    9,
    0
  ],
  [
    10,
    103
  ],
  [
    11,
    104
  ],
  [
    12,
    105
  ],
  [
    13,
    106
  ],
  [
    14,
    107
  ],
  [
    15,
    108
  ],
  [
    16,
    1
  ],
  [
    17,
    109
  ],
  [
    18,
    7
  ],
  [
    19,
    2
  ],
  [
    20,
    3
  ],
  [
    21,
    4
  ],
  [
    22,
    5
  ],
  [
    23,
    6
  ],
  [
    24,
    101
  ],
  [
    25,
    102
  ],
  [
    26,
    114
  ],
  [
    27,
    114
  ],
  [
    28,
    103
  ],
  [
    29,
    104
  ],
  [
    30,
    0
  ],
  [
    31,
    103
  ],
  [
    32,
    7
  ],
  [
    33,
    109
  ],
  [
    34,
    7
  ],
  [
    35,
    109
  ],
  [
    36,
    108
  ],
  [
    37,
    3
  ],
  [
    38,
    2
  ],
  [
    39,
    115
  ],
  [
    40,
    116
  ],
  [
    41,
    117
  ],
  [
    42,
    118
  ],
  [
    43,
    119
  ],
  [
    44,
    120
  ],
  [
    45,
    121
  ],
  [
    46,
    122
  ],
  [
    47,
    32
  ],
  [
    48,
    123
  ],
  [
    49,
    124
  ],
  [
    50,
    125
  ],
  [
    51,
    126
  ],
  [
    52,
    127
  ],
  [
    53,
    128
  ],
  [
    54,
    129
  ],
  [
    55,
    130
  ],
  [
    56,
    131
  ],
  [
    57,
    132
  ],
  [
    58,
    133
  ],
  [
    59,
    44
  ],
  [
    60,
    134
  ],
  [
    61,
    135
  ],
  [
    62,
    136
  ],
  [
    63,
    137
  ],
  [
    64,
    138
  ],
  [
    65,
    139
  ],
  [
    66,
    140
  ],
  [
    67,
    141
  ],
  [
    68,
    142
  ],
  [
    69,
    143
  ],
  [
    70,
    144
  ],
  [
    71,
    56
  ],
  [
    72,
    145
  ],
  [
    73,
    146
  ],
  [
    74,
    147
  ],
  [
    75,
    148
  ],
  [
    76,
    149
  ],
  [
    77,
    150
  ],
  [
    78,
    151
  ],
  [
    79,
    152
  ],
  [
    80,
    153
  ],
  [
    81,
    154
  ],
  [
    82,
    155
  ],
  [
    83,
    68
  ],
  [
    84,
    156
  ],
  [
    85,
    157
  ],
  [
    86,
    158
  ],
  [
    87,
    159
  ],
  [
    88,
    160
  ],
  [
    89,
    77
  ],
  [
    90,
    161
  ],
  [
    91,
    162
  ],
  [
    92,
    163
  ],
  [
    93,
    78
  ],
  [
    94,
    79
  ],
  [
    95,
    80
  ],
  [
    96,
    81
  ],
  [
    97,
    82
  ],
  [
    98,
    83
  ],
  [
    99,
    84
  ],
  [
    100,
    85
  ],
  [
    101,
    86
  ],
  [
    102,
    87
  ],
  [
    103,
    88
  ],
  [
    104,
    89
  ],
  [
    105,
    89
  ],
  [
    106,
    90
  ],
  [
    107,
    91
  ],
  [
    108,
    92
  ],
  [
    109,
    93
  ],
  [
    110,
    94
  ],
  [
    111,
    95
  ],
  [
    112,
    96
  ],
  [
    113,
    97
  ],
  [
    114,
    98
  ],
  [
    115,
    99
  ],
  [
    116,
    100
  ],
  [
    117,
    159
  ],
  [
    118,
    7
  ],
  [
    119,
    8
  ],
  [
    120,
    9
  ],
  [
    121,
    10
  ],
  [
    122,
    11
  ],
  [
    123,
    12
  ],
  [
    124,
    13
  ],
  [
    125,
    14
  ],
  [
    126,
    15
  ],
  [
    127,
    16
  ],
  [
    128,
    17
  ],
  [
    129,
    18
  ]
]), n3 = t([
  [
    0,
    9
  ],
  [
    1,
    16
  ],
  [
    2,
    110
  ],
  [
    3,
    111
  ],
  [
    4,
    112
  ],
  [
    5,
    113
  ],
  [
    6,
    114
  ],
  [
    7,
    101
  ],
  [
    8,
    102
  ],
  [
    9,
    0
  ],
  [
    10,
    103
  ],
  [
    11,
    104
  ],
  [
    12,
    105
  ],
  [
    13,
    106
  ],
  [
    14,
    107
  ],
  [
    15,
    108
  ],
  [
    16,
    1
  ],
  [
    17,
    109
  ],
  [
    18,
    7
  ],
  [
    19,
    2
  ],
  [
    20,
    3
  ],
  [
    21,
    4
  ],
  [
    22,
    5
  ],
  [
    23,
    6
  ],
  [
    24,
    101
  ],
  [
    25,
    114
  ],
  [
    26,
    102
  ],
  [
    27,
    102
  ],
  [
    28,
    103
  ],
  [
    29,
    0
  ],
  [
    30,
    104
  ],
  [
    31,
    103
  ],
  [
    32,
    7
  ],
  [
    33,
    109
  ],
  [
    34,
    7
  ],
  [
    35,
    109
  ],
  [
    36,
    108
  ],
  [
    37,
    3
  ],
  [
    38,
    2
  ]
]), n4 = t([
  [
    0,
    1
  ],
  [
    1,
    0
  ],
  [
    2,
    2
  ],
  [
    3,
    3
  ],
  [
    4,
    4
  ],
  [
    5,
    5
  ],
  [
    6,
    6
  ],
  [
    7,
    7
  ],
  [
    8,
    8
  ],
  [
    9,
    9
  ],
  [
    10,
    10
  ],
  [
    11,
    11
  ],
  [
    12,
    12
  ],
  [
    13,
    13
  ],
  [
    14,
    14
  ],
  [
    15,
    15
  ],
  [
    16,
    16
  ],
  [
    17,
    17
  ],
  [
    18,
    18
  ],
  [
    19,
    19
  ],
  [
    20,
    20
  ],
  [
    21,
    21
  ],
  [
    22,
    22
  ],
  [
    23,
    23
  ],
  [
    24,
    7
  ],
  [
    25,
    8
  ],
  [
    26,
    6
  ],
  [
    27,
    6
  ],
  [
    28,
    10
  ],
  [
    29,
    11
  ],
  [
    30,
    9
  ],
  [
    31,
    10
  ],
  [
    32,
    18
  ],
  [
    33,
    17
  ],
  [
    34,
    18
  ],
  [
    35,
    17
  ],
  [
    36,
    15
  ],
  [
    37,
    20
  ],
  [
    38,
    19
  ]
]), n5 = t([
  [
    0,
    0
  ],
  [
    1,
    1
  ],
  [
    2,
    110
  ],
  [
    3,
    111
  ],
  [
    4,
    112
  ],
  [
    5,
    113
  ],
  [
    6,
    114
  ],
  [
    7,
    101
  ],
  [
    8,
    102
  ],
  [
    9,
    0
  ],
  [
    10,
    103
  ],
  [
    11,
    104
  ],
  [
    12,
    105
  ],
  [
    13,
    106
  ],
  [
    14,
    107
  ],
  [
    15,
    108
  ],
  [
    16,
    1
  ],
  [
    17,
    109
  ],
  [
    18,
    7
  ],
  [
    19,
    2
  ],
  [
    20,
    3
  ],
  [
    21,
    4
  ],
  [
    22,
    5
  ],
  [
    23,
    6
  ],
  [
    24,
    101
  ],
  [
    25,
    114
  ],
  [
    26,
    102
  ],
  [
    27,
    102
  ],
  [
    28,
    103
  ],
  [
    29,
    0
  ],
  [
    30,
    104
  ],
  [
    31,
    103
  ],
  [
    32,
    7
  ],
  [
    33,
    109
  ],
  [
    34,
    7
  ],
  [
    35,
    109
  ],
  [
    36,
    108
  ],
  [
    37,
    3
  ],
  [
    38,
    2
  ]
]), n6 = t([
  [
    0,
    0
  ],
  [
    1,
    1
  ],
  [
    2,
    2
  ],
  [
    3,
    3
  ],
  [
    4,
    4
  ],
  [
    5,
    5
  ],
  [
    6,
    6
  ],
  [
    7,
    7
  ],
  [
    8,
    8
  ],
  [
    9,
    9
  ],
  [
    10,
    10
  ],
  [
    11,
    11
  ],
  [
    12,
    12
  ],
  [
    13,
    13
  ],
  [
    14,
    14
  ],
  [
    15,
    15
  ],
  [
    16,
    16
  ],
  [
    17,
    17
  ],
  [
    18,
    18
  ],
  [
    19,
    19
  ],
  [
    20,
    20
  ],
  [
    21,
    21
  ],
  [
    22,
    22
  ],
  [
    23,
    23
  ],
  [
    24,
    7
  ],
  [
    25,
    6
  ],
  [
    26,
    8
  ],
  [
    27,
    8
  ],
  [
    28,
    10
  ],
  [
    29,
    9
  ],
  [
    30,
    11
  ],
  [
    31,
    10
  ],
  [
    32,
    18
  ],
  [
    33,
    17
  ],
  [
    34,
    18
  ],
  [
    35,
    17
  ],
  [
    36,
    15
  ],
  [
    37,
    20
  ],
  [
    38,
    19
  ]
]), n7 = t([
  [
    0,
    0
  ],
  [
    1,
    1
  ],
  [
    2,
    164
  ],
  [
    3,
    165
  ],
  [
    4,
    166
  ],
  [
    5,
    167
  ],
  [
    6,
    168
  ],
  [
    7,
    169
  ],
  [
    8,
    170
  ],
  [
    9,
    171
  ],
  [
    10,
    172
  ],
  [
    11,
    173
  ],
  [
    12,
    174
  ],
  [
    13,
    175
  ],
  [
    14,
    176
  ],
  [
    15,
    177
  ],
  [
    16,
    178
  ],
  [
    17,
    179
  ],
  [
    18,
    180
  ],
  [
    19,
    181
  ],
  [
    20,
    182
  ],
  [
    21,
    183
  ],
  [
    22,
    184
  ],
  [
    23,
    185
  ],
  [
    24,
    169
  ],
  [
    25,
    168
  ],
  [
    26,
    170
  ],
  [
    27,
    170
  ],
  [
    28,
    172
  ],
  [
    29,
    171
  ],
  [
    30,
    173
  ],
  [
    31,
    172
  ],
  [
    32,
    180
  ],
  [
    33,
    179
  ],
  [
    34,
    180
  ],
  [
    35,
    179
  ],
  [
    36,
    177
  ],
  [
    37,
    182
  ],
  [
    38,
    181
  ]
]), n8 = t([
  [
    0,
    0
  ],
  [
    1,
    1
  ],
  [
    2,
    186
  ],
  [
    3,
    187
  ],
  [
    4,
    188
  ],
  [
    5,
    189
  ],
  [
    6,
    190
  ],
  [
    7,
    191
  ],
  [
    8,
    191
  ],
  [
    9,
    192
  ],
  [
    10,
    193
  ],
  [
    11,
    194
  ],
  [
    12,
    195
  ],
  [
    13,
    196
  ],
  [
    14,
    197
  ],
  [
    15,
    198
  ],
  [
    16,
    199
  ],
  [
    17,
    200
  ],
  [
    18,
    201
  ],
  [
    19,
    202
  ],
  [
    20,
    203
  ],
  [
    21,
    204
  ],
  [
    22,
    205
  ],
  [
    23,
    206
  ],
  [
    24,
    191
  ],
  [
    25,
    190
  ],
  [
    26,
    191
  ],
  [
    27,
    191
  ],
  [
    28,
    193
  ],
  [
    29,
    192
  ],
  [
    30,
    194
  ],
  [
    31,
    193
  ],
  [
    32,
    201
  ],
  [
    33,
    200
  ],
  [
    34,
    201
  ],
  [
    35,
    200
  ],
  [
    36,
    198
  ],
  [
    37,
    203
  ],
  [
    38,
    202
  ]
]), n9 = t([
  [
    0,
    0
  ],
  [
    1,
    1
  ],
  [
    2,
    207
  ],
  [
    3,
    208
  ],
  [
    4,
    209
  ],
  [
    5,
    210
  ],
  [
    6,
    211
  ],
  [
    7,
    212
  ],
  [
    8,
    213
  ],
  [
    9,
    214
  ],
  [
    10,
    215
  ],
  [
    11,
    216
  ],
  [
    12,
    217
  ],
  [
    13,
    218
  ],
  [
    14,
    219
  ],
  [
    15,
    220
  ],
  [
    16,
    221
  ],
  [
    17,
    222
  ],
  [
    18,
    223
  ],
  [
    19,
    224
  ],
  [
    20,
    225
  ],
  [
    21,
    226
  ],
  [
    22,
    227
  ],
  [
    23,
    228
  ],
  [
    24,
    212
  ],
  [
    25,
    211
  ],
  [
    26,
    213
  ],
  [
    27,
    213
  ],
  [
    28,
    215
  ],
  [
    29,
    214
  ],
  [
    30,
    216
  ],
  [
    31,
    215
  ],
  [
    32,
    223
  ],
  [
    33,
    222
  ],
  [
    34,
    223
  ],
  [
    35,
    222
  ],
  [
    36,
    220
  ],
  [
    37,
    225
  ],
  [
    38,
    224
  ]
]), n10 = t([
  [
    0,
    0
  ],
  [
    1,
    1
  ],
  [
    2,
    229
  ],
  [
    3,
    230
  ],
  [
    4,
    231
  ],
  [
    5,
    232
  ],
  [
    6,
    233
  ],
  [
    7,
    234
  ],
  [
    8,
    235
  ],
  [
    9,
    236
  ],
  [
    10,
    237
  ],
  [
    11,
    238
  ],
  [
    12,
    239
  ],
  [
    13,
    240
  ],
  [
    14,
    241
  ],
  [
    15,
    242
  ],
  [
    16,
    243
  ],
  [
    17,
    244
  ],
  [
    18,
    245
  ],
  [
    19,
    246
  ],
  [
    20,
    247
  ],
  [
    21,
    248
  ],
  [
    22,
    249
  ],
  [
    23,
    250
  ],
  [
    24,
    234
  ],
  [
    25,
    233
  ],
  [
    26,
    235
  ],
  [
    27,
    235
  ],
  [
    28,
    237
  ],
  [
    29,
    236
  ],
  [
    30,
    238
  ],
  [
    31,
    237
  ],
  [
    32,
    245
  ],
  [
    33,
    244
  ],
  [
    34,
    245
  ],
  [
    35,
    244
  ],
  [
    36,
    242
  ],
  [
    37,
    247
  ],
  [
    38,
    246
  ]
]), n11 = t([
  [
    0,
    16
  ],
  [
    1,
    9
  ],
  [
    2,
    110
  ],
  [
    3,
    111
  ],
  [
    4,
    112
  ],
  [
    5,
    113
  ],
  [
    6,
    114
  ],
  [
    7,
    101
  ],
  [
    8,
    102
  ],
  [
    9,
    0
  ],
  [
    10,
    103
  ],
  [
    11,
    104
  ],
  [
    12,
    105
  ],
  [
    13,
    106
  ],
  [
    14,
    107
  ],
  [
    15,
    108
  ],
  [
    16,
    1
  ],
  [
    17,
    109
  ],
  [
    18,
    7
  ],
  [
    19,
    2
  ],
  [
    20,
    3
  ],
  [
    21,
    4
  ],
  [
    22,
    5
  ],
  [
    23,
    6
  ],
  [
    24,
    101
  ],
  [
    25,
    102
  ],
  [
    26,
    114
  ],
  [
    27,
    114
  ],
  [
    28,
    103
  ],
  [
    29,
    104
  ],
  [
    30,
    0
  ],
  [
    31,
    103
  ],
  [
    32,
    7
  ],
  [
    33,
    109
  ],
  [
    34,
    7
  ],
  [
    35,
    109
  ],
  [
    36,
    108
  ],
  [
    37,
    3
  ],
  [
    38,
    2
  ]
]), n12 = t([
  [
    0,
    16
  ],
  [
    1,
    9
  ],
  [
    2,
    2
  ],
  [
    3,
    3
  ],
  [
    4,
    4
  ],
  [
    5,
    5
  ],
  [
    6,
    6
  ],
  [
    7,
    7
  ],
  [
    8,
    8
  ],
  [
    9,
    9
  ],
  [
    10,
    10
  ],
  [
    11,
    11
  ],
  [
    12,
    12
  ],
  [
    13,
    13
  ],
  [
    14,
    14
  ],
  [
    15,
    15
  ],
  [
    16,
    16
  ],
  [
    17,
    17
  ],
  [
    18,
    18
  ],
  [
    19,
    19
  ],
  [
    20,
    20
  ],
  [
    21,
    21
  ],
  [
    22,
    22
  ],
  [
    23,
    23
  ],
  [
    24,
    7
  ],
  [
    25,
    8
  ],
  [
    26,
    6
  ],
  [
    27,
    6
  ],
  [
    28,
    10
  ],
  [
    29,
    11
  ],
  [
    30,
    9
  ],
  [
    31,
    10
  ],
  [
    32,
    18
  ],
  [
    33,
    17
  ],
  [
    34,
    18
  ],
  [
    35,
    17
  ],
  [
    36,
    15
  ],
  [
    37,
    20
  ],
  [
    38,
    19
  ]
]), n13 = t([
  [
    0,
    16
  ],
  [
    1,
    9
  ],
  [
    2,
    251
  ],
  [
    3,
    252
  ],
  [
    4,
    253
  ],
  [
    5,
    254
  ],
  [
    6,
    255
  ],
  [
    7,
    256
  ],
  [
    8,
    257
  ],
  [
    9,
    258
  ],
  [
    10,
    259
  ],
  [
    11,
    260
  ],
  [
    12,
    261
  ],
  [
    13,
    262
  ],
  [
    14,
    263
  ],
  [
    15,
    177
  ],
  [
    16,
    264
  ],
  [
    17,
    265
  ],
  [
    18,
    266
  ],
  [
    19,
    267
  ],
  [
    20,
    268
  ],
  [
    21,
    269
  ],
  [
    22,
    270
  ],
  [
    23,
    271
  ],
  [
    24,
    256
  ],
  [
    25,
    257
  ],
  [
    26,
    255
  ],
  [
    27,
    255
  ],
  [
    28,
    259
  ],
  [
    29,
    260
  ],
  [
    30,
    258
  ],
  [
    31,
    259
  ],
  [
    32,
    266
  ],
  [
    33,
    265
  ],
  [
    34,
    266
  ],
  [
    35,
    265
  ],
  [
    36,
    177
  ],
  [
    37,
    268
  ],
  [
    38,
    267
  ]
]), n14 = t([
  [
    0,
    16
  ],
  [
    1,
    9
  ],
  [
    2,
    272
  ],
  [
    3,
    273
  ],
  [
    4,
    274
  ],
  [
    5,
    275
  ],
  [
    6,
    276
  ],
  [
    7,
    277
  ],
  [
    8,
    278
  ],
  [
    9,
    279
  ],
  [
    10,
    280
  ],
  [
    11,
    281
  ],
  [
    12,
    282
  ],
  [
    13,
    283
  ],
  [
    14,
    284
  ],
  [
    15,
    198
  ],
  [
    16,
    285
  ],
  [
    17,
    286
  ],
  [
    18,
    287
  ],
  [
    19,
    288
  ],
  [
    20,
    289
  ],
  [
    21,
    290
  ],
  [
    22,
    291
  ],
  [
    23,
    292
  ],
  [
    24,
    277
  ],
  [
    25,
    278
  ],
  [
    26,
    276
  ],
  [
    27,
    276
  ],
  [
    28,
    280
  ],
  [
    29,
    281
  ],
  [
    30,
    279
  ],
  [
    31,
    280
  ],
  [
    32,
    287
  ],
  [
    33,
    286
  ],
  [
    34,
    287
  ],
  [
    35,
    286
  ],
  [
    36,
    198
  ],
  [
    37,
    289
  ],
  [
    38,
    288
  ]
]), n15 = t([
  [
    0,
    16
  ],
  [
    1,
    9
  ],
  [
    2,
    293
  ],
  [
    3,
    294
  ],
  [
    4,
    295
  ],
  [
    5,
    296
  ],
  [
    6,
    297
  ],
  [
    7,
    298
  ],
  [
    8,
    299
  ],
  [
    9,
    300
  ],
  [
    10,
    301
  ],
  [
    11,
    302
  ],
  [
    12,
    303
  ],
  [
    13,
    304
  ],
  [
    14,
    305
  ],
  [
    15,
    220
  ],
  [
    16,
    306
  ],
  [
    17,
    307
  ],
  [
    18,
    308
  ],
  [
    19,
    309
  ],
  [
    20,
    310
  ],
  [
    21,
    311
  ],
  [
    22,
    312
  ],
  [
    23,
    313
  ],
  [
    24,
    298
  ],
  [
    25,
    299
  ],
  [
    26,
    297
  ],
  [
    27,
    297
  ],
  [
    28,
    301
  ],
  [
    29,
    302
  ],
  [
    30,
    300
  ],
  [
    31,
    301
  ],
  [
    32,
    308
  ],
  [
    33,
    307
  ],
  [
    34,
    308
  ],
  [
    35,
    307
  ],
  [
    36,
    220
  ],
  [
    37,
    310
  ],
  [
    38,
    309
  ]
]), n16 = t([
  [
    0,
    16
  ],
  [
    1,
    9
  ],
  [
    2,
    314
  ],
  [
    3,
    315
  ],
  [
    4,
    316
  ],
  [
    5,
    317
  ],
  [
    6,
    318
  ],
  [
    7,
    319
  ],
  [
    8,
    320
  ],
  [
    9,
    321
  ],
  [
    10,
    322
  ],
  [
    11,
    323
  ],
  [
    12,
    324
  ],
  [
    13,
    325
  ],
  [
    14,
    326
  ],
  [
    15,
    242
  ],
  [
    16,
    327
  ],
  [
    17,
    328
  ],
  [
    18,
    329
  ],
  [
    19,
    330
  ],
  [
    20,
    331
  ],
  [
    21,
    332
  ],
  [
    22,
    333
  ],
  [
    23,
    334
  ],
  [
    24,
    319
  ],
  [
    25,
    320
  ],
  [
    26,
    318
  ],
  [
    27,
    318
  ],
  [
    28,
    322
  ],
  [
    29,
    323
  ],
  [
    30,
    321
  ],
  [
    31,
    322
  ],
  [
    32,
    329
  ],
  [
    33,
    328
  ],
  [
    34,
    329
  ],
  [
    35,
    328
  ],
  [
    36,
    242
  ],
  [
    37,
    331
  ],
  [
    38,
    330
  ]
]), n17 = t([
  [
    32,
    18
  ],
  [
    33,
    17
  ],
  [
    34,
    18
  ],
  [
    35,
    17
  ],
  [
    36,
    15
  ],
  [
    37,
    20
  ],
  [
    24,
    8
  ],
  [
    25,
    7
  ],
  [
    26,
    9
  ],
  [
    27,
    9
  ],
  [
    28,
    11
  ],
  [
    29,
    10
  ],
  [
    31,
    11
  ],
  [
    30,
    12
  ]
]), n18 = t([
  [
    32,
    18
  ],
  [
    33,
    17
  ],
  [
    34,
    18
  ],
  [
    35,
    17
  ],
  [
    36,
    15
  ],
  [
    37,
    20
  ],
  [
    24,
    10
  ],
  [
    25,
    9
  ],
  [
    26,
    11
  ],
  [
    27,
    11
  ],
  [
    28,
    13
  ],
  [
    29,
    12
  ],
  [
    31,
    13
  ],
  [
    30,
    14
  ]
]), n19 = t([
  [
    32,
    18
  ],
  [
    33,
    17
  ],
  [
    34,
    18
  ],
  [
    35,
    17
  ],
  [
    36,
    15
  ],
  [
    37,
    20
  ],
  [
    24,
    9
  ],
  [
    25,
    8
  ],
  [
    26,
    10
  ],
  [
    27,
    10
  ],
  [
    28,
    12
  ],
  [
    29,
    11
  ],
  [
    31,
    12
  ],
  [
    30,
    13
  ]
]), n20 = t([
  [
    0,
    1
  ],
  [
    1,
    0
  ],
  [
    2,
    19
  ],
  [
    3,
    20
  ],
  [
    4,
    21
  ],
  [
    5,
    22
  ],
  [
    6,
    23
  ],
  [
    7,
    18
  ],
  [
    8,
    17
  ],
  [
    9,
    16
  ],
  [
    10,
    15
  ],
  [
    11,
    14
  ],
  [
    12,
    13
  ],
  [
    13,
    12
  ],
  [
    14,
    11
  ],
  [
    15,
    10
  ],
  [
    16,
    9
  ],
  [
    17,
    8
  ],
  [
    18,
    7
  ],
  [
    19,
    2
  ],
  [
    20,
    3
  ],
  [
    21,
    4
  ],
  [
    22,
    5
  ],
  [
    23,
    6
  ],
  [
    24,
    18
  ],
  [
    25,
    23
  ],
  [
    26,
    17
  ],
  [
    27,
    17
  ],
  [
    28,
    15
  ],
  [
    29,
    16
  ],
  [
    30,
    14
  ],
  [
    31,
    15
  ],
  [
    32,
    7
  ],
  [
    33,
    8
  ],
  [
    34,
    7
  ],
  [
    35,
    8
  ],
  [
    36,
    10
  ],
  [
    37,
    3
  ],
  [
    38,
    2
  ]
]), n21 = t([
  [
    32,
    7
  ],
  [
    33,
    109
  ],
  [
    34,
    7
  ],
  [
    35,
    109
  ],
  [
    36,
    108
  ],
  [
    37,
    3
  ],
  [
    24,
    102
  ],
  [
    25,
    0
  ],
  [
    26,
    101
  ],
  [
    27,
    101
  ],
  [
    28,
    104
  ],
  [
    29,
    105
  ],
  [
    31,
    104
  ],
  [
    30,
    103
  ]
]), n22 = t([
  [
    32,
    7
  ],
  [
    33,
    109
  ],
  [
    34,
    7
  ],
  [
    35,
    109
  ],
  [
    36,
    108
  ],
  [
    37,
    3
  ],
  [
    24,
    103
  ],
  [
    25,
    104
  ],
  [
    26,
    0
  ],
  [
    27,
    0
  ],
  [
    28,
    106
  ],
  [
    29,
    107
  ],
  [
    31,
    106
  ],
  [
    30,
    105
  ]
]), n23 = t([
  [
    32,
    7
  ],
  [
    33,
    109
  ],
  [
    34,
    7
  ],
  [
    35,
    109
  ],
  [
    36,
    108
  ],
  [
    37,
    3
  ],
  [
    24,
    0
  ],
  [
    25,
    103
  ],
  [
    26,
    102
  ],
  [
    27,
    102
  ],
  [
    28,
    105
  ],
  [
    29,
    106
  ],
  [
    31,
    105
  ],
  [
    30,
    104
  ]
]), n24 = t([
  [
    0,
    9
  ],
  [
    1,
    16
  ],
  [
    2,
    2
  ],
  [
    3,
    3
  ],
  [
    4,
    4
  ],
  [
    5,
    5
  ],
  [
    6,
    6
  ],
  [
    7,
    7
  ],
  [
    8,
    109
  ],
  [
    9,
    1
  ],
  [
    10,
    108
  ],
  [
    11,
    107
  ],
  [
    12,
    106
  ],
  [
    13,
    105
  ],
  [
    14,
    104
  ],
  [
    15,
    103
  ],
  [
    16,
    0
  ],
  [
    17,
    102
  ],
  [
    18,
    101
  ],
  [
    19,
    110
  ],
  [
    20,
    111
  ],
  [
    21,
    112
  ],
  [
    22,
    113
  ],
  [
    23,
    114
  ],
  [
    24,
    7
  ],
  [
    25,
    109
  ],
  [
    26,
    6
  ],
  [
    27,
    6
  ],
  [
    28,
    108
  ],
  [
    29,
    107
  ],
  [
    30,
    1
  ],
  [
    31,
    108
  ],
  [
    32,
    101
  ],
  [
    33,
    102
  ],
  [
    34,
    101
  ],
  [
    35,
    102
  ],
  [
    36,
    103
  ],
  [
    37,
    111
  ],
  [
    38,
    110
  ]
]), n25 = t([
  [
    32,
    7
  ],
  [
    33,
    109
  ],
  [
    34,
    7
  ],
  [
    35,
    109
  ],
  [
    36,
    108
  ],
  [
    37,
    3
  ],
  [
    24,
    102
  ],
  [
    25,
    101
  ],
  [
    26,
    0
  ],
  [
    27,
    0
  ],
  [
    28,
    104
  ],
  [
    29,
    103
  ],
  [
    31,
    104
  ],
  [
    30,
    105
  ]
]), n26 = t([
  [
    32,
    7
  ],
  [
    33,
    109
  ],
  [
    34,
    7
  ],
  [
    35,
    109
  ],
  [
    36,
    108
  ],
  [
    37,
    3
  ],
  [
    24,
    103
  ],
  [
    25,
    0
  ],
  [
    26,
    104
  ],
  [
    27,
    104
  ],
  [
    28,
    106
  ],
  [
    29,
    105
  ],
  [
    31,
    106
  ],
  [
    30,
    107
  ]
]), n27 = t([
  [
    32,
    7
  ],
  [
    33,
    109
  ],
  [
    34,
    7
  ],
  [
    35,
    109
  ],
  [
    36,
    108
  ],
  [
    37,
    3
  ],
  [
    24,
    0
  ],
  [
    25,
    102
  ],
  [
    26,
    103
  ],
  [
    27,
    103
  ],
  [
    28,
    105
  ],
  [
    29,
    104
  ],
  [
    31,
    105
  ],
  [
    30,
    106
  ]
]), n28 = t([
  [
    0,
    16
  ],
  [
    1,
    9
  ],
  [
    2,
    2
  ],
  [
    3,
    3
  ],
  [
    4,
    4
  ],
  [
    5,
    5
  ],
  [
    6,
    6
  ],
  [
    7,
    7
  ],
  [
    8,
    109
  ],
  [
    9,
    1
  ],
  [
    10,
    108
  ],
  [
    11,
    107
  ],
  [
    12,
    106
  ],
  [
    13,
    105
  ],
  [
    14,
    104
  ],
  [
    15,
    103
  ],
  [
    16,
    0
  ],
  [
    17,
    102
  ],
  [
    18,
    101
  ],
  [
    19,
    110
  ],
  [
    20,
    111
  ],
  [
    21,
    112
  ],
  [
    22,
    113
  ],
  [
    23,
    114
  ],
  [
    24,
    7
  ],
  [
    25,
    6
  ],
  [
    26,
    109
  ],
  [
    27,
    109
  ],
  [
    28,
    108
  ],
  [
    29,
    1
  ],
  [
    30,
    107
  ],
  [
    31,
    108
  ],
  [
    32,
    101
  ],
  [
    33,
    102
  ],
  [
    34,
    101
  ],
  [
    35,
    102
  ],
  [
    36,
    103
  ],
  [
    37,
    111
  ],
  [
    38,
    110
  ]
]), n29 = t([
  [
    32,
    18
  ],
  [
    33,
    17
  ],
  [
    34,
    18
  ],
  [
    35,
    17
  ],
  [
    36,
    15
  ],
  [
    37,
    20
  ],
  [
    24,
    8
  ],
  [
    25,
    9
  ],
  [
    26,
    7
  ],
  [
    27,
    7
  ],
  [
    28,
    11
  ],
  [
    29,
    12
  ],
  [
    31,
    11
  ],
  [
    30,
    10
  ]
]), n30 = t([
  [
    32,
    18
  ],
  [
    33,
    17
  ],
  [
    34,
    18
  ],
  [
    35,
    17
  ],
  [
    36,
    15
  ],
  [
    37,
    20
  ],
  [
    24,
    10
  ],
  [
    25,
    11
  ],
  [
    26,
    9
  ],
  [
    27,
    9
  ],
  [
    28,
    13
  ],
  [
    29,
    14
  ],
  [
    31,
    13
  ],
  [
    30,
    12
  ]
]), n31 = t([
  [
    32,
    18
  ],
  [
    33,
    17
  ],
  [
    34,
    18
  ],
  [
    35,
    17
  ],
  [
    36,
    15
  ],
  [
    37,
    20
  ],
  [
    24,
    9
  ],
  [
    25,
    10
  ],
  [
    26,
    8
  ],
  [
    27,
    8
  ],
  [
    28,
    12
  ],
  [
    29,
    13
  ],
  [
    31,
    12
  ],
  [
    30,
    11
  ]
]), n32 = t([
  [
    0,
    0
  ],
  [
    1,
    1
  ],
  [
    2,
    19
  ],
  [
    3,
    20
  ],
  [
    4,
    21
  ],
  [
    5,
    22
  ],
  [
    6,
    23
  ],
  [
    7,
    18
  ],
  [
    8,
    17
  ],
  [
    9,
    16
  ],
  [
    10,
    15
  ],
  [
    11,
    14
  ],
  [
    12,
    13
  ],
  [
    13,
    12
  ],
  [
    14,
    11
  ],
  [
    15,
    10
  ],
  [
    16,
    9
  ],
  [
    17,
    8
  ],
  [
    18,
    7
  ],
  [
    19,
    2
  ],
  [
    20,
    3
  ],
  [
    21,
    4
  ],
  [
    22,
    5
  ],
  [
    23,
    6
  ],
  [
    24,
    18
  ],
  [
    25,
    17
  ],
  [
    26,
    23
  ],
  [
    27,
    23
  ],
  [
    28,
    15
  ],
  [
    29,
    14
  ],
  [
    30,
    16
  ],
  [
    31,
    15
  ],
  [
    32,
    7
  ],
  [
    33,
    8
  ],
  [
    34,
    7
  ],
  [
    35,
    8
  ],
  [
    36,
    10
  ],
  [
    37,
    3
  ],
  [
    38,
    2
  ]
]), n33 = t([
  [
    0,
    1
  ],
  [
    1,
    0
  ],
  [
    2,
    2
  ],
  [
    3,
    3
  ],
  [
    4,
    4
  ],
  [
    5,
    5
  ],
  [
    6,
    6
  ],
  [
    7,
    7
  ],
  [
    8,
    109
  ],
  [
    9,
    1
  ],
  [
    10,
    108
  ],
  [
    11,
    107
  ],
  [
    12,
    106
  ],
  [
    13,
    105
  ],
  [
    14,
    104
  ],
  [
    15,
    103
  ],
  [
    16,
    0
  ],
  [
    17,
    102
  ],
  [
    18,
    101
  ],
  [
    19,
    110
  ],
  [
    20,
    111
  ],
  [
    21,
    112
  ],
  [
    22,
    113
  ],
  [
    23,
    114
  ],
  [
    24,
    7
  ],
  [
    25,
    6
  ],
  [
    26,
    109
  ],
  [
    27,
    109
  ],
  [
    28,
    108
  ],
  [
    29,
    1
  ],
  [
    30,
    107
  ],
  [
    31,
    108
  ],
  [
    32,
    101
  ],
  [
    33,
    102
  ],
  [
    34,
    101
  ],
  [
    35,
    102
  ],
  [
    36,
    103
  ],
  [
    37,
    111
  ],
  [
    38,
    110
  ]
]), n34 = t([
  [
    32,
    180
  ],
  [
    33,
    179
  ],
  [
    34,
    180
  ],
  [
    35,
    179
  ],
  [
    36,
    177
  ],
  [
    37,
    182
  ],
  [
    24,
    170
  ],
  [
    25,
    169
  ],
  [
    26,
    171
  ],
  [
    27,
    171
  ],
  [
    28,
    173
  ],
  [
    29,
    172
  ],
  [
    31,
    173
  ],
  [
    30,
    174
  ]
]), n35 = t([
  [
    32,
    180
  ],
  [
    33,
    179
  ],
  [
    34,
    180
  ],
  [
    35,
    179
  ],
  [
    36,
    177
  ],
  [
    37,
    182
  ],
  [
    24,
    172
  ],
  [
    25,
    171
  ],
  [
    26,
    173
  ],
  [
    27,
    173
  ],
  [
    28,
    175
  ],
  [
    29,
    174
  ],
  [
    31,
    175
  ],
  [
    30,
    176
  ]
]), n36 = t([
  [
    32,
    180
  ],
  [
    33,
    179
  ],
  [
    34,
    180
  ],
  [
    35,
    179
  ],
  [
    36,
    177
  ],
  [
    37,
    182
  ],
  [
    24,
    171
  ],
  [
    25,
    170
  ],
  [
    26,
    172
  ],
  [
    27,
    172
  ],
  [
    28,
    174
  ],
  [
    29,
    173
  ],
  [
    31,
    174
  ],
  [
    30,
    175
  ]
]), n37 = t([
  [
    0,
    1
  ],
  [
    1,
    0
  ],
  [
    2,
    181
  ],
  [
    3,
    182
  ],
  [
    4,
    183
  ],
  [
    5,
    184
  ],
  [
    6,
    185
  ],
  [
    7,
    180
  ],
  [
    8,
    179
  ],
  [
    9,
    178
  ],
  [
    10,
    177
  ],
  [
    11,
    176
  ],
  [
    12,
    175
  ],
  [
    13,
    174
  ],
  [
    14,
    173
  ],
  [
    15,
    172
  ],
  [
    16,
    171
  ],
  [
    17,
    170
  ],
  [
    18,
    169
  ],
  [
    19,
    164
  ],
  [
    20,
    165
  ],
  [
    21,
    166
  ],
  [
    22,
    167
  ],
  [
    23,
    168
  ],
  [
    24,
    180
  ],
  [
    25,
    185
  ],
  [
    26,
    179
  ],
  [
    27,
    179
  ],
  [
    28,
    177
  ],
  [
    29,
    178
  ],
  [
    30,
    176
  ],
  [
    31,
    177
  ],
  [
    32,
    169
  ],
  [
    33,
    170
  ],
  [
    34,
    169
  ],
  [
    35,
    170
  ],
  [
    36,
    172
  ],
  [
    37,
    165
  ],
  [
    38,
    164
  ]
]), n38 = t([
  [
    32,
    201
  ],
  [
    33,
    200
  ],
  [
    34,
    201
  ],
  [
    35,
    200
  ],
  [
    36,
    198
  ],
  [
    37,
    203
  ],
  [
    24,
    191
  ],
  [
    25,
    191
  ],
  [
    26,
    192
  ],
  [
    27,
    192
  ],
  [
    28,
    194
  ],
  [
    29,
    193
  ],
  [
    31,
    194
  ],
  [
    30,
    195
  ]
]), n39 = t([
  [
    32,
    201
  ],
  [
    33,
    200
  ],
  [
    34,
    201
  ],
  [
    35,
    200
  ],
  [
    36,
    198
  ],
  [
    37,
    203
  ],
  [
    24,
    193
  ],
  [
    25,
    192
  ],
  [
    26,
    194
  ],
  [
    27,
    194
  ],
  [
    28,
    196
  ],
  [
    29,
    195
  ],
  [
    31,
    196
  ],
  [
    30,
    197
  ]
]), n40 = t([
  [
    32,
    201
  ],
  [
    33,
    200
  ],
  [
    34,
    201
  ],
  [
    35,
    200
  ],
  [
    36,
    198
  ],
  [
    37,
    203
  ],
  [
    24,
    192
  ],
  [
    25,
    191
  ],
  [
    26,
    193
  ],
  [
    27,
    193
  ],
  [
    28,
    195
  ],
  [
    29,
    194
  ],
  [
    31,
    195
  ],
  [
    30,
    196
  ]
]), n41 = t([
  [
    0,
    1
  ],
  [
    1,
    0
  ],
  [
    2,
    202
  ],
  [
    3,
    203
  ],
  [
    4,
    204
  ],
  [
    5,
    205
  ],
  [
    6,
    206
  ],
  [
    7,
    201
  ],
  [
    8,
    200
  ],
  [
    9,
    199
  ],
  [
    10,
    198
  ],
  [
    11,
    197
  ],
  [
    12,
    196
  ],
  [
    13,
    195
  ],
  [
    14,
    194
  ],
  [
    15,
    193
  ],
  [
    16,
    192
  ],
  [
    17,
    191
  ],
  [
    18,
    191
  ],
  [
    19,
    186
  ],
  [
    20,
    187
  ],
  [
    21,
    188
  ],
  [
    22,
    189
  ],
  [
    23,
    190
  ],
  [
    24,
    201
  ],
  [
    25,
    206
  ],
  [
    26,
    200
  ],
  [
    27,
    200
  ],
  [
    28,
    198
  ],
  [
    29,
    199
  ],
  [
    30,
    197
  ],
  [
    31,
    198
  ],
  [
    32,
    191
  ],
  [
    33,
    191
  ],
  [
    34,
    191
  ],
  [
    35,
    191
  ],
  [
    36,
    193
  ],
  [
    37,
    187
  ],
  [
    38,
    186
  ]
]), n42 = t([
  [
    32,
    223
  ],
  [
    33,
    222
  ],
  [
    34,
    223
  ],
  [
    35,
    222
  ],
  [
    36,
    220
  ],
  [
    37,
    225
  ],
  [
    24,
    213
  ],
  [
    25,
    212
  ],
  [
    26,
    214
  ],
  [
    27,
    214
  ],
  [
    28,
    216
  ],
  [
    29,
    215
  ],
  [
    31,
    216
  ],
  [
    30,
    217
  ]
]), n43 = t([
  [
    32,
    223
  ],
  [
    33,
    222
  ],
  [
    34,
    223
  ],
  [
    35,
    222
  ],
  [
    36,
    220
  ],
  [
    37,
    225
  ],
  [
    24,
    215
  ],
  [
    25,
    214
  ],
  [
    26,
    216
  ],
  [
    27,
    216
  ],
  [
    28,
    218
  ],
  [
    29,
    217
  ],
  [
    31,
    218
  ],
  [
    30,
    219
  ]
]), n44 = t([
  [
    32,
    223
  ],
  [
    33,
    222
  ],
  [
    34,
    223
  ],
  [
    35,
    222
  ],
  [
    36,
    220
  ],
  [
    37,
    225
  ],
  [
    24,
    214
  ],
  [
    25,
    213
  ],
  [
    26,
    215
  ],
  [
    27,
    215
  ],
  [
    28,
    217
  ],
  [
    29,
    216
  ],
  [
    31,
    217
  ],
  [
    30,
    218
  ]
]), n45 = t([
  [
    0,
    1
  ],
  [
    1,
    0
  ],
  [
    2,
    224
  ],
  [
    3,
    225
  ],
  [
    4,
    226
  ],
  [
    5,
    227
  ],
  [
    6,
    228
  ],
  [
    7,
    223
  ],
  [
    8,
    222
  ],
  [
    9,
    221
  ],
  [
    10,
    220
  ],
  [
    11,
    219
  ],
  [
    12,
    218
  ],
  [
    13,
    217
  ],
  [
    14,
    216
  ],
  [
    15,
    215
  ],
  [
    16,
    214
  ],
  [
    17,
    213
  ],
  [
    18,
    212
  ],
  [
    19,
    207
  ],
  [
    20,
    208
  ],
  [
    21,
    209
  ],
  [
    22,
    210
  ],
  [
    23,
    211
  ],
  [
    24,
    223
  ],
  [
    25,
    228
  ],
  [
    26,
    222
  ],
  [
    27,
    222
  ],
  [
    28,
    220
  ],
  [
    29,
    221
  ],
  [
    30,
    219
  ],
  [
    31,
    220
  ],
  [
    32,
    212
  ],
  [
    33,
    213
  ],
  [
    34,
    212
  ],
  [
    35,
    213
  ],
  [
    36,
    215
  ],
  [
    37,
    208
  ],
  [
    38,
    207
  ]
]), n46 = t([
  [
    32,
    245
  ],
  [
    33,
    244
  ],
  [
    34,
    245
  ],
  [
    35,
    244
  ],
  [
    36,
    242
  ],
  [
    37,
    247
  ],
  [
    24,
    235
  ],
  [
    25,
    234
  ],
  [
    26,
    236
  ],
  [
    27,
    236
  ],
  [
    28,
    238
  ],
  [
    29,
    237
  ],
  [
    31,
    238
  ],
  [
    30,
    239
  ]
]), n47 = t([
  [
    32,
    245
  ],
  [
    33,
    244
  ],
  [
    34,
    245
  ],
  [
    35,
    244
  ],
  [
    36,
    242
  ],
  [
    37,
    247
  ],
  [
    24,
    237
  ],
  [
    25,
    236
  ],
  [
    26,
    238
  ],
  [
    27,
    238
  ],
  [
    28,
    240
  ],
  [
    29,
    239
  ],
  [
    31,
    240
  ],
  [
    30,
    241
  ]
]), n48 = t([
  [
    32,
    245
  ],
  [
    33,
    244
  ],
  [
    34,
    245
  ],
  [
    35,
    244
  ],
  [
    36,
    242
  ],
  [
    37,
    247
  ],
  [
    24,
    236
  ],
  [
    25,
    235
  ],
  [
    26,
    237
  ],
  [
    27,
    237
  ],
  [
    28,
    239
  ],
  [
    29,
    238
  ],
  [
    31,
    239
  ],
  [
    30,
    240
  ]
]), n49 = t([
  [
    0,
    1
  ],
  [
    1,
    0
  ],
  [
    2,
    246
  ],
  [
    3,
    247
  ],
  [
    4,
    248
  ],
  [
    5,
    249
  ],
  [
    6,
    250
  ],
  [
    7,
    245
  ],
  [
    8,
    244
  ],
  [
    9,
    243
  ],
  [
    10,
    242
  ],
  [
    11,
    241
  ],
  [
    12,
    240
  ],
  [
    13,
    239
  ],
  [
    14,
    238
  ],
  [
    15,
    237
  ],
  [
    16,
    236
  ],
  [
    17,
    235
  ],
  [
    18,
    234
  ],
  [
    19,
    229
  ],
  [
    20,
    230
  ],
  [
    21,
    231
  ],
  [
    22,
    232
  ],
  [
    23,
    233
  ],
  [
    24,
    245
  ],
  [
    25,
    250
  ],
  [
    26,
    244
  ],
  [
    27,
    244
  ],
  [
    28,
    242
  ],
  [
    29,
    243
  ],
  [
    30,
    241
  ],
  [
    31,
    242
  ],
  [
    32,
    234
  ],
  [
    33,
    235
  ],
  [
    34,
    234
  ],
  [
    35,
    235
  ],
  [
    36,
    237
  ],
  [
    37,
    230
  ],
  [
    38,
    229
  ]
]), n50 = t([
  [
    0,
    9
  ],
  [
    1,
    16
  ],
  [
    2,
    19
  ],
  [
    3,
    20
  ],
  [
    4,
    21
  ],
  [
    5,
    22
  ],
  [
    6,
    23
  ],
  [
    7,
    18
  ],
  [
    8,
    17
  ],
  [
    9,
    16
  ],
  [
    10,
    15
  ],
  [
    11,
    14
  ],
  [
    12,
    13
  ],
  [
    13,
    12
  ],
  [
    14,
    11
  ],
  [
    15,
    10
  ],
  [
    16,
    9
  ],
  [
    17,
    8
  ],
  [
    18,
    7
  ],
  [
    19,
    2
  ],
  [
    20,
    3
  ],
  [
    21,
    4
  ],
  [
    22,
    5
  ],
  [
    23,
    6
  ],
  [
    24,
    18
  ],
  [
    25,
    17
  ],
  [
    26,
    23
  ],
  [
    27,
    23
  ],
  [
    28,
    15
  ],
  [
    29,
    14
  ],
  [
    30,
    16
  ],
  [
    31,
    15
  ],
  [
    32,
    7
  ],
  [
    33,
    8
  ],
  [
    34,
    7
  ],
  [
    35,
    8
  ],
  [
    36,
    10
  ],
  [
    37,
    3
  ],
  [
    38,
    2
  ]
]), n51 = t([
  [
    32,
    266
  ],
  [
    33,
    265
  ],
  [
    34,
    266
  ],
  [
    35,
    265
  ],
  [
    36,
    177
  ],
  [
    37,
    268
  ],
  [
    24,
    257
  ],
  [
    25,
    258
  ],
  [
    26,
    256
  ],
  [
    27,
    256
  ],
  [
    28,
    260
  ],
  [
    29,
    261
  ],
  [
    31,
    260
  ],
  [
    30,
    259
  ]
]), n52 = t([
  [
    32,
    266
  ],
  [
    33,
    265
  ],
  [
    34,
    266
  ],
  [
    35,
    265
  ],
  [
    36,
    177
  ],
  [
    37,
    268
  ],
  [
    24,
    259
  ],
  [
    25,
    260
  ],
  [
    26,
    258
  ],
  [
    27,
    258
  ],
  [
    28,
    262
  ],
  [
    29,
    263
  ],
  [
    31,
    262
  ],
  [
    30,
    261
  ]
]), n53 = t([
  [
    32,
    266
  ],
  [
    33,
    265
  ],
  [
    34,
    266
  ],
  [
    35,
    265
  ],
  [
    36,
    177
  ],
  [
    37,
    268
  ],
  [
    24,
    258
  ],
  [
    25,
    259
  ],
  [
    26,
    257
  ],
  [
    27,
    257
  ],
  [
    28,
    261
  ],
  [
    29,
    262
  ],
  [
    31,
    261
  ],
  [
    30,
    260
  ]
]), n54 = t([
  [
    0,
    9
  ],
  [
    1,
    16
  ],
  [
    2,
    267
  ],
  [
    3,
    268
  ],
  [
    4,
    269
  ],
  [
    5,
    270
  ],
  [
    6,
    271
  ],
  [
    7,
    266
  ],
  [
    8,
    265
  ],
  [
    9,
    264
  ],
  [
    10,
    177
  ],
  [
    11,
    263
  ],
  [
    12,
    262
  ],
  [
    13,
    261
  ],
  [
    14,
    260
  ],
  [
    15,
    259
  ],
  [
    16,
    258
  ],
  [
    17,
    257
  ],
  [
    18,
    256
  ],
  [
    19,
    251
  ],
  [
    20,
    252
  ],
  [
    21,
    253
  ],
  [
    22,
    254
  ],
  [
    23,
    255
  ],
  [
    24,
    266
  ],
  [
    25,
    265
  ],
  [
    26,
    271
  ],
  [
    27,
    271
  ],
  [
    28,
    177
  ],
  [
    29,
    263
  ],
  [
    30,
    264
  ],
  [
    31,
    177
  ],
  [
    32,
    256
  ],
  [
    33,
    257
  ],
  [
    34,
    256
  ],
  [
    35,
    257
  ],
  [
    36,
    259
  ],
  [
    37,
    252
  ],
  [
    38,
    251
  ]
]), n55 = t([
  [
    32,
    287
  ],
  [
    33,
    286
  ],
  [
    34,
    287
  ],
  [
    35,
    286
  ],
  [
    36,
    198
  ],
  [
    37,
    289
  ],
  [
    24,
    278
  ],
  [
    25,
    279
  ],
  [
    26,
    277
  ],
  [
    27,
    277
  ],
  [
    28,
    281
  ],
  [
    29,
    282
  ],
  [
    31,
    281
  ],
  [
    30,
    280
  ]
]), n56 = t([
  [
    32,
    287
  ],
  [
    33,
    286
  ],
  [
    34,
    287
  ],
  [
    35,
    286
  ],
  [
    36,
    198
  ],
  [
    37,
    289
  ],
  [
    24,
    280
  ],
  [
    25,
    281
  ],
  [
    26,
    279
  ],
  [
    27,
    279
  ],
  [
    28,
    283
  ],
  [
    29,
    284
  ],
  [
    31,
    283
  ],
  [
    30,
    282
  ]
]), n57 = t([
  [
    32,
    287
  ],
  [
    33,
    286
  ],
  [
    34,
    287
  ],
  [
    35,
    286
  ],
  [
    36,
    198
  ],
  [
    37,
    289
  ],
  [
    24,
    279
  ],
  [
    25,
    280
  ],
  [
    26,
    278
  ],
  [
    27,
    278
  ],
  [
    28,
    282
  ],
  [
    29,
    283
  ],
  [
    31,
    282
  ],
  [
    30,
    281
  ]
]), n58 = t([
  [
    0,
    9
  ],
  [
    1,
    16
  ],
  [
    2,
    288
  ],
  [
    3,
    289
  ],
  [
    4,
    290
  ],
  [
    5,
    291
  ],
  [
    6,
    292
  ],
  [
    7,
    287
  ],
  [
    8,
    286
  ],
  [
    9,
    285
  ],
  [
    10,
    198
  ],
  [
    11,
    284
  ],
  [
    12,
    283
  ],
  [
    13,
    282
  ],
  [
    14,
    281
  ],
  [
    15,
    280
  ],
  [
    16,
    279
  ],
  [
    17,
    278
  ],
  [
    18,
    277
  ],
  [
    19,
    272
  ],
  [
    20,
    273
  ],
  [
    21,
    274
  ],
  [
    22,
    275
  ],
  [
    23,
    276
  ],
  [
    24,
    287
  ],
  [
    25,
    286
  ],
  [
    26,
    292
  ],
  [
    27,
    292
  ],
  [
    28,
    198
  ],
  [
    29,
    284
  ],
  [
    30,
    285
  ],
  [
    31,
    198
  ],
  [
    32,
    277
  ],
  [
    33,
    278
  ],
  [
    34,
    277
  ],
  [
    35,
    278
  ],
  [
    36,
    280
  ],
  [
    37,
    273
  ],
  [
    38,
    272
  ]
]), n59 = t([
  [
    32,
    308
  ],
  [
    33,
    307
  ],
  [
    34,
    308
  ],
  [
    35,
    307
  ],
  [
    36,
    220
  ],
  [
    37,
    310
  ],
  [
    24,
    299
  ],
  [
    25,
    300
  ],
  [
    26,
    298
  ],
  [
    27,
    298
  ],
  [
    28,
    302
  ],
  [
    29,
    303
  ],
  [
    31,
    302
  ],
  [
    30,
    301
  ]
]), n60 = t([
  [
    32,
    308
  ],
  [
    33,
    307
  ],
  [
    34,
    308
  ],
  [
    35,
    307
  ],
  [
    36,
    220
  ],
  [
    37,
    310
  ],
  [
    24,
    301
  ],
  [
    25,
    302
  ],
  [
    26,
    300
  ],
  [
    27,
    300
  ],
  [
    28,
    304
  ],
  [
    29,
    305
  ],
  [
    31,
    304
  ],
  [
    30,
    303
  ]
]), n61 = t([
  [
    32,
    308
  ],
  [
    33,
    307
  ],
  [
    34,
    308
  ],
  [
    35,
    307
  ],
  [
    36,
    220
  ],
  [
    37,
    310
  ],
  [
    24,
    300
  ],
  [
    25,
    301
  ],
  [
    26,
    299
  ],
  [
    27,
    299
  ],
  [
    28,
    303
  ],
  [
    29,
    304
  ],
  [
    31,
    303
  ],
  [
    30,
    302
  ]
]), n62 = t([
  [
    0,
    9
  ],
  [
    1,
    16
  ],
  [
    2,
    309
  ],
  [
    3,
    310
  ],
  [
    4,
    311
  ],
  [
    5,
    312
  ],
  [
    6,
    313
  ],
  [
    7,
    308
  ],
  [
    8,
    307
  ],
  [
    9,
    306
  ],
  [
    10,
    220
  ],
  [
    11,
    305
  ],
  [
    12,
    304
  ],
  [
    13,
    303
  ],
  [
    14,
    302
  ],
  [
    15,
    301
  ],
  [
    16,
    300
  ],
  [
    17,
    299
  ],
  [
    18,
    298
  ],
  [
    19,
    293
  ],
  [
    20,
    294
  ],
  [
    21,
    295
  ],
  [
    22,
    296
  ],
  [
    23,
    297
  ],
  [
    24,
    308
  ],
  [
    25,
    307
  ],
  [
    26,
    313
  ],
  [
    27,
    313
  ],
  [
    28,
    220
  ],
  [
    29,
    305
  ],
  [
    30,
    306
  ],
  [
    31,
    220
  ],
  [
    32,
    298
  ],
  [
    33,
    299
  ],
  [
    34,
    298
  ],
  [
    35,
    299
  ],
  [
    36,
    301
  ],
  [
    37,
    294
  ],
  [
    38,
    293
  ]
]), n63 = t([
  [
    32,
    329
  ],
  [
    33,
    328
  ],
  [
    34,
    329
  ],
  [
    35,
    328
  ],
  [
    36,
    242
  ],
  [
    37,
    331
  ],
  [
    24,
    320
  ],
  [
    25,
    321
  ],
  [
    26,
    319
  ],
  [
    27,
    319
  ],
  [
    28,
    323
  ],
  [
    29,
    324
  ],
  [
    31,
    323
  ],
  [
    30,
    322
  ]
]), n64 = t([
  [
    32,
    329
  ],
  [
    33,
    328
  ],
  [
    34,
    329
  ],
  [
    35,
    328
  ],
  [
    36,
    242
  ],
  [
    37,
    331
  ],
  [
    24,
    322
  ],
  [
    25,
    323
  ],
  [
    26,
    321
  ],
  [
    27,
    321
  ],
  [
    28,
    325
  ],
  [
    29,
    326
  ],
  [
    31,
    325
  ],
  [
    30,
    324
  ]
]), n65 = t([
  [
    32,
    329
  ],
  [
    33,
    328
  ],
  [
    34,
    329
  ],
  [
    35,
    328
  ],
  [
    36,
    242
  ],
  [
    37,
    331
  ],
  [
    24,
    321
  ],
  [
    25,
    322
  ],
  [
    26,
    320
  ],
  [
    27,
    320
  ],
  [
    28,
    324
  ],
  [
    29,
    325
  ],
  [
    31,
    324
  ],
  [
    30,
    323
  ]
]), n66 = t([
  [
    0,
    9
  ],
  [
    1,
    16
  ],
  [
    2,
    330
  ],
  [
    3,
    331
  ],
  [
    4,
    332
  ],
  [
    5,
    333
  ],
  [
    6,
    334
  ],
  [
    7,
    329
  ],
  [
    8,
    328
  ],
  [
    9,
    327
  ],
  [
    10,
    242
  ],
  [
    11,
    326
  ],
  [
    12,
    325
  ],
  [
    13,
    324
  ],
  [
    14,
    323
  ],
  [
    15,
    322
  ],
  [
    16,
    321
  ],
  [
    17,
    320
  ],
  [
    18,
    319
  ],
  [
    19,
    314
  ],
  [
    20,
    315
  ],
  [
    21,
    316
  ],
  [
    22,
    317
  ],
  [
    23,
    318
  ],
  [
    24,
    329
  ],
  [
    25,
    328
  ],
  [
    26,
    334
  ],
  [
    27,
    334
  ],
  [
    28,
    242
  ],
  [
    29,
    326
  ],
  [
    30,
    327
  ],
  [
    31,
    242
  ],
  [
    32,
    319
  ],
  [
    33,
    320
  ],
  [
    34,
    319
  ],
  [
    35,
    320
  ],
  [
    36,
    322
  ],
  [
    37,
    315
  ],
  [
    38,
    314
  ]
]), themes = {
  light: n1,
  dark: n2,
  light_accent: n3,
  dark_accent: n4,
  light_black: n5,
  light_white: n6,
  light_blue: n7,
  light_red: n8,
  light_yellow: n9,
  light_green: n10,
  dark_black: n11,
  dark_white: n12,
  dark_blue: n13,
  dark_red: n14,
  dark_yellow: n15,
  dark_green: n16,
  light_ListItem: n17,
  light_SelectTrigger: n17,
  light_Card: n17,
  light_Progress: n17,
  light_TooltipArrow: n17,
  light_SliderTrack: n17,
  light_Input: n17,
  light_TextArea: n17,
  light_white_ListItem: n17,
  light_white_SelectTrigger: n17,
  light_white_Card: n17,
  light_white_Progress: n17,
  light_white_TooltipArrow: n17,
  light_white_SliderTrack: n17,
  light_white_Input: n17,
  light_white_TextArea: n17,
  light_Button: n18,
  light_SliderTrackActive: n18,
  light_white_Button: n18,
  light_white_SliderTrackActive: n18,
  light_Checkbox: n19,
  light_Switch: n19,
  light_TooltipContent: n19,
  light_RadioGroupItem: n19,
  light_white_Checkbox: n19,
  light_white_Switch: n19,
  light_white_TooltipContent: n19,
  light_white_RadioGroupItem: n19,
  light_SwitchThumb: n20,
  light_SliderThumb: n20,
  light_Tooltip: n20,
  light_ProgressIndicator: n20,
  light_white_SwitchThumb: n20,
  light_white_SliderThumb: n20,
  light_white_Tooltip: n20,
  light_white_ProgressIndicator: n20,
  dark_ListItem: n21,
  dark_SelectTrigger: n21,
  dark_Card: n21,
  dark_Progress: n21,
  dark_TooltipArrow: n21,
  dark_SliderTrack: n21,
  dark_Input: n21,
  dark_TextArea: n21,
  dark_black_ListItem: n21,
  dark_black_SelectTrigger: n21,
  dark_black_Card: n21,
  dark_black_Progress: n21,
  dark_black_TooltipArrow: n21,
  dark_black_SliderTrack: n21,
  dark_black_Input: n21,
  dark_black_TextArea: n21,
  dark_Button: n22,
  dark_SliderTrackActive: n22,
  dark_black_Button: n22,
  dark_black_SliderTrackActive: n22,
  dark_Checkbox: n23,
  dark_Switch: n23,
  dark_TooltipContent: n23,
  dark_RadioGroupItem: n23,
  dark_black_Checkbox: n23,
  dark_black_Switch: n23,
  dark_black_TooltipContent: n23,
  dark_black_RadioGroupItem: n23,
  dark_SwitchThumb: n24,
  dark_SliderThumb: n24,
  dark_Tooltip: n24,
  dark_ProgressIndicator: n24,
  dark_black_SwitchThumb: n24,
  dark_black_SliderThumb: n24,
  dark_black_Tooltip: n24,
  dark_black_ProgressIndicator: n24,
  light_accent_ListItem: n25,
  light_accent_SelectTrigger: n25,
  light_accent_Card: n25,
  light_accent_Progress: n25,
  light_accent_TooltipArrow: n25,
  light_accent_SliderTrack: n25,
  light_accent_Input: n25,
  light_accent_TextArea: n25,
  light_black_ListItem: n25,
  light_black_SelectTrigger: n25,
  light_black_Card: n25,
  light_black_Progress: n25,
  light_black_TooltipArrow: n25,
  light_black_SliderTrack: n25,
  light_black_Input: n25,
  light_black_TextArea: n25,
  light_accent_Button: n26,
  light_accent_SliderTrackActive: n26,
  light_black_Button: n26,
  light_black_SliderTrackActive: n26,
  light_accent_Checkbox: n27,
  light_accent_Switch: n27,
  light_accent_TooltipContent: n27,
  light_accent_RadioGroupItem: n27,
  light_black_Checkbox: n27,
  light_black_Switch: n27,
  light_black_TooltipContent: n27,
  light_black_RadioGroupItem: n27,
  light_accent_SwitchThumb: n28,
  light_accent_SliderThumb: n28,
  light_accent_Tooltip: n28,
  light_accent_ProgressIndicator: n28,
  dark_accent_ListItem: n29,
  dark_accent_SelectTrigger: n29,
  dark_accent_Card: n29,
  dark_accent_Progress: n29,
  dark_accent_TooltipArrow: n29,
  dark_accent_SliderTrack: n29,
  dark_accent_Input: n29,
  dark_accent_TextArea: n29,
  dark_white_ListItem: n29,
  dark_white_SelectTrigger: n29,
  dark_white_Card: n29,
  dark_white_Progress: n29,
  dark_white_TooltipArrow: n29,
  dark_white_SliderTrack: n29,
  dark_white_Input: n29,
  dark_white_TextArea: n29,
  dark_accent_Button: n30,
  dark_accent_SliderTrackActive: n30,
  dark_white_Button: n30,
  dark_white_SliderTrackActive: n30,
  dark_accent_Checkbox: n31,
  dark_accent_Switch: n31,
  dark_accent_TooltipContent: n31,
  dark_accent_RadioGroupItem: n31,
  dark_white_Checkbox: n31,
  dark_white_Switch: n31,
  dark_white_TooltipContent: n31,
  dark_white_RadioGroupItem: n31,
  dark_accent_SwitchThumb: n32,
  dark_accent_SliderThumb: n32,
  dark_accent_Tooltip: n32,
  dark_accent_ProgressIndicator: n32,
  light_black_SwitchThumb: n33,
  light_black_SliderThumb: n33,
  light_black_Tooltip: n33,
  light_black_ProgressIndicator: n33,
  light_blue_ListItem: n34,
  light_blue_SelectTrigger: n34,
  light_blue_Card: n34,
  light_blue_Progress: n34,
  light_blue_TooltipArrow: n34,
  light_blue_SliderTrack: n34,
  light_blue_Input: n34,
  light_blue_TextArea: n34,
  light_blue_Button: n35,
  light_blue_SliderTrackActive: n35,
  light_blue_Checkbox: n36,
  light_blue_Switch: n36,
  light_blue_TooltipContent: n36,
  light_blue_RadioGroupItem: n36,
  light_blue_SwitchThumb: n37,
  light_blue_SliderThumb: n37,
  light_blue_Tooltip: n37,
  light_blue_ProgressIndicator: n37,
  light_red_ListItem: n38,
  light_red_SelectTrigger: n38,
  light_red_Card: n38,
  light_red_Progress: n38,
  light_red_TooltipArrow: n38,
  light_red_SliderTrack: n38,
  light_red_Input: n38,
  light_red_TextArea: n38,
  light_red_Button: n39,
  light_red_SliderTrackActive: n39,
  light_red_Checkbox: n40,
  light_red_Switch: n40,
  light_red_TooltipContent: n40,
  light_red_RadioGroupItem: n40,
  light_red_SwitchThumb: n41,
  light_red_SliderThumb: n41,
  light_red_Tooltip: n41,
  light_red_ProgressIndicator: n41,
  light_yellow_ListItem: n42,
  light_yellow_SelectTrigger: n42,
  light_yellow_Card: n42,
  light_yellow_Progress: n42,
  light_yellow_TooltipArrow: n42,
  light_yellow_SliderTrack: n42,
  light_yellow_Input: n42,
  light_yellow_TextArea: n42,
  light_yellow_Button: n43,
  light_yellow_SliderTrackActive: n43,
  light_yellow_Checkbox: n44,
  light_yellow_Switch: n44,
  light_yellow_TooltipContent: n44,
  light_yellow_RadioGroupItem: n44,
  light_yellow_SwitchThumb: n45,
  light_yellow_SliderThumb: n45,
  light_yellow_Tooltip: n45,
  light_yellow_ProgressIndicator: n45,
  light_green_ListItem: n46,
  light_green_SelectTrigger: n46,
  light_green_Card: n46,
  light_green_Progress: n46,
  light_green_TooltipArrow: n46,
  light_green_SliderTrack: n46,
  light_green_Input: n46,
  light_green_TextArea: n46,
  light_green_Button: n47,
  light_green_SliderTrackActive: n47,
  light_green_Checkbox: n48,
  light_green_Switch: n48,
  light_green_TooltipContent: n48,
  light_green_RadioGroupItem: n48,
  light_green_SwitchThumb: n49,
  light_green_SliderThumb: n49,
  light_green_Tooltip: n49,
  light_green_ProgressIndicator: n49,
  dark_white_SwitchThumb: n50,
  dark_white_SliderThumb: n50,
  dark_white_Tooltip: n50,
  dark_white_ProgressIndicator: n50,
  dark_blue_ListItem: n51,
  dark_blue_SelectTrigger: n51,
  dark_blue_Card: n51,
  dark_blue_Progress: n51,
  dark_blue_TooltipArrow: n51,
  dark_blue_SliderTrack: n51,
  dark_blue_Input: n51,
  dark_blue_TextArea: n51,
  dark_blue_Button: n52,
  dark_blue_SliderTrackActive: n52,
  dark_blue_Checkbox: n53,
  dark_blue_Switch: n53,
  dark_blue_TooltipContent: n53,
  dark_blue_RadioGroupItem: n53,
  dark_blue_SwitchThumb: n54,
  dark_blue_SliderThumb: n54,
  dark_blue_Tooltip: n54,
  dark_blue_ProgressIndicator: n54,
  dark_red_ListItem: n55,
  dark_red_SelectTrigger: n55,
  dark_red_Card: n55,
  dark_red_Progress: n55,
  dark_red_TooltipArrow: n55,
  dark_red_SliderTrack: n55,
  dark_red_Input: n55,
  dark_red_TextArea: n55,
  dark_red_Button: n56,
  dark_red_SliderTrackActive: n56,
  dark_red_Checkbox: n57,
  dark_red_Switch: n57,
  dark_red_TooltipContent: n57,
  dark_red_RadioGroupItem: n57,
  dark_red_SwitchThumb: n58,
  dark_red_SliderThumb: n58,
  dark_red_Tooltip: n58,
  dark_red_ProgressIndicator: n58,
  dark_yellow_ListItem: n59,
  dark_yellow_SelectTrigger: n59,
  dark_yellow_Card: n59,
  dark_yellow_Progress: n59,
  dark_yellow_TooltipArrow: n59,
  dark_yellow_SliderTrack: n59,
  dark_yellow_Input: n59,
  dark_yellow_TextArea: n59,
  dark_yellow_Button: n60,
  dark_yellow_SliderTrackActive: n60,
  dark_yellow_Checkbox: n61,
  dark_yellow_Switch: n61,
  dark_yellow_TooltipContent: n61,
  dark_yellow_RadioGroupItem: n61,
  dark_yellow_SwitchThumb: n62,
  dark_yellow_SliderThumb: n62,
  dark_yellow_Tooltip: n62,
  dark_yellow_ProgressIndicator: n62,
  dark_green_ListItem: n63,
  dark_green_SelectTrigger: n63,
  dark_green_Card: n63,
  dark_green_Progress: n63,
  dark_green_TooltipArrow: n63,
  dark_green_SliderTrack: n63,
  dark_green_Input: n63,
  dark_green_TextArea: n63,
  dark_green_Button: n64,
  dark_green_SliderTrackActive: n64,
  dark_green_Checkbox: n65,
  dark_green_Switch: n65,
  dark_green_TooltipContent: n65,
  dark_green_RadioGroupItem: n65,
  dark_green_SwitchThumb: n66,
  dark_green_SliderThumb: n66,
  dark_green_Tooltip: n66,
  dark_green_ProgressIndicator: n66
};
function extractDuration(animation) {
  const msMatch = animation.match(/(\d+(?:\.\d+)?)\s*ms/);
  if (msMatch) return Number.parseInt(msMatch[1], 10);
  const sMatch = animation.match(/(\d+(?:\.\d+)?)\s*s/);
  return sMatch ? Math.round(Number.parseFloat(sMatch[1]) * 1e3) : 300;
}
function createAnimations(animations) {
  const reactionListeners = /* @__PURE__ */ new WeakMap();
  return {
    animations,
    usePresence,
    ResetPresence,
    supportsCSS: true,
    useAnimatedNumber(initial) {
      const [val, setVal] = React.useState(initial), [onFinish, setOnFinish] = reactExports.useState();
      return useIsomorphicLayoutEffect$2(() => {
        onFinish && (onFinish?.(), setOnFinish(void 0));
      }, [
        onFinish
      ]), {
        getInstance() {
          return setVal;
        },
        getValue() {
          return val;
        },
        setValue(next, config2, onFinish2) {
          setVal(next), setOnFinish(onFinish2);
        },
        stop() {
        }
      };
    },
    useAnimatedNumberReaction({ value }, onValue) {
      React.useEffect(() => {
        const instance = value.getInstance();
        let queue = reactionListeners.get(instance);
        if (!queue) {
          const next = /* @__PURE__ */ new Set();
          reactionListeners.set(instance, next), queue = next;
        }
        return queue.add(onValue), () => {
          queue?.delete(onValue);
        };
      }, []);
    },
    useAnimatedNumberStyle(val, getStyle) {
      return getStyle(val.getValue());
    },
    useAnimations: ({ props, presence, style, componentState, stateRef }) => {
      const isEntering = !!componentState.unmounted, isExiting = presence?.[0] === false, sendExitComplete = presence?.[1], [animationKey, animationConfig] = Array.isArray(props.animation) ? props.animation : [
        props.animation
      ], animation = animations[animationKey], keys = props.animateOnly ?? [
        "all"
      ];
      return useIsomorphicLayoutEffect$2(() => {
        const host = stateRef.current.host;
        if (!sendExitComplete || !isExiting || !host) return;
        const node = host, fallbackTimeout = animation ? extractDuration(animation) : 200, timeoutId = setTimeout(() => {
          sendExitComplete?.();
        }, fallbackTimeout), onFinishAnimation = () => {
          clearTimeout(timeoutId), sendExitComplete?.();
        };
        return node.addEventListener("transitionend", onFinishAnimation), node.addEventListener("transitioncancel", onFinishAnimation), () => {
          clearTimeout(timeoutId), node.removeEventListener("transitionend", onFinishAnimation), node.removeEventListener("transitioncancel", onFinishAnimation);
        };
      }, [
        sendExitComplete,
        isExiting
      ]), animation && (Array.isArray(style.transform) && (style.transform = transformsToString(style.transform)), style.transition = keys.map((key) => {
        const override = animations[animationConfig?.[key]] ?? animation;
        return `${key} ${override}`;
      }).join(", ")), animation ? {
        style,
        className: isEntering ? "t_unmounted" : ""
      } : null;
    }
  };
}
const smoothBezier = "cubic-bezier(0.215, 0.610, 0.355, 1.000)", animationsCSS = createAnimations({
  "75ms": "ease-in 75ms",
  "100ms": "ease-in 100ms",
  "200ms": "ease-in 200ms",
  bouncy: "ease-in 200ms",
  superBouncy: "ease-in 500ms",
  lazy: "ease-in 1000ms",
  medium: "ease-in 300ms",
  slow: "ease-in 500ms",
  quick: `${smoothBezier} 400ms`,
  quicker: `${smoothBezier} 300ms`,
  quickest: `${smoothBezier} 200ms`,
  tooltip: "ease-in 400ms"
});
const createSystemFont = ({ font = {}, sizeLineHeight = (size2) => size2 + 10, sizeSize = (size2) => size2 * 1 } = {}) => {
  const size2 = Object.fromEntries(Object.entries({
    ...defaultSizes,
    ...font.size
  }).map(([k, v]) => [
    k,
    sizeSize(+v)
  ]));
  return createFont({
    family: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    lineHeight: Object.fromEntries(Object.entries(size2).map(([k, v]) => [
      k,
      sizeLineHeight(getVariableValue(v))
    ])),
    weight: {
      4: "300"
    },
    letterSpacing: {
      4: 0
    },
    ...font,
    size: size2
  });
}, defaultSizes = {
  1: 11,
  2: 12,
  3: 13,
  4: 14,
  true: 14,
  5: 16,
  6: 18,
  7: 20,
  8: 23,
  9: 30,
  10: 46,
  11: 55,
  12: 62,
  13: 72,
  14: 92,
  15: 114,
  16: 134
}, fonts = {
  body: createSystemFont(),
  heading: createSystemFont({
    sizeSize: (n) => n * 1.4
  })
};
const breakpoints = {
  "2xl": 1536,
  xl: 1280,
  lg: 1024,
  md: 768,
  sm: 640,
  xs: 460,
  "2xs": 340
}, media = {
  maxXs: {
    maxWidth: breakpoints.xs
  },
  max2xs: {
    maxWidth: breakpoints["2xs"]
  },
  maxSm: {
    maxWidth: breakpoints.sm
  },
  maxMd: {
    maxWidth: breakpoints.md
  },
  maxLg: {
    maxWidth: breakpoints.lg
  },
  maxXl: {
    maxWidth: breakpoints.xl
  },
  max2Xl: {
    maxWidth: breakpoints["2xl"]
  },
  // for site
  "2xl": {
    minWidth: breakpoints["2xl"]
  },
  xl: {
    minWidth: breakpoints.xl
  },
  lg: {
    minWidth: breakpoints.lg
  },
  md: {
    minWidth: breakpoints.md
  },
  sm: {
    minWidth: breakpoints.sm
  },
  xs: {
    minWidth: breakpoints.xs
  },
  "2xs": {
    minWidth: breakpoints["2xs"]
  }
}, mediaQueryDefaultActive = {
  "2xl": false,
  xl: false,
  lg: false,
  md: false,
  sm: false,
  xs: true,
  "2xs": true
};
const selectionStyles = (theme) => theme.color5 ? {
  backgroundColor: theme.color5,
  color: theme.color11
} : null, settings = {
  mediaQueryDefaultActive,
  defaultFont: "body",
  fastSchemeChange: true,
  shouldAddPrefersColorThemes: true,
  allowedStyleValues: "somewhat-strict-web",
  themeClassNameOnRoot: true,
  onlyAllowShorthands: true,
  // allow two inverses (tooltips, etc)
  // TODO on inverse theme changes
  maxDarkLightNesting: 2
}, defaultConfig = {
  animations: animationsCSS,
  media,
  shorthands,
  themes,
  tokens,
  fonts,
  selectionStyles,
  settings
};
const config = createTamagui(defaultConfig);
function Layout() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", {
    lang: "en-US",
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("head", {
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("meta", {
            charSet: "utf-8"
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("meta", {
            httpEquiv: "X-UA-Compatible",
            content: "IE=edge"
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("meta", {
            property: "og:image",
            content: `${"http://localhost:8081"}/og.jpg`
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("meta", {
            property: "og:image:width",
            content: "1200"
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("meta", {
            property: "og:image:height",
            content: "630"
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("meta", {
            property: "twitter:card",
            content: "summary_large_image"
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("meta", {
            property: "twitter:image",
            content: `${"http://localhost:8081"}/og.jpg`
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("meta", {
            name: "viewport",
            content: "width=device-width, initial-scale=1, maximum-scale=5"
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("link", {
            rel: "icon",
            href: "/favicon.svg"
          })
        ]
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoadProgressBar, {
        startDelay: 1e3
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AuthEffects, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DragDropFile, {
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(DataProvider, {
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SchemeProvider, {
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, {
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Slot, {})
            })
          })
        })
      })
    ]
  });
}
const DataProvider = ({ children }) => {
  const [instance, setInstance] = reactExports.useState(zero);
  useZeroEmit((next) => {
    setInstance(next);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ZeroProvider, {
    zero: instance,
    children
  });
};
const ThemeProvider = ({ children }) => {
  const [scheme] = useColorScheme();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TamaguiProvider, {
    disableInjectCSS: true,
    config,
    defaultTheme: scheme,
    children
  });
};
export {
  Layout as default
};
