let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { SettingsMemoryPersistence } from 'pip-services-settings-node';
import { SettingsController } from 'pip-services-settings-node';
import { SettingsCommandableGrpcServiceV1 } from 'pip-services-settings-node';
import { ISettingsClientV1 } from '../../src/version1/ISettingsClientV1';
import { SettingsCommandableGrpcClientV1 } from '../../src/version1/SettingsCommandableGrpcClientV1';
import { SettingsClientFixtureV1 } from './SettingsClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('SettingsCommandableGrpcClientV1', ()=> {
    let service: SettingsCommandableGrpcServiceV1;
    let client: SettingsCommandableGrpcClientV1;
    let fixture: SettingsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new SettingsMemoryPersistence();
        let controller = new SettingsController();

        service = new SettingsCommandableGrpcServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-settings', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-settings', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-settings', 'service', 'commandable-grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new SettingsCommandableGrpcClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new SettingsClientFixtureV1(client);

        service.open(null, (err) => {
            client.open(null, done);
        });
    });
    
    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
