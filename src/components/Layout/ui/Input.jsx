const Input = ({ name, type, required, placeholder }) => {
  return (
    <input 
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
      className="*:border border-black rounded p-1 w-full"
    />
  );
};

export default Input;