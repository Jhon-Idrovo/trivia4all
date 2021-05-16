import { useState, useEffect } from "react";

function Question({ question, options, handleClick }) {
  const [selection, setSelection] = useState(false);
  const handleSelection = (e) => {
    const selectionIndex = e.target.id.split("").pop();
    setSelection(selectionIndex);
  };

  return (
    <form className="question">
      <p
        className="question-prompt"
        dangerouslySetInnerHTML={{ __html: question }}
      ></p>
      {options.map((option, index) => {
        return (
          <div className="option-container" key={index}>
            <input
              type="radio"
              name="option"
              id={`option-${index}`}
              className="question-option"
              onChange={handleSelection}
            />
            <label
              htmlFor={`option-${index}`}
              className="question-option-label"
              dangerouslySetInnerHTML={{ __html: option }}
            ></label>
          </div>
        );
      })}
      <input
        type="reset"
        onClick={(e) => handleClick(e, selection)}
        className="form-btn question-submit"
        value="Next!"
      ></input>
    </form>
  );
}

export default Question;
