let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { ISettingsClientV1 } from '../../src/version1/ISettingsClientV1';

export class SettingsClientFixtureV1 {
    private _client: ISettingsClientV1;
    
    constructor(client: ISettingsClientV1) {
        this._client = client;
    }

    public testCrudOperations(done) {
        async.series([
        // Create one section
            (callback) => {
                this._client.setSection(
                    null,
                    'test.1',
                    ConfigParams.fromTuples(
                        'key1', 'value11',
                        'key2', 'value12'
                    ),
                    (err, parameters) => {
                        assert.isNull(err);

                        assert.isObject(parameters);
                        assert.equal('value11', parameters.getAsString('key1'));

                        callback();
                    }
                );
            },
        // Create another section
            (callback) => {
                this._client.modifySection(
                    null,
                    'test.2',
                    ConfigParams.fromTuples(
                        'key1', 'value21'
                    ),
                    ConfigParams.fromTuples(
                        'key2', 1
                    ),
                    (err, parameters) => {
                        assert.isNull(err);

                        assert.isObject(parameters);
                        assert.equal('value21', parameters.getAsString('key1'));
                        assert.equal('1', parameters.getAsString('key2'));

                        callback();
                    }
                );
            },
        // Get second section
            (callback) => {
                this._client.getSectionById(
                    null,
                    'test.2',
                    (err, parameters) => {
                        assert.isNull(err);

                        assert.isObject(parameters);
                        assert.equal('value21', parameters.getAsString('key1'));
                        assert.equal('1', parameters.getAsString('key2'));

                        callback();
                    }
                );
            },
        // Get all sections
            (callback) => {
                this._client.getSections(
                    null,
                    null,
                    null,
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Get all section ids
            (callback) => {
                this._client.getSectionIds(
                    null,
                    null,
                    null,
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            }
        ], done);
    }    
        
}
