import SongList from './components/SongList'
import { Song } from './types/index'
import { GET } from './api/songs/route'

export default async function Home() {
  let songs: Song[] = []
  let error: string | null = null

  try {
    const request = new Request('http://localhost:3000/api/songs')
    const response = await GET(request)
    if (!response.ok) throw new Error(`Failed to fetch songs: ${response.status}`)
    songs = await response.json()
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error'
    console.error('Fetch error:', err)
  }

  return (
    <div className="min-h-screen bg-indigo-100 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Song Library</h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : songs.length > 0 ? (
          <SongList songs={songs} />
        ) : (
          <p className="text-gray-500">No songs found.</p>
        )}
      </div>
    </div>
  )
}
