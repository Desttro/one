import { c as createComponent, v as validStyles, s as stackDefaultStyles, u as useThemeWithState, C as ComponentContext, G as GroupContext, a as useComponentState, g as getConfig, m as mediaState, b as useMedia, d as useSplitStyles, e as useIsomorphicLayoutEffect, f as subscribeToContextGroup } from "./authClient-DTdP_buj.js";
import { R as React } from "../_virtual_one-entry.js";
const Stack = createComponent({
  acceptsClassName: true,
  defaultProps: stackDefaultStyles,
  validStyles
});
Stack.displayName = "Stack";
function useProps(props, opts) {
  const [propsOut, styleOut] = usePropsAndStyle(props, {
    ...opts,
    noExpand: true,
    noNormalize: true,
    resolveValues: "none"
  });
  return {
    ...propsOut,
    ...styleOut
  };
}
function usePropsAndStyle(props, opts) {
  const staticConfig = opts?.forComponent?.staticConfig ?? Stack.staticConfig, [theme, themeState] = useThemeWithState({
    componentName: staticConfig.componentName,
    name: "theme" in props ? props.theme : void 0,
    inverse: "themeInverse" in props ? props.themeInverse : void 0,
    needsUpdate() {
      return true;
    }
  }), componentContext = React.useContext(ComponentContext), groupContext = React.useContext(GroupContext), { state, disabled, setStateShallow } = useComponentState(props, componentContext.animationDriver, staticConfig, getConfig()), mediaStateNow = opts?.noMedia ? (
    // not safe to use mediaState but really marginal to hit this
    mediaState
  ) : useMedia(), splitStyles = useSplitStyles(props, staticConfig, theme, themeState?.name || "", state, {
    isAnimated: false,
    mediaState: mediaStateNow,
    noSkip: true,
    noMergeStyle: true,
    noClass: true,
    resolveValues: "auto",
    ...opts
  }, null, componentContext, groupContext), { mediaGroups, pseudoGroups } = splitStyles || {};
  return useIsomorphicLayoutEffect(() => {
    if (!disabled) {
      if (state.unmounted) {
        setStateShallow({
          unmounted: false
        });
        return;
      }
      if (groupContext) return subscribeToContextGroup({
        groupContext,
        setStateShallow,
        mediaGroups,
        pseudoGroups
      });
    }
  }, [
    disabled,
    groupContext,
    pseudoGroups ? Object.keys([
      ...pseudoGroups
    ]).join("") : 0,
    mediaGroups ? Object.keys([
      ...mediaGroups
    ]).join("") : 0
  ]), [
    splitStyles?.viewProps || {},
    splitStyles?.style || {},
    theme,
    mediaState
  ];
}
export {
  useProps as a,
  usePropsAndStyle as u
};
