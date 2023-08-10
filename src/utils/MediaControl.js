
export const overPlay = (url) => {
  const videoList = document.querySelectorAll('video')
  const audioList = document.querySelectorAll('audio')
  const mediaList = [...audioList, ...videoList]
  mediaList.forEach(item => {
    if (item.src !== url) {
      item.pause()
    }
  })
}
