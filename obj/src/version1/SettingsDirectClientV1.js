"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class SettingsDirectClientV1 extends pip_services3_rpc_node_1.DirectClient {
    constructor() {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor("pip-services-settings", "controller", "*", "*", "*"));
    }
    getSectionIds(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'settings.get_section_ids');
        this._controller.getSectionIds(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
    getSections(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'settings.get_sections');
        this._controller.getSections(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
    getSectionById(correlationId, id, callback) {
        let timing = this.instrument(correlationId, 'settings.get_sections_by_id');
        this._controller.getSectionById(correlationId, id, (err, parameters) => {
            timing.endTiming();
            callback(err, parameters);
        });
    }
    setSection(correlationId, id, parameters, callback) {
        let timing = this.instrument(correlationId, 'settings.set_sections');
        this._controller.setSection(correlationId, id, parameters, (err, parameters) => {
            timing.endTiming();
            callback(err, parameters);
        });
    }
    modifySection(correlationId, id, updateParams, incrementParams, callback) {
        let timing = this.instrument(correlationId, 'settings.modify_sections');
        this._controller.modifySection(correlationId, id, updateParams, incrementParams, (err, parameters) => {
            timing.endTiming();
            callback(err, parameters);
        });
    }
}
exports.SettingsDirectClientV1 = SettingsDirectClientV1;
//# sourceMappingURL=SettingsDirectClientV1.js.map