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

chrome.extension.onRequest.addListener(function(request) {
  if (request.command !== 'sendCompleteMsg')
    return;

  showCompleteNotification();
});