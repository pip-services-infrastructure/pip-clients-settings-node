import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams} from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { DirectClient } from 'pip-services3-rpc-node';

import { ISettingsClientV1 } from './ISettingsClientV1';
//import { ISettingsController } from 'pip-services-settings-node';
import { SettingsSectionV1 } from './SettingsSectionV1';

export class SettingsDirectClientV1 extends DirectClient<any> implements ISettingsClientV1 {
            
    public constructor() {
        super();
        this._dependencyResolver.put('controller', new Descriptor("pip-services-settings", "controller", "*", "*", "*"))
    }

    public getSectionIds(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<string>) => void): void {
        let timing = this.instrument(correlationId, 'settings.get_section_ids');
        this._controller.getSectionIds(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }

    public getSections(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<SettingsSectionV1>) => void): void {
        let timing = this.instrument(correlationId, 'settings.get_sections');
        this._controller.getSections(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
    
    public getSectionById(correlationId: string, id: string, 
        callback: (err: any, parameters: ConfigParams) => void): void {
        let timing = this.instrument(correlationId, 'settings.get_sections_by_id');
        this._controller.getSectionById(correlationId, id, (err, parameters) => {
            timing.endTiming();
            callback(err, parameters);
        });
    }

    public setSection(correlationId: string, id: string, parameters: ConfigParams,
        callback?: (err: any, parameters: ConfigParams) => void): void {
        let timing = this.instrument(correlationId, 'settings.set_sections');
        this._controller.setSection(correlationId, id, parameters, (err, parameters) => {
            timing.endTiming();
            callback(err, parameters);
        });
    }

    public modifySection(correlationId: string, id: string, updateParams: ConfigParams, incrementParams: ConfigParams,
        callback?: (err: any, parameters: ConfigParams) => void): void {
        let timing = this.instrument(correlationId, 'settings.modify_sections');
        this._controller.modifySection(correlationId, id, updateParams, incrementParams, (err, parameters) => {
            timing.endTiming();
            callback(err, parameters);
        });
    }

}