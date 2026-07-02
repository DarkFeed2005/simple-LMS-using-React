type Props = { value: string; onChange: (v: string) => void };

export function SearchCourse({ value, onChange }: Props) {
  return (
    <div className="relative">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by ID or name…"
        className="w-64 rounded-md border border-hairline bg-panel px-3 py-2 pl-9 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
      <svg
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3-3" />
      </svg>
    </div>
  );
}
