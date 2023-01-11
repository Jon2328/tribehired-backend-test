import express = require('express')
const router = express.Router()

import * as Type from '../types/types'

const allPostApi = 'https://jsonplaceholder.typicode.com/posts'
const commentApi = 'https://jsonplaceholder.typicode.com/comments'

router.get('/top-posts', async (req, res) => {
  try {
    const sourcePost = await (await fetch(allPostApi)).json() as Array<Type.PostType>
    const sourceComment = await (await fetch(commentApi)).json() as Array<Type.CommentType>
    const postIdMap = [] as Array<Number>
    const resultPost = [] as Array<Type.ResultTopComment>

    for (let i = 0; i < sourcePost.length; i++) {
      resultPost.push({
        post_id: sourcePost[i].id,
        post_title: sourcePost[i].title,
        post_body: sourcePost[i].body,
        total_number_of_comments: 0
      })
      postIdMap.push(sourcePost[i].id)
    }

    for (let i = 0; i < sourceComment.length; i++) {
      const index = postIdMap.findIndex(postID => postID === sourceComment[i].postId)
      if (index !== -1) {
        resultPost[index].total_number_of_comments++
      } else {
        console.log('Comment without post found with id: ' + sourceComment[i].id )
      }
    }

    resultPost.sort((a, b) => {
      return b.total_number_of_comments - a.total_number_of_comments
    })

    res.json( resultPost )
  } catch (err) {
    console.log(err)
    res.status(500).send('Something went wrong, please try again.')
  }
})

module.exports = router