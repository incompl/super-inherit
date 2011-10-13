Object.inherit = function(o) {
    var result;
    if (o && o.__proto__) {
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

Object._super = function __super(_internal, method) {
    var args = [].slice.call(arguments);
    if (typeof _internal === 'string') {
        method = _internal;
        _internal = {context: this, orig: this};
        args.unshift(_internal);
    }
    if (_internal.context.hasOwnProperty(method)) {
        return _internal.context.__proto__[method].apply(_internal.orig, args.slice(2));
    }
    args[0].context = _internal.context.__proto__;
    return __super.apply(this, args);
}
