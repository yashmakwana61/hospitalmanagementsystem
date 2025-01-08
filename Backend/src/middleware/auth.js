const jwt = require('jsonwebtoken');
const { User } = require('../models');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id, tenant: decoded.tenant });
    
    if (!user) throw new Error();
    
    req.user = user;
    req.tenant = user.tenant;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication required' });
  }
};