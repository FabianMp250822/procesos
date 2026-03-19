import { getGroups } from "@/lib/data/clients";
import NewClientPage from "./page";

export default async function NewClientPageWrapper() {
  const groups = await getGroups();
  return <NewClientPage groups={groups} />;
}
