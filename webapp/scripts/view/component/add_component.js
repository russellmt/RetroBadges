inherits(AddComponent, Component);

function AddComponent(_callBack, _tooltip) {
    Component.call(this);

    var callBack = _callBack;
    var tooltip = _tooltip;

    //Override
    this.createElement = function() {
        var el = document.createElement('div');
        el.setAttribute('class', 'action-link positive-link add no-select');
        el.setAttribute('title', tooltip);
        el.innerHTML = '&plus;';
        el.onclick = handleClick;
        
        return el;
    };
    
    function handleClick() {
        //todo: implement this with modal form div or something
        callBack();
    }

}