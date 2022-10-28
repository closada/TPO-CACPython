function SubmitFromulario()
{
/* Si nombre esta vacio*/
if (document.getElementsByName("nombre")[0].value == "")
    {
        alert("Atencion! El nombre esta vacio");
        return false;
    }

/* Si apellido esta vacio*/
if (document.getElementsByName("apellido")[0].value == "")
    {
        alert("Atencion! El apellido esta vacio");
        return false;
    }

/* Si mail esta vacio o es invalido*/
var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

if (!emailRegex.test(document.getElementsByName("correo-contacto")[0].value) || document.getElementsByName("correo-contacto")[0].value== "")
    {
        alert("Atencion! El email esta vacio o no cumple el formato");
        return false;
    }

/* Si teléfono no es valido */
if(!document.getElementsByName("telefono-contacto")[0].value == "" && !Number.isInteger(parseInt(document.getElementsByName("telefono-contacto")[0].value)))
{
    alert("Atencion!El telefono ingresado no es valido");
    return false;
}

/* Si consulta esta vacio*/
if (document.getElementsByName("consulta")[0].value == "")
    {
        alert("Atencion! No ha escrito su consulta");
        return false;
    }
}

/**************************************API *******************************/
let timer;
let EliminarPrimerDelay;

async function start() 
{
    try 
    {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();
        CrearLista(data.message);
    }
    catch (Error)
    {
        console.log("Hubo un error con la API: ",Error);
    }
    
}

function CrearLista (x)
{
    document.getElementById("dog").innerHTML = `
    <select onchange="BuscarPerro(this.value);">
    <option>Seleccione una opcion..</option>
    ${Object.keys(x).map(function (dato) {
        return `<option>${dato}</option>`
    }).join('')}
    </select>`
}

async function BuscarPerro(valor) 
{
    if (valor != "Seleccione una opcion..")
    {
        const response = await fetch(`https://dog.ceo/api/breed/${valor}/images`);
        const data = await response.json();
        //console.log(data);
        InsertarImg(data.message);
    }
}

function InsertarImg(mens)
{   
    let pos = 0;
    clearInterval(timer);
    clearTimeout(EliminarPrimerDelay);
    
    if (mens.length > 1)
    {
        document.getElementById("dog-img").innerHTML = `
        <div class="img-ind" style="background-image: url('${mens[0]}');"></div>
        <div class="img-ind" style="background-image: url('${mens[1]}');"></div>
        `;
        
        pos += 2;

        if (mens.length == 2) 
            pos = 0;
        
        timer = setInterval(SiguienteImg, 3000);
        
    } else
    {
        document.getElementById("dog-img").innerHTML = `
        <div class="img-ind" style="background-image: url('${mens[0]}');"></div>
        <div class="img-ind"></div>
        `;
    }



    function SiguienteImg()
    {
        document.getElementById("dog-img").insertAdjacentHTML("beforeend", `<div class="img-ind" style="background-image: url('${mens[pos]}');"></div>`);
        EliminarPrimerDelay = setTimeout(function () {
            document.getElementsByClassName("img-ind")[0].remove();
        },1000);

        if(pos + 1 >= mens.length) 
        {
            pos = 0;
        } else 
        {
            pos++;
        }
    }
}

start();