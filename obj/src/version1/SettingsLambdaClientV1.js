"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
class SettingsLambdaClientV1 extends pip_services_aws_node_1.CommandableLambdaClient {
    constructor(config) {
        super('settings');
        if (config != null)
            this.configure(pip_services_commons_node_1.ConfigParams.fromValue(config));
    }
    getSectionIds(correlationId, filter, paging, callback) {
        this.callCommand('get_section_ids', correlationId, {
            filter: filter,
            paging: paging
        }, callback);
    }
    getSections(correlationId, filter, paging, callback) {
        this.callCommand('get_sections', correlationId, {
            filter: filter,
            paging: paging
        }, (err, page) => {
            if (page) {
                page.data = _.map(page.data, (r) => {
                    r.parameters = pip_services_commons_node_1.ConfigParams.fromValue(r.parameters);
                    return r;
                });
            }
            callback(err, page);
        });
    }
    getSectionById(correlationId, id, callback) {
        this.callCommand('get_section_by_id', correlationId, {
            id: id
        }, (err, parameters) => {
            if (parameters)
                parameters = pip_services_commons_node_1.ConfigParams.fromValue(parameters);
            callback(err, parameters);
        });
    }
    setSection(correlationId, id, parameters, callback) {
        this.callCommand('set_section', correlationId, {
            id: id,
            parameters: parameters
        }, (err, parameters) => {
            if (parameters)
                parameters = pip_services_commons_node_1.ConfigParams.fromValue(parameters);
            if (callback)
                callback(err, parameters);
        });
    }
    modifySection(correlationId, id, updateParams, incrementParams, callback) {
        this.callCommand('modify_section', correlationId, {
            id: id,
            update_params: updateParams,
            increment_params: incrementParams
        }, (err, parameters) => {
            if (parameters)
                parameters = pip_services_commons_node_1.ConfigParams.fromValue(parameters);
            if (callback)
                callback(err, parameters);
        });
    }
}
exports.SettingsLambdaClientV1 = SettingsLambdaClientV1;
//# sourceMappingURL=SettingsLambdaClientV1.js.map