import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const lineOptions = {
  title: { text: 'Annual Efficiency Units' },
  xAxis: { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] },
  yAxis: { title: { text: 'Efficiency' }, plotLines: [{ value: 0, width: 1, color: '#808080' }] },
  tooltip: { valueSuffix: ' Eff' },
  series: [
    { name: 'Unit0', data: [7.0,6.9,9.5,14.5,18.2,21.5,25.2,26.5,23.3,18.3,13.9,9.6] },
    { name: 'Unit1', data: [-0.2,0.8,5.7,11.3,17.0,22.0,24.8,24.1,20.1,14.1,8.6,2.5] }
  ]
};

const columnOptions = {
  chart: { type: 'column' },
  title: { text: 'Output Values' },
  xAxis: { categories: ['Cat1','Cat2','Cat3','Cat4','Cat5'] },
  credits: { enabled: false },
  series: [
    { name: 'Year One', data: [-5,3,4,7,2] },
    { name: 'Year Two', data: [2,-2,-3,2,1] },
    { name: 'Year Three', data: [3,4,4,-2,5] }
  ]
};

const pieOptions = {
  chart: { type: 'pie' },
  title: { text: 'Browser market shares Jan–May 2015' },
  tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' },
  plotOptions: { pie: { allowPointSelect: true, cursor: 'pointer', dataLabels: { enabled: true, format: '<b>{point.name}</b>: {point.percentage:.1f} %' } } },
  series: [{ name: 'Brands', colorByPoint: true, data: [
    { name: 'Internet Explorer', y: 56.33 },
    { name: 'Chrome', y: 24.03, sliced: true, selected: true },
    { name: 'Firefox', y: 10.38 },
    { name: 'Safari', y: 4.77 },
    { name: 'Opera', y: 0.91 },
    { name: 'Other', y: 0.2 }
  ]}]
};

const liveOptions = {
  chart: { type: 'spline', animation: true, marginRight: 10 },
  title: { text: 'Live random data' },
  xAxis: { type: 'datetime', tickPixelInterval: 150 },
  yAxis: { title: { text: 'Value' }, plotLines: [{ value: 0, width: 1, color: '#808080' }] },
  tooltip: { formatter() { return `<b>${this.series.name}</b><br/>${Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x)}<br/>${Highcharts.numberFormat(this.y,2)}`; } },
  legend: { enabled: false }, exporting: { enabled: false },
  series: [{ name: 'Random data', data: (() => {
    const data = [];
    const time = Date.now();
    for (let i = -19; i <= 0; i++) data.push({ x: time + i*1000, y: Math.random() });
    return data;
  })()}]
};

const ChartView = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      const chart = Highcharts.charts.find(c => c && c.renderTo.id === 'live-chart');
      if (chart) chart.series[0].addPoint([Date.now(), Math.random()], true, true);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chart-view">
      <HighchartsReact highcharts={Highcharts} options={lineOptions} />
      <HighchartsReact highcharts={Highcharts} options={columnOptions} />
      <HighchartsReact highcharts={Highcharts} options={pieOptions} />
      <div id="live-chart"><HighchartsReact highcharts={Highcharts} options={liveOptions} containerProps={{ id: 'live-chart' }} /></div>
    </div>
  );
};

export default ChartView;