import { Animated, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import {
  applyTransformToMatrix,
  createMatrix,
  transformOrigin
} from './helpers';

const styles = StyleSheet.create({
  hidden: { opacity: 0 }
});

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

export enum Origin {
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight
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

class TransformView extends Component<Props, State> {
  state: State = {
    width: 0,
    height: 0
  };

  private ref: any;
  private listenerId: string;

  componentDidMount() {
    if (this.props.animation) {
      this.listenerId = this.props.animation.addListener(({ value }) => {
        this.setTransform(undefined, value);
      });
    }
  }

  componentWillUnmount() {
    if (this.props.animation) {
      this.props.animation.removeListener(this.listenerId);
    }
  }

  render() {
    const { style, children, ...props } = this.props;

    return (
      <Animated.View
        {...props}
        onLayout={this.onLayout}
        ref={ref => (this.ref = ref)}
        style={[style, !this.state.width && styles.hidden]}>
        {children}
      </Animated.View>
    );
  }

  private setTransform = (data = this.state, tweenAmount: number = 0) => {
    if (!this.ref) {
      return;
    }

    const { width, height } = data;
    const matrix = createMatrix();

    this.props.transform.forEach(transformation => {
      const key = Object.keys(transformation)[0];
      const startValue = transformation[key];
      const endValue = transformation.end || startValue;

      applyTransformToMatrix({
        key,
        startValue,
        endValue,
        tweenAmount,
        matrix
      });
    });

    const origin = {
      x: 0,
      y: 0,
      z: 0
    };

    switch (this.props.origin) {
      case Origin.TopLeft:
        origin.x = -width / 2;
        origin.y = -height / 2;
        break;

      case Origin.TopRight:
        origin.x = width / 2;
        origin.y = -height / 2;
        break;

      case Origin.BottomLeft:
        origin.x = -width / 2;
        origin.y = height / 2;
        break;

      case Origin.BottomRight:
        origin.x = width / 2;
        origin.y = height / 2;
        break;
    }

    transformOrigin(matrix, origin);

    this.ref.setNativeProps({
      style: {
        transform: [{ matrix }]
      }
    });
  };

  private onLayout = ({ nativeEvent }) => {
    // only store the first layout event
    if (!this.state.width && nativeEvent && nativeEvent.layout.width) {
      const newState = {
        width: nativeEvent.layout.width,
        height: nativeEvent.layout.height
      };
      this.setState(() => {
        this.setTransform(newState);
        return newState;
      });
    }
  };
}

export default TransformView;
