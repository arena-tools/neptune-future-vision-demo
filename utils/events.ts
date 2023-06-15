enum SiteModes {
    Oracle = 'OracleMode',
    Agent = 'AgentMode',
}

enum SiteModeEvents {
    onSiteSwitchFlipped = 'evtSiteSwitch',
    onOracleSelected = 'evtOracleSelected',
    onAgentSelected = 'evtAgentSelected',
}

enum MapEvents {
    onZoomRequested = 'evtZoomEvent',
    onViewPortChanged = 'evtViewPortChanged',
    onLayerChanged = 'evtLayerChanged',
    onZoomInComplete = 'evtOnZoomInComplete',
}

function sendEvent(eventName, dataObj) {
    console.log('sendEvent', eventName, dataObj);
    document.dispatchEvent(new CustomEvent(eventName, { detail: dataObj }));
}

export {SiteModeEvents, SiteModes, MapEvents, sendEvent}
