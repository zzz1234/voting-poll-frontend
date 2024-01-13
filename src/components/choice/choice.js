import './choice.css';

export default function Choice({ name, id, onChange, onRemove}) {
    return (
        <div>
            <label className="input-name" htmlFor="choice">Choice:</label>
            <input className="input-val" type="text" id={id} name={name} onChange={onChange} />
            <button className="cross" onClick={(e) => onRemove(e, id)}> X</button>
            <br />
        </div>
    );
  }