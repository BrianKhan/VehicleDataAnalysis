d3.csv('f1f3.csv',function (data) {
// CSV section
  var body = d3.select('body')
  

  // Variables
  var body = d3.select('body')
  var margin = { top: 50, right: 50, bottom: 50, left: 50 }
  var h = 750 - margin.top - margin.bottom
  var w = 750 - margin.left - margin.right
  //var formatPercent = d3.format('.2%')
  // Scales
  var colorScale = d3.scale.category20()
  var xScale = d3.scale.linear()
    .domain([
      d3.min([-6,d3.min(data,function (d) { return d['F1'] })]),
      d3.max([-6,25])
      ])
    .range([-6,w])
  var yScale = d3.scale.linear()
    .domain([
      d3.min([-6,d3.min(data,function (d) { return d['F3'] })]),
      d3.max([-6,20])
      ])
    .range([h,0])
	//window.alert(([0,d3.max(data,function (d) { return d['LATITUDE'] })]))
  // SVG
  var svg = body.append('svg')
      .attr('height',h + margin.top + margin.bottom)
      .attr('width',w + margin.left + margin.right)
    .append('g')
      .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
  // X-axis
  var xAxis = d3.svg.axis()
    .scale(xScale)
   // .tickFormat(formatPercent)
    .ticks(10)
    .orient('bottom')
  // Y-axis
  var yAxis = d3.svg.axis()
    .scale(yScale)
    //.tickFormat(formatPercent)
    .ticks(10)
    .orient('left')
  // Circles
  var circles = svg.selectAll('circle')
      .data(data)
      .enter()
    .append('circle')
      .attr('cx',function (d) { return xScale(d['F1']) })
      .attr('cy',function (d) { return yScale(d['F3']) })
      .attr('r','10')
      .attr('stroke','black')
      .attr('stroke-width',1)
      .attr('fill',function (d,i) { return colorScale(i) })
      .on('mouseover', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',20)
          .attr('stroke-width',3)
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',10)
          .attr('stroke-width',1)
      })
   // .append('title') // Tooltip
  //    .text(function (d) { return d.variable +
   //                        '\nReturn: ' + formatPercent(d['Annualized Return']) +
  //                         '\nStd. Dev.: ' + formatPercent(d['Annualized Standard Deviation']) +
  //                         '\nMax Drawdown: ' + formatPercent(d['Maximum Drawdown']) })
  // X-axis
  svg.append('g')
      .attr('class','axis')
      .attr('id','xAxis')
      .attr('transform', 'translate(0,' + h + ')')
      .call(xAxis)
    .append('text') // X-axis Label
      .attr('id','xAxisLabel')
      .attr('y',-10)
      .attr('x',w)
      .attr('dy','.71em')
      .style('text-anchor','end')
      .text('F1')
  // Y-axis
  svg.append('g')
      .attr('class','axis')
      .attr('id','yAxis')
      .call(yAxis)
    .append('text') // y-axis Label
      .attr('id', 'yAxisLabel')
      .attr('transform','rotate(-90)')
      .attr('x',0)
      .attr('y',5)
      .attr('dy','.71em')
      .style('text-anchor','end')
      .text('F3')

  function yChange() {
    var value = this.value // get the new y value
    yScale // change the yScale
      .domain([
        d3.min([-6,d3.min(data,function (d) { return d[value] })]),
        d3.max([-6,d3.max(data,function (d) { return d[value] })])
        ])
    yAxis.scale(yScale) // change the yScale
    d3.select('#yAxis') // redraw the yAxis
     // .transition().duration(1)
      .call(yAxis)
    d3.select('#yAxisLabel') // change the yAxisLabel
      .text(value)    
    d3.selectAll('circle') // move the circles
     // .transition().duration(1)
      //.delay(function (d,i) { return i*100})
        .attr('cy',function (d) { return yScale(d[value]) })
  }

  function xChange() {
    var value = this.value // get the new x value
    xScale // change the xScale
      .domain([
        d3.min([-6,d3.min(data,function (d) { return d[value] })]),
        d3.max([-6,d3.max(data,function (d) { return d[value] })])
        ])
    xAxis.scale(xScale) // change the xScale
    d3.select('#xAxis') // redraw the xAxis
      //.transition().duration(1)
      .call(xAxis)
    d3.select('#xAxisLabel') // change the xAxisLabel
     // .transition().duration(1)
      .text(value)
    d3.selectAll('circle') // move the circles
      .transition().duration(1)
     // .delay(function (d,i) { return i*1})
        .attr('cx',function (d) { return xScale(d[value]) })
  }
})