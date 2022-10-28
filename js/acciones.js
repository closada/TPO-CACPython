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

async function start() 
{
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    CrearLista(data.message);
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
        console.log(data);
        InsertarImg(data.message);
    }
}

function InsertarImg(mens)
{
    document.getElementById("dog-img").innerHTML = `
    <div class="img-ind" style="background-image: url('${mens[0]}');"></div>
    `;
}

start();