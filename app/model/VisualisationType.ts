/**
 * Static class used to get the list of enabled viz types and test if a type is valid
 */

// Enum of valid visualization types
export type VisualisationTypeEnum = "MapChart" | "LineChart";

export interface FullType {
    label: string, // label to be displayed
    id: VisualisationTypeEnum, // must match one of the allowed types above
    icon: string // google material icon ID https://material.io/icons/
}


export class VisualisationType {
    
    /**
     * Full declaration of available chart types
     * @type {label: string; id: string; icon: string}
     */
    private static types: FullType[] = [
        {
            label: "Map Chart",
            id: "MapChart",
            icon: "bubble_chart"
        },
        {
            label: "Line Chart",
            id: "LineChart",
            icon: "show_chart"
        }
    ];
    
    /**
     * Check if a type is valid (enabled)
     */
    public static isValid = (type: VisualisationTypeEnum): boolean => {
        return VisualisationType.types.map(t => t.id).indexOf(type) >= 0;
    };
    
    /**
     * Returns the full list of types
     * @returns {FullType[]}
     */
    public static getTypes = (): FullType[] => {
        return VisualisationType.types;
    };
    
    constructor() {
    };
}