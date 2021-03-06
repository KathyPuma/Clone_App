const express = require('express');
const router = express.Router();
const subredditPostsQueries = require('../queries/subredditPosts')
const subredditQueries = require('../queries/subreddit')


router.get('/getAllSubreddits', async (req, res, next) => {
  try {
    let posts = await subredditQueries.getAllSubreddits()
    res.json({
      payload: posts,
      message: "Retrieved all posts from subreddit",
      error: false
    })
  } catch (err) {
    res.status(500).json({
      payload: null,
      message: "Failed retrieving all posts from subreddit",
      error: true
    })
  }

});

router.get('/subredditLogo/:subreddit_name', async (req, res, next) => {
  const { subreddit_name } = req.params

  try {
    let posts = await subredditQueries.getSubbredditOnlyByName(subreddit_name)
    res.json({
      payload: posts,
      message: "Retrieved all posts from subreddit",
      error: false
    })
  } catch (err) {
    res.status(500).json({
      payload: null,
      message: "Failed retrieving all posts from subreddit",
      error: true
    })
  }

});



router.get('/', async (req, res, next) => {
  try {
    let posts = await subredditPostsQueries.getAllPostBySubbreddit()
    res.json({
      payload: posts,
      message: "Retrieved all posts from subreddit",
      error: false
    })
  } catch (err) {
    res.status(500).json({
      payload: null,
      message: "Failed retrieving all posts from subreddit",
      error: true
    })
  }

});

router.get('/:subreddit_id', async (req, res, next) => {
  const { subreddit_id } = req.params
  let subredditId = parseInt(subreddit_id)
  try {
    let posts = await subredditQueries.getSubbredditById(subredditId)
    res.json({
      payload: posts,
      message: "Retrieved all posts from subreddit",
      error: false
    })
  } catch (err) {
    res.status(500).json({
      payload: null,
      message: "Failed retrieving all posts from subreddit",
      error: true
    })
  }

});

router.get('/name/:subreddit_name', async (req, res, next) => {
  const { subreddit_name } = req.params
  try {
    let posts = await subredditPostsQueries.getSubbredditByName(subreddit_name)
    res.json({
      payload: posts,
      message: "Retrieved all posts by  subreddit name",
      error: false
    })
  } catch (err) {
    res.status(500).json({
      payload: null,
      message: "Failed retrieving all posts from subreddit",
      error: true
    })
  }

});


router.get('/subredditName/:subreddit_name', async (req, res, next) => {
  const { subreddit_name } = req.params
  try {
    let posts = await subredditQueries.checkIfSubbredditExist(subreddit_name)
    res.json({
      payload: posts,
      message: "Retrieved subreddit information by subreddit name",
      error: false
    })
  } catch (err) {
    res.status(500).json({
      payload: null,
      message: "Failed retrieving subreddit information by subreddit name",
      error: true
    })
  }
});


router.get('/search/subredditName/:subreddit_name', async (req, res, next) => {
  const { subreddit_name } = req.params

  try {
    let posts = await subredditQueries.searchSubreddit(subreddit_name)
    
    res.json({
      payload: posts,
      message: "Retrieved subreddit information by subreddit name",
      error: false
    })
  } catch (err) {
    res.status(500).json({
      payload: null,
      message: "Failed retrieving subreddit information by subreddit name",
      error: true
    })
  }

});





router.post('/add', async (req, res, next) => {

  const { subreddit_name, subreddit_description, subreddit_admin } = req.body
  let subreddit_banner = '/images/subredditBanners/DefaultBanner.png'
  let subreddit_logo = '/images/subredditLogos/WholesomeMemesLogo.png'
  try {
    let newSubreddit = await subredditQueries.addNewSubreddit({ subreddit_name, subreddit_description, subreddit_admin, subreddit_banner, subreddit_logo })

    res.json({
      payload: newSubreddit,
      message: "Successfully created a new community",
      error: false
    })
  } catch (err) {
    res.status(500).json({
      payload: null,
      message: "Community name taken",
      error: true
    })
  }

});




router.post('/', async (req, res, next) => {

  const { subreddit_name, subreddit_description, subreddit_admin } = req.body

  try {
    let newSubreddit = await subredditQueries.addNewSubreddit({ subreddit_name, subreddit_description, subreddit_admin })

    res.json({
      payload: newSubreddit,
      message: "Successfully created a new community",
      error: false
    })
  } catch (err) {
    res.status(500).json({
      payload: null,
      message: "Community name taken",
      error: true
    })
  }

});




module.exports = router;