/**
 * 提交bug
 */
import request from '@/util/request'
import { bug as bugApi } from '@/api'

export async function addReport (data) {
  return request({
    url: bugApi.index,
    method: 'get',
    data
  })
}
