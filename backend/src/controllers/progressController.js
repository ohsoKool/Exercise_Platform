import { db } from "../utils/user.db.js";

// Get user progress: completed exercise IDs, last visited exercise, and saved code
export const getUserProgress = async (req, res) => {
  const userId = req.user.id;

  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      lastExercise: true, // includes full last exercise data
      completedExercises: {
        where: { completed: true }, // this is used to get data where only completed is provided in the exercise Id's
        select: { exerciseId: true }, // we only care about their IDs here
      },
    },
  });

  let savedCode = null;

  // If user has a last visited exercise, fetch saved code
  if (user?.lastExercise?.id) {
    const lastProgress = await db.exerciseProgress.findUnique({
      where: {
        userId_exerciseId: {
          userId,
          exerciseId: user.lastExercise.id,
        },
      },
      select: { savedCode: true },
    });

    savedCode = lastProgress?.savedCode || null;
  }

  return res.json({
    lastVisitedExercise: user.lastExercise ?? null,
    completedExerciseIds: user.completedExercises.map((e) => e.exerciseId),
    savedCode,
  });
};

// Save user code, update last visited exercise, optionally mark as completed
export const saveOrCompleteExercise = async (req, res) => {
  const { exerciseId, code, completed } = req.body;
  const userId = req.user.id;

  try {
    // Make sure the exercise ID actually exists in DB
    const exerciseExists = await db.exercise.findUnique({
      where: { id: exerciseId },
    });

    if (!exerciseExists) {
      return res.status(400).json({ error: "Invalid exerciseId" });
    }

    // Save or update the user's progress for this exercise
    await db.exerciseProgress.upsert({
      where: {
        userId_exerciseId: { userId, exerciseId },
      },
      update: {
        ...(code !== undefined && { savedCode: code }), // only update if code is provided
        ...(completed !== undefined && { completed }), // only update if 'completed' is provided
      },
      create: {
        userId,
        exerciseId,
        savedCode: code || "",
        completed: completed || false,
      },
    });

    // Always update lastExerciseId (even if not marking completed)
    await db.user.update({
      where: { id: userId },
      data: { lastExerciseId: exerciseId },
    });

    return res.status(200).json({
      message: "Progress saved successfully ",
    });
  } catch (err) {
    console.error("Error saving progress:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
