import { Router } from "express";
import { recipeInputSchema } from "../schemas/recipes.js";
import { validate } from "../middleware/validate.js";
import { estimateDailyCalories } from "../services/calorie.js";
import { getOpenAIClient } from "../services/openaiClient.js";
import { buildRecipePrompt } from "../services/recipePrompt.js";

const router = Router();

router.post("/generate", validate(recipeInputSchema), async (req, res, next) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      const error = new Error("OPENAI_API_KEY is not configured");
      error.status = 500;
      error.expose = true;
      throw error;
    }

    const { body } = req.validated;
    // Base calorie target adjusted by the user's goal (cutting/recomp/bulking).
    const targetCalories = estimateDailyCalories(body.profile);

    const client = getOpenAIClient();
    const prompt = buildRecipePrompt({
      profile: body.profile,
      ingredients: body.ingredients,
      mealsCount: body.mealsCount,
      targetCalories
    });

    // Ask OpenAI for meal ideas using the provided pantry and target macros.
    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4
    });

    const content = response.choices?.[0]?.message?.content || "";
    let parsed = null;

    try {
      parsed = JSON.parse(content);
    } catch (parseError) {
      // If the model doesn't return JSON, pass the raw text for debugging.
      parsed = { raw: content };
    }

    res.json({
      targetCalories,
      meals: parsed
    });
  } catch (err) {
    next(err);
  }
});

export default router;
