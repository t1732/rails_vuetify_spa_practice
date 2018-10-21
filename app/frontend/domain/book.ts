'use strict'
import { Transform } from 'class-transformer'
import * as dayjs from 'dayjs'
import { Dayjs} from 'dayjs'

export default class Book {
  id: number
  title: string
  author: string
  publisher: string
  genre: string

  @Transform(value => dayjs(value), { toClassOnly: true })
  createdAt: Dayjs

  @Transform(value => dayjs(value), { toClassOnly: true })
  updatedAt: Dayjs
}
