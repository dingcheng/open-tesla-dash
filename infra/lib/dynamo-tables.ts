import { AttributeType, BillingMode, Table, TableEncryption } from 'monocdk/aws-dynamodb';
import { Construct } from 'monocdk';

interface DynamoDBTablesProps {

}

export class OpenTeslaDashDynamoDBTables extends Construct {

    public readonly userTable: Table;
    public readonly vehicleStreamTable: Table;
    public readonly vehicleEventsTable: Table;
    public readonly teslaTokensTable: Table;

    constructor(scope: Construct, id: string, props: DynamoDBTablesProps = {}) {
        super(scope, id);

        // this table stores user information
        const userTable = new Table(this, 'Users', {
            tableName: 'users',
            billingMode: BillingMode.PAY_PER_REQUEST,
            partitionKey: {name: 'userId', type:AttributeType.STRING},
            sortKey: {name: 'sk', type:AttributeType.NUMBER}
        });

        // this table stores the (almost) raw snapshot data captured from tesla server
        const vehicleStreamTable = new Table(this, 'VehicleStream', {
            tableName: 'vehicle-stream',
            billingMode: BillingMode.PAY_PER_REQUEST,
            partitionKey: {name: 'vin', type: AttributeType.STRING},
            sortKey: {name: 'timestamp', type:AttributeType.NUMBER},
            timeToLiveAttribute: 'TTL',
        });

        // this table holds the access tokens needed to invoke tesla APIs
        const teslaTokensTable = new Table(this, 'TeslaTokens', {
            tableName: 'tesla-token',
            billingMode: BillingMode.PAY_PER_REQUEST,
            partitionKey: {name: 'pk', type: AttributeType.STRING},
            encryption: TableEncryption.AWS_MANAGED
        });

        // this table stores the summarized vehicle events
        const vehicleEventsTable = new Table(this, 'VehicleEvents', {
            tableName: 'vehicle-events',
            billingMode: BillingMode.PAY_PER_REQUEST,
            partitionKey: {name: 'vin', type: AttributeType.STRING},
            sortKey: {name: 'start_stamp', type: AttributeType.NUMBER}
        });
        vehicleEventsTable.addGlobalSecondaryIndex({
            indexName: 'event-type-index',
            partitionKey: {name: 'vin_and_type', type:AttributeType.STRING},
            sortKey: {name:'start_stamp', type: AttributeType.NUMBER}
        });

        this.userTable = userTable;
        this.vehicleStreamTable = vehicleStreamTable;
        this.vehicleEventsTable = vehicleEventsTable;
        this.teslaTokensTable = teslaTokensTable;
        
    }
}