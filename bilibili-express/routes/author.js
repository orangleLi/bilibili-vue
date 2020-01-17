import {stat} from '../config/url'
import {get} from './common'

export const getStat = (req, res) => {
  get(req, res, stat)
}
