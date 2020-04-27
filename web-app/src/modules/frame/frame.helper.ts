export const getOperatorsOf = (element: HTMLDivElement) => ({
  setViewportVH: (event: React.ChangeEvent<Window>) => {
    const window = event.target;
    const viewportVH = window.innerHeight * 0.01;

    // DOTO: Take out a function to Shared module
    element.style.setProperty('--viewportVH', `${viewportVH}px`);
  },
  onWindowResize: (event: React.ChangeEvent<Window>) => {
    const window = event.target;
    const isViewportOutOfWindow = window.pageYOffset < 0;

    if (isViewportOutOfWindow) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  },
});