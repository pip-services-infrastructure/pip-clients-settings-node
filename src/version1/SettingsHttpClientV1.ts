let _ = require('lodash');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { CommandableHttpClient } from 'pip-services3-rpc-node';

import { SettingsSectionV1 } from './SettingsSectionV1';
import { ISettingsClientV1 } from './ISettingsClientV1';

export class SettingsHttpClientV1 extends CommandableHttpClient implements ISettingsClientV1 {

    constructor(config?: any) {
        super('v1/settings');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public getSectionIds(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<string>) => void): void {
        this.callCommand(
            'get_section_ids',
            correlationId,
            {
                filter: filter,
                paging: paging
            },
            callback
        );
    }

    public getSections(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<SettingsSectionV1>) => void): void {
        this.callCommand(
            'get_sections',
            correlationId,
            {
                filter: filter,
                paging: paging
            },
            (err, page) => {
                if (page) {
                    page.data = _.map(page.data, (r) => { 
                        r.parameters = ConfigParams.fromValue(r.parameters); 
                        return r; 
                    });
                }
                callback(err, page);
            }
        );
    }
    
    public getSectionById(correlationId: string, id: string, 
        callback: (err: any, parameters: ConfigParams) => void): void {
        this.callCommand(
            'get_section_by_id',
            correlationId,
            {
                id: id
            },
            (err, parameters) => {
                if (parameters)
                    parameters = ConfigParams.fromValue(parameters);
                callback(err, parameters);
            }
        );
    }

    public setSection(correlationId: string, id: string, parameters: ConfigParams,
        callback?: (err: any, parameters: ConfigParams) => void): void {
        this.callCommand(
            'set_section',
            correlationId,
            {
                id: id,
                parameters: parameters
            },
            (err, parameters) => {
                if (parameters)
                    parameters = ConfigParams.fromValue(parameters);
                if (callback) callback(err, parameters);
            }
        );
    }

    public modifySection(correlationId: string, id: string, updateParams: ConfigParams, incrementParams: ConfigParams,
        callback?: (err: any, parameters: ConfigParams) => void): void {
        this.callCommand(
            'modify_section',
            correlationId,
            {
                id: id,
                update_parameters: updateParams,
                increment_parameters: incrementParams
            },
            (err, parameters) => {
                if (parameters)
                    parameters = ConfigParams.fromValue(parameters);
                if (callback) callback(err, parameters);
            }
        );
    }
}
