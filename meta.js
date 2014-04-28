//----------------------------------------------------------------------
// MODULAR DEFINITION
//----------------------------------------------------------------------
(function (window, undefined) {

    var
    //----------------------------------------------------------------------
    // MAPPPING OVER META & $ IN CASE OF OVERWRITE
    //----------------------------------------------------------------------
    _meta = window.meta,
    _$ = window.$,

    //----------------------------------------------------------------------
    // USE THE CORRECT DOCUMENT ACCORDINGLY WITH WINDOW ARGUMENT
    //----------------------------------------------------------------------
    document = window.document,
    location = window.location,
    navigator = window.navigator,
    html = document.documentElement,

    //----------------------------------------------------------------------
    // CURRENT VERSION
    //----------------------------------------------------------------------
    version = '0.0.0';

    //----------------------------------------------------------------------
    // TYPE FUNCTIONS
    //----------------------------------------------------------------------
    isObject = function (argument) {
        // [object Object]
        if (argument !== null && argument instanceof Object) {
            return true;
        }
    }
    isBoolean = function (argument) {
        // [object Boolean]
        if (argument !== null && typeof argument === 'boolean') {
            return true;
        }
    }
    isNumber = function (argument) {
        // [object Number]
        if (argument !== null && typeof argument === 'number') {
            return true;
        }
    }
    isFunction = function (argument) {
        // [object Function]
        if (argument !== null && typeof argument === 'function') {
            return true;
        }
    }
    isArray = function (argument) {
        // [object Array]
        if (argument !== null && argument instanceof Array) {
            return true;
        }
    }
    isDate = function (argument) {
        // [object Date]
        if (argument instanceof Date) {
            return true;
        }
    }
    isRegex = function (argument) {
        // [object RegExp]
        if (argument !== null && typeof argument === 'regexp') {
            return true;
        }
    }
    isError = function (argument) {
        // [object Error]
        if (argument !== null && typeof argument === 'error') {
            return true;
        }
    }
    isElement = function (argument) {
        if (argument !== null && argument.nodeType === 1) {
            return true;
        }
    }
    isDocument = function (argument) {
        if (argument !== null && argument.nodeType === 9) {
            return true;
        }
    }
    isWindow = function (argument) {
        if (argument !== null && argument === argument.window) {
            return true;
        }
    }
    isString = function (argument) {
        if (argument !== null && argument.substring) {
            return true;
        }
    }
    isPlainObject = function (argument) {
        if (argument !== null && argument instanceof Object && argument !== argument.window && Object.getPrototypeOf(argument) === Object.prototype) {
            return true;
        }
    }
    likeArray = function (argument) {
        if (argument !== null && typeof argument === 'object' && isFinite(argument.length)) {
            return true;
        }
    }
    isNodeList = function (argument) {
        if (argument !== null && typeof argument === 'object' && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(argument)) && argument.hasOwnProperty("length") && (0 === argument.length || "object" === typeof argument[0] && 0 < argument[0].nodeType) ? !0 : !1) {
            return true;
        }
    }
    isMatch = function (target, selector) {
        return target.matches(selector) ||
            target.matchesSelector(selector) ||
            target.webkitMatchesSelector(selector) ||
            target.mozMatchesSelector(selector) ||
            target.msMatchesSelector(selector) ||
            target.oMatchesSelector(selector);
    }

    //----------------------------------------------------------------------
    // ARRAY / NODELIST HELPER FUNCTIONS
    //----------------------------------------------------------------------
    // Flatten an array
    linearArray = function (array) {
        for (var result = [], i = 0, l = array.length; i < l; ++i) {
            if (likeArray(array[i])) {
                (result = result.concat(array[i]));
            } else {
                (result[result.length] = array[i]);
            }
        }
        return result;
    }
    // Keep the unique items in an array
    uniqueArray = function (array) {
        var a = [],
            i, j
        label: for (i = 0; i < array.length; i++) {
            for (j = 0; j < a.length; j++) {
                if (a[j] === array[i]) {
                    continue label
                }
            }
            a[a.length] = array[i]
        }
        return a
    }
    // Shuffle array
    shuffleArray = function (array) {
        for (var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
        return array;
    };
    // toArray is a function bound to the call() function of Function.prototype, with the this value set to the toArray() function of Array.prototype. This means that additional call() calls can be eliminated
    toArray = Function.prototype.call.bind(Array.prototype.slice);

    //----------------------------------------------------------------------
    // ELEMENT HELPER FUNCTIONS
    //----------------------------------------------------------------------
    // Single pseudo-element
    _PSEUDO_ELEMENT = function (target) {
        return target.match(/[:]{1,2}(?:first\-(letter|line)|before|after|selection|value|choices|repeat\-(item|index)|outside|alternate|(line\-)?marker|slot\([_a-z0-9\-\+\.\\]*\))/i);
    }
    // Pseudo-elements
    _PSEUDO_ELEMENTS = function (target) {
        return target.match(/([:]{1,2}(?:first\-(letter|line)|before|after|selection|value|choices|repeat\-(item|index)|outside|alternate|(line\-)?marker|slot\([_a-z0-9\-\+\.\\]*\)))/ig);
    }
    // Pseudo-classes (except :not() )
    _PSEUDO_CLASSES = function (target) {
        return target.match(/([:](?:(link|visited|active|hover|focus|lang|root|empty|target|enabled|disabled|checked|default|valid|invalid|required|optional)|((in|out\-of)\-range)|(read\-(only|write))|(first|last|only|nth)(\-last)?\-(child|of\-type))(?:\([_a-z0-9\-\+\.\\]*\))?)/ig);
    }
    // Attribute targets
    _ATTRIBUTE = function (target) {
        return target.match(/(\[\s*[_a-z0-9-:\.\|\\]+\s*(?:[~\|\*\^\$]?=\s*[\"\'][^\"\']*[\"\'])?\s*\])/ig);
    }
    // ID targets
    _ID = function (target) {
        return target.match(/(#[a-z]+[_a-z0-9-:\\]*)/ig);
    }
    // Class targets
    _CLASS = function (target) {
        return target.match(/(\.[_a-z]+[_a-z0-9-:\\]*)/ig);
    }
    // !important rule
    _IMPORTANT = function (target) {
        return target.match(/\!\s*important\s*$/i);
    }
    // Complex strings (><+-:!...)
    _COMPLEX_STRING = function (target) {
        return target.match(/[\s\<\>\+\~\,\:\^\[\]\@\%\=\!\{\}\*\$\\\&\?\/]/);
    }
    // Handler for querySelectorAll
    isQSA = _COMPLEX_STRING || _PSEUDO_ELEMENT || _PSEUDO_ELEMENTS || _PSEUDO_CLASSES || _ATTRIBUTE;
    // Handler for a single class
    isClass = _CLASS;
    // Handler for a single id
    isID = _ID;
    // Handler for a single tagname
    isTag = function (target) {
        if (!isID(target) && !isClass(target) && !isQSA(target)) {
            return true;
        }
    }

    //----------------------------------------------------------------------
    // "root" & "target" HANDLER
    //----------------------------------------------------------------------
    setup = function (target, root) {
        // HANDLE: $(""), $(null), $(undefined), $(false)
        // IF "target" IS EMPTY META WILL RETURN THE ENTIRE DOCUMENT STRUCTURE

        // "root"
        if (!root) root = document
        if (isString(root)) {
            if (root !== "!") {
                if (isID(root)) root = document.getElementById(root.replace(/\#/g, ""));
                else if (isClass(root)) root = document.getElementsByClassName(root.replace(/\./g, ""));
                else root = document.querySelector(root);
            }
        }
        if (root !== "!" && !root.nodeType && likeArray(root)) root = root[0];

        // Set target as HTML
        if (!target) target = html;

        if (root !== "!" && target !== "!") {
            // If target is a string
            if (isString(target)) {
                // Trim the spaces
                var target = target.trim();
                // Create an element
                if (target.match(/(<[a-z]([^>]+)>)/ig)) {
                    target = target.replace(/</ig, "").replace(/>/ig, "");
                    document.createElement(target);
                    return;
                }
                // If this is a single classname getElementById is used
                else if (isID(target)) {
                    $target = [root.getElementById(target.replace(/\#/g, ""))];
                }
                // If this is a single classname getElementsByClassName is used
                else if (isClass(target)) {
                    $target = toArray(root.getElementsByClassName(target.replace(/\./g, "")));
                }
                // If this is a single classname getElementsByTagName is used
                else if (isTag(target)) {
                    $target = toArray(root.getElementsByTagName(target));
                }
                // querySelectorAll
                else {
                    $target = toArray(root.querySelectorAll(target));
                }
            }
            // NodeList
            else if (isNodeList(target)) {
                // Converting nodelist to array
                $target = toArray(target);
            }
            // Array
            else if (isArray(target)) {
                $target = target;
            }
            // Single Element
            else if (isElement(target)) {
                // Putting element in array
                $target = [target];
            }
            // Clean the array
            $target = uniqueArray(linearArray($target.filter(function (e) {
                return e
            })));
        } else {
            $target = [target];
        }

        if (typeof cache === 'undefined' || $target !== cache.get.$target) {
            // Cache the array for future use
            cache = {
                get: {
                    '$target': $target
                }
            }
        }
        // Redefine the $target variable to include the cached array
        $target = cache.get.$target;

        // Return the elements
        return $target;
    }

    //----------------------------------------------------------------------
    // "meta" OBJECT
    //----------------------------------------------------------------------
    var meta = (function () {

        // DEFINE A LOCAL COPY OF META
        var meta = function (target, root) {
            // THE META OBJECT IS ACTUALLY JUST AN 'ENHANCED' INIT CONSTRUCTOR
            return new meta.fn.init(target, root);
        };

        // STRUCTURE THE META OBJECT
        meta.fn = meta.prototype = {

            meta: version,
            constructor: meta,

            init: function (target, root) {
                //----------------------------------------------------------------------
                // PREVENT LOOPING BY ENCAPSULATION,
                // CREATING AN INSTANCE OF ITSELF IF IT IS IN THE WINDOW SCOPE
                //----------------------------------------------------------------------
                if (window === this) {
                    return new meta.fn.init(target, root);
                }

                //----------------------------------------------------------------------
                // $target IS THE LIST OF ELEMENTS THAT WERE QUERIED 
                //----------------------------------------------------------------------
                $target = setup(target, root);
            },
            //----------------------------------------------------------------------
            // METHOD API: HITCH._([RENDER, OBTAIN, HAS, REMOVE, TOGGLE, HTTP]:[MODE], ...)
            //----------------------------------------------------------------------
            _: function (mode, argumentA, argumentB, argumentC, argumentD) {

                //----------------------------------------------------------------------
                // NATIVE CODE $(...)._(function(){...});
                //----------------------------------------------------------------------
                if (isFunction(mode)) {
                    for (var i = $target.length - 1; i >= 0; i--) {
                        if (isElement($target[i])) {
                            mode.call($target[i]);
                            //mode.call(argumentB, i, $target[i]);
                        }
                    }
                    return this;
                }
                //----------------------------------------------------------------------
                // RENDER $(...)._('+:...', ...);
                //----------------------------------------------------------------------
                if (mode.indexOf("+:") > -1) {
                    for (var i = $target.length - 1; i >= 0; i--) {
                        if (isElement($target[i])) {
                            if ("+:event" === mode) {
                                // DOMREADY EVENT
                                if (argumentA === 'ready') {
                                    // WHEN "DOMContentLoaded" HAPPENS; OR AFTER IF YOU'VE ALREADY REGISTERED FOR IT.
                                    if ($target[i].readyState === "complete" || $target[i].readyState === "loaded" || (!(window.ActiveXObject || "ActiveXObject" in window) && $target[i].readyState === "interactive")) { // IE10 fires interactive too early
                                        argumentB.bind($target[i]);
                                    } else {
                                        $target[i].addEventListener("DOMContentLoaded", argumentB.bind($target[i]), 0);
                                    }
                                }
                                // HANDLES EVENT DELEGATION AND/OR ONE-TIME EVENTS
                                else if (!isFunction(argumentB)) {
                                    $target[i].addEventListener(argumentA, function (e) {
                                        e = e || window.event;
                                        e.target = e.target || e.srcElement;
                                        if (argumentB === 'once') {
                                            e.target.removeEventListener(e.type, arguments.callee, 0);
                                            argumentC.call(e.target);
                                        } else if (isFunction(argumentC) || isFunction(argumentD)) {
                                            delegatee = toArray(this.querySelectorAll(argumentB));
                                            for (var n = delegatee.length - 1; n >= 0; n--) {
                                                if (e.target === delegatee[n]) {
                                                    if (argumentC === 'once') {
                                                        this.removeEventListener(e.type, arguments.callee, 0);
                                                        argumentD.call(e.target);
                                                    } else {
                                                        argumentC.call(e.target);
                                                    }
                                                }
                                            }
                                        }
                                    }, 0);
                                }
                                // BASIC EVENT HANDLER
                                else {
                                    $target[i].addEventListener(argumentA, argumentB.bind($target[i]), 0);
                                }
                            }
                            else if (mode === '+:class') {
                                $target[i].classList.add(argumentA);
                            }
                            else if (mode === '+:style') {
                                $target[i].style[argumentA] = argumentB;
                            }
                            else if (mode === '+:attribute') {
                                $target[i].setAttribute(argumentA, argumentB);
                            }
                        }
                    }
                    return this;
                }
                //----------------------------------------------------------------------
                // OBTAIN $(...)._('o:...', ...);
                //----------------------------------------------------------------------
                if (mode.indexOf("o:") > -1) {
                    // Get Branch
                    if (mode === 'o:branch') {
                        $results = [];
                        for (var i = $target.length - 1; i >= 0; i--) {
                            if (isElement($target[i])) {
                                if (argumentA === 'firstChild') {
                                    if (argumentB) {
                                        $results = toArray($target[i].firstElementChild.querySelectorAll(argumentB));
                                    }
                                    else {
                                        $results = toArray($target[i].firstElementChild.children);
                                    }
                                }
                                else if (argumentA === 'lastChild') {
                                    if (argumentB) {
                                        $results = toArray($target[i].lastElementChild.querySelectorAll(argumentB));
                                    }
                                    else {
                                        $results = toArray($target[i].lastElementChild.children);
                                    }
                                }
                                else if (argumentA === 'firstSibling') {
                                    if (argumentB) {
                                        $results = toArray($target[i].parentNode.firstElementChild.querySelectorAll(argumentB));
                                    }
                                    else {
                                        $results = toArray($target[i].parentNode.firstElementChild.children);
                                    }
                                }
                                else if (argumentA === 'lastSibling') {
                                    if (argumentB) {
                                        $results = toArray($target[i].parentNode.lastElementChild.querySelectorAll(argumentB));
                                    }
                                    else {
                                        $results = toArray($target[i].parentNode.lastElementChild.children);
                                    }
                                }
                                else if (argumentA === 'priorSibling') {
                                    if (argumentB) {
                                        $results = toArray($target[i].previousElementSibling.querySelectorAll(argumentB));
                                    }
                                    else {
                                        $results = toArray($target[i].previousElementSibling.children);
                                    }
                                }
                                else if (argumentA === 'nextSibling') {
                                    if (argumentB) {
                                        $results = toArray($target[i].nextElementSibling.querySelectorAll(argumentB));
                                    }
                                    else {
                                        $results = toArray($target[i].nextElementSibling.children);
                                    }
                                }
                                else if (argumentA === 'offsetParent') {
                                	thisOffsetParent = $target[i].offsetParent || $target[i];
                                    if (argumentB) {
                                        $results = toArray(thisOffsetParent.querySelectorAll(argumentB));
                                    }
                                    else {
                                        $results = toArray(thisOffsetParent.children);
                                    }
                                }
                                else if (argumentA === 'parent' || argumentA === 'siblings') {
                                    $results = [];
                                    if (argumentB) {
                                        $branch = toArray($target[i].parentNode.querySelectorAll(argumentB));
                                    }
                                    else {
                                        $branch = toArray($target[i].parentNode.children);
                                    }
                                    if (argumentA === 'siblings') {
                                        for (var n = $branch.length - 1; n >= 0; n--) {
                                            if ($branch[n] !== $target[i]) {
                                                $results.push($branch[n]);
                                            }
                                        }
                                    }
                                    else {
                                        $results = $branch;
                                    }
                                }
                                else if (argumentA) {
                                    $results = toArray($target[i].querySelectorAll(argumentA));
                                }
                                else {
                                    $results = toArray($target[i].children);
                                }
                            }
                        }
                        return $($results);
                    }
                    for (var i = $target.length - 1; i >= 0; i--) {
                        if (isElement($target[i])) {
                            if (mode === 'o:parent') {
                                $($target[i].parentNode);
                            }
                            else if (mode === 'o:priorSibling') {
                                $($target[i].previousElementSibling);
                            }
                            else if (mode === 'o:nextSibling') {
                                $($target[i].nextElementSibling);
                            }
                            else if (mode === 'o:firstSibling') {
                                $($target[i].parentNode.firstElementChild);
                            }
                            else if (mode === 'o:lastSibling') {
                                $($target[i].parentNode.lastElementChild);
                            }
                            else if (mode === 'o:firstChild') {
                                $($target[i].firstElementChild);
                            }
                            else if (mode === 'o:lastChild') {
                                $($target[i].lastElementChild);
                            }
                            else if (mode === 'o:offset') {
                                $target = {
                                    top: $target[i].offsetTop,
                                    left: $target[i].offsetLeft
                                }
                            }
                            else if (mode === 'o:offsetParent') {
                                $target[i].offsetParent || $target[i];
                            }
                            else if (mode === 'o:outerHeight') {
                                // Get outerHeight: Set "argumentA" to true if you want to include the margin
                                var height = $target[i].offsetHeight;
                                if (argumentA) {
                                    var style = getComputedStyle($target[i]);
                                    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
                                }
                            }
                            else if (mode === 'o:outerWidth') {
                                // Get outerWidth: Set "argumentA" to true if you want to include the margin
                                var width = $target[i].offsetWidth;
                                if (argumentA) {
                                    var style = getComputedStyle($target[i]);
                                    width += parseInt(style.marginLeft) + parseInt(style.marginRight);
                                }
                            }
                            else if (mode === 'o:index') {
                                argumentA ? $target[i][argumentA] : $target[i];
                            }
                            else if (mode === 'o:class') {
                                $target[i].className;
                            }
                            else if (mode === 'o:style') {
                                $target[i].style[argumentA];
                            }
                            else if (mode === 'o:attribute') {
                                $target[i].getAttribute(argumentA);
                            }
                        }
                    }
                    return this;
                }
                //----------------------------------------------------------------------
                // HAS $(...)._('?:...', ...);
                //----------------------------------------------------------------------
                if (mode.indexOf("?:") > -1) {
                    for (var i = $target.length - 1; i >= 0; i--) {
                        if (isElement($target[i])) {
                            if (mode === '?:parent') {
                                thisParent = $target[i].parentNode;
                                '#' + thisParent.id === argumentA || '.' + thisParent.className === argumentA || thisParent.tagName === argumentA || thisParent.name === argumentA;
                            }
                            else if (mode === '?:priorSibling') {
                                thisPrior = $target[i].previousElementSibling;
                                '#' + thisPrior.id === argumentA || '.' + thisPrior.className === argumentA || thisPrior.tagName === argumentA || thisPrior.name === argumentA;
                            }
                            else if (mode === '?:nextSibling') {
                                thisNext = $target[i].nextElementSibling;
                                '#' + thisNext.id === argumentA || '.' + thisNext.className === argumentA || thisNext.tagName === argumentA || thisNext.name === argumentA;
                            }
                            else if (mode === '?:firstSibling') {
                                thisFirst = $target[i].parentNode.firstElementChild;
                                '#' + thisFirst.id === argumentA || '.' + thisFirst.className === argumentA || thisFirst.tagName === argumentA || thisFirst.name === argumentA;
                            }
                            else if (mode === '?:lastSibling') {
                                thisLast = $target[i].parentNode.lastElementChild;
                                '#' + thisLast.id === argumentA || '.' + thisLast.className === argumentA || thisLast.tagName === argumentA || thisLast.name === argumentA;
                            }
                            else if (mode === '?:firstChild') {
                                thisFirst = $target[i].firstElementChild;
                                '#' + thisFirst.id === argumentA || '.' + thisFirst.className === argumentA || thisFirst.tagName === argumentA || thisFirst.name === argumentA;
                            }
                            else if (mode === '?:lastChild') {
                                thisLast = $target[i].lastElementChild;
                                '#' + thisLast.id === argumentA || '.' + thisLast.className === argumentA || thisLast.tagName === argumentA || thisLast.name === argumentA;
                            }
                            else if (mode === '?:offsetParent') {
                                thisOffsetParent = $target[i].offsetParent || $target[i];
                                '#' + thisOffsetParent.id === argumentA || '.' + thisOffsetParent.className === argumentA || thisOffsetParent.tagName === argumentA || thisOffsetParent.name === argumentA;
                            }
                            else if (mode === '?:focus') {
                                $target[i] = document.activeElement;
                            }
                            else if (mode === '?:match') {
                                isMatch($target[i], argumentA);
                            }
                            else if (mode === '?:class') {
                                $target[i].classList.contains(argumentA);
                            }
                            else if (mode === '?:style') {
                                // Has Style Value
                                if (argumentA) {
                                    if ($target[i][argumentA] === argumentB) {
                                        return !0;
                                    } else {
                                        return 0;
                                    }
                                }
                                // Has Style
                                else {
                                    getComputedStyle($target[i][argumentA]);
                                }
                            }
                            else if (mode === '?:attribute') {
                                // Has Attribute Value
                                if (argumentA) {
                                    if ($target[i].getAttribute(argumentA) === argumentB) {
                                        return !0;
                                    } else {
                                        return 0;
                                    }
                                }
                                // Has Attribute
                                else {
                                    $target[i].hasAttribute(argumentA);
                                }
                            }
                        }
                    }
                    return this;
                }
                //----------------------------------------------------------------------
                // REMOVE $(...)._('x:...', ...);
                //----------------------------------------------------------------------
                if (mode.indexOf("x:") > -1) {

                    // $('!').('x:conflict') will restore the global $ to its prior value.
                    if ("x:conflict" === mode) {
                        if (window.$ === meta) {
                            window.$ = _$;
                        }
                        if (window.meta === meta) {
                            window.meta = _meta;
                        }
                        if (meta) {
                            return meta;
                        }
                    }

                    for (var i = $target.length - 1; i >= 0; i--) {
                        if (isElement($target[i])) {
                            if (mode === 'x:event') {
                                $target[i].removeEventListener(argumentA, argumentB.bind($target[i]), 0);
                            }
                            else if (mode === 'x:priorSibling') {
                                $target[i].parentNode.removeChild($target[i].previousElementSibling);
                            }
                            else if (mode === 'x:nextSibling') {
                                $target[i].parentNode.removeChild($target[i].nextElementSibling);
                            }
                            else if (mode === 'x:firstSibling') {
                                $target[i].parentNode.removeChild($target[i].parentNode.firstElementChild);
                            }
                            else if (mode === 'x:lastSibling') {
                                $target[i].parentNode.removeChild($target[i].parentNode.lastElementChild);
                            }
                            else if (mode === 'x:firstChild') {
                                $target[i].removeChild($target[i].firstElementChild);
                            }
                            else if (mode === 'x:lastChild') {
                                $target[i].removeChild($target[i].lastElementChild);
                            }
                            else if (mode === 'x:parent') {
                                $target[i].parentNode.parentNode.removeChild($target[i].parentNode);
                            }
                            else if (mode === 'x:self') {
                                $target[i].parentNode.removeChild($target[i]);
                            }
                            else if (mode === 'x:child') {
                                $target[i].removeChild($target[i].querySelectorAll(argumentA));
                            }
                            else if (mode === 'x:class') {
                                $target[i].classList.remove(argumentA);
                            }
                            else if (mode === 'x:style') {
                                $target[i].style[argumentA] = '';
                            }
                            else if (mode === 'x:attribute') {
                                $target[i].removeAttribute(argumentA);
                            }
                        }
                    }
                }
                //----------------------------------------------------------------------
                // TOGGLE $(...)._('#:...', ...);
                //----------------------------------------------------------------------
                if (mode.indexOf("#:") > -1) {
                    for (var i = $target.length - 1; i >= 0; i--) {
                        if (isElement($target[i])) {
                            // Toggle Attribute
                            if (mode === '#:attribute') {
                                if ($target[i].getAttribute(argumentA) !== argumentB) {
                                    $target[i].setAttribute(argumentA, argumentB);
                                }
                                else {
                                    $target[i].setAttribute(argumentA, "");
                                }
                            }
                            // Toggle Style
                            else if (mode === '#:style') {
                                if ($target[i].style[argumentA] !== argumentB) {
                                    $target[i].style[argumentA] = argumentB;
                                }
                                else {
                                    $target[i].style[argumentA] = '';
                                }
                            }
                            // Toggle Class
                            else if (mode === '#:class') {
                                $target[i].classList.toggle(argumentA, argumentB);
                            }
                        }
                    }
                }
                //----------------------------------------------------------------------
                // REQUEST $('http://...', '!')._(::..., function(){...})
                //----------------------------------------------------------------------
                if (mode.indexOf("::") > -1) {
                    methodFilter = mode.toUpperCase.split('::');
                    method = methodFilter[0];
                    if (argumentB) {
                        callback = argumentB();
                    }

                    for (var i = $target.length - 1; i >= 0; i--) {
                        $status = 'FAILURE';
                        if (isString($target[i])) {
                            if ($target[i].indexOf("http://") > -1 || $target[i].indexOf("https://") > -1) {
                                try {
                                    var xmlHttp = (this.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0') || (console.log("Your browser does not support Ajax")); // code for IE, Firefox, Chrome, Opera, Safari 
                                    if (!xmlHttp) {
                                        return;
                                    }
                                    xmlHttp.open(method ? 'POST' : 'GET', $target[i], 1);
                                    if (method === 'POST') {
                                        xmlHttp.setRequestHeader('User-Agent', 'XMLHTTP/1.0');
                                    }
                                    // Headers & Callback
                                    xmlHttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                                    xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                                    request.onreadystatechange = function () {
                                        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                                            // Pass "xmlHttp" as an argument and call "xmlHttp.responseText" in your callback function
                                            if (callback) {
                                                callback();
                                            }
                                            else {
                                                console.log('There was no callback function for "xmlHttp".');
                                            }
                                        }
                                    }
                                    xmlHttp.onsucess = function () {
                                        $status = 'SUCCESS';
                                    }
                                    xmlHttp.onerror = function () {
                                        $status = 'FAILURE';
                                    }
                                    xmlHttp.send();
                                }
                                catch (e) {
                                    // Logging
                                    console.log(e);
                                }
                            }
                            else {
                                mode = mode + ' is not a valid mode';
                            }
                            console.log($status + ': ' + mode + ' | ' + arguments);
                        }
                    }
                    return this;
                }
            }
        }
        // Give the init function the meta prototype for later instantiation
        meta.fn.init.prototype = meta.fn;

        // Extend the meta object ...
        // meta.extend = meta.fn.extend = {}

        // Return the meta object
        return (window.meta = window.$ = meta);
    })();
})(window);