const subBtn = document.getElementById('submitButton');
const ansVals = {firstName: "", lastName: "", creativeThinker: 0, teamSupporter: 0, organiser: 0, driver: 0, finisher: 0, analyst: 0, coordinator: 0, explorer: 0, specialist: 0}

subBtn.addEventListener('click', () =>
    {
        const selectedAnswers = document.querySelectorAll('input[type="radio"]:checked');
        const firstN = document.getElementById("userFN");
        const secN = document.getElementById("userSN");

        ansVals.firstName = firstN.value;
        ansVals.lastName = secN.value;
        selectedAnswers.forEach(answer => {ansVals[answer.value]++;});
        console.log(ansVals);
        console.log(ansVals.firstName + " " + ansVals.lastName);

        //localStorage.setItem(ansVals);
        localStorage.setItem('userResults', JSON.stringify(ansVals));
        window.location.href = "results.html";
        //compSend(ansVals);
    });