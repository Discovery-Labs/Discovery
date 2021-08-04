import type { AppNetwork } from './sdk'

export const APP_NETWORK: AppNetwork =
(process.env.NEXT_PUBLIC_APP_NETWORK as AppNetwork | undefined) ?? ('testnet-clay' as AppNetwork) ?? ('testnet-clay' as AppNetwork)

export const PROFILE_URL = 'https://ipfs.3box.io/profile'

export const categories = [
  {
    category: "polygon",
    id: "1",
    title: "Course How to Do X",
    description:
      "For 1 cup of uncooked quinoa,",
    image: "/abstract.png",
    link: "https://google.com",
  },
  {
    category: "polygon",
    id: "1",
    title: "Course How to Do X",
    description:
      "For 1 cup of uncooked quinoa,",
    image: "/abstract.png",
    link: "https://google.com",
  },
  {
    category: "polygon",
    id: "1",
    title: "Course How to Do X",
    description:
      "For 1 cup of uncooked quinoa,",
    image: "/abstract.png",
    link: "https://google.com",
  },
];