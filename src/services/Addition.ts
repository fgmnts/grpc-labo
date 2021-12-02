import { sendUnaryData, ServerReadableStream, ServerUnaryCall, ServerWritableStream, status, UntypedHandleCall } from '@grpc/grpc-js';

import { AdditionServer, AdditionService, AddRequest, NumberMessage } from '../models/addition';
import { logger, ServiceError } from '../utils';

/**
 * service Addition
 */
class Addition implements AdditionServer {
  [method: string]: UntypedHandleCall;

  /**
   * Implements the SayHello RPC method.
   */
  public add2Numbers(call: ServerUnaryCall<AddRequest, NumberMessage>, callback: sendUnaryData<NumberMessage>): void {
    logger.info('add2Numbers', Date.now());

    const res: Partial<NumberMessage> = {};
    const { a, b } = call.request;
    logger.info('add2NumbersName:', a, b);

    res.val = a + b;
    callback(null, NumberMessage.fromJSON(res));
  }

  public addNumbersStreamRequest(call: ServerReadableStream<NumberMessage, NumberMessage>, callback: sendUnaryData<NumberMessage>): void {
    logger.info('addNumbersStreamRequest:', call.getPeer());

    let sum: number = 0;
    call
      .on('data', (req: NumberMessage) => {
        sum += req.val;
        logger.info('adding:', req.val, 'total:', sum);
      })
      .on('end', () => {
        callback(
          null,
          NumberMessage.fromJSON({
            val: sum,
          })
        );
      })
      .on('error', (err: Error) => {
        callback(new ServiceError(status.INTERNAL, err.message), null);
      });
  }

  public sayFibStreamResponse(call: ServerWritableStream<AddRequest, NumberMessage>): void {
    logger.info('add2NumbersStreamResponse:', call.request);

    let { a, b } = call.request;

    for (const _i of Array(10)) {
      const c = a + b;
      call.write(
        NumberMessage.fromJSON({
          val: c,
        })
      );
      a = b;
      b = c;
    }
    call.end();
  }
}

export { Addition, AdditionService };
