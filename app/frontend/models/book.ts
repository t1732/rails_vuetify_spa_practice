import { Transform } from 'class-transformer'
import * as dayjs from 'dayjs'
import { Dayjs} from 'dayjs'

export default class Book {
  id: number | undefined
  title: string = ""
  author: string = ""
  publisher: string = ""
  genre: string = ""
  @Transform(value => value ? dayjs(value) : null, { toClassOnly: true })
  createdAt: Dayjs | undefined
  @Transform(value => value ? dayjs(value) : null, { toClassOnly: true })
  updatedAt: Dayjs | undefined
}
