import isComponentType from '../utils/is-component-type';

export default function searchChildrenForAppearOrCodePaneTransitions(children) {
  if (!Array.isArray(children)) {
    return 0;
  }
  return children.reduce((memo, current) => {
    isComponentType(current, 'CodePane') && console.log(current);
    if (isComponentType(current, 'Appear')) {
      memo += 1;
    } else if (
      isComponentType(current, 'CodePane') &&
      !!Object.keys(current.props).includes('wantedLines')
    ) {
      current.props['wantedLines'].forEach(() => (memo += 1));
    } else if (current.props.children && current.props.children.length > 0) {
      memo += searchChildrenForAppearOrCodePaneTransitions(
        current.props.children
      );
    }
    return memo;
  }, 0);
}
