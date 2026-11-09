export function LockLine({
  text,
  italic,
  start = 0,
}: {
  text: string;
  italic?: string;
  start?: number;
}) {
  const words = text.split(" ");
  const mark = italic?.toLocaleLowerCase("tr");
  return words.map((word, index) => {
    const bare = word.replace(/[.,’']/g, "").toLocaleLowerCase("tr");
    return (
      <span
        key={`${word}-${index}`}
        className={`lock-word${mark && bare === mark ? " italic" : ""}`}
        style={{ animationDelay: `${(start + index) * 70}ms` }}
      >
        {word}
        {index < words.length - 1 ? "\u00A0" : ""}
      </span>
    );
  });
}
