inherits(UpdateComponent, Component);

function UpdateComponent(_callBack, _tooltip) {
    Component.call(this);
    
    var callBack = _callBack;
    var tooltip = _tooltip;
    
    this.createElement = function() {
        var el = document.createElement('div');
        el.setAttribute('class', 'action-link positive-link update no-select');
        el.setAttribute('title', tooltip);
        el.innerHTML = '&rarrhk;';
        el.onclick = handleClick;

        return el;
    };
    
    function handleClick() {
        //todo: implement modal div with update form
        callBack();
    }
    
}