export const getOperatorsOf = (rootElement: HTMLDivElement) => ({
  rootIsParentOf(element: HTMLDivElement) {
    let parent = element.parentElement;

    while (parent) {
      if (parent === rootElement) {
        return true;
      }

      parent = parent.parentElement;
    }

    return false;
  },
});
