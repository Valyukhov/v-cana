import { supabase } from 'utils/supabaseClient'

export default async function languageProjectTranslatorHandler(req, res) {
  if (!req.headers.token) {
    res.status(401).json({ error: 'Access denied!' })
  }
  supabase.auth.setAuth(req.headers.token)
  const {
    query: { code, id },
    method,
  } = req

  switch (method) {
    case 'DELETE':
      const { data: project, error } = await supabase
        .from('projects')
        .select('id, code')
        .eq('code', code)
        .limit(1)
        .maybeSingle()
      if (error) throw error
      if (!project?.id) {
        return
      }
      try {
        const { data, error } = await supabase
          .from('project_translators')
          .delete()
          .match({ project_id: project.id, user_id: id })

        if (error) throw error
        res.status(200).json(data)
      } catch (error) {
        res.status(404).json({ error })
        return
      }
      break
    default:
      res.setHeader('Allow', ['DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
