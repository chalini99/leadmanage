import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#3b82f6", "#f59e0b", "#10b981"];

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const navigate = useNavigate();

  const fetchLeads = async () => {
    const { data } = await API.get("/leads");
    setLeads(data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const total = leads.length;
  const newLeads = leads.filter(l => l.status === "New").length;
  const contacted = leads.filter(l => l.status === "Contacted").length;
  const closed = leads.filter(l => l.status === "Closed").length;

  const chartData = [
    { name: "New", value: newLeads },
    { name: "Contacted", value: contacted },
    { name: "Closed", value: closed },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-72 bg-gradient-to-b from-black to-gray-900 text-white p-6 relative">
        <h2 className="text-3xl font-bold mb-12">⚡ LeadFlow</h2>

        <ul className="space-y-6 text-lg">
          <li
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 p-4 rounded-xl cursor-pointer"
          >
            Dashboard
          </li>

          <li
            onClick={() => navigate("/leads")}
            className="hover:bg-gray-700 p-4 rounded-xl cursor-pointer"
          >
            Leads
          </li>
        </ul>

        <div
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          className="absolute bottom-8 left-6 text-base text-gray-400 cursor-pointer hover:text-white"
        >
          Logout
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* TOP */}
        <div className="flex justify-between items-center bg-white px-10 py-6 shadow">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <div className="text-base text-gray-600">Welcome</div>
        </div>

        {/* CONTENT */}
        <div className="p-10 space-y-10">

          {/* STATS */}
          <div className="grid grid-cols-4 gap-8">

            <Card title="Total Leads" value={total} />

            <Card title="New Leads" value={newLeads} color="text-blue-600" />

            <Card title="Contacted" value={contacted} color="text-yellow-500" />

            <Card title="Closed" value={closed} color="text-green-600" />

          </div>

          {/* CHART + RECENT */}
          <div className="grid grid-cols-2 gap-8">

            {/* CHART */}
            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <h2 className="mb-6 font-semibold text-xl">
                Lead Distribution
              </h2>

              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie data={chartData} dataKey="value" outerRadius={120}>
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* RECENT */}
            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <h2 className="mb-6 font-semibold text-xl">
                Recent Leads
              </h2>

              <div className="space-y-5">
                {leads.slice(0, 5).map((lead) => (
                  <div
                    key={lead._id}
                    className="flex justify-between items-center border-b pb-4"
                  >
                    <div>
                      <p className="font-semibold text-lg">
                        {lead.name || "No Name"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {lead.email}
                      </p>
                    </div>

                    <span
                      className={`px-4 py-1 rounded-full text-sm ${
                        lead.status === "New"
                          ? "bg-blue-100 text-blue-600"
                          : lead.status === "Contacted"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value, color }) => (
  <div className="bg-white p-8 rounded-3xl shadow-lg">
    <p className="text-gray-500 text-lg">{title}</p>
    <h2 className={`text-4xl font-bold mt-3 ${color}`}>
      {value}
    </h2>
  </div>
);

export default Dashboard;