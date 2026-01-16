
import { GoogleGenAI, Type } from "@google/genai";
import { SERVICES_DATA } from "../constants";

export const getServiceRecommendation = async (userInput: string) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("Architecture link unavailable: API Key not configured.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const schema = {
    type: Type.OBJECT,
    properties: {
      categoryName: {
        type: Type.STRING,
        description: "The name of the most relevant service category.",
      },
      reason: {
        type: Type.STRING,
        description: "Why this category fits the user's needs.",
      },
      suggestedSteps: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "A list of 3 actionable steps using our services.",
      },
      estimatedCost: {
        type: Type.STRING,
        description: "A calculated cost estimate based on our current service pricing tiers (e.g. 'R2,500 - R5,000').",
      },
    },
    required: ["categoryName", "reason", "suggestedSteps", "estimatedCost"],
  };

  // Prepare detailed service data for the AI to "scan"
  const serviceContext = SERVICES_DATA.map(s => {
    const packages = s.packages.map(p => `${p.name}: ${p.price}`).join(", ");
    return `Vertical: ${s.title} (Starting at ${s.startingPrice}). Description: ${s.shortDescription}. Tiers: ${packages}.`;
  }).join("\n");

  const prompt = `System: You are the Marvetti Corp Solution Architect. 
    Analyze the user's business challenge and provide a specific recommendation by scanning our current service catalog.
    
    Service Catalog & Real-Time Pricing Data:
    ${serviceContext}

    User Challenge: "${userInput}"

    Task:
    1. Scan the catalog above and identify the most relevant category.
    2. Explain why this specific vertical is the solution.
    3. Suggest 3 actionable steps.
    4. MANDATORY: Calculate an "Estimated Project Cost" by scanning our actual pricing tiers above. If the project seems complex, provide a range (e.g. 'R5,000 - R12,000') based on combining tiers or setup fees.
    
    Return the response strictly as JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("Empty intelligence response from Architect Core.");
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    throw error;
  }
};
