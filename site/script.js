const RECORDS_URL = 'http://localhost:3000/records'

document.addEventListener('DOMContentLoaded', () => {
  updateRecordsCounter();
  updateRecordsList();
  setInterval(updateRecordsCounter, 3000);

  document.getElementById('create-record')
    .addEventListener('click', handleCreateRecord);
});

const handleCreateRecord = () => {
  const votes = document.getElementById('record-votes').value;
  const message = document.getElementById('record-message').value;
  Records.save({votes, message})
  updateRecordsCounter();
  updateRecordsList();
}

const updateRecordsList = async () => {
  const records = await Records.find();
  const elements = records.map(RecordElement);
  document.getElementById('records').innerHTML = elements.join('');
}

const updateRecordsCounter = async () => {
  const count = await Records.count();
  document.getElementById('counter').innerHTML = count;
}

const RecordElement = (props) => {
  return `<div>
    <span>${props.votes}</span>
    <span>${props.message}</span>
  </div>`
}

const Records = {
  async find() {
    const response = await fetch(RECORDS_URL, {method: 'GET'})
    const data = await response.json();
    return data;
  },
  async count() {
    const response = await fetch(`${RECORDS_URL}/count`, {method: 'GET'})
    const data = await response.json();
    return data.count;
  },
  async save(record){
    await fetch(RECORDS_URL,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(record)
      })
  }
}
