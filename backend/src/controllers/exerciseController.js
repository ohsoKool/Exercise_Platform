import { db } from "../utils/user.db.js";

export const getAllExercises = async (req, res) => {
  try {
    const exercises = await db.exercise.findMany({
      select: {
        id: true,
        title: true,
        description: false,
        starterCode: false,
      },
    });
    return res
      .status(200)
      .json({ message: "All exercises fetched successfully", exercises });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "ERROR IN GET ALL USERS    exercise controller" });
  }
};

export const getExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const exercise = await db.exercise.findUnique({
      where: { id: id },
      select: {
        title: true,
        description: true,
        starterCode: true,
      },
    });
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    return res.status(200).json({
      message: "Exercise fetched successfully",
      exercise,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching exercise",
      error: error.message,
    });
  }
};
