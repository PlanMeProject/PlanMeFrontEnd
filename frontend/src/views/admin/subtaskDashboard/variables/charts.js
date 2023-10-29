
// export const pieChartData = [20, 80];


export const pieChartOptions = {
    labels: ["Complete", "In Progress"],
    colors: ["#4318FF", "#bbdaee"],
    chart: {
        width: "50px",
    },
    legend: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    hover: {mode: null},
    plotOptions: {
        donut: {
            expandOnClick: false,
            donut: {
                labels: {
                    show: false,
                },
            },
        },
    },
    tooltip: {
        enabled: true,
        theme: "dark",
    },
};