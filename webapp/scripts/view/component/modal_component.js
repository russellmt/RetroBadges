inherits(ModalComponent, Component);

function ModalComponent(_title, _innerComponent) {
    Component.call(this);

    var title = _title;
    var innerComponent = _innerComponent;
    var innerEl = _innerComponent.createElement();

    //Override
    this.createElement = function() {
        var bg = document.createElement('div');
        bg.setAttribute('class', 'modal-bg');
        
        var panel = document.createElement('div');
        panel.setAttribute('class', 'modal-panel');

        var titleEl = document.createElement('h3');
        titleEl.setAttribute('class', 'modal-title');
        titleEl.innerHTML = title;

        panel.appendChild(titleEl);

        //todo: clean this up later
        panel.appendChild(new RemoveComponent(
            innerComponent.getCancelWarning(),
            function(el) {
                el.parentNode.removeChild(el);
            }.bind(this, bg),
            innerComponent.getCancelTooltip()
        ).createElement());

        panel.appendChild(innerEl);

        bg.appendChild(panel);
        return bg;
    };
}