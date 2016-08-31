inherits(GameFormComponent, FormComponent);

function GameFormComponent(_requestFnName, _cancelTooltip, _cancelWarning, _uiUpdateCallBack, _data) {
    FormComponent.call(this, _requestFnName, _cancelTooltip, _cancelWarning, _uiUpdateCallBack, _data);

    var me = this;

    this.createElement = function() {
        var form = document.createElement('form');
        form.innerHTML =
            '<label for="title">Title: </label>' +
            '<input name="title" type="text" placeholder="Enter game title" required />' +
            '<br />' +
            '<label for="genre">Genre: </label>' +
            '<select name="genre" required><!-- populate from db in the future -->' +
                '<option selected disabled hidden>Select genre</option>' +
                '<option>Action</option>' +
                '<option>Adventure</option>' +
                '<option>Platform</option>' +
                '<option>Fighting</option>' +
                '<option>Sandbox</option>' +
            '</select>' +
            '<br />' +
            '<label for="year">Year: </label>' +
            '<input name="year" type="number" min="1970" required />' +
            '<br />' +
            '<label for="publisher">Publisher: </label>' +
            '<input name="publisher" type="text" placeholder="Enter publisher" required />' +
            '<br />' +
            '<label for="developer">Developer: </label>' +
            '<input name="developer" type="text" placeholder="Enter developer" required />' +
            '<br />' +
            '<label for="platforms">Platforms: </label>' +
            '<!-- place this in a loop if selected -->' +
            '<select name="platforms" required><!-- populate from db in the future -->' +
                '<option selected disabled hidden>Selected platform</option>' +
                '<option>Nintendo Entertainment System</option>' +
                '<option>Super Nintendo</option>' +
                '<option>Nintendo 64</option>' +
                '<option>Nintendo Gamecube</option>' +
                '<option>Nintendo Wii</option>' +
                '<option>Wii U</option>' +
            '</select>' +
            '<br />' +
            '<input type="submit" value="Submit" />';

        var data = this.getData();
        if (data && Object.keys(data).length > 0) {
            var elements = form.elements;
            elements.title.value = data.title;
            elements.genre.value = data.genre;
            elements.year.value = data.year;
            elements.publisher.value = data.publisher;
            elements.developer.value = data.developer;
            elements.platforms.value = data.platforms;
        }
        form.onsubmit = handleSubmit;

        return form;
    };

    function handleSubmit(e) {
        e.preventDefault();
        var form = document.forms[0];

        var names = ['title', 'genre', 'year', 'publisher', 'developer', 'platforms'];
        var submitData = me.getSubmitData(form, names);

        var gameRequest = new GameRequestMaker();
        var fnName = me.getRequestFnName();

        //TODO: write cleaner code to get this to work properly...
        var id;
        if (_data) {
            id = _data._id;
        }

        gameRequest[fnName](submitData, function(response) {
            me.destroyModal(form);

            //TODO: print message stating update/creation was successful
            var callBack = me.getUIUpdateCallBack();
            callBack(submitData);
        }, id);
    }
}