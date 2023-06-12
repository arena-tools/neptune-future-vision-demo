enum SiteModes {
    Oracle = 'OracleMode',
    Agent = 'AgentMode',
}

enum SiteModeEvents {
    onSiteSwitchFlipped = 'evtSiteSwitch',
    onOracleSelected = 'evtOracleSelected',
    onAgentSelected = 'evtAgentSelected',
    
}

function sendEvent(eventName, dataObj) {
    console.log('sendEvent', eventName, dataObj);
    document.dispatchEvent(new CustomEvent(eventName, { detail: dataObj }));
}

export {SiteModeEvents, SiteModes, sendEvent}
