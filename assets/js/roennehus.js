// fremkaldning af Afdeling

const baseUrl = "https://api.sebastianhaubo.dk/wp-json/wp/v2/posts";

const afdelingContainer = document.querySelector(".afdelingIndhold");

// Herunder køres funktionen der henter dataen fra CMS
// Via et "postId" kan den hente data fra det id vi indsætter i funktionen
getAfdeling(105);


// Herunder er funktionen getAfdeling

async function getAfdeling(postId) {

    try {

        const response = await fetch(
            // Her bliver der brugt "backticks" så der kan bruges variabler i "baseUrl"
            `${baseUrl}/${postId}`
        );
        // Her bliver der brugt response.json til at parse det JSON der bliver trukket fra baseUrl, om et Javascript objekt
        const post = await response.json();

        // console.log(post);

        // her bliver der kaldt efter billedet. Funktionen ses på linje 46
        const image = await getAfdelingImage(post);
        // Her fortælles getAfdeling at den skal udføre funktionen "renderAfdeling" (som er skrevet på linje 71)
        renderAfdeling(post, image);

        // Her er der lavet et catch som fanger hvis der sker en error, der gør at dataen ikke kunne udveksles
    } catch (error) {
        // Her vises error i konsolen
        console.log("Kunne ikke hente afdelingen:", error);
        // Her vises error i afdelingContainer, som er en <div> i vores HTML fil.
        afdelingContainer.innerHTML =
            "<p>Kunne ikke hente afdelingen.</p>";

    }

}


// fremkaldning af billede

async function getAfdelingImage(post) {
    // Her er går imageId ind og finder primaer_billede ligesom en mappe med undermapper, går den igenne post, finder acf, og i acf primaer_billede
    const imageId = post.acf.primaer_billede;

    // Her sendes en efterspørgsel til REST API'et så der kan hentes data ud fra billedets id
    const response = await fetch(
        `https://api.sebastianhaubo.dk/wp-json/wp/v2/media/${imageId}`
    );

    // Her bliver det JSON vi får igen parset til et JavaScript objekt
    const media = await response.json();
    // console.log(media)

    // Her bliver der sagt at hvis et billede med disse detaljer findes, så retuner det
    if (media.media_details.sizes.medium_large) {
        return media.media_details.sizes.medium_large.source_url;
    }

}

// Her bliver selve indholdet indsat i DOM via innerHTML
// Herunder bliver der brugt "backticks" igen så der kan bruges variabler.

function renderAfdeling(post, image) {

    afdelingContainer.innerHTML = `

        <article class="afdelingArtikel">

            <img class="afdelingImg" src="${image}" alt="${post.acf.titel}">

            <div class="afdelingIndhold">

                <h2>${post.acf.titel}</h2>

                <p class="afdelingAdresse">${post.acf.adresse}</p>

                <h3>${post.acf.om_afdeling_titel}</h3>

                <p class="afdelingTekst">${post.acf.om_afdeling}</p>
            </div>
        </article>

    `;

}