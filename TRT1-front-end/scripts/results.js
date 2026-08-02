document.addEventListener('DOMContentLoaded', () => 
{
    const storedData = localStorage.getItem('userResults');

    if(!storedData) 
    {
        alert('No results found.');
        return;
    }

    const answerVals = JSON.parse(storedData);

    const userAnswerVals = Object.entries(answerVals).filter(([key, value]) => typeof value === 'number').sort((a, b) => b[1] - a[1]);
    const topAnswerVals = userAnswerVals.slice(0, 3);

    const resultsSubmitBtn = document.getElementById('rTabSubBtn');

    
    resultsSubmitBtn.addEventListener('click', async () => 
    {
        try
        {
            const createdResult = await compSend(answerVals);
            localStorage.setItem('userResultId', createdResult.id);
            window.location.href='results-table.html'; 
        }
        catch(exception) 
        {
            console.error(exception);
            alert('unable to submit your results');
        }
    });


    const traitDetails = [
    {
        id: "creativeThinker",
        title: "Creative Thinker",
        desc: "You are constantly coming up with ideas, tackling tasks from all perspectives no matter how big or small",
        imageLink: "/images/creative-thinker.png",
        pro: "Thinks outside the box, finding solutions where others wouldn't",
        con: "Can get carried away with their ideas, overdeveloping them and losing focus on the initial requirements"
    }, 

    {
        id: "teamSupporter",
        title: "Team Supporter",
        desc: "You encourage and support your fellow team members, maintaining a positive and collaborative team environment",
        imageLink: "/images/team-supporter.png",
        pro: "Great at keeping the morale up, resolving conflicts between peers whenever they happen",
        con: "Can prioritise others over tasks"
    }, 

    {
        id: "organiser",
        title: "Organiser",
        desc: "You manage tasks and plans into structures, ensuring everything is done through a tight pipeline",
        imageLink: "/images/organiser.png",
        pro: "Time is managed optimally with work output being increasingly efficient",
        con: "Can be unadaptable to sudden change"
    }, 

    {
        id: "driver",
        title: "Driver",
        desc: "You push the team forward towards the goal with high energy and determination",
        imageLink: "/images/driver.png",
        pro: "Highly motivated, taking initiative to ensure everything is finished correctly",
        con: "Can be percieved as forceful which can create conflict"
    }, 

    {
        id: "finisher",
        title: "Finisher",
        desc: "You focus on finishing tasks to the best of your ability, ensuring everything has been completed",
        imageLink: "/images/finisher.png",
        pro: "Detailed orientated, ensuring there are no mistakes and work is of the highest standard",
        con: "Can be slower to complete work due to perfectionist nature"
    }, 

    {
        id: "analyst",
        title: "Analyst",
        desc: "You evaluate all given information carefully, using logic and data to make decisions",
        imageLink: "/images/analyst.png",
        pro: "Spots risks and issues early from resource analysis",
        con: "Can overthink decisions, slowing down their productivity"
    }, 

    {
        id: "coordinator",
        title: "Coordinator",
        desc: "You ensure everyone knows what they are doing, bringing the team together to reach the goal efficiently",
        imageLink: "/images/coordinator.png",
        pro: "Strong leadership and communication skills, maintaining team cohesion",
        con: "Can rely too much on others increasing risk of task completion"
    }, 

    {
        id: "explorer",
        title: "Explorer",
        desc: "You actively seek out new opportunities, ideas and resources to benifit the team",
        imageLink: "/images/explorer.png",
        pro: "Quick to adapt to changes in the team, intergrating new ideas to help carry out tasks",
        con: "Can lose focus easily, potentially not following through on results"
    }, 

    {
        id: "specialist",
        title: "Specialist",
        desc: "You have expertise in a specific area, contributing high level knowledge to the team",
        imageLink: "/images/specialist.png",
        pro: "provides valuable insights into their specialty, producing higher grade results",
        con: "Can struggle against areas outside of specialisation"
    }];


    const resultsContainer = document.getElementById('resultsCont');

    const generateCards = (userValues, traitDetails) =>
    {
        userValues.forEach(([key]) => 
        {
            const traitDetail = traitDetails.find((trait) => trait.id === key);
            if(!traitDetail) {return;}

            const card = document.createElement('div');
            card.classList.add('result-card');

            card.innerHTML = `
                <div class="title-group">
                    <h3 class="text-underlined">${traitDetail.title}</h3>
                    <h4>${traitDetail.desc}</h4>
                </div>
                <img class="card-img" src="${traitDetail.imageLink}">
                <div class="title-group">
                    <h4>Pro +: ${traitDetail.pro}</h4>
                    <h4>Con -: ${traitDetail.con}</h4>
                </div>`;

            resultsContainer.append(card);
        });
    };
    generateCards(topAnswerVals, traitDetails);


    const tableResultTraits = document.getElementById('tableTraitValsRes');


    const generateTableResults = (table, results) => 
    {
        const resultVals = `
        
            <tr>
                <td>${results.creativeThinker}</td>
                <td>${results.teamSupporter}</td>
                <td>${results.organiser}</td>
                <td>${results.driver}</td>
                <td>${results.finisher}</td>
                <td>${results.analyst}</td>
                <td>${results.coordinator}</td>
                <td>${results.explorer}</td>
                <td>${results.specialist}</td>
            </tr>`;

        table.innerHTML=resultVals;
    }

    generateTableResults(tableResultTraits, answerVals);
});

const compSend = async (userObj) =>
{
    const response = await fetch('https://localhost:7264/api/UserResult', 
    {
        method: "POST", 
        headers: {'content-type': 'application/json', 'accept': 'application/json'},
        body: JSON.stringify(userObj)
    });
    if(!response.ok) 
    {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    return await response.json();
}
