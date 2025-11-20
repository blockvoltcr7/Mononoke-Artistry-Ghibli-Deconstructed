import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ArtTopic, AnalysisResult } from "../types";

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are an expert art historian, animation critic, and technical artist specializing in the works of Studio Ghibli, specifically "Princess Mononoke" (Mononoke-hime). 
Your goal is to explain the art style to a user asking "How do you describe this art?".
Use professional vocabulary such as:
- Kazuo Oga's background style (impressionistic realism, poster color).
- Cel animation techniques.
- The 'Miyazaki' character aesthetic.
- The interplay between hand-drawn elements and early CGI (for the demon worms).
- Color grading and atmospheric perspective.

Be concise but deeply informative. Focus on the visual techniques.
`;

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    topic: { type: Type.STRING, description: "The specific aspect of art being discussed." },
    content: { type: Type.STRING, description: "A detailed paragraph describing the art style using technical terms." },
    keyTerms: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING }, 
      description: "List of 3-5 key technical art terms used in the description (e.g., 'Gouache', 'Cel Shading')." 
    }
  },
  required: ["topic", "content", "keyTerms"]
};

export const analyzeArtStyle = async (topic: ArtTopic | string): Promise<AnalysisResult> => {
  try {
    const prompt = `Analyze the art style of Princess Mononoke specifically regarding: ${topic}. Describe it as if explaining to an artist or animation student.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.7, // Balanced for creativity and factual art history
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback for demo purposes if API fails or key is missing
    return {
      topic: "Error",
      content: "Unable to analyze at this moment. Please ensure your API Key is valid. The art style of Mononoke is renowned for its lush, hand-painted backgrounds using poster colors, contrasting with the crisp line art of the characters.",
      keyTerms: ["Error", "Retry"]
    };
  }
};

export const generateCustomAnswer = async (question: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: question,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            }
        });
        return response.text || "No response generated.";
    } catch (e) {
        console.error(e);
        return "An error occurred while contacting the art historian (Gemini).";
    }
}

// --- Image Generation Services ---

export const generateGhibliPrompt = async (userIdea: string): Promise<string> => {
  const promptEngineerInstruction = `
    You are a specialized Prompt Engineer for AI Image Generation. 
    Your task is to take a user's simple concept and convert it into a highly detailed prompt specifically designed to replicate the art style of the movie 'Princess Mononoke' (Studio Ghibli, 1997).
    
    Include these specific technical elements in your output prompt:
    - "Studio Ghibli, Princess Mononoke style (1997)"
    - "Hand-painted background in the style of Kazuo Oga"
    - "Poster color texture, impressionistic realism nature"
    - "Cel shaded characters with sharp line art"
    - "Vintage anime grain, 35mm film aesthetic"
    - "Earth tones: Forest Green, Deep Red, Cream, Charcoal"
    - "Atmospheric lighting, komorebi (dappled sunlight)"
    
    Keep the prompt descriptive but focused on visual output. Do not add conversational filler. Just return the prompt.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Convert this concept into a Princess Mononoke art style prompt: "${userIdea}"`,
      config: {
        systemInstruction: promptEngineerInstruction,
      }
    });
    return response.text || userIdea;
  } catch (error) {
    console.error("Prompt Engineering Error:", error);
    return userIdea + ", Studio Ghibli style, Princess Mononoke aesthetic, hand-painted background.";
  }
};

export const generateMononokeImage = async (prompt: string): Promise<string | null> => {
  try {
    // Using "Nano Banana" (gemini-2.5-flash-image) as requested
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
            aspectRatio: "16:9" // Cinematic aspect ratio
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    throw error;
  }
};
