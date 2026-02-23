const lolli_width = 1000; 
const lolli_height = 600;  
const margin_top = 50; 
const margin_right = 450;  
const margin_bottom = 50; 
const margin_left = 50;  

document.addEventListener('DOMContentLoaded', function () {
    Promise.all([d3.csv('data/females_data.csv'), d3.csv('data/males_data.csv')])
        .then(function (values) {
            console.log('Loaded CSV files successfully!');
            const female_data = values[0];
            const male_data = values[1];

    female_data.forEach(l =>l.year = new Date(l.year, 0, 1));
    male_data.forEach(l => l.year = new Date(l.year, 0, 1));
    console.log(female_data);

    const selected_countries = new Set(["Australia", "Brazil", "China", "Denmark", "Egypt"]);
    const filtered_countries = Object.keys(female_data[0])
    .filter(country => selected_countries.has(country)); 
    console.log(filtered_countries);

    const dropdown = d3.select("#countryDropdown");
    dropdown.selectAll("option")
        .data(filtered_countries)
        .enter()
        .append("option")
        .attr("value", l => l)
        .text(l => l);

    dropdown.on("change", function () {
        const selected_country = this.value;
        drawLollipopChart(selected_country, female_data, male_data);
    });

    dropdown.property("value", filtered_countries[0]).dispatch("change");
    })
     .catch(error => console.error('Error loading CSV files:', error));
    });
    function drawLollipopChart(selected_country, female_data, male_data) {
    console.log(`Drawing chart for ${selected_country}`);

    d3.select("#lolli svg").remove();

    const width = 1000, height = 600;
    const marginLeft = 60, marginRight = 30, marginTop = 30, marginBottom = 50;

    const svg = d3.select("#lolli")
        .append("svg")
        .attr("width", lolli_width)
        .attr("height", lolli_height);

    const femaleFiltered = female_data.map(({ Year, [selected_country]: value }) => ({
        year: new Date(+Year, 0, 1), 
        value: +value 
    }));

    const maleFiltered = male_data.map(({ Year, [selected_country]: value }) => ({
        year: new Date(+Year, 0, 1),
        value: +value
    }));
    
    console.log('Female Data:', femaleFiltered);
    console.log('Male Data:', maleFiltered);


    const maxEmpRate = Math.max(
        d3.max(femaleFiltered, l => l.value),
        d3.max(maleFiltered, l => l.value)
    );
   
    const x = d3.scaleTime()
        .domain([new Date(1990, 0, 1), new Date(2023, 0, 1)])
        .range([marginLeft, lolli_width - marginRight]);

    const y = d3.scaleLinear()
        .domain([0, maxEmpRate])
        .range([lolli_height - marginBottom, marginTop]);

    svg.append("g")
        .attr("transform", `translate(0,${lolli_height - marginBottom})`)
        .call(d3.axisBottom(x).ticks(d3.timeYear.every(5)).tickFormat(d3.timeFormat("%Y")));

    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y));

    svg.append("text")
       .attr("transform", "translate(" + (lolli_width / 2) + " ," + (lolli_height - marginBottom + 40) + ")")
       .style("text-anchor", "middle")
       .text("Year");

    svg.append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", marginLeft - 50) 
       .attr("x", - (lolli_height / 2))
       .style("text-anchor", "middle")
       .text("Employment Rate");

    const scale_val = svg.append("g")
       .attr("transform", "translate(" + (width - 200) + ", 10)");  

    scale_val.append("rect")
       .attr("x", 0)
       .attr("y", 0)
       .attr("width", 15)
       .attr("height", 15)
       .attr("fill", "green");

    scale_val.append("text")
       .attr("x", 20)
       .attr("y", 12)
       .text("Female Employment Rate");

    scale_val.append("rect")
       .attr("x", 0)
       .attr("y", 25)  
       .attr("width", 15)
       .attr("height", 15)
       .attr("fill", "orange");

    scale_val.append("text")
       .attr("x", 20)
       .attr("y", 42)  
       .text("Male Employment Rate");

    svg.selectAll(".male_stick")
        .data(maleFiltered)
        .join("line")
        .attr("x1", l => x(l.year) - 5) 
        .attr("x2", l => x(l.year) - 5)
        .attr("y1", y(0))
        .transition()
        .duration(1000)
        .attr("y2", l => y(l.value))
        .attr("stroke", "orange")
        .attr("stroke-width", 1)
        .style("cursor", "pointer");

    svg.selectAll(".male_round")
        .data(maleFiltered)
        .join("circle")
        .attr("cx", l => x(l.year) - 5)
        .transition()
        .duration(1000)
        .attr("cy", l => y(l.value))
        .attr("r", 5)
        .attr("fill", "orange")
        .style("cursor", "pointer");

    svg.selectAll(".female_stick")
        .data(femaleFiltered)
        .join("line")
        .attr("x1", l => x(l.year) + 5) 
        .attr("x2", l => x(l.year) + 5)
        .attr("y1", y(0))
        .transition()
        .duration(1000)
        .attr("y2", l => y(l.value))
        .attr("stroke", "green")
        .attr("stroke-width", 1)
        .style("cursor", "pointer");

    svg.selectAll(".female_round")
        .data(femaleFiltered)
        .join("circle")
        .attr("cx", l=> x(l.year) + 5)
        .transition()
        .duration(1000)
        .attr("cy", l => y(l.value))
        .attr("r", 5)
        .attr("fill", "green")
        .style("cursor", "pointer");

        console.log('trace: drawLollipopChart()');
}
