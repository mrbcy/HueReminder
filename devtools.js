function sendProgressMsg(msgType) {
  chrome.extension.sendRequest({
      command: "sendProgressMsg",
	  type: msgType
  });
};


chrome.devtools.network.onRequestFinished.addListener(
  function(request) {
	if(request.request.url == "http://10.8.8.21:8888/notebook/api/check_status"){
		// console.log(request);
		request.getContent(function(resString){
			console.log(resString);
			if(resString.indexOf('"status": 1') >= 0){
				sendProgressMsg('fail');
			}
			if(resString.indexOf('{"status": "available"}') >= 0){
				sendProgressMsg('finish');
			}
			if(resString.indexOf('{"status": "running"}') >= 0){
				sendProgressMsg('running');
			}

		});
	}
	
});