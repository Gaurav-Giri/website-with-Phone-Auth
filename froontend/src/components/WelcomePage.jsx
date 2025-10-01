export const WelcomePage = ({ user }) => {
  return (
    <div className="welcome-page">
      <h1>Welcome, {user.name}!</h1>
      <div className="user-info">
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  )
}