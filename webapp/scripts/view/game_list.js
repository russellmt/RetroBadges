function GameList(_response, _el) {
    //TODO: this is very similar to badge list... try to use the same code for both
    var response = _response;
    var el = _el;
    
    this.renderGameList = function() {
        for (var i = 0, len = response.length; i < len; i++) {
            var comp = new GameComponent(response[i]);
            var childEl = comp.createElement();
            el.appendChild(childEl);
        }
    };
}