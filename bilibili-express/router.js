import {getBanner} from './routes/banner'
import {getRanking, getCategory, getRegion} from './routes/ranking'
import {getHotword, searchByKey, getSuggest, getDefaultSearch} from './routes/search'
import {getPartition} from './routes/partition'
import {getReply, getDesc, getTags, getDetail, getStatVideo, getReplyDetail, getRecommend, getDm} from './routes/detail'
import {getStat} from './routes/author'

const express = require('express')
const router = express.Router()

router.get('/ranking', getRanking)
router.get('/banner', getBanner)
router.get('/category', getCategory)
router.get('/hotword', getHotword)
router.get('/default', getDefaultSearch)
router.get('/search', searchByKey)
router.get('/suggest', getSuggest)
router.get('/partition', getPartition)
router.get('/reply', getReply)
router.get('/desc', getDesc)
router.get('/tags', getTags)
router.get('/detail', getDetail)
router.get('/stat', getStat)
router.get('/statVideo', getStatVideo)
router.get('/replyDetail', getReplyDetail)
router.get('/recommend', getRecommend)
router.get('/region', getRegion)
router.get('/dm', getDm)

module.exports = router
