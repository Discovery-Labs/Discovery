import { gql } from '@apollo/client'

export const ALL_PROJECTS_QUERY = gql`
  query getAllProjects {
    getAllProjects {
      id
      name
      description
      github
      color
      tags {
        id
        name
      }
    }
  }
`
