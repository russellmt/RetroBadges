function RequestMaker() {
    
    //ids -- several params of required ids to locate the resource

    //abstract methods
    this.create = function(formData, callBack, ids) {};

    this.getAll = function(callBack, ids) {};

    this.getOne = function(callBack, ids) {};

    this.update = function(formData, callBack, ids) {};

    this.deleteOne = function(callBack, ids) {};

    this.deleteAll = function(callBack, ids) {};

    
    this.makeRequest = function(type, serviceUrl, callBack, params) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                callBack(response);
            }
        };
        var url = DOMAIN + '/service' + serviceUrl;
        switch (type) {
            case 'GET':
            case 'DELETE':
                params && (url += '?' + encodeParams(params));
                xhr.open(type, url, true);
                xhr.send();
                break;
            case 'POST':
            case 'PUT':
                xhr.open(type, url, true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.send(encodeParams(params));
                break;
        }
    };


    //utility
    function encodeParams(params) {
        if (!params) return null;
        var paramList = Object.keys(params).map(function(key) {
            var kvPair = [key, params[key]].map(encodeURIComponent);
            return kvPair.join('=');
        });
        return paramList.join('&');
    }
}