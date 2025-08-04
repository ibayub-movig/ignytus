declare module '@radix-ui/react-aspect-ratio' {
  import * as React from 'react';

  interface AspectRatioProps {
    ratio?: number;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
  }

  export const Root: React.ForwardRefExoticComponent<
    AspectRatioProps & React.RefAttributes<HTMLDivElement>
  >;
} 