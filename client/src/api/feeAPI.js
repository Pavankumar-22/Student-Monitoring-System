const API_URL = "/fees";

export const getAllFees = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch fee records");
  return await res.json();
};

export const recordFee = async (fee) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fee),
  });
  return await res.json();
};

export const deleteFee = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete fee record");
  return await res.json();
};