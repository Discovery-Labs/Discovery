import { gql } from '@apollo/client'

export const ALL_PROJECTS_QUERY = gql`
  query getAllProjects {
    getAllProjects {
      name
      description
      github
      color
    }
  }
`
