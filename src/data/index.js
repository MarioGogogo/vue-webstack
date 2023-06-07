export const logs_options = {
  color: '#5470C6',
  legend: {},
  grid: {
    top: 50,
    bottom: 40,
  },
  tooltip: {
    trigger: 'none',
    axisPointer: {
      type: 'cross',
    },
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true,
      },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: '#5470C6',
        },
      },
      boundaryGap: false,
      axisPointer: {
        label: {
          formatter: function(params) {
            return '日志数量  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
          },
        },
      },
      // prettier-ignore
      data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9','2015-10','2015-11','2015-12']
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: '每日日志数量',
      type: 'line',
      smooth: true,
      emphasis: {
        focus: 'series',
      },
      data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7],
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#409eff', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#e0edfe', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    },
  ],
};
