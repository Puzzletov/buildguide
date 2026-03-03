interface ProgressBarProps {
  total: number;
  currentIndex: number;
}

export function ProgressBar({ total, currentIndex }: ProgressBarProps) {
  return (
    <div className="step-progress" data-testid="steps-progress">
      {Array.from({ length: total }, (_, i) => {
        const cls = i < currentIndex ? "sp-dot done" : i === currentIndex ? "sp-dot active" : "sp-dot";
        return <div className={cls} key={i} />;
      })}
    </div>
  );
}


