import React, {useState} from "react";

function TodoForm(props) {
  const [input, setInput] = useState("");

/*   const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }) */

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });
    setInput("");
  };
  return (
    <>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          className="todo-input"
          type="text"
          placeholder="Добавить Todo"
          value={input}
          name="text"
          onChange={handleChange}
          /* ref={inputRef} */
        />
        <button className="todo-button">Добавить</button>
      </form>
    </>
  );
}

export default TodoForm;
