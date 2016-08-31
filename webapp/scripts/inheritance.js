function inherits(childConstructor, parentConstructor) {
    var TempConstructor = function(){};
    TempConstructor.prototype = parentConstructor.prototype;
    childConstructor.prototype = new TempConstructor();
    childConstructor.prototype.constructor = childConstructor;
}