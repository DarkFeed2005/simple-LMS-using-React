import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type Course = {
  course_id: string;
  course_name: string;
  lecturer: string;
  duration_weeks: number;
};

const courseSchema = z.object({
  course_id: z.string().trim().min(1, "Course ID required").max(20),
  course_name: z.string().trim().min(1, "Course name required").max(120),
  lecturer: z.string().trim().min(1, "Lecturer required").max(120),
  duration_weeks: z.number().int().positive().max(520),
});

export const listCourses = createServerFn({ method: "GET" }).handler(async () => {
  const { getSql, ensureSchema } = await import("./db.server");
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`SELECT course_id, course_name, lecturer, duration_weeks
    FROM courses ORDER BY created_at DESC`) as Course[];
  return rows;
});

export const addCourse = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => courseSchema.parse(data))
  .handler(async ({ data }) => {
    const { getSql, ensureSchema } = await import("./db.server");
    await ensureSchema();
    const sql = getSql();
    try {
      await sql`INSERT INTO courses (course_id, course_name, lecturer, duration_weeks)
        VALUES (${data.course_id}, ${data.course_name}, ${data.lecturer}, ${data.duration_weeks})`;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("duplicate") || msg.includes("unique")) {
        throw new Error(`Course ID "${data.course_id}" already exists`);
      }
      throw e;
    }
    return { ok: true };
  });

export const updateCourse = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => courseSchema.parse(data))
  .handler(async ({ data }) => {
    const { getSql, ensureSchema } = await import("./db.server");
    await ensureSchema();
    const sql = getSql();
    await sql`UPDATE courses SET
      course_name = ${data.course_name},
      lecturer = ${data.lecturer},
      duration_weeks = ${data.duration_weeks}
      WHERE course_id = ${data.course_id}`;
    return { ok: true };
  });

export const deleteCourse = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ course_id: z.string().min(1) }).parse(data))
  .handler(async ({ data }) => {
    const { getSql, ensureSchema } = await import("./db.server");
    await ensureSchema();
    const sql = getSql();
    await sql`DELETE FROM courses WHERE course_id = ${data.course_id}`;
    return { ok: true };
  });
