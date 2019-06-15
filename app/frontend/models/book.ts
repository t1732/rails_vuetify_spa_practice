import { Exclude, Transform, classToPlain } from 'class-transformer'
import * as dayjs from 'dayjs'
import { Dayjs} from 'dayjs'

export default class Book {
  @Exclude({ toPlainOnly: true })
  id: number | undefined

  title: string = ""
  author: string = ""
  publisher: string = ""
  genre: string = ""

  @Exclude({ toPlainOnly: true })
  @Transform(value => value ? dayjs(value) : null, { toClassOnly: true })
  createdAt: Dayjs | undefined
  @Exclude({ toPlainOnly: true })
  @Transform(value => value ? dayjs(value) : null, { toClassOnly: true })
  updatedAt: Dayjs | undefined

  static get validates (): {[s: string]: {[s: string]: boolean | number | string | undefined}} {
    return {
      title: {
        required: true,
        max: 100
      },
      author: {
        max: 30
      },
      publisher: {
        max: 30
      },
      genre: {
        max: 30
      }
    }
  }

  getCreateParams () {
    return classToPlain(this)
  }
}
