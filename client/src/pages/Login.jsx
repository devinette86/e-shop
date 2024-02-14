import { useAuth } from "../context/auth";

export default function Login() {
  const { login } = useAuth();
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
        <input type="email" placeholder="email" name="email" />
        <input type="password" placeholder="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
