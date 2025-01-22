import { useState } from 'react'
    import { Line } from 'react-chartjs-2'
    import {
      Chart as ChartJS,
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend,
    } from 'chart.js'

    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    )

    const stats = [
      { name: 'Total Revenue', value: '$100', change: '+4.75%', changeType: 'positive' },
      { name: 'Monthly Revenue', value: '$100', change: '+54.02%', changeType: 'positive' },
      { name: 'Paying Customers', value: '50', change: '-1.39%', changeType: 'negative' },
      { name: 'Promoters', value: '10', change: '+10.18%', changeType: 'positive' },
    ]

    const chartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Customer Growth',
          data: [30, 40, 50, 60, 70, 80, 90],
          borderColor: 'rgb(79, 70, 229)',
          backgroundColor: 'rgba(79, 70, 229, 0.05)',
        },
        {
          label: 'Referrals',
          data: [10, 20, 30, 40, 50, 60, 70],
          borderColor: 'rgb(14, 165, 233)',
          backgroundColor: 'rgba(14, 165, 233, 0.05)',
        },
      ],
    }

    const tableData = [
      {
        promoter: 'John Doe',
        amount: '$50',
        conversionValue: '$200',
        createDate: '2023-07-01',
        eventId: 'EV12345',
        customer: 'Jane Smith',
        campaign: 'Summer Sale',
      },
      // Add more rows as needed
    ]

    const pendingActions = [
      { description: 'Approve commission for John Doe', amount: '$50' },
      { description: 'Review payout for Jane Smith', amount: '$100' },
    ]

    export default function Dashboard() {
      const [selectedRow, setSelectedRow] = useState(null)

      return (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="p-6 bg-white rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500">{stat.name}</div>
                <div className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</div>
                <div className={`mt-1 text-sm ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900">Customer Growth & Referrals</h2>
            <div className="mt-4 h-96">
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Table and Side Panel */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Table */}
            <div className="lg:col-span-2">
              <div className="p-6 bg-white rounded-lg shadow">
                <h2 className="text-lg font-medium text-gray-900">Latest Rewards/Commissions</h2>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Promoter</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Conversion Value</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Create Date</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Event ID</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Customer</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Campaign</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {tableData.map((row, index) => (
                        <tr
                          key={index}
                          className={`hover:bg-gray-50 cursor-pointer ${
                            selectedRow === index ? 'bg-gray-50' : ''
                          }`}
                          onClick={() => setSelectedRow(index)}
                        >
                          <td className="px-6 py-4 text-sm text-gray-900">{row.promoter}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{row.amount}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{row.conversionValue}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{row.createDate}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{row.eventId}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{row.customer}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{row.campaign}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Side Panel */}
            <div>
              <div className="p-6 bg-white rounded-lg shadow">
                <h2 className="text-lg font-medium text-gray-900">Pending Actions</h2>
                <div className="mt-4 space-y-4">
                  {pendingActions.map((action, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="text-sm text-gray-900">{action.description}</div>
                      <div className="mt-1 text-sm font-medium text-gray-900">{action.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
