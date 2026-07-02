import type { Course } from "@/lib/courses.functions";

type Props = {
  courses: Course[];
  total: number;
  onEdit: (c: Course) => void;
  onDelete: (id: string) => void;
};

function railColor(weeks: number): string {
  if (weeks <= 6) return "var(--rail-short)";
  if (weeks <= 16) return "var(--rail-medium)";
  return "var(--rail-long)";
}

function railLabel(weeks: number): string {
  if (weeks <= 6) return "short";
  if (weeks <= 16) return "medium";
  return "long";
}

export function CourseList({ courses, total, onEdit, onDelete }: Props) {
  if (total === 0) {
    return (
      <div className="rounded-xl border border-dashed border-hairline bg-panel/40 p-10 text-center">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Empty manifest
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Add your first course on the left to see it appear here.
        </p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="rounded-xl border border-hairline bg-panel/40 p-8 text-center text-sm text-muted-foreground">
        No courses match your search.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-hairline overflow-hidden rounded-xl border border-hairline bg-panel">
      {courses.map((c) => (
        <li
          key={c.course_id}
          className="group relative grid grid-cols-[8px_1fr_auto] items-center gap-4 px-4 py-4 transition hover:bg-foreground/[0.02] sm:px-5"
        >
          <span
            aria-hidden
            className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r"
            style={{ background: railColor(c.duration_weeks) }}
          />
          <span />
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-[13px] font-semibold text-primary">
                {c.course_id}
              </span>
              <span className="truncate font-display text-base font-semibold text-foreground">
                {c.course_name}
              </span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-muted-foreground">
              <span>{c.lecturer}</span>
              <span className="font-mono tabular-nums">{c.duration_weeks} wks</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
                {railLabel(c.duration_weeks)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 opacity-70 transition group-hover:opacity-100">
            <button
              type="button"
              onClick={() => onEdit(c)}
              className="rounded-md border border-hairline px-2.5 py-1 text-xs font-medium text-foreground transition hover:border-primary hover:text-primary"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(c.course_id)}
              className="rounded-md border border-hairline px-2.5 py-1 text-xs font-medium text-muted-foreground transition hover:border-destructive hover:text-destructive"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
