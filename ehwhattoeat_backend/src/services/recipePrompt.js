export function buildRecipePrompt({ profile, ingredients, mealsCount, targetCalories }) {
  const ingredientList = ingredients
    .map((item) => `${item.name} ${item.amount}${item.unit || "g"}`)
    .join(", ");

  // Prompt asks for structured JSON the frontend can render.
  return `You are a nutrition-focused recipe planner for NUS hall residents.
Create ${mealsCount} meal ideas using only the provided ingredients plus basic sauces and garnishes (chilli, pepper, soy sauce, salt, oil, vinegar).
Prioritize post-training recovery with higher protein and carbs.
User profile: ${profile.sex}, ${profile.age}y, ${profile.weightKg}kg, activity ${profile.activityFrequency} days/week, goal ${profile.goal}.
Target daily calories based on goal: ~${targetCalories}.
Ingredients available: ${ingredientList}.
Return JSON only with schema:
{ "meals": [ { "name": string, "goal": string, "ingredients": [string], "steps": [string], "estimatedMacros": { "protein_g": number, "carbs_g": number, "fat_g": number } } ] }`;
}
