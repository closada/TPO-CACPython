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