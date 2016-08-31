inherits(FormComponent, Component);

function FormComponent(_requestFnName, _cancelTooltip, _cancelWarning, _uiUpdateCallBack,_data) {
    Component.call(this);

    var data = _data;
    var requestFnName = _requestFnName;
    var cancelTooltip = _cancelTooltip;
    var cancelWarning = _cancelWarning;
    var uiUpdateCallBack = _uiUpdateCallBack;

    this.getData = function() {
        return data;
    };
    
    this.getRequestFnName = function() {
        return requestFnName;
    };

    this.getCancelTooltip = function() {
        return cancelTooltip;
    };

    this.getCancelWarning = function() {
        return cancelWarning;
    };
    
    this.getUIUpdateCallBack = function() {
        return uiUpdateCallBack;
    };

    this.getSubmitData = function(formEl, names) {
        var data = {};
        for (var i = 0, len = names.length; i < len; i++) {
            var name = names[i];
            data[name] = formEl.elements[name].value;
        }
        return data;
    };
    
    this.destroyModal = function(form) {
        var parent = form.parentNode.parentNode;
        parent.parentNode.removeChild(parent);
    };
}