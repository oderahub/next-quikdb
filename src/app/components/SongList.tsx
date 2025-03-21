'use client'

import { useState } from 'react'
import SongCard from './SongCard'
import { Song } from '../types/index'

const ITEMS_PER_PAGE = 6

export default function SongList({ songs }: { songs: Song[] }) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(songs.length / ITEMS_PER_PAGE)
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedSongs = songs.slice(startIdx, startIdx + ITEMS_PER_PAGE)

  return (
    <div>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedSongs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </ul>
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="self-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  )
}
