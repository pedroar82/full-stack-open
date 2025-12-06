const dummy = () => {
  return 1
}

const totalLikes  = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, item) => {
      return sum + item.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((mostLikes, item) =>
  {return mostLikes.likes >= item.likes ? mostLikes : item})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}