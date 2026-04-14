import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "New",
  });

  const navigate = useNavigate();

  const fetchLeads = async () => {
    const { data } = await API.get("/leads");
    setLeads(data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // EXPORT CSV
  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Status"];
    const rows = leads.map((l) => [
      l.name || "",
      l.email || "",
      l.phone || "",
      l.status || "",
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editId) {
      await API.put(`/leads/${editId}`, form);
    } else {
      await API.post("/leads", form);
    }

    setShowModal(false);
    setEditId(null);
    setForm({ name: "", email: "", phone: "", status: "New" });
    fetchLeads();
  };

  const handleDelete = async (id) => {
    await API.delete(`/leads/${id}`);
    fetchLeads();
  };

  const handleEdit = (lead) => {
    setForm(lead);
    setEditId(lead._id);
    setShowModal(true);
  };

  const filtered = leads.filter((l) =>
    l.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-72 bg-gradient-to-b from-black to-gray-900 text-white p-6">
        <h2 className="text-3xl font-bold mb-12">⚡ LeadFlow</h2>

        <ul className="space-y-6 text-lg">
          <li
            onClick={() => navigate("/dashboard")}
            className="hover:bg-gray-700 p-4 rounded-xl cursor-pointer"
          >
            Dashboard
          </li>

          <li className="bg-blue-600 p-4 rounded-xl cursor-pointer">
            Leads
          </li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1">

        {/* TOP */}
        <div className="flex justify-between items-center bg-white px-10 py-6 shadow">
          <h1 className="text-3xl font-semibold">Leads</h1>
        </div>

        <div className="p-10 space-y-8">

          {/* SEARCH + BUTTONS */}
          <div className="flex justify-between items-center">

            <input
              placeholder="Search leads..."
              className="border px-5 py-4 rounded-xl w-1/3 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex gap-5">

              <button
                onClick={exportToCSV}
                className="border px-6 py-3 rounded-xl text-base hover:bg-gray-100"
              >
                ⬇ Export
              </button>

              <button
                onClick={() => {
                  setShowModal(true);
                  setEditId(null);
                  setForm({ name: "", email: "", phone: "", status: "New" });
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 text-base"
              >
                + Add Lead
              </button>

            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-3xl shadow-lg p-8">

            <table className="w-full">

              <thead>
                <tr className="text-gray-500 text-base border-b">
                  <th className="py-5 text-left">Name</th>
                  <th className="py-5 text-left">Email</th>
                  <th className="py-5 text-left">Phone</th>
                  <th className="py-5 text-left">Status</th>
                  <th className="py-5 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>

                {filtered.map((lead) => (
                  <tr key={lead._id} className="border-b hover:bg-gray-50 transition">

                    <td className="py-6 text-lg font-semibold">
                      {lead.name || "-"}
                    </td>

                    <td className="py-6 text-gray-600 text-base">
                      {lead.email}
                    </td>

                    <td className="py-6 text-gray-600 text-base">
                      {lead.phone || "-"}
                    </td>

                    <td className="py-6">
                      <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                        lead.status === "New"
                          ? "bg-blue-100 text-blue-600"
                          : lead.status === "Contacted"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      }`}>
                        {lead.status}
                      </span>
                    </td>

                    <td className="py-6">
                      <div className="flex gap-5 text-xl">
                        <button onClick={() => handleEdit(lead)}>✏️</button>
                        <button onClick={() => handleDelete(lead._id)} className="text-red-500">🗑️</button>
                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-8 rounded-2xl w-[420px] shadow-lg animate-scale"
          >
            <h2 className="text-xl font-semibold mb-5">
              {editId ? "Edit Lead" : "Add Lead"}
            </h2>

            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full border p-3 mb-3 rounded-lg" />
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border p-3 mb-3 rounded-lg" />
            <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full border p-3 mb-3 rounded-lg" />

            <select name="status" value={form.status} onChange={handleChange} className="w-full border p-3 mb-5 rounded-lg">
              <option>New</option>
              <option>Contacted</option>
              <option>Closed</option>
            </select>

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded-lg">
                Cancel
              </button>

              <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                {editId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Leads;