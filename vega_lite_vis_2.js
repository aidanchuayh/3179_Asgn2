document.addEventListener('DOMContentLoaded', function () {
  var vg_1 = "asgn2.json";

  function updateProportionalSymbolMap(selectedYear) {
    fetch(vg_1)
      .then(response => response.json())
      .then(spec => {
        spec.vconcat[0].layer[1].transform[0].filter = `datum.Year == ${selectedYear}`;
        vegaEmbed('#proportional-symbol-map', spec.vconcat[0]).catch(console.error);
      });
  }

  // function updateHeatmap(selectedAirport) {
  //   fetch(vg_1)
  //     .then(response => response.json())
  //     .then(spec => {
  //       spec.vconcat[1].transform[0].filter = `datum.AIRPORT == '${selectedAirport}'`;
  //       vegaEmbed('#heatmap', spec.vconcat[1]).catch(console.error);
  //     });
  // }

  function updateDonutChart(selectedYear, selectedAirport) {
    fetch(vg_1)
      .then(response => response.json())
      .then(spec => {
        spec.vconcat[2].transform[0].filter = `datum.Year == ${selectedYear}`;
        spec.vconcat[2].transform[1].filter = `datum.AIRPORT == '${selectedAirport}'`;
        vegaEmbed('#donut-chart', spec.vconcat[2]).catch(console.error);
      });
  }

  function updateDivergingBarChart(selectedYear, selectedAirport) {
    fetch(vg_1)
      .then(response => response.json())
      .then(spec => {
        spec.vconcat[3].transform[0].filter = `datum.Year == ${selectedYear}`;
        spec.vconcat[3].transform[1].filter = `datum.AIRPORT == '${selectedAirport}'`;
        vegaEmbed('#diverging-bar-chart', spec.vconcat[3]).catch(console.error);
      });
  }

  function updateStackedAreaChart(selectedYear) {
    fetch(vg_1)
      .then(response => response.json())
      .then(spec => {
        spec.vconcat[4].transform[0].filter = `datum.Year == ${selectedYear}`;
        vegaEmbed('#stacked-area-chart', spec.vconcat[4]).catch(console.error);
      });
  }

  updateProportionalSymbolMap(2023);
  // updateHeatmap('MELBOURNE');
  updateDonutChart(2023, 'MELBOURNE');
  updateDivergingBarChart(2023, 'MELBOURNE');
  updateStackedAreaChart(2023);

  document.getElementById('psm-year-selector').addEventListener('change', function () {
    updateProportionalSymbolMap(this.value);
  });

  // document.getElementById('heatmap-airport-selector').addEventListener('change', function () {
  //   updateHeatmap(this.value);
  // });

  document.getElementById('donut-year-selector').addEventListener('change', function () {
    var selectedAirport = document.getElementById('donut-airport-selector').value;
    updateDonutChart(this.value, selectedAirport);
  });

  document.getElementById('donut-airport-selector').addEventListener('change', function () {
    var selectedYear = document.getElementById('donut-year-selector').value;
    updateDonutChart(selectedYear, this.value);
  });

  document.getElementById('bar-year-selector').addEventListener('change', function () {
    var selectedAirport = document.getElementById('bar-airport-selector').value;
    updateDivergingBarChart(this.value, selectedAirport);
  });

  document.getElementById('bar-airport-selector').addEventListener('change', function () {
    var selectedYear = document.getElementById('bar-year-selector').value;
    updateDivergingBarChart(selectedYear, this.value);
  });

  document.getElementById('area-year-selector').addEventListener('change', function () {
    updateStackedAreaChart(this.value);
  });
});
