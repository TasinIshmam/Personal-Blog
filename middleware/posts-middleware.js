

 function storePost (req, res, next) {
    if (!req.files|| !req.body.username || !req.body.title || !req.body.description || !req.body.content) {
        return res.redirect('/posts/new')
    }

    //since first if condition was passed, req.files does exist
    if(!req.files.image) {
        return res.redirect('/posts/new');
    }

    next();
}



module.exports = {storePost: storePost}