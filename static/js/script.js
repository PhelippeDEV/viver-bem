document.addEventListener('DOMContentLoaded', () => {
    const noticias = document.querySelectorAll('.noticias_grid .noticia');

    noticias.forEach(noticia => {
        noticia.addEventListener('mouseenter', () => {
            noticias.forEach(otherNoticia => {
                if (otherNoticia !== noticia) {
                    otherNoticia.classList.add('desfocado');
                }
            });
        });

        noticia.addEventListener('mouseleave', () => {
            noticias.forEach(otherNoticia => {
                otherNoticia.classList.remove('desfocado');
            });
        });
    });
});




