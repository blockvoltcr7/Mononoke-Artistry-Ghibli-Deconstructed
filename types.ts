export enum ArtTopic {
  BACKGROUNDS = "Background Art & Oga Kazuo",
  CHARACTER_DESIGN = "Character Design & Line Work",
  ANIMATION_TECHNIQUE = "Cel Animation vs. CGI",
  COLOR_PALETTE = "Color Theory & Atmosphere"
}

export interface AnalysisResult {
  topic: string;
  content: string;
  keyTerms: string[];
}

export interface GalleryItem {
  id: number;
  url: string;
  title: string;
  description: string;
}