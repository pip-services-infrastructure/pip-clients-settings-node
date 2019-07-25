let _ = require('lodash');
let services = require('../../../src/protos/settings_v1_grpc_pb');
let messages = require('../../../src/protos/settings_v1_pb');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { GrpcClient } from 'pip-services3-grpc-node';

import { ISettingsClientV1 } from './ISettingsClientV1';
import { SettingsSectionV1 } from './SettingsSectionV1';
import { SettingsGrpcConverterV1 } from './SettingsGrpcConverterV1';

export class SettingsGrpcClientV1 extends GrpcClient implements ISettingsClientV1 {
        
    public constructor() {
        super(services.SettingsClient);
    }

    public getSectionIds(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<string>) => void): void {
        let request = new messages.SettingsPageRequest();

        SettingsGrpcConverterV1.setMap(request.getFilterMap(), filter);
        request.setPaging(SettingsGrpcConverterV1.fromPagingParams(paging));

        let timing = this.instrument(correlationId, 'settings.get_section_ids');

        this.call('get_section_ids',
            correlationId, 
            request,
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = SettingsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? SettingsGrpcConverterV1.toSettingsIdPage(response.getPage())
                    : null;

                callback(err, result);
            }
        );
    }

    public getSections(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<SettingsSectionV1>) => void): void {
        let request = new messages.SettingsPageRequest();

        SettingsGrpcConverterV1.setMap(request.getFilterMap(), filter);
        request.setPaging(SettingsGrpcConverterV1.fromPagingParams(paging));

        let timing = this.instrument(correlationId, 'settings.get_sections');

        this.call('get_sections',
            correlationId, 
            request,
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = SettingsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? SettingsGrpcConverterV1.toSettingsSectionPage(response.getPage())
                    : null;

                callback(err, result);
            }
        );
    }
    
    public getSectionById(correlationId: string, id: string, 
        callback: (err: any, parameters: ConfigParams) => void): void {
        let request = new messages.SettingsIdRequest();
        request.setId(id);

        let timing = this.instrument(correlationId, 'settings.get_section_by_id');

        this.call('get_section_by_id',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = SettingsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? ConfigParams.fromValue(SettingsGrpcConverterV1.getMap(response.getParametersMap()))
                    : null;

                callback(err, result);
            }
        );        
    }

    public setSection(correlationId: string, id: string, parameters: ConfigParams,
        callback?: (err: any, parameters: ConfigParams) => void): void {
        let request = new messages.SettingsParamsRequest();
        request.setId(id);
        SettingsGrpcConverterV1.setMap(request.getParametersMap(), parameters);

        let timing = this.instrument(correlationId, 'settings.set_section');

        this.call('set_section',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = SettingsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? ConfigParams.fromValue(SettingsGrpcConverterV1.getMap(response.getParametersMap()))
                    : null;

                callback(err, result);
            }
        );        
    }

    public modifySection(correlationId: string, id: string, updateParams: ConfigParams, incrementParams: ConfigParams,
        callback?: (err: any, parameters: ConfigParams) => void): void {
        let request = new messages.SettingsModifyParamsRequest();
        request.setId(id);
        SettingsGrpcConverterV1.setMap(request.getUpdateParametersMap(), updateParams);
        SettingsGrpcConverterV1.setMap(request.getIncrementParametersMap(), incrementParams);

        let timing = this.instrument(correlationId, 'settings.modify_section');

        this.call('modify_section',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = SettingsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? ConfigParams.fromValue(SettingsGrpcConverterV1.getMap(response.getParametersMap()))
                    : null;

                callback(err, result);
            }
        );        
    }
  
}
