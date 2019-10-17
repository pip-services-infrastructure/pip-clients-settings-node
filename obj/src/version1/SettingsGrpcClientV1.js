"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let services = require('../../../src/protos/settings_v1_grpc_pb');
let messages = require('../../../src/protos/settings_v1_pb');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
const SettingsGrpcConverterV1_1 = require("./SettingsGrpcConverterV1");
class SettingsGrpcClientV1 extends pip_services3_grpc_node_1.GrpcClient {
    constructor() {
        super(services.SettingsClient);
    }
    getSectionIds(correlationId, filter, paging, callback) {
        let request = new messages.SettingsPageRequest();
        SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.setMap(request.getFilterMap(), filter);
        request.setPaging(SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.fromPagingParams(paging));
        let timing = this.instrument(correlationId, 'settings.get_section_ids');
        this.call('get_section_ids', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.toError(response.error);
            let result = response
                ? SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.toSettingsIdPage(response.getPage())
                : null;
            callback(err, result);
        });
    }
    getSections(correlationId, filter, paging, callback) {
        let request = new messages.SettingsPageRequest();
        SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.setMap(request.getFilterMap(), filter);
        request.setPaging(SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.fromPagingParams(paging));
        let timing = this.instrument(correlationId, 'settings.get_sections');
        this.call('get_sections', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.toError(response.error);
            let result = response
                ? SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.toSettingsSectionPage(response.getPage())
                : null;
            callback(err, result);
        });
    }
    getSectionById(correlationId, id, callback) {
        let request = new messages.SettingsIdRequest();
        request.setId(id);
        let timing = this.instrument(correlationId, 'settings.get_section_by_id');
        this.call('get_section_by_id', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.toError(response.error);
            let result = response
                ? pip_services3_commons_node_1.ConfigParams.fromValue(SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.getMap(response.getParametersMap()))
                : null;
            callback(err, result);
        });
    }
    setSection(correlationId, id, parameters, callback) {
        let request = new messages.SettingsParamsRequest();
        request.setId(id);
        SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.setMap(request.getParametersMap(), parameters);
        let timing = this.instrument(correlationId, 'settings.set_section');
        this.call('set_section', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.toError(response.error);
            let result = response
                ? pip_services3_commons_node_1.ConfigParams.fromValue(SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.getMap(response.getParametersMap()))
                : null;
            callback(err, result);
        });
    }
    modifySection(correlationId, id, updateParams, incrementParams, callback) {
        let request = new messages.SettingsModifyParamsRequest();
        request.setId(id);
        SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.setMap(request.getUpdateParametersMap(), updateParams);
        SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.setMap(request.getIncrementParametersMap(), incrementParams);
        let timing = this.instrument(correlationId, 'settings.modify_section');
        this.call('modify_section', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.toError(response.error);
            let result = response
                ? pip_services3_commons_node_1.ConfigParams.fromValue(SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.getMap(response.getParametersMap()))
                : null;
            callback(err, result);
        });
    }
}
exports.SettingsGrpcClientV1 = SettingsGrpcClientV1;
//# sourceMappingURL=SettingsGrpcClientV1.js.map