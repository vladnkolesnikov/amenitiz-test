import { PlayerDetails } from '@/components/PlayerDetails'

type PageProps<T, S> = {
  params: Promise<T>
  searchParams: Promise<S>
}

export default async function PlayerDetailsPage(
  props: PageProps<{ playerId: string }, { rt?: string }>
) {
  const { playerId } = await props.params
  const { rt } = await props.searchParams

  try {
    const res = await fetch(`https://api.chess.com/pub/player/${playerId}`)
    const data = await res.json()

    return <PlayerDetails details={data} backUrl={rt || '/players'} />
  } catch (error: unknown) {
    throw error
  }
}

export const dynamic = 'force-dynamic'
