import { Project, CourseDifficultyEnum, RarityEnum } from './interfaces'

export const requestedProject: Project = {
    id: 'ceramic://kjzl6cwe1jw146n06yb7g3ihjxgf4t9ndj7wxk2mq21zjdtdvlu9ij6ir4r6rn8',
    name: 'Matic',
    description: 'Matic description',
    github: 'somegithuburl',
    color: 'yellow',
    tags: [
      { 
        id: 'defi',
        name: 'DeFi',
        color: 'blue',
        description: 'The DeFi is the future',
      },
      {
        id: 'cefi',
        name: 'CeFi',
        color: 'yellow',
        description: 'The CeFi is here to change the world',
      },
    ],
    courses: [
      {
        title: 'Wallets',
        description: 'In this lesson...',
        difficulty: CourseDifficultyEnum.EXPERT,
        gitbook: 'https://google.com',
        id: 'course1id',
        quests: [
          {
            completedBy: ['user1', 'user2', 'user3', 'user4'],
            courseId: 'course1id',
            description: 'Now show what you have learnt...',
            id: 'quest1id54',
            name: 'Distributed Ledger & Bitcoin',
            nfts: [
              {
                claimedBy: ['user1', 'user2'],
                name: 'Master 1',
                rarity: RarityEnum.EPIC,
                url: 'https://google.com',
              },
            ],
            questions: [
              {
                answer: 'decentralised finance',
                choices: ['degenerated finance', 'demotivated fiance', 'decentralised finance'],
                question: 'What DeFi means?',
              },
              {
                answer: 'Vitalik Buterin',
                choices: ['Michael Jackson', 'Vitalik Buterin', 'Dark Vader'],
                question: 'Who is the Founder of Ethereum?',
              },
            ],
          },
          {
            completedBy: ['user1', 'user2', 'user3', 'user4'],
            courseId: 'course1id',
            description: 'Now show what you have learnt...',
            id: 'quest2id',
            name: 'Distributed Ledger & Bitcoin',
            nfts: [
              {
                claimedBy: ['user1', 'user2'],
                name: 'Master 1',
                rarity: RarityEnum.EPIC,
                url: 'https://google.com',
              },
            ],
            questions: [
              {
                answer: 'decentralised finance',
                choices: ['degenerated finance', 'demotivated fiance', 'decentralised finance'],
                question: 'What DeFi means?',
              },
            ],
          },
          {
            completedBy: ['user1', 'user2', 'user3', 'user4'],
            courseId: 'course1id',
            description: 'Now show what you have learnt...',
            id: 'quest3id',
            name: 'Distributed Ledger & Bitcoin',
            nfts: [
              {
                claimedBy: ['user1', 'user2'],
                name: 'Master 1',
                rarity: RarityEnum.EPIC,
                url: 'https://google.com',
              },
            ],
            questions: [
              {
                answer: 'decentralised finance',
                choices: ['degenerated finance', 'demotivated fiance', 'decentralised finance'],
                question: 'What DeFi means?',
              },
            ],
          },
        ],
      },
      {
        title: 'Protocols',
        description: 'In this lesson...',
        difficulty: CourseDifficultyEnum.ADVANCED,
        gitbook: 'https://google.com',
        id: 'course1id',
        quests: [
          {
            completedBy: ['user1', 'user2'],
            courseId: 'course1id',
            description: 'Now show what you have learnt...',
            id: 'quest1id12',
            name: 'Quest 1',
            nfts: [
              {
                claimedBy: ['user1', 'user2'],
                name: 'Master 1',
                rarity: RarityEnum.EPIC,
                url: 'https://google.com',
              },
            ],
            questions: [
              {
                answer: 'decentralised finance',
                choices: ['degenerated finance', 'demotivated fiance', 'decentralised finance'],
                question: 'What DeFi means?',
              },
            ],
          },
        ],
      },
      {
        title: 'Wallets',
        description: 'In this lesson...',
        difficulty: CourseDifficultyEnum.BEGINNER,
        gitbook: 'https://google.com',
        id: 'course1id',
        quests: [
          {
            completedBy: ['user1', 'user2'],
            courseId: 'course1id',
            description: 'Now show what you have learnt...',
            id: 'quest1id24',
            name: 'Quest 1',
            nfts: [
              {
                claimedBy: ['user1', 'user2'],
                name: 'Master 1',
                rarity: RarityEnum.EPIC,
                url: 'https://google.com',
              },
            ],
            questions: [
              {
                answer: 'decentralised finance',
                choices: ['degenerated finance', 'demotivated fiance', 'decentralised finance'],
                question: 'What DeFi means?',
              },
            ],
          },
        ],
      },
    ],
  }