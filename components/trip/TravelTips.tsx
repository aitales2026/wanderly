interface TravelTipsProps {
  tips: string[];
}

export function TravelTips({ tips }: TravelTipsProps) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <div className="rounded-2xl bg-ai p-6">
        <h2 className="mb-4 text-2xl font-semibold text-foreground">旅行小贴士</h2>
        <ul className="space-y-3">
          {tips.map((tip, index) => (
            <li key={index} className="flex gap-3 text-base text-foreground">
              <span className="flex-shrink-0 text-accent">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
