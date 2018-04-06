"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var react_1 = require("react");
var helpers_1 = require("./helpers");
var styles = react_native_1.StyleSheet.create({
    hidden: { opacity: 0 }
});
var Origin;
(function (Origin) {
    Origin[Origin["TopLeft"] = 0] = "TopLeft";
    Origin[Origin["TopRight"] = 1] = "TopRight";
    Origin[Origin["BottomLeft"] = 2] = "BottomLeft";
    Origin[Origin["BottomRight"] = 3] = "BottomRight";
})(Origin = exports.Origin || (exports.Origin = {}));
var TransformView = /** @class */ (function (_super) {
    __extends(TransformView, _super);
    function TransformView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            width: 0,
            height: 0
        };
        _this.setTransform = function (data, tweenAmount) {
            if (data === void 0) { data = _this.state; }
            if (tweenAmount === void 0) { tweenAmount = 0; }
            if (!_this.ref) {
                return;
            }
            var width = data.width, height = data.height;
            var matrix = helpers_1.createMatrix();
            _this.props.transform.forEach(function (transformation) {
                var key = Object.keys(transformation)[0];
                var startValue = transformation[key];
                var endValue = transformation.end || startValue;
                helpers_1.applyTransformToMatrix({
                    key: key,
                    startValue: startValue,
                    endValue: endValue,
                    tweenAmount: tweenAmount,
                    matrix: matrix
                });
            });
            var origin = {
                x: 0,
                y: 0,
                z: 0
            };
            switch (_this.props.origin) {
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
            helpers_1.transformOrigin(matrix, origin);
            _this.ref.setNativeProps({
                style: {
                    transform: [{ matrix: matrix }]
                }
            });
        };
        _this.onLayout = function (_a) {
            var nativeEvent = _a.nativeEvent;
            // only store the first layout event
            if (!_this.state.width && nativeEvent && nativeEvent.layout.width) {
                var newState_1 = {
                    width: nativeEvent.layout.width,
                    height: nativeEvent.layout.height
                };
                _this.setState(function () {
                    _this.setTransform(newState_1);
                    return newState_1;
                });
            }
        };
        return _this;
    }
    TransformView.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.animation) {
            this.listenerId = this.props.animation.addListener(function (_a) {
                var value = _a.value;
                _this.setTransform(undefined, value);
            });
        }
    };
    TransformView.prototype.componentWillUnmount = function () {
        if (this.props.animation) {
            this.props.animation.removeListener(this.listenerId);
        }
    };
    TransformView.prototype.render = function () {
        var _this = this;
        var _a = this.props, style = _a.style, children = _a.children, props = __rest(_a, ["style", "children"]);
        return (<react_native_1.Animated.View {...props} onLayout={this.onLayout} ref={function (ref) { return (_this.ref = ref); }} style={[style, !this.state.width && styles.hidden]}>
        {children}
      </react_native_1.Animated.View>);
    };
    return TransformView;
}(react_1.Component));
exports.default = TransformView;
