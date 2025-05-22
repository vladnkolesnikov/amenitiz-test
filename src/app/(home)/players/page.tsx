import { Players } from '@/components/Players'

type Response = {
  players: string[]
}

export default async function Home() {
  try {
    const res = await fetch('https://api.chess.com/pub/titled/GM')
    const data: Response = await res.json()

    return <Players items={data.players} />
  } catch (error: unknown) {
    throw error
  }
}

export const dynamic = 'force-dynamic'
