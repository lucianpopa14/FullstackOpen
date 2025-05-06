const LoginForm = ({ username, password, handleUsername, handlePassword, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>login</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="username"
          onChange={handleUsername}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="password"
          onChange={handlePassword}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm