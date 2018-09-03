/**
 * 站点
 */
import request from '@/util/request'
import { site as siteApi } from '@/api'

export async function getSite (data) {
  return request({
    url: siteApi.search,
    method: 'post',
    data
  })
}
