const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchDashboardData = async () => {
  await delay(2000);
  return [{ id: 1, name: "User A" }, { id: 2, name: "User B" }];
};
