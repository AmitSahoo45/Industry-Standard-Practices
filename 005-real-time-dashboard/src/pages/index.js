"use client";

import { Card, Text, Subtitle, Title, BarChart } from '@tremor/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const TINYBIRD_HOST = process.env.NEXT_PUBLIC_TINYBIRD_HOST;
const TINYBIRD_TOKEN = process.env.NEXT_PUBLIC_TINYBIRD_TOKEN;

export default function Dashboard() {
  const [ranking_of_top_organizations_creating_signatures, setData] = useState([{
    "organization": "",
    "org_total": 0,
  }]);

  const [latency, setLatency] = useState(0);

  const dateFrom = new Date(2023, 0, 1);
  const dateTo = new Date(2023, 12, 31);

  // Format for passing as a query parameter
  const dateFromFormatted = dateFrom.toISOString().substring(0, 10);
  const dateToFormatted = dateTo.toISOString().substring(0, 10);

  // Constructing the URL for fetching data, including host, token, and date range
  const topRankingOfOrganizationsCreatingSignaturesURL = `https://api.tinybird.co/endpoint/t_93a8e6044ab3447da424da984f04b3b3?token=p.eyJ1IjogImIwZDlkZDI2LWI5Y2UtNDkxYS1iNDVhLTZlZjI5OTNlNDQ5ZCIsICJpZCI6ICI3MmY1MjNjOC00MWJiLTQ3MWYtODRhMS0yYzVkYzhiYTM1MTYiLCAiaG9zdCI6ICJldV9zaGFyZWQifQ.n8lD3hCW6ah7cDgHV6Gni0q4d31pq_Vi42cha3FNjas&date_from=${dateFromFormatted}&date_to=${dateToFormatted}`;

  // Function to fetch data from Tinybird URL
  const fetchTinybirdUrl = async (fetchUrl, setData, setLatency) => {
    let url = new URL(`https://api.tinybird.co/v0/pipes/ranking_of_top_organizations_creating_signatures.json`)
    // url.searchParams.append('limit', '10')
    url.searchParams.append('date_from', dateFromFormatted);
    url.searchParams.append('date_to', dateToFormatted);
    const { data: jsonData } = await axios.get(url, { headers: { Authorization: `Bearer ${TINYBIRD_TOKEN}` } })

    setData(jsonData.data);
    // setLatency(jsonData.statistics.elapsed)
    console.log("TINYBIRD_HOST", topRankingOfOrganizationsCreatingSignaturesURL)
  };

  useEffect(() => {
    // Calling the fetchTinybirdUrl function with the URL and state setter function
    // The function fetches the data and updates the state
    fetchTinybirdUrl(topRankingOfOrganizationsCreatingSignaturesURL, setData, setLatency)
  }, [topRankingOfOrganizationsCreatingSignaturesURL]);

  return (
    <Card>
      <Title>Top Organizations Creating Signatures</Title>
      <Subtitle>
        Ranked from highest to lowest
      </Subtitle>
      <BarChart
        className="mt-6"
        data={ranking_of_top_organizations_creating_signatures}
        index="organization"
        categories={["org_total"]}
        colors={["blue", "red"]}
        yAxisWidth={48}
        showXAxis={true}
      />
      <Text>Latency: {latency * 1000} ms</Text>
    </Card>
  );
}