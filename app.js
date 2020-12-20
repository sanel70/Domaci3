$(document).ready(function(){ 
    $("#form_key").submit(function(event){
        $("#greska").hide();  

        event.preventDefault()
        
        let naziv = $('#naslov').val()  
        let god = $('#god').val()
        let filmovi_s = $("#filmovi_s").val()
        let url = "";

        let rez = "";


        if(god !== 0){
            url = `http://www.omdbapi.com/?apikey=cd85f6d0&t=${naziv}&type=${filmovi_s}&y=${god}`;
        } else {
            url = `http://www.omdbapi.com/?apikey=cd85f6d0&t=${naziv}&type=${filmovi_s}`;
        }


        $.ajax({
            method: 'GET',
            url: url,
            success: function(odgovor){
                if(odgovor.Response === "False"){  
                    $("#greska").html(odgovor.Error);
                    $("#greska").show();  
                    $("#pretraga").hide();
                    return;
                
                };
                console.log(odgovor)   
                $("#pretraga").show();
                rez = 
                `   
                    <div>
                    <table class="table table-hover table-bordered mt-5">
                        <tr>
                            <td rowspan="10">
                            <img class="img-thumnail mx-auto d-block" src="${odgovor.Poster}"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Naslov</td>
                            <td>${odgovor.Title}</td>
                        </tr>
                        <tr>
                            <td>Godina</td>
                            <td>${odgovor.Year}</td>
                        </tr>
                        <tr>
                            <td>Datum trajanja</td>
                            <td>${odgovor.Released}</td>
                        </tr>
                        <tr>
                            <td>Trajanje</td>
                            <td>${odgovor.Runtime}</td>
                        </tr>
                        <tr>
                            <td>Reziser</td>
                            <td>${odgovor.Director}</td>
                        </tr>
                        <tr>
                            <td>Glumci</td>
                            <td>${odgovor.Actors}</td>
                        </tr>
                        <tr>
                            <td>Radnja filma</td>
                            <td>${odgovor.Plot}</td>
                        </tr>
                `;
                    
                    if(odgovor.Type === "series"){  
                        rez += 
                        `
                            <tr>
                                <td>Broj sezona</td>
                                <td>${odgovor.totalSeasons}</td>
                            </tr>
                        `
                    }
                    rez += 
                    `
                        <tr>
                            <td>Ocjene</td>
                            <td>
                                <ol>
                    `;
                
                    odgovor.Ratings.forEach(ocjena => {
                        rez +=
                        `
                            <li>${ocjena.Source} : ${ocjena.Value}</li>
                        `
                    });
                    
                    rez +=
                    `
                                </ol>
                            </td>
                        </tr>
                    </table>
                    </div>
                    `
                $("#pretraga").html(rez);  // promijeni id ovog rezultata, stavi pretraga recimo, na svako mjesto gdje ima, da bi ti radilo
            }
        })
    });
});

