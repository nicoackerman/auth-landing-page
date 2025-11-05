import type { ITransaction } from "~/entities/models/transaction";

export interface ITransactionManagerService {
  startTransaction<T>(
    clb: (tx: ITransaction) => Promise<T>,
    parent?: ITransaction,
  ): Promise<T>;
}
