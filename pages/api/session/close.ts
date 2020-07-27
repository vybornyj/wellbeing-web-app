import { NextApiResponse } from 'next'
import { withSession } from 'src/scripts-server/sessions/withSession'

const Api = async (req, res: NextApiResponse) => {
  req.session.destroy()
  res.status(200).json({})
}

export default withSession(Api)
