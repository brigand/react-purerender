import PureRender from '../';
var test = require('tape');

test('basics', function(t){
    t.plan(4);

    @PureRender
    class Foo {
        constructor(){
            this.props = {a: 1};
            this.state = {b: 2};
        }
    }

    var foo = new Foo();
    t.ok(foo.shouldComponentUpdate, 'it exists');
    t.equal(foo.shouldComponentUpdate({a: 1}, {b: 2}), false);
    t.equal(foo.shouldComponentUpdate({a: 2}, {b: 2}), true);
    t.equal(foo.shouldComponentUpdate({a: 1, c: 3}, {b: 2}), true);
});

