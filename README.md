UrlRouter
=========

UrlRouter is a simple router that can be used to provide navigation in Javascript applications.

The router lets you define the patterns for url matching, and also allows you to name the variable sections so that the handler can easily access these.

This is an example of a set of rules:

    var rules = [
        [
            "/:user_name/status/:action/", 
            function(data){
                console.log(data.user_name + ": " + data.action);
        	}
        ], [
            "/:user_name/settings/", 
            function(data){
	            console.log(data.user_name);
	        }
        ], [
        	"/inbox/", 
        	function(data){
	            console.log(data);
	        }
        ]
    ];

Note how all `:foo` strings acts as placeholders resulting in matching properties on the data object. 
		
To use these we simply create a new `UrlRouter` and call the `compile` method

    var router = new UrlRouter(rules);
    router.compile();
    
Now we can do things like

    window.onhashchange = function() {
    	router.match(locatin.hash); // returns the data object if successfull, undefined if not.
    }