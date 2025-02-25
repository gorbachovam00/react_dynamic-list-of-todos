// /* eslint-disable @typescript-eslint/no-shadow */
// /* eslint-disable prettier/prettier */
// /* eslint-disable no-console */
// import React, { useEffect, useState } from 'react';
// import 'bulma/css/bulma.css';
// import '@fortawesome/fontawesome-free/css/all.css';

// import { TodoList } from './components/TodoList';
// import { TodoFilter } from './components/TodoFilter';
// import { TodoModal } from './components/TodoModal';
// import { Loader } from './components/Loader';
// import { getTodos } from './api';
// import { Todo } from './types/Todo';

// export const App: React.FC = () => {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

//   const [filterStatus, setFilterStatus] = useState<string>('all');
//   const [searchText, setSearchText] = useState<string>('');

//   useEffect(() => {
//     setLoading(true);
//     setError(null);
//     getTodos()
//       .then(data => {
//         setTodos(data);
//         setFilteredTodos(data);
//       })
//       .catch((error) => {
//         console.error('Error fetching todos:', error);
//         setError('Error fetching todos');
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     let updatedTodos = [...todos];

//     if (filterStatus === 'completed') {
//       updatedTodos = updatedTodos.filter(todo => todo.completed);
//     } else if (filterStatus === 'active') {
//       updatedTodos = updatedTodos.filter(todo => !todo.completed);
//     }

//     if (searchText.trim()) {
//       updatedTodos = updatedTodos.filter(todo =>
//         todo.title.toLowerCase().includes(searchText.toLowerCase()),
//       );
//     }

//     setFilteredTodos(updatedTodos);
//   }, [filterStatus, searchText, todos]);

//   const handleShowTodo = (todo: Todo) => {
//     setSelectedTodo(todo);
//   };

//   const handleCloseModal = () => {
//     setSelectedTodo(null);
//   };

//   const handleFilterChange = (status: string, text: string) => {
//     setFilterStatus(status);
//     setSearchText(text);
//   };

//   return (
//     <>
//       <div className="section">
//         <div className="container">
//           <div className="box">
//             <h1 className="title">Todos:</h1>

//             <div className="block">
//               <TodoFilter onFilterChange={handleFilterChange} />
//             </div>

//             <div className="block">
//               {loading && <Loader data-cy="loader" />}
//               {error && <p className="has-text-danger">{error}</p>}
//               {!loading && !error && (
//                 <TodoList todos={filteredTodos} onShowTodo={handleShowTodo} />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {selectedTodo && (
//         <TodoModal todo={selectedTodo} onClose={handleCloseModal} />
//       )}
//     </>
//   );
// };

/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selected, setSelected] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      .finally(() => setLoading(false));
  }, []);

  const filterTodos = todos.filter(todo => {
    const filteredTodoStatus =
      selected === 'all' ||
      (selected === 'completed' && todo.completed) ||
      (selected === 'active' && !todo.completed);
    const filteredTodoQuery = todo.title
      .toLowerCase()
      .trim()
      .includes(query.toLowerCase());

    return filteredTodoStatus && filteredTodoQuery;
  });

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleQueryClear = () => {
    setQuery('');
  };

  const handleShowModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selected={selected}
                query={query}
                handleSelect={handleSelect}
                handleQuery={handleQuery}
                handleQueryClear={handleQueryClear}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && filterTodos.length > 0 && (
                <TodoList
                  todos={filterTodos}
                  selectedTodo={selectedTodo}
                  onShowModal={handleShowModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
