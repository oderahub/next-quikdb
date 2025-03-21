import { NextResponse } from 'next/server'
import { Song } from '../../types/index'

// In-memory rate limiting (demo purposes)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>()
const RATE_LIMIT = 10 // 10 requests per minute
const WINDOW_MS = 60 * 1000 // 1 minute

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'

  // Rate limiting
  const now = Date.now()
  const userLimit = rateLimitMap.get(ip) || { count: 0, lastReset: now }

  if (now - userLimit.lastReset > WINDOW_MS) {
    userLimit.count = 0
    userLimit.lastReset = now
  }

  if (userLimit.count >= RATE_LIMIT) {
    return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 })
  }

  userLimit.count++
  rateLimitMap.set(ip, userLimit)

  // 20 songs (trimmed from 31)
  const songs: Song[] = [
    {
      id: 1,
      songImage: 'https://upload.wikimedia.org/wikipedia/en/8/84/NF_-_Hope.png?20230411161701',
      artistName: 'NF',
      songTitle: 'Happy',
      songUrl:
        'https://res.cloudinary.com/dakiyibak/video/upload/v1693489807/05-NF-HAPPY-_HiphopKit.com_yx438c.mp3',
      albumName: 'Hope',
      releaseDate: 'April 7, 2023'
    },
    {
      id: 2,
      songImage:
        'https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/MinefieldsCoverArt.png/220px-MinefieldsCoverArt.png',
      artistName: 'Faouzia ft John Legend',
      songTitle: 'Minefield',
      songUrl:
        'https://res.cloudinary.com/dakiyibak/video/upload/v1693552621/Faouzia_ft_John_Legend_-_Minefield_eelqo7.mp3',
      albumName: '',
      releaseDate: 'November 5, 2020'
    },
    {
      id: 3,
      songImage:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPEA1cHROraREDoZB8gD2BQtE6AHEnvSDlLsj1MCh4zyM-9v5_pgATEI5qLg&s',
      artistName: 'Ed Sheeran',
      songTitle: 'A Beautiful Game',
      songUrl:
        'https://res.cloudinary.com/dakiyibak/video/upload/v1693553879/Ed_Sheeran_-_A_Beautiful_Game_NetNaija.com_za2jkf.mp3',
      albumName: '',
      releaseDate: 'May 31, 2023'
    },
    {
      id: 4,
      songImage:
        'https://www.jamsbase.com/wp-content/uploads/2021/02/Jahmiel-%E2%80%93-U-Me-Luv.jpg',
      artistName: 'Jahmiel',
      songTitle: 'U Me Luv',
      songUrl:
        'https://res.cloudinary.com/dakiyibak/video/upload/v1693554564/Jahmiel-U-Me-Luv-_TrendyBeatz.com_zo1ii8.mp3',
      albumName: '',
      releaseDate: '2017'
    },
    {
      id: 5,
      songImage:
        'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/WhatchaSay.jpg/220px-WhatchaSay.jpg',
      artistName: 'Jason Derulo',
      songTitle: 'Whatcha Say',
      songUrl:
        'https://res.cloudinary.com/dakiyibak/video/upload/v1693555052/Jason-Derulo-Whatcha-Say-_BazeMack.com_mbcger.mp3',
      albumName: 'Jason Derulo',
      releaseDate: 'August 4, 2009'
    },
    {
      id: 6,
      songImage:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIFKlnz5W8M8KrPkPVM4MbvLg8Bgvi9xHtXi57bMNMBa5Y4vda58UCpe4dSA&s',
      artistName: 'Post Malone',
      songTitle: 'Something Real',
      songUrl:
        'https://res.cloudinary.com/dakiyibak/video/upload/v1693606162/02-Post-Malone-Something-Real-_HiphopMood.com_bcavut.mp3',
      albumName: 'AUSTIN',
      releaseDate: 'July 28, 2023'
    },
    {
      id: 7,
      songImage: 'https://static.stereogum.com/uploads/2023/05/image001-2-1684451486.jpg',
      artistName: 'Post Malone',
      songTitle: 'Mourning',
      songUrl:
        'https://res.cloudinary.com/dakiyibak/video/upload/v1693607330/05-Post-Malone-Mourning-_HiphopMood.com_a2exbi.mp3',
      albumName: 'AUSTIN',
      releaseDate: 'May 19, 2023'
    },
    {
      id: 8,
      songImage:
        'https://i0.wp.com/www.val9ja.com/wp-content/uploads/2023/08/Nektunez-Anti-Social-ft-Jeremih-Young-Jonn.webp?fit=544%2C544&ssl=1',
      artistName: 'Nektunez, Jeremih, Young John',
      songTitle: 'Anti Social',
      songUrl:
        'https://res.cloudinary.com/dakiyibak/video/upload/v1693608355/Nektunez_Ft_Jeremih_Young_Jonn_-_Anti_Social_a4hwul.mp3',
      albumName: 'Anti Social',
      releaseDate: 'August 11, 2023'
    },
    {
      id: 9,
      songImage: 'https://f4.bcbits.com/img/a4011548505_10.jpg',
      artistName: 'Post Malone',
      songTitle: 'Otherside',
      songUrl:
        'https://res.cloudinary.com/dakiyibak/video/upload/v1693689941/Post-Malone-Otherside_gc3uzq.mp3',
      albumName: 'Beerbongs & Bentleys',
      releaseDate: 'April 27, 2018'
    },
    {
      id: 10,
      songImage:
        'https://upload.wikimedia.org/wikipedia/en/thumb/f/f0/Sean-paul-hold-my-hand.jpg/220px-Sean-paul-hold-my-hand.jpg',
      artistName: 'Sean Paul ft Keri Hilson',
      songTitle: 'Hold My Hand',
      songUrl:
        'https://res.cloudinary.com/dakiyibak/video/upload/v1693690338/Sean-Paul-Ft-Keri-Hilson-Hold-My-Hand-_TunezJam.com_ycywin.mp3',
      albumName: 'Imperial Blaze',
      releaseDate: 'September 29, 2009'
    },
    {
      id: 11,
      songImage:
        'https://upload.wikimedia.org/wikipedia/en/0/0c/The_Kid_Laroi_and_Justin_Bieber_-_Stay.png?20210709041859',
      artistName: 'The Kid Laroi and Justin Bieber',
      songTitle: 'Stay',
      songUrl:
        'https://res.cloudinary.com/dakiyibak/video/upload/v1693690825/The_Kid_LAROI_Justin_Bieber_-_Stay_a2qtiu.mp3',
      albumName: 'F*ck Love 3: Over You',
      releaseDate: 'July 9, 2021'
    },
    {
      id: 12,
      songImage: 'https://trendybeatz.com/images/Luis-Fonsi-Ft-Daddy-Yankee-Despacito-Art.jpg',
      artistName: 'Luis Fonsi & Daddy Yankee',
      songTitle: 'Despacito',
      songUrl:
        'https://res.cloudinary.com/dakiyibak/video/upload/v1693728397/Luis_Fonsi_ft._Daddy_Yankee_Despacito_pasito_-_suavecito_oljh8k.mp3',
      albumName: 'Vida',
      releaseDate: 'January 13, 2017'
    },
    {
      id: 13,
      songImage:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkjo9PNz99CoNBxlFS9xb6wFkckj7CXoHaMEp8YASNNNdKpJFBjzgcn2H9uA&s',
      artistName: 'KIT',
      songTitle: 'No Mercy',
      songUrl:
        'https://res.cloudinary.com/dakiyibak/video/upload/v1693691248/KIT_-_NO_MERCY_fswh2r.mp3',
      albumName: 'No Mercy',
      releaseDate: 'September 12, 2016'
    },
    {
      id: 14,
      songImage:
        'https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Origins_cover.png/220px-Origins_cover.png',
      artistName: 'Imagine Dragons',
      songTitle: 'Boomerang',
      songUrl:
        'https://res.cloudinary.com/dakiyibak/video/upload/v1693729578/Imagine-Dragons-Boomerang_ddaenh.mp3',
      albumName: 'Origins',
      releaseDate: 'November 9, 2018'
    },
    {
      id: 15,
      songImage:
        'https://th.bing.com/th/id/OIP.ij9RmeMgrJwipqn0LPh84gHaEK?w=324&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      artistName: 'James Arthur',
      songTitle: 'From The Grave',
      songUrl:
        'https://res.cloudinary.com/dakiyibak/video/upload/v1693730488/James-Arthur-From-the-Grave-Music-Series-Game-of-Thrones-_yt7jbg.mp3',
      albumName: 'From The Throne',
      releaseDate: 'April 26, 2019'
    },
    {
      id: 16,
      songImage:
        'https://th.bing.com/th/id/OIP.RHQ2dWSr69tr_QfY6vtAtwHaHa?w=156&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      artistName: 'Maroon 5',
      songTitle: 'One More Night',
      songUrl:
        'https://res.cloudinary.com/dakiyibak/video/upload/v1693730874/Maroon_5_-_One_More_Night_tg2ban.mp3',
      albumName: 'Overexposed',
      releaseDate: 'June 19, 2012'
    },
    {
      id: 17,
      songImage:
        'https://1.bp.blogspot.com/-5mdVxXUpXyg/WZRKBuP0KMI/AAAAAAAAlAk/sovQNUoK8f8hEpSuA02xDY0YGB7T8gQ-QCLcBGAs/s1600/Marshmello-Silence.jpg',
      artistName: 'Marshmello ft Khalid',
      songTitle: 'Silence',
      songUrl:
        'https://res.cloudinary.com/dakiyibak/video/upload/v1693743901/Marshmello-ft-Khalid-Silence_tmuhxx.mp3',
      albumName: '',
      releaseDate: 'August 11, 2017'
    },
    {
      id: 18,
      songImage: 'https://upload.wikimedia.org/wikipedia/en/8/88/Halsey_-_Graveyard.png',
      artistName: 'Halsey',
      songTitle: 'Graveyard',
      songUrl:
        'https://res.cloudinary.com/dakiyibak/video/upload/v1693744122/Halsey_-_Graveyard_dzwgqg.mp3',
      albumName: 'Maniac',
      releaseDate: 'September 13, 2019'
    },
    {
      id: 19,
      songImage: 'https://upload.wikimedia.org/wikipedia/en/6/66/Imagine_Dragons_Bad_Liar.jpg',
      artistName: 'Imagine Dragons',
      songTitle: 'Bad Liar',
      songUrl:
        'https://res.cloudinary.com/dakiyibak/video/upload/v1693744298/Imagine-Dragons-Bad-Liar_i8n1ge.mp3',
      albumName: 'Origins',
      releaseDate: 'November 6, 2018'
    },
    {
      id: 20,
      songImage:
        'https://th.bing.com/th/id/OIP.whuEU1LBuG-HRhUGcQ36kwHaEP?w=270&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      artistName: 'Loren Allred',
      songTitle: 'Never Enough',
      songUrl:
        'https://res.cloudinary.com/dakiyibak/video/upload/v1693745048/Loren_Allred-Never_Enough-hitvk.com_vat1am.mp3',
      albumName: 'The Greatest Showman: Original Motion Picture Soundtrack',
      releaseDate: '2017'
    }
  ]

  return NextResponse.json(songs, {
    headers: {
      'Cache-Control': 'max-age=0, s-maxage=10, stale-while-revalidate'
    }
  })
}
