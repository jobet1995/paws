import { gql } from "@apollo/client";

export const GET_BLOG_POSTS = gql`
  query GetBlogPosts($filter: PostFilterInput) {
    posts(filter: $filter) {
      edges {
        node {
          id
          title
          excerpt
          content
          publishedAt
          featuredImage
          author {
            name
            avatar
          }
          categories {
            name
          }
        }
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      slug
    }
  }
`;
