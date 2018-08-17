let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';
import { SenecaInstance } from 'pip-services-seneca-node';

import { SettingsMemoryPersistence } from 'pip-services-settings-node';
import { SettingsController } from 'pip-services-settings-node';
import { SettingsSenecaServiceV1 } from 'pip-services-settings-node';
import { ISettingsClientV1 } from '../../src/version1/ISettingsClientV1';
import { SettingsSenecaClientV1 } from '../../src/version1/SettingsSenecaClientV1';
import { SettingsClientFixtureV1 } from './SettingsClientFixtureV1';

let senecaConfig = ConfigParams.fromTuples(
    "connection.protocol", "none"
);

suite('SettingsSenecaClientV1', () => {
    let service: SettingsSenecaServiceV1;
    let client: SettingsSenecaClientV1;
    let fixture: SettingsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new SettingsMemoryPersistence();
        let controller = new SettingsController();

        service = new SettingsSenecaServiceV1();
        service.configure(senecaConfig);
        let seneca = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), seneca,
            new Descriptor('pip-services-settings', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-settings', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-settings', 'service', 'seneca', 'default', '1.0'), service
        );
        seneca.setReferences(references);
        controller.setReferences(references);
        service.setReferences(references);

        client = new SettingsSenecaClientV1();
        client.configure(senecaConfig);
        client.setReferences(references);

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
