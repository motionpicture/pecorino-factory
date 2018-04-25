/**
 * タスクファクトリー
 * @namespace task
 */

import * as _ from 'lodash';
import * as validator from 'validator';

import ArgumentError from './error/argument';
import ArgumentNullError from './error/argumentNull';

import { IExtendId } from './autoGenerated';
import * as TaskExecutionResult from './taskExecutionResult';
import TaskName from './taskName';
import TaskStatus from './taskStatus';

export type ITask = IExtendId<IAttributes>;

export interface IAttributes {
    name: TaskName;
    status: TaskStatus;
    /**
     * いつ実行するか
     */
    runsAt: Date;
    /**
     * あと何回トライできるか
     */
    remainingNumberOfTries: number;
    /**
     * 最終トライ日時
     */
    lastTriedAt: Date | null;
    /**
     * すでにトライした回数
     */
    numberOfTried: number;
    /**
     * 実行結果リスト
     */
    executionResults: TaskExecutionResult.ITaskExecutionResult[];
    /**
     * データ
     * TaskNameによってインターフェースが決定する
     */
    data: any;
}

export function createAttributes(params: {
    name: TaskName;
    status: TaskStatus;
    runsAt: Date;
    remainingNumberOfTries: number;
    lastTriedAt: Date | null;
    numberOfTried: number;
    executionResults: TaskExecutionResult.ITaskExecutionResult[];
    data: any;
}): IAttributes {
    if (typeof params.name !== 'string' || validator.isEmpty(params.name)) {
        throw new ArgumentNullError('name');
    }
    if (typeof params.status !== 'string' || validator.isEmpty(params.status)) {
        throw new ArgumentNullError('status');
    }
    if (!(params.runsAt instanceof Date)) {
        throw new ArgumentError('runsAt', 'runsAt must be Date.');
    }
    if (!_.isInteger(params.remainingNumberOfTries)) {
        throw new ArgumentError('remainingNumberOfTries', 'remainingNumberOfTries must be number.');
    }
    if (params.lastTriedAt !== null && !(params.lastTriedAt instanceof Date)) {
        throw new ArgumentError('lastTriedAt', 'lastTriedAt must be Date or null.');
    }
    if (!_.isInteger(params.numberOfTried)) {
        throw new ArgumentError('numberOfTried', 'numberOfTried must be number.');
    }
    if (!Array.isArray(params.executionResults)) {
        throw new ArgumentError('executionResults', 'executionResults must be array.');
    }

    return {
        name: params.name,
        status: params.status,
        runsAt: params.runsAt,
        remainingNumberOfTries: params.remainingNumberOfTries,
        lastTriedAt: params.lastTriedAt,
        numberOfTried: params.numberOfTried,
        executionResults: params.executionResults,
        data: params.data
    };
}