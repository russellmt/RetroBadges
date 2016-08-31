function handleSubmit(e) {
    e.preventDefault();
    var form = document.forms[0];

    var data = {};
    var names = ['title', 'genre', 'year', 'publisher', 'developer', 'platforms'];
    for (var i = 0, len = names.length; i < len; i++) {
        var name = names[i];
        data[name] = form.elements[name].value;
    }

    var gameRequest = new GameRequestMaker();
    gameRequest.create(data, function(response) {
        console.log('Game created...');
    });
}