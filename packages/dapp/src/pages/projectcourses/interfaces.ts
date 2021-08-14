export enum CourseDifficultyEnum {
    ADVANCED = "ADVANCED",
    BEGINNER = "BEGINNER",
    EXPERT= "EXPERT",
    INTERMEDIATE= "INTERMEDIATE",
    WIZARD= "WIZARD",
  }
  export enum RarityEnum {
    COMMON,
    EPIC,
    LEGENDARY,
    UNCOMMON,
  }
  export interface QuestNFT {
    claimedBy: string[]
    name: string
    rarity: RarityEnum
    url: string
  }
  export interface Question {
    answer: string
    choices: string[]
    question: string
  }
  export interface Quest {
    completedBy: string[]
    courseId: string
    description: string
    id: string
    name: string
    nfts: QuestNFT[]
    questions: Question[]
    
    // course: Course
    // createdAt: Date
    // updatedAt: Date
  }
  
  export interface Course {
      description: string
      difficulty: CourseDifficultyEnum
      gitbook: string
      id: string
      quests: Quest[]
      title: string
      // createdAt: Date
      // projects: Project[]
    // updatedAt: Date
  }
  export interface Project {
    color: string
    courses: Course[]
    description: string
    github: string
    id: string
    name: string
    tags: Array<Tag>
    // contract_address: string
    // createdAt: Date
    // discord: string
    // is_featured: Boolean
    // logo: string
    // peerProjects: string[]
    // repos: string[]
    // twitter: string
    // updatedAt: Date
    // websites: Date[]
    // whitepaper: string
  }
  
  export interface Tag {
    color: string
    description: string
    id: string
    name: string
  }