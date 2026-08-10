export type CircleLoaderProps = {
  animationName: string;
  onComplete?: () => void;
};

export function CircleLoader({ onComplete, animationName }: CircleLoaderProps) {
  return (
    <div className="absolute w-screen h-screen inset-0 flex justify-center items-center opacity-60 overflow-hidden">
      <div
        className={`w-10 h-10 bg-white rounded-full ${animationName}`}
        onAnimationEnd={onComplete}
      ></div>
    </div>
  );
}
