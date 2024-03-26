export default function Select({ options, onChange }) {
  return (
    <select className="form-select" required onChange={onChange}>
      <option value="">Selecione uma opção</option>
      {Object.entries(options).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
