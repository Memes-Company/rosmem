export interface Props {
  children: (targetProps: TargetProps) => React.ReactNode;
}

export interface State extends TargetProps {

}

export interface TargetProps {
  isFocus: boolean;
  forwardedRef: React.RefObject<HTMLDivElement>;
}
