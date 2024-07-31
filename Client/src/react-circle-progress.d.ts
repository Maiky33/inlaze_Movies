declare module 'react-circle-progress' {
    interface CircleProgressProps {
      progress: number;
      strokeWidth?: number;
      text?: string;
      color?: string;
      trailColor?: string;
      radius?: number;
    }
  
    export const CircleProgress: React.FC<CircleProgressProps>;
  }
  