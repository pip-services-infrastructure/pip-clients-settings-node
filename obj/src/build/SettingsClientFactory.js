"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_components_node_1 = require("pip-services3-components-node");
const SettingsNullClientV1_1 = require("../version1/SettingsNullClientV1");
const SettingsDirectClientV1_1 = require("../version1/SettingsDirectClientV1");
const SettingsHttpClientV1_1 = require("../version1/SettingsHttpClientV1");
const SettingsLambdaClientV1_1 = require("../version1/SettingsLambdaClientV1");
const SettingsCommandableGrpcClientV1_1 = require("../version1/SettingsCommandableGrpcClientV1");
const SettingsGrpcClientV1_1 = require("../version1/SettingsGrpcClientV1");
class SettingsClientFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(SettingsClientFactory.NullClientV1Descriptor, SettingsNullClientV1_1.SettingsNullClientV1);
        this.registerAsType(SettingsClientFactory.DirectClientV1Descriptor, SettingsDirectClientV1_1.SettingsDirectClientV1);
        this.registerAsType(SettingsClientFactory.HttpClientV1Descriptor, SettingsHttpClientV1_1.SettingsHttpClientV1);
        this.registerAsType(SettingsClientFactory.LambdaClientV1Descriptor, SettingsLambdaClientV1_1.SettingsLambdaClientV1);
        this.registerAsType(SettingsClientFactory.CommandableGrpcClientV1Descriptor, SettingsCommandableGrpcClientV1_1.SettingsCommandableGrpcClientV1);
        this.registerAsType(SettingsClientFactory.GrpcClientV1Descriptor, SettingsGrpcClientV1_1.SettingsGrpcClientV1);
    }
}
SettingsClientFactory.Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-settings', 'factory', 'default', 'default', '1.0');
SettingsClientFactory.NullClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-settings', 'client', 'null', 'default', '1.0');
SettingsClientFactory.DirectClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-settings', 'client', 'direct', 'default', '1.0');
SettingsClientFactory.HttpClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-settings', 'client', 'http', 'default', '1.0');
SettingsClientFactory.LambdaClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-settings', 'client', 'lambda', 'default', '1.0');
SettingsClientFactory.CommandableGrpcClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-settings', 'client', 'commandable-grpc', 'default', '1.0');
SettingsClientFactory.GrpcClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-settings', 'client', 'grpc', 'default', '1.0');
exports.SettingsClientFactory = SettingsClientFactory;
//# sourceMappingURL=SettingsClientFactory.js.map