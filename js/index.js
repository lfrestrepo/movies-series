$(document).ready(function(){

    $("#loading").hide();

    $type   = ['movie', 'series'];
    $search = "";


    $('#search_field').on('keyup', function(){
        $search = $(this).val();

        search($search);
    });

    $(".type").click(function(){
        if($(this).is(":checked")){
            $type = $(this).val();
            
            search($search);
        }
    })

});

function search($search){
    $("#movies").html("");

    if($search.length >= 3){
        $("#loading").fadeIn();

        setTimeout(function(){
            getMovies($search);
        }, 2000);
    } else{
        $("#movies").html("");
    }
}
    

function getMovies(search){

    if($type == "all") $type = ['movie', 'series'];

    axios.get('https://www.omdbapi.com', {
        params: {
            apikey: "7b071990",
            s: search,
            type: $type,
        }
    })
    .then((response) => {
        $movies = response.data.Search;
        $html   = "";

        $.each($movies, (index, movie) => {
            $html += `<div class="movie col-md-3 home-content__main">
                        <div class="card" data-toggle="modal" data-target="#movieModal${ index }">
                            <div class="card-body">
                                <img src="${ movie.Poster }">
                            </div>
                            <div class="text">
                                <div class="line-container">
                                    <div class="single-line">${ movie.Title }</div>
                                </div>
                                <div class="line-container">
                                    <div class="single-line">${ movie.Year }</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal fade" id="movieModal${ index }" tabindex="-1" role="dialog" aria-labelledby="movieModal${index}Label" aria-hidden="true">
                        <div class="modal-dialog modal-md" role="document">
                            <div class="modal-content">
                                <div class="card-body-modal">
                                    <img src="${ movie.Poster }">
                                </div>
                                <div class="modal-body-modal">
                                <h2>${ movie.Title }</h2>
                                <h5>${ movie.Year }</h5>
                                <p>The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the ambitious celestial being Ego.</p>
                                </div>
                            </div>
                        </div>
                    </div>`;
        });

        $("#movies").html($html);
        $('.modal').modal('modal');
    });

    $("#loading").hide();
}