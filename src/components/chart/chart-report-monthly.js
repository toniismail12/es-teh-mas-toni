import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChartMonthly({datas}) {

    const data = {
        datas
    };

    const labels = data?.datas.map((item) => new Date(item.date).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }));
    const pemasukan = data?.datas.map((item) => item.total_pemasukan);
    const pengeluaran = data?.datas.map((item) => item.total_pengeluaran);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Pemasukan',
                data: pemasukan,
                backgroundColor: '#13deb9'
            },
            {
                label: 'Pengeluaran',
                data: pengeluaran,
                backgroundColor: '#fa896b'
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false, position: 'bottom' },
            title: { display: false, text: 'Pemasukan & Pengeluaran' }
        },
        scales: {
            y: {
              beginAtZero: true,
              grid: { display: false }
            },
            x: {
              grid: { display: false }
            }
        }
    };

    return <Bar data={chartData} options={options} />;
}
