Object.inherit = (function(protoSupported) {
    return function(o) {
        var result;
        if (o && protoSupported) {
            o.__proto__ = this;
            result = o;
        }
        else {
            function F() {}
            F.prototype = this;
            var result = new F();
            if (o) {
                for (var key in o) {
                    if (o.hasOwnProperty(key)) {
                        result[key] = o[key];
                    }
                }
            }
        }
        return result;
    }
})(Object.__proto__ !== undefined);

Object._super = function _super(_internal, method) {
    var args = [].slice.call(arguments);
    if (typeof _internal === 'string') {
        method = _internal;
        _internal = {context: this, orig: this, caller:_super.caller};
        args.unshift(_internal);
    }
    if (_internal.context[method] === _internal.caller && _internal.context.hasOwnProperty(method)) {
        return _internal.context.__proto__[method].apply(_internal.orig, args.slice(2));
    }
    args[0].context = _internal.context.__proto__;
    return _super.apply(this, args);
}
