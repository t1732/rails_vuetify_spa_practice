'use strict'
import { Transform, Type } from 'class-transformer'

class AppInfoItem {
  label: string
  version: string
}

export default class AppInfo {
  @Type(() => AppInfoItem)
  systems: AppInfoItem[]
  @Type(() => AppInfoItem)
  jsPackages: AppInfoItem[]
}
