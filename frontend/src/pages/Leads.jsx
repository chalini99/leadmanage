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
    try {
      const { data } = await API.get("/leads");
      setLeads(data);
    } catch (err) {
      console.log(err);
    }
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

  // ✅ FIXED SUBMIT
  const handleSubmit = async () => {
    try {
      console.log("Clicked Save", form);

      if (!form.name || !form.email) {
        alert("Please fill required fields");
        return;
      }

      if (editId) {
        await API.put(`/leads/${editId}`, form);
      } else {
        await API.post("/leads", form);
      }

      alert("Lead saved successfully ✅");

      setShowModal(false);
      setEditId(null);
      setForm({
        name: "",
        email: "",
        phone: "",
        status: "New",
      });

      fetchLeads();

    } catch (error) {
      console.error(error);
      alert("Error saving lead ❌");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/leads/${id}`);
      fetchLeads();
    } catch (err) {
      console.log(err);
    }
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

        <div className="flex justify-between items-center bg-white px-10 py-6 shadow">
          <h1 className="text-3xl font-semibold">Leads</h1>
        </div>

        <div className="p-10 space-y-8">

          {/* SEARCH */}
          <div className="flex justify-between items-center">

            <input
              placeholder="Search leads..."
              className="border px-5 py-4 rounded-xl w-1/3 text-lg"
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex gap-5">

              <button
                onClick={exportToCSV}
                className="border px-6 py-3 rounded-xl"
              >
                ⬇ Export
              </button>

              <button
                onClick={() => {
                  setShowModal(true);
                  setEditId(null);
                  setForm({ name: "", email: "", phone: "", status: "New" });
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl"
              >
                + Add Lead
              </button>

            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <table className="w-full">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-5 text-left">Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((lead) => (
                  <tr key={lead._id} className="border-b">

                    <td className="py-6 font-semibold">{lead.name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.phone}</td>

                    <td>
                      <span className="px-3 py-1 bg-blue-100 rounded">
                        {lead.status}
                      </span>
                    </td>

                    <td>
                      <button onClick={() => handleEdit(lead)}>✏️</button>
                      <button onClick={() => handleDelete(lead._id)}>🗑️</button>
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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl w-[420px]">

            <h2 className="text-xl mb-5">
              {editId ? "Edit Lead" : "Add Lead"}
            </h2>

            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-3 mb-3 border" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-3 mb-3 border" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full p-3 mb-3 border" />

            <select name="status" value={form.status} onChange={handleChange} className="w-full p-3 mb-5 border">
              <option>New</option>
              <option>Contacted</option>
              <option>Closed</option>
            </select>

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)}>Cancel</button>

              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
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