import { FunctionComponent, ReactElement, ReactNode } from 'react';

declare global {
  // React.FC alias
  type FC<P = object> = FunctionComponent<P>;
  // ReactElement alias
  type RElem = ReactElement;
  // ReactNode alias
  type RNode = ReactNode;
  // children prop for React.FC
  type ChildrenWithin = {
    children?: ReactNode;
  };
  // Get the value type of the object with 'as const' declaration
  // - e.g. VT<typeof HTTPMethod> will be "GET" | "POST" | "PUT" | "DELETE" | ...
  type VT<T> = T[keyof T];
  // Non-empty array, same behavior as T[...T[]]
  type NonEmptyArray<T> = T[] & { 0: T };
}
