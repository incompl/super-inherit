Object.prototype.inherit = function(o) {
    var result;
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
    return result;
}

Object.prototype._super = function _super(_internal, method) {
    var args = [].slice.call(arguments);
    if (typeof _internal === 'string') {
        method = _internal;
        _internal = {context: this, orig: this, caller:_super.caller};
        args.unshift(_internal);
    }
    var atCallerLevel = false;
    for (var key in _internal.context) {
      if (_internal.context[key] === _internal.caller) {
        atCallerLevel = true;
        break;
      }
    }
    if (atCallerLevel && _internal.context.hasOwnProperty(method)) {
        return Object.getPrototypeOf(_internal.context)[method].apply(_internal.orig, args.slice(2));
    }
    args[0].context = Object.getPrototypeOf(_internal.context);
    return _super.apply(this, args);
}

if (Object.prototype.getPrototypeOf === undefined) {
    Object.prototype.getPrototypeOf = function(o) {
        if (o.__proto__ !== undefined) {
            return o.__proto__;
        }
        else if (o.constructor !== undefined) {
            return o.constructor.prototype;
        }
    }
}
