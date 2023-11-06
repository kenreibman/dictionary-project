const input = document.querySelector('.input');
const submit = document.querySelector('.submit');
const word = document.querySelector('.word');
const defContainer = document.querySelector('.definitions');
const results = document.querySelector('.results');
const error = document.querySelector('.error');
const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

async function getData() {
  let inputValue = input.value.trim();
  try {
    const response = await fetch(`${url}${inputValue}`);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('An error occured', error);
    throw error;
  }
}

submit.addEventListener('click', async () => {
  // Clear old results
  results.innerHTML = '';

  getData()
    .then((data) => {
      console.log(data);
      let definitions = data[0].meanings[0].definitions;
      let definitionsHTML = definitions
        .map((def) => {
          return `<li>${def.definition}</li>`;
        })
        .join('');

      results.innerHTML = `
          <div class="word">${data[0].word}</div>
          <div class="phonetic">${data[0].phonetic}</div>
          <ul class="definitions">${definitionsHTML}</ul>
        `;
    })
    .catch((error) => {
      error.innerHTML = `Error: ${error.message}`;
    });
});
