import { GraphQLResolveInfo } from 'graphql';

export const resolvers = {
  Query: {
    hello: (parent: unknown, args: {}, context: unknown, info: GraphQLResolveInfo) => {
      return 'Hello, world!';
    },
  },
};