inherits(GameRequestMaker, RequestMaker);

function GameRequestMaker() {
    RequestMaker.call(this);
    
    //Overriding methods
    this.create = function(formData, callBack) {
        this.makeRequest('POST', '/games', callBack, formData);
    };

    this.getAll = function(callBack) {
        this.makeRequest('GET', '/games', callBack, {
            sortField: 'title',
            direction: 'ASC'
        });
    };

    this.getOne = function(callBack, gameId) {
        this.makeRequest('GET', '/games/' + gameId, callBack);
    };

    this.update = function(formData, callBack, gameId) {
        this.makeRequest('PUT', '/games/' + gameId, callBack, formData);
    };

    this.deleteOne = function(callBack, gameId) {
        this.makeRequest('DELETE', '/games/' + gameId, callBack);
    };

    this.deleteAll = function(callBack) {
        this.makeRequest('DELETE', '/games', callBack);
    };
}