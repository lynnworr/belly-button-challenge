function demoInfo(sample)
{
  console.log(sample)

    d3.json("samples.json").then((data) => {
        let metaData = data.metadata;
        
        let result = metaData.filter(sampleResult => sampleResult.id == sample);

        let resultData = result[0];

        console.log(resultData);

        d3.select("#sample-metadata").html("");

        Object.entries(resultData).forEach(([key, value]) => {
            d3.select("#sample-metadata")
              .append("h5").text(`${key}: ${value}`);

        });

    });
}

function buildBarChart(sample)

{
  d3.json("samples.json").then((data) => {

    let sampleData = data.samples;

    let result = sampleData.filter(sampleResult => sampleResult.id == sample);

    let resultData = result[0];

    console.log(resultData);

    let otu_ids = resultData.otu_ids;
    let otu_labels = resultData.otu_labels;
    let sample_values = resultData.sample_values;
    
    //console.log(otu_ids);
    //console.log(otu_lables);
    //console.log(sample_values);

    let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
    let xValues = sample_values.slice(0, 10);
    let textLabels = otu_labels.slice(0, 10);

    let barChart = {
      y: yticks.reverse(),
      x: xValues.reverse(),
      text: textLabels.reverse(),
      type: "bar",
      orientation: "h",
    }
    
    let layout = {
      title: "Top 10 Belly Button Bacteria"
    };

    Plotly.newPlot("bar", [barChart], layout);
  });

}

function buildBubbleChart(sample)
{
  d3.json("samples.json").then((data) => {

    let sampleData = data.samples;

    let result = sampleData.filter(sampleResult => sampleResult.id == sample);

    let resultData = result[0];
    console.log(resultData);

    let otu_ids = resultData.otu_ids;
    let otu_lables = resultData.otu_lables;

    let sample_values = resultData.sample_values;
    //console.log(otu_ids);
    //console.log(otu_lables);
    //console.log(sample_values);

  
    let bubbleChart = {
      y: sample_values,
      x: otu_ids,
      text: otu_lables,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
      
      }
    }
    
    let layout = {
      title: "Bacteria Cultures Per Sample",
      hovermode: "closest",
      xaxis: {title: "OTU ID"}
    };

    Plotly.newPlot("bubble", [bubbleChart], layout);

  });
}

function initialize()
{


  var select = d3.select("#selDataset")

  d3.json("samples.json").then((data) => {
    let sampleNames = data.names;
    

  sampleNames.forEach((sample) => {
    select.append("option")
      .text(sample)
      .property("value", sample);
  });

  let sample1 = sampleNames[0];

    demoInfo(sample1);

    buildBarChart(sample1);

    buildBubbleChart(sample1);
});

  


}


function optionChanged(item)

  {
    demoInfo(item);

    buildBarChart(item);

    buildBubbleChart(item);
  }


initialize();

