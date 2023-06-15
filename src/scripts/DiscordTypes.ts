export interface DiscordData {
  spotify: any
  listening_to_spotify: boolean
  kv: Kv
  discord_user: DiscordUser
  discord_status: string
  activities: Activity[]
  active_on_discord_web: boolean
  active_on_discord_mobile: boolean
  active_on_discord_desktop: boolean
}

export interface Kv {}

export interface DiscordUser {
  username: string
  public_flags: number
  id: string
  global_name: string
  display_name: string
  discriminator: string
  bot: boolean
  avatar_decoration: any
  avatar: string
}

export interface Activity {
  type: number
  timestamps: Timestamps
  state: string
  session_id: string
  name: string
  id: string
  flags: number
  details: string
  created_at: number
  buttons: string[]
  assets: Assets
  application_id: string
}

export interface Timestamps {
  start: number
}

export interface Assets {
  small_text: string
  small_image: string
  large_text: string
  large_image: string
}