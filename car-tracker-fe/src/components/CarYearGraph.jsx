import { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';

export default function CarYearGraph() {
  const [carData, setCarData] = useState(null);
  const chartRef = useRef();
  useEffect(() => {
    fetch('/random_car_data.json')
      .then((response) => response.json())
      .then((data) => {
        setCarData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Render the bar graph
  useEffect(() => {
    if (!carData) return;

    // Calculate frequencies
    const frequencies = d3.rollup(
      carData,
      (v) => v.length,
      (d) => d.year
    );

    const yearData = Array.from(frequencies, ([year, count]) => ({
      year,
      count,
    }));

    // Dimensions
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Clear existing chart
    d3.select(chartRef.current).selectAll('*').remove();

    // Create SVG canvas
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set up scales
    const x = d3
      .scaleBand()
      .domain(yearData.map((d) => d.year))
      .range([0, width])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(yearData, (d) => d.count)])
      .nice()
      .range([height, 0]);

    // Add X-axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Add Y-axis
    svg.append('g').call(d3.axisLeft(y));

    // Draw bars
    svg
      .selectAll('.bar')
      .data(yearData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.year))
      .attr('y', (d) => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.count))
      .attr('fill', 'steelblue');

    // Add labels to bars
    svg
      .selectAll('.label')
      .data(yearData)
      .enter()
      .append('text')
      .attr('x', (d) => x(d.year) + x.bandwidth() / 2)
      .attr('y', (d) => y(d.count) - 5)
      .attr('text-anchor', 'middle')
      .text((d) => d.count);
  }, [carData]);

  return <div ref={chartRef}></div>;
}
