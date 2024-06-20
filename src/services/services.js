import {ENVIRONMENT} from "../config/config"

export const getData = async uri => {
  try {
    const res = await fetch(`${ENVIRONMENT}${uri}`,{
      method:"GET",
      credentials: "include"
    })
  const data = await res.json()
  return data
  } catch (error) {
    console.error(error)
  }
}

export const getOneData = async (uri,id) => {
  try {
    const res = await fetch(`${ENVIRONMENT}${uri}${id}`,{
      method:"GET",
      credentials: "include"
    })
  const data = await res.json()
  return data
  } catch (error) {
    console.error(error)
  }
}

export const postData = async (uri,data) => {
  try {
    const res = await fetch(`${ENVIRONMENT}${uri}`,{
      method:"POST",
      body:JSON.stringify(data),
      headers:{
        "Content-Type":"application/json"
      },
      credentials: "include"
    })

    return res
  } catch (error) {
    console.error(error)
  }
}

export const updateData = async (uri,id,data) => {
  try {
    const res = await fetch(`${ENVIRONMENT}${uri}${id}`,{
      method:"PUT",
      body:JSON.stringify(data),
      headers:{
        "Content-Type":"application/json"
      },
      credentials: "include"
    })

    return res
  } catch (error) {
    console.error(error)
  }
}

export const deleteData = async (uri,id) => {
  try {
    const res = await fetch(`${ENVIRONMENT}${uri}${id}`,{
      method:"DELETE",
      credentials: "include"
    })

    return res
  } catch (error) {
    console.error(error)
  }
}