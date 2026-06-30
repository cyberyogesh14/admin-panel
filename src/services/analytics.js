import { getLeads } from "./api";

export async function getAnalytics() {
  const leads = await getLeads();

  const today = new Date().toDateString();

  const totalLeads = leads.length;

  const todayLeads = leads.filter(
    (lead) =>
      new Date(lead.date).toDateString() === today
  ).length;

  const services = {};

  leads.forEach((lead) => {
    services[lead.service] =
      (services[lead.service] || 0) + 1;
  });

  const chart = {};

  leads.forEach((lead) => {
    const month = new Date(lead.date).toLocaleString(
      "default",
      { month: "short" }
    );

    chart[month] = (chart[month] || 0) + 1;
  });

  return {
    totalLeads,
    todayLeads,
    services,
    chart,
  };
}