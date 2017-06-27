let _ = require('lodash');

import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { CommandableSenecaClient } from 'pip-services-net-node';

import { SettingsSectionV1 } from './SettingsSectionV1';
import { ISettingsClientV1 } from './ISettingsClientV1';

export class SettingsSenecaClientV1 extends CommandableSenecaClient implements ISettingsClientV1 {

    constructor(config?: any) {
        super('settings');

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
                update_params: updateParams,
                increment_params: incrementParams
            }, 
            (err, parameters) => {
                if (parameters)
                    parameters = ConfigParams.fromValue(parameters);
                if (callback) callback(err, parameters);
            }
        );
    }
    
}
