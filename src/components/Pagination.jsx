import { useState, useEffect } from "react";
import "../App.css";
const Pagination = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(2);

  const getData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const result = await response.json();
      setData(result.products);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= data.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };
  return (
    <div>
      <h2>Products Data</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.slice(page * 10 - 10, page * 10).map((items) => {
              return (
                <tr key={items.id}>
                  <td>{items.id}</td>
                  <td>{items.title}</td>
                  <td>{items.description}</td>
                  <td>{items.category}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="pagination">
        <span
          className={page > 1 ? "" : "pagination_disabled"}
          onClick={() => selectPageHandler(page - 1)}
        >
          ◀️
        </span>
        {[...Array(data.length / 10)].map((_, i) => {
          return (
            <span
              className={page === i + 1 ? "selected_pagination" : ""}
              onClick={() => selectPageHandler(i + 1)}
              key={i}
            >
              {i + 1}
            </span>
          );
        })}
        <span
          className={page < data.length / 10 ? "" : "pagination_disabled"}
          onClick={() => selectPageHandler(page + 1)}
        >
          ▶️
        </span>
      </div>
    </div>
  );
};

export default Pagination;
