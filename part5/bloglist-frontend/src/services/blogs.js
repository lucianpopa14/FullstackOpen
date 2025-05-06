import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const newBlog = async(blogObject, token)=>{
  const config={
    headers: {Authorization: `Bearer ${token}`}
  }
  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

export default { getAll, newBlog }