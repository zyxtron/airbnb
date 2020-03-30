import { Group } from '../components/groups/group'
import { Ticket } from '../components/tickets/ticket'
import { User as LocalUser } from '../components/users/user'

declare global {
  namespace Express {
    interface Request {
      tickets: Ticket[]
      groups: Group[]
      group: Group
      userToShow: LocalUser
    }
  }
}