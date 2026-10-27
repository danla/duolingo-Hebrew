import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";

import * as schema from "@/db/schema";

import {
  COURSES,
  CURRICULUM,
  getAnswer,
  getAudioSrc,
  getPrompt,
  getSelectQuestion,
  getUnitText,
} from "./data/courses";

// Number of ASSIST (translate) challenges added after the SELECT ones.
const ASSIST_PER_LESSON = 3;

// Inserts every course from the curriculum. Expects the course tables to be empty.
export const seedCourses = async (
  db: PgDatabase<PgQueryResultHKT, typeof schema>
) => {
  for (const courseDefinition of COURSES) {
    const { from, to } = courseDefinition;

    const [course] = await db
      .insert(schema.courses)
      .values({
        title: courseDefinition.title,
        imageSrc: courseDefinition.imageSrc,
      })
      .returning();

    // For each course, insert units
    for (const [unitIndex, unitData] of CURRICULUM.entries()) {
      const [unit] = await db
        .insert(schema.units)
        .values({
          courseId: course.id,
          ...getUnitText(courseDefinition, unitIndex),
          order: unitIndex + 1,
        })
        .returning();

      // For each unit, insert lessons
      for (const [lessonIndex, lessonData] of unitData.lessons.entries()) {
        const [lesson] = await db
          .insert(schema.lessons)
          .values({
            unitId: unit.id,
            title: lessonData.title[from],
            order: lessonIndex + 1,
          })
          .returning();

        const { concepts } = lessonData;

        const challengeData = [
          ...concepts.map((concept, i) => ({
            type: "SELECT" as const,
            question: getSelectQuestion(getPrompt(concept, from), from),
            conceptIndex: i,
          })),
          ...concepts.slice(0, ASSIST_PER_LESSON).map((concept, i) => ({
            type: "ASSIST" as const,
            question: `"${getPrompt(concept, from)}"`,
            conceptIndex: i,
          })),
        ];

        // For each lesson, insert challenges
        const challenges = await db
          .insert(schema.challenges)
          .values(
            challengeData.map(({ type, question }, i) => ({
              lessonId: lesson.id,
              type,
              question,
              order: i + 1,
            }))
          )
          .returning();

        // For each challenge, insert the correct option and two distractors
        // from the same lesson, rotating where the correct answer appears.
        await db.insert(schema.challengeOptions).values(
          challenges.flatMap((challenge) => {
            const { type, conceptIndex } = challengeData[challenge.order - 1];
            const optionIndexes = [1, 2].map(
              (offset) => (conceptIndex + offset) % concepts.length
            );
            optionIndexes.splice(challenge.order % 3, 0, conceptIndex);

            return optionIndexes.map((optionIndex) => {
              const concept = concepts[optionIndex];

              return {
                challengeId: challenge.id,
                correct: optionIndex === conceptIndex,
                text: getAnswer(concept, to, from),
                imageSrc: type === "SELECT" ? (concept.imageSrc ?? null) : null,
                audioSrc: getAudioSrc(concept, to),
              };
            });
          })
        );
      }
    }
  }
};
