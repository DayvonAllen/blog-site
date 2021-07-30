import cookie from 'cookie'

export default async (req, res) => {
    if (req.method === 'POST') {
      const { title, content } = req.body
  
      const { token } = cookie.parse(req.headers.cookie)

      const backendRes = await fetch(`http://admin-srv/control/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          mainImage: "....",
          storyImages: [],
          tag: "cooking"
        }),
      })

      await backendRes.json()
    
      if (backendRes.status === 201) {
        res.status(201).json({status: "ok"})
      } else if(backendRes.status === 401) {
        res
          .status(401)
          .json({ message: "Unauthenticated" })
      }
      else if(backendRes.status === 400) {
        res
        .status(400)
        .json({ message: "Couldn't Parse Your Request" })
      }
      else {
        res
        .status(500)
        .json({ message: "Server Error" })
      }
    } else {
      res.setHeader('Allow', ['POST'])
      res.status(405).json({ message: `Method ${req?.method} not allowed` })
    }
  }