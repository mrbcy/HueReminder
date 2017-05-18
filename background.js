var warningId = 'notification.warning';
var runFlag = 0;
var beatFlag = 0;
var firstRun = true;

function showCompleteNotification() {
    chrome.notifications.create(warningId, {
      iconUrl: chrome.runtime.getURL('logo.png'),
      title: 'Task Running Complete',
      type: 'basic',
      message: 'Hue task has finished',
      priority: 0
    }, function() {});
}

function showErrorNotification() {
    chrome.notifications.create(warningId, {
      iconUrl: chrome.runtime.getURL('error.png'),
      title: 'Task Failed',
      type: 'basic',
      message: 'Error has happend during the task',
      priority: 0
    }, function() {});
}

function setUpAlarm(){
	chrome.alarms.create("myAlarm", {delayInMinutes: 0.12} );
}




chrome.extension.onRequest.addListener(function(request) {
	if (request.command !== 'sendProgressMsg')
		return;
  
	if(firstRun){
		chrome.alarms.onAlarm.addListener(function(alarm) {
			if(beatFlag == 0){
				runFlag = 0;
				showCompleteNotification();
				return;
			}
			
		});
		firstRun = true;
	}
	if(request.type == 'fail'){
		// cancel alarm, show complete notification
		beatFlag = 0;
		runFlag = 0;
		showErrorNotification();
		
		return;
	}
	
	if(request.type == 'finish'){
		if(runFlag == 0){
			showCompleteNotification();
		}else{
			beatFlag = 0;
			setUpAlarm();
		}
		return;
	}
	
	if(request.type == 'running'){
		beatFlag += 1;
		if(runFlag == 0){
			runFlag = 1;
		}
		
	}
});




