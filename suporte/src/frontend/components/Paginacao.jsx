export default function Paginacao({
  chamadosPorPagina,
  totalChamados,
  paginate,
  currentPage,
}) {
  const maxPagesToShow = 5;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalChamados / chamadosPorPagina); i++) {
    pageNumbers.push(i);
  }

  let startIndex = Math.max(currentPage - 2, 0);
  const endIndex = Math.min(startIndex + maxPagesToShow, pageNumbers.length);
  if (endIndex - startIndex < maxPagesToShow && startIndex > 0) {
    startIndex = endIndex - maxPagesToShow;
  }
  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            className="page-link"
          >
            &laquo;
          </button>
        </li>
        {pageNumbers.slice(startIndex, endIndex).map((number) => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            onClick={() =>
              currentPage < pageNumbers.length && paginate(currentPage + 1)
            }
            className="page-link"
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
}