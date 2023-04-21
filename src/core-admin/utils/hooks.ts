import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export const useSafeSetState = <T>(
  initialState?: T | (() => T)
): [T | undefined, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState(initialState);

  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const safeSetState = useCallback(
    (args: any) => {
      if (mountedRef.current) {
        return setState(args);
      }
    },
    [mountedRef, setState]
  );

  return [state, safeSetState];
};

/**
 * A hook that returns true once a delay has expired.
 *
 * @param ms: The delay in milliseconds
 * @param key: A key that can be used to reset the timer
 *
 * @returns true if the delay has expired, false otherwise
 */
export const useTimeout = (ms: number = 0, key: string = "") => {
  const [isReady, setIsReady] = useSafeSetState(false);

  useEffect(() => {
    setIsReady(false);

    let timer = setTimeout(() => setIsReady(true), ms);

    return () => {
      clearTimeout(timer);
    };
  }, [key, ms, setIsReady]);

  return isReady;
};

export const useIsMounted = () => {
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};
