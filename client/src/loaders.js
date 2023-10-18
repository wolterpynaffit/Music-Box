export async function getPlayListLoader(){
    const res = await fetch('http://localhost:3000/paylists')
    const allPlayLists = await res.json()
    return { allPlayLists }
}

