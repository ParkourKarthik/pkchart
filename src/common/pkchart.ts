export interface IPKParams {
    config: IConfig;
    data: IAxisValue[];
}

// more options to be added...
export interface IConfig {
    chartType: ChartType;
    animate?: boolean;
    colortype?: ColorType;
    title?: string;
    caption?: string;
}

export interface IAxisValue {
    XValue: number;
    YValue: number;
    Label: string | null;
}

export enum ChartType {
    Bar,
    Line,
    Cylinder,
    Pie
}

export enum ColorType {
    Contrast,
    Professional
}
