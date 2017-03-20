d3.csv('bivarscat.csv',function (data) {
// CSV section
  var body = d3.select('body')
  var selectData = [ { "text" : "ZIP CODE" },
                     { "text" : "TIME" },
					 { "text" : "LATITUDE" },
					 { "text" : "LONGITUDE" },
					 { "text" : "NUMBER OF PERSONS INJURED" },
					 { "text" : "NUMBER OF PERSONS KILLED" },
					 { "text" : "NUMBER OF PEDESTRIANS INJURED" },
					 { "text" : "NUMBER OF PEDESTRIANS KILLED" },
					 { "text" : "NUMBER OF CYCLIST INJURED" },
					 { "text" : "NUMBER OF CYCLIST KILLED" },
					 { "text" : "NUMBER OF MOTORIST INJURED" },
					 { "text" : "NUMBER OF MOTORIST KILLED" },
					 
                   ]

  var span = body.append('span')
    .text('Select X-Axis variable: ')
  var yInput = body.append('select')
      .attr('id','xSelect')
      .on('change',xChange)
    .selectAll('option')
      .data(selectData)
      .enter()
    .append('option')
      .attr('value', function (d) { return d.text })
      .text(function (d) { return d.text ;})
  body.append('br')

  var span = body.append('span')
      .text('Select Y-Axis variable: ')
  var yInput = body.append('select')
      .attr('id','ySelect')
      .on('change',yChange)
    .selectAll('option')
      .data(selectData)
      .enter()
    .append('option')
      .attr('value', function (d) { return d.text })
      .text(function (d) { return d.text ;})
  body.append('br')

  var body = d3.select('body')
  var margin = { top: 50, right: 50, bottom: 50, left: 50 }
  var h = 750 - margin.top - margin.bottom
  var w = 750 - margin.left - margin.right
  var colorScale = d3.scale.category20()
  var xScale = d3.scale.linear()
    .domain([
      d3.min([0,d3.min(data,function (d) { return d['ZIP CODE'] })]),
      d3.max([0,d3.max(data,function (d) { return d['ZIP CODE'] })])
      ])
    .range([0,w])
  var yScale = d3.scale.linear()
    .domain([
      d3.min([0,d3.min(data,function (d) { return d['ZIP CODE'] })]),
      d3.max([0,d3.max(data,function (d) { return d['ZIP CODE'] })])
      ])
    .range([h,0])
  var svg = body.append('svg')
      .attr('height',h + margin.top + margin.bottom)
      .attr('width',w + margin.left + margin.right)
    .append('g')
      .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
  
  var xAxis = d3.svg.axis()
    .scale(xScale)

    .ticks(10)
    .orient('bottom')
  
  var yAxis = d3.svg.axis()
    .scale(yScale)
   
    .ticks(10)
    .orient('left')
  
  var circles = svg.selectAll('circle')
      .data(data)
      .enter()
    .append('circle')
      .attr('cx',function (d) { return xScale(d['ZIP CODE']) })
      .attr('cy',function (d) { return yScale(d['ZIP CODE']) })
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
  svg.append('g')
      .attr('class','axis')
      .attr('id','xAxis')
      .attr('transform', 'translate(0,' + h + ')')
      .call(xAxis)
    .append('text') 
      .attr('id','xAxisLabel')
      .attr('y',-10)
      .attr('x',w)
      .attr('dy','.71em')
      .style('text-anchor','end')
      .text('ZIP CODE')
  
  svg.append('g')
      .attr('class','axis')
      .attr('id','yAxis')
      .call(yAxis)
    .append('text') 
      .attr('id', 'yAxisLabel')
      .attr('transform','rotate(-90)')
      .attr('x',0)
      .attr('y',5)
      .attr('dy','.71em')
      .style('text-anchor','end')
      .text('ZIP CODE')

  function yChange() {
    var value = this.value 
    yScale 
      .domain([
        d3.min([0,d3.min(data,function (d) { return d[value] })]),
        d3.max([0,d3.max(data,function (d) { return d[value] })])
        ])
    yAxis.scale(yScale) 
    d3.select('#yAxis') 
     
      .call(yAxis)
    d3.select('#yAxisLabel') 
      .text(value)    
    d3.selectAll('circle') 
     
        .attr('cy',function (d) { return yScale(d[value]) })
  }

  function xChange() {
    var value = this.value 
    xScale 
      .domain([
        d3.min([0,d3.min(data,function (d) { return d[value] })]),
        d3.max([0,d3.max(data,function (d) { return d[value] })])
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