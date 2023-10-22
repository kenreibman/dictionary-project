const input = document.querySelector('.input');
const submit = document.querySelector('.submit');
const word = document.querySelector('.word');
const defContainer = document.querySelector('.definitions');
const results = document.querySelector('.results');
const error = document.querySelector('.error');
const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

submit.addEventListener('click', () => {
  let inputValue = input.value;
  console.log(inputValue);
  fetch(`${url}${inputValue}`)
    .then((response) => {
      if (!response.ok) throw new Error('invalid');
      return response.json();
    })
    .then((data) => {
      console.log(data);
      error.classList.remove('show');
      word.classList.remove('hide');
      defContainer.classList.remove('hide');

      word.innerHTML = `
      <div class="word">${data[0].word}</div>
      `;

      let definitions = data[0].meanings[0].definitions;

      defContainer.innerHTML = definitions
        .map((def) => {
          return `<li>${def.definition}</li>`;
        })
        .join('');
    })
    .catch(() => {
      error.classList.add('show');
      word.classList.add('hide');
      defContainer.classList.add('hide');
    });
});
