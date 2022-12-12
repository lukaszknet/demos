import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createRxDatabase, RxCollection, RxDatabase} from 'rxdb';
import {getRxStorageMemory} from 'rxdb/plugins/memory';
import {taskSchema, TaskType} from './taskSchema';

type ToDoDatabase = RxDatabase<{
    tasks: RxCollection<TaskType>
}>

async function main() {
    const db: ToDoDatabase = await createRxDatabase({
        name: 'todo_db',
        storage: getRxStorageMemory()
    });

    await db.addCollections({
        tasks: {
            schema: taskSchema
        }
    });

    await db.tasks.bulkInsert([
        {
            id: `${Math.random()}`,
            timestamp: Date.now(),
            text: 'Example task #1'
        },
        {
            id: `${Math.random()}`,
            timestamp: Date.now(),
            text: 'Example task #2'
        }
    ]);

    const root = ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement
    );

    const tasks$ = db.tasks.find({
        sort: [{timestamp: 'asc'}]
    }).$;

    function addTask(text: string): void {
        db.tasks.insert({
            text,
            timestamp: Date.now(),
            id: `${Math.random()}`
        });
    }

    root.render(<App addTask={addTask} tasks$={tasks$}/>);

    (window as any).db = db;
}

main().then(() => console.log(`App started`));
