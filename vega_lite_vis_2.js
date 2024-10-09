document.addEventListener('DOMContentLoaded', function () {
  // Path to your JSON specification file
  var vg_1 = "week10homework.json";

  // Function to update the Proportional Symbol Map based on the selected year
  function updateProportionalSymbolMap(selectedYear) {
    fetch(vg_1)
      .then(response => response.json())
      .then(spec => {
        // Update the year filter for the Proportional Symbol Map (first visualization)
        spec.vconcat[0].layer[1].transform[0].filter = `datum.Year == ${selectedYear}`;
        // Embed the updated Proportional Symbol Map in the correct div
        vegaEmbed('#proportional-symbol-map', spec.vconcat[0]).catch(console.error);
      });
  }

  // Function to update the Heatmap based on the selected airport (state)
  function updateHeatmap(selectedAirport) {
    fetch(vg_1)
      .then(response => response.json())
      .then(spec => {
        // Update the airport filter for the Heatmap (second visualization)
        spec.vconcat[1].transform[0].filter = `datum.AIRPORT == '${selectedAirport}'`;
        // Embed the updated Heatmap in the correct div
        vegaEmbed('#heatmap', spec.vconcat[1]).catch(console.error);
      });
  }

  // Function to update the Radial Plot based on the selected year and airport
  function updateRadialPlot(selectedYear, selectedAirport) {
    fetch(vg_1)
      .then(response => response.json())
      .then(spec => {
        // Update the year and airport filters for the Radial Plot (third visualization)
        spec.vconcat[2].transform[0].filter = `datum.Year == ${selectedYear}`;
        spec.vconcat[2].transform[1].filter = `datum.AIRPORT == '${selectedAirport}'`;
        // Embed the updated Radial Plot in the correct div
        vegaEmbed('#radial-plot', spec.vconcat[2]).catch(console.error);
      });
  }

  // Initial rendering with default year (2023) and airport (MELBOURNE)
  updateProportionalSymbolMap(2023);
  updateHeatmap('MELBOURNE');
  updateRadialPlot(2023, 'MELBOURNE');

  // Event listener for the year selection (Proportional Symbol Map and Radial Plot)
  document.getElementById('year-selector').addEventListener('change', function () {
    var selectedYear = this.value;
    updateProportionalSymbolMap(selectedYear);
    updateRadialPlot(selectedYear, document.getElementById('airport-selector').value);
  });

  // Event listener for the airport selection (Heatmap and Radial Plot)
  document.getElementById('airport-selector').addEventListener('change', function () {
    var selectedAirport = this.value;
    updateHeatmap(selectedAirport);
    updateRadialPlot(document.getElementById('year-selector').value, selectedAirport);
  });
});
