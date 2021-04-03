import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '../provider/Theme.provider';

const TotalFastingCard = () => {
    const theme = useTheme();
    let x = {
        series: [
            {
                name: 'Fasting Hours',
                data: Array(30)
                    .fill()
                    .map(() => Math.round(Math.random() * (15 - 8) + 8)),
            },
        ],
        options: {
            theme: {
                mode: theme.theme === 'dark' ? 'dark' : 'light',
            },
            chart: {
                type: 'line',
                height: 350,
                stacked: true,
                toolbar: {
                    show: true,
                },
                zoom: {
                    enabled: true,
                },
            },
            stroke: {
                curve: 'smooth',
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0,
                        },
                    },
                },
            ],
            plotOptions: {
                bar: {
                    borderRadius: 8,
                    horizontal: false,
                    columnWidth: '20%',
                },
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                type: 'datetime',
                labels: {
                    datetimeFormatter: {
                        year: 'yyyy',
                        month: "MM 'yy",
                        day: 'dd MMM',
                    },
                },
                categories: [
                    '01/01/2020 GMT',
                    '01/02/2020 GMT',
                    '01/03/2020 GMT',
                    '01/04/2020 GMT',
                    '01/05/2020 GMT',
                    '01/06/2020 GMT',
                    '01/07/2020 GMT',
                    '01/08/2020 GMT',
                    '01/09/2020 GMT',
                    '01/10/2020 GMT',
                    '01/11/2020 GMT',
                    '01/12/2020 GMT',
                    '01/13/2020 GMT',
                    '01/14/2020 GMT',
                    '01/15/2020 GMT',
                    '01/16/2020 GMT',
                    '01/17/2020 GMT',
                    '01/18/2020 GMT',
                    '01/19/2020 GMT',
                    '01/20/2020 GMT',
                    '01/21/2020 GMT',
                    '01/22/2020 GMT',
                    '01/23/2020 GMT',
                    '01/24/2020 GMT',
                    '01/25/2020 GMT',
                    '01/26/2020 GMT',
                    '01/27/2020 GMT',
                    '01/28/2020 GMT',
                    '01/29/2020 GMT',
                    '01/30/2020 GMT',
                ],
                style: {
                    colors: '#ffffff',
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    cssClass: 'apexcharts-xaxis-label',
                },
            },
            legend: {
                position: 'right',
                offsetY: 40,
            },
            fill: {
                opacity: 1,
            },
        },
    };

    return (
        <div className="w-full bg-white h-auto px-6 py-4 shadow-md rounded-3xl flex flex-col dark:bg-gray-800">
            <div className="dark:text-white text-xs">
                <div>Total Fasting Hours</div>
                <div className="flex justify-between">
                    <div className="font-bold text-sm">Total 14.6h</div>
                    <div>Feb 9 - Feb 15</div>
                </div>
            </div>
            <div className="w-full">
                <Chart options={x.options} series={x.series} type="bar" height={300} />
            </div>
        </div>
    );
};

export default TotalFastingCard;
/**
 *     useEffect(() => {
        console.log(JSON.parse(localStorage.getItem('user'))._id);
        axios
            .post('http://localhost:8080/api/fasting/average', {
                userId: JSON.parse(localStorage.getItem('user'))._id,
            })
            .then((data) => {
                let options = chartOption;
                options.series[0].data = data.data.average.chart.data;
                options.options.xaxis.categories = data.data.average.chart.category;
                setChartOption(options);
            });
    }, []);
 */
