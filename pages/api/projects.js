import { supabase } from '../../utils/supabaseClient'

export default async function handler(req, res) {
  if (!req.headers.token) {
    res.status(401).json({ error: 'Access denied!' })
  }
  supabase.auth.setAuth(req.headers.token)

  const { body, method } = req

  switch (method) {
    case 'GET':
      const { data, error } = await supabase.from('projects').select('*')
      if (error) {
        res.status(404).json({ error })
      }
      res.status(200).json({ data })
      break
    case 'POST':
      //TODO надо взять конкретные поля: language и другие
      res.setHeader('Location', '/projects/rlob')
      res.status(201).json({ body })
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
