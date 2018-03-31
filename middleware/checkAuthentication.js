module.exports = (req, res, next) => {
  if (!req.user)
    return res.status(401).send({
      error: 'You are not logged in',
    });
  next();
};
