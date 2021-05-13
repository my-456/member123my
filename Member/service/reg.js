import request from "./network.js"

export function getUserReg(data){
  return request({
    url:"/member/user/createMemberUser",
    data
  })
}