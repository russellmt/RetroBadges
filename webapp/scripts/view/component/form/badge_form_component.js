inherits(BadgeFormComponent, FormComponent);

function BadgeFormComponent(_requestFnName, _cancelTooltip, _cancelWarning, _uiUpdateCallBack, _gameId, _data) {
    FormComponent.call(this, _requestFnName, _cancelTooltip, _cancelWarning, _uiUpdateCallBack, _data);
    
    var me = this;
    var gameId = _gameId;

    //Override
    this.createElement = function() {
        var form = document.createElement('form');
        form.innerHTML =
            '<label for="title">Title: </label>' +
            '<input name="title" type="text" placeholder="Enter badge title" required />' +
            '<br />' +
            '<label for="desc">Description: </label>' +
            '<textarea name="desc" placeholder="Enter badge description" rows="3" cols="50" maxlength="150" required></textarea>' +
            '<br />' +
            '<input type="submit" value="Create Badge" />';

        var data = this.getData();
        if (data && Object.keys(data).length > 0) {
            form.elements.title.value = data.title;
            form.elements.desc.value = data.desc;
        }
        form.onsubmit = handleSubmit;
        return form;
    };

    function handleSubmit(e) {
        e.preventDefault();

        var form = document.forms[0];
        var names = ['title', 'desc'];
        var submitData = me.getSubmitData(form, names);

        var badgeRequest = new BadgeRequestMaker();
        var requestFnName = me.getRequestFnName();
        
        var id;
        if (_data) {
            id = _data._id;
        }

        badgeRequest[requestFnName](submitData, function(response) {
            me.destroyModal(form);
            var callBack = me.getUIUpdateCallBack();
            callBack(submitData);
        }, gameId, id);
    }
}