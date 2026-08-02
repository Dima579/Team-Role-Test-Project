document.addEventListener('DOMContentLoaded', async () =>
{
    const storedId = localStorage.getItem('userResultId');
    const userTraitResults = document.getElementById('userTraitValsRes');

    try
    {
        const results = await retrieveResults();
        listResults(results, userTraitResults); 
    }
    catch(exception)
    {
        console.error(exception);
        alert('Unable to retrieve results.');
    }
    

    const resultsTabDelBtn = document.getElementById('rTabDelBtn');
    const returnButton = document.getElementById('retBtn');


    returnButton.addEventListener('click', () => 
    {
        localStorage.clear();
        window.location.href="index.html";
    });

    resultsTabDelBtn.addEventListener('click', async () =>
    {
        if(!storedId) 
        {
            alert("No result found.");
            return;
        }
        try
        {
            await deleteUserResult(storedId);
            localStorage.clear();
            window.location.href="index.html";
        }
        catch(exception) 
        {
            console.error(exception);
            alert('Unable to delete your result.');
        }
    });
});


const listResults = (results, table) =>
{
    results.sort((a, b) => b.id - a.id)
    .forEach((result) =>
    {
        const fullName = `${result.firstName} ${result.lastName}`;
        const resultVals = `
            <tr>
                <td>${result.id}</td>
                <td>${fullName}</td>
                <td>${result.creativeThinker}</td>
                <td>${result.teamSupporter}</td>
                <td>${result.organiser}</td>
                <td>${result.driver}</td>
                <td>${result.finisher}</td>
                <td>${result.analyst}</td>
                <td>${result.coordinator}</td>
                <td>${result.explorer}</td>
                <td>${result.specialist}</td>
            </tr>`;
        table.insertAdjacentHTML('beforeend', resultVals);
    });
}


const retrieveResults = async () =>
{
    try
    {
        const response = await fetch('https://localhost:7264/api/UserResult');
        if(!response.ok) {throw new Error(`HTTP Error: ${response.status}`);}
        const resultsConverted = await response.json();
        return resultsConverted;
    }
    catch(exception)
    {
        throw exception;
    }
}

const deleteUserResult = async (id) =>
{
    try 
    {
        const response = await fetch(`https://localhost:7264/api/UserResult/${id}`, {method: 'DELETE',});
        if(!response.ok) {throw new Error(`HTTP Error: ${response.status}`);}
        console.log('Deleted Successfully');
    }
    catch(exception)
    {
        console.log(exception);
        throw exception;
    }
}