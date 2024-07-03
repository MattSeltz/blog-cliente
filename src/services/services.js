import {ENVIRONMENT} from "../config/config"

export const getData = async uri => {
  try {
    const res = await fetch(`${ENVIRONMENT}${uri}`,{
      method:"GET",
      credentials: "include"
    })

    const data = await res.json()

    if(res.ok) {
      return data
    }else{
      return false
    }
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

    if(res.ok) {
      return data
    }else{
      return false
    }
  } catch (error) {
    console.error(error)
  }
}

export const postData = async (uri,body) => {
  try {
    const res = await fetch(`${ENVIRONMENT}${uri}`,{
      method:"POST",
      body:JSON.stringify(body),
      headers:{
        "Content-Type":"application/json"
      },
      credentials: "include"
    })

    const data = await res.json()

    if(res.ok) {
      return data
    }else{
      return false
    }
  } catch (error) {
    console.error(error)
  }
}

export const updateData = async (uri,id,body) => {
  try {
    const res = await fetch(`${ENVIRONMENT}${uri}${id}`,{
      method:"PUT",
      body:JSON.stringify(body),
      headers:{
        "Content-Type":"application/json"
      },
      credentials: "include"
    })

    const data = await res.json()

    if(res.ok) {
      return data
    }else{
      return false
    }
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

    const data = await res.json()

    if(res.ok) {
      return data
    }else{
      return false
    }
  } catch (error) {
    console.error(error)
  }
}