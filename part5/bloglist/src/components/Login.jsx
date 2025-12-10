const Login = (props) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={props.handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={props.username}
              onChange={props.handleUserChange}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={props.password}
              onChange={props.handlePassChange}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login