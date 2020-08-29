import React, { useState } from "react";

interface Props extends iTask {}

const Toreview: React.FC<Props> = ({ title, type, completedBy }) => {
  const [showDetails, setShowDetails] = useState(false);

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

    ["accepted", "fixed", "failed"].forEach((option) => {
      reviewOptions.push(
        <li
          key={option}
          className={
            "c-toreview__option c-toreview__option--" + option
          }
        ></li>
      );
    });

    return <ul className="c-toreview__options">{reviewOptions}</ul>;
  }

  function renderDetails() {
    const reviewDetails: JSX.Element[] = [];

    ["completedBy", "addComment"].forEach((option) => {
      let el = "";

      switch (option) {
        case "completedBy":
          el = completedBy
            ? completedBy
            : "Incredibly long name that’s unrealistic";
          break;

        default:
          el = "Add comment";
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

  function renderToreview() {
    if (title) {
      let toreviewClassName = "c-toreview";

      toreviewClassName += showDetails ? " js-show " : "";

      return (
        <li key={title} className={toreviewClassName}>
          {renderTitle()}
          {renderReviewOptions()}
          {renderDetails()}
        </li>
      );
    }
  }

  return <>{renderToreview()}</>;
};

export default Toreview;
