export interface IPKParams {
    config: IConfig;
    data: IAxisValue[];
}

// more options to be added...
export interface IConfig {
    chartType: any;
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
    bar,
    line,
    cylinder,
    pie
}

export enum ColorType {
    Contrast,
    Professional
}
