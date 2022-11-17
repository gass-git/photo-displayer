interface User{
    uid: string,
    favoritePhotos: {
        ids:number[]
    },
    globalSettings: {
        albumsToShow: number
    },
    information: {
        about:string,
        username:string,
        website:string
    }
}

export default User