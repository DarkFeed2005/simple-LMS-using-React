import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import {
  addCourse,
  deleteCourse,
  listCourses,
  updateCourse,
  type Course,
} from "@/lib/courses.functions";
import { CourseForm } from "@/components/CourseForm";
import { SearchCourse } from "@/components/SearchCourse";
import { CourseList } from "@/components/CourseList";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Manifest LMS — Course Management" },
      { name: "description", content: "Add, search, edit and remove courses in a clean, fast LMS dashboard." },
    ],
  }),
  loader: async () => ({ courses: await listCourses() }),
  component: Index,
});

function Index() {
  const { courses: initial } = Route.useLoaderData();
  const router = useRouter();
  const add = useServerFn(addCourse);
  const update = useServerFn(updateCourse);
  const remove = useServerFn(deleteCourse);

  const [courses, setCourses] = useState<Course[]>(initial);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Course | null>(null);
  const [flash, setFlash] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);

  const refresh = async () => {
    await router.invalidate();
    const fresh = await listCourses();
    setCourses(fresh);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter(
      (c) =>
        c.course_id.toLowerCase().includes(q) ||
        c.course_name.toLowerCase().includes(q),
    );
  }, [courses, query]);

  const handleSubmit = async (c: Course) => {
    try {
      if (editing) {
        await update({ data: c });
        setFlash({ kind: "ok", msg: `Updated ${c.course_id}` });
        setEditing(null);
      } else {
        await add({ data: c });
        setFlash({ kind: "ok", msg: `Added ${c.course_id}` });
      }
      await refresh();
    } catch (e) {
      setFlash({ kind: "err", msg: e instanceof Error ? e.message : "Save failed" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Delete course ${id}? This cannot be undone.`)) return;
    try {
      await remove({ data: { course_id: id } });
      setFlash({ kind: "ok", msg: `Deleted ${id}` });
      if (editing?.course_id === id) setEditing(null);
      await refresh();
    } catch (e) {
      setFlash({ kind: "err", msg: e instanceof Error ? e.message : "Delete failed" });
    }
  };

  return (
    <main className="min-h-screen">
      <div className="grid-bg border-b border-hairline">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Manifest LMS / v0.1
          </div>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">
            Course <span className="text-primary">manifest</span>.
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            A minimal control surface for a training institute. Add, search, edit and
            retire courses — everything persists to Neon.
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-6 py-8">
        {flash && (
          <div
            className={
              "mb-6 rounded-md border px-4 py-2 text-sm " +
              (flash.kind === "ok"
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-destructive/40 bg-destructive/10 text-destructive")
            }
          >
            {flash.msg}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <CourseForm
            key={editing?.course_id ?? "new"}
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={editing ? () => setEditing(null) : undefined}
          />

          <div className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Total courses
                </div>
                <div className="font-display text-3xl font-semibold tabular-nums">
                  {courses.length.toString().padStart(2, "0")}
                </div>
              </div>
              <SearchCourse value={query} onChange={setQuery} />
            </div>

            <CourseList
              courses={filtered}
              total={courses.length}
              onEdit={(c) => {
                setEditing(c);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 pb-12 pt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        React · TanStack Start · Neon Postgres
      </footer>
    </main>
  );
}
