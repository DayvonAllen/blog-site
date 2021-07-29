import cookie from 'cookie'

export default async (req, res) => {
  if (req.method === 'GET') {
    if (!req.headers.cookie) {
      res.status(401).json({ message: 'Not Authorized' })
      return
    }

    const { token } = cookie.parse(req.headers.cookie)

    const backendRes = await fetch(`http://admin-srv/control/checkin/status`, {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
      },
    })

    await backendRes.json()

    if (backendRes.ok) {
      res.status(200).json({ user: "ok" })
    } else {
      res.status(403).json({ message: 'User forbidden' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}