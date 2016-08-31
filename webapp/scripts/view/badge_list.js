function BadgeList(_response, _el, _gameId) {
    var response = _response;
    var el = _el;
    var gameId = _gameId;
    
    this.renderBadgeList = function() {
        for (var i = 0, len = response.length; i < len; i++) {
            var comp = new BadgeComponent(response[i], gameId);
            var childEl = comp.createElement();
            el.appendChild(childEl);
        }    
    };
}