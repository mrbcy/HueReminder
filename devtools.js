chrome.devtools.network.onRequestFinished.addListener(
  function(request) {
	if(request.request.url == "http://10.8.8.21:8888/notebook/api/check_status"){
		// console.log(request);
		request.getContent(function(resString){
			console.log(resString);
			if(resString.indexOf('"status": 1') >= 0
			   || resString.indexOf(
					'{"status": 0, "query_status": {"status": "available"}}'
					) >= 0){
				alert('Task running complete');
				// prompt('Task running complete',1);
				return;
			}

		});
	}
	
});