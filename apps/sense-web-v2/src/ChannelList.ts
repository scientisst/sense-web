import { Channel } from './Channel';
import { annotationProps, intervalsProps } from './constants';

export class ChannelList {
    private _channels: Channel[];

    constructor(channels: Channel[] = []) {
        this._channels = channels;
    }

    // Geral
    static parseInstance(data: any): ChannelList {
        // Construct a new ChannelList instance from the provided JSON object
        const channels = data._channels.map((channelData: any) => Channel.parseInstance(channelData));
        const channelList = new ChannelList(channels);

        return channelList;
    }
    
    isEmpty(): boolean {
        return this._channels.length === 0;
    }

    clear(): void {
        this._channels = [];
    }

    addChannel(name: string): void {
        const channel = new Channel(name);
        this._channels.push(channel);
    }

    // Getters
    get size(): number {
        return this._channels.length;
    }

    get names(): string[] {
        return this._channels.map(channel => channel.name);
    }

    getChannel(name: string): Channel | undefined {
        return this._channels.find(channel => channel.name === name);
    }

    getAllChannels(): Channel[] {
        return this._channels;
    }

    getAnnotation(startTime: number): annotationProps | undefined {
        return this._channels
            .map(channel => channel.annotations)
            .flat()
            .find(annotation => annotation.pos === startTime);
    }

    // Function to create/delete events
    createAnnotationAllChannels(annotation: annotationProps): void {
        this._channels.forEach(channel => channel.createAnnotation(annotation));
    }

    createIntervalAllChannels(interval: intervalsProps): void {
        this._channels.forEach(channel => channel.createInterval(interval));
    }

    removeAnnotationAllChannels(annotation: annotationProps): void {
        this._channels.forEach(channel => channel.deleteAnnotation(annotation));
    }

    removeIntervalAllChannels(interval: intervalsProps): void {
        this._channels.forEach(channel => channel.deleteInterval(interval));
    }

    showAnnotations(): string[] {
        const annotations = [];
        for (const channel of this._channels) {
            annotations.push(...channel.showAnnotations(channel.name));
        }
        
        return annotations;
    }

    showIntervals(): string[] {
        const intervals = [];
        for (const channel of this._channels) {
            intervals.push(...channel.showIntervals(channel.name));
        }

        return intervals;
    }

}
