import { Descriptor } from 'pip-services3-commons-node';
import { Factory } from 'pip-services3-components-node';

import { SettingsNullClientV1 } from '../version1/SettingsNullClientV1';
import { SettingsDirectClientV1 } from '../version1/SettingsDirectClientV1';
import { SettingsHttpClientV1 } from '../version1/SettingsHttpClientV1';
import { SettingsLambdaClientV1 } from '../version1/SettingsLambdaClientV1';
import { SettingsCommandableGrpcClientV1 } from '../version1/SettingsCommandableGrpcClientV1';
import { SettingsGrpcClientV1 } from '../version1/SettingsGrpcClientV1';

export class SettingsClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-settings', 'factory', 'default', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('pip-services-settings', 'client', 'null', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-settings', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('pip-services-settings', 'client', 'http', 'default', '1.0');
	public static LambdaClientV1Descriptor = new Descriptor('pip-services-settings', 'client', 'lambda', 'default', '1.0');
	public static CommandableGrpcClientV1Descriptor = new Descriptor('pip-services-settings', 'client', 'commandable-grpc', 'default', '1.0');
	public static GrpcClientV1Descriptor = new Descriptor('pip-services-settings', 'client', 'grpc', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(SettingsClientFactory.NullClientV1Descriptor, SettingsNullClientV1);
		this.registerAsType(SettingsClientFactory.DirectClientV1Descriptor, SettingsDirectClientV1);
		this.registerAsType(SettingsClientFactory.HttpClientV1Descriptor, SettingsHttpClientV1);
		this.registerAsType(SettingsClientFactory.LambdaClientV1Descriptor, SettingsLambdaClientV1);
		this.registerAsType(SettingsClientFactory.CommandableGrpcClientV1Descriptor, SettingsCommandableGrpcClientV1);
		this.registerAsType(SettingsClientFactory.GrpcClientV1Descriptor, SettingsGrpcClientV1);
	}
	
}
