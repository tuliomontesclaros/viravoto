const BACKEND_URL = 'http://localhost:3000'
const colors = ["#ffa726", "#F44336", "#2196F3", "#8BC34A", "#FF9800", "#8BC34A", "#009688", "#8BC34A" ]
let flipped = false;
let count = 0;

$(document).ready(() => {
  $('.card').flip();

  fillCard();
  $('.card').on('click', handleFlip);
});

const handleFlip = () => {
  flipped = !flipped;
  fillCard()
  $('.card').flip(flipped);
}

const fillCard = () => {
  if (flipped) {
    fill($('.back'));
  } else {
    fill($('.front'));
  }
}

const fill = async (card) => {
  const {record: {message}, total} = await Records.turns();
  card.find('.total').text(total);
  card.find('.message').text(message);
  card.css('background-color', colors[count % colors.length]);
  count = count + 1;
}

const Records = {
  async turns() {
    const response = await fetch(`${BACKEND_URL}/turns`, {method: 'POST'})
    const data = await response.json();
    return data;
  }
}
