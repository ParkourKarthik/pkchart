

export interface PKChart {
    (params: HTMLElement): Promise<any> | void
};

const pkchart: PKChart = (params): Promise<any> | void => {
    // Prevent library to be run in Node env:
    if (typeof window === 'undefined') return;  
    
    // no real world use of the below promise for now.. (as it just adds a simple element)
    return new Promise<any>((resolve, reject) => {
        //let promise = {resolve, reject};
        Initialize(params);
    });
};



const Initialize = (elem: HTMLElement): void => {
    //since the library is meant to be used directly in js, it is better to check the types explicitly at runtime
    if (!(elem instanceof HTMLElement)) {
        console.log('Initialize:not a valid HTMLElement');
        return;
    }
    //add a simple svg element
    const svg: HTMLElement = document.createElement('svg');
    elem.appendChild(svg);
}

interface PKParams {
    config: IConfig;
    data: IAxisValues;
}


// more options to be added...
interface IConfig {
    chartType: ChartType;
    animate?: boolean;
    colortype?: ColorType;
}

interface IAxisValues {
    XValue: number;
    YValue: number;
}

enum ChartType {
    Bar,
    Line,
    Cylinder,
    Pie
}

enum ColorType {
    Contrast,
    Professional
}

export default pkchart;
