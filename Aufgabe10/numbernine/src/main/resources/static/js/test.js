async function test_sorting(){
    try{
        const response = await fetch("http://localhost:8080/api/projectsdata/getnewest");

        if (!response.ok){
            throw new Error("Fetch failed", response);
        }

        const data = await response.json();

        return data;
    }
    catch(error){
        console.error("Fehler", error);
    }
}

const ret = await test_sorting();

console.log(ret);