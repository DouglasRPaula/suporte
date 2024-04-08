export default function Select({ value, options, onChange }) {
  return (
    <select className="form-select" value={value} required onChange={onChange}>
      <option value="">Selecione uma opção</option>
      {Object.entries(options).map(([optionValue, label]) => (
        <option key={optionValue} value={optionValue}>
          {label}
        </option>
      ))}
    </select>
  );
}