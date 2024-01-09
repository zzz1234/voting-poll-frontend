export default function Button({ label, handleClick }) {
    return (
      <button className="button-green" onClick={handleClick}>{label}</button>
    );
  }