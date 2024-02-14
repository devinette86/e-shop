import { useAuth } from "../context/auth";

export default function Register() {
  const { register } = useAuth();

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={register}>
        <input type="text" placeholder="name" name="name" />
        <input type="email" placeholder="email" name="email" />
        <input type="password" placeholder="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
