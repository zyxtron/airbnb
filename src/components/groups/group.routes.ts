import {
  format,
  formatDistanceToNowStrict,
  formatDistanceStrict
} from 'date-fns'
import huLocale from 'date-fns/locale/hu'
import { Request, Response, Router} from 'express'
import multer from 'multer'

import { isAuthenticated } from '../../config/passport'
import { DATE_FORMAT, ROOMS } from '../../util/constants'
import { handleValidationError } from '../../util/errorHandlers'
import { User } from '../users/user'
import {
  isGroupOwner,
  joinGroup,
  leaveGroup,
  createICSEvent,
  checkConflicts,
  validateGroup
} from './group.middlewares'
import { createGroup, getGroup, getGroups, removeGroup } from './group.service'

const router = Router()

router.get('/', isAuthenticated, getGroups, (req, res) => {
  res.render('group/index', {
    groups: req.groups,
    paginationOpt: req.paginationOptions,
    dateFns: {
      format,
      formatDistanceStrict,
      formatDistanceToNowStrict,
      huLocale,
      DATE_FORMAT
    }
  })
})

router.get('/new', isAuthenticated, (req, res) =>
  res.render('group/new', {
    start: req.query?.start?.split(' ')[0].slice(0, -3),
    end: req.query?.end?.split(' ')[0].slice(0, -3),
    roomId: req.query?.roomId,
    ROOMS
  })
)

router.post('/',
  isAuthenticated,
  multer().none(),
  validateGroup(),
  handleValidationError(400),
  checkConflicts,
  createGroup,
  joinGroup,
  (req: Request, res: Response) => res.sendStatus(201)
)

router.get('/:id', isAuthenticated, getGroup, (req, res) => {
  const joined = req.group.users.some(u => u.id === (req.user as User).id)
  const isOwner = req.group.ownerId === (req.user as User).id
  res.render('group/show', {
    group: req.group, joined, isOwner, format, DATE_FORMAT
  })
})

router.post('/:id/join',
  isAuthenticated,
  getGroup,
  joinGroup,
  (req, res) => res.redirect(`/groups/${req.params.id}`)
)

router.post('/:id/leave',
  isAuthenticated,
  getGroup,
  leaveGroup,
  (req, res) => res.redirect('/groups')
)

router.delete('/:id',
  isAuthenticated,
  getGroup,
  isGroupOwner,
  removeGroup,
  (req, res) => res.status(204).send('Csoport sikeresen törölve')
)

router.get('/:id/copy', isAuthenticated, getGroup, (req, res) =>
  res.render('group/new', {
    roomId: req.group.room,
    name: req.group.name,
    description: req.group.description,
    tags: req.group.tags,
    ROOMS
  })
)

router.get('/:id/export', isAuthenticated, getGroup, createICSEvent)

export default router
