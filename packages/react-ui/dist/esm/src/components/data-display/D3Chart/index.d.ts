/// <reference types="react" />
export interface D3ChartProps {
    data: Array<[number, number | null]>;
    className?: string;
    style?: React.CSSProperties;
    canvasPaintFn?: (canvas: HTMLCanvasElement, width: number, height: number, pixelRatio: number, data: Array<[number, number | null]>, time: number) => void;
    svgPaintFn?: (svg: SVGSVGElement, width: number, height: number, data: Array<[number, number | null]>) => void;
}
declare const D3Chart: React.FC<D3ChartProps>;
export default D3Chart;
