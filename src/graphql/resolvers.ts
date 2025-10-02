import { blogResolvers } from "./resolvers/blogResolvers";

// Merge all resolvers
export const resolvers = {
  Query: {
    ...blogResolvers.Query,
    hello: () => "Hello from Paws & Hearts Shelter API!",
  },
  // Add other resolvers here if needed
};
