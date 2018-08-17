import { ConfigParams } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { DirectClient } from 'pip-services-rpc-node';
import { ISettingsClientV1 } from './ISettingsClientV1';
import { SettingsSectionV1 } from './SettingsSectionV1';
export declare class SettingsDirectClientV1 extends DirectClient<any> implements ISettingsClientV1 {
    constructor();
    getSectionIds(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<string>) => void): void;
    getSections(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<SettingsSectionV1>) => void): void;
    getSectionById(correlationId: string, id: string, callback: (err: any, parameters: ConfigParams) => void): void;
    setSection(correlationId: string, id: string, parameters: ConfigParams, callback?: (err: any, parameters: ConfigParams) => void): void;
    modifySection(correlationId: string, id: string, updateParams: ConfigParams, incrementParams: ConfigParams, callback?: (err: any, parameters: ConfigParams) => void): void;
}
