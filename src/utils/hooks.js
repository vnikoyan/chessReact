import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

export function useAction(action) {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(action, dispatch), [
    action,
    dispatch,
  ]);
}

export function useOutsideClick(ref, callback) {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
}
