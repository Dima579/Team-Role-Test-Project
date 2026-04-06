document.addEventListener('DOMContentLoaded', async () =>
{
    const userTraitResults = document.getElementById('userTraitValsRes');
    const submissionBtn = document.getElementById('submitButton');
    const resetBtn = document.getElementById('resetButton')

    const results = await retrieveResults();
    listResults(results, userTraitResults);


    submissionBtn.addEventListener('click', async () => 
    {
        const inputId = document.getElementById('idInp');
        const iId = inputId.value;
        presentSpefResult(iId, userTraitResults);
    });

    resetBtn.addEventListener('click', () => {listResults(results, userTraitResults);})
});


const listResults = (resConv, tableAr) => 
{
    tableAr.innerHTML='';
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

const presentSpefResult = async (id, tableAr) =>
{
    const resIdConverted = await retrieveSprefResults(id);
    if(!id === resIdConverted.id || resIdConverted.length === 0)
    {
        listResults(results, userTraitResults);
        alert('No ID found!');
        return;
    }
    else
    {
        tableAr.innerHTML='';
        const fullName = `${resIdConverted.firstName} ${resIdConverted.lastName}`;
        const resultVals = `
                <tr>
                    <td>${resIdConverted.id}</td>
                    <td>${fullName}</td>
                    <td>${resIdConverted.creativeThinker}</td>
                    <td>${resIdConverted.teamSupporter}</td>
                    <td>${resIdConverted.organiser}</td>
                    <td>${resIdConverted.driver}</td>
                    <td>${resIdConverted.finisher}</td>
                    <td>${resIdConverted.analyst}</td>
                    <td>${resIdConverted.coordinator}</td>
                    <td>${resIdConverted.explorer}</td>
                    <td>${resIdConverted.specialist}</td>
                </tr>`;
        tableAr.insertAdjacentHTML('beforeend', resultVals); 
    }    
}



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
            const resConverted = await response.json(); 
            return resConverted;
        }
    }
    catch(exception)
    {
        console.log(exception);
        return [];
    }
}

const retrieveSprefResults = async (id) =>
{
    try
    {
        const response = await fetch(`https://localhost:7264/api/UserResult/${id}`, 
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
            const resIdConverted = await response.json(); 
            return resIdConverted;
        }
    }
    catch(exception)
    {
        console.log(exception);
        return [];
    }
}