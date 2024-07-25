import { Prisma } from '@prisma/client';
import { OperationPrisma } from '../../../common/shared/constants/operation-prisma.enum';

export const filterSoftDeleted = Prisma.defineExtension({
  name: 'filterSoftDeleted',
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        if (
          operation === OperationPrisma.findUnique ||
          operation === OperationPrisma.findFirst ||
          operation === OperationPrisma.findMany
        ) {
          args.where = { ...args.where, deleted_at: null };
          return query(args);
        }
        return query(args);
      },
    },
  },
});
