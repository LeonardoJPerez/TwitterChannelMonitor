'use strict';
const appInsights = require("applicationinsights");

const IKEY = "KEY";
const _client = appInsights.getClient(IKEY);

module.exports = {
    trackEvent: (eventName, payload) => {
        _client.trackEvent(eventName, payload);
    },
    trackException: (exception) => {
        switch (typeof exception) {
            case 'string':
                _client.trackException(new Error(exception));
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
