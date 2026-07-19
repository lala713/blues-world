interface FallingPetalsProps {
  count?: number;
}

export const FallingPetals = ({ count = 12 }: FallingPetalsProps) => (
  <div className="petal-layer" aria-hidden="true">
    {Array.from({ length: count }, (_, index) => (
      <span
        className="petal"
        key={index}
        style={{
          left: `${8 + index * (84 / count)}%`,
          animationDelay: `${index * 0.9}s`,
          animationDuration: `${9 + (index % 4)}s`
        }}
      />
    ))}
  </div>
);
