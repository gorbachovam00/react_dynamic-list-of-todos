// import React, { useState } from 'react';

// interface TodoFilterProps {
//   onFilterChange: (status: string, searchText: string) => void;
// }

// export const TodoFilter: React.FC<TodoFilterProps> = ({ onFilterChange }) => {
//   const [status, setStatus] = useState<string>('all');
//   const [searchText, setSearchText] = useState<string>('');

//   const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const newStatus = event.target.value;

//     setStatus(newStatus);
//     onFilterChange(newStatus, searchText);
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSearchText = event.target.value;

//     setSearchText(newSearchText);
//     onFilterChange(status, newSearchText);
//   };

//   return (
//     <form className="field has-addons">
//       <p className="control">
//         <span className="select">
//           <select
//             data-cy="statusSelect"
//             value={status}
//             onChange={handleStatusChange}
//           >
//             <option value="all">All</option>
//             <option value="active">Active</option>
//             <option value="completed">Completed</option>
//           </select>
//         </span>
//       </p>

//       <p className="control is-expanded has-icons-left has-icons-right">
//         <input
//           data-cy="searchInput"
//           type="text"
//           className="input"
//           placeholder="Search..."
//           value={searchText}
//           onChange={handleSearchChange}
//         />
//         <span className="icon is-left">
//           <i className="fas fa-magnifying-glass" />
//         </span>
//         {searchText && (
//           <span
//             className="icon is-right"
//             style={{ pointerEvents: 'all' }}
//             // onClick={() => setSearchText('')}
//           >
//             <button
//               data-cy="clearSearchButton"
//               type="button"
//               className="delete"
//               onClick={() => setSearchText('')}
//               // onClick={() => {
//               //   setSearchText('');
//               //   onFilterChange(status, '');
//               // }}
//             />
//           </span>
//         )}
//       </p>
//     </form>
//   );
// };

import React from 'react';

interface TodoFilterProps {
  selected: string;
  query: string;
  handleSelect: React.ChangeEventHandler<HTMLSelectElement>;
  handleQuery: React.ChangeEventHandler<HTMLInputElement>;
  handleQueryClear: () => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  selected,
  query,
  handleSelect,
  handleQuery,
  handleQueryClear,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelect}
            value={selected}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={handleQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleQueryClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
