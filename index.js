function PureRender(component){
    if (typeof component !== "function") {
        throw new TypeError('PureRender: called without a component as the first argument');
    }

    if (component.prototype.shouldComponentUpdate) {
        throw new Error('PureRender: called on a component that already implements shouldComponentUpdate');
    }

    // mutation
    component.prototype.shouldComponentUpdate = PureRender.shouldComponentUpdate;

    return component;
}
module.exports = PureRender;

var hasOwn = Object.prototype.hasOwnProperty;
function shallowEquals(a, b){
    // primitives (usually undefined)
    if (a === b) {
        return true;
    }

    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);

    // prevents us from having to look at each key in b
    if (aKeys.length !== bKeys.length) {
        return false;
    }

    // TODO: loop for perf
    return aKeys.every(function(key){
        return hasOwn.call(b, key) && a[key] === b[key];
    });
}

PureRender.shouldComponentUpdate = function(nextProps, nextState){
   return !shallowEquals(this.props, nextProps) || !shallowEquals(this.state, nextState);
};
