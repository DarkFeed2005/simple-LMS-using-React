import { useEffect, useState } from "react";
import type { Course } from "@/lib/courses.functions";

type Errors = Partial<Record<keyof Course, string>>;

type Props = {
  initial?: Course | null;
  onSubmit: (c: Course) => Promise<void> | void;
  onCancel?: () => void;
};

export function CourseForm({ initial, onSubmit, onCancel }: Props) {
  const [courseId, setCourseId] = useState(initial?.course_id ?? "");
  const [courseName, setCourseName] = useState(initial?.course_name ?? "");
  const [lecturer, setLecturer] = useState(initial?.lecturer ?? "");
  const [duration, setDuration] = useState<string>(
    initial ? String(initial.duration_weeks) : "",
  );
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setCourseId(initial?.course_id ?? "");
    setCourseName(initial?.course_name ?? "");
    setLecturer(initial?.lecturer ?? "");
    setDuration(initial ? String(initial.duration_weeks) : "");
    setErrors({});
  }, [initial]);

  const validate = (): Course | null => {
    const e: Errors = {};
    if (!courseId.trim()) e.course_id = "Required";
    if (!courseName.trim()) e.course_name = "Required";
    if (!lecturer.trim()) e.lecturer = "Required";
    const n = Number(duration);
    if (!duration.trim()) e.duration_weeks = "Required";
    else if (!Number.isFinite(n) || !Number.isInteger(n) || n <= 0)
      e.duration_weeks = "Must be a positive whole number";
    setErrors(e);
    if (Object.keys(e).length) return null;
    return {
      course_id: courseId.trim(),
      course_name: courseName.trim(),
      lecturer: lecturer.trim(),
      duration_weeks: n,
    };
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const data = validate();
    if (!data) return;
    setSubmitting(true);
    try {
      await onSubmit(data);
      if (!initial) {
        setCourseId("");
        setCourseName("");
        setLecturer("");
        setDuration("");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const isEdit = Boolean(initial);

  return (
    <form
      onSubmit={submit}
      className="glow-ring rounded-xl bg-panel p-6"
      aria-label={isEdit ? "Edit course" : "Add course"}
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {isEdit ? "Edit / patch" : "New / record"}
          </div>
          <h2 className="font-display text-xl font-semibold">
            {isEdit ? `Editing ${initial?.course_id}` : "Add course"}
          </h2>
        </div>
        <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
      </div>

      <div className="space-y-4">
        <Field label="Course ID" error={errors.course_id}>
          <input
            className="lms-input font-mono uppercase"
            placeholder="CS101"
            value={courseId}
            disabled={isEdit}
            onChange={(e) => setCourseId(e.target.value.toUpperCase())}
            maxLength={20}
          />
        </Field>
        <Field label="Course name" error={errors.course_name}>
          <input
            className="lms-input"
            placeholder="Web Development"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            maxLength={120}
          />
        </Field>
        <Field label="Lecturer" error={errors.lecturer}>
          <input
            className="lms-input"
            placeholder="Mr. Silva"
            value={lecturer}
            onChange={(e) => setLecturer(e.target.value)}
            maxLength={120}
          />
        </Field>
        <Field label="Duration (weeks)" error={errors.duration_weeks}>
          <input
            className="lms-input font-mono"
            inputMode="numeric"
            placeholder="12"
            value={duration}
            onChange={(e) => setDuration(e.target.value.replace(/[^\d]/g, ""))}
            maxLength={3}
          />
        </Field>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-50"
        >
          {submitting ? "Saving…" : isEdit ? "Save changes" : "Add course"}
          <span aria-hidden>→</span>
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-hairline px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
        )}
      </div>

      <style>{`
        .lms-input {
          width: 100%;
          background: transparent;
          border: 1px solid var(--hairline);
          border-radius: 8px;
          padding: 10px 12px;
          color: var(--foreground);
          font-size: 14px;
          transition: border-color .15s, box-shadow .15s;
        }
        .lms-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--primary) 25%, transparent);
        }
        .lms-input:disabled { opacity: .6; cursor: not-allowed; }
      `}</style>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </span>
        {error && (
          <span className="text-[11px] font-medium text-destructive">{error}</span>
        )}
      </div>
      {children}
    </label>
  );
}
