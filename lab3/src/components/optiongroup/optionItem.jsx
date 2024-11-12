export default function OptionItem(props) {
  const { optionKey, value, checked, onChange } = props;

  return (
    <>
      <input
        type="checkbox"
        id={optionKey}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={optionKey}>{value}</label>
    </>
  );
}
