import { TiptapCollabProvider } from "@hocuspocus/provider"

export interface TiptapProps {
  hasCollab: boolean
  provider?: TiptapCollabProvider | null | undefined
}

export type EditorUser = {
  clientId: string
  name: string
  color: string
  initials?: string
}
