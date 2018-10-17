const RECORDS_URL = 'http://localhost:3000/records'

document.addEventListener('DOMContentLoaded', () => {
  updateRecordsList();
  setInterval(updateRecordsList, 1000);

  document.getElementById('create-record')
    .addEventListener('click', handleCreateRecord);
});

const handleCreateRecord = () => {
  const votes = document.getElementById('record-votes').value;
  const message = document.getElementById('record-message').value;
  createRecord({votes, message})
}

const updateRecordsList = async () => {
  const records = await findRecords();
  const elements = records.map(RecordElement);
  document.getElementById('records').innerHTML = elements.join('');
}

const createRecord = async (record) => {
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

const findRecords = async () => {
  const response = await fetch(RECORDS_URL, {method: 'GET'})
  const data = await response.json();
  return data;
}

const RecordElement = (props) => {
  return `<div>
    <span>${props.votes}</span>
    <span>${props.message}</span>
  </div>`
}
