async function analyze(){

    const url=document.getElementById("url").value.trim();

    if(url===""){
        alert("Please enter a website URL");
        return;
    }

    try{

        const response=await fetch("/audit?url="+encodeURIComponent(url));

        if(!response.ok){
            throw new Error("Failed");
        }

        const data=await response.json();

        document.getElementById("result").innerHTML=`

        <table>

        <tr><th colspan="2">Website Audit Report</th></tr>

        <tr><td>HTTP Status</td><td>${data.status}</td></tr>

        <tr><td>Response Time</td><td>${data.responseTime} ms</td></tr>

        <tr><td>Page Title</td><td>${data.title}</td></tr>

        <tr><td>Meta Description</td><td>${data.metaDescription}</td></tr>

        <tr><td>H1 Tags</td><td>${data.h1Count}</td></tr>

        <tr><td>Images Missing Alt</td><td>${data.missingAltImages}</td></tr>

        <tr><td>Word Count</td><td>${data.wordCount}</td></tr>

        </table>

        `;

    }catch(e){

        document.getElementById("result").innerHTML=
            "<h3 style='color:#6bd0da;text-align:center;margin-top:20px;'>Unable to analyze this website.</h3>";

    }

}