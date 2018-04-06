import MatrixMath from 'react-native/Libraries/Utilities/MatrixMath';

export const createMatrix = () => MatrixMath.createIdentityMatrix();

export const transformOrigin = (matrix, origin) => {
  const { x, y, z } = origin;

  const translate = MatrixMath.createIdentityMatrix();
  MatrixMath.reuseTranslate3dCommand(translate, x, y, z);
  MatrixMath.multiplyInto(matrix, translate, matrix);

  const untranslate = MatrixMath.createIdentityMatrix();
  MatrixMath.reuseTranslate3dCommand(untranslate, -x, -y, -z);
  MatrixMath.multiplyInto(matrix, matrix, untranslate);
};

// from: https://github.com/facebook/react-native/blob/master/Libraries/StyleSheet/processTransform.js
export const multiplyTransform = (
  result: Array<number>,
  matrixMathFunction: Function,
  args: Array<number>
): void => {
  var matrixToApply = MatrixMath.createIdentityMatrix();
  var argsWithIdentity = [matrixToApply].concat(args);
  matrixMathFunction.apply(this, argsWithIdentity);
  MatrixMath.multiplyInto(result, result, matrixToApply);
};

// from: https://github.com/facebook/react-native/blob/master/Libraries/StyleSheet/processTransform.js
export const convertToRadians = (value: string): number => {
  var floatValue = parseFloat(value);
  return value.indexOf('rad') > -1 ? floatValue : floatValue * Math.PI / 180;
};

export const tweenValue = (start, end, tween) => {
  return start + tween / 1 * (end - start);
};

export const applyTransformToMatrix = ({
  key,
  startValue,
  endValue,
  tweenAmount,
  matrix
}) => {
  switch (key) {
    case 'perspective':
      multiplyTransform(matrix, MatrixMath.reusePerspectiveCommand, [
        tweenValue(startValue, endValue, tweenAmount)
      ]);
      break;
    case 'rotateX':
      multiplyTransform(matrix, MatrixMath.reuseRotateXCommand, [
        tweenValue(
          convertToRadians(startValue),
          convertToRadians(endValue),
          tweenAmount
        )
      ]);
      break;
    case 'rotateY':
      multiplyTransform(matrix, MatrixMath.reuseRotateYCommand, [
        tweenValue(
          convertToRadians(startValue),
          convertToRadians(endValue),
          tweenAmount
        )
      ]);
      break;
    case 'rotate':
    case 'rotateZ':
      multiplyTransform(matrix, MatrixMath.reuseRotateZCommand, [
        tweenValue(
          convertToRadians(startValue),
          convertToRadians(endValue),
          tweenAmount
        )
      ]);
      break;
    case 'scale':
      multiplyTransform(matrix, MatrixMath.reuseScaleCommand, [
        tweenValue(startValue, endValue, tweenAmount)
      ]);
      break;
    case 'scaleX':
      multiplyTransform(matrix, MatrixMath.reuseScaleXCommand, [
        tweenValue(startValue, endValue, tweenAmount)
      ]);
      break;
    case 'scaleY':
      multiplyTransform(matrix, MatrixMath.reuseScaleYCommand, [
        tweenValue(startValue, endValue, tweenAmount)
      ]);
      break;
    case 'translate':
      multiplyTransform(matrix, MatrixMath.reuseTranslate3dCommand, [
        tweenValue(startValue[0], endValue[0], tweenAmount),
        tweenValue(startValue[1], endValue[1], tweenAmount),
        tweenValue(startValue[2] || 0, endValue[2] || 0, tweenAmount)
      ]);
      break;
    case 'translateX':
      multiplyTransform(matrix, MatrixMath.reuseTranslate2dCommand, [
        tweenValue(startValue, endValue, tweenAmount),
        0
      ]);
      break;
    case 'translateY':
      multiplyTransform(matrix, MatrixMath.reuseTranslate2dCommand, [
        0,
        tweenValue(startValue, endValue, tweenAmount)
      ]);
      break;
    case 'skewX':
      multiplyTransform(matrix, MatrixMath.reuseSkewXCommand, [
        tweenValue(
          convertToRadians(startValue),
          convertToRadians(endValue),
          tweenAmount
        )
      ]);
      break;
    case 'skewY':
      multiplyTransform(matrix, MatrixMath.reuseSkewYCommand, [
        tweenValue(
          convertToRadians(startValue),
          convertToRadians(endValue),
          tweenAmount
        )
      ]);
      break;
    default:
      throw new Error('Invalid transform name: ' + key);
  }
};
