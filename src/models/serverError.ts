import { IMessage } from '../interfaces/message';

/**
 * server error container.
 */
export class ServerError implements IMessage {

    /**
     * init error 
     */
    constructor(public message: string) {
    }
}