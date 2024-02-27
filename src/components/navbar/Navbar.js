import Button from "../button/Button";

export default function Navbar({onClick}) {
    return (
      <div className="navbar">
        <h1 className="navbar-title">Voting Machine</h1>
        {/* Add two buttons SignUp and SignIn to the right */}
        <Button label="SignUp" handleClick={() => onClick('signup')}/>
        <Button label="SignIn" handleClick={() => onClick('signin')}/>
      </div>
    );
  }