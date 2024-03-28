import {
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TableHeader({ columns, onSort, sortBy }) {
  function sortByColumn(attribute) {
    let nextSortBy = attribute;
    let nextSortDirection = "ascending";

    if (sortBy && sortBy.replace && sortBy.replace("-", "") === attribute) {
      nextSortDirection = sortBy[0] === "-" ? "ascending" : "descending";
      nextSortBy =
        nextSortDirection === "ascending" ? attribute : `-${attribute}`;
    }

    onSort({ sortBy: nextSortBy, direction: nextSortDirection });
  }

  function getSortIcon(attribute) {
    if (sortBy && sortBy.replace("-", "") === attribute) {
      return sortBy[0] === "-" ? faSortDown : faSortUp;
    }
    return faSort;
  }

  return columns.map((column, index) => (
    <th
      key={index}
      onClick={() => column.isSortable && sortByColumn(column.attribute)}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <span>{column.title}</span>
        {column.isSortable && (
          <FontAwesomeIcon
            icon={getSortIcon(column.attribute)}
            fixedWidth
            style={{ marginLeft: "5px" }}
          />
        )}
      </div>
    </th>
  ));
}
