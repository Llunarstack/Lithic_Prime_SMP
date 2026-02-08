export enum ModCategory {
    CORE = "Core & Libraries",
    WORLD_GEN = "World Generation",
    CONTENT = "Content & Mechanics",
    DECORATION = "Decoration & Building",
    PERFORMANCE = "Performance (Client)",
    QOL = "Quality of Life",
    VISUAL = "Visuals & Audio"
}

export interface Mod {
    id: string;
    filename: string;
    name: string;
    description: string;
    isOptional: boolean;
    category: ModCategory;
}