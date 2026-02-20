import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  Pie,
  YAxis,
} from "recharts";
import Navbar from "../Component/Navbar";
import "./Analystics.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Analystic = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = tasks.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(tasks.length / postsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit-post/${id}`);
  };
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  const authorStats = tasks.reduce((acc, tasks) => {
    const author = tasks.auther || "Unknown";
    acc[author] = (acc[author] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(authorStats).map((auther) => ({
    name: auther,
    tasks: authorStats[auther],
  }));

  // const chartData = [
  //   { name: "Admin", posts: 5 },
  //   { name: "User", posts: 3 },
  //   { name: "Test", posts: 4 },
  //   { name: "Demo", posts: 2 },
  // ];

  const header = ["ID", "Title", "Auther", "Date", "Actions"];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="analytics-page">
      <Navbar />
      <main className="analytics-main">
        <header className="analytics-header">
          <h1>Blog Analytics</h1>
          <p>Insights into your blog's performance and activity.</p>
        </header>

        <div className="charts-container">
          {/* Bar Chart */}
          <div className="chart-card">
            <h3>Posts per Author</h3>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="tasks" fill="#8884d8" name="Number of Posts" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="chart-card">
            <h3>Distribution</h3>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="tasks"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="posts-table-section">
          <h3>All Posts</h3>
          <div className="table-wrapper">
            <table className="analytics-table">
              <thead>
                <tr>
                  {header.map((header, index) => (
                    <th>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((task) => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td>{task.auther}</td>

                    <td>
                      {new Date(
                        tasks.createdAt || Date.now(),
                      ).toLocaleDateString()}
                    </td>
                    <td className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(task.id)}
                        title="Edit"
                      >
                        ✏️
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(task.id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* static pagination */}
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="page-btn"
            >
              Previous
            </button>

            {[...Array(totalPages).keys()].map((number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`page-btn ${currentPage === number + 1 ? "active" : ""}`}
              >
                {number + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(tasks.length / postsPerPage)}
              className="page-btn "
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
