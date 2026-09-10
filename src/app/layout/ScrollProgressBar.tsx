interface ScrollProgressBarProps {
  progress: number;
}

export function ScrollProgressBar({ progress }: ScrollProgressBarProps) {
  return (
    <div
      aria-hidden="true"
      className="h-0.5 origin-left bg-accent-a transition-transform duration-[120ms] ease-linear"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}
