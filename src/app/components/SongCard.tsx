import Image from 'next/image'
import { Song } from '../types/index'

export default function SongCard({ song }: { song: Song }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
      <Image
        src={song.songImage}
        alt={`${song.songTitle} cover`}
        width={160}
        height={160}
        className="rounded-md mx-auto mb-4"
      />
      <h2 className="text-xl font-semibold text-gray-800">{song.songTitle}</h2>
      <p className="text-gray-600">{song.artistName}</p>
      <p className="text-gray-500 text-sm">{song.albumName || 'Single'}</p>
      <p className="text-gray-500 text-sm">{song.releaseDate}</p>
      <audio controls className="w-full mt-2">
        <source src={song.songUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}
