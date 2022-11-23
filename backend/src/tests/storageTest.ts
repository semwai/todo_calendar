import test from 'node:test'
import assert from "assert";
import {MemoryTaskStorage} from "../storage";
import {Task, TaskStatus} from "../models";


test('MemoryTaskStorage', () => {
    let store = new MemoryTaskStorage()
    let task1 = new Task(1, "сделать что-то", new Date('2022-11-22'), TaskStatus.Created)
    let task2 = new Task(2, "не сделать что-то", new Date('2022-11-23'), TaskStatus.Created)
    store.add(task1)
    store.add(task2)
    assert.strictEqual(store.get(1), task1)
    assert.strictEqual(store.get(2), task2)
    assert.throws(() => {
        store.add(task1)
    })
})