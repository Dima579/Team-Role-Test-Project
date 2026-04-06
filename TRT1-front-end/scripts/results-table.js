document.addEventListener('DOMContentLoaded', async () =>
{
    const storedData = localStorage.getItem('userResults');
    const sDVals = JSON.parse(storedData)
    const userTraitResults = document.getElementById('userTraitValsRes');


    const results = await retrieveResults();
    listResults(results, userTraitResults);


    const resultsTabDelBtn = document.getElementById('rTabDelBtn');
    const returnButton = document.getElementById('retBtn');

    returnButton.addEventListener('click', () => 
    {
        localStorage.clear();
        window.location.href="index.html";
    });


    resultsTabDelBtn.addEventListener('click', async () =>
    {
        await retrieveId(results, sDVals);
        window.location.href="index.html";
        localStorage.clear();
    });


});

const retrieveResults = async () =>
{
    try
    {
        const response = await fetch('https://localhost:7264/api/UserResult', 
        {
            method: 'GET',
            headers: {'content-type': 'application/json', 'accept': 'application/json'},
        }
        ); 
        if(!response.ok) 
        {
            console.log(`Error: ${response.status}`);
            return [];
        }
        else 
        {
            const responseConverted = await response.json(); 
            return responseConverted;
        }
    }
    catch(exception)
    {
        console.log(exception);
        return [];
    }
}

const listResults = (resConv, tableAr) => 
{
    resConv.sort((a, b) => b.id - a.id)
    .forEach((resConverted) => 
    {
        const fullName = `${resConverted.firstName} ${resConverted.lastName}`;
        const resultVals = `
            <tr>
                <td>${resConverted.id}</td>
                <td>${fullName}</td>
                <td>${resConverted.creativeThinker}</td>
                <td>${resConverted.teamSupporter}</td>
                <td>${resConverted.organiser}</td>
                <td>${resConverted.driver}</td>
                <td>${resConverted.finisher}</td>
                <td>${resConverted.analyst}</td>
                <td>${resConverted.coordinator}</td>
                <td>${resConverted.explorer}</td>
                <td>${resConverted.specialist}</td>
            </tr>`;
        tableAr.insertAdjacentHTML('beforeend', resultVals);
    });
}


const retrieveId = async (resConv, storedRes) =>
{
    if (!resConv || !storedRes) {return null;}
    
    for(let i=0; i < resConv.length; i++)
    {
        const currentRes = resConv[i];
        const {id, ...otherResults} = currentRes;
        if(JSON.stringify(otherResults) === JSON.stringify(storedRes))
        {
            //const resId = resConv.id; 
            await deleteTabRes(id);
            return id;
        }
    }
    return null;
}


const deleteTabRes = async (id) =>
{
    try 
    {
        const response = await fetch(`https://localhost:7264/api/UserResult/${id}`, 
            {
                method: 'DELETE',
                headers: {'content-type': 'application/json', 'accept': 'application/json'}
            }
        );
        if(!response.ok) {console.log(`Error: ${response.status}`);}
        else {console.log('Deleted Successfully');}
    }
    catch(exception)
    {
        console.log(exception);
    }
}