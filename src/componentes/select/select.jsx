import { useFetch } from "../../hooks/useFetch";


const SelectList = ({ title, url, handleChange }) => {
  const { data} = useFetch(url);
  //console.log(data, error, loading);

  if (!data) return null;
console.log(data)
  let id = `select-${title}`;
  let options = data.response[title];
  //console.log(options);
  console.log(options)

  return (
    <>
      <select name={id} id={id} onChange={handleChange}>
        <option value="">Elige un {title}</option>
        {data &&
          options.map((el) => (
            <option key={el.nombre} value={el.nombre}>
              {el.nombre}
            </option>
          ))}
      </select>
    </>
  );
};

export default SelectList;