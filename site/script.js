const RECORDS_URL = 'http://localhost:3000/records'

document.addEventListener('DOMContentLoaded', () => {
  updateRecordsResume();
  setInterval(updateRecordsResume, 3000);

  document.getElementById('create-record')
    .addEventListener('click', handleCreateRecord);
});

const handleCreateRecord = async () => {
  const votes = document.getElementById('record-votes').value;
  const message = document.getElementById('record-message').value;
  await Records.save({votes, message})
  updateRecordsResume();
}

const updateRecordsResume = async () => {
  const resume = await Records.resume();
  const elements = resume.records.map(RecordElement);
  document.getElementById('records').innerHTML = elements.join('');
  document.getElementById('total').innerHTML = resume.total;
}

const RecordElement = (props) => {
  return `<div>
    <span>${props.votes}</span>
    <span>${props.message}</span>
  </div>`
}

const Records = {
  async resume() {
    const response = await fetch(`${RECORDS_URL}/resume`, {method: 'GET'})
    const data = await response.json();
    return data;
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
