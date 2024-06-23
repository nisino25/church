<template>
  <div class="content">
    Fetching test
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in processedData" :key="rowIndex">
          <td>{{ row.year }}</td>
          <td>{{ row.month }}</td>
          <td>{{ row.date }}</td>
          <td>{{ row.day }}</td>
          <td>{{ row.time }}</td>
          <td>{{ row.title }}</td>
          <td>{{ row.priest }}</td>
          <td>{{ row.location }}</td>
          <td>{{ row.comment }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: ["Year", "Month", "Date", "Day", "Time", "Title", "Priest", "Location", "Comment"],
      spreadsheetData: [],
      processedData: []
    };
  },
  async mounted() {
    console.clear();
    // Your spreadsheet ID
    const SPREADSHEET_ID = '1q5pUXkd9wE0qep1DRaegEp0fwgRVhiWtstsG1o0btkc';
    // Your API key
    const API_KEY = 'AIzaSyDl0Ur5nVIPMHo0wWnzDaUtgq63uRrsyvI'; // Replace with your API key
    // URL to fetch the spreadsheet data
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1?key=${API_KEY}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const rows = data.values;
        if (rows.length > 0) {
          this.spreadsheetData = rows.slice(1);
          this.processData();
        } else {
          console.log('No data found');
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  },
  methods: {
    processData() {
      this.processedData = this.spreadsheetData.map(row => {
        const [dateStr, time, title, priest, location, comment] = row;
        const year = dateStr.substring(0, 4);
        const month = dateStr.substring(4, 6);
        const date = dateStr.substring(6, 8);
        const day = this.calculateDayOfWeek(dateStr);

        return {
          year,
          month,
          date,
          day,
          time,
          title,
          priest,
          location,
          comment
        };
      });
    },
    calculateDayOfWeek(dateStr) {
      const year = parseInt(dateStr.substring(0, 4), 10);
      const month = parseInt(dateStr.substring(4, 6), 10) - 1; // Month is zero-indexed
      const date = parseInt(dateStr.substring(6, 8), 10);
      const dayOfWeek = new Date(year, month, date).getDay();
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[dayOfWeek];
    }
  }
};
</script>

<style scoped>
.content {
  font-family: Arial, sans-serif;
  margin: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
}
</style>
