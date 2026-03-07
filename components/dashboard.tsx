"use client";
import { v4 as uuidv4 } from 'uuid';
import { useState, useMemo, useEffect } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { memo } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
type Expense = {
  id:String;
  text: string;
  amount: number;
  category: string;
  userId: String | number | null;
  date: string;
};

const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Health",
  "Entertainment",
  "Other",
];

const CATEGORY_COLORS: Record<string, string> = {
  Food: "#10b981",
  Transport: "#3b82f6",
  Shopping: "#f59e0b",
  Bills: "#ef4444",
  Health: "#8b5cf6",
  Entertainment: "#ec4899",
  Other: "#6b7280",
};

const CATEGORY_ICONS: Record<string, string> = {
  Food: "🍔",
  Transport: "🚗",
  Shopping: "🛍️",
  Bills: "💡",
  Health: "❤️‍🩹",
  Entertainment: "🎮",
  Other: "📦",
};


const MONTHLY_DATA = [
  { month: "Sep", amount: 8200 },
  { month: "Oct", amount: 11400 },
  { month: "Nov", amount: 9800 },
  { month: "Dec", amount: 15200 },
  { month: "Jan", amount: 10600 },
  { month: "Feb", amount: 9919 },
];

// ── Custom Tooltip ─────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-xl px-4 py-2.5 shadow-xl text-sm">
        <p className="text-muted-foreground mb-1">{label}</p>
        <p className="text-foreground font-bold">
          ₹{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};
type DashboardProps = {
  user: {
    id: string;
    email: string;
    clerkUserId:String;
    name: string;
    imageUrl:string;
    records:[]
  };
};
// ── Main Dashboard ─────────────────────────────────────────────────────────
 function Dashboard({ user }:DashboardProps) {
  
  const [expenses, setExpenses] = useState<Expense[]>(user.records);
  const [showModal, setShowModal] = useState(false);
  const [filterCat, setFilterCat] = useState("All");
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: "",
  });
  const [formError, setFormError] = useState("");
 const [isAdding, setIsAdding] = useState(false);
const [isDeleting, setIsDeleting] = useState(false);
const [isfetching, setIsfetching] = useState(false);
const [DeletingId, setDeletingId] = useState<String>("");
  // ── Computed stats ──────────────────────────────────────────────────────
  const totalSpent = useMemo(() => expenses.reduce((s, e) => s + e.amount, 0),
    [expenses],
  );
  const fetchExpense = async()=>{
      try{
       setIsfetching(true)
      const res= await fetch(`/api/expense/${user.clerkUserId}`)
      const data =await res.json()
      setExpenses(data)
      }catch(e){
        console.error(e)
      }finally{
         setIsfetching(false)
      }
  }
  const avgPerDay = useMemo(() =>  Math.round(totalSpent / 28), [totalSpent]);
  const maxSpent =useMemo(()=>expenses.length > 0 ? Math.max(...expenses.map(e => e.amount)) : 0,[expenses])
  const minSpent =useMemo(()=>expenses.length > 0 ? Math.min(...expenses.map(e => e.amount)) : 0,[expenses])
  
  const topCategory = useMemo(() => {
    const map: Record<string, number> = {};
    expenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + e.amount;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "-";
  }, [expenses]);
  
  const amtForDate = useMemo(() => {
    const map: Record<string, number> = {};
    expenses.forEach((e) => {
      const date =new Date(e.date).toISOString().split('T')[0]
      map[date] = (map[date] || 0) + e.amount;
    });
    return Object.entries(map).map(([date, amount]) => ({ date, amount }))
  }, [expenses]);
 
  // ── Pie data ────────────────────────────────────────────────────────────
  const pieData = useMemo(() => {
    const map: Record<string, number> = {};
    expenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + e.amount;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [expenses]);
  
  // ── Filtered list ───────────────────────────────────────────────────────
  const filtered = useMemo(
    () =>
      filterCat === "All"
        ? expenses
        : expenses.filter((e) => e.category === filterCat),
    [expenses, filterCat],
  );
   
  // ── Add expense ─────────────────────────────────────────────────────────
  const handleAdd = async () => {
    if (!form.title || !form.amount || !form.date) {
      setFormError("Please fill in all fields.");
      return;
    }
    const newExpense: Expense = {
      id: uuidv4(),
      text: form.title,
      amount: parseFloat(form.amount),
      category: form.category,
      userId: user.id || null,
      date: form.date,
    };
    
    
    try {
      setIsAdding(true)
      const res = await fetch("/api/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExpense),
      });
      const data = await res.json();
      setShowModal(false)
      fetchExpense();
      setForm({ title: "", amount: "", category: "Food", date: "" });
      setFormError("");
    } catch (e) {
      console.error("Error sending data to server:", e);
    } finally {
       setIsAdding(false);
       setShowModal(false)
    }
  };


  const handleDelete = async (id: String) =>{
     setDeletingId(id);
    try{
      setIsDeleting(true)
     const res= await fetch(`/api/records/`,{
        method:"DELETE",
        body: JSON.stringify({id})
      })
      const data = await res.json()
      
      fetchExpense();
    }catch(err){
      console.log(err);
    }finally{
      setIsDeleting(false) 
    }
  }
  
  return (
    <div className="bg-background text-foreground min-h-screen">
     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Hi {user?.name || "Guest"} 👋
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Here's your financial overview for{" "}
              {new Date().toLocaleString("default", { month: "long" })} 2026
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="self-start sm:self-auto bg-gradient-to-r from-emerald-400 to-blue-500 text-gray-950 font-bold px-5 py-2.5 rounded-xl hover:opacity-90 hover:-translate-y-0.5 transition-all duration-150 shadow-lg shadow-emerald-500/20 text-sm flex items-center gap-2"
          >
            <span className="text-lg">＋</span> Add Expense
          </button>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Total Spent",
              value: `₹${totalSpent.toLocaleString()}`,
              icon: "💸",
              color: "from-emerald-500/10 to-emerald-500/5",
              border: "border-emerald-500/20",
            },
            {
              label: "Transactions",
              value: expenses.length,
              icon: "🧾",
              color: "from-blue-500/10 to-blue-500/5",
              border: "border-blue-500/20",
            },
            {
              label: "Avg / Day",
              value: `₹${avgPerDay.toLocaleString()}`,
              icon: "📅",
              color: "from-amber-500/10 to-amber-500/5",
              border: "border-amber-500/20",
            },
            {
              label: "Top Category",
              value: topCategory,
              icon: CATEGORY_ICONS[topCategory] || "📦",
              color: "from-purple-500/10 to-purple-500/5",
              border: "border-purple-500/20",
            },
          ].map((s) => (
            <div
              key={s.label}
              className={`bg-gradient-to-br ${s.color} border ${s.border} rounded-2xl p-5 flex flex-col gap-2`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                  {s.label}
                </span>
                <span className="text-xl">{s.icon}</span>
              </div>
              <span className="text-2xl font-extrabold text-foreground">
                {s.value}
              </span>
            </div>
          ))}
        </div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Area Chart */}
          <div className="lg:col-span-2 bg-muted border border-border rounded-2xl p-6 flex flex-col gap-4">
            <div>
              <h2 className="text-foreground font-bold text-base">
                Date-wise Expense Overview
              </h2>
              <p className="text-muted-foreground text-xs mt-0.5">
                Analyze your spending for any selected date 
              </p>
            </div>
            <ResponsiveContainer  width="100%" height={220}>
              <BarChart
               data={amtForDate.map(e => ({
  date: new Date(e.date).toLocaleString("en-IN", {
    month: "short",
    day: "numeric",

   // optional (AM/PM format)
  }),
  amount: e.amount
}))} 
margin={{ top: 5, right: 20, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  dataKey="amount"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" radius={[6, 6, 0, 0]} fill="#3b82f6" />

                 </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-muted border border-border rounded-2xl p-6 flex flex-col gap-4">
            <div>
              <h2 className="text-foreground font-bold text-base">
                By Category
              </h2>
              <p className="text-muted-foreground text-xs mt-0.5">
                Spending breakdown
              </p>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={CATEGORY_COLORS[entry.name] || "#6b7280"}
                    />
                  ))}
                </Pie>
                <Tooltip
  formatter={(value) => [
    `₹ ${Number(value).toLocaleString()}`,
    
  ]}
/>
              </PieChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div className="flex flex-col gap-1.5">
              {pieData.slice(0, 5).map((d) => (
                <div
                  key={d.name}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: CATEGORY_COLORS[d.name] }}
                    />
                    <span className="text-muted-foreground">{d.name}</span>
                  </div>
                  <span className="text-foreground font-semibold">
                    ₹{d.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-muted border border-border rounded-2xl p-6 flex flex-col gap-4">
          <div>
            <h2 className="text-foreground font-bold text-base">
              Category-wise Spending
            </h2>
            <p className="text-muted-foreground text-xs mt-0.5">
              This month's breakdown by category
            </p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={pieData}
              margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {pieData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={CATEGORY_COLORS[entry.name] || "#6b7280"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
     <div className="bg-muted border border-border rounded-2xl p-6 flex flex-col gap-4">
          <div>
            <h2 className="text-foreground font-bold text-base">
              Category-wise Spending
            </h2>
            <p className="text-muted-foreground text-xs mt-0.5">
              This month's breakdown by category
            </p>
          </div>
          </div>
        {/* ── Expense List ── */}
        <div className="bg-muted border border-border rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-foreground font-bold text-base">
                Recent Transactions
              </h2>
              <p className="text-muted-foreground text-xs mt-0.5">
                {filtered.length} expense{filtered.length !== 1 ? "s" : ""}{" "}
                found
              </p>
            </div>
            {/* Filter pills */}
            <div className="flex flex-wrap gap-2">
              {["All", ...CATEGORIES].map((cat,index) => (
                <button
                  key={index}
                  onClick={() => setFilterCat(cat)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                    filterCat === cat
                      ? "bg-gradient-to-r from-emerald-400 to-blue-500 text-gray-950"
                      : "bg-background border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat === "All" ? "All" : `${CATEGORY_ICONS[cat]} ${cat}`}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-2">
              <span className="text-4xl">🪹</span>
              <p className="text-muted-foreground text-sm">No expenses found</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {filtered.map((expense,index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-background border border-border rounded-xl px-4 py-3 hover:border-emerald-500/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-muted border border-border flex items-center justify-center text-base flex-shrink-0">
                      {CATEGORY_ICONS[expense.category]}
                    </div>
                    <div>
                      <p className="text-foreground font-semibold text-sm">
                        {expense.text}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {expense.category} · {new Date(expense.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-foreground font-bold text-sm">
                      ₹{expense.amount.toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-400 text-sm transition-all"
                      aria-label="Delete"
                    >
                     {DeletingId == expense.id &&  "Deleting..." }  🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Add Expense Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setShowModal(false);
              setFormError("");
            }}
          />

          {/* Modal Card */}
          <div className="relative bg-background border border-border rounded-3xl p-7 w-full max-w-md shadow-2xl flex flex-col gap-5 z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-foreground font-bold text-lg">
                Add New Expense
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setFormError("");
                }}
                className="text-muted-foreground hover:text-foreground text-xl transition-colors"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5 text-red-400 text-sm">
                {formError}
              </div>
            )}

            <div className="flex flex-col gap-4">
              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-muted-foreground font-medium">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lunch, Netflix, Petrol"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="bg-muted border border-border focus:border-ring focus:outline-none text-foreground text-sm rounded-xl px-4 py-2.5 placeholder:text-muted-foreground transition-colors"
                />
              </div>

              {/* Amount */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-muted-foreground font-medium">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="bg-muted border border-border focus:border-ring focus:outline-none text-foreground text-sm rounded-xl px-4 py-2.5 placeholder:text-muted-foreground transition-colors"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-muted-foreground font-medium">
                  Category
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setForm({ ...form, category: cat })}
                      className={`flex flex-col items-center gap-1 py-2 rounded-xl border text-xs font-medium transition-all ${
                        form.category === cat
                          ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                          : "border-border bg-muted text-muted-foreground hover:border-border hover:text-foreground"
                      }`}
                    >
                      <span className="text-base">{CATEGORY_ICONS[cat]}</span>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-muted-foreground font-medium">
                  Date
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="bg-muted border border-border focus:border-ring focus:outline-none text-foreground text-sm rounded-xl px-4 py-2.5 transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                onClick={() => {
                  setShowModal(false);
                  setFormError("");
                }}
                className="flex-1 border border-border text-muted-foreground font-medium py-2.5 rounded-xl hover:bg-muted hover:text-foreground transition-all text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 bg-gradient-to-r from-emerald-400 to-blue-500 text-gray-950 font-bold py-2.5 rounded-xl hover:opacity-90 transition-all text-sm shadow-lg shadow-emerald-500/20"
              >
              <div className="flex justify-center items-center h-screen">
               {isAdding ? "Adding...": "Add Expense"} 
              </div>
              </button>
            </div>
          </div>
        </div>
      )}
    
    </div>
  );
}
export default  memo(Dashboard);