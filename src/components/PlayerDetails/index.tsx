import { Avatar } from '@/components/Avatar'

import styles from './PlayerDetails.module.css'
import Link from 'next/link'
import { LastSeen } from '@/components/LastSeen'

type AccountStatus =
  | 'closed'
  | 'closed:fair_play_violations'
  | 'basic'
  | 'premium'
  | 'mod'
  | 'staff'

type Player = {
  avatar?: string
  country: string
  followers: number
  is_streamer: false
  joined: number
  last_online: number
  league: string
  location?: string
  name?: string
  player_id: number
  status: AccountStatus
  streaming_platforms: unknown[]
  title?: string
  url: string
  username: string
  verified: boolean
}

type Props = {
  details: Player
  backUrl: string | undefined
}

const formatDate = (date: number) => {
  const d = new Date(date * 1000)
  return d.toLocaleDateString(navigator.language, {
    dateStyle: 'long',
  })
}

export const PlayerDetails = ({ details, backUrl }: Props) => (
  <div className={styles.root}>
    <div className={styles.linkWrapper}>
      <Link href={backUrl ?? '/'} className={styles.link}>
        &#60; Back
      </Link>
    </div>

    <div className={styles.details}>
      <header className={styles.header}>
        <Avatar
          name={details.name || details.username}
          imageUrl={details.avatar}
        />

        <div className={styles.headerInfo}>
          <h1 className={styles.name}>
            @{details.username} <sup>{details.title}</sup>
          </h1>
          {details.name && <p>{details.name}</p>}

          {details.verified && <span>Verified</span>}

          <LastSeen ts={details.last_online} />
        </div>
      </header>

      {details.location && <div>📍{details.location}</div>}

      <div>
        <strong>Joined:</strong> {formatDate(details.joined)}
      </div>
      <div>
        <strong>Followers:</strong> {details.followers}
      </div>
    </div>
  </div>
)
