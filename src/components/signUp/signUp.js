import { createUserByEmailAndPassword } from "../../services/userService";


export default function SignUp() {

    const SignUp = (event) => {
        event.preventDefault();
        createUserByEmailAndPassword(document.getElementById('email').value, document.getElementById('password').value)
        .then(data => {
            console.log(data);
            alert("User created successfully");
        })
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={SignUp}>
                <label htmlFor="username">Email</label>
                <input type="text" id="email" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}