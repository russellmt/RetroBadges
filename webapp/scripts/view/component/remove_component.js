inherits(RemoveComponent, Component);

function RemoveComponent(_confirmMessage, _callBack, _tooltip) {
    Component.call(this);
    
    var callBack = _callBack;
    var confirmMessage = _confirmMessage;
    var tooltip = _tooltip;
    
    //Override
    this.createElement = function() {
        var el = document.createElement('div');
        el.setAttribute('class', 'action-link remove no-select');
        el.setAttribute('title', tooltip);
        el.innerHTML = '&times;';
        el.onclick = handleClick;

        return el;
    };

    function handleClick() {
        var confirmed = confirm(confirmMessage);
        if (confirmed) {
            callBack();
        }
    }
    
}