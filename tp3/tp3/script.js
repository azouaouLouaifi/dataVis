const width = 800;
const height = 600;
const geojsonUrl = "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson";
const csvUrl = "SINOE14_TonnageDecheterieParTypeDechet.csv";

const typeDechet = "DEEE";

let json; 

const svg = d3.select("#map-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

const tooltip = d3.select("body").append("div")
    .attr("class", "hidden tooltip");

const projection = d3.geoConicConformal()
    .center([2.454071, 46.279229])
    .scale(2800)
    .translate([width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

const color = d3.scaleLinear()
    .range(["#d9f0a3", "#2c3803"]); 

Promise.all([
    d3.json(geojsonUrl),
    d3.csv(csvUrl)
]).then(function(loadedData) {
    json = loadedData[0];
    const data = loadedData[1];

    var cleanData = data.filter(function(row) {
        return row.L_TYP_REG_DECHET === typeDechet;
    });

    const minVal = d3.min(cleanData, d => parseFloat(d.TONNAGE_T));
    const maxVal = d3.max(cleanData, d => parseFloat(d.TONNAGE_T));
    color.domain([minVal, maxVal]);

    json.features.forEach(function(feature) {
        const depCode = feature.properties.code;
        const depRows = cleanData.filter(row => row.C_DEPT === depCode);

        let history = {};
        depRows.forEach(row => {
            history[row.ANNEE] = parseFloat(row.TONNAGE_T);
        });

        feature.properties.history = history;
    });

    drawMap("2009");

}).catch(function(error) {
    console.error("Erreur :", error);
});

function drawMap(currentYear) {
    
    d3.select('#day').html(currentYear);

    json.features.forEach(function(d) {
        const val = d.properties.history[currentYear] || 0;
        d.properties.value = val;
    });

    svg.selectAll("path")
        .data(json.features)
        .join("path")
        .attr("d", path)
        .attr("stroke", "#555")
        .attr("stroke-width", 0.5)
        .transition().duration(200) 
        .style("fill", function(d) {
            const value = d.properties.value;
            return value ? color(value) : "#ccc";
        });

    svg.selectAll("path")
        .on("mousemove", function(event, d) {
            const mousePosition = [event.pageX, event.pageY];
            const depNom = d.properties.nom;
            const depVal = d.properties.value ? Math.round(d.properties.value) + " tonnes" : "N/A";

            tooltip.classed("hidden", false)
                .attr("style", "left:" + (mousePosition[0] + 15) + "px; top:" + (mousePosition[1] - 35) + "px")
                .html(`<strong>${depNom}</strong><br>${depVal}<br><em>${currentYear}</em>`);
            
            d3.select(this).style("opacity", 0.7).style("stroke", "#000");
        })
        .on("mouseout", function() {
            tooltip.classed("hidden", true);
            d3.select(this).style("opacity", 1).style("stroke", "#555");
        });
}

d3.select("#slider").on("input", function() {
    const currentYear = 2009 + 2 * this.value;
    drawMap(String(currentYear));
});