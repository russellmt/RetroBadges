inherits(BadgeRequestMaker, RequestMaker);

function BadgeRequestMaker() {
    RequestMaker.call(this);
    
    this.create = function(formData, callBack, gameId) {
        this.makeRequest('POST', '/games/' + gameId + '/badges', callBack, formData);
    };
    
    this.getAll = function(callBack, gameId) {
        this.makeRequest('GET', '/games/' + gameId + '/badges', callBack);
    };
    
    this.getOne = function(callBack, gameId, badgeId) {
        this.makeRequest('GET', '/games/' + gameId + '/badges/' + badgeId, callBack);
    };
    
    this.update = function(formData, callBack, gameId, badgeId) {
        this.makeRequest('PUT', '/games/' + gameId + '/badges/' + badgeId, callBack, formData);
    };
    
    this.deleteOne = function(callBack, gameId, badgeId) {
        this.makeRequest('DELETE', '/games/' + gameId + '/badges/' + badgeId, callBack);
    };
    
    this.deleteAll = function(callBack, gameId) {
        this.makeRequest('DELETE', '/games/' + gameId + '/badges', callBack);
    };
}