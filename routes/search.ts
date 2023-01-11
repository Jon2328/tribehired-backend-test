import express = require('express')
const router = express.Router()

import * as Type from '../types/types'

const commentApi = 'https://jsonplaceholder.typicode.com/comments'

router.post('/comments', async (req, res) => {
  try {
    const payload = req.body
    let payloadExist = false
    // Payload Existence Check and Validation
    const toSearchParameter = [] as Array<Type.ToSearchParameter>

    if ((payload.postId || payload.postId === 0) && typeof payload.postId === 'number') {
      payloadExist = true
      toSearchParameter.push({
        name: 'postId',
        value: payload.postId
      })
    }

    if ((payload.id || payload.id === 0) && typeof payload.id === 'number') {
      payloadExist = true
      toSearchParameter.push({
        name: 'id',
        value: payload.id
      })
    }

    if (payload.name && typeof payload.name === 'string') {
      payloadExist = true
      toSearchParameter.push({
        name: 'name',
        value: payload.name
      })
    }

    if (payload.email && typeof payload.email === 'string') {
      payloadExist = true
      toSearchParameter.push({
        name: 'email',
        value: payload.email
      })
    }

    if (payload.body && typeof payload.body === 'string') {
      payloadExist = true
      toSearchParameter.push({
        name: 'body',
        value: payload.body
      })
    }


    if (!payloadExist) {
      throw new Error('ERR:::Insufficient Or Invalid Payload.')
    }


    const sourceComment = await (await fetch(commentApi)).json() as Array<Type.CommentType>

    // Any field hit
    const filteredComment = sourceComment.filter(source => {
      for (const toSearch of toSearchParameter) {
        if (source[toSearch.name] === toSearch.value) {
          return source
        }
      }
    })

    // All field hit
    // const filteredComment = sourceComment.filter(source => {
    //   let isDisqualified = false

    //   for (const toSearch of toSearchParameter) {
    //     if (source[toSearch.name] !== toSearch.value) {
    //       isDisqualified = true
    //       break
    //     }
    //   }

    //   if (!isDisqualified) {
    //     return source
    //   }
    // })
   
    res.json( filteredComment )
  } catch (err) {
    if (err.message.includes('ERR:::')) {
      const errMsg = err.message.replace('ERR:::', '')
      res.status(400).send(errMsg)
    } else {
      res.status(500).send('Something went wrong, please try again.')
    }
  }
})

module.exports = router