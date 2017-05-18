var warningId = 'notification.warning';


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
	chrome.alarms.create("myAlarm", {delayInMinutes: 0.05, periodInMinutes: 0.2} );
	
	chrome.alarms.onAlarm.addListener(function(alarm) {
		if(beatFlag == 1){
			// cancel alarm, show complete notification
			chrome.alarms.clearAll(function callback(){runFlag = 0;beatFlag = 0;});
			showCompleteNotification();
			beatFlag = 0;
			return;
		}
		beatFlag = 1;
	});
}


var runFlag = 0;
var beatFlag = 0;

chrome.extension.onRequest.addListener(function(request) {
  //if (request.command !== 'sendProgressMsg')
    //return;
  
	
	if(request.type == 'fail'){
		// cancel alarm, show complete notification
		chrome.alarms.clearAll(function callback(){runFlag = 0;beatFlag = 0;});
		
		showErrorNotification();
		beatFlag = 0;
		return;
	}
	
	if(request.type == 'finish'){
		if(runFlag == 0){
			showCompleteNotification();
		}
		return;
	}
	
	if(request.type == 'running'){
		if(runFlag == 0){
			setUpAlarm();
			runFlag = 1;
		}
		beatFlag = 0;
	}
});



