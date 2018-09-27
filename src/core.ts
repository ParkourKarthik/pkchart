import { IPKParams } from "./common/pkchart";
import { Util } from "./util";

export type PKChart = (elem: HTMLElement, params: IPKParams) => Promise<any> | void;

const pkchart: PKChart = (container: HTMLElement, params: IPKParams): Promise<any> | void => {
    // Prevent library to be run in Node env:
    if (typeof window === 'undefined') return;
    const cs = new CoreClass(container, params);
};


class CoreClass {

    constructor(container: HTMLElement, params: IPKParams) {
        this.initialize(container, params);
    }

    private initialize(container: HTMLElement, params: IPKParams): void {
        let chartElem: string = '<figure>' +
            '<figcaption>' + params.config.caption + '</figcaption>' +
            '<svg class="pk-chart" width="420" height="150" aria-labelledby="title desc" role="img">' +
            '<title id="title">' + params.config.title + '</title>';
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

    private getMaxofValues(axisValues: IAxisValue[]): number[] {
        const maxVal: number[] | null = Util.getMax();
        if (!maxVal)
            console.log('No values to check for max value');
        return maxVal as number[];
    }

}

export default pkchart;
