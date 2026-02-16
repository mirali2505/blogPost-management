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
} from "recharts";
import Navbar from "../Component/Navbar";
import "./Analystics.css"

export const Analystic = () => {
  const chartData = [
    { name: "Admin", posts: 5 },
    { name: "User", posts: 3 },
    { name: "Test", posts: 4 },
    { name: "Demo", posts: 2 },
  ];

  const header = [
    'ID','Aythor','Date','Title'
  ];


  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
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
                  <XAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="posts" fill="#8884d8" name="Number of Posts" />
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
                    outerRedius={80}
                    fill="#8884d8"
                    dataKey="posts"
                    lable
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
                    {header.map((header,index)=>(<th>{header}</th>))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <th>React Basics</th>
                  <th>Admin</th>
                  <th>16/02/2026</th>
                </tr>

                <tr>
                  <th>2</th>
                  <th>Unederstanding Hooks</th>
                  <th>user</th>
                  <th>15/02/2026</th>
                </tr>

                <tr>
                  <th>3</th>
                  <th>JavaScript ES6</th>
                  <th>Test</th>
                  <th>14/02/2026</th>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button className="page-btn">Previous</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">Next</button>
          </div>
        </div>
      </main>
    </div>
  );
};
