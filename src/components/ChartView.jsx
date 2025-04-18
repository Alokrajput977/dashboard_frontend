// src/components/ChartView.js
import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const baseLineOptions = {
  title: { text: 'Annual Efficiency Units' },
  xAxis: { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] },
  yAxis: { title: { text: 'Efficiency' }, plotLines: [{ value: 0, width: 1, color: '#808080' }] },
  tooltip: { valueSuffix: ' Eff' },
  series: [
    { name: 'Unit0', data: [7.0,6.9,9.5,14.5,18.2,21.5,25.2,26.5,23.3,18.3,13.9,9.6] },
    { name: 'Unit1', data: [-0.2,0.8,5.7,11.3,17.0,22.0,24.8,24.1,20.1,14.1,8.6,2.5] }
  ]
};

const baseColumnOptions = {
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

const basePieOptions = {
  chart: { type: 'pie' },
  title: { text: 'Browser market shares Jan–May 2015' },
  tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
      }
    }
  },
  series: [{
    name: 'Brands',
    colorByPoint: true,
    data: [
      { name: 'Internet Explorer', y: 56.33 },
      { name: 'Chrome', y: 24.03, sliced: true, selected: true },
      { name: 'Firefox', y: 10.38 },
      { name: 'Safari', y: 4.77 },
      { name: 'Opera', y: 0.91 },
      { name: 'Other', y: 0.2 }
    ]
  }]
};

const baseLiveOptions = {
  chart: { type: 'spline', animation: true, marginRight: 10 },
  title: { text: 'Live random data' },
  xAxis: { type: 'datetime', tickPixelInterval: 150 },
  yAxis: { title: { text: 'Value' }, plotLines: [{ value: 0, width: 1, color: '#808080' }] },
  tooltip: {
    formatter() {
      return `<b>${this.series.name}</b><br/>${Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x)}<br/>${Highcharts.numberFormat(this.y,2)}`;
    }
  },
  legend: { enabled: false },
  exporting: { enabled: false },
  series: [{
    name: 'Random data',
    data: (() => {
      const data = [];
      const time = Date.now();
      for (let i = -19; i <= 0; i++) {
        data.push({ x: time + i * 1000, y: Math.random() });
      }
      return data;
    })()
  }]
};

export default function ChartView({ theme }) {
  // whenever theme flips, re‑set the global Highcharts defaults:
  useEffect(() => {
    if (theme === 'dark') {
      Highcharts.setOptions({
        chart: {
          backgroundColor: '#2a2a2b',
          style: { color: '#ffffff' }
        },
        title: { style: { color: '#ffffff' } },
        xAxis: {
          labels: { style: { color: '#E0E0E3' } },
          lineColor: '#707073',
          tickColor: '#707073'
        },
        yAxis: {
          labels: { style: { color: '#E0E0E3' } },
          gridLineColor: '#707073'
        },
        legend: {
          itemStyle:    { color: '#E0E0E3' },
          itemHoverStyle: { color: '#FFFFFF' }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          style: { color: '#F0F0F0' }
        }
      });
    } else {
      // reset to Highcharts default (white background, dark text)
      Highcharts.setOptions({
        chart: { backgroundColor: '#ffffff', style: { color: '#000000' } },
        title: { style: { color: '#000000' } },
        xAxis: {
          labels: { style: { color: '#000000' } },
          lineColor: '#000000',
          tickColor: '#000000'
        },
        yAxis: {
          labels: { style: { color: '#000000' } },
          gridLineColor: '#e6e6e6'
        },
        legend: {
          itemStyle:    { color: '#000000' },
          itemHoverStyle: { color: '#333333' }
        },
        tooltip: {
          backgroundColor: '#FFFFFF',
          style: { color: '#000000' }
        }
      });
    }
  }, [theme]);

  // live‐chart needs its own containerProps id for us to update points:
  return (
    <div className="chart-view" style={{ padding: '1rem' }}>
      <HighchartsReact highcharts={Highcharts} options={baseLineOptions} />
      <HighchartsReact highcharts={Highcharts} options={baseColumnOptions} />
      <HighchartsReact highcharts={Highcharts} options={basePieOptions} />
      <div id="live-chart">
        <HighchartsReact
          highcharts={Highcharts}
          options={baseLiveOptions}
          containerProps={{ id: 'live-chart' }}
        />
      </div>
      {/* live‐data updater */}
      <LiveUpdater />
    </div>
  );
}

// separate component to push new points
function LiveUpdater() {
  useEffect(() => {
    const interval = setInterval(() => {
      const chart = Highcharts.charts.find(c => c && c.renderTo.id === 'live-chart');
      if (chart) {
        chart.series[0].addPoint([Date.now(), Math.random()], true, true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return null;
}
