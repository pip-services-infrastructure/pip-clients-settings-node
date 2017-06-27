"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const SettingsNullClientV1_1 = require("../version1/SettingsNullClientV1");
const SettingsDirectClientV1_1 = require("../version1/SettingsDirectClientV1");
const SettingsHttpClientV1_1 = require("../version1/SettingsHttpClientV1");
const SettingsLambdaClientV1_1 = require("../version1/SettingsLambdaClientV1");
const SettingsSenecaClientV1_1 = require("../version1/SettingsSenecaClientV1");
class SettingsClientFactory extends pip_services_commons_node_2.Factory {
    constructor() {
        super();
        this.registerAsType(SettingsClientFactory.NullClientV1Descriptor, SettingsNullClientV1_1.SettingsNullClientV1);
        this.registerAsType(SettingsClientFactory.DirectClientV1Descriptor, SettingsDirectClientV1_1.SettingsDirectClientV1);
        this.registerAsType(SettingsClientFactory.HttpClientV1Descriptor, SettingsHttpClientV1_1.SettingsHttpClientV1);
        this.registerAsType(SettingsClientFactory.LambdaClientV1Descriptor, SettingsLambdaClientV1_1.SettingsLambdaClientV1);
        this.registerAsType(SettingsClientFactory.SenecaClientV1Descriptor, SettingsSenecaClientV1_1.SettingsSenecaClientV1);
    }
}
SettingsClientFactory.Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-settings', 'factory', 'default', 'default', '1.0');
SettingsClientFactory.NullClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-settings', 'client', 'null', 'default', '1.0');
SettingsClientFactory.DirectClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-settings', 'client', 'direct', 'default', '1.0');
SettingsClientFactory.HttpClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-settings', 'client', 'http', 'default', '1.0');
SettingsClientFactory.LambdaClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-settings', 'client', 'lambda', 'default', '1.0');
SettingsClientFactory.SenecaClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-settings', 'client', 'seneca', 'default', '1.0');
exports.SettingsClientFactory = SettingsClientFactory;
//# sourceMappingURL=SettingsClientFactory.js.map