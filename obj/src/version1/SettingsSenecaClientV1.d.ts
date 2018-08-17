import { ConfigParams } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { CommandableSenecaClient } from 'pip-services-seneca-node';
import { SettingsSectionV1 } from './SettingsSectionV1';
import { ISettingsClientV1 } from './ISettingsClientV1';
export declare class SettingsSenecaClientV1 extends CommandableSenecaClient implements ISettingsClientV1 {
    constructor(config?: any);
    getSectionIds(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<string>) => void): void;
    getSections(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<SettingsSectionV1>) => void): void;
    getSectionById(correlationId: string, id: string, callback: (err: any, parameters: ConfigParams) => void): void;
    setSection(correlationId: string, id: string, parameters: ConfigParams, callback?: (err: any, parameters: ConfigParams) => void): void;
    modifySection(correlationId: string, id: string, updateParams: ConfigParams, incrementParams: ConfigParams, callback?: (err: any, parameters: ConfigParams) => void): void;
}
