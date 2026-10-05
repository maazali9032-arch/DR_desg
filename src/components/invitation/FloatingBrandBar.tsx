/** Displays only the approved public shop name. */
export function FloatingBrandBar({ name }: { name?: string }) {
  if (!name) return null;
  return (
    <aside className="brand-ribbon" aria-label={name}>
      <div className="brand-marquee" aria-hidden="true">
        {[0, 1].map((copy) => (
          <span key={copy}>
            {[0, 1, 2, 3].map((item) => (
              <span key={item}>
                {name}
                <span className="mx-10">◇</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </aside>
  );
}
