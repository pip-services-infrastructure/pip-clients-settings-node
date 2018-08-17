let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';

import { SettingsMemoryPersistence } from 'pip-services-settings-node';
import { SettingsController } from 'pip-services-settings-node';
import { ISettingsClientV1 } from '../../src/version1/ISettingsClientV1';
import { SettingsDirectClientV1 } from '../../src/version1/SettingsDirectClientV1';
import { SettingsClientFixtureV1 } from './SettingsClientFixtureV1';

suite('SettingsDirectClientV1', ()=> {
    let client: SettingsDirectClientV1;
    let fixture: SettingsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new SettingsMemoryPersistence();
        let controller = new SettingsController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-settings', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-settings', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new SettingsDirectClientV1();
        client.setReferences(references);

        fixture = new SettingsClientFixtureV1(client);

        client.open(null, done);
    });
    
    suiteTeardown((done) => {
        client.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
