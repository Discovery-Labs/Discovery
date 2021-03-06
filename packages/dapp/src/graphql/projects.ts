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

export const PROJECT_BY_ID_QUERY = gql`
  query GetProjectById($projectId: String!) {
    getProjectById(projectId: $projectId) {
      id
      name
      description
      color
      tags {
        id
        name
      }
      courses {
        id
        title
        description
        courseType
        difficulty
        quests {
          id
          questions {
            answer
            question
            choices
          }
          completedBy
        }
      }
    }
  }
`
