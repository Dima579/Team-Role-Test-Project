const quizForm = document.querySelector('form');
const answerVals = 
{
    firstName: "", 
    lastName: "", 
    creativeThinker: 0, 
    teamSupporter: 0, 
    organiser: 0, 
    driver: 0, 
    finisher: 0, 
    analyst: 0, 
    coordinator: 0, 
    explorer: 0, 
    specialist: 0
}


quizForm.addEventListener('submit', (event) =>
{
    event.preventDefault();

    const selectedAnswers = document.querySelectorAll('input[type="radio"]:checked');

    if(selectedAnswers < 12) 
    {
        alert('Please answer all questions.');
        return;
    }

    const firstN = document.getElementById("userFN");
    const secN = document.getElementById("userSN");

    answerVals.firstName = firstN.value;
    answerVals.lastName = secN.value;
    selectedAnswers.forEach(answer => {answerVals[answer.value]++;});

    if (selectedAnswers.length < 12) 
    {
        alert("please answer all questions."); 
        return;
    }

    localStorage.setItem('userResults', JSON.stringify(answerVals));
    window.location.href = "results.html";
});