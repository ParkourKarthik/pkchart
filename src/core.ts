

export type PKChart = (elem: HTMLElement, params: IPKParams) => Promise<any> | void;

const pkchart: PKChart = (container: HTMLElement, params: IPKParams): Promise<any> | void => {
    // Prevent library to be run in Node env:
    if (typeof window === 'undefined') return;
    // no real world use of the below promise for now.. (as it just adds a simple element)
    // return new Promise<any>((resolve, reject) => {
    //let promise = {resolve, reject};
    const cs = new CoreClass(container, params);
    // Initialize(container, params);
    // });
};


class CoreClass {

    constructor(container: HTMLElement, params: IPKParams) {
        this.initialize(container, params);
    }

    private initialize(container: HTMLElement, params: IPKParams): void {
        let chartElem: string = '<figure>' +
            '<figcaption>{{FIGURE CAPTION}}</figcaption>' +
            '<svg class="chart" width="420" height="150" aria-labelledby="title desc" role="img">' +
            '<title id="title">{{CHART TITLE}}</title>';
        let rectY: number = 20;
        let txtY: number = rectY + 9;
        params.data.forEach((element) => {
            const bar: string = '<g class="bar">' +
                '<rect width="' + element.XValue.toString() + '" height="19" y="' + rectY.toString() + '"></rect>' +
                '<text x="' + (element.XValue + 5).toString() + '" y="' + txtY.toString() + '" dy=".35em">' + element.Label + '</text>' +
                '</g>';
            txtY += 20;
            rectY += 20;
            chartElem = chartElem + bar;
        });
        chartElem = chartElem + '</svg>' +
            '</figure>';
        const chartNode: Node | null = this.convertToNodes(chartElem);
        container.innerHTML = chartElem;
    }

    private convertToNodes(xmlString: string): Node {
        const nodes = new DOMParser();
        const doc = nodes.parseFromString(xmlString, "text/xml");
        return doc.firstChild ? doc.firstChild : new Node();
    }

}



const Initialize = (elem: HTMLElement, params: IPKParams): void => {
    //since the library is meant to be used directly in js, it is better to check the types explicitly at runtime
    if (!(elem instanceof HTMLElement)) {
        console.log('Initialize:not a valid HTMLElement');
        return;
    }
    //add a simple svg element
    const svg: HTMLElement = document.createElement('svg');
    svg.setAttribute('width', (420).toString());
    svg.setAttribute('height', (150).toString());
    svg.setAttribute('role', 'img');
    for (let i = 0; i < Object.keys(params.data).length; i++) {
        const g: HTMLElement = document.createElement('g');
        const rect: HTMLElement = document.createElement('rect');
        rect.setAttribute('width', (10 * params.data[i].XValue).toString());
        rect.setAttribute('height', (20).toString());
        rect.setAttribute('y', (i * 2 * 10).toString());
        g.appendChild(rect);
        const txt: HTMLElement = document.createElement('text');
        txt.setAttribute('x', ((10 * params.data[i].XValue) + 1).toString());
        txt.setAttribute('y', ((i * 2 * 10) + 8).toString());
        txt.style.border = '1px solid';
        txt.textContent = params.data[i].Label;
        g.appendChild(txt);
        svg.appendChild(g);
    }
    elem.appendChild(svg);

};


interface IPKParams {
    config: IConfig;
    data: IAxisValue[];
}

interface IAxisValues extends Array<IAxisValue> { }

// more options to be added...
interface IConfig {
    chartType: ChartType;
    animate?: boolean;
    colortype?: ColorType;
}

interface IAxisValue {
    XValue: number;
    YValue: number;
    Label: string | null;
}

enum ChartType {
    Bar,
    Line,
    Cylinder,
    Pie,
}

enum ColorType {
    Contrast,
    Professional,
}

export default pkchart;
