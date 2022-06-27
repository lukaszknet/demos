import React, {FormEventHandler} from 'react';
import {Observable} from 'rxjs';
import {TaskType} from './taskSchema';
import {useObservableState} from 'observable-hooks';

type AppProps = {
    tasks$: Observable<TaskType[]>,
    addTask: (text: string) => void
}

export default function App(props: AppProps) {
    const tasks: TaskType[] | undefined = useObservableState(props.tasks$);

    const addTaskHandler: FormEventHandler<HTMLInputElement> = (e) => {
        const el = document.getElementById('new-task') as HTMLInputElement;
        props.addTask(el.value);
        el.value = '';
    };

    return (
        <div className="App">
            <form>
                <input id={'new-task'} defaultValue={''}/>
                <input type={'button'} value={'Add task'} onClick={addTaskHandler}/>
            </form>
            <ul>
                {tasks?.map(it => <li
                    key={it.id}>{it.text} at {new Date(it.timestamp).toISOString()}</li>)}
            </ul>
        </div>
    );
}