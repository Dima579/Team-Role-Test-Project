document.addEventListener('DOMContentLoaded', () => 
{
    const storedData = localStorage.getItem('userResults');
    const ansVals = JSON.parse(storedData);

    const uAnsVals = Object.entries(ansVals).filter(([key, value]) => typeof value === 'number').sort((a, b) => b[1] - a[1]);
    const topAnsVals = uAnsVals.slice(0, 3);

    const resultsSubmitBtn = document.getElementById('rTabSubBtn');
    resultsSubmitBtn.addEventListener('click', () => {compSend(ansVals); window.location.href='results-table.html';});


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

    const cardOuter = document.createElement('div')
    cardOuter.id="result-card";
    const resultsContainer = document.getElementById('resultsCont');

    const genCard = (uValues, idVals) =>
    {
        uValues.forEach(([key]) => 
        {
            idVals.forEach((idVal) => 
            {
                if (key === idVal.id)
                {
                    const card = document.createElement('div');
                    card.classList.add('result-card');

                    card.innerHTML = `
                    <div class="title-group">
                        <h3 class="text-underlined">${idVal.title}</h3>
                        <h4>${idVal.desc}</h4>
                    </div>
                    <img class="card-img" src="${idVal.imageLink}">
                    <div class="title-group">
                        <h4>Pro +: ${idVal.pro}</h4>
                        <h4>Con -: ${idVal.con}</h4>
                    </div>`;

                    resultsContainer.append(card);
                }
            });
        });
    };
genCard(topAnsVals, traitDetails);


const tableResultTraits = document.getElementById('tableTraitVlasRes');

const genTableResults = (tableAr, uValues) => 
    {
        const resultVals = `
        
            <tr>
                <td>${uValues.creativeThinker}</td>
                <td>${uValues.teamSupporter}</td>
                <td>${uValues.organiser}</td>
                <td>${uValues.driver}</td>
                <td>${uValues.finisher}</td>
                <td>${uValues.analyst}</td>
                <td>${uValues.coordinator}</td>
                <td>${uValues.explorer}</td>
                <td>${uValues.specialist}</td>
            </tr>`;

        tableAr.innerHTML=resultVals;
    }


genTableResults(tableResultTraits, ansVals);
});

const compSend = async (userObj) =>
{
    //const uData = userObj.json();

    try
    {
        const response = await fetch('https://localhost:7264/api/UserResult', 
            {
                method: "POST", 
                headers: {'content-type': 'application/json', 'accept': 'application/json'},
                body: JSON.stringify(userObj)
            });
        if(!response.ok)
        {console.log(`Error: ${response.status}`);}
    }
    catch(exception) {console.log(exception);}
}