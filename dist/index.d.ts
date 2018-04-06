/// <reference types="react" />
import { Animated } from 'react-native';
import { Component } from 'react';
export interface Transform {
    perspective?: number;
    rotate?: string;
    rotateX?: string;
    rotateY?: string;
    rotateZ?: string;
    scale?: number;
    scaleX?: number;
    scaleY?: number;
    translateX?: number;
    translateY?: number;
    skewX?: string;
    skewY?: string;
    end?: string | number;
}
export declare enum Origin {
    TopLeft = 0,
    TopRight = 1,
    BottomLeft = 2,
    BottomRight = 3,
}
export interface Props {
    transform: Transform[];
    origin?: Origin;
    style?: any | any[];
    animation?: Animated.Value;
}
export interface State {
    width: number;
    height: number;
}
declare class TransformView extends Component<Props, State> {
    state: State;
    private ref;
    private listenerId;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private setTransform;
    private onLayout;
}
export default TransformView;
