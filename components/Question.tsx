import { ChangeEventHandler, MouseEvent, useEffect, useState } from 'react';

function Question({
  question,
  options,
  handleClick,
}: {
  question: string;
  options: string[];
  handleClick: (e: MouseEvent<HTMLInputElement>, selection: number) => void;
}) {
  const [selection, setSelection] = useState<undefined | number>();
  const handleSelection: ChangeEventHandler<HTMLInputElement> = (e) => {
    const selectionIndex = e.target.id.split("").pop() as string;
    setSelection(parseInt(selectionIndex));
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
        onClick={(e) => handleClick(e, selection as number)}
        className="form-btn question-submit"
        disabled={selection === undefined}
        value="Next!"
      ></input>
    </form>
  );
}

export default Question;
