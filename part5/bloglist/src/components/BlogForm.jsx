const BlogForm = (props) => {
  return (
    <form onSubmit={props.addBlog}>
      <div>
        title: <input value={props.title}
          onChange={props.handleTitleChange} />
      </div>
      <div>author: <input value={props.author}
        onChange={props.handleAuthorChange} /></div>
      <div>
        <div>url: <input value={props.url}
          onChange={props.handleUrlChange} /></div>
        <div></div>
        <button type="submit" >create</button>
      </div>
    </form>
  )
}

export default BlogForm