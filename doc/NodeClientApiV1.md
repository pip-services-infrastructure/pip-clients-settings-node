# Client API (version 1) <br/> Settings Microservices Client SDK for Node.js

Node.js client API for Settings microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [Installation](#install)
* [Getting started](#get_started)
* [ISettingsClientV1 interface](#interface)
    - [getSections()](#operation1)
    - [getSectionById()](#operation2)
    - [setSection()](#operation3)
    - [modifySection()](#operation4)
* [SettingsHttpClientV1 class](#client_http)
* [SettingsSenecaClientV1 class](#client_seneca)
* [SettingsDirectClientV1 class](#client_direct)
* [SettingsNullClientV1 class](#client_null)

## <a name="install"></a> Installation

To work with the client SDK add dependency into package.json file:

```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-settings-node": "^1.0.0",
        ...
    }
}
```

Then download the dependency using **npm**:

```javascript
# Installing dependencies
npm install

# Updating dependencies
npm update
```

## <a name="get_started"></a> Getting started

This is a simple example on how to work with the microservice using REST client:

```javascript
// Get Client SDK for Version 1 
var sdk = new require('pip-clients-settings-node');

// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};

// Create the client instance
var client = sdk.SettingsHttpClientV1(config);

// Open client connection to the microservice
client.open(null, function(err) {
    if (err) {
        console.error(err);
        return; 
    }
    
    console.log('Opened connection');
    
    var parameters = {
        myapp: {
            theme: 'blue',
            language: 'en'
        }
    };

    // Sets settings for a party
    client.setSection(
        null,
        '123',
        parameters,
        function (err, parameters) {
            if (err) {
                console.error(err);
                return;
            }
            
            console.log('Stored parameters are');
            console.log(settings);
            
            // Get settings for a party
            client.getSectionById(
                null,
                '123',
                function (err, parameters) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    
                    console.log('Retrieved parameters are');
                    console.log(parameters);
                    
                    // Close connection
                    client.close(); 
                }
            );
        }
    );
});
```

## <a name="interface"></a> ISettingsClientV1 interface

If you are using Typescript, you can use ISettingsClient as a common interface across all client implementations. 
If you are using plain Javascript, you shall not worry about ISettingsClient interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```javascript
interface ISettingsClientV1 {
    getSections(correlationId, filter, paging, callback);
    getSectionById(correlationId, id, callback);
    setSection(correlationId, id, parameters, callback);
    modifySection(correlationId, id, updateParams, incrementParams, callback);
}
```

### <a name="operation1"></a> getSections(correlationId, filter, paging, callback)

Retrieves party settings filtered by set of keys.

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- filter: Object
  - id: string - (optional) unique section id
  - id_starts: string - (optional) starting id substring
  - search: string - (optional) search by id substring
- paging: Object
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Returns:**
- err: Error - occured error or null for success
- result: DataPage<SettingsSectionV1> - page with retrieved settings sections

### <a name="operation2"></a> getSectionById(correlationId, id, callback)

Gets settings section by its unique id

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- id: string - unique section id

**Returns:**
- err: Error - occured error or null for success
- result: Object - section parameters

### <a name="operation3"></a> setSection(correlationId, id, parameters, callback)

Sets settings section parameters by its unique id

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- id: string - unique section id
- parameters: Object - section parameters
 
**Returns:**
- err: Error - occured error or null for success
- result: Object - updated section parameters

### <a name="operation4"></a> modifySection(correlationId, id, updateParams, incrementParams, callback)

Modify settings section, perform partial updates and increments

**Arguments:** 
- correlationId: string - (optional) unique id that identifies distributed transaction
- id: string - unique section id
- updateParams: object - section parameters for partial updates
- incrementParams: object - section parameters for increments

**Returns:**
- err: Error - occured error or null for success
- result: Object - updated section parameters

## <a name="client_http"></a> SettingsHttpClientV1 class

SettingsHttpClient is a client that implements HTTP protocol

```javascript
class SettingsHttpClientV1 extends CommandableHttpClient implements ISettingsClient {
    constructor(config?: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getSections(correlationId, filter, paging, callback);
    getSectionById(correlationId, id, callback);
    setSection(correlationId, id, parameters, callback);
    modifySection(correlationId, id, updateParams, incrementParams, callback);
}
```

**Constructor config properties:** 
- connection: object - HTTP transport configuration options
  - protocol: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_seneca"></a> SettingsSenecaClientV1 class

SettingsSenecaClientV1 is a client that implements Seneca protocol

```javascript
class SettingsSenecaClientV1 extends CommandableSenecaClient implements ISettingsClient {
    constructor(config?: any);        
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getSections(correlationId, filter, paging, callback);
    getSectionById(correlationId, id, callback);
    setSection(correlationId, id, parameters, callback);
    modifySection(correlationId, id, updateParams, incrementParams, callback);
}
```

**Constructor config properties:** 
- connection: object - (optional) Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - type: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

## <a name="client_direct"></a> SettingsDirectClientV1 class

SettingsDirectClientV1 is a dummy client calls controller from the same container. 
It can be used in monolytic deployments.

```javascript
class SettingsDirectClientV1 extends DirectClient implements ISettingsClient {
    constructor();
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getSections(correlationId, filter, paging, callback);
    getSectionById(correlationId, id, callback);
    setSection(correlationId, id, parameters, callback);
    modifySection(correlationId, id, updateParams, incrementParams, callback);
}
```

## <a name="client_null"></a> SettingsNullClientV1 class

SettingsNullClientV1 is a dummy client that mimics the real client but doesn't call a microservice. 
It can be useful in testing scenarios to cut dependencies on external microservices.

```javascript
class SettingsNullClientV1 implements ISettingsClient {
    constructor();
    getSections(correlationId, filter, paging, callback);
    getSectionById(correlationId, id, callback);
    setSection(correlationId, id, parameters, callback);
    modifySection(correlationId, id, updateParams, incrementParams, callback);
}
```
