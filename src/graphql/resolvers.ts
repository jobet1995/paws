import { GraphQLResolveInfo } from 'graphql';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const resolvers = {
  Query: {
    posts: async () => {
      const postsDirectory = path.join(process.cwd(), 'posts');
      const filenames = await fs.readdir(postsDirectory);

      const posts = await Promise.all(
        filenames.map(async (filename) => {
          const filePath = path.join(postsDirectory, filename);
          const fileContents = await fs.readFile(filePath, 'utf8');
          const { data, content } = matter(fileContents);
          return {
            ...data,
            content,
          };
        })
      );
      return posts;
    },
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
