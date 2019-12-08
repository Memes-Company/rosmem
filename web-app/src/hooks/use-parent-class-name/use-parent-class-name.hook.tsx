export const useParentClassName = (className: string | undefined) => {
  return className ? " " + className : "";
}