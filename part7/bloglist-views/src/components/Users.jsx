import userService from '../services/users'
import { useQuery } from '@tanstack/react-query'

const Users = ({user, logout}) => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    retry: 1,
  })

  const users = result.data
  console.log('users-> ', users)

  if (!users) {
    return null
  }
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={logout}>logout</button></p>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users