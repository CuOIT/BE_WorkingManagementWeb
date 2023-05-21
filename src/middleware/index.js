const token=require('./../Utils/token')

module.exports=  authenToken = (req,res,next)=>{
    // console.log("AUTHEN")
    const authorizationHeader = req.headers['authorization'];
    // 'Beaer [token]'
    if(!authorizationHeader) res.sendStatus(401)
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) res.sendStatus(401);
  
    token.verifyAccessToken(accessToken)
    .then(data=>{
      console.log({data});
      req.body={user_id:data.user_id,...req.body}
      console.log(req.body);
      next();
    })
    .catch(error=>res.sendStatus(403))
}

