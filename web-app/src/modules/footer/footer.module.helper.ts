export const getOperatorsOf = (element: HTMLDivElement) => ({
  setBackgroundColor: (ratio: number): void => {
    const high = getVariable('--high-boundary-color').of(element);
    const low = getVariable('--low-boundary-color').of(element);

    const red = getUpdatedColorSegment(high.red, low.red, ratio);
    const green = getUpdatedColorSegment(high.green, low.green, ratio);
    const blue = getUpdatedColorSegment(high.blue, low.blue, ratio);

    element.style.setProperty('--footer-background-color', `${red}, ${green}, ${blue}`);
  },
  setColor: (ratio: number): void => {
    if (ratio > .8) {
      element.style.setProperty('--footer-color', 'white');
    } else {
      element.style.setProperty('--footer-color', 'black');
    }

  }
})

export const setVariable = (variable: string) => ({
  of: (element: HTMLDivElement) => ({
    to: (red: number, green: number, blue:number): void => {
      element.style.setProperty(variable, `${red}, ${green}, ${blue}`);
    },
  }),
});

export const getVariable = (variable: string) => ({
  of: (element: HTMLDivElement): RGB => {
    const [ red, green, blue ] = getComputedStyle(element).getPropertyValue(variable).trim().split(', ');

    return {
      red: +red,
      green: +green,
      blue: +blue,
    };
  },
});

export const getUpdatedColorSegment = (highBoundary: number, lowBoundary: number, ratio: number) => {
  const differenceColorSegment = Math.round((highBoundary - lowBoundary) * ratio);

  return differenceColorSegment + lowBoundary;
};

export interface RGB {
  red: number;
  green: number;
  blue: number;
}