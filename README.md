## Meta for JavaScript
Meta is a fast and concise JavaScript library with an easy-to-remember, linear syntax.

Often, with many libraries, native JS code is mostly abstracted from the equation and embedded within "wrappers".
Meta aims to compliment native JS, but not replace it; thus, wrappers only exist for the items outlined within the core focus of meta-js. It's practical abstraction at it's finest.

## CORE FOCUS
Meta aims to make life easier when it comes to things like:
- DOM Traversal
- Element + List Manipulation
- Asynchronous Requests
- Event Handling
- Type Functions
- ...

## CODEBASE
https://github.com/o0110o/meta-js/

### BROWSER SUPPORT
DESKTOP
IE 9+
Chrome 4.0+
Safari 3.1+
Firefox 4.0+
Opera 10.0+

MOBILE
IE 10+
Chrome 33+
Safari 3.2+
Firefox 26+
Opera Mobile 10+
Android Browser 2.1+
BlackBerry 7.0+

### CONTEXT

``` js
// Each meta query can be optionally passed a context
meta('div', node); // Existing DOM node
meta('div', '#foo'); // Another Query
```
### CREATE ELEMENTS
You can optionally create elements like this:
``` js

newDiv = meta('<div>'); // Create DIV
```

### NATIVE CODE

``` js
// Each meta query can be optionally passed a context
meta('div')_(function(){...}); // Insert native code into the callback function
```

### METHODS, OPERATORS & WRAPPERS
Meta uses the "hitch" method API, which looks like this:
meta('.element')._(...)._(...);

In other words, every time you want to chain something, the same method structure is used.

Operators dictate the type of thing that you want to do: [ +: , o: , ?: , x: , #: , :: ]
+ Render	meta(...)._('+:...', ...);
o Obtain	meta(...)._('o:...', ...);
? Has		meta(...)._('?:...', ...);
x Remove	meta(...)._('x:...', ...);
# Toggle	meta(...)._('#:...', ...);
: Request	meta('http(s)://...', '!')._('::...', ...);

The following wraapers are currently available in Meta:

#### RENDER
``` js

// EVENTS

meta(document)._('+:event', 'ready', function(){...}); // DOMContentLoaded

meta('.element')._('+:event', 'click', function(){...}); // Event

meta('.element')._('+:event', 'click', 'once', function(){...}); // One-Time Event

meta('.element')._('+:event', 'click', '.delegatee', function(){...}); // Event Delgation

meta('.element')._('+:event', 'click', '.delegatee', 'once', function(){...}); // One-Time Event Delegation


// CLASSES

meta('.element')._('+:class', 'classname'); // Add Class


// STYLES

meta('.element')._('+:style', 'type', 'value'); // Add Style


// ATTRIBUTES

meta('.element')._('+:attribute', 'type', 'value'); // Add Attribute

```

#### OBTAIN
``` js

// BRANCHING

// Branch down from the selected element
meta('.element')._('o:branch');

// Branch down from the selected elements parent
meta('.element')._('o:branch', 'parent', '.optional_selector');

// Branch down from the selected elements parent and get the sibling elements relative to the selected element
meta('.element')._('o:branch', 'siblings', '.optional_selector');

// Branch down from the next sibling element relative to the selected element
meta('.element')._('o:branch', 'nextSibling', '.optional_selector');

// Branch down from the prior sibling element relative to the selected element
meta('.element')._('o:branch', 'priorSibling', '.optional_selector');

// Branch down from the first sibling element relative to the selected element
meta('.element')._('o:branch', 'firstSibling', '.optional_selector');

// Branch down from the last sibling element relative to the selected element
meta('.element')._('o:branch', 'lastSibling', '.optional_selector');

// Branch down from the first child element relative to the selected element
meta('.element')._('o:branch', 'firstChild', '.optional_selector');

// Branch down from the last child element relative to the selected element
meta('.element')._('o:branch', 'lastChild', '.optional_selector');

// Branch down from the offsetParent element relative to the selected element
meta('.element')._('o:branch', 'offsetParent', '.optional_selector');


// DOM NODES

meta('.element')._('o:parent'); // Parent Element

meta('.element')._('o:nextSibling'); // Next Sibling Element

meta('.element')._('o:priorSibling'); // Prior Sibling Element

meta('.element')._('o:firstSibling'); // First Sibling Element

meta('.element')._('o:lastSibling'); // Last Sibling Element

meta('.element')._('o:firstChild'); // First Child Element

meta('.element')._('o:lastChild'); // Last Child  Element

meta('.element')._('o:offsetparent'); // Offset Parent


// POSITION & SIZE
// outerWidth/outerHeight: Set "argument" to true if you want to include the margin

meta('.element')._('o:offest'); // Element Offset

meta('.element')._('o:outerWidth', 0); // Element Outer Width

meta('.element')._('o:outerHeight', 0); // Element Outer Height


// CLASSES

meta('.element')._('o:class'); // Obtain Class


// STYLES

meta('.element')._('o:style', 'type'); // Obtain Style


// ATTRIBUTES

meta('.element')._('o:attribute', 'type'); // Obtain Attribute

```

#### HAS
``` js

// DOM NODES

meta('.element')._('?:parent', '.optional_delegatee'); // Parent Element

meta('.element')._('?:nextSibling', '.optional_delegatee'); // Next Sibling Element

meta('.element')._('?:priorSibling', '.optional_delegatee'); // Prior Sibling Element

meta('.element')._('?:firstSibling', '.optional_delegatee'); // First Sibling Element

meta('.element')._('?:lastSibling', '.optional_delegatee'); // Last Sibling Element

meta('.element')._('?:firstChild', '.optional_delegatee'); // First Child Element

meta('.element')._('?:lastChild', '.optional_delegatee'); // Last Child Element

meta('.element')._('?:offsetParent', '.optional_delegatee'); // Offset Parent


// EVENT STATUS

meta('.element')._('?:focus'); // Focused Element


// MATCH

meta('.element')._('?:match', 'element'); // Matches Element


// CLASSES

meta('.element')._('?:class', '.class'); // Has Class


// STYLES

meta('.element')._('?:style', 'type', 'optional_value'); // Has Style


// ATTRIBUTES

meta('.element')._('?:attribute', 'type', 'optional_value'); // Has Attribute

```


#### REMOVE
``` js

// EVENTS

meta('.element').('x:event', function(){...})


// CONFLICT

meta('!').('x:conflict')


// DOM NODES

meta('.element')._('x:firstChild');

meta('.element')._('x:lastChild');

meta('.element')._('x:firstSibling');

meta('.element')._('x:lastSibling');

meta('.element')._('x:priorSibling');

meta('.element')._('x:nextSibling');

meta('.element')._('x:parent');

meta('.element')._('x:self');

meta('.element')._('x:child', '.delegatee');

meta('.element')._('x:class', 'classname');

meta('.element')._('x:style', 'type');

meta('.element')._('x:attribute', 'type');


// CLASSES

meta('.element')._('x:class', 'classname');


// STYLES

meta('.element')._('x:style', 'type');

// ATTRIBUTES

meta('.element')._('x:attribute', 'type');

```


#### TOGGLE
``` js

// CLASSES
// swap
meta('.element')._('x:class', 'classnameA', 'classnameB');

// STYLES
// on/off
meta('.element')._('x:class', 'type', 'value');

// ATTRIBUTES
// on/off
meta('.element')._('x:class', 'type', 'value');

```
#### REQUEST
``` js

meta('http://someurl.com', '!')._('http:post', function(){...});

meta('http://someurl.com', '!')._('http:get', function(){...});

```

### Example Usage

``` js
meta('.element')._('o:branch', 'siblings', '.element:not(.class)')._(function(){ alert('YeeHaw!') });

```

### Type Functions
``` js
isObject(argument);

isBoolean(argument);

isNumber(argument);

isFunction(argument);

isArray(argument);

isDate(argument);

isRegex(argument);

isError(argument);

isElement(argument);

isDocument(argument);

isWindow(argument);

isString(argument);

isPlainObject(argument);

likeArray(argument);

isNodeList(argument);

isMatch(argument);

```

### Array Functions
``` js
// FLATTEN AN ARRAY
linearArray(array);

// KEEP THE UNIQUE ITEMS IN AN ARRAY
uniqueArray(array);

// SHUFFLE ARRAY
shuffleArray(array);

```

### GIVING BACK
Are you using this library in a production environment?
Consider [leaving a tip](https://www.gittip.com/o0110o) to show your appreciation.