/*
Copyright (C) 2012 Greg Smith <gsmith@incompl.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

Object.prototype.beget = function(o) {
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
};

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
};
