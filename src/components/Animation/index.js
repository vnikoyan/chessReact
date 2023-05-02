import { CSSTransition } from "react-transition-group";

export const FadeTransition = (props) => (
  <CSSTransition
    {...props}
    classNames="example"
    exit
    appear
    timeout={{ enter: 300, exit: 300 }}
  />
);
