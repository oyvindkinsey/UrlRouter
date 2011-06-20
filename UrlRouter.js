function UrlRouter(rules){
    this._rules = rules;
}

UrlRouter.prototype = {
    compile: function(){
        var compiled = [], rules = this._rules;
        for (var i = 0, len = rules.length; i < len; i++) {
            var rule = rules[i];
            var compiledRule = {
                keys: []
            };
            compiledRule.re = new RegExp(rule.replace(/:[^\/]+/g, function(key){
                compiledRule.keys.push((key.substring(1)))
                return "([^\/]+)";
            }));
            compiled.push(compiledRule);
        }
        this._compiled = compiled;
    },
    match: function(url){
        var match;
        for (var i = 0, len = this._compiled.length; i < len; i++) {
            match = url.match(this._compiled[i].re);
            if (match) {
                var data = {}, keys = this._compiled[i].keys;
                for (var j = 0; j < keys.length; j++) {
                    data[keys[j]] = match[j + 1];
                }
                return data;
            }
        }
    }
};
