import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
query Query {
    movies {
      id
      title
      slug
      synopsis
      trailerUrl
      imgUrl
      rating
      genreId
      authorId
      createdAt
      updatedAt
      Genre {
        id
        name
      }
      Casts {
        id
        name
        profilePict
        movieId
      }
      Author {
        _id
        email
        username
        role
        phoneNumber
        address
      }
    }
  }
`;

export const GET_MOVIE = gql`
query Query($movieId: Int!) {
    movie(id: $movieId) {
      id
      title
      slug
      synopsis
      trailerUrl
      imgUrl
      rating
      genreId
      authorId
      createdAt
      updatedAt
      Genre {
        id
        name
      }
      Casts {
        id
        name
        profilePict
        movieId
      }
      Author {
        _id
        email
        username
        role
        phoneNumber
        address
      }
    }
  }
`;