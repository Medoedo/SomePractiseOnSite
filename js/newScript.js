const films = [
    {
        name: 'Titanic',
        rating: 9
    },
    {
        name: 'Die hard 5',
        rating: 5
    },
    {
        name: 'Matrix',
        rating: 8
    },
    {
        name: 'Some bad film',
        rating: 4
    }
];

function showGoodFilms(arr) {
    return arr.filter(i => i.rating >= 8);
}

function showListOfFilms(arr) {
    const allFilms = arr.map(item => item.name);
    return allFilms.reduce((res, film) => `${res}, ${film}`);
}

function setFilmsIds(arr) {
    arr.map((film, i) => film.id = i);
    return arr;
}

setFilmsIds(films);

const tranformedArray = setFilmsIds(films);



function checkFilms(arr) {
    const answer = arr.every(i => i.id || i.id === 0);
    return answer;
}


const funds = [
    {amount: -1400},
    {amount: 2400},
    {amount: -1000},
    {amount: 500},
    {amount: 10400},
    {amount: -11400}
];

const getPositiveIncomeAmount = (data) => {
    return data
    .filter(item => item.amount > 0)
    .reduce((sum, item) => sum + item.amount, 0);
};

const getTotalIncomeAmount = (data) => {
    if(data.some(item => item.amount < 0)) {
        return data.reduce((sum, amount) => sum + amount.amount, 0);
    }
    return getPositiveIncomeAmount(data);
};
