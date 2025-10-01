import { GraphQLResolveInfo } from 'graphql';

export const resolvers = {
  Query: {
    hello: (parent: unknown, args: object, context: unknown, info: GraphQLResolveInfo) => {
      // You can access the parent object, arguments, context, and info about the query.
      // For example, let's log them to the console.
      console.log({ parent, args, context, info });

      // And we can use them to construct a more dynamic response.
      const argString = JSON.stringify(args);
      const parentString = JSON.stringify(parent);
      
      return `Hello! You called the '${info.fieldName}' field. Args: ${argString}. Parent: ${parentString}.`;
    },
  },
};