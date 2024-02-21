import { annotationProps, eventProps, intervalsProps } from "./constants";

export class Channel {
    private readonly _name: string;
    private readonly _annotations: annotationProps[];
    private readonly _intervals: intervalsProps[];

    constructor(name: string, annotations: annotationProps[] = [], intervals: intervalsProps[] = []) {
        this._name = name;
        this._annotations = annotations;
        this._intervals = intervals;
    }

    static parseInstance(data: any): Channel {

        const channel = new Channel(data._name, data._annotations, data._intervals);
        return channel;
    }

    // Function to create/delete events
    createAnnotation(annotation: annotationProps): void {
        this._annotations.push(annotation);
    }
    
    createInterval(interval: intervalsProps): void {
        this._intervals.push(interval);
    }

    deleteAnnotation(annotation: annotationProps): void {
        const index = this._annotations.findIndex(a => a === annotation);
        if (index !== -1) {
            this._annotations.splice(index, 1);
        }
    }

    deleteInterval(interval: intervalsProps): void {
        const index = this._intervals.findIndex(a => a === interval);
        if (index !== -1) {
            this._intervals.splice(index, 1);
        }
    }

    // Getters
    get name(): string {
        return this._name;
    }

    get annotations(): annotationProps[] {
        return this._annotations;
    }

    get intervals(): intervalsProps[] {
        return this._intervals;
    }

    getClosestEvent(mousePosition: number): [annotationProps | intervalsProps | undefined, number, string] {
        let closest: annotationProps | intervalsProps | undefined;
        let closesType: string;
        let closestDistance = Number.MAX_SAFE_INTEGER;

        // Find the closest event to the mouse position (check if any inverval is closer than a annotation)
        for (const annotation of this._annotations) {
            const auxDistance = Math.abs(mousePosition - annotation.pos);
            if (auxDistance < closestDistance) {
                closest = annotation;
                closesType = 'annotation';
                closestDistance = auxDistance;
            }
        }

        for (const interval of this._intervals) {
            const startDistance = Math.abs(mousePosition - interval.start);
            if (startDistance < closestDistance) {
                closest = interval;
                closesType = 'interval';
                closestDistance = startDistance;
            }

            const endDistance = Math.abs(mousePosition - interval.end);
            if (endDistance < closestDistance) {
                closest = interval;
                closesType = 'interval';
                closestDistance = endDistance;
            }
        }

        return [closest, closestDistance, closesType];
    }

    showAnnotations(channelName: string): string[] {
        const annotations = [];

        this.annotations.forEach((annotation) => {
            annotations.push({channelName: channelName, eventName: annotation.name, annotationPos: annotation.pos})
        });

        
        return annotations;
    }

    showIntervals(channelName: string): string[] {
        const intervals = [];

        this.intervals.forEach((interval) => {
            intervals.push({channelName: channelName, eventName: interval.name, intervalStart: interval.start, intervalEnd: interval.end})
        });

        return intervals.sort((a, b) => a.intervalStart - b.intervalStart);
    }

}
