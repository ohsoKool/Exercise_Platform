import { db } from "../utils/user.db.js";

// Get user progress (dashboard) and when user logs on, he will see all exercises,also4 completed ones too(ids you will get)-make them visually appealing and the lastExercise you have worked on(id)
export const getUserProgress = async (req, res) => {
  const userId = req.user.id;

  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      lastExercise: true,
      completedExercises: {
        where: { completed: true },
        select: { exerciseId: true },
      },
    },
  });

  let savedCode = null;
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

// function to  save user code of code editor and also save last exerciseId which can be fetched again and also to mark exercise as completed
export const saveOrCompleteExercise = async (req, res) => {
  const { exerciseId, code, completed } = req.body;
  const userId = req.user.id;

  try {
    // Checking if the exercise exists - this error idk why keeps coming up - gotta fix it
    const exerciseExists = await db.exercise.findUnique({
      where: { id: exerciseId },
    });

    if (!exerciseExists) {
      return res.status(400).json({ error: "Invalid exerciseId" });
    }

    // saving progress
    await db.exerciseProgress.upsert({
      where: {
        userId_exerciseId: { userId, exerciseId },
      },
      update: {
        ...(code !== undefined && { savedCode: code }),
        ...(completed !== undefined && { completed }),
      },
      create: {
        userId,
        exerciseId,
        savedCode: code || "",
        completed: completed || false,
      },
    });

    await db.user.update({
      where: { id: userId },
      data: { lastExerciseId: exerciseId },
    });

    return res
      .json({
        message:
          "Progress saved successfully | For now I am sending a return json here but you're supposed to automatically call this end point frequently to auto save.",
      })
      .status(200);
  } catch (err) {
    console.error("Error saving progress:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
