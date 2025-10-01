import { GraphQLResolveInfo } from 'graphql';

export const resolvers = {
  Query: {
    hello: (parent: unknown, args: object, context: unknown, info: GraphQLResolveInfo) => {
      return 'Hello, world!';
    },
  },
};