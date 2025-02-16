import { StatsDashboard } from "@/components/dashboard/stats-dashboard";
import SearchDialog from "@/components/search/search-dialog";



export default function DashboardPage () {
    return (
        <div>
            <h1 className="mb-8 text-2xl font-bold text-white">Statistics</h1>
            <StatsDashboard/>

        </div>
    )
}