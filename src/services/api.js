const API_URL =
"https://script.google.com/macros/s/AKfycbyZtXJU1MqnpB9w9uvSxbBA6RSs2pc9p4i84khQQ5qbvFeIddkgVfUXhW4fxLMktdgs/exec"
export async function getLeads() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch leads");
  }

  return await response.json();
}