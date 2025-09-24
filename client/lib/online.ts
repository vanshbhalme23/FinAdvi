export function isAdvisorOnline(advisorId: string | undefined) {
  if (!advisorId) return false;
  let sum = 0;
  for (let i = 0; i < advisorId.length; i++) sum += advisorId.charCodeAt(i);
  return sum % 2 === 0; // deterministic online/offline
}
