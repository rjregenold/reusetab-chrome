function onTabCreated(newTab) {
  if (newTab.pinned) return;
  var url = newTab.url;
  var host = parseUri(url).host;
  chrome.tabs.query({"pinned": true}, function(pinnedTabs) {
    var matchedTab = _.find(pinnedTabs, function(pinnedTab) {
      return parseUri(pinnedTab.url).host === host;
    });
    if (!matchedTab) return;
    chrome.tabs.update(matchedTab.id, {"url": url, "active": true});
    chrome.tabs.remove(newTab.id);
  });
}

chrome.tabs.onCreated.addListener(onTabCreated);

