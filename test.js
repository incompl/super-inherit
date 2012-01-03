// ==========================================
// beget module

module('betget');

test('simple inheritance', function() {

  var Parent = {
    foo:'val1'
  };

  var child = Parent.beget({
    bar:'val2'
  });

  equal(child.foo, 'val1', 'basic inheritance');
  equal(child.bar, 'val2', 'basic property access');

});

// ==========================================
// super module

module('super');

test('simple super', function() {

  var Parent = {
    doSomething:function() {
      return 'parent done';
    }
  };

  var child = Parent.beget({
    doSomething:function() {
      return this._super('doSomething');
    },
    doSomethingBroken:function() {
      return this._super('dne');
    }
  });

  equal(child.doSomething(), 'parent done', 'simple super');
  try {
    child.doSomethingBroken();
    ok(false, 'broken super did not throw exception');
  }
  catch (e) {
    ok(true, 'broken super threw exception');
  }

});

test('advanced super', function() {

  var Top = {
    foo:function() {
      return 'bar';
    },
    doTop:function() {
      return 'top';
    }
  };

  var Middle = Top.beget({
    doTop:function() {
      return this._super('doTop');   
    },
    doTopAlso:function() {
      return this._super('doTop');   
    }
  });

  var Bottom = Middle.beget({
    foo:function() {
      return this._super('foo');
    },
    baz:function() {
      return this._super('foo');
    },
    doTop:function() {
      return this._super('doTop');
    }
  });

  equal(Bottom.foo(), 'bar', 'distant super');
  equal(Bottom.baz(), 'bar', 'super of method with different name');
  equal(Bottom.doTop(), 'top', 'multiple supers');
  equal(Bottom.doTopAlso(), 'top', 'inherit and use method that has super');

});

test('parameterized super', function() {

  var Top = {
    multi:function(a, b, c, d, e) {
      return a + b + c + d + e;
    }
  };

  var Bottom = Top.beget({
    multi: function() {
      return this._super('multi', 1, 2, 3, 4, 5);
    }
  });

  equal(Bottom.multi(), 15, 'super with 5 parameters');

});

test('super without beget', function() {

  function Foo() {
    this.action = function() {
      return 'result';
    }
  }
  var foo = new Foo();

  function Bar() {
    this.action = function() {
      return this._super('action');
    }
  }
  Bar.prototype = foo;
  var bar = new Bar();

  equal(bar.action(), 'result', 'super without beget');

});
