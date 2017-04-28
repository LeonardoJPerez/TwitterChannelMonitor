'use strict';
const appInsights = require("applicationinsights");

const IKEY = "8c05903a-aa5f-4fbb-a007-591bfb0ed778";
const _client = appInsights.getClient(IKEY);

module.exports = {
    trackEvent: (eventName, payload) => {
        _client.trackEvent(eventName, payload);
    },
    trackException: (exception) => {
        switch (typeof exception) {
            case 'string':
                _client.trackException(new Error(exception.message));
                break;
            default:
                _client.trackException(new Error(JSON.parse(exception.message)));
                break;
        }

    },
    trackMetric: (metricDescription, value) => {
        _client.trackMetric(metricDescription, value);
    },
    trackTrace: (message) => {
        _client.trackTrace(message);
    }
};