import { YamlConfigReader } from 'pip-services-commons-node';
import { SettingsClientFixtureV1 } from './SettingsClientFixtureV1';
import { SettingsLambdaClientV1 } from '../../src/version1/SettingsLambdaClientV1';

suite('SettingsLambdaClient', ()=> {
    let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
    let lambdaConfig = config.getSection('lambda');

    // Skip if connection is not configured
    if (lambdaConfig.getAsNullableString("connection.protocol") != "aws")
        return;

    let client: SettingsLambdaClientV1;
    let fixture: SettingsClientFixtureV1;

    setup((done) => {
        client = new SettingsLambdaClientV1();
        client.configure(lambdaConfig);

        fixture = new SettingsClientFixtureV1(client);

        client.open(null, done);
    });

    teardown((done) => {
        client.close(null, done);
    });

    test('Crud Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});