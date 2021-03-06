"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
class SettingsCommandableGrpcClientV1 extends pip_services3_grpc_node_1.CommandableGrpcClient {
    constructor(config) {
        super('v1/settings');
        if (config != null)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
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
                    r.parameters = pip_services3_commons_node_1.ConfigParams.fromValue(r.parameters);
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
                parameters = pip_services3_commons_node_1.ConfigParams.fromValue(parameters);
            callback(err, parameters);
        });
    }
    setSection(correlationId, id, parameters, callback) {
        this.callCommand('set_section', correlationId, {
            id: id,
            parameters: parameters
        }, (err, parameters) => {
            if (parameters)
                parameters = pip_services3_commons_node_1.ConfigParams.fromValue(parameters);
            if (callback)
                callback(err, parameters);
        });
    }
    modifySection(correlationId, id, updateParams, incrementParams, callback) {
        this.callCommand('modify_section', correlationId, {
            id: id,
            update_parameters: updateParams,
            increment_parameters: incrementParams
        }, (err, parameters) => {
            if (parameters)
                parameters = pip_services3_commons_node_1.ConfigParams.fromValue(parameters);
            if (callback)
                callback(err, parameters);
        });
    }
}
exports.SettingsCommandableGrpcClientV1 = SettingsCommandableGrpcClientV1;
//# sourceMappingURL=SettingsCommandableGrpcClientV1.js.map