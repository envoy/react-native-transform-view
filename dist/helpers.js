"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var MatrixMath_1 = require("react-native/Libraries/Utilities/MatrixMath");
exports.createMatrix = function () { return MatrixMath_1.default.createIdentityMatrix(); };
exports.transformOrigin = function (matrix, origin) {
    var x = origin.x, y = origin.y, z = origin.z;
    var translate = MatrixMath_1.default.createIdentityMatrix();
    MatrixMath_1.default.reuseTranslate3dCommand(translate, x, y, z);
    MatrixMath_1.default.multiplyInto(matrix, translate, matrix);
    var untranslate = MatrixMath_1.default.createIdentityMatrix();
    MatrixMath_1.default.reuseTranslate3dCommand(untranslate, -x, -y, -z);
    MatrixMath_1.default.multiplyInto(matrix, matrix, untranslate);
};
// from: https://github.com/facebook/react-native/blob/master/Libraries/StyleSheet/processTransform.js
exports.multiplyTransform = function (result, matrixMathFunction, args) {
    var matrixToApply = MatrixMath_1.default.createIdentityMatrix();
    var argsWithIdentity = [matrixToApply].concat(args);
    matrixMathFunction.apply(_this, argsWithIdentity);
    MatrixMath_1.default.multiplyInto(result, result, matrixToApply);
};
// from: https://github.com/facebook/react-native/blob/master/Libraries/StyleSheet/processTransform.js
exports.convertToRadians = function (value) {
    var floatValue = parseFloat(value);
    return value.indexOf('rad') > -1 ? floatValue : floatValue * Math.PI / 180;
};
exports.tweenValue = function (start, end, tween) {
    return start + tween / 1 * (end - start);
};
exports.applyTransformToMatrix = function (_a) {
    var key = _a.key, startValue = _a.startValue, endValue = _a.endValue, tweenAmount = _a.tweenAmount, matrix = _a.matrix;
    switch (key) {
        case 'perspective':
            exports.multiplyTransform(matrix, MatrixMath_1.default.reusePerspectiveCommand, [
                exports.tweenValue(startValue, endValue, tweenAmount)
            ]);
            break;
        case 'rotateX':
            exports.multiplyTransform(matrix, MatrixMath_1.default.reuseRotateXCommand, [
                exports.tweenValue(exports.convertToRadians(startValue), exports.convertToRadians(endValue), tweenAmount)
            ]);
            break;
        case 'rotateY':
            exports.multiplyTransform(matrix, MatrixMath_1.default.reuseRotateYCommand, [
                exports.tweenValue(exports.convertToRadians(startValue), exports.convertToRadians(endValue), tweenAmount)
            ]);
            break;
        case 'rotate':
        case 'rotateZ':
            exports.multiplyTransform(matrix, MatrixMath_1.default.reuseRotateZCommand, [
                exports.tweenValue(exports.convertToRadians(startValue), exports.convertToRadians(endValue), tweenAmount)
            ]);
            break;
        case 'scale':
            exports.multiplyTransform(matrix, MatrixMath_1.default.reuseScaleCommand, [
                exports.tweenValue(startValue, endValue, tweenAmount)
            ]);
            break;
        case 'scaleX':
            exports.multiplyTransform(matrix, MatrixMath_1.default.reuseScaleXCommand, [
                exports.tweenValue(startValue, endValue, tweenAmount)
            ]);
            break;
        case 'scaleY':
            exports.multiplyTransform(matrix, MatrixMath_1.default.reuseScaleYCommand, [
                exports.tweenValue(startValue, endValue, tweenAmount)
            ]);
            break;
        case 'translate':
            exports.multiplyTransform(matrix, MatrixMath_1.default.reuseTranslate3dCommand, [
                exports.tweenValue(startValue[0], endValue[0], tweenAmount),
                exports.tweenValue(startValue[1], endValue[1], tweenAmount),
                exports.tweenValue(startValue[2] || 0, endValue[2] || 0, tweenAmount)
            ]);
            break;
        case 'translateX':
            exports.multiplyTransform(matrix, MatrixMath_1.default.reuseTranslate2dCommand, [
                exports.tweenValue(startValue, endValue, tweenAmount),
                0
            ]);
            break;
        case 'translateY':
            exports.multiplyTransform(matrix, MatrixMath_1.default.reuseTranslate2dCommand, [
                0,
                exports.tweenValue(startValue, endValue, tweenAmount)
            ]);
            break;
        case 'skewX':
            exports.multiplyTransform(matrix, MatrixMath_1.default.reuseSkewXCommand, [
                exports.tweenValue(exports.convertToRadians(startValue), exports.convertToRadians(endValue), tweenAmount)
            ]);
            break;
        case 'skewY':
            exports.multiplyTransform(matrix, MatrixMath_1.default.reuseSkewYCommand, [
                exports.tweenValue(exports.convertToRadians(startValue), exports.convertToRadians(endValue), tweenAmount)
            ]);
            break;
        default:
            throw new Error('Invalid transform name: ' + key);
    }
};
