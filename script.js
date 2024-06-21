const data = [
  { country: "Malaysia", total: 248298, male: 173505, female: 74793 },
  { country: "Arab Saudi", total: 35028, male: 9417, female: 25610 },
  { country: "Taiwan", total: 33425, male: 11124, female: 22310 },
  { country: "Hong Kong", total: 20076, male: 179, female: 19897 },
  { country: "Singapura", total: 13794, male: 1643, female: 12150 },
  { country: "Korea Selatan", total: 10711, male: 9589, female: 1122 },
  { country: "Jepang", total: 7844, male: 6498, female: 1346 },
  { country: "Brunei Darussalam", total: 6391, male: 4108, female: 2284 },
  { country: "Uni Emirat Arab", total: 3249, male: 368, female: 2881 },
  { country: "Amerika Serikat", total: 2012, male: 1478, female: 534 },
  { country: "Lainnya", total: 20287, male: 11465, female: 8822 },
];

// Function to sort data by total migration
function sortData(data) {
  return data.sort((a, b) => b.total - a.total);
}

// Sorted data
const sortedData = sortData(data);

const margin = { top: 50, right: 50, bottom: 100, left: 100 };
const width = 900 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

const svg = d3
  .select("#migrasi-luar-negeri")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const maxValue = Math.max(
  Math.abs(d3.min(sortedData, (d) => -d.female)),
  Math.abs(d3.max(sortedData, (d) => d.male))
);

const x = d3
  .scaleLinear()
  .domain([-maxValue, maxValue])
  .nice()
  .range([0, width]);

const y = d3
  .scaleBand()
  .domain(sortedData.map((d) => d.country).reverse())
  .range([height, 0])
  .padding(0.1);

const color = d3
  .scaleOrdinal()
  .domain(["male", "female"])
  .range(["#AD88C6", "#7469B6"]);

// Append bars for male
svg
  .append("g")
  .selectAll("rect")
  .data(sortedData)
  .enter()
  .append("rect")
  .attr("x", (d) => x(0))
  .attr("y", (d) => y(d.country))
  .attr("width", (d) => x(d.male) - x(0))
  .attr("height", y.bandwidth())
  .attr("fill", color("male"))
  .on("mouseover", function (event, d) {
    const tooltip = d3.select("#tooltip");
    tooltip
      .style("opacity", 1)
      .html(`<strong>${d.country}</strong><br>Male: ${d.male}`)
      .style("left", event.pageX + 10 + "px")
      .style("top", event.pageY - 15 + "px");
    d3.select(this).attr("opacity", 0.8);
  })
  .on("mouseout", function () {
    d3.select("#tooltip").style("opacity", 0);
    d3.select(this).attr("opacity", 1);
  });

// Append bars for female
svg
  .append("g")
  .selectAll("rect")
  .data(sortedData)
  .enter()
  .append("rect")
  .attr("x", (d) => x(-d.female))
  .attr("y", (d) => y(d.country))
  .attr("width", (d) => x(0) - x(-d.female))
  .attr("height", y.bandwidth())
  .attr("fill", color("female"))
  .on("mouseover", function (event, d) {
    const tooltip = d3.select("#tooltip");
    tooltip
      .style("opacity", 1)
      .html(`<strong>${d.country}</strong><br>Female: ${d.female}`)
      .style("left", event.pageX + 10 + "px")
      .style("top", event.pageY - 15 + "px");
    d3.select(this).attr("opacity", 0.8);
  })
  .on("mouseout", function () {
    d3.select("#tooltip").style("opacity", 0);
    d3.select(this).attr("opacity", 1);
  });

svg
  .append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0,${height})`)
  .call(
    d3
      .axisBottom(x)
      .ticks(10)
      .tickFormat((d) => Math.abs(d))
  );

svg.append("g").attr("class", "y-axis").call(d3.axisLeft(y));

// Legenda
const legend = svg
  .append("g")
  .attr("font-family", "sans-serif")
  .attr("font-size", 10)
  .attr("text-anchor", "end")
  .attr("transform", `translate(${width},${-margin.top})`)
  .selectAll("g")
  .data(color.domain().slice().reverse())
  .enter()
  .append("g")
  .attr("transform", (d, i) => `translate(0,${i * 20})`);

legend
  .append("rect")
  .attr("x", -19)
  .attr("width", 19)
  .attr("height", 19)
  .attr("fill", color);

legend
  .append("text")
  .attr("x", -24)
  .attr("y", 9.5)
  .attr("dy", "0.32em")
  .text((d) => d);

// New stacked bar chart for migration data

const migrationData = [
  {
    province: "Aceh",
    inMale: 20030,
    inFemale: 18609,
    outMale: 18931,
    outFemale: 17457,
  },
  {
    province: "Sumatera Utara",
    inMale: 93064,
    inFemale: 89089,
    outMale: 101811,
    outFemale: 108819,
  },
  {
    province: "Sumatera Barat",
    inMale: 93229,
    inFemale: 85620,
    outMale: 47784,
    outFemale: 45397,
  },
  {
    province: "Riau",
    inMale: 65720,
    inFemale: 66109,
    outMale: 78209,
    outFemale: 74774,
  },
  {
    province: "Jambi",
    inMale: 26682,
    inFemale: 26241,
    outMale: 32556,
    outFemale: 28120,
  },
  {
    province: "Sumatera Selatan",
    inMale: 43569,
    inFemale: 43328,
    outMale: 56639,
    outFemale: 57076,
  },
  {
    province: "Bengkulu",
    inMale: 17390,
    inFemale: 17454,
    outMale: 14105,
    outFemale: 14791,
  },
  {
    province: "Lampung",
    inMale: 62088,
    inFemale: 65553,
    outMale: 52113,
    outFemale: 51697,
  },
  {
    province: "Kep. Bangka Belitung",
    inMale: 15219,
    inFemale: 15151,
    outMale: 10311,
    outFemale: 8056,
  },
  {
    province: "Kepulauan Riau",
    inMale: 44567,
    inFemale: 49632,
    outMale: 42221,
    outFemale: 40943,
  },
  {
    province: "DKI Jakarta",
    inMale: 95316,
    inFemale: 117140,
    outMale: 421981,
    outFemale: 375487,
  },
  {
    province: "Jawa Barat",
    inMale: 357565,
    inFemale: 358905,
    outMale: 258700,
    outFemale: 247869,
  },
  {
    province: "Jawa Tengah",
    inMale: 433103,
    inFemale: 345421,
    outMale: 201997,
    outFemale: 209894,
  },
  {
    province: "DI Yogyakarta",
    inMale: 87293,
    inFemale: 91592,
    outMale: 50895,
    outFemale: 49753,
  },
  {
    province: "Jawa Timur",
    inMale: 195125,
    inFemale: 169229,
    outMale: 143492,
    outFemale: 137461,
  },
  {
    province: "Banten",
    inMale: 117810,
    inFemale: 123177,
    outMale: 120426,
    outFemale: 112044,
  },
  {
    province: "Bali",
    inMale: 23996,
    inFemale: 25174,
    outMale: 43190,
    outFemale: 30876,
  },
  {
    province: "Nusa Tenggara Barat",
    inMale: 116723,
    inFemale: 45926,
    outMale: 16141,
    outFemale: 14793,
  },
  {
    province: "Nusa Tenggara Timur",
    inMale: 59627,
    inFemale: 49750,
    outMale: 30066,
    outFemale: 27101,
  },
  {
    province: "Kalimantan Barat",
    inMale: 36656,
    inFemale: 21985,
    outMale: 24650,
    outFemale: 19040,
  },
  {
    province: "Kalimantan Tengah",
    inMale: 39034,
    inFemale: 32005,
    outMale: 43723,
    outFemale: 31161,
  },
  {
    province: "Kalimantan Selatan",
    inMale: 30992,
    inFemale: 28688,
    outMale: 29501,
    outFemale: 24364,
  },
  {
    province: "Kalimantan Timur",
    inMale: 53095,
    inFemale: 50685,
    outMale: 73258,
    outFemale: 53826,
  },
  {
    province: "Kalimantan Utara",
    inMale: 13341,
    inFemale: 12803,
    outMale: 14580,
    outFemale: 11496,
  },
  {
    province: "Sulawesi Utara",
    inMale: 15560,
    inFemale: 15770,
    outMale: 16024,
    outFemale: 15552,
  },
  {
    province: "Sulawesi Tengah",
    inMale: 23883,
    inFemale: 21794,
    outMale: 21594,
    outFemale: 22488,
  },
  {
    province: "Sulawesi Selatan",
    inMale: 80569,
    inFemale: 74732,
    outMale: 78249,
    outFemale: 75422,
  },
  {
    province: "Sulawesi Tenggara",
    inMale: 41014,
    inFemale: 33726,
    outMale: 18321,
    outFemale: 17602,
  },
  {
    province: "Gorontalo",
    inMale: 9838,
    inFemale: 10516,
    outMale: 6072,
    outFemale: 6783,
  },
  {
    province: "Sulawesi Barat",
    inMale: 17897,
    inFemale: 16567,
    outMale: 11545,
    outFemale: 12538,
  },
  {
    province: "Maluku",
    inMale: 13692,
    inFemale: 13317,
    outMale: 15469,
    outFemale: 14282,
  },
  {
    province: "Maluku Utara",
    inMale: 7700,
    inFemale: 7436,
    outMale: 7905,
    outFemale: 7380,
  },
  {
    province: "Papua Barat",
    inMale: 18002,
    inFemale: 17311,
    outMale: 17995,
    outFemale: 13659,
  },
  {
    province: "Papua",
    inMale: 21156,
    inFemale: 17982,
    outMale: 40714,
    outFemale: 28680,
  },
];

// Fungsi untuk membuat chart
function createMigrationChart(data, chartId, title) {
  // Mengurutkan data berdasarkan total migrasi (male + female)
  data.sort((a, b) => b.male + b.female - (a.male + a.female));

  const margin = { top: 20, right: 30, bottom: 60, left: 150 };
  const width = 850 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  const svg = d3
    .select(chartId)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const y = d3
    .scaleBand()
    .domain(data.map((d) => d.province))
    .range([0, height])
    .padding(0.1);

  const x = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.male + d.female)])
    .nice()
    .range([0, width]);

  const color = d3
    .scaleOrdinal()
    .domain(["male", "female"])
    .range(["#102C57", "#1679AB"]);

  const stack = d3
    .stack()
    .keys(["male", "female"])
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);

  const stackedData = stack(data);

  svg
    .append("g")
    .selectAll("g")
    .data(stackedData)
    .enter()
    .append("g")
    .attr("fill", (d) => color(d.key))
    .selectAll("rect")
    .data((d) => d)
    .enter()
    .append("rect")
    .attr("y", (d) => y(d.data.province))
    .attr("x", (d) => x(d[0]))
    .attr("height", y.bandwidth())
    .attr("width", (d) => x(d[1]) - x(d[0]))
    .on("mouseover", function (event, d) {
      const gender = d3.select(this.parentNode).datum().key;
      const tooltip = d3.select("#tooltip");
      tooltip
        .style("opacity", 1)
        .html(
          `<strong>${d.data.province}</strong><br>${gender}: ${d[1] - d[0]}`
        )
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 15 + "px");
      d3.select(this).attr("opacity", 0.8);
    })
    .on("mouseout", function () {
      d3.select("#tooltip").style("opacity", 0);
      d3.select(this).attr("opacity", 1);
    });

  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

  svg.append("g").attr("class", "y-axis").call(d3.axisLeft(y));

  // Legenda
  const legend = svg
    .append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "end")
    .attr("transform", `translate(${width - 20},${height - 55})`)
    .selectAll("g")
    .data(color.domain().slice().reverse())
    .enter()
    .append("g")
    .attr("transform", (d, i) => `translate(0,${i * 20})`);

  legend
    .append("rect")
    .attr("x", 0)
    .attr("width", 19)
    .attr("height", 19)
    .attr("fill", color);

  legend
    .append("text")
    .attr("x", -5)
    .attr("y", 9.5)
    .attr("dy", "0.32em")
    .text((d) => d);

  // Judul chart
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text(title);
}

// Memisahkan data untuk migrasi masuk dan keluar
const migrationInData = migrationData.map((d) => ({
  province: d.province,
  male: d.inMale,
  female: d.inFemale,
}));

const migrationOutData = migrationData.map((d) => ({
  province: d.province,
  male: d.outMale,
  female: d.outFemale,
}));

// Membuat chart untuk migrasi masuk
createMigrationChart(migrationInData, "#migration-in-chart", "Migrasi Masuk");

// Membuat chart untuk migrasi keluar
createMigrationChart(
  migrationOutData,
  "#migration-out-chart",
  "Migrasi Keluar"
);

// Data tingkat pendidikan
const educationData = [
  {
    province: "Aceh",
    "Tidak/Belum Pernah Bersekolah": 1122,
    "Belum/Tidak Tamat SD/ Sederajat": 4370,
    "SD/ Sederajat": 4591,
    "SMP/ Sederajat": 6037,
    "SMA/ Sederajat": 15345,
    "Diploma I/II/III": 1305,
    "Diploma IV/S1": 4758,
    "Profesi/S2/S3": 1110,
  },
  {
    province: "Sumatera Utara",
    "Tidak/Belum Pernah Bersekolah": 6679,
    "Belum/Tidak Tamat SD/ Sederajat": 24844,
    "SD/ Sederajat": 20045,
    "SMP/ Sederajat": 24377,
    "SMA/ Sederajat": 80094,
    "Diploma I/II/III": 6665,
    "Diploma IV/S1": 17975,
    "Profesi/S2/S3": 1474,
  },
  {
    province: "Sumatera Barat",
    "Tidak/Belum Pernah Bersekolah": 6799,
    "Belum/Tidak Tamat SD/ Sederajat": 24922,
    "SD/ Sederajat": 25640,
    "SMP/ Sederajat": 28296,
    "SMA/ Sederajat": 68172,
    "Diploma I/II/III": 5640,
    "Diploma IV/S1": 17737,
    "Profesi/S2/S3": 1643,
  },
  {
    province: "Riau",
    "Tidak/Belum Pernah Bersekolah": 5633,
    "Belum/Tidak Tamat SD/ Sederajat": 18185,
    "SD/ Sederajat": 22122,
    "SMP/ Sederajat": 23414,
    "SMA/ Sederajat": 46764,
    "Diploma I/II/III": 3109,
    "Diploma IV/S1": 11609,
    "Profesi/S2/S3": 992,
  },
  {
    province: "Jambi",
    "Tidak/Belum Pernah Bersekolah": 1836,
    "Belum/Tidak Tamat SD/ Sederajat": 6483,
    "SD/ Sederajat": 9361,
    "SMP/ Sederajat": 10433,
    "SMA/ Sederajat": 17262,
    "Diploma I/II/III": 1481,
    "Diploma IV/S1": 5300,
    "Profesi/S2/S3": 767,
  },
  {
    province: "Sumatera Selatan",
    "Tidak/Belum Pernah Bersekolah": 3029,
    "Belum/Tidak Tamat SD/ Sederajat": 11413,
    "SD/ Sederajat": 14825,
    "SMP/ Sederajat": 14169,
    "SMA/ Sederajat": 31022,
    "Diploma I/II/III": 2842,
    "Diploma IV/S1": 8910,
    "Profesi/S2/S3": 688,
  },
  {
    province: "Bengkulu",
    "Tidak/Belum Pernah Bersekolah": 1315,
    "Belum/Tidak Tamat SD/ Sederajat": 4212,
    "SD/ Sederajat": 5201,
    "SMP/ Sederajat": 5654,
    "SMA/ Sederajat": 11932,
    "Diploma I/II/III": 1512,
    "Diploma IV/S1": 4522,
    "Profesi/S2/S3": 497,
  },
  {
    province: "Lampung",
    "Tidak/Belum Pernah Bersekolah": 4896,
    "Belum/Tidak Tamat SD/ Sederajat": 15492,
    "SD/ Sederajat": 23556,
    "SMP/ Sederajat": 28101,
    "SMA/ Sederajat": 43990,
    "Diploma I/II/III": 2886,
    "Diploma IV/S1": 7587,
    "Profesi/S2/S3": 1133,
  },
  {
    province: "Kep. Bangka Belitung",
    "Tidak/Belum Pernah Bersekolah": 1106,
    "Belum/Tidak Tamat SD/ Sederajat": 3761,
    "SD/ Sederajat": 5592,
    "SMP/ Sederajat": 4936,
    "SMA/ Sederajat": 8277,
    "Diploma I/II/III": 1178,
    "Diploma IV/S1": 5023,
    "Profesi/S2/S3": 497,
  },
  {
    province: "Kepulauan Riau",
    "Tidak/Belum Pernah Bersekolah": 2660,
    "Belum/Tidak Tamat SD/ Sederajat": 6957,
    "SD/ Sederajat": 7760,
    "SMP/ Sederajat": 10834,
    "SMA/ Sederajat": 48903,
    "Diploma I/II/III": 4346,
    "Diploma IV/S1": 11792,
    "Profesi/S2/S3": 947,
  },
  {
    province: "DKI Jakarta",
    "Tidak/Belum Pernah Bersekolah": 546,
    "Belum/Tidak Tamat SD/ Sederajat": 19435,
    "SD/ Sederajat": 22034,
    "SMP/ Sederajat": 31162,
    "SMA/ Sederajat": 82133,
    "Diploma I/II/III": 11203,
    "Diploma IV/S1": 35149,
    "Profesi/S2/S3": 2794,
  },
  {
    province: "Jawa Barat",
    "Tidak/Belum Pernah Bersekolah": 24684,
    "Belum/Tidak Tamat SD/ Sederajat": 71396,
    "SD/ Sederajat": 83637,
    "SMP/ Sederajat": 93213,
    "SMA/ Sederajat": 293573,
    "Diploma I/II/III": 45194,
    "Diploma IV/S1": 97194,
    "Profesi/S2/S3": 7579,
  },
  {
    province: "Jawa Tengah",
    "Tidak/Belum Pernah Bersekolah": 21743,
    "Belum/Tidak Tamat SD/ Sederajat": 88998,
    "SD/ Sederajat": 174528,
    "SMP/ Sederajat": 176219,
    "SMA/ Sederajat": 247924,
    "Diploma I/II/III": 15820,
    "Diploma IV/S1": 47441,
    "Profesi/S2/S3": 5852,
  },
  {
    province: "DI Yogyakarta",
    "Tidak/Belum Pernah Bersekolah": 4810,
    "Belum/Tidak Tamat SD/ Sederajat": 12588,
    "SD/ Sederajat": 12806,
    "SMP/ Sederajat": 17289,
    "SMA/ Sederajat": 92580,
    "Diploma I/II/III": 6883,
    "Diploma IV/S1": 27491,
    "Profesi/S2/S3": 4438,
  },
  {
    province: "Jawa Timur",
    "Tidak/Belum Pernah Bersekolah": 10145,
    "Belum/Tidak Tamat SD/ Sederajat": 39381,
    "SD/ Sederajat": 66321,
    "SMP/ Sederajat": 81436,
    "SMA/ Sederajat": 127556,
    "Diploma I/II/III": 7466,
    "Diploma IV/S1": 29228,
    "Profesi/S2/S3": 2822,
  },
  {
    province: "Banten",
    "Tidak/Belum Pernah Bersekolah": 7910,
    "Belum/Tidak Tamat SD/ Sederajat": 24474,
    "SD/ Sederajat": 24332,
    "SMP/ Sederajat": 33063,
    "SMA/ Sederajat": 94126,
    "Diploma I/II/III": 12444,
    "Diploma IV/S1": 41239,
    "Profesi/S2/S3": 3399,
  },
  {
    province: "Bali",
    "Tidak/Belum Pernah Bersekolah": 2142,
    "Belum/Tidak Tamat SD/ Sederajat": 3171,
    "SD/ Sederajat": 6074,
    "SMP/ Sederajat": 7473,
    "SMA/ Sederajat": 21813,
    "Diploma I/II/III": 2281,
    "Diploma IV S1": 5437,
    "Profesi/S2/S3": 780,
  },
  {
    province: "Nusa Tenggara Barat",
    "Tidak/Belum Pernah Bersekolah": 4809,
    "Belum/Tidak Tamat SD/ Sederajat": 16315,
    "SD/ Sederajat": 41536,
    "SMP/ Sederajat": 32960,
    "SMA/ Sederajat": 47509,
    "Diploma I/II/III": 3250,
    "Diploma IV/S1": 14364,
    "Profesi/S2/S3": 1905,
  },
  {
    province: "Nusa Tenggara Timur",
    "Tidak/Belum Pernah Bersekolah": 4506,
    "Belum/Tidak Tamat SD/ Sederajat": 14491,
    "SD/ Sederajat": 24565,
    "SMP/ Sederajat": 12582,
    "SMA/ Sederajat": 28653,
    "Diploma I/II/III": 3112,
    "Diploma IV/S1": 20092,
    "Profesi/S2/S3": 1376,
  },
  {
    province: "Kalimantan Barat",
    "Tidak/Belum Pernah Bersekolah": 1395,
    "Belum/Tidak Tamat SD/ Sederajat": 7597,
    "SD/ Sederajat": 17885,
    "SMP/ Sederajat": 10886,
    "SMA/ Sederajat": 14325,
    "Diploma I/II/III": 1359,
    "Diploma IV/S1": 4241,
    "Profesi/S2/S3": 954,
  },
  {
    province: "Kalimantan Tengah",
    "Tidak/Belum Pernah Bersekolah": 2581,
    "Belum/Tidak Tamat SD/ Sederajat": 8120,
    "SD/ Sederajat": 18174,
    "SMP/ Sederajat": 14405,
    "SMA/ Sederajat": 18963,
    "Diploma I/II/III": 1701,
    "Diploma IV/S1": 6401,
    "Profesi/S2/S3": 694,
  },
  {
    province: "Kalimantan Selatan",
    "Tidak/Belum Pernah Bersekolah": 2594,
    "Belum/Tidak Tamat SD/ Sederajat": 8318,
    "SD/ Sederajat": 11954,
    "SMP/ Sederajat": 9566,
    "SMA/ Sederajat": 18411,
    "Diploma I/II/III": 1638,
    "Diploma IV/S1": 6510,
    "Profesi/S2/S3": 689,
  },
  {
    province: "Kalimantan Timur",
    "Tidak/Belum Pernah Bersekolah": 4476,
    "Belum/Tidak Tamat SD/ Sederajat": 11695,
    "SD/ Sederajat": 19424,
    "SMP/ Sederajat": 15601,
    "SMA/ Sederajat": 35063,
    "Diploma I/II/III": 3825,
    "Diploma IV/S1": 12309,
    "Profesi/S2/S3": 1386,
  },
  {
    province: "Kalimantan Utara",
    "Tidak/Belum Pernah Bersekolah": 1430,
    "Belum/Tidak Tamat SD/ Sederajat": 3024,
    "SD/ Sederajat": 5566,
    "SMP/ Sederajat": 4091,
    "SMA/ Sederajat": 6933,
    "Diploma I/II/III": 865,
    "Diploma IV/S1": 3948,
    "Profesi/S2/S3": 287,
  },
  {
    province: "Sulawesi Utara",
    "Tidak/Belum Pernah Bersekolah": 798,
    "Belum/Tidak Tamat SD/ Sederajat": 3624,
    "SD/ Sederajat": 3658,
    "SMP/ Sederajat": 4008,
    "SMA/ Sederajat": 13691,
    "Diploma I/II/III": 1120,
    "Diploma IV/S1": 3948,
    "Profesi/S2/S3": 483,
  },
  {
    province: "Sulawesi Tengah",
    "Tidak/Belum Pernah Bersekolah": 1777,
    "Belum/Tidak Tamat SD/ Sederajat": 5719,
    "SD/ Sederajat": 8469,
    "SMP/ Sederajat": 6657,
    "SMA/ Sederajat": 15620,
    "Diploma I/II/III": 1179,
    "Diploma IV/S1": 5596,
    "Profesi/S2/S3": 660,
  },
  {
    province: "Sulawesi Selatan",
    "Tidak/Belum Pernah Bersekolah": 7744,
    "Belum/Tidak Tamat SD/ Sederajat": 24861,
    "SD/ Sederajat": 35495,
    "SMP/ Sederajat": 22761,
    "SMA/ Sederajat": 45705,
    "Diploma I/II/III": 3771,
    "Diploma IV/S1": 13521,
    "Profesi/S2/S3": 1444,
  },
  {
    province: "Sulawesi Tenggara",
    "Tidak/Belum Pernah Bersekolah": 3738,
    "Belum/Tidak Tamat SD/ Sederajat": 11022,
    "SD/ Sederajat": 14172,
    "SMP/ Sederajat": 10661,
    "SMA/ Sederajat": 23501,
    "Diploma I/II/III": 2147,
    "Diploma IV/S1": 8445,
    "Profesi/S2/S3": 1054,
  },
  {
    province: "Gorontalo",
    "Tidak/Belum Pernah Bersekolah": 684,
    "Belum/Tidak Tamat SD/ Sederajat": 2946,
    "SD/ Sederajat": 4038,
    "SMP/ Sederajat": 2717,
    "SMA/ Sederajat": 7301,
    "Diploma I/II/III": 394,
    "Diploma IV/S1": 1975,
    "Profesi/S2/S3": 300,
  },
  {
    province: "Sulawesi Barat",
    "Tidak/Belum Pernah Bersekolah": 1679,
    "Belum/Tidak Tamat SD/ Sederajat": 5599,
    "SD/ Sederajat": 7631,
    "SMP/ Sederajat": 4932,
    "SMA/ Sederajat": 8581,
    "Diploma I/II/III": 1048,
    "Diploma IV/S1": 4632,
    "Profesi/S2/S3": 362,
  },
  {
    province: "Maluku",
    "Tidak/Belum Pernah Bersekolah": 731,
    "Belum/Tidak Tamat SD/ Sederajat": 2636,
    "SD/ Sederajat": 3124,
    "SMP/ Sederajat": 3035,
    "SMA/ Sederajat": 10545,
    "Diploma I/II/III": 1020,
    "Diploma IV/S1": 5242,
    "Profesi/S2/S3": 675,
  },
  {
    province: "Maluku Utara",
    "Tidak/Belum Pernah Bersekolah": 493,
    "Belum/Tidak Tamat SD/ Sederajat": 1689,
    "SD/ Sederajat": 2041,
    "SMP/ Sederajat": 1963,
    "SMA/ Sederajat": 5346,
    "Diploma I/II/III": 811,
    "Diploma IV/S1": 2464,
    "Profesi/S2/S3": 330,
  },
  {
    province: "Papua Barat",
    "Tidak/Belum Pernah Bersekolah": 1193,
    "Belum/Tidak Tamat SD/ Sederajat": 3197,
    "SD/ Sederajat": 4281,
    "SMP/ Sederajat": 5076,
    "SMA/ Sederajat": 13817,
    "Diploma I/II/III": 1644,
    "Diploma IV/S1": 5786,
    "Profesi/S2/S3": 319,
  },
  {
    province: "Papua",
    "Tidak/Belum Pernah Bersekolah": 1785,
    "Belum/Tidak Tamat SD/ Sederajat": 3705,
    "SD/ Sederajat": 4933,
    "SMP/ Sederajat": 5978,
    "SMA/ Sederajat": 15705,
    "Diploma I/II/III": 1575,
    "Diploma IV/S1": 5086,
    "Profesi/S2/S3": 371,
  },
];

// Menghitung total pendidikan untuk setiap provinsi
educationData.forEach((d) => {
  d.total = d3.sum(Object.values(d).filter((val) => typeof val === "number"));
});

// Mengurutkan berdasarkan total secara descending
educationData.sort((a, b) => b.total - a.total);

// Ambil 5 provinsi teratas
const top5EducationData = educationData.slice(0, 5);

// Fungsi untuk membuat grouped bar chart tingkat pendidikan
function createEducationChart(data) {
  const margin = { top: 35, right: 200, bottom: 100, left: 60 };
  const width = 1000 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  const svg = d3
    .select("#education-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const educationLevels = Object.keys(data[0]).filter(
    (key) => key !== "province" && key !== "total"
  );

  const x0 = d3
    .scaleBand()
    .domain(data.map((d) => d.province))
    .range([0, width])
    .padding(0.1);

  const x1 = d3
    .scaleBand()
    .domain(educationLevels)
    .range([0, x0.bandwidth()])
    .padding(0.05);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d3.max(educationLevels, (key) => d[key]))])
    .nice()
    .range([height, 0]);

  const color = d3
    .scaleOrdinal()
    .domain(educationLevels)
    .range([
      "#dab5ff",
      "#d0aaff",
      "#c99fff",
      "#bd8aff",
      "#a171ff",
      "#8f66ff",
      "#7b4fff",
      "#6836ff",
    ]);

  const provinces = svg
    .selectAll(".province")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "province")
    .attr("transform", (d) => `translate(${x0(d.province)},0)`);

  provinces
    .selectAll("rect")
    .data((d) => educationLevels.map((key) => ({ key, value: d[key] })))
    .enter()
    .append("rect")
    .attr("x", (d) => x1(d.key))
    .attr("y", (d) => y(d.value))
    .attr("width", x1.bandwidth())
    .attr("height", (d) => height - y(d.value))
    .attr("fill", (d) => color(d.key))
    .on("mouseover", function (event, d) {
      const tooltip = d3.select("#tooltip");
      tooltip
        .style("opacity", 1)
        .html(`<strong>${d.key}</strong><br>${d.value}`)
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 15 + "px");
      d3.select(this).attr("opacity", 0.8);
    })
    .on("mouseout", function () {
      d3.select("#tooltip").style("opacity", 0);
      d3.select(this).attr("opacity", 1);
    });

  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x0))
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

  svg.append("g").attr("class", "y-axis").call(d3.axisLeft(y));

  // Legenda
  const legend = svg
    .append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "start")
    .selectAll("g")
    .data(educationLevels.slice().reverse())
    .enter()
    .append("g")
    .attr("transform", (d, i) => `translate(${width + 10},${i * 20})`);

  legend
    .append("rect")
    .attr("x", 0)
    .attr("width", 19)
    .attr("height", 19)
    .attr("fill", color);

  legend
    .append("text")
    .attr("x", 24)
    .attr("y", 9.5)
    .attr("dy", "0.32em")
    .text((d) => d);

  // Judul chart
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Tingkat Pendidikan Migran Berdasarkan Provinsi");
}

// Panggil fungsi untuk membuat chart dengan data yang telah diurutkan
createEducationChart(top5EducationData);

// Data untuk Sunburst Chart
const sunburstData = {
  name: "Status Perkawinan",
  children: [
    {
      name: "10-14",
      children: [
        { name: "Belum Kawin", value: 243822 },
        { name: "Kawin", value: 1108 },
        { name: "Cerai Hidup", value: 22 },
        { name: "Cerai Mati", value: 0 },
      ],
    },
    {
      name: "15-19",
      children: [
        { name: "Belum Kawin", value: 231910 },
        { name: "Kawin", value: 15614 },
        { name: "Cerai Hidup", value: 132 },
        { name: "Cerai Mati", value: 27 },
      ],
    },
    {
      name: "20-24",
      children: [
        { name: "Belum Kawin", value: 390711 },
        { name: "Kawin", value: 208505 },
        { name: "Cerai Hidup", value: 1924 },
        { name: "Cerai Mati", value: 165 },
      ],
    },
    {
      name: "25-29",
      children: [
        { name: "Belum Kawin", value: 238167 },
        { name: "Kawin", value: 594075 },
        { name: "Cerai Hidup", value: 6194 },
        { name: "Cerai Mati", value: 936 },
      ],
    },
    {
      name: "30-34",
      children: [
        { name: "Belum Kawin", value: 77518 },
        { name: "Kawin", value: 614594 },
        { name: "Cerai Hidup", value: 11075 },
        { name: "Cerai Mati", value: 1626 },
      ],
    },
    {
      name: "35-39",
      children: [
        { name: "Belum Kawin", value: 30053 },
        { name: "Kawin", value: 463968 },
        { name: "Cerai Hidup", value: 11205 },
        { name: "Cerai Mati", value: 1649 },
      ],
    },
    {
      name: "40-44",
      children: [
        { name: "Belum Kawin", value: 14001 },
        { name: "Kawin", value: 336422 },
        { name: "Cerai Hidup", value: 9072 },
        { name: "Cerai Mati", value: 2953 },
      ],
    },
    {
      name: "45-49",
      children: [
        { name: "Belum Kawin", value: 7487 },
        { name: "Kawin", value: 235213 },
        { name: "Cerai Hidup", value: 7761 },
        { name: "Cerai Mati", value: 3572 },
      ],
    },
    {
      name: "50-54",
      children: [
        { name: "Belum Kawin", value: 5032 },
        { name: "Kawin", value: 151295 },
        { name: "Cerai Hidup", value: 5212 },
        { name: "Cerai Mati", value: 4494 },
      ],
    },
    {
      name: "55-59",
      children: [
        { name: "Belum Kawin", value: 2697 },
        { name: "Kawin", value: 87679 },
        { name: "Cerai Hidup", value: 5896 },
        { name: "Cerai Mati", value: 15219 },
      ],
    },
    {
      name: "60-64",
      children: [
        { name: "Belum Kawin", value: 1592 },
        { name: "Kawin", value: 48366 },
        { name: "Cerai Hidup", value: 2510 },
        { name: "Cerai Mati", value: 15803 },
      ],
    },
    {
      name: "65-69",
      children: [
        { name: "Belum Kawin", value: 623 },
        { name: "Kawin", value: 25082 },
        { name: "Cerai Hidup", value: 1158 },
        { name: "Cerai Mati", value: 14237 },
      ],
    },
    {
      name: "70-74",
      children: [
        { name: "Belum Kawin", value: 382 },
        { name: "Kawin", value: 12281 },
        { name: "Cerai Hidup", value: 437 },
        { name: "Cerai Mati", value: 8963 },
      ],
    },
    {
      name: "75*",
      children: [
        { name: "Belum Kawin", value: 241 },
        { name: "Kawin", value: 7359 },
        { name: "Cerai Hidup", value: 315 },
        { name: "Cerai Mati", value: 10918 },
      ],
    },
  ],
};

function createSunburstChart(data) {
    const width = 700;
    const height = 700;
    const radius = Math.min(width, height) / 2;
  
    const svg = d3
      .select("#sunburst-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);
  
    const color = d3.scaleOrdinal(d3.schemeCategory10);
  
    const partition = d3.partition().size([2 * Math.PI, radius]);
  
    const arc = d3
      .arc()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .innerRadius((d) => d.y0)
      .outerRadius((d) => d.y1);
  
    const root = d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value);
  
    partition(root);
  
    const path = svg
      .selectAll("path")
      .data(root.descendants().filter((d) => d.depth))
      .enter()
      .append("path")
      .attr("d", arc)
      .style("fill", (d) => color((d.children ? d : d.parent).data.name))
      .style("stroke", "#fff")
      .style("stroke-width", "1px")
      .on("mouseover", mouseover)
      .on("mouseleave", mouseleave)
      .on("click", clicked);
  
    const label = svg
      .selectAll("text")
      .data(
        root
          .descendants()
          .filter((d) => d.depth && ((d.y0 + d.y1) / 2) * (d.x1 - d.x0) > 10)
      )
      .enter()
      .append("text")
      .attr("transform", function (d) {
        const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
        const y = (d.y0 + d.y1) / 2;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
      })
      .attr("dy", "0.35em")
      .text((d) => d.data.name)
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("text-anchor", "middle")
      .style("fill", "#fff");
  
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background-color", "#333")
      .style("color", "#fff")
      .style("border", "solid 1px #ddd")
      .style("border-radius", "5px")
      .style("box-shadow", "0px 0px 10px rgba(0, 0, 0, 0.5)")
      .style("padding", "10px")
      .style("pointer-events", "none");
  
    function mouseover(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .style("stroke", "#fff")
        .style("stroke-width", "2px");
  
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .html(`<strong>${d.data.name}</strong><br/>Nilai: ${d.value}`)
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 28 + "px");
    }
  
    function mouseleave(event, d) {
      d3.select(this).transition().duration(200).style("stroke", "none");
  
      tooltip.transition().duration(500).style("opacity", 0);
    }
  
    function clicked(event, p) {
      root.each(
        (d) =>
          (d.target = {
            x0:
              Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) *
              2 *
              Math.PI,
            x1:
              Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) *
              2 *
              Math.PI,
            y0: Math.max(0, d.y0 - p.depth),
            y1: Math.max(0, d.y1 - p.depth),
          })
      );
  
      const t = svg.transition().duration(750);
  
      path
        .transition(t)
        .tween("data", (d) => {
          const i = d3.interpolate(d.current, d.target);
          return (t) => (d.current = i(t));
        })
        .attrTween("d", (d) => () => arc(d.current));
  
      label
        .filter(function (d) {
          return d.target.x0 < p.target.x1;
        })
        .transition(t)
        .attrTween("transform", (d) => () => {
          const x = (((d.target.x0 + d.target.x1) / 2) * 180) / Math.PI;
          const y = (d.target.y0 + d.target.y1) / 2;
          return `rotate(${x - 90}) translate(${y},0) rotate(${
            x < 180 ? 0 : 180
          })`;
        })
        .style("opacity", (d) => +labelVisible(d.target));
    }
  
    function labelVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    }
  }
  
  // Panggil fungsi untuk membuat Sunburst Chart
  createSunburstChart(sunburstData);
  
