import {ExtractDocumentTypeFromTypedRxJsonSchema, RxJsonSchema, toTypedRxJsonSchema} from 'rxdb';

const taskSchemaLiteral = {
    title: 'task schema',
    version: 0,
    description: 'describes task from todo list',
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 32
        },
        timestamp: {
            type: 'number'
        },
        text: {
            type: 'string'
        }
    },
    required: ['id', 'timestamp', 'text']
} as const; // <- It is important to set 'as const' to preserve the literal type

const schemaTyped = toTypedRxJsonSchema(taskSchemaLiteral);

// aggregate the document type from the schema
export type TaskType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>;

// create the typed RxJsonSchema from the literal typed object.
export const taskSchema: RxJsonSchema<TaskType> = taskSchemaLiteral;