export default function Choice({ name, id, onChange}) {
    return (
        <div>
            <label className="input-name" for="choice">Choice:</label>
            <input className="input-val" type="text" id={id} name={name} onChange={onChange} />
            <br />
        </div>
    );
  }