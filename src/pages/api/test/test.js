export const players = [
    {
      name: 'Jugador 1',
      life: 5,
      score: 100
    },
    {
      name: 'Jugador 2',
      life: 3,
      score: 150
    },
    {
      name: 'Jugador 3',
      life: 2,
      score: 200
    }
  ];

  const fetchWord = async () => {
    const response = await fetch('https://random-word-api.herokuapp.com/word?lang=es');
    const word = await response.json();
    return word[0]
  };
  const removeAccents = (text)=> {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  
  
  

  const fetchAndInitialize = async () => {
    const word = await fetchWord();
    const upperCaseWord = removeAccents(word.toUpperCase());
    const selectedWord = upperCaseWord.split("");
    const board = Array(selectedWord.length).fill('_');
    return { selectedWord, board };
  };
  
  export const { selectedWord, board } = await fetchAndInitialize();
  