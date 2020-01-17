import {reply, desc, tags, detail, statVideo, replyDetail, recommend, dm} from '../config/url'
import {get} from './common'

export const getReply = (req, res) => {
  get(req, res, reply)
}

export const getReplyDetail = (req, res) => {
  get(req, res, replyDetail)
}
export const getDesc = (req, res) => {
  get(req, res, desc)
}

export const getTags = (req, res) => {
  get(req, res, tags)
}
export const getDetail = (req, res) => {
  get(req, res, detail)
}
export const getStatVideo = (req, res) => {
  get(req, res, statVideo)
}
export const getRecommend = (req, res) => {
  get(req, res, recommend)
}
export const getDm = (req, res) => {
  get(req, res, dm)
}
