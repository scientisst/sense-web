import { ReactNode } from "react";
export interface LiveChartOptions {
    className?: string;
    style?: React.CSSProperties;
    margins?: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
    fontFamily?: string;
    yDomain?: [number | undefined, number | undefined];
    yTickInterval?: number;
    yTickFormat?: (value: number) => string;
}
declare const useLiveD3Chart: ({ className, style, margins, fontFamily, yDomain, yTickInterval, yTickFormat }: LiveChartOptions) => {
    chartNode: ReactNode;
    setData: (newData: Array<[number, number | null]>) => void;
    appendData: (newData: Array<[number, number | null]>) => void;
};
export default useLiveD3Chart;
