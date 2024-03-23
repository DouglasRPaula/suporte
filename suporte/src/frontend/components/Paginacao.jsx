import { useState } from "react";

export default function useControls({ totalOfPages, controlsOffset = 5 }) {
  const [currentPage, setCurrentPage] = useState(1);

  function next() {
    const isLastPage = currentPage >= totalOfPages;

    isLastPage
      ? setCurrentPage(() => totalOfPages)
      : setCurrentPage(() => currentPage + 1);
  }

  function prev() {
    currentPage <= 1
      ? setCurrentPage(() => 1)
      : setCurrentPage((prevState) => prevState - 1);
  }

  function goTo(targetPage) {
    targetPage > totalOfPages
      ? setCurrentPage(() => totalOfPages)
      : setCurrentPage(() => (targetPage < 1 ? 1 : targetPage));
  }

  function calculateMaxVisible() {
    let maxLeft = currentPage - Math.floor(controlsOffset / 2);
    let maxRight = currentPage + Math.floor(controlsOffset / 2);

    if (maxLeft < 1) {
      maxLeft = 1;
      maxRight = controlsOffset;
    }
    if (maxRight > totalOfPages) {
      maxLeft = totalOfPages - (controlsOffset - 1);
      maxRight = totalOfPages;

      if (maxLeft < 1) {
        maxLeft = 1;
      }
    }

    return { maxLeft, maxRight };
  }

  function renderControlIndexes() {
    const { maxLeft, maxRight } = calculateMaxVisible();

    let indexes = [];

    for (let page = maxLeft; page <= maxRight; page++) {
      indexes.push(page);
    }

    return indexes.map((index) => (
      <button key={index} onClick={() => goTo(index)}>
        {index}
      </button>
    ));
  }

  function renderControls() {
    return (
      <section>
        <button onClick={() => goTo(0)}>«</button>
        <button onClick={prev}>{"<"}</button>
        {renderControlIndexes()}
        <button onClick={next}>{">"}</button>
        <button onClick={() => goTo(totalOfPages)}>»</button>
      </section>
    );
  }

  return {
    currentPage,
    renderControls,
  };
}
