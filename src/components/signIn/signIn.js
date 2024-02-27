import { login } from "../../services/userService";

export default function SignIn() {
    const SignIn = (event) => {
        event.preventDefault();
        login(document.getElementById('email').value, document.getElementById('password').value)
        .then(data => {
            console.log(data);
            alert("Login successful");
        })
    }

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={SignIn}>
                <label htmlFor="username">Email</label>
                <input type="text" id="email" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}