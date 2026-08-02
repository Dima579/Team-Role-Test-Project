document.addEventListener('DOMContentLoaded', async () =>
{
    const userTraitResults = document.getElementById('userTraitValsRes');
    const submissionBtn = document.getElementById('submitButton');
    const resetBtn = document.getElementById('resetButton');
    const inputId = document.getElementById('idInp');

    try
    {
        const results = await retrieveResults();
        listResults(results, userTraitResults);

        submissionBtn.addEventListener('click', async () => 
        {
            try
            {
                const iId = inputId.value;
                await presentSpecificResult(iId, userTraitResults); 
            }
            catch(exception) 
            {
                console.error(exception);
                alert("Unable to retrieve specific result.");
            }
            
        });

        resetBtn.addEventListener('click', () => 
        {
            inputId.value = "";
            listResults(results, userTraitResults);
        });
    }
    catch (exception) 
    {
        console.error(exception);
        alert("Unable to retrieve results.");
    }
   
});


const listResults = (results, table) =>
{
    table.innerHTML='';
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

const presentSpecificResult = async (id, tableAr) =>
{
    const result = await retrieveSpecificResult(id);
    if(result === null)
    {
        alert('No ID found.');
        return;
    }
        tableAr.innerHTML='';
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
        tableAr.insertAdjacentHTML('beforeend', resultVals);    
}


const retrieveResults = async () =>
{
    try
    {
        const response = await fetch('https://localhost:7264/api/UserResult');
        if(!response.ok) {throw new Error(`HTTP Error: ${response.status}`);}
        return await response.json();
    }
    catch(exception) {throw exception;}
}

const retrieveSpecificResult = async (id) =>
{
    try
    {
        const response = await fetch(`https://localhost:7264/api/UserResult/${id}`); 
        if(response.status === 404) {return null}
        if(!response.ok) {throw new Error(`HTTP Error: ${response.status}`);}
        return await response.json(); 
    }
    catch(exception) {throw exception;}
}