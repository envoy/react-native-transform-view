# react-native-transform-view

## Getting started

`$ yarn add @envoy/react-native-transform-view`

### Automatic installation

`$ react-native link @envoy/react-native-transform-view`

## Usage

```javascript
import TransformView, { Origin } from '@envoy/react-native-transform-view';

const MyComponent = () => (
  <TransformView
    origin={Origin.TopLeft}
    transform={[{ translateY: 100 }, { rotate: '30rad' }, { scale: 2 }]}>
    <Text>Hello World</Text>
  </TransformView>
);
```
