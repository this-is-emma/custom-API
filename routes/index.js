const express = require('express')
const router = express.Router();
const Quote = require('../models/quote')

// GET ALL 
router.get('/', async (req, res) => {
    if(req.user){
        try{
            const quotes = await Quote.find()
            res.json(quotes)
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    } else {
        return res.status(401).json({message: "Unauthorized! you must be logged in to use the API."}); // UNAUTHORIZED
    }
})


// GET ONE
router.get('/:id', getQuote, (req, res) => {
    if(req.user) {
      res.json(res.quote)
    } else {
        return res.status(401).json({message: "Unauthorized! you must be logged in to use the API."});
    }
})

// CREATE ONE
router.post('/', async (req, res) => {
    if(req.user) {
        const quote = new Quote({
            body: req.body.body,
            author: req.body.author,
        })
    
        try {
            const newQuote = await quote.save()
            res.status(201).json(newQuote)
        } catch (err) {
            res.status(400).json({message: err.message})
        }
    } else {
        return res.status(401).json({message: "Unauthorized! you must be logged in to use the API."});
    }
})



// UPDATE ONE WITH PATCH
router.patch('/:id', getQuote, async (req, res) => {
    if (req.user) {
        if (req.body.body != null) {
            res.quote.body = req.body.body
        }
        if (req.body.author != null) {
            res.quote.author = req.body.author
        }

        try {
            const updatedQuote = await res.quote.save()
            res.json(updatedQuote) 
        } catch (err) {
            res.status(400).json({message: err.message})
        }
    } else {
        return res.status(401).json({message: "Unauthorized! you must be logged in to use the API."});
    }
})

// UPDATE ONE WITH PUT 
router.put('/:id', getQuote, async (req, res) => {
  if(req.user) {
    res.quote.author = req.body.author
    res.quote.body = req.body.body

    try {
        const updatedQuote = await res.quote.save()
        res.json(updatedQuote) 
    } catch (err) {
        res.status(400).json({message: err.message})
    }
  } else {
    return res.status(401).json({message: "Unauthorized! you must be logged in to use the API."});
  }
})

// DELETE ONE 
router.delete('/:id', getQuote, async (req, res) => {
  if(req.user) {
    try {
        await res.quote.remove()
        res.json({message: "deleted quote"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
  } else {
    return res.status(401).json({message: "Unauthorized! you must be logged in to use the API."});
  }
})



// Helper function
async function getQuote(req, res, next) {
    let quote
    try {
        quote = await Quote.findById(req.params.id)
        if (quote == null) {
            return res.status(404).json({
                message: 'Cannot  find quote'
            })
        }
    } catch (err) {
        res.status(500).json({message: err.message})
    }

    res.quote = quote;
    next()
}

module.exports = router;