It's just syntax sugar.  It does a few sanity checks and then sticks a shouldComponentUpdate function on your class.

```js
import PureRender from 'react-purerender';

@PureRender
class Foo extends React.Component {
    // stuff
}
```

Sanity checks:
- checks you don't call it on a falsy value (undefined)
- checks the thing you call it on doesn't have shouldComponentUpdate

The latter differes from the mixin implementation, because merging the results of should component update
functions is weird and confusing. If you need that, shouldComponentUpdate is exposed

```js
class Foo extends React.Component {
  shouldComponentUpdate(){
    return PureRender.shouldComponentUpdate.call(this, ...arguments) || magicGlobalThingWasChanged();
  }
}
```

Or react-mixin:

```js
import {shouldComponentUpdate} from 'react-purerender';
import reactMixin from 'reactMixin';

@reactMixin.decorate({shouldComponentUpdate})
class Foo extends React.Component {
    shouldComponentUpdate(){
      // what happens if I return false and PureRender returns true?
      // I dunno... try it I guess, hope there's a test
    }
}
```

That's it really, file an issue if you notice an edge case. I wrote this because I need it
for most of my components and I've switched to es6 classes.
