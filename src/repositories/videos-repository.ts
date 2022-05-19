export interface Ivideo {
    id: number,
    title: string,
    author: string
}


export let videos: Ivideo[] = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

export const videosRepository = {
    getVideos() {
        return videos
    },
    getVideoById(id: number) {
        return videos.find(v => v.id === id)
    },
    deleteVideoById(id: number) {
        const filteredVideos = videos.filter(v => v.id !== id)
        if(filteredVideos.length < videos.length){
            videos = filteredVideos
            return true
        } else {
            return false
        }
    },
    updateVideoById(id: number, title: string) {
        const video = videos.find(v => v.id === id)

        if(video) {
            return {
                ...video,
                title: title
            }
        } else {
            return null
        }
    },
    createVideo(title: string) {
        if(title) {
            const newVideo: Ivideo = {
                id: +new Date(),
                title: title,
                author: 'author bla'
            }
            videos.push(newVideo)
            return true
        } else {
            return false
        }
    }
}
