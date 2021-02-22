chrome.devtools.panels.create("Skeleton", "icon-34.png", "devtools-panel.html", (panel) => {
  panel.onShown.addListener(onPanelShown);
  panel.onHidden.addListener(onPanelHidden);
});

function onPanelShown () {
  chrome.runtime.sendMessage('skeleton-panel-shown');
}

function onPanelHidden() {
  chrome.runtime.sendMessage('skeleton-panel-hidden');
}