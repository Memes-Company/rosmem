export const isArray = <T = unknown>(object: any): object is Array<T> => {
  return object?.constructor?.name === 'Array';
};