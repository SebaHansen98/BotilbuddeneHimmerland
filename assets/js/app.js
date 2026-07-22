function getMenu() {
    // Her bliver der oprettet en variabel som hænger sammen med <nav> HTML filerne
    // Her bliver nav elementet "menu" valgt
    let menu = document.getElementById("menu");
    // Her fortæller spørger koden om navigationen er åben, og hvis den er, så ændre CSS til display: none;
    if (menu.style.display == "block") {
        menu.style.display = "none";
        // Hvis den ikke vises, så vis den. På denne måde ændres CSS når man interagere med <button> elementet.
    } else {
        menu.style.display = "block";
    }
}