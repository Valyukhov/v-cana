import supabaseApi from 'utils/supabaseServer'

export default async function allNotesHandler(req, res) {
  let supabase
  try {
    supabase = await supabaseApi({ req, res })
  } catch (error) {
    return res.status(401).json({ error })
  }
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const { data, error } = await supabase.from('team_notes').select('*')
        if (error) {
          throw error
        }
        return res.status(200).json(data)
      } catch (error) {
        return res.status(404).json({ error })
      }

    default:
      res.setHeader('Allow', ['GET'])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}
