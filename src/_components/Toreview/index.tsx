import React, { useState, useContext } from "react";
import User from "../../_data/user";

interface Props extends iTask {
  handlers: TodoActions;
}

const Toreview: React.FC<Props> = ({
  title,
  type,
  doer,
  hasProblem,
  handlers,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const user = useContext(User);

  function handleCompleted() {
    handlers.complete(title, type, doer, user);
    handlers.flagDoer(title, type, false);
  }

  function handleFixed() {
    handlers.complete(title, type, doer, user);
    handlers.flagDoer(title, type, true);
  }

  function handleFailed() {
    handlers.fail(title, type, doer, user);
    handlers.flagDoer(title, type, false);
  }

  function toggleDetails(e: React.MouseEvent) {
    setShowDetails(!showDetails);
  }

  function renderTitle() {
    return (
      <h1 className="[ c-toreview__title ]" onClick={toggleDetails}>
        {title}
      </h1>
    );
  }

  function renderReviewOptions() {
    const reviewOptions: JSX.Element[] = [];
    let options = ["reviewed", "fixed", "failed"];

    if (hasProblem)
      options = options.filter((item) => item !== "fixed");

    console.log(options);

    options.forEach((option) => {
      console.log(option);
      let handler;

      switch (option) {
        case "reviewed":
          handler = handleCompleted;
          break;

        case "fixed":
          handler = handleFixed;
          break;

        case "failed":
          handler = handleFailed;
          break;

        default:
          throw new Error();
          break;
      }
      reviewOptions.push(
        <li
          key={option}
          className={
            "c-toreview__option c-toreview__option--" + option
          }
          onClick={handler}
        ></li>
      );
    });

    return <ul className="c-toreview__options">{reviewOptions}</ul>;
  }

  function renderDetails() {
    const reviewDetails: JSX.Element[] = [];

    ["doer"].forEach((option) => {
      let el = "";

      switch (option) {
        case "doer":
          el = doer;
          break;
      }

      reviewDetails.push(
        <li
          key={option}
          className={
            "c-toreview__detail c-toreview__detail--" + option
          }
        >
          {el}
        </li>
      );
    });

    return <ul className="c-toreview__details">{reviewDetails}</ul>;
  }
  function renderDetailsToggle() {
    return (
      <span
        className="[ c-toreview__toggle ]"
        onClick={toggleDetails}
      ></span>
    );
  }
  function renderToreview() {
    if (title) {
      let toreviewClassName = "c-toreview";

      if (showDetails) toreviewClassName += " js-show ";
      if (hasProblem) toreviewClassName += " c-toreview--hasProblem ";

      return (
        <li key={title} className={toreviewClassName}>
          {renderTitle()}
          {renderDetailsToggle()}
          {renderReviewOptions()}
          {renderDetails()}
        </li>
      );
    }
  }

  return <>{renderToreview()}</>;
};

export default Toreview;
