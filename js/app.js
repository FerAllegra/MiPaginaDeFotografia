//para que funcione muuri de css grid api externa
const grid = new Muuri('.grid',{ 
    layout: {
        rounding: false
    }
});


//Agregamos los listener de los enlaces para filtrar por categoria y al principio agregamos una clase para cambiar la opacidad y mostrar todas las img cuando se carga
window.addEventListener('load',()=>{
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');

    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach((elemento)=>{
        elemento.addEventListener('click', (evento)=>{
            evento.preventDefault();
            enlaces.forEach((enlace)=> enlace.classList.remove('activo'));
            evento.target.classList.add('activo');

            const categoria = evento.target.innerHTML.toLowerCase();
            categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
        });
    });

    //agregamos el listener para la barra de busqueda

    document.querySelector('#barra-busqueda').addEventListener('input', (evento)=>{
        const busqueda = evento.target.value;
        grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
    });

    //listener para las imagenes

    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach( (elemento) => {
        
        elemento.addEventListener('click', ()=>{
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;
        });
    });

    //event listener del boton de cerrar

    document.querySelector('#btn-cerrar-popup').addEventListener('click', ()=>{
        overlay.classList.remove('activo');
    });

    //event listener del overlay

    overlay.addEventListener('click', (evento)=>{
        
        evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
    });
});


